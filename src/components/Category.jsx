import React,{useEffect,useState} from 'react'
import {Link, useParams} from "react-router-dom"
import {getDocs,collection,query,where,limit,orderBy, startAfter} from "firebase/firestore"
import{db} from "../firebase.config"
import { toast } from 'react-toastify'
import Item from './Item'
import Spinner from './Spinner'




function Category() {
    const params = useParams()
    const [posts,setPosts] = useState(null)
    const [loader,setLoader] = useState(true)
    const [lastpost,setlastpost] = useState(null)


    
    useEffect(()=>{
        const fetchcategory = async()=>{
            try {
                const docref = collection(db,'posts')
                const q = query(
                    docref,
                    where('category','==',params.categoryName),
                    limit(10)
                )
                const docsnap = await getDocs(q)
                const lastVisible = docsnap.docs[docsnap.docs.length - 1]

                setlastpost(lastVisible)
             
              
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
    },[params.categoryName])

      //pagination

      const seemore = async()=>{
        try {
            const docref = collection(db,'posts')
            const q = query(
                docref,
                where('category','==',params.categoryName),
                startAfter(lastpost),
                limit(10)
            )
            const docsnap = await getDocs(q)
            const lastVisible = docsnap.docs[docsnap.docs.length - 1]

            setlastpost(lastVisible)
         
          
            let results = []
            docsnap.forEach((d)=>{
           
                return (
                    results.push({
                        id:d.id,
                        data:d.data()
                    })
                )
                  
            })
       
        
            setPosts(prev=>[...prev,...results])
            setLoader(false)
        } catch (error) {
            toast.error("could not fetch data")
     
        }
    }   


    if(loader){
        return (
          <div className='flex align-middle justify-center pt-20'>
          <Spinner/>
    
          </div>
        )
    }
  return (
    <div className='container mx-auto p-5'>
      <h1 className='text-3xl mb-7 font-bold '>Choose Categories</h1>
    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 '>
    <ul className="menu bg-base-100 w-56  rounded-box sm:hidden md:block lg:block hidden">
   
    <li>
          <Link to='/category/technology' >    
            Technology
          </Link>
        </li>
      
        <li>
        <Link to='/category/politics' >    
            Politics
        </Link>
        </li>
        <li>
          <Link to='/category/sport' >    
            Sport
          </Link>
        </li>
      
        <li>
        <Link to='/category/entertainment' >    
            Entertainment
        </Link>
        </li>
        <li>
          <Link to='/category/health' >    
            Health
          </Link>
        </li>
      
        <li>
        <Link to='/category/gaming' >    
            Gaming
        </Link>
        </li>
        <li>
        <Link to='/category/fashion' >    
            Fashion
        </Link>
        </li>
   </ul>

   <div className='grid col-span-3 sm:col-span-1 md:col-span-2 lg:col-span-3' >

   {posts && (
     posts.map(post=>{
       return (
         <Item key={post.id} post={post.data} id={post.id}/>
       )
     })
   ) }
   {
          lastpost && (
            <div className='text-center'>
            <button className='btn btn-dark' onClick={seemore}>See more</button>
            </div>  
          )
        }

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

export default Category