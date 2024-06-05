import React, { useEffect, useState } from 'react'
import axios from 'axios';
import data_product from '../Assets/data';
import image from '../Assets/product_1.png'
import Navbar from '../components/Navbar';

export default function Orders(){

    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
    
          try {
            const response = await axios.get('http://localhost:3000/user/orders', {
              headers: { "Authorization": localStorage.getItem("token") }
            });
            
            setOrderItems(response.data.message); 
               
            console.log(response.data.message)    
            
          } catch (error) {
            console.error("Error in Fetching Cart Items: ", error);
          }
        };
    
        fetchOrders();
      }, []);      

  return (
    <>
      <Navbar />
      <div>
          <h1 className='text-4xl m-10 p-7 bg-orange-600 w-48 rounded-full'>Orders</h1>

              {orderItems.map((item, index) => {
                // if(item.id === orderItems.item_id){
                  return (
                      <div className='flex h-40 justify-around bg-emerald-300 my-6 mx-64 rounded-3xl'>
                          <div className='w-52 flex justify-center items-center'>
                              <img className='h-32 rounded-3xl' src={image} alt="" />
                          </div>
                          <div className='flex flex-col gap-5'>
                              <p className='mt-4'>{item.title}</p>
                              <p><span className='font-bold'>Price:</span> {item.price}</p>
                              <p> Ordered on {item.date}</p>
                          </div>
                      </div>                        
                  )
                // }  
              })}
      </div>
    </>
  )
}

