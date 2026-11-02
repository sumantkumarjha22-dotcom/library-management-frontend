import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Userprofile = () => {
  const [userdetail, setuserdetail] = useState({
    fullname: "",
    email: "",
    username: "",
  })

console.log("helliiiii0")


  useEffect(() => {
    const getuserdetails = async () => {
     try {
       const userdata = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/detail`, {
         withCredentials: true
       })
       const profile = userdata.data.data.userdetails
       setuserdetail({
         fullname: profile.fullname,
         email: profile.email,
         username: profile.username,
       })
     }
      catch (error) {
        console.log("in getuserdetaills");
     }
    }

    getuserdetails()
  }, [])


const [collected, setcollected] = useState([])

  useEffect(() => {

    const getbookcollection = async () => {
      try {
        console.log("helloooooooo")

        const collection = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/giveusercollectrequest`, {
          withCredentials: true
        })
         console.log("2")
       console.log( "collection",collection.data.data.findcollectedbook)
       
        setcollected(collection.data.data.findcollectedbook)

        console.log(collection)

        
      }
      


      catch (error) {
        console.log("in getbookcollection")
        
      }


    }
    getbookcollection()
  }, [])



return (
  <div className="w-full min-h-screen bg-gray-100">
    <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
        <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl sm:text-4xl font-bold uppercase">
          {userdetail.fullname?.charAt(0) || "?"}
        </div>

        <div className="min-w-0 text-center sm:text-left">
          <h1 className="text-xl sm:text-3xl font-bold text-slate-800 break-words">
            {userdetail.fullname}
          </h1>
          <p className="mt-1 text-sm sm:text-base text-slate-500 break-all">
            @{userdetail.username}
          </p>
          <p className="mt-1 text-sm sm:text-base text-slate-600 break-all">
            {userdetail.email}
          </p>
        </div>
      </div>

      {/* Collected Books */}
      <h2 className="mt-8 mb-4 text-lg sm:text-2xl font-bold text-slate-800">
        My Collected Books
      </h2>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">

            <thead className="bg-gray-50">

              <tr>
                <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-semibold uppercase tracking-wide text-slate-600">
                  BookName
                </th>

                <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-semibold uppercase tracking-wide text-slate-600">
                  BookId
                </th>
                {/* <th className="text-left p-4">
                  uaername
                </th> */}

                {/* <th className="text-left p-4">
                  userid
                </th> */}
                <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-semibold uppercase tracking-wide text-slate-600">
                  collectdate
                </th>

                <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-semibold uppercase tracking-wide text-slate-600">
                  sumbitdate
                </th>

                <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-semibold uppercase tracking-wide text-slate-600">
                  status
                </th>
              </tr>

            </thead>

            <tbody>
              {collected.map((book)=>{

                return (
                  <tr key={book.BookId} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">

                    <td className="p-3 sm:p-4 text-sm sm:text-base font-medium text-slate-800">
                      {book.BookName}
                    </td>

                    <td className="p-3 sm:p-4 text-sm sm:text-base text-slate-500 break-all">
                      {book.BookId}
                    </td>

                    {/* <td className="p-4">
                      {book.UserName}
                    </td> */}
                    {/* <td className="p-4">
                      {book.UserId}
                    </td> */}

                    {/* TODO: replace "—" with your real date fields */}
                    <td className="p-3 sm:p-4 text-sm sm:text-base text-slate-400">
                      —
                    </td>

                    <td className="p-3 sm:p-4 text-sm sm:text-base text-slate-400">
                      —
                    </td>

                    <td className="p-3 sm:p-4">
                      <button className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs sm:text-sm font-semibold cursor-default">
                        {book.Status}
                      </button>
                    </td>

                  </tr>
                )
              })}
            </tbody>

          </table>
        </div>

        {/* Empty State */}
        {collected.length === 0 && (
          <p className="text-center text-slate-500 text-sm sm:text-base py-10">
            You haven't collected any books yet.
          </p>
        )}
      </div>

    </div>
  </div>
);

}
export  {Userprofile}