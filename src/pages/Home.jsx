import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'

const Home = (propes) => {

    const [book, setbook] = useState([])
    
    useEffect(() => {
          const getdata = async () => {
        const data = await axios.get("http://localhost:5000/api/v1/users/getbook",{withCredentials:true})
        console.log(data.data.data.books)
        setbook(data.data.data.books);
    }
        getdata();
    }, [])

    //console.log(book) 

   const SendCollectRequest = async (book)=>{
    try {
       // console.log("hi");
          const sendrequest = await axios.post
          ("http://localhost:5000/api/v1/users/collection",
            { 
                BookId:book.bookid,
                BookName:book.bookname  
            },
            {
                withCredentials:true,
            }
        )

       //   console.log(sendrequest)
          console.log("2");



    } catch (error) {
          console.log("errorn in  sending collect request ",error.message)
    }

   }

          
   

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {book.map((book) => {



                return <div key={book.bookid} className='  min-h-50  w-100vh bg-white  justify-center  rounded-xl m-3   '>
                    <div className='flex gap-5 shrink-0'>
                         <div className="w-40">
                            <img
                                src={book.coverimage}
                                alt={book.bookname}
                                className="w-full h-60 object-cover bg-white rounded"
                            />
                        </div> 

                        <div className="flex-1  ">
                            <span className='text-2xl text-slate-800 mt-3 font-bold'>
                                Name:- {book.bookname}
                            </span>

                            <p className='font-bold mt-3  text-2xl text-slate-600'>
                                Author :- {book.authorname}
                            </p>

                            <h4 className='font-medium  mt-3 text-2xl text-slate-400'>
                                Id: {book.bookid}
                            </h4>
                        </div>
                    </div>
                    <div className=' flex justify-center '>
                        <button onClick={() => SendCollectRequest(book)} className='bg-indigo-600 hover:bg-indigo-700 transition-all w-1/4 p-4 mb-4 rounded-2xl text-2xl font-bold text-white '>CollEct</button>
                    </div>

                </div>
            })}

        </div>
    )
}

export default Home


