import all_product from "../Assets/all_product"
import image from "../Assets/hero_image.png"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { selectProduct } from "../../redux/selectors/productSelector";

export default function Items() {

  const productId = useParams();
  console.log(productId);
  
  const products = useSelector(selectProduct);
  const item = products.find((e) => e.id === productId.itemsId);

  const navigate = useNavigate();
  const dispatch = useDispatch();  

  const [quantity, setQuantity] = useState(1)
  
  async function addCart(){

    if(localStorage.getItem('token') == null){
        navigate('/Signin');
    }

    try {
        const response = await axios.post('http://localhost:8787/user/addcart', 
            {
                title: item.title,
                item_id: item.id,
                price: item.discount_price,
                quantity: quantity
            } , {
                headers: { "Authorization": localStorage.getItem("token") }
        });

        dispatch(actions.addCart(1))

        console.log(response.data.message)

    } catch(error){
        console.log("Error in Adding Item to Cart: ", error)
    }
  }

    
  return (
    <div>
        {/* <Bradcrums /> */}
        <Navbar />
        <div className="flex justify-around my-0 mx-44 bg-emerald-200">
            <div className="flex w-96 bg-slate-600 justify-center items-center "> 
                <img className='h-96' src={image} alt="" />
            </div>
            <div className="my-0 mx-16 w-2/4 p-2 flex flex-col gap-5 bg-green-800">
                <h1 className="text-3xl font-bold"> {item.title} </h1>
                <div className="bg-orange-200 text-xl h-48">
                    {item.description}
                </div>
                <div className="flex my-2 mx-0 gap-8 text-2xl font-bold bg-pink-300">
                    <div className="line-through text-red-600">
                        ${item.price}
                    </div>
                    <div className="text-emerald-600">
                        ${item.discount_price}
                    </div>
                </div>
                <div className="bg-blue-200 ">
                    <h1 className="mt-5 text-xl font-semibold">Size</h1>
                    <div className="flex justify-around my-6 mx-0 gap-5">
                        <div className="py-4 px-5 border-solid cursor-pointer bg-slate-400">S</div>
                        <div className="py-4 px-5 border-solid cursor-pointer bg-slate-400">M</div>
                        <div className="py-4 px-5 border-solid cursor-pointer bg-slate-400">LG</div>
                        <div className="py-4 px-5 border-solid cursor-pointer bg-slate-400">XL</div>                        
                        <div className="py-4 px-5 border-solid cursor-pointer bg-slate-400">2XL</div> 
                    </div>
                </div>
                <div className="bg-purple-200 flex gap-5">
                    <p className="text-2xl"> Quantity </p>
                    <div className="flex justify-center items-center gap-2 bg-gray-500 px-2">
                        <p className="cursor-pointer" onClick={() => {if(quantity < item.quantiy) setQuantity(quantity+1)}}>+</p>
                        <p>{quantity}</p>
                        <p className="cursor-pointer" onClick={() => {if(quantity > 1) setQuantity(quantity-1)}}>-</p>
                    </div>
                </div>
                <button onClick={() => {addCart()}} className="py-5 px-10 text-base mx-10 font-semibold bg-red-500 mb-10 border-none cursor-pointer"> ADD TO CART </button>
            </div>
        </div>
    </div>
  )
}

// h-586 w-700