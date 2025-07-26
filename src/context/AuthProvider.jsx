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

  useEffect(()=>{
   const unSubscribe=onAuthStateChanged(auth,async(currentUser)=>{
     if(currentUser){
        setUser(currentUser);

        if(currentUser?.email){
           await axiosInstance.post('/jwt',{email:currentUser?.email})
          .then(res=>{
            console.log(res.data.token)
            localStorage.setItem('token',res.data.token)
          }
          )
        }
        setLoading(false)
      console.log('user is here',currentUser)
    }
        else{
            setUser(null)
            setLoading(false)
             localStorage.removeItem('token')
        }
      
   })
 return()=>{
    unSubscribe()
 }

  },[axiosInstance])

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