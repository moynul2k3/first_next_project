"use client"
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
//import { checkUser } from "@/lib/user/CheckUser";

export default function SigninSignup() {
  const router = useRouter();
  const searchParams = useSearchParams();
  //const [loading, setLoading] = useState(false);

  //const handleOpenPopup = async () => {
  //  setLoading(true);
  //  const user = await checkUser();
  //  if (!user) {
  //      const currentParams = new URLSearchParams(searchParams.toString());
  //      currentParams.set("user", "_authentication-required");
  //      const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
  //      router.push(newUrl);
  //  }
  //  setLoading(false);
  //};

  const handleOpenPopup = () => {
      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.set("user", "_authentication-required");
      const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
      router.push(newUrl);
  };

  return (
    <div>
        {/*{ loading?(
            <div>Loading...</div>
        ) : (
            <button onClick={handleOpenPopup}>Signin/Signup</button>
        )}*/}
      <button onClick={ handleOpenPopup }>
        <span className="max-md:hidden">Signin / Signup</span>
        <span className="text-xl text-inherit max-md:block md:hidden"><i className='bx bx-user'></i></span>
      </button>
    </div>
  );
}
