'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
    const { user, logout, isAdmin } = useAuth();
    const router = useRouter();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="bg-[#0066FF] text-white py-6 fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-bold">
                    <Link href="/" className="hover:text-[#FFA100] transition duration-200">
                        Рыбный Мост
                    </Link>
                </h1>
                <button 
                    className="md:hidden focus:outline-none" 
                    onClick={toggleMobileMenu}
                >
                    <svg 
                        className="w-6 h-6" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        )}
                    </svg>
                </button>
                <nav className={`md:flex ${isMobileMenuOpen ? 'block' : 'hidden'} absolute md:static bg-[#0066FF] md:bg-transparent w-full md:w-auto top-full left-0`}>
                    <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0">
                        {user ? (
                            <>
                                {isAdmin() && (
                                    <li>
                                        <Link className="hover:text-[#FFA100] transition duration-200" href='/admin'>Админ</Link>
                                    </li>
                                )}
                                <li>
                                    <Link className="hover:text-[#FFA100] transition duration-200" href="/profile">
                                        Профиль
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="hover:text-[#FFA100] transition duration-200">
                                        Выйти
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href="/login" className='hover:text-[#FFA100] transition duration-200'>
                                        Авторизоваться
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/register" className='hover:text-[#FFA100] transition duration-200'>
                                        Зарегистрироваться
                                    </Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link href="/catalog" className='hover:text-[#FFA100] transition duration-200'>
                                Рыба/Спрос
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
