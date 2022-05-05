import axios from "axios";
import React, { useEffect, useState } from "react";
import { IAutorisationAxiosResp, ICode, IResponseBody } from "../Types/Types";
// import axios from "axios";
// 

export const useAuth =({code}:ICode) =>{
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [expiresIn, setExpiresIn] = useState(0);


    useEffect(() =>{
        axios.post('http://localhost:3001/login',{code})
        .then(res =>{
            
            // console.log(res.data)
            setAccessToken(res.data.accessToken);
            setRefreshToken(res.data.refreshToken);
            setExpiresIn(res.data.expiresIn);
            window.history.pushState({}, '' , '/');
        })
        .catch(() =>{
            window.location.href='/';
        })
    },[code])


    useEffect(()=>{
        if(!refreshToken || !expiresIn) return
        const interval = setInterval(()=>{
          axios.post('http://localhost:3001/refresh',{refreshToken})
        .then(res =>{
            setAccessToken(res.data.accessToken);
            setExpiresIn(res.data.expiresIn);
           
        })
        .catch(() =>{
            window.location.href='/';
        })  
        },(expiresIn-60)*1000)
        return () => clearInterval(interval);
    },[refreshToken,expiresIn])



    return accessToken; // call all the spotify apis 
    
//     useEffect(() =>{
//         axios.post<IResponseBody
//         >('http://localhost:3001/login',{
//             code,
//         }).then(res =>{
//             console.log(res.data);
//             setAccessToken(res.data.accessToken);
//             setRefreshToken(res.data.refreshToken);
//             setExpiresIn(res.data.expiresIn);
//             window.history.pushState({}, '', '/')
//         }).catch(()=> {
//             window.location.href = "/";
//         })
//     }, [code])

//     useEffect(() =>{
//         axios.post<IResponseBody
//         >('http://localhost:3001/refresh',{
//             refreshToken,
//         }).then(res =>{
//             console.log(res.data);
//             // setAccessToken(res.data.accessToken);
//             // setRefreshToken(res.data.refreshToken);
//             // setExpiresIn(res.data.expiresIn);
//             // window.history.pushState({}, '', '/')
//         }).catch(()=> {
//             window.location.href = "/";
//         })
//     }, [code])

//     // useEffect(() => {

//     // }, [refreshToken, expiresIn]);
//     return accessToken; //alows me to call all different spotify APIs

}