import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js'; 
import './index.css';
import logo from '/src/assets/BDL.png';

const LogIn = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [isActive, setIsActive] = useState(false);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleLogin = (event) => {
        event.preventDefault();

        // Hachage du mot de passe en SHA-1
        const hashedPassword = CryptoJS.SHA1(inputs.password).toString(CryptoJS.enc.Hex);

        axios.post('http://localhost/api/index.php', {
            username: inputs.username,
            password: hashedPassword
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.data.success) {
                localStorage.setItem('username', inputs.username);
                localStorage.setItem('hashedPassword', hashedPassword);
                navigate('/dashboard');
            } else {
                alert(res.data.message); // Affiche un message d'erreur en cas d'échec de connexion
            }
        })
        .catch(err => console.log(err));
    };



    const handleSignUp = (event) => {
        // Date de naissance de l'utilisateur
        const birthDate = new Date(inputs.date);
        // Date actuelle
        const today = new Date();
    
        // Calcul de l'âge de l'utilisateur
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
    
        // Vérifie si le mois de l'anniversaire est passé cette année
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--; // Si non, soustrait 1 an
        }
    
        // Vérifie si l'utilisateur a au moins 16 ans
        if (age >= 16) {
            event.preventDefault();
    
            // Hachage du mot de passe en SHA-1
            const hashedPasswordSignUp = CryptoJS.SHA1(inputs.passwordSignUp).toString(CryptoJS.enc.Hex);
    
            axios.post('http://localhost/api/SignUp.php', {
                usernameSignUp: inputs.usernameSignUp,
                passwordSignUp: hashedPasswordSignUp,
                emailSignUp: inputs.email,
                dateSignUp: inputs.date
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.data.success) {
                    localStorage.setItem('usernameSignUp', inputs.usernameSignUp);
                    localStorage.setItem('hashedPasswordSignUp', hashedPasswordSignUp);
                    navigate('/dashboard');
                } else {
                    alert(res.data.message); // Affiche un message d'erreur en cas d'échec de connexion
                }
            })
            .catch(err => console.log(err));
    
        } else {
            alert("Vous devez avoir au moins 16 ans pour ouvrir un compte.");
        }
    };
    

    const handleRegisterClick = () => {
        setIsActive(true); // Active la classe logreg-box
    };
    const handleLoginClick = () => {
        setIsActive(false); // desactive la classe logreg-box
    };


    return (
        <div className="min-h-screen bg-[#d9d8d8] bg-[url('src/assets/14.png')] bg-cover font-medium ">
            <div className="flou w-full h-screen bg-no-repeat bg-cover bg-center backdrop-blur-md"></div>
            <div className="container absolute top-1/2 left-1/2 w-3/4 h-[38vw] bg-[url('src/assets/13.png')] backdrop-blur-md shadow-2xl bg-no-repeat bg-cover bg-center rounded-lg transform -translate-x-1/2 -translate-y-1/2 mt-5">
                
                <div className="content absolute top-0 left-0 w-3/5 h-full p-[6vw] backdrop-blur-md sm:p-[6vw] md:p-[6vw] text-[#e4e4e4] flex flex-col justify-between">
                <h2 className="logo text-[20px] sm:text-[25px] md:text-[40px] font-bold flex items-center">
                        <img src={logo} alt="Logo" className="h-[50px] mr-3  rounded-full" /> SwiftCom
                    </h2>
                    <div className="text-sci">
                        <h2 className="text-[1.5vw] sm:text-[2.5vw] md:text-[2.9vw] leading-none font-bold">
                            Bienvenue <span className="text-[1.5vw] sm:text-[2.43vw] md:text-[2.7vw]">sur SwiftCom!</span>
                        </h2>
                        <p className="text-base my-4 sm:my-5 md:my-5 text-[1vw] sm:text-[1vw] md:text-[1.1vw] leading-[1.4]">
                            Chez SwiftCom, vos transactions sont à portée de main.<br/>
                            Notre système de suivi avancé garantit que vous restez informé de chaque mouvement de votre compte, vous fournissant des mises à jour en temps réel et le plus haut niveau de sécurité.<br/>
                            Vivez l’expérience bancaire en toute sérénité.
                        </p>
                        <div className="sociel-icons text-[1.5vw] sm:text-[1.8vw] md:text-[2vw] flex space-x-2.5 mt-[-1vw] sm:mt-[-1.5vw] md:mt-[0]">
                            <a href="https://www.linkedin.com/company/bdlofficiel" target="_blank" className="transform transition-transform duration-500 hover:scale-125">
                                <i className="bx bxl-linkedin"></i>
                            </a>
                            <a href="https://www.facebook.com/BDLOfficiel" target="_blank" className="transform transition-transform duration-500 hover:scale-125">
                                <i className="bx bxl-facebook"></i>
                            </a>
                            <a href="https://www.instagram.com/bdl_banque/" target="_blank" className="transform transition-transform duration-500 hover:scale-125">
                                <i className="bx bxl-instagram-alt"></i>
                            </a>
                            <a href="https://x.com/BanqueBDL" className="transform transition-transform duration-500 hover:scale-125">
                                <i className='bx bxl-twitter'></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className={`logreg-box overflow-hidden ${isActive ? 'active' : ''} absolute top-0 right-0 w-2/5 h-full backdrop-blur-2xl`}>
                    <div className={`form-box login transform ${isActive ? 'translate-x-[430px] delay-0' : 'translate-x-0 delay-700'} transition-transform duration-700 ease-in-out absolute flex justify-center items-center w-full h-full backdrop-blur-2xl rounded-tr-lg rounded-br-lg text-[#e4e4e4]`}> 
                        <form onSubmit={handleLogin}>
                            <h2 className="text-[2.5vw] text-center font-bold mb-[0] sm:mb-[0] md:mb-[3vw]">Se connecter</h2>

                            <div className="input-box relative w-[22vw] h-[3.5vw] border-b-2 border-[#e4e4e4] my-7">
                                <span className="icon absolute sm:top-30 md:top-3 right-0 text-[1.4vw]"><i className='bx bxs-user'></i></span>
                                <input 
                                    type="text" 
                                    id="username" 
                                    name="username" 
                                    required 
                                    className="w-full h-full bg-transparent border-none outline-none text-base text-[#e4e4e4] text-[1.1vw] pr-7" 
                                    onChange={handleChange}
                                    value={inputs.username || ""} 
                                />
                                <label htmlFor="username" className='absolute top-1/2 left-0 transform -translate-y-1/2 text-base pointer-events-none transition-transform duration-500 text-[10px] sm:text-[13px] md:text-[17px]'>utilisateur</label>
                            </div>

                            <div className="input-box relative w-[22vw] h-[3.5vw] border-b-2 border-[#e4e4e4] my-7">
                                <span className="icon absolute sm:top-30 md:top-3 right-0 text-[1.4vw]"><i className='bx bxs-lock-open-alt'></i></span>
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    required 
                                    className="w-full h-full bg-transparent border-none outline-none text-base text-[#e4e4e4] text-[1.1vw] pr-7" 
                                    onChange={handleChange}
                                    value={inputs.password || ""} 
                                />
                                <label htmlFor="password" className='absolute top-1/2 left-0 transform -translate-y-1/2 text-base pointer-events-none transition-transform duration-500 text-[10px] sm:text-[13px] md:text-[17px]'>mot de passe</label>
                            </div>

                            <div className="remember-forgot text-sm mt-[-10px] mb-[0] sm:mb-[2vw] md:mb-[2vw] flex justify-between items-center">
                                <label className='text-[0.9vw]'>
                                    <input type="checkbox" className='accent-[#e4e4e4] mr-2 h-[6px] sm:h-[8px] md:h-[12px] w-[6px] sm:w-[8px] md:w-[12px]' /> Remember me
                                </label>
                                <a href="#" className="text-[#e4e4e4] hover:underline text-[0.9vw]">Forgot Password?</a>
                            </div>

                            <button type="submit" className="w-full h-[3.5vw] rounded-lg text-[1.4vw] font-semibold shadow-xl transition-transform transform hover:scale-105 duration-500 bg-gradient-to-r from-[#9b5a00] via-[#b1722b] to-[#be9969]">
                                Se connecter
                            </button>

                            <div className='login-register text-[0.85vw] font-medium text-center mt-[10px]'>
                                <p>Vous n'avez pas de compte? 
                                    <a href="#" className='register-link font-semibold hover:underline' onClick={handleRegisterClick}> S'inscrire</a>
                                </p>
                            </div>
                        </form>
                    </div>




                    <div className={`form-box register transform ${isActive ? 'translate-x-0 delay-700' : 'translate-x-[430px] delay-500'} transition-transform duration-500 ease-in-out flex justify-center items-center w-full h-full backdrop-blur-2xl rounded-tr-lg rounded-br-lg text-[#e4e4e4]`}>
                        <form onSubmit={handleSignUp}>
                            <h2 className="text-[2.5vw] text-center font-bold mb-[0] sm:mb-[0] md:mb-[1vw]">S'inscrire</h2>
                            
                            <div className="input-box relative w-[22vw] h-[3.5vw] border-b-2 border-[#e4e4e4] my-7">
                                <span className="icon absolute sm:top-30 md:top-3 right-0 text-[1.4vw]"><i className='bx bxs-user'></i></span>
                                <input 
                                    type="text" 
                                    id="usernameSignUp" 
                                    name="usernameSignUp" 
                                    required 
                                    className="w-full h-full bg-transparent border-none outline-none text-base text-[#e4e4e4] text-[1.1vw] pr-7" 
                                    onChange={handleChange}
                                    value={inputs.usernameSignUp || ""} 
                                />
                                <label htmlFor="username" className='absolute top-1/2 left-0 transform -translate-y-1/2 text-base pointer-events-none transition-transform duration-500 text-[10px] sm:text-[13px] md:text-[17px]'>utilisateur</label>
                            </div>

                            <div className="input-box relative w-[22vw] h-[3.5vw] border-b-2 border-[#e4e4e4] my-7">
                                <span className="icon absolute sm:top-30 md:top-3 right-0 text-[1.4vw]"><i className='bx bxs-lock-open-alt'></i></span>
                                <input 
                                    type="password" 
                                    id="passwordSignUp" 
                                    name="passwordSignUp" 
                                    required 
                                    className="w-full h-full bg-transparent border-none outline-none text-base text-[#e4e4e4] text-[1.1vw] pr-7" 
                                    onChange={handleChange}
                                    value={inputs.passwordSignUp || ""} 
                                />
                                <label htmlFor="password" className='absolute top-1/2 left-0 transform -translate-y-1/2 text-base pointer-events-none transition-transform duration-500 text-[10px] sm:text-[13px] md:text-[17px]'>mot de passe</label>
                            </div>

                            <div className="input-box relative w-[22vw] h-[3.5vw] border-b-2 border-[#e4e4e4] my-7">
                                <span className="icon absolute sm:top-30 md:top-3 right-0 text-[1.4vw]"><i className='bx bxl-gmail'></i></span>
                                <input 
                                    type="text" 
                                    id="email" 
                                    name="email" 
                                    required 
                                    className="w-full h-full bg-transparent border-none outline-none text-base text-[#e4e4e4] text-[1.1vw] pr-7" 
                                    onChange={handleChange}
                                    value={inputs.email || ""} 
                                />
                                <label htmlFor="email" className='absolute top-1/2 left-0 transform -translate-y-1/2 text-base pointer-events-none transition-transform duration-500 text-[10px] sm:text-[13px] md:text-[17px]'>email</label>
                            </div>

                            <div className="input-box  relative w-[22vw] h-[3.5vw] border-b-2 border-[#e4e4e4] my-7">
                                <span className="icon absolute sm:top-30 md:top-3 right-0 text-[1.4vw]"><i className='bx bx-calendar'></i></span>
                                <input
                                    type='date'
                                    id="date"
                                    name="date"
                                    className="w-full h-full bg-transparent border-none outline-none text-base text-[#e4e4e4] text-[1.1vw] pr-7"
                                    value={inputs.date || ''}
                                    onChange={handleChange}
                                />
                                <label htmlFor="date" className='absolute mt-2 top-1/2 left-0 transform -translate-y-1/2 text-base pointer-events-none transition-transform duration-500 text-[10px] sm:text-[13px] md:text-[17px]'>
                                    Date de naissance
                                </label>
                            </div>

                            <div className="remember-forgot text-sm mt-[-10px] mb-[0] sm:mb-[1vw] md:mb-[1vw] flex justify-between items-center">
                                <label className='text-[0.9vw]'>
                                    <input type="checkbox" className='accent-[#e4e4e4] mr-2 h-[6px] sm:h-[8px] md:h-[12px] w-[6px] sm:w-[8px] md:w-[12px]' /> I agree to the terms & conditions
                                </label>
                            </div>

                            <button type="submit" className="w-full h-[3.3vw] rounded-lg text-[1.4vw] font-semibold shadow-xl transition-transform transform hover:scale-105 duration-500 bg-gradient-to-r from-[#9b5a00] via-[#b1722b] to-[#be9969]">
                                S'inscrire
                            </button>

                            <div className='login-register text-[0.85vw] font-medium text-center mt-[10px]'>
                                <p>Vous avez deja un compte? 
                                    <a href="#" className='logIn-link font-semibold hover:underline' onClick={handleLoginClick}> Se connecter</a>
                                </p>
                            </div>
                        </form>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default LogIn;




