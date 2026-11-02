import axios from 'axios';
import React from 'react'
import { useState } from 'react';

const AdminFileImport = () => {
    const [file, setfile] = useState(null)

    const handelfile = (e) => {
        const selectedfile = e.target.files[0]
        if (!selectedfile) { return }

        setfile(selectedfile)

    }

    const handelImport = async (e) => {

       
        if (!file) {
            return;
        }
        console.log("2");
        const formdata = new FormData();
        formdata.append("file", file);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/v1/users/upload",
                formdata,
                {
                    withCredentials: true,
                }
            )

            console.log(response.data.message);
        } catch (error) {
            console.log(error);


        }




    }
    return (
        <>

          
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">

                <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-lg">

                    <h1 className="text-2xl font-bold text-gray-800 text-center">
                        Import Books
                    </h1>

                    <p className="text-gray-500 text-center mt-2 mb-8">
                        Upload an Excel sheet to add books to the library
                    </p>

                    <label className="block">
                        <span className="text-gray-700 font-medium">
                            Select Excel File
                        </span>

                        <input
                            onChange={handelfile}
                            type="file"
                            accept=".xlsx,.xls"
                            className="mt-3 block w-full text-sm text-gray-600
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:bg-blue-600 file:text-white
                file:font-medium
                hover:file:bg-blue-700
                cursor-pointer"
                        />
                    </label>

                    <button onClick={handelImport}
                        className="w-full mt-8 bg-blue-600 text-white py-3
            rounded-lg font-semibold hover:bg-blue-700
            transition duration-200"
                    >
                        Import Books
                    </button>

                </div>

            </div>
            ```









        </>
    )
}

export { AdminFileImport }
