import React from 'react'
import {Link} from "react-router-dom"
import {FaTrash,FaEdit} from "react-icons/fa"

function Item({post,id,ondelete,onedit}) {
  return (
    <div className='mb-5'>


            <p className='mb-2' >
        <Link to={`/detail/${id}`} className='text-xl text-blue-800'>
            {post.title}
        </Link>
        
        <br  />
      

           {`${post.body.slice(0,100)}...`}
            </p>
            <label className='label mb-3'>
            <span className="label-text-alt gap-2 mt-2">
           
            { post.answers.length > 1 ?  <span className="badge mr-3"> {post.answers.length} answers </span>  :<span className="badge mr-3"> {post.answers.length} answer </span>}
            <span className='badge mr-3 mt-2'>
            {post.timestamp &&  <span>{`Asked ${new Date(post.timestamp.seconds * 1000).toLocaleDateString("en-US")}`}</span> }
            
            </span>
            <span className='badge mt-2 '>
            {post.category}
            </span>
           
            </span>
        
          


     
            <span className="label-text-alt">
              {onedit && (
                <span>
                 
                    <Link  to={`/edit/${id}`}>
                    <FaEdit className='font-semibold text-2xl inline mr-5 text-green-400 mb-2'>
                    </FaEdit>
                      </Link>
                   
                </span>
              
               
              )}
              {
                ondelete && (
                  <span onClick={ondelete} >
                      <FaTrash className='font-semibold text-2xl inline text-red-600 cursor-pointer mb-2'>

                      </FaTrash>
                  </span>
                  
             
                )
              }
              
             
            </span>
        
            </label>
            <hr />
            
  </div>
  )
}

export default Item
