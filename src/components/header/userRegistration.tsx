import { cookies } from "next/headers";
import Link from 'next/link';
import Image from "next/image";
import SigninSignup from "./SigninSignup"
import LogOut from "./logout"
export default async function isAuthentication() {
	const isLoggedIn = await isAuthenticated();

	return (
		<div className="flex justify-between p-4">
            { !isLoggedIn
                ? <SigninSignup  />
				: <div className={` w-full px-2 py-1 flex flex-col justify-center items-center relative group hover:underline  rounded-md`}>
                        <div className="flex justify-start items-center gap-2 cursor-pointer ">
                            <div className="p-1 h-8 w-8 bg-white/20 rounded-full border-[1px] border-black/40 flex justify-center items-center">
                                <Image
                                    className=""
                                    src="/quanta.png"
                                    alt="Dot_95"
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <div>
                                <p className="font-thin line-clamp-1 text-md max-md:hidden">My account</p>
                            </div>
                        </div>
                        <div className={`absolute hidden md:group-hover:block h-80 w-72 transition-all ease-in-out duration-100 top-0 z-40 `}>
                            <div className={`profile h-full mt-[60px] w-full bg-white text-black/70 shadow-[inset_1px_1px_5px_#f006] rounded-md px-5 py-5 flex flex-col gap-6`}>
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
