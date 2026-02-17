import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

const getCurrentUser = () => {
    
    const dispatch = useDispatch()

 useEffect(()=>{
     const fetUser = async ()=>{
        try {
            const result = await axios.get(serverUrl + "/api/user/getcurrentuser", {withCredentials:true}
            );
            if(result.data){
            dispatch(setUserData(result.data))
            }
        } catch (error) {
            console.log(error)

            if (error.response?.status === 401) {
                    dispatch(setUserData(null))
                } else {
                    console.warn("Server error (500), keeping user session active for development.",error)
                }
        }
     }
     fetUser();
 },[])
}

export default getCurrentUser
