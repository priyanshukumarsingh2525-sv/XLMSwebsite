import React from 'react'
import google from "../assets/google.jpg"
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import {ClipLoader} from "react-spinners"
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/firebase';

const SignUp = () => {

    const [show,setShow] = useState(false);
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("student")
    const [loading, setLoading]= useState(false)
    const dispatch = useDispatch()

    const handleSignup = async () =>{
        setLoading(true);
         try {
            const result = await axios.post(serverUrl+"/api/auth/signup",{name:name, email:email, password:password,role:role},{withCredentials:true})
            dispatch(setUserData(result.data))
            navigate("/")
            toast.success("Signup Successfully",{
              autoClose:1000,
              position: "top-center",

            })

         } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
         }finally{
            setLoading(false);
         }
    }

    const googleSignUp = async () =>{
      try {
        const response = await signInWithPopup(auth,provider)
        console.log(response)
        let user = response.user
        let name = user.displayName
        let email = user.email

        const result = await axios.post(serverUrl + "/api/auth/googleauth",{name,email,role},{withCredentials:true})

        dispatch(setUserData(result.data))
            navigate("/")
            toast.success("Signup Successfully",{
              autoClose:1000,
              position: "top-center",

            })

      } catch (error) {
        console.log("Google signup error:",error)
        toast.error(error.response.data.message)

        if (error.code === "auth/popup-blocked") {
      toast.error("Popup blocked! Run app on localhost and allow popups.");
    } else if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Google sign-in failed");
    }
      }
    }


  return (
  <div className="min-h-screen w-full bg-[#dddbdb] flex items-center justify-center p-4">
  {/* Main Card Container */}
  <form className="w-full max-w-112.5 md:max-w-200 min-h-150 bg-white shadow-xl rounded-2xl flex flex-col md:flex-row overflow-hidden" onSubmit={(e)=>e.preventDefault()}>
    
    {/* Left Side (Form Content) */}
    <div className="w-full md:w-full flex flex-col items-center justify-center gap-6 py-10 px-6">
      <div className="text-center md:text-left w-[85%]">
        <h1 className="font-bold text-black text-3xl">Let's get started</h1>
        <h2 className="text-[#999797] text-lg">Create your account</h2>
      </div>

      {/* Input Fields */}
      <div className="flex flex-col gap-4 w-[85%]">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-semibold text-sm">Name</label>
          <input id="name" type="text" className="border w-full h-11 border-[#e7e6e6] rounded-md px-4 focus:outline-none focus:ring-1 focus:ring-black" placeholder="Your name"
          value={name}
          onChange={(e)=> setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-semibold text-sm">Email</label>
          <input id="email" type="email" className="border w-full h-11 border-[#e7e6e6] rounded-md px-4 focus:outline-none focus:ring-1 focus:ring-black" placeholder="Your email"
           value={email}
           onChange={(e)=> setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1 relative">
          <label htmlFor="password" className="font-semibold text-sm">Password</label>
          <input id="password" type={show?"text":"password"} className="border w-full h-11 border-[#e7e6e6] rounded-md px-4 focus:outline-none focus:ring-1 focus:ring-black" placeholder="Your password" 
           value={password}
           onChange={(e)=> setPassword(e.target.value)}
          />
          <button type="button" className="absolute right-3 top-9 cursor-pointer text-gray-500" onClick={()=>setShow(prev=> !prev)}>
             {show?<IoEyeOutline size={20} /> :<IoEye size={20}/>}
          </button>
        </div>
      </div>

      {/* Role Selection */}
      <div className="flex w-[85%] gap-4">
        <button type="button" className={`flex-1 py-2 border-2 border-[#e7e6e6] rounded-xl text-center cursor-pointer hover:border-black transition-all ${role==="student"?"border-black":"border-[#646464]"}`}
        onClick={()=> setRole("student")}
        >Student</button>
        <button type="button" className={`flex-1 py-2 border-2 border-[#e7e6e6] rounded-xl text-center cursor-pointer hover:border-black transition-all ${role==="educator"?"border-black":"border-[#646464]"}`}
        onClick={()=> setRole("educator")}
        >Mentor</button>
      </div>

      <button className="w-[85%] h-12 bg-black text-white font-medium hover:bg-gray-800 transition-colors rounded-md shadow-lg" onClick={handleSignup} disabled={loading}>
        {loading ? <ClipLoader size={30} color='white'/>: "Sign Up"}
      </button>

      {/* Divider */}
      <div className="w-[85%] flex items-center gap-2">
        <div className="flex-1 h-1px bg-[#c4c4c4]"></div>
        <div className="text-sm text-[#6f6f6f] whitespace-nowrap">Or continue with</div>
        <div className="flex-1 h-1px bg-[#c4c4c4]"></div>
      </div>

      {/* Social Login */}
      <button type="button" className="w-[85%] h-12 border border-black rounded-md flex items-center justify-center gap-0.5 hover:bg-gray-50 transition-colors" onClick={googleSignUp}>
        <img src={google} className="w-5" alt="Google icon" />
        <span className="text-lg font-medium text-gray-700">oogle</span>
      </button>

      <div className='text-[#6f6f6f]'>already have an account? <span className='underline underline-offset-1 text-[black] cursor-pointer hover:text-blue-400' onClick={()=>navigate("/login")}>Login</span></div>
    </div>

   

  </form>
</div>
  )
}

export default SignUp
