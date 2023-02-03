import React from 'react'
import { useEffect } from 'react'

const Logout = () => {
    const logout = ()=>{
        localStorage.removeItem("userInfo");
    };
    useEffect(()=>{
        logout();
    },[])
  return (
    <div>Logout</div>
  )
}

export default Logout