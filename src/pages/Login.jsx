import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'


const Login = () => {

  const navigate = useNavigate()

  const [loginuser, setloginuser] = useState({

    username: "",
    password: "",
  })

  const handellogin = (e) => {
    e.preventDefault();
    //  console.log("in handel login")
    setloginuser({

      ...loginuser,
      [e.target.id]: e.target.value
    })

  }

  const handelsumbit = async (e) => {
    e.preventDefault();
    //console.log("in handelsubmit login")
    const response = await axios.post("http://localhost:5000/api/v1/users/login", loginuser,
      { withCredentials: true }
    )
    const is_admin_or_user = response.data.data.loggeduser.isAdmin
 console.log(is_admin_or_user)
    if (is_admin_or_user) {
      navigate("/admin");
    } else {
      navigate("/home");
    }
    window.location.reload();
  }




  return (
    <div className='w-full min-h-screen bg-gray-500 '>
      <div className=' min-h-screen flex justify-center items-center '>

        <div className='bg-white p-20 shadow-lg rounded-xl '>
          <h1 className="text-4xl font-bold text-blue-500 text-center">
            Welcome back
          </h1>


          <form onSubmit={handelsumbit} className='flex flex-col gap-4 mt-4' action="">

            <label className='text-2xl' htmlFor="">enter your userid or email</label>
            <input value={loginuser.username} onChange={handellogin} className="border border-gray-300 rounded-lg p-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-400" type="User" id='username' placeholder='userID or Email' />
            <label className='text-2xl' htmlFor="">enter your password</label>
            <input value={loginuser.password} onChange={handellogin} className="border border-gray-300 rounded-lg p-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-400" type="password" placeholder='password' name="" id="password" />
            <button type='submit' className='hover:bg-blue-400 bg-blue-700 rounded-xl p-3 m-3 text-white text-2xl font-bold'>login</button>




          </form>
          <p className="text-grey-700 text-center text-2xl mt-2">
            don't have acccount <button onClick={() => { navigate("/signup") }} className='text-blue-400 hover:underline'>signin</button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
