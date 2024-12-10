'use client';
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
    const { login,user } = useAuth();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/profile');
        }
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(phone, password);

            router.push('/profile');
        } catch (error) {
            setError('Данные введены неверно');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-[#F8F9FA] p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center text-[#0013FF]">Вход</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Вывод ошибки */}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Номер телефона</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#0066FF]"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Пароль</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#0066FF]"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#0066FF] text-white font-semibold py-2 rounded-md hover:bg-[#0013FF] transition duration-200"
                    >
                        Войти
                    </button>
                    <Link href="/register" className="mt-4 block text-center text-[#0066FF] hover:text-[#0013FF] transition duration-200">
                        Регистрация
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;