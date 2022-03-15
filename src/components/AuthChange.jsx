import React,{useEffect,useState,useRef} from 'react'
import {getAuth,onAuthStateChanged} from 'firebase/auth'




export const AuthChange = ()=> {
    const [isloggedIn,setisloggedIn] = useState(false)
    const [loader,setloading] = useState(true)
    let isMounted = useRef(true)
    useEffect(()=>{
        
        if(isMounted){           
            const auth = getAuth()
            onAuthStateChanged(auth,user=>{
                if(user){
                    setisloggedIn(true)
                    }
                    setloading(false)
                })
      
        }
                    
        return ()=> isMounted.current = false
        
    })
  return {isloggedIn,loader}
}

