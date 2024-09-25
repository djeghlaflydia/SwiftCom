import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import logo from '/src/assets/BDL.png';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false); 

    const handle_Dashboard = () => {
        navigate("/dashboard");
        setIsMenuOpen(false); // Close menu on navigation
    };

    const handle_Financial_messages = () => {
        navigate("/financial_messages");
        setIsMenuOpen(false);
    };

    const handle_Answers = () => {
        navigate("/answers");
        setIsMenuOpen(false);
    };

    const handle_Account_statements = () => {
        navigate("/account_statements");
        setIsMenuOpen(false);
    };

    const handle_Free_massages = () => {
        navigate("/free_massages");
        setIsMenuOpen(false);
    };


    return (
        <header className="bg-dark-blue-gradient pt-5 sm:p-2 sm:pt-6 backdrop-blur-md shadow-lg">
            <div className="flex items-center justify-between pr-10">
                <div className="flex items-center pl-5 sm:pl-16 bg-gradient-to-r from-[#1b0000] via-[#7b01af] to-[#c800ff] bg-clip-text text-transparent">
                    <h2 className="logo text-[20px] sm:text-[25px] md:text-[30px] font-bold flex items-center">
                        <img src={logo} alt="Logo" className="h-[30px] rounded-full" /> SwiftCom
                    </h2>
                </div>

                {/* Hamburger menu for small devices */}
                <button 
                    className="sm:hidden text-black text-3xl focus:outline-none" 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? '×' : '≡'} {/* Toggle between = and × */}
                </button>

                {/* Menu for larger screens */}
                <nav className="hidden sm:block ml-auto pr-[-30x] text-[5px] sm:text-[12px] md:text-[16px] text-black">
                    <ul className="flex font-serif space-x-4 sm:space-x-4 md:space-x-12 font-bold">
                        <li>
                            <a 
                                href="#" 
                                onClick={handle_Dashboard} 
                                className={`${location.pathname === '/dashboard' ? 'underline' : ''} hover:text-[#420154] hover:underline`}
                            >
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#" 
                                onClick={handle_Financial_messages} 
                                className={`${location.pathname === '/financial_messages' ? 'underline' : ''} hover:text-[#420154] hover:underline`}
                            >
                                Messages financier
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#" 
                                onClick={handle_Answers} 
                                className={`${location.pathname === '/answers' ? 'underline' : ''} hover:text-[#420154] hover:underline`}
                            >
                                Réponses
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#" 
                                onClick={handle_Account_statements} 
                                className={`${location.pathname === '/account_statements' ? 'underline' : ''} hover:text-[#420154] hover:underline`}
                            >
                                Extraits de compte
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#" 
                                onClick={handle_Free_massages} 
                                className={`${location.pathname === '/free_massages' ? 'underline' : ''} hover:text-[#420154] hover:underline`}
                            >
                                Messages libre
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Dropdown menu for small devices */}
            {isMenuOpen && (
                <nav className="sm:hidden mt-2 text-black text-[14px] backdrop-blur-md">
                    <ul className="flex font-serif flex-col space-y-2 items-end pr-10"> {/* Align to the left with pl-5 */}
                        <li>
                            <a 
                                href="#" 
                                onClick={handle_Dashboard} 
                                className={`${location.pathname === '/dashboard' ? 'underline' : ''} hover:text-[#420154] hover:underline`}
                            >
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#" 
                                onClick={handle_Financial_messages} 
                                className={`${location.pathname === '/financial_messages' ? 'underline' : ''} hover:text-[#420154] hover:underline`}
                            >
                                Messages financier
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#" 
                                onClick={handle_Answers} 
                                className={`${location.pathname === '/answers' ? 'underline' : ''} hover:text-[#420154] hover:underline`}
                            >
                                Réponses
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#" 
                                onClick={handle_Account_statements} 
                                className={`${location.pathname === '/account_statements' ? 'underline' : ''} hover:text-[#420154] hover:underline`}
                            >
                                Extraits de compte
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#" 
                                onClick={handle_Free_massages} 
                                className={`${location.pathname === '/free_massages' ? 'underline' : ''} hover:text-[#420154] hover:underline`}
                            >
                                Messages libre
                            </a>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
}

export default Header;
