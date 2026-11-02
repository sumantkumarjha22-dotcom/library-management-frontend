import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {


  const navigate = useNavigate()


  const [registeruser, setregisteruser] = useState(
    {
      username: "",
      fullname: "",
      email: "",
      password: "",
      number: "",

    })

  const handelchange = async (e) => {
    setregisteruser(
      {
        ...registeruser,
        [e.target.id]: e.target.value


      }
    )
  }

  
  const handelsumbit = async (e) => {
    console.log("in handel sumbit of login")

    console.log("helo");
    e.preventDefault();
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/register`, registeruser,

      { withCredentials: true }


    )
    console.log("hi")

   

    navigate("/login")
  }


  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-amber-900 via-amber-800 to-orange-700'>
      <div className='min-h-screen flex items-center justify-center px-4 py-8 sm:px-6'>

        <div className="w-full max-w-md bg-white p-6 sm:p-10 rounded-2xl shadow-2xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 text-center">
            Get Started Now
          </h1>

          <p className="text-gray-500 text-center text-base sm:text-xl mt-2">
            Create your account
          </p>
          <form onSubmit={handelsumbit} className='flex flex-col gap-3 sm:gap-4 mt-6' action="">

            <label className='text-base sm:text-lg font-medium text-gray-700' htmlFor="fullname">FullName:</label>
            <input value={registeruser.fullname} onChange={handelchange} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" type="text" placeholder='name' id='fullname' />
            <label className='text-base sm:text-lg font-medium text-gray-700' htmlFor="username">Username:</label>
            <input value={registeruser.username} onChange={handelchange} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" type="text" placeholder='username' id='username' />
            <label className='text-base sm:text-lg font-medium text-gray-700' htmlFor="email">Email:</label>
            <input pattern=".+@gmail.com" maxLength={30} required value={registeruser.email} onChange={handelchange} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" type="text" id='email' placeholder='.+@gmail.com' />
            <label className='text-base sm:text-lg font-medium text-gray-700' htmlFor="password">Password</label>
            <input value={registeruser.password} onChange={handelchange} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" type="password" id='password' placeholder='Create A Password' />
            <label className='text-base sm:text-lg font-medium text-gray-700' htmlFor="number">Phone Number:</label>
            < input type="number" minLength={10} maxLength={10} required value={registeruser.number} onChange={handelchange} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" type="tel" name="" id="number" placeholder='number' />
            <button type='submit' className='w-full mt-2 text-white text-xl sm:text-2xl font-bold rounded-xl py-3 bg-blue-800 hover:bg-blue-500 active:scale-95 transition shadow-md'>sign in</button>
          </form>
        </div>




      </div>


    </div>
  )
}

export default Signup