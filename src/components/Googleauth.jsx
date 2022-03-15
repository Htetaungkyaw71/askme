import React from 'react'
import {getAuth,GoogleAuthProvider,signInWithPopup} from "firebase/auth"
import {setDoc,doc,getDoc, serverTimestamp} from "firebase/firestore"
import {db} from "../firebase.config"
import {useNavigate,useLocation} from "react-router-dom"
import { toast } from 'react-toastify'
import {FaGoogle} from "react-icons/fa"



function Googleauth() {


    const navigate = useNavigate()
    const location = useLocation()
    const handleGoogle = async()=>{
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const response = await signInWithPopup(auth,provider)
    
                const user = response.user
                const docref = doc(db,'users',user.uid)
                const userdoc = await getDoc(docref)
                if(!userdoc.exists()){
                    await setDoc(doc(db,'users',user.uid),{
                        name:user.displayName,
                        email:user.email,
                        timestamp:serverTimestamp()
                    })
                }
                navigate('/')
        } catch (error) {
            let a = error.message
            toast.error(`${a.substring(9)}`)
        }
     
            
        

    }

  return (   
      <div className='text-center'>
    <button className='btn btn-outline mt-3' onClick={handleGoogle}>Sign {location.pathname == '/sign-in'?'In':'Up'} With  <FaGoogle className='ml-2'/></button>

      </div>

  )
}

export default Googleauth