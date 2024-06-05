import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePageCard(props){
    return (
        <div className='m-5 min-w-52 h-72 transform bg-slate-300 hover:scale-105 transition-transform duration-600'>
            {/* <Link to={`/items/${props.id}`}> <img src={props.image} alt="" /> </Link> */}
            
            <div className="flex flex-col justify-center items-center h-auto">
            <Link to={`/items/${props.id}`}> <img className='p-3 h-44 w-32' src={props.image} alt="" /> </Link>
                <p className='m-1 bg-red-500'>{props.title}</p>
            </div>
            <div className='flex gap-5 justify-center bg-amber-700'>
                <div className='text-lg font-medium line-through text-emerald-400'>
                    ${props.price}
                </div>
                <div className='text-gray-800 text-lg font-semibold'>
                    ${props.discount_price}
                </div>
            </div>
        </div>
      )
}

