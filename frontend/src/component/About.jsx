import React from 'react'
import about from '../assets/about.jpg'
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { FaCircleCheck } from "react-icons/fa6";
const About = () => {
  return (
    <div className='w-screen lg:h-[70vh] min-h-[50vh] flex flex-wrap items-center justify-center gap-2 mb-7.5'>
        
        {/* Left Section (Image) */}
        <div className='lg:w-[40%] md:w-[80%] w-full flex items-center justify-center'>
            {/* object-cover ensures the image maintains aspect ratio without stretching */}
            <img src={about} alt="About Us" className='w-full max-w-md h-auto rounded-lg shadow-lg object-cover'/>
        </div>

        {/* Right Section (Content) */}
        <div className='lg:w-[50%] md:w-[70%] w-full h-full flex flex-col items-center justify-center px-8.75 md:px-20'>
            <div className='flex text-[18px] justify-center gap-5'>About Us <TfiLayoutLineSolid className='w-10 h-10'/>
            </div>
            <div className='md:text-[45px] text-[35px] font-semibold'>We Are Maximize Your Learning Growth</div>

            <div className='text-[15px] text-2xl'>We provide a modern Learning Management System to simplify online education, track progress, and ennhance student-instructor collabration efficiently</div>

            <div className='w-full lg-w-[60%] '>
                <div className='flex items-center justify-between mt-10'>
                    <div className='flex
                     items-center justify-center gap-2.5 '>
                       <FaCircleCheck className='w-5 h-5'/> Simplified Learning
                    </div>

                    <div className='flex
                     items-center justify-center gap-2.5'>
                       <FaCircleCheck className='w-5 h-5'/> Expert Trainers
                    </div>
                    
                  </div>

                    <div className='flex items-center justify-between mt-10'>

                    <div className='flex
                     items-center justify-center gap-2.5'>
                       <FaCircleCheck className='w-5 h-5'/> Big Experience
                    </div>

                    <div className='flex
                     items-center justify-center gap-2.5'>
                       <FaCircleCheck className='w-5 h-5'/> Lifetime Access
                    </div>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default About
