
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaUser, FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";

const Navbar = () => {
    const navigate = useNavigate();

    const [search, setsearch] = useState("");
    const [user, setuser] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    const handelsearch = (e) => {
        setsearch(e.target.value);
    };

    const handelsearchbutton = () => {
        navigate("/search", {
            state: {
                query: search,
            },
        });

        setMenuOpen(false);
    };

    useEffect(() => {
        const getuserdetail = async () => {
            try {
                const userdata = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v1/users/pofile`,
                    {
                        withCredentials: true,
                    }
                );

                const profile = userdata.data.data.userprofile;
                console.log(userdata)
                setuser(profile.username);
            } catch (error) {
                console.log("User not logged in");
                setuser("");
            }
        };

        getuserdetail();
    }, []);

    const logouthadeler = async () => {
        try {
            await axios.post(
               `${import.meta.env.VITE_API_URL}/api/v1/users/logout`,
                {},
                {
                    withCredentials: true,
                }
            );

            window.location.reload();
        } catch (error) {
            console.log("Logout error:", error.message);
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-slate-300 shadow-md">

            {/* ================= TOP NAVBAR ================= */}
            <div className="flex items-center justify-between px-4 py-3">

                {/* Logo */}
                <div className="font-bold text-2xl sm:text-3xl lg:text-4xl">
                    <button
                        onClick={() => navigate("/home")}
                    >
                        bookApp
                    </button>
                </div>

                {/* ================= DESKTOP SEARCH ================= */}
                <div className="hidden md:flex items-center flex-1 max-w-xl mx-6">

                    <input
                        type="text"
                        placeholder="Search for books"
                        value={search}
                        onChange={handelsearch}
                        className="
                            w-full
                            rounded-l-lg
                            border
                            border-slate-300
                            bg-white
                            px-4
                            py-2
                            outline-none
                            focus:border-blue-500
                        "
                    />

                    <button
                        onClick={handelsearchbutton}
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-r-lg
                            bg-blue-600
                            px-4
                            py-2
                            font-medium
                            text-white
                            hover:bg-blue-700
                        "
                    >
                        <FaSearch />
                        Search
                    </button>
                </div>

                {/* ================= DESKTOP MENU ================= */}
                <ul className="
                    hidden
                    md:flex
                    items-center
                    gap-3
                    lg:gap-5
                    text-lg
                    lg:text-xl
                    text-white
                ">

                    {/* AI Help */}
                    <li>
                        <button
                            className="p-2 hover:font-bold transition"
                            onClick={() => navigate("/ai")}
                        >
                            AI Help
                        </button>
                    </li>

                    {/* User */}
                    {user && (
                        <li>
                            <button
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    p-2
                                    hover:font-bold
                                    transition
                                "
                                onClick={() => navigate("/userprofile")}
                            >
                                <FaUser />

                                <span className="max-w-32 truncate">
                                    {user}
                                </span>
                            </button>
                        </li>
                    )}

                    {/* Login + Signup */}
                    {!user && (
                        <>
                            <li className="p-2 hover:font-bold">
                                <Link to="/login">
                                    Login
                                </Link>
                            </li>

                            <li className="p-2 hover:font-bold">
                                <Link to="/signup">
                                    Signup
                                </Link>
                            </li>
                        </>
                    )}

                    {/* Logout */}
                    {user && (
                        <li>
                            <button
                                className="p-2 hover:font-bold transition"
                                onClick={logouthadeler}
                            >
                                Logout
                            </button>
                        </li>
                    )}
                </ul>

                {/* ================= MOBILE MENU BUTTON ================= */}
                <button
                    className="md:hidden text-2xl text-slate-800"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>

            </div>

            {/* ================= MOBILE SEARCH ================= */}
            <div className="md:hidden px-4 pb-3">

                <div className="flex">

                    <input
                        type="text"
                        placeholder="Search for books"
                        value={search}
                        onChange={handelsearch}
                        className="
                            min-w-0
                            flex-1
                            rounded-l-lg
                            border
                            border-slate-300
                            bg-white
                            px-3
                            py-2
                            text-sm
                            outline-none
                            focus:border-blue-500
                        "
                    />

                    <button
                        onClick={handelsearchbutton}
                        className="
                            flex
                            items-center
                            justify-center
                            gap-2
                            rounded-r-lg
                            bg-blue-600
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-white
                            hover:bg-blue-700
                        "
                    >
                        <FaSearch />
                        Search
                    </button>

                </div>

            </div>

            {/* ================= MOBILE MENU ================= */}
            {menuOpen && (
                <div className="
                    md:hidden
                    border-t
                    border-slate-400
                    bg-slate-300
                    px-4
                    pb-4
                ">

                    <div className="
                        flex
                        flex-col
                        gap-2
                        text-lg
                        text-white
                    ">

                        {/* AI Help */}
                        <button
                            className="
                                rounded-lg
                                p-3
                                text-left
                                hover:bg-slate-400
                            "
                            onClick={() => {
                                navigate("/ai");
                                setMenuOpen(false);
                            }}
                        >
                            AI Help
                        </button>

                        {/* User Profile */}
                        {user && (
                            <button
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-lg
                                    p-3
                                    text-left
                                    hover:bg-slate-400
                                "
                                onClick={() => {
                                    navigate("/userprofile");
                                    setMenuOpen(false);
                                }}
                            >
                                <FaUser />
                                {user}
                            </button>
                        )}

                        {/* Login */}
                        {!user && (
                            <Link
                                to="/login"
                                className="
                                    rounded-lg
                                    p-3
                                    hover:bg-slate-400
                                "
                                onClick={() => setMenuOpen(false)}
                            >
                                Login
                            </Link>
                        )}

                        {/* Signup */}
                        {!user && (
                            <Link
                                to="/signup"
                                className="
                                    rounded-lg
                                    p-3
                                    hover:bg-slate-400
                                "
                                onClick={() => setMenuOpen(false)}
                            >
                                Signup
                            </Link>
                        )}

                        {/* Logout */}
                        {user && (
                            <button
                                className="
                                    rounded-lg
                                    p-3
                                    text-left
                                    hover:bg-slate-400
                                "
                                onClick={() => {
                                    logouthadeler();
                                    setMenuOpen(false);
                                }}
                            >
                                Logout
                            </button>
                        )}

                    </div>
                </div>
            )}

        </nav>
    );
};

export default Navbar;

