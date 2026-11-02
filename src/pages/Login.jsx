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

    try {

   const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/v1/users/login`,
  loginuser,
  {
    withCredentials: true
  }
);

      console.log("response", response)

      if (response.status === 200) {

        const is_admin_or_user =
          response.data.data.loggeduser.isAdmin;


        if (is_admin_or_user) {
          navigate("/admin");
        } else {
          navigate("/home");
        }

        window.location.reload();
      }

    } catch (error) {
      console.log("error", error)

      if (error.response?.status === 401) {

        alert(error.response.data.message);

      } else if (error.response?.status === 400) {

        alert(error.response.data.message);

      } else {

        alert("Something went wrong");

      }

    }
  };

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-gray-700 via-gray-600 to-blue-900'>
      <div className='min-h-screen flex justify-center items-center px-4 py-8 sm:px-6'>

        <div className='w-full max-w-md bg-white p-6 sm:p-10 shadow-2xl rounded-2xl'>
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 text-center">
            Welcome back
          </h1>


          <form onSubmit={handelsumbit} className='flex flex-col gap-3 sm:gap-4 mt-6' action="">

            <label className='text-lg sm:text-xl font-medium text-gray-700' htmlFor="username">enter your userid or email</label>
            <input value={loginuser.username} onChange={handellogin} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" type="User" id='username' placeholder='userID or Email' />
            <label className='text-lg sm:text-xl font-medium text-gray-700' htmlFor="password">enter your password</label>
            <input value={loginuser.password} onChange={handellogin} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" type="password" placeholder='password' name="" id="password" />
            <button type='submit' className='w-full mt-2 bg-blue-700 hover:bg-blue-500 active:scale-95 transition rounded-xl py-3 text-white text-xl sm:text-2xl font-bold shadow-md'>login</button>




          </form>
          <p className="text-gray-700 text-center text-base sm:text-lg mt-5">
            don't have acccount <button type='button' onClick={() => { navigate("/signup") }} className='text-blue-500 font-semibold hover:underline'>signin</button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login