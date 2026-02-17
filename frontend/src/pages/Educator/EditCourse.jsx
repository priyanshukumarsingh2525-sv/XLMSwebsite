import React, { useEffect, useRef, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { useNavigate, useParams } from 'react-router-dom'
import img from "../../assets/empty.jpg"
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import { serverUrl } from '../../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseData } from '../../redux/courseSlice';

const EditCourse = () => {
  const navigate = useNavigate()
  const [isPublished, setIsPublished] = useState(false)
  const [loading, setLoading] = useState(false);
   const thumb = useRef()

   const {courseId} = useParams()

  const [selectCourse,setSelectCourse] = useState(null)
  const [title,setTitle] = useState("")
  const [subTitle,setSubTitle] = useState("")
  const [description,setDescription] = useState("")
  const [category,setCategory] = useState("")
  const [level,setLevel] = useState("")
  const [price,setPrice] = useState("")
  const [frontendImage,setFrontendImage] = useState(img)
  const [backendImage,setBackendImage] = useState(null)

  const [isFree,setIsFree] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const dispatch = useDispatch()
  const {courseData} = useSelector(state=>state.course)

  const handleThumbnail = (e) =>{
    const file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }

  

  
  const getCourseById = async () =>{
      setLoading(true)
    try {
      const result = await axios.get(serverUrl + `/api/course/getcourse/${courseId}`, {withCredentials:true})
      setSelectCourse(result.data)
      console.log("selectCourse",result.data)

    } catch (error) {
     console.log("error in editcorse",error) 
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
      if(selectCourse){
        setTitle(selectCourse?.title || "")
        setCategory(selectCourse?.category || "")
        setDescription(selectCourse?.description || "")
        setSubTitle(selectCourse?.subTitle || "")
        setPrice(selectCourse?.price || "")
        setLevel(selectCourse?.level||"")
        setFrontendImage(selectCourse?.thumbnail || img)
        setIsFree(selectCourse?.isFree)
        setIsPublished(selectCourse?.isPublished)

      }
  },[selectCourse])

  useEffect(()=>{
    getCourseById()
  },[])

  const handleEditCourse = async() =>{
    setLoading(true)
    const formData = new FormData()
    formData.append("title",title)
    formData.append("subTitle",subTitle)
    formData.append("description",description)
    formData.append("category",category)
    formData.append("level",level)
    formData.append("price",price)
    formData.append("thumbnail",backendImage)
    formData.append("isPublished",isPublished)
    formData.append("isFree",isFree)
  
    try {
      const result = await axios.post(serverUrl + `/api/course/editcourse/${courseId}`,formData,{withCredentials:true})
      console.log("EditCourse",result.data)

      const updateData = result.data
      if(updateData?.isPublished){
        const updateCourses = courseData.map(c=> c?._id === courseId? updateData:c)

      if(!courseData.some(c=>c?._id === courseId)){
        updateCourses.push(updateData)
      }
      dispatch(setCourseData(updateCourses))

      }

      else{
        const filterCourses = courseData.filter(c => c._id !== courseId)
        dispatch(setCourseData(filterCourses))
      }


      navigate("/courses")
      toast.success("Course Updated",{
        autoClose:1000
      })
    } catch (error) {
      console.log("error in handleEditCourse",error)
      toast.error(error.response.data.message)
    }finally{
      setLoading(false)
    }
  }

  const handleRemoveCourse = async () =>{
    setLoading1(true)
    try {
      const result = await axios.delete(serverUrl + `/api/course/remove/${courseId}`,{withCredentials:true})
      console.log("item to remove",result.data)
      const filterCourses = courseData.filter(c => c._id !== courseId)
      dispatch(setCourseData(filterCourses))
      toast.success("Course Deleted",{
        autoClose:1000
      })
      navigate("/courses")

    } catch (error) {
      console.log("error at handleRemoveCourse",error)
      toast.error(error.response.data.message)
    }finally{
      setLoading1(false)
    }
  }

  return (
    <div className='max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md'>

      {/* top bar  */}
      <div className='flex items-center justify-center gap-5 md:justify-between flex-col md:flex-row md-6 relative'>
         <FaArrowLeft className='top-[-20%] md:top-[20%] absolute left-0 md:left-[2%] w-5.5 h-5.5 cursor-pointer'onClick={()=>navigate("/courses")}/>

         <h2 className='text-2xl font-semibold md:pl-15'>Add Detail Information regarding the Course</h2>
         <div className='space-x-2 space-y-2'>
          <button className='bg-black text-white px-4 py-2 rounded-md'onClick={()=>navigate(`/createlecture/${selectCourse?._id}`)}>Go to Lecture page</button>
         </div>
         
      </div>

      {/* form details */}

      <div className='bg-gray-50 p-6 rounded-md'>
        <h2 className='text-lg font-medium mb-4'>Basic Course Information</h2>
        <div className='space-x-2 space-y-2'>
          {!isPublished?<button className='bg-green-100 text-green-600 px-4 py-2 rounded-md border' onClick={()=>setIsPublished(prev=>!prev)}>Click to Publish</button>:<button className='bg-red-100 text-red-600 px-4 py-2 rounded-md border'onClick={()=>setIsPublished(prev=>!prev)}>Click to UnPublish</button>}
          <button className='bg-red-600 text-white px-4 py-2 rounded-md'onClick={handleRemoveCourse}>Remove Course</button>

          {isFree?<button className='bg-green-100 text-green-600 px-4 py-2 rounded-md border' onClick={()=>setIsFree(prev=>!prev)}>Free</button>:<button className='bg-red-100 text-red-600 px-4 py-2 rounded-md border'onClick={()=>setIsFree(prev=>!prev)}>Paid</button>}

        </div>
        
        <form className='space-y-6'onSubmit={(e)=>e.preventDefault()}>
          <div>
            <label htmlFor="title" className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
            <input id='title' type="text" className='w-full border px-4 py-2 rounded-md' placeholder='Course Title'
            value={title}
            onChange={(e)=>setTitle(e.target.value)}/>
          </div>

          <div>
            <label htmlFor="subtitle" className='block text-sm font-medium text-gray-700 mb-1'>Subtitle</label>
            <input id='subtitle' type="text" className='w-full border px-4 py-2 rounded-md' placeholder='Course Subtitle'
            value={subTitle}
            onChange={(e)=>setSubTitle(e.target.value)}/>
          </div>

          <div>
            <label htmlFor="des" className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
            <textarea id='des' type="text" className='w-full border px-4 py-2 rounded-md h-24 resize-none' placeholder='Course Description'
            value={description}
            onChange={(e)=>setDescription(e.target.value)}></textarea>
          </div>


          <div className='flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0'>
            {/* for category  */}
            <div className='flex-1'>
             <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Course Category</label>
              <select name="" id="" className='w-full border px-4 py-2 rounded-md bg-white'value={category}
            onChange={(e)=>setCategory(e.target.value)}>
                <option value="">Select Category</option>
                 <option value="App Development">App Development</option>
                 <option value="AI/ML">AI/ML</option>
                 <option value="AI Tools">AI Tools</option>
                 <option value="Data Science">Data Science</option>
                 <option value="Data Analytics">Data Analytics</option>
                 <option value="Ethical Hacking">Ethical Hacking</option>
                 <option value="UI UX Designing">UI UX Designing</option>
                 <option value="Web Development">Web Development</option>
                 <option value="Others">Other</option>
              </select>
            </div>

            {/* for level  */}
             <div className='flex-1'>
             <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Course Level</label>
              <select name="" id="" className='w-full border px-4 py-2 rounded-md bg-white'value={level}
            onChange={(e)=>setLevel(e.target.value)}>
                <option value="">Select Level</option>
                 <option value="Beginner">Beginner</option>
                 <option value="Intermediate">Intermediate</option>
                 <option value="Advanced">Advanced</option>
                 
              </select>
            </div>

            {/* for price  */}
            
            <div className="flex-1">
              <label htmlFor="price"    className="block text-sm font-medium text-gray-700 mb-1">
                     Course Price
              </label>

             <input
               type="number"
               id="price"
               className="w-full border px-4 py-2 rounded-md"
                placeholder="$"
                value={isFree ? 0 : price}   
                 disabled={isFree}            
                onChange={(e) => {
                if (!isFree) {
                  setPrice(e.target.value); 
                 } else {
                   setPrice(0); 
                  }
                  }}
              />
            </div>

          </div>

          <div>
              <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Course Thumbnail</label>
              <input type="file" hidden ref={thumb} accept='image/*' onChange={handleThumbnail}/>
            </div>

          <div className='relative w-75 h-42.5'>
               <img src={frontendImage} alt="" className='w-full h-full border border-black rounded-[5px]' onClick={()=>thumb.current.click()}/>
               <FaEdit className='w-5 h-5 absolute top-2 right-2'onClick={()=>thumb.current.click()}/>
            </div>
             
             <div className='flex items-center justify-start gap-3.75'>
              <button className='bg-[#e9e8e8] hover:bg-red-200 text-black border border-black cursor-pointer px-4 py-2 rounded-md' onClick={()=>navigate("/courses")}>Cancel</button>
              <button className='bg-black text-white px-7 py-2 rounded-md hover:bg-gray-500 cursor-pointer' onClick={handleEditCourse}>{loading?<ClipLoader size={30} color='white'/>:"Save"}</button>
             </div>

        </form>

      </div>
      
    </div>
  )
}

export default EditCourse
