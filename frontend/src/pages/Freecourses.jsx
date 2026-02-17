import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa6'
import axios from 'axios'
import { serverUrl } from '../App'
import Card from '../component/Card'

const Freecourses = () => {
    const {courseData} = useSelector(state=>state.course)
    const [freecourse,setFreecourse] = useState([])
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
     setLoading(true)
    const getFreecourse = async () => {
      try {
        const result = await axios.get(serverUrl + '/api/course/freecourse', { withCredentials: true })
        console.log("Fetched Free Courses:", result.data)
        setFreecourse(result.data)
      } catch (error) {
        console.error("Error fetching free courses:", error)
      }finally{
        setLoading(false)
      }
    }

    getFreecourse() 
  }, [])


  return (
     <div className='min-h-screen w-full px-4 py-9 bg-gray-50'>
            <FaArrowLeft className='absolute top-[3%] md:top-[6%] left-[5%] w-5.5 h-5.5 cursor-pointer' onClick={()=>navigate('/')}/>
            <h1 className='text-3xl text-center font-bold text-gray-800 mb-6'>Free Courses</h1>
    
            {
                freecourse?.length === 0 ? (
                <p className='text-gray-500 text-center w-full'>{loading?"Loading...":"No free course."}</p>
    
                )
                :(
                <div className='w-full flex items-center justify-center flex-wrap gap-12.5 lg:p-12.5 md:p-7.5 p-2.5 mb-10'>

            {
                freecourse?.map((course,index)=>(
                    <Card key={index} 
                    thumbnail={course?.thumbnail} title={course?.title}
                    category={course?.category}
                    price={course?.price}
                    id={course._id}
                    isFree={course?.isFree}
                    reviews={course?.reviews} />
                ))
            }

        </div>

                
            )
            }
          
        </div>
  )
}

export default Freecourses
