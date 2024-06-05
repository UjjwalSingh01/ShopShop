import React, { useEffect, useState } from 'react'
import axios from 'axios'
import image from '../Assets/product_2.png'
import data_product from '../Assets/data';
import Navbar from '../components/Navbar';

export default function ItemCart() {

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0)
  const [itemIds, setItemIds] = useState([])

  useEffect(() => {
    const fetchCartItem = async () => {

      try {
        const response = await axios.get('http://localhost:3000/user/cart', {
          headers: { "Authorization": localStorage.getItem("token") }
        });
        
        setCartItems(response.data.message); 
           
        // calculate total here
        let sub_total = 0;

        response.data.message.map(item => {
          sub_total += item.price * item.quantity;
        })

        setTotal(sub_total)

        console.log(response.data.message)    
        
      } catch (error) {
        console.error("Error in Fetching Cart Items: ", error);
      }
    };

    fetchCartItem();
  }, []);    


  async function handleProceed(){
    try {
      // add the item ids to the user order list && the admin order list 
      // empty the cart

      const response = await axios.post('http://localhost:3000/user/addorder', 
        { 
          cartItems: cartItems
        },
        {headers: { "Authorization": localStorage.getItem("token") }
      })

    } catch(error){
      console.log("Error in Proceed: ", error);
    }
  }

  return (
    <>
    <Navbar />
    <div className='grid grid-rows-2'>
      <div className='my-24 mx-44 bg-slate-300'>
        <div className='grid grid-cols-7 justify-center items-center gap-20 border border-black py-5 px-0 bg-gray-400 text-lg font-semibold'>
          <p>Products</p>
          <p className="col-span-3">Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          {/* <p>Remove</p> */}
        </div>
        <hr className="h-1 bg-gray-400 border-0"/>
        {cartItems.map((item, index) =>{
          if(item.quantity){
            return (
              <div className='grid grid-cols-7 border-b-2 border-black items-center gap-20 py-5 px-0 bg-gray-400 text-base font-medium'>
                <img className="h-16" src={image} alt="" />
                <p className="col-span-3">{item.title}</p>
                <p>{item.price}</p>
                
                <p className="flex justify-center items-center gap-2 w-16 h-12 border-2 border-gray-100 border-solid bg-gray-400">
                  <button onClick={async() => (setTotal(total + item.price) (item.quantity += 1))}>+</button>
                  {item.quantity}
                  <button onClick={async() => (setTotal(total - item.price) (item.quantity -= 1))}>-</button>
                </p>
                <p>{item.quantity * item.price}</p>
              </div>
            )
          }
        })}
        </div>
        <div className='flex my-24 ml-32'>
          <div className='flex flex-1 flex-col mr-48 gap-10'>
            <h1 className='text-3xl font-bold'>Cart Total</h1>
            <div>
              <div className='flex justify-between py-4 px-0'>
                <p>Subtotal</p>
                <p>{total}</p>
              </div>
              <hr />
              <div className='flex justify-between py-4 px-0'>
                <p>Shipping fee</p>
                <p>49</p>
              </div>
              <hr />
              <div className='flex justify-between py-4 px-0'>
                <h3>Total</h3>
                <h3>{total + 49}</h3>
              </div>
            </div>
            <button onClick={() => {handleProceed()}} className=' w-64 h-14 outline-none border-none bg-red-600 text-base font-semibold cursor-pointer text-white'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      
    </div>
    </>
  )
}

