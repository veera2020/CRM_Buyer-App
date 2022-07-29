/*
 *  Document    : 404.js
 *  Author      : Ticvic
 *  Description : Common 404 error page
 */

import {  Button,Image } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from 'react-icons/bs';
import logo from "../../assets/Images/logo.png"
import Not from "../../assets/Images/Not.png"

const NotFound = () => {
  let navigate = useNavigate()
    return (
        <div className="h-screen flex flex-col justify-center place-items-center select-none">
        <div className="flex p-5">
          <img
            src={logo}
            alt="logo"
            width={45}                        
            height={45}            
          />
          <div className="flex flex-col">
            <div className="text-sm font-semibold">Uyarchi</div>
              <div className="text-xs">Buyer App</div>
            </div>
          </div>
          <Image src={Not} alt="logo" width={400} height={400} />
          <Button onClick={() => navigate("/")} colorScheme="blue" className="text-sm rounded-md mt-2">
              <i><BsArrowLeft size={22} /></i>                  
                Back
          </Button>
        </div>
    )
}

export default NotFound;