import { NavLink } from "react-router-dom";
import { ReactElement, useState } from "react";
import { DiApple } from "react-icons/di";

interface NavbarComponent {
    content: string,
    link: string,
    icon: ReactElement
}

interface NavbarProps {
    isNavbarOpen: boolean,
    handleNavbar: any
}

const Navbar = (props: NavbarProps) => {
    const [navbarComponents, setNavbarComponents] = useState<NavbarComponent[]>([
        {
            content: "Home",
            link: "/home",
            icon: <DiApple size={30} className="" />
        },
        {
            content: "Home1",
            link: "/home1",
            icon: <DiApple size={30} />
        }
    ])

    return (
        <div className={`w-full ${props.isNavbarOpen ? "h-40" : "h-0"} md:h-full md:w-1/5 bg-white duration-[0.25s] transition-height ease-in-out`}>
            {
                navbarComponents.map((navbarComponent: NavbarComponent): ReactElement => {
                    return (
                        <div className="h-1/4 md:h-[15%] w-full flex border-b border-gray-300">
                            <NavLink className="h-full w-full flex items-center" to={navbarComponent.link} onClick={() => { props.handleNavbar() }}>
                                {({ isActive }): ReactElement => (
                                    <>
                                        <div className={`h-0 m-0 md:h-3/4 md:w-[2.5%] my-auto rounded-r-lg ${isActive ? "bg-blue-500" : "bg-white"}`} />
                                        <div className={`w-full flex items-center text-2xl  ${props.isNavbarOpen ? `${isActive ? "text-blue-500" : "text-gray-500"}` : "text-transparent"}`}>
                                            <div className={`w-2/5 md:1/4 flex justify-center `}>
                                                {navbarComponent.icon}
                                            </div>
                                            <div className={`w-3/5 md:3/4 flex justify-start `}>
                                                {navbarComponent.content}
                                            </div>
                                        </div>
                                    </>
                                )}

                            </NavLink>
                        </div>
                    )
                })
            }
        </div>
    )
};

export default Navbar;