import React from 'react';
import { HiMenuAlt4 } from 'react-icons/hi';
import {AiOutlineClose} from 'react-icons/ai';
import Logo from '../../images/logo.png';


// NavbarItem component that takes in title and classProps and returns a <li> styled</li> title
    const NavbarItem = ({ title, classProps }) => {
        return (
            <li className={`mx-4 cursor-pointer ${classProps}`}>
                {title}
            </li>
        );
    }
const Navbar = () => {
        const [toggleMenu, setToggleMenu] = React.useState(false);
        return (
            <nav className="w-full flex md: justify-center"><div className="md:flex-[0.5] flex-initial justify-center items-center">
                
                <img src={Logo} alt="logo" className="w-32 cursor-pointer" />
            </div>
                <ul className="text-#0A0D1C; md:flex hidden list-none flex-row justify-between items-center flex-initial font-bold">
                   
                    {[" Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
                        <NavbarItem key={item + index} title={item} />
                    ))}
                    <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
                        Login
                    </li>
                </ul>
                <div className='flex relative'>
                    {toggleMenu ?
                        <AiOutlineClose fontSize={28} className='text-white md:hidden cursor-pointer ' onClick={() => setToggleMenu(false)} /> :
                        <HiMenuAlt4 className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
                    }
                    {toggleMenu && (
                        <ul
                        className= "z-10 fixed top-0 -right-2 padding-3 width-[70vw] h-screen shadow-2xl md:hidden list-none flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
                        >
                            <li className="text-xl w-full my-2">
                                <AiOutlineClose onClick={() => setToggleMenu(false)}/>
                            </li>
                            {[" Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
                        <NavbarItem key={item + index} title={item} classProps="my-2 text-lg" />
                    ))}
                        </ul>
                    )
                    
                    }
                
                </div>
            </nav>
        );
    }

export default Navbar;