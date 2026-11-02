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
        const result =  await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/search`, {query},
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
        {
            searchresult.length==0 ?(
         <div className="min-h-[50vh] flex flex-col justify-center items-center text-center px-4">
      <div className="text-6xl sm:text-7xl mb-5">
        📚
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
        NO BOOK  FOUND
      </h2>

      <p className="text-gray-500 mt-2 text-sm sm:text-base">
        Try searching with a different book name or author.
      </p>

      {/* <p className="text-gray-500 mt-2">
        There are no book requests at the moment.
      </p> */}
    </div>
    ):(

        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {searchresult.map((book) => {



                return <div key={book.bookid} className='w-full h-full flex flex-col justify-between bg-white rounded-2xl border border-gray-200 shadow-md p-4 sm:p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-200'>
                    <div className='flex gap-4 items-start'>
                         <div className="w-24 sm:w-32 md:w-36 flex-shrink-0">
                            <img
                                src={book.coverimage}
                                alt={book.bookname}
                                className="w-full h-36 sm:h-44 md:h-52 object-cover bg-gray-100 rounded-lg shadow-sm"
                            />
                        </div> 

                        <div className="flex-1 min-w-0">
                            <h2 className='text-base sm:text-xl text-slate-800 font-bold break-words'>
                                {book.bookname}
                            </h2>

                            <p className='font-medium mt-2 text-sm sm:text-base text-slate-600 break-words'>
                                Author: {book.authorname}
                            </p>

                            <p className='inline-block max-w-full mt-3 px-2 py-1 rounded-md bg-slate-100 text-xs sm:text-sm text-slate-500 break-all'>
                                ID: {book.bookid}
                            </p>
                        </div>
                    </div>
                    <div className='flex justify-center mt-5'>
                        <button onClick={() => bookresult(book)} className='w-full sm:w-3/4 md:w-1/2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition py-3 rounded-xl text-base sm:text-lg font-bold text-white shadow-md'>Collect</button>
                    </div>

                </div>
            })}

        </div>
        </div>)
}
</>
     
    )
};

export { Search };