import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Protected({children, authentication = true}) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const UserStatus = useSelector(state => state.auth.status)
    useEffect(()=>{
        //Todo: Make it more easy to understand
        /* if(UserStatus == true){
        navigate("/")else if(UserStatus !== true){
        navigate("/login")
        }} */
        if(authentication && UserStatus !== authentication){
            navigate("/login")
            /*authentication will be true every time it doesn't matter. Is user send it or not and in second login it means if userStatus will
            false and authentication is true and we checking they are not equal it means it's true. Due to this both value are true means user is 
            not login redirect him on Login page */
        }else if(!authentication && UserStatus !== authentication){
            navigate("/")
            /*same here if authentication value is false and userStatus true and authentication value false means it become false so both are false
            so user will be redirect to home page  */
        }
        setLoader(false)

    },[UserStatus, navigate, authentication])
  return loader ? <div>Loading...</div> : <>{children}</>
}

