import { cookies } from "next/headers";
import Link from 'next/link';
import Image from "next/image";
import SigninSignup from "./SigninSignup"
import LogOut from "./logout"
export default async function isAuthentication() {
	const isLoggedIn = await isAuthenticated();

	return (
		<div className=" flex justify-center items-center gap-2 bg-gradient_bg text-white w-10 h-10 xl:w-36 rounded ">
            { !isLoggedIn
                ? <SigninSignup  />
				:   <div className={`w-full flex flex-col justify-center items-center relative group  rounded-md`}>
                        <div className="flex justify-center  items-center gap-2 cursor-pointer ">
                            <div className="p-1 max-xl:h-10 max-xl:w-10 xl:h-8 xl:w-8 xl:bg-white max-xl:rounded xl:rounded-full flex justify-center items-center overflow-hidden">
                                <Image
                                    className=""
                                    src="/profile/moynul.jpg"
                                    alt="Dot_95"
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <div className="max-xl:hidden">
                                <p className="font-thin line-clamp-1 text-md">My account</p>
                            </div>
                        </div>
                        <div className={`absolute hidden md:group-hover:block h-80 w-72 transition-all ease-in-out duration-100 -top-3 z-40 `}>
                            <div className={`profile h-full mt-[70px] w-full bg-[#fff] text-black/70 shadow-black/10 shadow-md border-[1px] border-black/10 rounded-md px-5 py-5 flex flex-col gap-6 `}>
                                <Link href="" className={`flex justify-start items-center gap-3  group/item`}>
                                    <i className='bx bx-smile text-[25px] font-thin'></i> 
                                    <p className="text-sm group-hover/item:underline group-hover/item:text-[#f008] font-semibold">Manage My Account</p>
                                </Link>
                                <Link href="" className={`flex justify-start items-center gap-3  group/item`}>
                                    <i className='bx bxs-shopping-bag-alt  text-[25px] font-thin' ></i>
                                    <p className="text-sm group-hover/item:underline group-hover/item:text-[#f008] font-semibold">My Orders</p>
                                </Link>
                                <Link href="" className={`flex justify-start items-center gap-3  group/item`}>
                                    <i className='bx bx-heart text-[25px] font-thin'></i>
                                    <p className="text-sm group-hover/item:underline group-hover/item:text-[#f008] font-semibold">My Wishlist & Followed Stores</p>
                                </Link>
                                <Link href="" className={`flex justify-start items-center gap-3  group/item`}>
                                    <i className='bx bx-star text-[25px] font-thin'></i> 
                                    <p className="text-sm group-hover/item:underline group-hover/item:text-[#f008] font-semibold">My Reviews</p>
                                </Link>
                                <Link href="" className={`flex justify-start items-center gap-3  group/item`}>
                                    <i className='bx bx-plus rotate-45 border-[1px] border-black/50 rounded-full text-[20px] font-thin'></i> 
                                    <p className="text-sm group-hover/item:underline group-hover/item:text-[#f008] font-semibold">My Returns & Cancellations</p>
                                </Link>
                                <LogOut />
                            </div>
                        </div>
                    </div>
			}
		</div>
	);
}


export async function isAuthenticated(): Promise<boolean> {
	const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh")?.value;
    
	return !!refreshToken; 
}
