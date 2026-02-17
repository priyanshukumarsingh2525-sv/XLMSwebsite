import React, { useState } from 'react'
import logo from "../assets/logo.jpg"
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import { GiHamburgerMenu } from "react-icons/gi";
import { GiSplitCross } from "react-icons/gi";

const Nav = () => {

    const {userData} = useSelector(state=>state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [show, setShow] = useState(false)
    const [showham, setShowham] = useState(false);

    const handleLogout = async () =>{
        try {
            const result = await axios.get(serverUrl + "/api/auth/logout", {withCredentials:true})
            dispatch(setUserData(null))
            console.log(result.data)
            toast.success("Logout successfully",{
                position: "top-center",
                autoClose:1000,
            })

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    //  console.log(userData?.photoUrl)

  return (
    <div>
      <div className='w-screen h-17.5 fixed top-0 px-5 py-2.5 flex items-center justify-between bg-[#00000047] z-10'>
        <div className='lg:w-[20%] w-[40%] lg:pl-12.5 '>
          <img src={logo} alt="" className='w-15 rounded-[5px] border-2 border-white cursor-pointer'/>
        </div>

        <div className='w-[30%] lg:flex items-center justify-center gap-4 hidden'>
            {!userData && <FaUser className='w-12.5 h-12.5 fill-black cursor-pointer' onClick={()=>setShow(prev => !prev)}/>}

            {userData?.photoUrl? <img src={userData?.photoUrl} className='w-12.5 h-12.5 rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer' onClick={()=>setShow(prev => !prev)}/>:<div className='w-12.5 h-12.5 rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer'onClick={()=>setShow(prev => !prev)}>
                {userData?.name.slice(0,1).toUpperCase()}
            </div>}

            {userData?.role === "educator"&&<div className='px-5 py-2.5 border-2 lg:border-white border-black lg:text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer' onClick={()=>navigate("/dashboard")}>DashBoard</div>}
            {!userData?<span className='px-5 py-2.5 border-2 border-white text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-[#000000d5]'onClick={()=>navigate("/login")}>Login</span>:
            <span className='px-5 py-2.5 bg-white text-black rounded-[10px] shadow-sm shadow-black text-[18px] cursor-pointer' onClick={handleLogout}>LogOut</span>}

           {show && <div className='absolute top-[110%] right-[15%] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md bg-white px-3.75 py-2.5 border-2 border-black hover:border-white hover:text-white cursor-pointer hover:bg-black'>
                <span className='bg-black text-white px-7.5 py-2.5 rounded-2xl hover:bg-gray-600 ' onClick={()=>navigate("/profile")}>My Profile</span>
                <span className='bg-black text-white px-7.5 py-2.5 rounded-2xl hover:bg-gray-600 'onClick={()=>navigate('/mycourses')}>My Courses</span>

                <span className='bg-black text-white px-7.5 py-2.5 rounded-2xl hover:bg-gray-600 'onClick={()=>navigate('/freecourses')}>Free Courses</span>
            </div>}
        </div>
        <GiHamburgerMenu className='w-10 h-10 lg:hidden fill-white text-white cursor-pointer' onClick={()=>setShowham(prev => !prev)}/>

        <div className={`fixed top-0 left-0 w-screen h-screen bg-[#000000d6] flex items-center justify-center flex-col gap-5 z-10 lg:hidden ${showham ? "translate-x-0 transition duration-600 ":"-translate-x-full transition duration-600 "}`}>
            <GiSplitCross className='w-8.75 h-8.75 fill-white absolute top-5 right-[4%]' onClick={()=>setShowham(prev => !prev)}/>

                 {!userData && <FaUser className='w-12.5 h-12.5 fill-black cursor-pointer'/>}

            {userData?.photoUrl?<img src={userData?.photoUrl} className='w-12.5 h-12.5 rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer'/>:<div className='w-12.5 h-12.5 rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer'>
                {userData?.name?.slice(0,1).toUpperCase()}
            </div>}

            <div className='w-50 h-16.25 border-2 border-white  text-white bg-black  flex items-center justify-center rounded-[10px] text-[18px] font-light cursor-pointer'onClick={()=>navigate("/profile")}>My profile</div>

             <div className='w-50 h-16.25 border-2 border-white  text-white bg-black  flex items-center justify-center rounded-[10px] text-[18px] font-light cursor-pointer'onClick={()=>navigate('/mycourses')}>My Courses</div>

             <div className='w-50 h-16.25 border-2 border-white  text-white bg-black  flex items-center justify-center rounded-[10px] text-[18px] font-light cursor-pointer'onClick={()=>navigate('/freecourses')}>Free Courses</div>

            {userData?.role === "educator"&&<div className='w-50 h-16.25 border-2 border-white text-white bg-black flex items-center justify-center rounded-[10px] text-[18px] font-light cursor-pointer'onClick={()=>navigate("/dashboard")}>DashBoard</div>}
     
             {!userData?<span className='w-50 h-16.25 border-2 border-white text-white bg-black flex items-center justify-center rounded-[10px] text-[18px] font-light cursor-pointer'onClick={()=>navigate("/login")}>Login</span>:
            <span className='w-50 h-16.25 border-2 border-white text-white bg-black flex items-center justify-center rounded-[10px] text-[18px] font-light cursor-pointer' onClick={handleLogout}>LogOut</span>}

        </div>
      </div>
    </div>
  )
}

export default Nav
