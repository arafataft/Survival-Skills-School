import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL:'http://localhost:5000',
})

const useAxiosSecure =()=>{
    const {logOut}=useContext(AuthContext);
    const Navigate=useNavigate();
 useEffect(()=>{
    
    axiosSecure.interceptors.request.use(config=>{
        const token = `Bearer ${localStorage.getItem('access-token')}`
        if(token){
            config.headers.Authorization=token
        }
        return config;
    })


    axiosSecure.interceptors.request.use(res=>res, async error=>{
        if(error.res && error.res.status===401 || error.res.status===403){
            await logOut()
            Navigate('/login');
            
        }
        return Promise.reject(error)
    })

 },[Navigate, logOut])
    
    return {axiosSecure}
}

export default useAxiosSecure;