import { useSelector } from 'react-redux'
import ItemCard from '../components/ItemCard'
import Navbar from '../components/Navbar'
import { selectProduct } from '../../redux/selectors/productSelector'
import { useEffect, useState } from 'react'

export default function ShopCategory(props){

  const products = useSelector(selectProduct);

  return (
    <>
    <Navbar />
    <div>
        <img className='block mx-auto my-4' src={props.banner} alt="" />
        {/* <div>
            Sort by
        </div> */}
        <div className='grid grid-cols-4 gap-y-20 my-5 mx-44'>
            {products.map((item, index) => {
                if(props.category === item.category){
                    return <ItemCard key={index} id={item.id} description={item.description} image={props.image} title={item.title} price={item.price} discount_price={item.discount_price} />
                }
            })}
        </div>
        <div className='flex justify-center items-center my-36 mx-auto w-56 h-16 bg-slate-300 text-lg font-medium rounded-lg hover:bg-slate-400'>
            Explore More
        </div>
    </div>
    </>
  )
}
