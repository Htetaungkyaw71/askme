import React from 'react'
import {Navigate,Outlet} from "react-router-dom"
import {AuthChange} from "./AuthChange"
import Spinner from './Spinner'

function PrivateRoute() {
    const {isloggedIn,loader} = AuthChange()

    if(loader){
        return  <div className='flex align-middle justify-center pt-20'>
        <Spinner/>
  
        </div>
    }
    
    return isloggedIn ? <Outlet/> : <Navigate to="/sign-in" />
}

export default PrivateRoute