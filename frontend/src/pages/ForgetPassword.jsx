import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const ForgetPassword = () => {

    const [step,setStep] = useState(1);
    const navigate = useNavigate();
    const [email,setEmail] = useState("")
    const [otp,setOtp] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [conpassword, setConPassword] = useState("");
    const [loading,setLoading] = useState(false);

    // for step-1 

    const sendOtp = async () =>{
      setLoading(true)
      try {
        const result = await axios.post(serverUrl + "/api/auth/sendotp",{email},{withCredentials:true})

        console.log(result.data)
        setStep(2)
        toast.success(result.data.message,{
          autoClose:1000,
          position:"top-center"
        })
      } catch (error) {
        console.log("error sending OTP",error);
        toast.error(error.respose.data.message)
      }finally{
        setLoading(false);
      }
    }

    // step - 2

    const verifyOTP = async () =>{
      setLoading(true);
      try {
        const result = await axios.post(serverUrl + "/api/auth/verifyotp",{email,otp},{withCredentials:true})
        console.log(result.data)
        setStep(3)
        toast.success(result.data.message,{
          autoClose:1000,
          position:"top-center"
        })

      } catch (error) {
        console.log("error sending OTP",error);
        toast.error(error.respose.data.message)
      }finally{
        setLoading(false);
      }
    }

    // Step -3 

    const resetPassword = async () => {
      setLoading(true);

      try {
        if(newpassword !== conpassword){
          return toast.error("Password is not matched",{
          autoClose:1000,
          position:"top-center"
        })
        }
        const result = await axios.post(serverUrl + "/api/auth/resetpassword",{email,password:newpassword},{withCredentials:true})
        console.log(result.data)
        navigate("/login");
        toast.success(result.data.message,{
          autoClose:1000,
          position:"top-center"
        })

      } catch (error) {
        console.log("error changing Password",error);
        toast.error(error.respose.data.message)
      }finally{
        setLoading(false);
      }
    }


  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      {step === 1 && (
  <div className='bg-white shadow-xl rounded-2xl p-8 max-w-md w-full border border-gray-100'>
    {/* Header Section */}
    <div className='text-center mb-8'>
      <h2 className='text-3xl font-bold text-gray-900'>Forgot Password?</h2>
      <p className='text-sm text-gray-500 mt-2'>
        No worries, we'll send you reset instructions.
      </p>
    </div>

    {/* Form Section */}
    <form className='space-y-5' onSubmit={(e)=>{
      e.preventDefault()
    }}>
      <div>
        <label htmlFor="email" className='block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1 ml-1'>
          Email Address
        </label>
        <input 
          id='email' 
          type="email" 
          className='w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent' 
          placeholder='name@example.com' 
          required
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
        />
      </div>
      
      <button className='w-full bg-black hover:bg-gray-800 text-white py-3 px-4 rounded-xl font-semibold transition-colors duration-200 cursor-pointer shadow-lg active:scale-[0.98]' disabled={loading} onClick={sendOtp}>
        {loading?<ClipLoader size={30} color='white'/>:"Send OTP"}
      </button>
    </form>

    {/* Footer Navigation */}
    <div className='mt-8 pt-6 border-t border-gray-100 text-center'>
      <button 
        onClick={() => navigate('/login')}
        className='text-sm font-medium text-gray-600 hover:text-black transition-colors cursor-pointer'
      >
        ← Back to Login
      </button>
    </div>
  </div>
)}


        {/* step 2 */}
      {step==2 &&(<div className='bg-white shadow-xl rounded-2xl p-8 max-w-md w-full border border-gray-100'>
    {/* Header Section */}
    <div className='text-center mb-8'>
      <h2 className='text-3xl font-bold text-gray-900'>Enter OTP</h2>
      <p className='text-sm text-gray-500 mt-2'>
        Please enter the 4-digit code set to your email
      </p>
    </div>

    {/* Form Section */}
    <form className='space-y-5' onSubmit={(e)=>{
      e.preventDefault()
    }}>
      <div>
        <label htmlFor="otp" className='block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1 ml-1'>
          Enter OTP
        </label>
        <input 
          id='otp' 
          type="otp" 
          className='w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent' 
          placeholder='* * * *' 
          required
          value={otp}
          onChange={(e)=> setOtp(e.target.value)}
        />
      </div>
      
      <button className='w-full bg-black hover:bg-gray-800 text-white py-3 px-4 rounded-xl font-semibold transition-colors duration-200 cursor-pointer shadow-lg active:scale-[0.98]' disabled={loading} onClick={verifyOTP}>
        {loading?<ClipLoader size={30} color='white'/>: "Verify OTP"}
      </button>
    </form>

    {/* Footer Navigation */}
    <div className='mt-8 pt-6 border-t border-gray-100 text-center'>
      <button 
        onClick={() => navigate('/login')}
        className='text-sm font-medium text-gray-600 hover:text-black transition-colors cursor-pointer'
      >
        ← Back to Login
      </button>
    </div>
  </div>
)}

        {/* step 3 */}
      {step==3 &&(<div className='bg-white shadow-xl rounded-2xl p-8 max-w-md w-full border border-gray-100'>
    {/* Header Section */}
    <div className='text-center mb-8'>
      <h2 className='text-3xl font-bold text-gray-900'>Reset Your Password</h2>
      <p className='text-sm text-gray-500 text-center mb-6'>Enter a new password below to regain acces to your account.</p>
    </div>

    {/* Form Section */}
    <form className='space-y-5' onSubmit={(e)=>{
      e.preventDefault()
    }}>
      <div>
        <label htmlFor="password" className='block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1 ml-1'>
          New Password
        </label>
        <input 
          id='password' 
          type="password" 
          className='w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent' 
          placeholder='new Password' 
          required
          value={newpassword}
          onChange={(e)=> setNewPassword(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="conpassword" className='block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1 ml-1'>
          Confirm Password
        </label>
        <input 
          id='conpassword' 
          type="password" 
          className='w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent' 
          placeholder='*********' 
          required
          value={conpassword}
          onChange={(e)=> setConPassword(e.target.value)}
        />
      </div>
      
      <button className='w-full bg-black hover:bg-gray-800 text-white py-3 px-4 rounded-xl font-semibold transition-colors duration-200 cursor-pointer shadow-lg active:scale-[0.98]'disabled={loading} onClick={resetPassword}>
        {loading?<ClipLoader size={30} color='white'/>:"Reset Password"}
      </button>
    </form>

    {/* Footer Navigation */}
    <div className='mt-8 pt-6 border-t border-gray-100 text-center'>
      <button 
        onClick={() => navigate('/login')}
        className='text-sm font-medium text-gray-600 hover:text-black transition-colors cursor-pointer'
      >
        ← Back to Login
      </button>
    </div>
  </div>
)}

    </div>

    

    
  )
}

export default ForgetPassword
