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
      <button onClick={ handleOpenPopup } className="hover:opacity-85">
        <span className="max-xl:hidden">Signin / Signup</span>
        <span className="text-xl text-inherit xl:hidden flex justify-center items-center">
          <i className='bx bx-user text-2xl'></i>
        </span>
      </button>
    </div>
  );
}
