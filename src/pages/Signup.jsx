import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {


 const navigate=useNavigate()
 

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
          [e.target.id] : e.target.value
  
  
        }
      )
    }
    const handelsumbit = async (e) => {
      //console.log("in handel sumbit of login")
    e.preventDefault();
      const response = await axios.post("http://localhost:5000/api/v1/users/register", registeruser,
        
                           { withCredentials: true}

        
      )
 // console.log("hi")
   //   console.log(response.data)

      navigate("/login")
    }
   

  return (
    <div className='min-h-screen w-full bg-amber-900 '>
      <div className='min-h-screen items-center flex   justify-center'>


                
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-blue-500 text-center">
            Get Started Now
          </h1>

          <p className="text-gray-500 text-center text-xl mt-2">
            Create your account
          </p>
          <form onSubmit={handelsumbit} className='flex flex-col gap-3 mt-6' action="">

            <label htmlFor="">FullName:</label>
            <input value={registeruser.fullname} onChange={handelchange} className="border border-gray-300 rounded-lg p-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" placeholder='name' id='fullname' />
            <label htmlFor="">Username:</label>
            <input value={registeruser.username} onChange={handelchange} className="border border-gray-300 rounded-lg p-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" placeholder='username' id='username' />
            <label htmlFor="">Email:</label>
            <input value={registeruser.email} onChange={handelchange} className="border border-gray-300 rounded-lg p-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" id='email' placeholder='email' />
            <label htmlFor="">Password</label>
            <input value={registeruser.password} onChange={handelchange} className="border border-gray-300 rounded-lg p-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-400" type="password" id='password' placeholder='Create A Password' />
            <label htmlFor="">Phone Number:</label>
            < input value={registeruser.number} onChange={handelchange} className="border border-gray-300 rounded-lg p-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-400" type="tel" name="" id="number" placeholder='number' />
            <button type='submit' className='text-white text-2xl font-bold rounded-xl p-3 bg-blue-800 hover:bg-blue-500 transition-shadow '>sign in</button>
          </form>
        </div>




      </div>


    </div>
  )
}

export default Signup
