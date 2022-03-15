import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()
  const [search,setSearch] = useState("")

  const handleSubmit = (e)=>{
    e.preventDefault()
    navigate(`/search/${search}`)
  }


  return (
   
    <div className="navbar bg-base-100  mt-5 mb-5">
    <div className="flex-1">
    <div className="dropdown block sm:block md:hidden lg:hidden">
      <label tabIndex="0" className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </label>
      <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
      <div className="form-control">
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search"  className="input input-bordered" value={search} onChange={(e)=>setSearch(e.target.value)} />

        </form>
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
    </div>
      <Link className="btn btn-ghost normal-case text-xl" to='/'>Askme</Link>
    </div>
    <div className="flex-none gap-2">
    
    <Link className="btn btn-ghost  " to='/profile'>
          Profile
            
    </Link>
       
      
    </div>
  </div>

  )
}

export default Navbar