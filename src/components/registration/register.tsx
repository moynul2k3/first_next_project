import Image from "next/image";
import React from "react";
type RegisterProps = {
    children: React.ReactNode;
};

const Register: React.FC<RegisterProps> = ({children}) => {
    return (
        <div className='max-md:h-[500px] md:h-[480px] max-md:w-full md:w-[1000px] md:flex md:justify-between    '>
            <div className='p-5 flex-1 flex justify-center items-center max-md:hidden'>
                <Image
                    className=""
                    src="/quanta.png"
                    alt="Dot_95"
                    width={300}
                    height={300}
                />
            </div>
            {children}
        </div>
    )
}

export default Register;