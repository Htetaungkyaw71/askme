import React,{useEffect,useState} from 'react'
import {getAuth,updateProfile} from "firebase/auth"
import {updateDoc,doc,getDocs, where,collection,query,limit,startAfter, deleteDoc} from "firebase/firestore"
import {db} from "../firebase.config"
import { Link, useNavigate } from 'react-router-dom'
import {FaPlus} from "react-icons/fa"
import { toast } from 'react-toastify'
import Spinner from './Spinner'
import Item from './Item'






function Profile() {
  const navigate = useNavigate()
  const [user,setuser] = useState(null)
  const [posts,setPosts] = useState(null)
  const [loader,setLoading] = useState(null)
  const [detail,setDetail] = useState(false)
  const [lastpost,setlastpost] = useState(null)

  const auth = getAuth()
  const [formdata,setformdata] = useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email
  })
 

  useEffect(()=>{  
      setuser(auth.currentUser)
      const fetchposts = async()=>{
        try {
          const docref = collection(db,'posts')
          const q = query(
            docref,
            where('userRef','==',auth.currentUser.uid),
            limit(10)
          )
          const p = await getDocs(q)
          const lastVisible = p.docs[p.docs.length - 1]

          setlastpost(lastVisible)
       
            let results = []
            p.forEach(a=>{
          
              results.push({
                id:a.id,
                data:a.data()
              })
            })
            setPosts(results)
            setLoading(false)
        } catch (error) {
            toast.error('cannot fetch data')
        }
          
          
          
      
      }
      fetchposts()
  },[auth.currentUser])

  const seemore = async()=>{
    try {
      const docref = collection(db,'posts')
      const q = query(
        docref,
        where('userRef','==',auth.currentUser.uid),
        startAfter(lastpost),
        limit(10)
      )
      const p = await getDocs(q)
      const lastVisible = p.docs[p.docs.length - 1]

      setlastpost(lastVisible)
   
        let results = []
        p.forEach(a=>{
      
          results.push({
            id:a.id,
            data:a.data()
          })
        })
        setPosts(prev=>[...prev,...results])
        setLoading(false)
    } catch (error) {
        toast.error('cannot fetch data')
    }
      
      
      
  
  }
  


  const {name,email} = formdata


  const handlechange = (e)=>{
    setformdata(prev=>{
      return (
        {
          ...prev,
          [e.target.id] : e.target.value
        }
      )
    })
  }

  const logOut = ()=>{
    auth.signOut()
    navigate('/')
  }
  const onSubmit = async(e)=>{
      
      try {
        if (auth.currentUser.displayName !== name){
          await updateProfile(auth.currentUser,{
            displayName:name
          })
            const docref = doc(db,'users',auth.currentUser.uid)
            await updateDoc(docref,{
              name
            })
        }
       
      } catch (error) {
          toast.error("can not update name")
      }
  }

  const handleDelete = async(id)=>{
    if(window.confirm("are you sure to delete?")){
      const docref = doc(db,'posts',id)
      await deleteDoc(docref)

      let newposts = posts.filter(a=>a.id !== docref.id)
      setPosts(newposts)
      

    }
  }

  if(loader){
    return ( <div className='flex align-middle justify-center pt-20'>
                <Spinner/>
              </div>
            )
  }

  return (
    user && (
      
      <div className='p-5 mt-5'>



  

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2  ">
        
        
        <form className='form-control mb-5 ' >
        <h1 className='mb-5 text-4xl font-bold'>Personal Profile </h1>
        <label className="label">
          <span className='label-text-alt'></span>
    <span className="label-text-alt font-bold text-base cursor-pointer"  onClick={(e)=>{
          e.preventDefault()
        detail && onSubmit()
        setDetail(prev=>!prev)
        }}>  {detail ? 'done' : 'change'}</span>
         
   
    </label>

        <input type="text" 
            name="name" 
            id="name" 
            className='input input-bordered mb-3 text-base' 
            value={name}
            onChange={handlechange} 
            disabled={!detail && true}      
            />

            <input type="email" 
            name="email" 
            id="email" 
            className='input input-bordered mb-3 text-base' 
            value={email}
            disabled
            />


          
        <Link to='/create' className='btn btn-ghost mb-4 mt-5 btn-md text-md font-bold mr-5'>
          Create Your Question <FaPlus className='ml-1'/>
          </Link>
    
          
        </form>
        <div className='text-right'>
      
        <button onClick={logOut} className='btn btn-outline mb-4 mt-5 btn-sm'>LogOut</button> 
        </div>
  
      </div>
      <h1 className='text-3xl mb-7 font-bold '>Your Questions</h1>
      <div className='grid col-span-3 sm:col-span-1 md:col-span-2 lg:col-span-3'>
      

        {posts && (
        posts.map(post=>{
          return (
            <Item key={post.id} post={post.data} id={post.id} ondelete={()=>handleDelete(post.id)} onedit={true}/>
          )
        })
      ) }

        {
          lastpost && (
            <div className='flex justify-center'>
            <button className='btn btn-dark' onClick={seemore}>See more</button>
            </div>  
          )
        }
      </div>
    
  
      

    
      </div>

    )
  )
}

export default Profile