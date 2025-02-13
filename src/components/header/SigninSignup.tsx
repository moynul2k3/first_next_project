"use client"
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { checkUser } from "@/lib/user/CheckUser";

export default function SigninSignup() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const handleOpenPopup = async () => {
    setLoading(true);
    const user = await checkUser();
    console.log('check----------', user);

    if (!user) {
      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.set("user", "_authentication-required");
      const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
      router.push(newUrl);
    }
    setLoading(false); // Set loading to false after check is complete
  };



  return (
    <div>
        { loading?(
            <div>Loading...</div>
        ) : (
            <button onClick={handleOpenPopup}>Signin/Signup</button>
        )}
    </div>
  );
}
