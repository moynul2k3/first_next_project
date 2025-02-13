"use client";
//import {getCookie} from "@/lib/Cookie/manageCookie"
import React, { useState, useEffect } from 'react';
import Popup from "@/components/popup/popup"; // Your Popup component
import Register from "@/components/registration/register"; // Your Register component
import SigninSignup from "@/components/registration/signin_signup"; // Your SigninSignup component
import { useSearchParams } from 'next/navigation';

const AuthPopup = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const searchParams = useSearchParams();

  const handleClosePopup = async () => {
    window.history.back();
    setIsPopupVisible(false);
  };

  useEffect(() => {
    const notLoggedInParam = searchParams.get('user');
    if (notLoggedInParam === '_authentication-required') {
      setIsPopupVisible(true);
    } else {
      setIsPopupVisible(false);
    }
  }, [searchParams]); // Rerun effect when the searchParams change

  return (
    <div className='absolute top-0 left-0 '>
          <Popup isVisible={isPopupVisible} onClose={handleClosePopup}>
            <Register>
              <SigninSignup onClose={handleClosePopup} />
            </Register>
          </Popup>
    </div>
  );
};

export default AuthPopup;
