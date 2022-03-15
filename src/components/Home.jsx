import React, { useState,useEffect } from 'react'
import {Link} from "react-router-dom"
import {getDocs,collection,query,limit,orderBy, startAfter,startAt,endAt} from "firebase/firestore"
import {db} from "../firebase.config"
import Item from './Item'
import { toast } from 'react-toastify'
import Spinner from './Spinner'



function Home() {
  const [posts,setPosts] = useState(null)
  const [searchposts,setSearchposts] = useState(null)
  const [search,setSearch] = useState("")
  const [loader,setLoading] = useState(true)
  const [searchloader,setsearchloader] = useState(true)
  const [lastpost,setlastpost] = useState(null)
  

  useEffect(()=>{
      const fetchposts = async()=>{
        try {
          const docref = collection(db,'posts')
          const q = query(
            docref,
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
  },[])




  //pagination
  const seemore = async()=>{
    try {
      const docref = collection(db,'posts')
      const q = query(
        docref,
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



  // Search
  useEffect(()=>{
    const fetchposts = async()=>{
      try {
        const docref = collection(db,'posts')
        const q = query(
          docref,
          orderBy('title'),
          startAt(search),
          endAt(search + '\uf8ff')         
        )
        const p = await getDocs(q)
     
     
          let results = []
          p.forEach(a=>{
        
            results.push({
              id:a.id,
              data:a.data()
            })
          })

          setSearchposts(results)
          setsearchloader(false)
          setLoading(false)
      } catch (error) {
          toast.error('cannot fetch data')
          console.log(error)
      }
        
        
        
    
    }
    fetchposts() 
  },[search])

  const handlechange = (e)=>{
 
    setSearch(e.target.value)
    setsearchloader(true)
  
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
       <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 '>
       <ul className="menu bg-base-100 w-56  rounded-box sm:hidden md:block lg:block hidden">
       <div className="form-control">
        <input type="text" placeholder="Search" value={search} className="input input-bordered" onChange={handlechange}/>
      </div>
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
      <div className='grid col-span-3 sm:col-span-1 md:col-span-2 lg:col-span-3'>

      {posts && search === "" && (
        posts.map(post=>{
          return (
            <Item key={post.id} post={post.data} id={post.id} />
          )
        })
      ) }

      {searchposts && search !== "" && (
        searchposts.map(post=>{
          return (
            <Item key={post.id} post={post.data} id={post.id} />
          )
        })
      ) }
      {searchloader && (
      <div className='flex align-middle justify-center pt-20'>
      <Spinner/>

      </div>
      )} 

        {
          lastpost &&   (
            <div className='flex justify-center'>
            <button className='btn btn-dark' onClick={seemore}>See more</button>
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

export default Home