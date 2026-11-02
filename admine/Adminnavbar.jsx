import React from 'react'
import { useNavigate } from 'react-router-dom'

const Adminnavbar = () => {

 const navigate = useNavigate();

    return (
 <>
    <nav className="bg-gray-800 px-6 py-4">
        <ul className="flex justify-end items-center  gap-6">
            <li>
                <button className="text-white hover:text-blue-400">
                    All Books
                </button>
            </li>

            <li>
                <button onClick={()=>{navigate("/import")}} className="text-white hover:text-blue-400">
                    Import Books
                </button>
            </li>
        </ul>
    </nav>
</>
    )
}

export { Adminnavbar }
