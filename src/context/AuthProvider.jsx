import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import { AuthContext } from './AuthContext';
import { auth } from '../firebase/firebase.config';
import { useEffect, useState } from 'react';

const AuthProvider = ({children}) => {
  const googleProvider =new GoogleAuthProvider();
  const [user,setUser]=useState(null);
  const [loading,setLoading] =useState(true);

  const createNewUser =(email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
  }
  const logInUser=(email,password)=>{
      setLoading(true)
    return signInWithEmailAndPassword (auth,email,password)
  }

  useEffect(()=>{
   const unSubscribe=onAuthStateChanged(auth,(currentUser)=>{
     if(currentUser){
        setUser(currentUser);
        setLoading(false)
      console.log('user is here',currentUser)
    }
        else{
            setUser(null)
        }
      
   })
 return()=>{
    unSubscribe()
 }

  },[])

 const updateUserProfile =(profileInfo)=>{
    return updateProfile(auth.currentUser,profileInfo)

 }
  
const googleSignIn =()=>{
      setLoading(true)
    return signInWithPopup(auth,googleProvider)
  }
const logOut=()=>{
      setLoading(true)
    return signOut(auth)
  }

  const Info={createNewUser, logInUser,googleSignIn,logOut,user,updateUserProfile
     }


    return (
        <AuthContext value={Info}>
         {children}
         </AuthContext>
            
    
    );
};

export default AuthProvider;