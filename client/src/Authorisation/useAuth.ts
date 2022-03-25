import React, { useEffect, useState } from "react";
import { IAutorisationAxiosResp, ICode, IResponseBody } from "../Types/Types";
import axios from "axios";


export const useAuth =({code}:ICode) =>{
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [expiresIn, setExpiresIn] = useState(0);

    useEffect(() =>{
        axios.post<IResponseBody
        >('http://localhost:3001/login',{
            code
        }).then(res =>{
            // console.log(res.data);
            setAccessToken(res.data.accessToken);
            setRefreshToken(res.data.refreshToken);
            setExpiresIn(res.data.expiresIn);
            window.history.pushState({}, '', '/')
        }).catch(()=> {
            window.location.href = "/";
        })
    }, [code])
    return accessToken; //alows me to call all different spotify APIs
    
}