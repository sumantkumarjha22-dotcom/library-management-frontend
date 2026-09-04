import { useState ,useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"

const Search = () => {
console.log("i am in search page ")
    const location = useLocation();

    const query = location.state?.query;

    console.log("query:", query);

  
    const [searchresult, setsearchresult] = useState([]);
  useEffect(() => {
    console.log("here")
     const resultsearch= async () => {
        const result =  await axios.post("http://localhost:5000/api/v1/users/search", {query},
            { withCredentials: true }
        )

 console.log("hell0")
        console.log(result.data.data.search);
        setsearchresult(result.data.data.search);
  
    }
resultsearch()

  }, [query])
  
    return (
        <>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchresult.map((book) => {



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
                        <button onClick={() => bookresult(book)} className='bg-indigo-600 hover:bg-indigo-700 transition-all w-1/4 p-4 mb-4 rounded-2xl text-2xl font-bold text-white '>CollEct</button>
                    </div>

                </div>
            })}

        </div>
</>
        
    )
};

export { Search };