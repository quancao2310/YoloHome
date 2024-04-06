import { ReactNode } from "react";
import Logo from "./logo";

interface HeaderProps {
    isMobile: boolean,
    handleNavbar: () => void
    title: string
}

const Header = (props: HeaderProps): ReactNode => {

    
    return (
        <>
            <div className="w-full h-[10%] flex justify-between bg-white border-b-2 border-gray-300">
                <div className="w-1/3 h-full flex items-center">  
                    {
                    props.isMobile ? 
                    <div onClick={() => { props.handleNavbar()}}>Open</div> 
                    : <div className="md:w-full h-full flex items-center justify-center">
                        <Logo size={1}/>
                    </div>
                    }
                    <div className="mx-6">{props.title}</div></div>
                <div className="w-1/3"></div>
                <div className="w-1/3 h-full flex items-center justify-end">

                    <div className="h-12 w-12 ml-3 mr-6 rounded-full bg-black"></div>
                </div>
            </div>
        </>
    )
};

function Navbar() {
    return (
        <>
            <button className="text-2xl text-cyan-600 mr-20">YOLOHOME</button>

            <div className="">
                <div className="">
                    <span className="text-lg mr-40 text-black">Environment</span>
                    <input type="text" placeholder="Search..."  className="border rounded-lg p-1.5"/>
                </div>

            </div>
        </>
    )
}

export default Header;