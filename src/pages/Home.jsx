import axios from "axios";
import React, { useState, useEffect } from "react";

const Home = () => {
    const [book, setbook] = useState([]);

    useEffect(() => {
        const getdata = async () => {
            try {
                const data = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v1/users/getbook`,
                    { withCredentials: true }
                );

                console.log(data.data.data.books);
                setbook(data.data.data.books);
            } catch (error) {
                console.log("Error fetching books:", error.message);
            }
        };

        getdata();
    }, []);

    const SendCollectRequest = async (book) => {
        try {
            const sendrequest = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v1/users/collection`,
                {
                    BookId: book.bookid,
                    BookName: book.bookname,
                },
                {
                    withCredentials: true,
                }
            );

            console.log(sendrequest.data);
        } catch (error) {
            console.log(
                "Error in sending collect request:",
                error.message
            );
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">

                {/* Empty State */}
                {book.length === 0 && (
                    <p className="text-center text-slate-500 text-base sm:text-lg py-16">
                        No books to show right now.
                    </p>
                )}

                {/* Book Grid */}
                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    gap-4
                    sm:gap-6
                ">
                    {book.map((book) => {
                        return (
                            <div
                                key={book.bookid}
                                className="
                                    w-full
                                    h-full
                                    flex
                                    flex-col
                                    justify-between
                                    bg-white
                                    rounded-2xl
                                    border
                                    border-gray-200
                                    shadow-md
                                    p-4
                                    sm:p-5
                                    hover:shadow-xl
                                    hover:-translate-y-1
                                    transition-all
                                    duration-200
                                "
                            >
                                {/* Book Image + Details */}
                                <div className="
                                    flex
                                    gap-4
                                    items-start
                                ">

                                    {/* Book Image */}
                                    <div className="
                                        w-24
                                        sm:w-32
                                        md:w-36
                                        flex-shrink-0
                                    ">
                                        <img
                                            src={book.coverimage}
                                            alt={book.bookname}
                                            className="
                                                w-full
                                                h-36
                                                sm:h-44
                                                md:h-52
                                                object-cover
                                                rounded-lg
                                                bg-gray-100
                                                shadow-sm
                                            "
                                        />
                                    </div>

                                    {/* Book Details */}
                                    <div className="
                                        flex-1
                                        min-w-0
                                    ">
                                        <h2 className="
                                            text-base
                                            sm:text-xl
                                            font-bold
                                            text-slate-800
                                            break-words
                                        ">
                                            {book.bookname}
                                        </h2>

                                        <p className="
                                            mt-2
                                            text-sm
                                            sm:text-base
                                            font-medium
                                            text-slate-600
                                            break-words
                                        ">
                                            Author: {book.authorname}
                                        </p>

                                        <p className="
                                            mt-3
                                            inline-block
                                            max-w-full
                                            px-2
                                            py-1
                                            rounded-md
                                            bg-slate-100
                                            text-xs
                                            sm:text-sm
                                            text-slate-500
                                            break-all
                                        ">
                                            ID: {book.bookid}
                                        </p>
                                    </div>
                                </div>

                                {/* Collect Button */}
                                <div className="flex justify-center mt-5">
                                    <button
                                        onClick={() =>
                                            SendCollectRequest(book)
                                        }
                                        className="
                                            w-full
                                            sm:w-3/4
                                            md:w-1/2
                                            bg-indigo-600
                                            hover:bg-indigo-700
                                            active:bg-indigo-800
                                            active:scale-95
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-indigo-400
                                            focus:ring-offset-2
                                            transition
                                            py-3
                                            rounded-xl
                                            text-base
                                            sm:text-lg
                                            font-bold
                                            text-white
                                            shadow-md
                                        "
                                    >
                                        Collect
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export  {Home};