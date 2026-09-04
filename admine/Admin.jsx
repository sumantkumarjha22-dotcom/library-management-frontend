import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

 import { useNavigate } from "react-router-dom";






const Admin = () => {

  const navigate = useNavigate()
  const [count, setcount] = useState([])
  const [avaliable, setavaliable] = useState(0);


  useEffect(() => {
    const getbookcount = async ( )=>{
 console.log("hello");
   try {
     const count = await axios.get("http://localhost:5000/api/v1/users/getadminbook" ,{withCredentials:true})
      const totalbook =count.data.data.books
       setcount(totalbook)
  
       let avaliablebooks =0;
       for(let i=0;i<totalbook.length;i++){
        avaliablebooks += totalbook[i].availablebook;
       }
       setavaliable(avaliablebooks);
console.log("Total available books:", avaliablebooks);
       

   } catch (error) {
      console.log("error in getting count of book",error.message);
   }
  }

  getbookcount()
  

  }, [])
  
 const [Request, setRequest] = useState([])

 useEffect(() => {
    
  const GetRequest =async ()=>{
  const response = await axios.get("http://localhost:5000/api/v1/users/getrequest",
    {
      withCredentials:true,
    })

   console.log("data is",response.data.data);
   const data=response.data.data
   setRequest(data)
   

  }
  GetRequest();

 }, [])


 const SendCollectRequestToServer =async (sendbook)=>{
  try {
    console.log("here")
  const response = await axios.post("http://localhost:5000/api/v1/users/availableornot",
    {
    BookId:sendbook.BookId,
    BookName:sendbook.BookName,
    _id:sendbook._id,
   },
   {
    withCredentials: true ,
   }
  )   

  const available =response.data.data.availablebook
      console.log("response data",response.data.data);

  } catch (error) {
     console.log("error in SendCollectRequestToServer",error.message)
  }
 }




  return (<>
    {/* Books / Requests */}
<div className="bg-white rounded-lg shadow mt-8">

  <div className="p-5 border-b">
    <h3 className="text-xl font-semibold">
      Book Requests
    </h3>
  </div>

  {Request.length ===0 ? (

    // No requests
    <div className="min-h-[50vh] flex flex-col justify-center items-center text-center">
      <div className="text-7xl mb-5">
        📚
      </div>

      <h2 className="text-2xl font-bold text-gray-800">
        No Requests
      </h2>

      <p className="text-gray-500 mt-2">
        There are no book requests at the moment.
      </p>
    </div>

  ) : (

    // Requests available
    <div className="overflow-x-auto">
      <table className="w-full">

        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-4">Book Name</th>
            <th className="text-left p-4">Book ID</th>
            <th className="text-left p-4">Username</th>
            <th className="text-left p-4">User ID</th>
            <th className="text-left p-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {Request.map((book) => (
            <tr
              key={book._id}
              className="border-t hover:bg-gray-50"
            >

              <td className="p-4">
                {book.BookName}
              </td>

              <td className="p-4">
                {book.BookId}
              </td>

              <td className="p-4">
                {book.UserName}
              </td>

              <td className="p-4">
                {book.UserId}
              </td>

              <td className="p-4">
                <button
                  onClick={() => SendCollectRequestToServer(book)}
                  className="text-green-600 hover:text-green-800 font-medium mr-4"
                >
                  Accept
                </button>

                <button
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Reject
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>

  )}

</div>
</>)
};

export default Admin;