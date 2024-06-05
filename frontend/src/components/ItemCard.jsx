import React from 'react'
import { Link } from 'react-router-dom'


export default function ItemCard(props) {

  return (
    <div className='w-80 transform hover:scale-105 transition-transform duration-600'>
        <Link to={`/items/${props.id}`} ><img className='p-3' src={props.image} alt="" /></Link>
        <p className='mt-6 mb-0'>{props.title}</p>
        <div className='flex gap-5'>
            <div className='text-lg font-medium line-through text-gray-400'>
                ${props.price}
            </div>
            <div className='text-gray-800 text-lg font-semibold'>
                ${props.discount_price}
            </div>
        </div>
    </div>
  )
}

