import React,{useEffect,useState,useRef} from 'react'
import { getAuth,onAuthStateChanged } from 'firebase/auth'
import {addDoc, collection, serverTimestamp} from "firebase/firestore" 
import {db} from "../firebase.config"
import {useNavigate} from "react-router-dom"
import { toast } from 'react-toastify'



function Create() {
    const navigate = useNavigate()
    const auth = getAuth()
    let isMounted = useRef(true)
    const [formdata,setFormdata] = useState({
        title:'',
        body:'',
        category:'technology',
        answers:[]
    })

    useEffect(()=>{
        if(isMounted){
            onAuthStateChanged(auth,user=>{
                if(user){
                    setFormdata({...formdata,userRef:user.uid})
                }else{
                    navigate('/sign-in')
                }
            })

        }   
        return ()=>isMounted.current = false
    },[isMounted])

    const handlechange = (e)=>{
        setFormdata(prev=>{
            return {
                ...prev,
                [e.target.id]:e.target.value
            }
        })
    }

    const {title,body,category} = formdata

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {  
            const docref = collection(db,'posts')
            const formcopy = {...formdata}
            formcopy.timestamp = serverTimestamp()
            const response = await addDoc(docref,formcopy)
            toast('question was created')
            navigate(`/detail/${response.id}`)    
            
        } catch (error) {
            toast.error("cannot create question")
            console.log(error)
        }
      


    }

  return (
    <div className='p-5'>
       
    <div className='container mx-auto p-5'>
    <p className='text-3xl mb-5 font-bold '>
        Create question
    </p>
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
        <form className='form-control' onSubmit={handleSubmit} >
      

        <input type="text" 
        name="title" 
        id="title" 
        className='input input-bordered mb-3' 
        placeholder='Title'
        value={title}
        onChange={handlechange} />
        
        
        <input type="text"
        name='body'
        id="body" 
        className='input input-bordered mb-3 ' 
        placeholder='Body' 
        value={body}
        onChange={handlechange}/>


        <select className="select select-bordered w-full max-w-xs mb-3" onChange={handlechange} id="category" name='category' value={category}>
        <option disabled defaultValue={'technology'}>Select Categories?</option>
        <option value='technology'>Technology</option>
        <option value='politics'>Politics</option>     
        <option value='sport'>Sport</option>
        <option value='entertainment'>Entertainment</option>
        <option value='health'>Health</option>
        <option value='gaming'>Gaming</option>
        <option value='fashion'>Fashion</option>
        </select>


      


    <button type='submit' className='btn btn-dark mb-5'>Submit</button>

  

   
        </form>
 
        </div>
       

    </div>
  

</div>
  )
}

export default Create