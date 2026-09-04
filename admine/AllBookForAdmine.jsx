import axios from 'axios'
import React, { useEffect ,useState } from 'react'
 
const AllBookForAdmine = () => {
  const [allbooks, setallbooks] = useState([])
useEffect(() => {
  const GetAllBookForAdmine =async ()=>{
    const response = await axios.get("http://localhost:5000/api/v1/users/allbookforadmine",
      {
        withCredentials:true
      }
    )
 //console.log(response.data.data.response)
setallbooks(response.data.data.response)

 }
 GetAllBookForAdmine()
}, [])

  
  return (
  <div className="min-h-screen bg-gray-300">

  {/* Navbar */}
  <nav className="bg-gray-300 shadow px-6 py-4 flex justify-between items-center">
    <h1 className="text-2xl font-bold text-indigo-600">
      Book Admin
    </h1>

    <div className="flex items-center gap-6">
      <span className="text-gray-600 text-xl">
        All Books
      </span>

      <span className="text-gray-600">
        Admin
      </span>

      <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center">
        A
      </div>
    </div>
  </nav>


  {/* Main */}
  <main className="p-6">

    {/* Heading */}
    <h2  className=" text-center text-3xl font-bold text-gray-800 mb-6">
      All Books
    </h2>


    {/* Book Table */}
    <div className="bg-gray-300 rounded-lg shadow overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>
              <th className="text-left p-4">
                Book Name
              </th>
                <th className="text-left p-4">
                Athorname
              </th>

              <th className="text-left p-4">
                Book ID
              </th>

              <th className="text-left p-4">
                Total Count
              </th>

              <th className="text-left p-4">
                Available
              </th>

              <th className="text-left p-4">
                Edit
              </th>
            </tr>

          </thead>

{allbooks.map((book)=>{
    return       <tbody>

            <tr key={book.bookid} className="border-t">

              <td className="p-4">
                   {book.bookname}
              </td>

              <td className="p-4">
               {book.authorname}
              </td>

              <td className="p-4">
              {book.bookid}
              </td>

              <td className="p-4">
              {book.totalcount}
              </td>
               <td className="p-4">
              {book.availablebook}
              </td>

              <td className="p-4">
                <button className="text-blue-600 hover:text-blue-800">
                  Edit
                </button>
              </td>

            </tr>

          </tbody>
})}
        </table>

      </div>

    </div>

  </main>

</div>
  )
}

export { AllBookForAdmine}
