'use client'
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

const Header = () => {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    return (
        <header className="bg-[#0066FF] text-white py-4">
            <div className="container mx-auto flex justify-between items-center px-4">
                <h1 className="text-2xl font-bold">
                    <Link href="/" className="hover:text-[#FFA100] transition duration-200">
                        Рыбный Мост
                    </Link>
                </h1>
                <nav>
                    <ul className="flex space-x-4">
                        {user ? (
                            <>
                                <li>
                                    <Link className="hover:text-[#FFA100] transition duration-200" href="/profile">
                                        Профиль
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="text-red-500 hover:text-[#FFA100] transition duration-200">
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
                    </ul>

                </nav>
            </div>
        </header>
    );
};

export default Header;