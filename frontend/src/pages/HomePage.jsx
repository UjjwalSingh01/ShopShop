import HomeSlide from "../components/HomeSlide";
import { actions } from "../../redux/reducers/productReducer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import popular_image from '../Assets/product_20.png'
import women_image from '../Assets/product_1.png'
import kid_image from '../Assets/product_25.png'
import Navbar from "../components/Navbar";

export default function Homepage() {
    
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchProducts = async () => {
    
          try {
            const response = await axios.get('http://localhost:3000/product');
            
            dispatch(actions.product(response.data.message));
            // dispatch(actions.addCart(response.data.cartCount));
               
            console.log(response.data.message)
            // console.log("CartCount: " + response.data.cartCount)
            
          } catch (error) {
            console.error("Error in Fetching Cart Items: ", error);
          }
        };
    
        fetchProducts();
      }, []); 

    return (
      <>
        <Navbar />
        <div>
            <div className="flex flex-col gap-y-10 bg-red-200 mx-40">
                <HomeSlide category="popular" image={popular_image} name="POPULAR"/>           
                <HomeSlide category="kids" image={women_image} name="KIDS"/>
                <HomeSlide category="women" image={kid_image} name="WOMEN"/>
            </div>
        </div>
      </>  
    )
}