import axios from 'axios';
import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const EditProfile = () => {
    const navigate = useNavigate();
    const {userData} = useSelector(state=>state.user)
    const [name, setName] = useState(userData?.name || "")
    const [description,setDescription] = useState(userData?.description || "")
    const [photoUrl, setPhotoUrl] = useState(null)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const formData = new FormData()
    formData.append("name",name)
    formData.append("description",description)
     formData.append("photoUrl",photoUrl)


    const handleEditProfile = async() =>{
        setLoading(true);
        try {
            const result = await axios.post(serverUrl + "/api/user/profile",formData, {withCredentials:true})
            dispatch(setUserData(result.data))
            navigate('/')
            toast.success("Profile Updated",{
                autoClose:1000,
                position:"top-center"
            })

        } catch (error) {
            console.log("error in handleEditProfile",error)
            toast.error(error.respone.data.message)
        }finally{
            setLoading(false);
        }
    }


  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10'>
        <div className='bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative'>
            <FaArrowLeft className='absolute top-[5%] left-[5%] w-5.5 h-5.5 cursor-pointer' onClick={()=>navigate("/profile")}/>

                <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>Edit Profile</h2>

                <form action="" onSubmit={(e)=>e.preventDefault()} className='space-y-5'>
                   <div className='flex flex-col items-center text-center'>

                    {userData?.photoUrl? <img src={userData?.photoUrl} className='w-24 h-24 rounded-full object-cover border-4 border-black' alt="" />: 
          <div className='w-24 h-24 rounded-full text-white flex items-center text-[30px] bg-black justify-center object-cover border-2 border-white'>
            {userData?.name.slice(0,1).toUpperCase()}
          </div>}

                   </div>

                   <div>
                    <label htmlFor="image" className='text-sm font-medium'>Select Avatar</label>
                    <input id="image" type="file"
                    name='photoUrl' 
                    placeholder='photoUrl'
                    onChange={(e) => setPhotoUrl(e.target.files[0])}
                    accept='image/*'
                    className='w-full px-4 py-2 border rounded-md text-sm'/>
                   </div>

                   <div>
                    <label htmlFor="name" className='text-sm font-medium'>UserName</label>
                    <input id="name" type="text"
                    
                    placeholder={userData?.name}
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    className='w-full px-4 py-2 border rounded-md text-sm'/>
                   </div>

                      <div>
                    <label className='text-sm font-medium'>Email</label>
                    <input readOnly type="text"
    
                    placeholder={userData?.email}
    
                    className='w-full px-4 py-2 border rounded-md text-sm'/>
                   </div>

                    <div>
                    <label className='text-sm font-medium'>Bio</label>
                    <textarea
                     name='description'
                    placeholder="Tell us about yourself "
                    rows={3}
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-md resize-none focus:right-2 focus:ring-[black]'/>
                   </div>

                   
                   <button className='w-full bg-black active:bg-[#454545] text-white py-2 rounded-md font-medium transition cursor-pointer'onClick={handleEditProfile}
                   disabled={loading}
                   >{loading?<ClipLoader size={30} color='whitw'/> :"Save Changes"}
                   </button>
                   

                </form>

        </div>
      
    </div>
  )
}

export default EditProfile
