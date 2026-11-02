import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()

  const [registeruser, setregisteruser] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    number: "",
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handelchange = (e) => {
    setError("")
    setregisteruser({
      ...registeruser,
      [e.target.id]: e.target.value
    })
  }

  const handelsumbit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/register`,
        registeruser,
        { withCredentials: true }
      )

      if (response.status === 200 || response.status === 201) {
        navigate("/login")
      }
    } catch (err) {
      console.error("Signup error:", err)
      const errorMessage =
        err.response?.data?.message ||
        (typeof err.response?.data === "string" ? err.response.data : "") ||
        err.message ||
        "Registration failed. Please try again."
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
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

          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 text-sm rounded-lg text-center">
              {error}
            </div>
          )}

          <form onSubmit={handelsumbit} className='flex flex-col gap-3 sm:gap-4 mt-6'>
            <label className='text-base sm:text-lg font-medium text-gray-700' htmlFor="fullname">FullName:</label>
            <input value={registeruser.fullname} onChange={handelchange} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" type="text" placeholder='name' id='fullname' required />

            <label className='text-base sm:text-lg font-medium text-gray-700' htmlFor="username">Username:</label>
            <input value={registeruser.username} onChange={handelchange} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" type="text" placeholder='username' id='username' required />

            <label className='text-base sm:text-lg font-medium text-gray-700' htmlFor="email">Email:</label>
            <input pattern=".+@gmail.com" maxLength={30} required value={registeruser.email} onChange={handelchange} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" type="text" id='email' placeholder='.+@gmail.com' />

            <label className='text-base sm:text-lg font-medium text-gray-700' htmlFor="password">Password</label>
            <input value={registeruser.password} onChange={handelchange} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" type="password" id='password' placeholder='Create A Password' required />

            <label className='text-base sm:text-lg font-medium text-gray-700' htmlFor="number">Phone Number:</label>
            <input type="tel" minLength={10} maxLength={10} required value={registeruser.number} onChange={handelchange} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" id="number" placeholder='number' />

            <button disabled={loading} type='submit' className='w-full mt-2 text-white text-xl sm:text-2xl font-bold rounded-xl py-3 bg-blue-800 hover:bg-blue-500 active:scale-95 transition shadow-md disabled:opacity-50'>
              {loading ? "Registering..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
