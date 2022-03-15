import React,{useState} from 'react'
import {createUserWithEmailAndPassword,getAuth,updateProfile} from "firebase/auth"
import { setDoc,doc } from 'firebase/firestore'
import {db} from "../firebase.config"
import { toast } from 'react-toastify'
import {useNavigate} from "react-router-dom"
import {Link} from "react-router-dom"
import Googleauth from './Googleauth'




function Signup() {
    const navigate = useNavigate()
    const [showpassword,setShowpassword] = useState(false) 
    const [formdata,setFormdata] = useState({
        name:'',
        email:'',
        password:''
    })

    const {name,email,password} = formdata

    const handlechange = (e)=>{
        setFormdata(prev=>{
            return {
                ...prev,
                [e.target.id] :e.target.value
            }
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        
        try {
            const auth = getAuth()
            const response = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            const user = response.user
            updateProfile(auth.currentUser,{
                displayName:name
            })
            let formCopy = {...formdata}
            delete formCopy.password
            const docref = doc(db,'users',user.uid)
            await setDoc(docref,formCopy)
            navigate('/')

        } catch (error) {
            let a = error.message
            toast.error(`${a.substring(9)}`)
        }
    }   

  return (
    <div className='p-5'>
       
        <div className='container mx-auto p-5'>
        <p className='text-3xl mb-5 font-bold '>
            SignUp
        </p>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
            <form className='form-control' onSubmit={handleSubmit} >
            <input 
            type="text"
            name="name"
            id="name" 
            className='input input-bordered mb-3' 
            placeholder='Name' 
            value={name}
            onChange={handlechange} />

            <input type="email" 
            name="email" 
            id="email" 
            className='input input-bordered mb-3' 
            placeholder='Email'
            value={email}
            onChange={handlechange} />

            <input type={`${!showpassword ? 'password' : 'text'}`}
            name="password" 
            id="password" 
            className='input input-bordered mb-3' 
            placeholder='Password' 
            value={password}
            onChange={handlechange}/>
             <label class="label mt-2 mb-2">
                  <Link to="/forgetpassword" className="link link-neutral label-text-alt text-lg ">
                        Forget password?
                    </Link>
                  <span className="text-lg link link-neutral label-text-alt " onClick={()=>setShowpassword(prev=>!prev)}>Show password</span>

                  
                </label>

        <button type='submit' className='btn btn-dark mb-5'>Submit</button>
     
       
        <p>
            If you have already account
            <Link to="/sign-in" className="link link-neutral mt-3 ml-2">
                SignIn
            </Link>
        </p>
            </form>
     
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
            <Googleauth/>
            </div>
        
        </div>
      

    </div>
  )
}

export default Signup