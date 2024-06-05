import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCount } from "../../redux/selectors/productSelector";

export default function Navbar() {
    
    const count = useSelector(selectCount);
    const [category, setCategory] = useState("home")

    return (
        <div className="bg-red-600 flex justify-between h-auto">
            <div className="bg-yellow-500 basis-1/5 flex items-center">
                <div className="flex -mr-5 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                    </svg>
                </div>
                <Link to="/">
                    <h1 className='flex text-2xl ml-7'>ShopShop</h1> 
                </Link>
            </div>
            <div className="bg-green-500 basis-2/5 flex flex-col gap-3">
                <div className="flex self-center bg-slate">
                    <input className="mt-4 w-3/4 self-center px-4 py-2 border border-gray-300 rounded-3xl bg-white focus:outline-none placeholder-gray-500" placeholder="Search" />
                    <button className="self-center mt-4 ml-3"> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>
                <div className="bg-green-200 h-3/5">
                    <ul className=" bg-slate-400 flex justify-around cursor-pointer">
                        <li className="m-2" onClick={() => setCategory("home")}><Link to='/'>Home</Link> {category==="home" ? <hr className="border-t-2 border-red-500" /> : null} </li>
                        <li className="m-2" onClick={() => setCategory("men")}><Link to='/men'>Men</Link> {category==="men" ? <hr className="border-t-2 border-red-500" /> : null}</li>
                        <li className="m-2" onClick={() => setCategory("women")}><Link to='/women'>Women</Link>{category==="women" ? <hr className="border-t-2  border-red-500" /> : null}</li>
                        <li className="m-2" onClick={() => setCategory("Kids")}><Link to='/kids'>Kids</Link> {category==="Kids" ? <hr className="border-t-2 border-red-500" /> : null} </li>
                    </ul>
                </div> 
            </div>
            <div className="flex bg-blue-200 justify-center basis-1/6 gap-6">
                <div className="self-center pr-0 mr-0">
                    <Link to="/cart">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                        {/* Cart Icon */}
                    </Link>
                </div>
                <div className='flex self-center mb-9 -ml-4 pl-0'> 
                    { /* add negative top margin */}
                    {count}
                </div>
                {!localStorage.getItem("token") ? (
                    <button className="border-slate-400 self-center shadow-md rounded-2xl w-24 py-1 bg-purple-500 hover:bg-purple-700"> <Link to='/signin'>login</Link> </button>
                 ) : (
                    <button className="border-slate-400 self-center shadow-md rounded-2xl w-20 bg-purple-500 pt-1 pb-1 hover:bg-purple-700"> <Link to='/orders'> Profile </Link>  </button> 
                )} 
            </div>
        </div>
    )
}