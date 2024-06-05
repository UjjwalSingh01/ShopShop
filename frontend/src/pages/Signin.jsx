import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actions } from '../../redux/reducers/productReducer';

export default function Signin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleLogin(){

    console.log("email " + email);
    console.log("password " + password)

    try {

      const response = await axios.post('http://localhost:3000/login', {
        email: email,
        password: password
      })

      console.log(response.data.token)

      localStorage.setItem("token", response.data.token);

      dispatch(actions.addCart(response.data.cartCount));

      navigate('/');
      
    } catch (error) {
      console.error('Error in Login: ', error)
    }
  }

  return (
    <div className='w-full h-5/6 bg-purple-200 py-28'>
      <div className='bg-white flex rounded-md flex-col w-1/3 h-2/5 m-auto py-10 px-16 items-center justify-center'>
        <h1 className='my-4 mx-0 text-center text-2xl'>Login</h1>
        <div className='flex flex-col justify-center items-center w-full gap-7'>
          <input onChange={(e) => {setEmail(e.target.value)}} className='h-12 w-3/5 rounded-3xl bg-slate-200 pl-5 border-solid border-gray-400 outline-none text-lg' type="text" placeholder='Email'/>
          <input onChange={(e) => {setPassword(e.target.value)}} className='h-12 w-3/5 rounded-3xl bg-slate-200 pl-5 border-solid border-gray-400 outline-none text-lg' type="text" placeholder='Password' />
        </div>
        <button onClick={() => {handleLogin()}} className='w-1/4 mx-auto h-16 rounded-3xl text-center text-white bg-blue-500 mt-7 border-none text-xl font-medium cursor-pointer'>Login</button>
        <p className='text-gray-500 m-4'>New To ShopSHop?  <span className='text-red-600 cursor-pointer'><Link to='/signup'>Register</Link></span></p>
      </div>
    </div>
  )
}

