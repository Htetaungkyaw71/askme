import React, { useState } from 'react'
import {Link,useNavigate} from "react-router-dom"
import {getAuth,sendPasswordResetEmail} from "firebase/auth"
import { toast } from 'react-toastify'

function Forgetpassword() {
  const [email,setEmail] = useState("")

  const handlechange = (e)=>{
      setEmail(e.target.value)
  }
  const navigate = useNavigate()
  const handleSubmit = async(e)=>{
    const auth = getAuth()
   
      e.preventDefault()
      await sendPasswordResetEmail(auth,email)
      toast.success("Email was sent")
      navigate('/sign-in')
  }

  return (
    <div>
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
            <form className='form-control' onSubmit={handleSubmit} >
          

            <input type="email" 
            name="email" 
            id="email" 
            className='input input-bordered mb-3' 
            placeholder='Email'
            value={email}
            onChange={handlechange} />


        <button type='submit' className='btn btn-primary'>Submit</button>
    
        <Link to="/sign-in" className="link link-neutral mt-3">
            SignIn
        </Link>
            </form>
     
            </div>
          
    </div>
  )
}

export default Forgetpassword