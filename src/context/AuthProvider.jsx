import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import { AuthContext } from './AuthContext';
import { auth } from '../firebase/firebase.config';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useAxios from '../hooks/useAxios';

const AuthProvider = ({children}) => {
  const googleProvider =new GoogleAuthProvider();
  const [user,setUser]=useState(null);
  const [loading,setLoading] =useState(true);
  const axiosInstance=useAxios();

  const createNewUser =(email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
  }
  const logInUser=(email,password)=>{
      setLoading(true)
    return signInWithEmailAndPassword (auth,email,password)
  }
useEffect(() => {
  const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      setLoading(true);
      setUser(currentUser); // Temporarily set user (without role)

      try {
        const res = await axiosInstance.post('/jwt', { email: currentUser.email });
        const token = res.data.token;
        localStorage.setItem('token', token);

        // ✅ Securely get role from backend
        const userInfo = await axiosInstance.get('/user-info', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          
        });

        // ✅ Set user with role
        setUser({ ...currentUser, role: userInfo.data.role });
      } catch (error) {
        console.error('Auth error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    } else {
      setUser(null);
      localStorage.removeItem('token');
      setLoading(false);
    }
  });

  return () => unSubscribe();
}, [axiosInstance]);


 const updateUserProfile =(profileInfo)=>{
    return updateProfile(auth.currentUser,profileInfo)

 }
  
const googleSignIn =()=>{
      setLoading(true)
    return signInWithPopup(auth,googleProvider)
  }
const logOut=()=>{
   localStorage.removeItem('token')
      setLoading(true)
    return signOut(auth)
  }

  const Info={createNewUser, logInUser,
    googleSignIn,logOut,user,updateUserProfile,loading
     }


    return (
        <AuthContext value={Info}>
         {children}
         </AuthContext>
            
    
    );
};

export default AuthProvider;