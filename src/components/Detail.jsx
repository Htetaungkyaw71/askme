import React,{useState,useEffect,useRef} from 'react'
import {getDoc,doc,updateDoc} from "firebase/firestore"
import {db} from "../firebase.config"
import {useParams,useNavigate} from "react-router-dom"
import { toast } from 'react-toastify'
import Spinner from './Spinner'
import {getAuth,onAuthStateChanged} from "firebase/auth"
import { v4 as uuidv4 } from 'uuid';





function Detail() {
    const [post,setpost] = useState(null)
    const [loader,setloader] = useState(true)
    let isMounted = useRef(true)
    const auth = getAuth()
    const params = useParams()
    const navigate = useNavigate()

    const [comment,setComment] = useState({
        id:"",
        text:"",
        vote:0,
        like_user:[],
        userRef:''
    })
    useEffect(()=>{
        if(isMounted){
            onAuthStateChanged(auth,user=>{
                if(user){
                    setComment(prev=>{
                        return {
                            ...prev,
                            'userRef':user.uid,
                            
                            
                        }
                    })
                }else{
                    navigate('/sign-in')
                }
            })

        }   
        return ()=>isMounted.current = false
    },[isMounted])
  

    const {text} = comment
 

    const handleVote = async(item)=>{
       
        const postcopy = {...post} 
        postcopy.answers.map(a =>{
      

            if(a === item){
                if(a.like_user.includes(auth.currentUser.uid)){
                    --a.vote 
                    a.like_user = a.like_user.filter(b=>{
                        return b !== auth.currentUser.uid
                    })
                }else{
                    ++a.vote
                    a.like_user.push(auth.currentUser.uid)
                    
                }
                       
            }
        return postcopy
        })
  
        const docref = doc(db,"posts",params.postId)
        await updateDoc(docref,postcopy)
                
    }



    useEffect(()=>{
        const fetchpost = async()=>{
            try {
                const docref = doc(db,'posts',params.postId)
                const response = await getDoc(docref)

                if(response.exists()){
                    setpost(response.data())
                    setloader(false)
                }
                

            } catch (error) {
                toast.error("cannot get post data")
            }
        }
        fetchpost()
    },[navigate,params.postId,handleVote])


    

    // answers
   
    const handleSubmit = async(e) =>{
        e.preventDefault()
        if(comment.text !== ""){
            const postcopy = {...post}
            postcopy.answers.push(comment)
    
                    
            const docref = doc(db,"posts",params.postId)
            await updateDoc(docref,postcopy)
            setComment(prev=>{
                    return {
                        ...prev,
                        'text':"",
                    }
                })
            navigate(`/detail/${params.postId}`)
        }
        else{
            toast.error('you need to fill the answer')
        }
   
      
    }

    const handleChange = (e)=>{
        setComment(prev=>{
            return {
                ...prev,
                'id':uuidv4(),
                'text':e.target.value,
            }
        })
    }
    
    if(loader){
        return (
            <div className='flex align-middle justify-center pt-20'>
                <Spinner/>
      
            </div>
        )
    }
    


   

   



  return (
      post && (
        <div className='p-5 pt-0'>
            <div className='grid grid-cols-10 gap-4 sm:grid-cols-10 md:grid-cols-8 lg:grid-cols-6 '>
              
                <div className='col-start-2 col-span-8  sm:col-span-10 md:col-span-6 md:col-start-2 lg:col-span-4 lg:col-start-2 '>
                <p className='mb-3 text-3xl'>
                {post.title}
                </p>
                <span className='mt-3' >
                     {post.timestamp &&  <b>{`Asked ${new Date(post.timestamp.seconds * 1000).toLocaleDateString("en-US")}`}</b> }
                </span>
                <span className='badge mb-5 mt-3 ml-3'>
                    {post.category}
                </span>
                <hr />
                <p className='mt-4 mb-5'>
                    {post.body}
                </p>
                <hr />

                <div className="mt-5 mb-5">
                    
                        <form onSubmit={handleSubmit}>
                        <textarea className="textarea textarea-bordered w-full h-40"   placeholder="Enter your answer…" onChange={handleChange} value={text}></textarea>
                            <br />
                            <button className="btn btn-dark">
                                Submit Your answer
                            </button>
                        </form>
                   
                    </div>

                 
                    { post.answers.length > 1 ?  <h1 className="text-2xl font-bold "> {post.answers.length} answers </h1>  :<h1 className="text-2xl font-bold "> {post.answers.length} answer </h1>}
                        
                        <div>
                            {post.answers.sort((a, b) => b.vote - a.vote).map(a=>{
                                return (
                                    <div key={a.id} className='mt-5'>
                                           <span className='text-lg font-semibold underline'>
                                           { a.vote > 1 ?  <span className="link"> { a.vote} votes </span>  :<span className="link "> {a.vote} vote </span>}
                                            </span>
                                            <div className='flex justify-between mt-1 '>

                                            {a.text}

                                            
                                            <button className='btn btn-outline text-right btn-sm' onClick={()=>handleVote(a)}>{a.like_user.includes(auth.currentUser.uid) ? 'Unvote':'Vote' }</button>
             
                                        </div>
                                      
                                      
                                    </div>
                                )
                            })}
               
                        </div>
                      
                  
                 
                  
            
                
                    
         
                </div>
             
            </div>
        
        </div>
      )
  
  )
}

export default Detail