'use client'
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

const Header = () => {
    const { user, logout, isAdmin } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    return (
        <header className="bg-[#0066FF] text-white py-6"> {/* Увеличен отступ по вертикали */}
            <div className="container mx-auto flex justify-between items-center px-6"> {/* Увеличен отступ по горизонтали */}
                <h1 className="text-3xl font-bold"> {/* Увеличен размер шрифта заголовка */}
                    <Link href="/" className="hover:text-[#FFA100] transition duration-200">
                        Рыбный Мост
                    </Link>
                </h1>
                <nav>
                    <ul className="flex space-x-6"> {/* Увеличено расстояние между элементами списка */}

                        {user ? (
                            <>
                                {isAdmin() ?
                                    (
                                        <li>
                                            <Link href='/admin'>Админ</Link>
                                        </li>
                                    ) : (
                                        <>
                                        </>
                                    )
                                }
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
                        <li>
                            <Link href="/orders" className='hover:text-[#FFA100] transition duration-200'>
                                Заказы
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;