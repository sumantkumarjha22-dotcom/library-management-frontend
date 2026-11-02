
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Ai = () => {

const [question, setquestion] = useState("")

const [answer, setanswer] = useState("")
 const setquestions= (e)=>{
   e.preventDefault();
  try {
     setquestion(
    
      e.target.value

  
    )
  } catch (error) {
    console.log("error in setting question",error.message)
    
  }
 }
  const handelsearch = async ()=>{
     try {
      const sendquestion = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users/ask`,
       {question},
                  
       
       { withCredentials: true}
 
 
      )
    console.log(sendquestion.data)
 setanswer(sendquestion.data.data.answer)
 setquestion("")
    
} catch (error) {
      console.log("error in sending question",error.message)
      
     }
  }







  return (
    <>
   <div className="min-h-screen bg-gray-950 flex flex-col items-center px-4 py-12">

  {/* Search Box */}
  <div className="w-full max-w-2xl">
    <h1 className="text-3xl font-bold text-white text-center mb-8">
      Ask a Question
    </h1>

    <div className="flex gap-3 bg-gray-900 p-2 rounded-2xl border border-gray-800 shadow-lg">
      <input
        value={question}
        onChange={setquestions}
        id="question"
        type="text"
        placeholder="Ask anything..."
        className="flex-1 bg-transparent px-4 py-3 text-white placeholder-gray-500 outline-none"
      />

      <button
        onClick={handelsearch}  className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium
                   hover:bg-blue-700 active:scale-95 transition-all duration-200"
      >
        Search
      </button>
    </div>
  </div>

  {/* Answer */}
  <div
    id="answer"
    className="w-full max-w-2xl mt-8 bg-gray-900 border border-gray-800
               rounded-2xl p-6 shadow-lg min-h-150px"
  >
    <h2 className="text-sm font-semibold text-blue-400 mb-3">
      Answer
    </h2>

    <p className="text-gray-200 leading-7 whitespace-pre-wrap">
      {answer || "Your answer will appear here..."}
    </p>
  </div>

</div>
</>
  ) 
}

export default Ai
