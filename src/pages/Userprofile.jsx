import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Userprofile = () => {
  const [userdetail, setuserdetail] = useState({
    fullname: "",
    email: "",
    username: "",
  })

console.log("hell0")


  useEffect(() => {
    const getuserdetails = async () => {
     try {
       const userdata = await axios.get("http://localhost:5000/api/v1/users/detail", {
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
        //console.log("hello")

        const collection = await axios.get("http://localhost:5000/api/v1/users/giveusercollectrequest", {
          withCredentials: true
        })
        // console.log(2)
       console.log( "collection",collection.data.data.findcollectedbook)
       
        setcollected(collection.data.data.findcollectedbook)

        
      }
      


      catch (error) {
        console.log("in getbookcollection")
      }


    }
    getbookcollection()
  }, [])



return (
     <div className="overflow-x-auto">
             <table className="w-full">

              <thead className="bg-gray-50">
            
                <tr>
                  <th className="text-left p-4">
                    BookName
                  </th>

                  <th className="text-left p-4">
                    BookId
                  </th>
                  {/* <th className="text-left p-4">
                    uaername
                  </th> */}

                  {/* <th className="text-left p-4">
                    userid
                  </th> */}
                  <th className="text-left p-4">
                    collectdate
                  </th>
  
                    <th className="text-left p-4">
                    sumbitdate
                  </th>
                 
                  <th className="text-left p-4">
                    status
                  </th>
                </tr>

              </thead>

     
{collected.map((book)=>{

          return     <tbody>
          
                <tr key={book.BookId} className="border-t">

                  <td className="p-4">
                    {book.BookName}
                  </td>

                  <td className="p-4">
                    {book.BookId}
                  </td>

                  {/* <td className="p-4">
                    {book.UserName}
                  </td> */}
                  {/* <td className="p-4">
                    {book.UserId}
                  </td> */}

                  <td className="p-4">
                   
  <button className="text-blue-600 mr-4">
    {book.Status}
  </button>

  

                  
                  </td>

                </tr>
              

              </tbody>
})}

            </table>
        
          </div>

        
);

}
export  {Userprofile}