import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actions } from '../../redux/reducers/productReducer';

export default function Signup() {

  const [email, setEmail] = useState('');
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [showOtp, setShowOtp] = useState(false)
  const [otp, setOtp] = useState(0)

  const dispatch = useDispatch();
  const navigate = useNavigate()

  async function handleVerify() {
    setShowOtp(true)

    try {

      const response = await axios.post('http://localhost:3000/verify', {
        email: email
      })

      console.log(response.data.message)

    } catch (error) {
      console.error('Error in Verifing OTP: ', error)
    }
  }

  async function handleRegister(){
    try {

      const response = await axios.post('http://localhost:3000/register', {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        otp: otp
      })

      console.log(response.data.token)

      localStorage.setItem("token", response.data.token);

      dispatch(actions.addCart(response.data.cartCount));

      navigate('/');
      
    } catch (error) {
      console.error('Error in Registering: ', error)
    }
  }

  return (
    <div className='w-full h-5/product6 bg-purple-200 py-28'>
      <div className='bg-white flex rounded-md flex-col w-1/3 h-2/5 m-auto py-10 px-16 items-center justify-center'>
        <h1 className='my-4 mx-0 text-center text-2xl'>Register</h1>
        <div className='flex flex-col justify-center items-center w-full gap-7'>
          <div className='flex justify-center items-center gap-3'>
            <input onChange={(e) => {setFirstName(e.target.value)}} className='h-12 w-3/5 rounded-3xl bg-slate-200 pl-5 border-solid border-gray-400 outline-none text-lg' type="text" placeholder='First Name' />
            <input onChange={(e) => {setLastName(e.target.value)}} className='h-12 w-3/5 rounded-3xl bg-slate-200 pl-5 border-solid border-gray-400 outline-none text-lg' type="text" placeholder='Last Name' />
          </div>
          <input onChange={(e) => {setEmail(e.target.value)}} className='h-12 w-3/5 rounded-3xl bg-slate-200 pl-5 border-solid border-gray-400 outline-none text-lg' type="text" placeholder='Email'/>
          <input onChange={(e) => {setPassword(e.target.value)}} className='h-12 w-3/5 rounded-3xl bg-slate-200 pl-5 border-solid border-gray-400 outline-none text-lg' type="text" placeholder='Password' />
        </div>
        <button onClick={() => {handleVerify()}} className='w-1/4 mx-auto h-16 rounded-3xl text-center text-white bg-blue-500 mt-7 border-none text-xl font-medium cursor-pointer'>Verify</button>
        
        {showOtp ? (
        <div className='flex flex-col justify-center items-center mt-7'>
          <input onChange={(e) => {setOtp(e.target.value)}} className='h-12 w-4/5 rounded-3xl bg-slate-200 pl-5 border-solid border-gray-400 outline-none text-lg' type="text" placeholder='Otp' />
        <button onClick={() => {handleRegister()}} className='w-2/4 mx-auto h-16 rounded-3xl text-center text-white bg-blue-500 mt-5 border-none text-xl font-medium cursor-pointer'>Register</button>
        </div>
        ) : null}

        <p className='text-gray-500 m-4'>Already Have An Account?  <span className='text-red-600 cursor-pointer'><Link to='/signin'>Login</Link> </span></p>
      </div>
    </div>
  )
}

