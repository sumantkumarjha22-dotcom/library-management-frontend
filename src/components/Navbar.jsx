import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
//import { Query } from 'mongoose';

  


const Navbar = () => {
  const navigate = useNavigate()
   const [search, setsearch] = useState("")
   const handelsearch = (e)=>{
     setsearch(e.target.value)

   }

 const handelsearchbutton = ()=>{
  navigate("/search",{
    state:{
      query:search
    }
  })
   
 }

 

  const [user, setuser] = useState("")

  useEffect(() => {
    
    const getuserdetail = async () => {
     // console.log(" i am in nabvbar")
      const userdata = await axios.get("http://localhost:5000/api/v1/users/pofile",
        {
          withCredentials: true
        }

      )

      const profile = userdata.data.data.userprofile;
      setuser(profile.username);


    }
    getuserdetail()

  }, [])


  const logouthadeler = async () => {
    const response = await axios.post(
      "http://localhost:5000/api/v1/users/logout",
      {},
      {
        withCredentials: true
      }
    );
    window.location.reload();

  }


  return (
    <>

<nav className='flex bg-slate-300 justify-between sticky top-0 z-50 shadow-md'>

      <div className='font-bold text-4xl pt-2 pl-3'>
        <button onClick={()=>{navigate("/home")}}>
          bookApp
        </button>
      </div>
      <div className='mt-3 flex'>
           <input
              type="text"
              placeholder="search for books"
              value={search}
              id='search'
              onChange={handelsearch}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 outline-none focus:border-blue-500"
            />

            <button onClick={handelsearchbutton}
              
                className=" flex items-center gap-2 rounded-lg text-2xl bg-blue-600 px-5 py-3  font-medium text-white hover:bg-blue-700"
            >
                <FaSearch />
               searchd
              
            </button> </div>

      <ul className=' flex items-center  gap-6 h-18 mx-9 text-2xl text-white justify-center pl-4'>

        {/* Username */}
         <li  className=' flex cursor-pointer p-3 hover:font-black'>
            <button  className='flex items-center gap-2 '  onClick={() => navigate("/ai")}>
             Al Help
                  
            </button>
          </li>
        {user && (
          <li  className=' flex cursor-pointer p-3 hover:font-black'>
            <button  className='flex items-center gap-2 '  onClick={() => navigate("/userprofile")}>
             <FaUser />
                  {user}
            </button>
          </li>
        )}

        {/* Login and Signup only when NOT logged in */}
        {!user && (
          <>
            <li className='cursor-pointer p-3 hover:font-black'>
              <Link to="/login">Login</Link>
            </li>

            <li className='cursor-pointer p-3 hover:font-black'>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}

        {/* Logout only when logged in */}
        {user && (
          <li className='cursor-pointer p-3 hover:font-black'>
            <button  className='' onClick={logouthadeler}>
              Logout
            </button>
          </li>
        )}

      </ul>

    </nav>

    </>
  )
}

export default Navbar
