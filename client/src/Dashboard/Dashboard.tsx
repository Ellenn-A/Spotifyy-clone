import React from "react";
import { useAuth } from "../Authorisation/useAuth";
import { ICode, IResponseBody } from "../Types/Types";

export const Dashboard:React.FC<ICode> =({code}):JSX.Element =>{
    //making code back into ICode object
    const accessToken = useAuth({ code });
    return (
        <div>
            {code}
        </div>
    )

}