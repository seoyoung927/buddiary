import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getLoginState } from "./utils";

interface IPrivateRouter{
    component: JSX.Element,
}

function PrivateRouter({component}: IPrivateRouter){
    const access = getLoginState();

    return (
        access ? component : <Navigate to="/login" {...alert("로그인이 필요한 서비스입니다.") as any} />
    )
}

export default PrivateRouter;
