import React,{useEffect,useState} from 'react'
import {useParams,useNavigate} from "react-router-dom"
import {getDocs,collection,query,orderBy, startAt,endAt} from "firebase/firestore"
import{db} from "../firebase.config"
import { toast } from 'react-toastify'
import Item from './Item'
import Spinner from './Spinner'




function Search() {
    const params = useParams()
    const navigate = useNavigate()
    const [posts,setPosts] = useState(null)
    const [loader,setLoader] = useState(true)
    const  search = params.text



    
    useEffect(()=>{

        const fetchcategory = async()=>{
            try {
                const docref = collection(db,'posts')
                const q = query(
                    docref,
                    orderBy('title'),
                    startAt(search),
                    endAt(search + '\uf8ff'),  
                )
                const docsnap = await getDocs(q)
             
             
              
                let results = []
                docsnap.forEach((d)=>{
               
                    return (
                        results.push({
                            id:d.id,
                            data:d.data()
                        })
                    )
                      
                })
           
            
                setPosts(results)
                setLoader(false)
            } catch (error) {
                toast.error("could not fetch data")
         
            }
        }   
        fetchcategory()
    },[params.text,navigate])

      

    


    if(loader){
        return (
          <div className='flex align-middle justify-center pt-20'>
          <Spinner/>
    
          </div>
        )
    }
  return (
    <div className='container mx-auto p-5'>
      <h1 className='text-3xl mb-7 font-bold '>Search</h1>
    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 '>
  

   <div className='grid col-span-3 sm:col-span-1 md:col-span-2 lg:col-span-3' >

   {posts && (
     posts.map(post=>{
       return (
         <Item key={post.id} post={post.data} id={post.id}/>
       )
     })
   ) }
   

   {
     posts.length === 0 &&(
      <div className='flex align-middle justify-center pt-20'>
      
      <h1>No questions here</h1>
      </div>
     )
   }
    
 
    


  

   
   
   </div>


   <div>

   </div>
    </div>
 </div>
  )
}

export default Search