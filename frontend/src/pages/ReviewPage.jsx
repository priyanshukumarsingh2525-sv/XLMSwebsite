import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ReviewCard from './ReviewCard'

const ReviewPage = () => {
    const {reviewData} = useSelector(state=>state.review)
    const [latestReview, setLatestReview] = useState(null)
     
    useEffect(()=>{
        setLatestReview(reviewData?.slice(0,6))
        console.log("reviewData",reviewData)
    },[reviewData])

  return (
    <div className='flex items-center justify-center flex-col'>
        <h1 className='md:text-[45px] text-[30px] font-semibold text-center mt-7.5 px-5'>Real Reviews for Real Courses</h1>
        <span className='lg:w-[50%] md:w-[80%] text-[15px] text-center mt-7.5 mb-7.5 px-5'>
         Discover how our Virtual Courses is transforming learning experiences through real feedback from students and professional worldwide.
        </span>

        <div className='w-full min-[100vh] flex items-center justify-center flex-wrap gap-12.5 lg:p-12.5 md:p-7.5 p-2.5 mb-10'>

          {
            latestReview?.map((review,index)=>(
                <ReviewCard key={index}
                comment={review?.comment}
                rating={review?.rating}
                photoUrl={review?.user.photoUrl}
                courseTitle={review?.course?.title}
                description={review?.user?.description}
                name={review?.user?.name}

                />
            ))
          }

        </div>
    </div>
  )
}

export default ReviewPage
