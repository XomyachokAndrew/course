'use client';
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Register = () => {
    const { user, login, register } = useAuth();
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [password_confirmation, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const [photo, setPhoto] = useState(null); // Состояние для хранения фото
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/profile');
        }
    }, [user, router]);

    const handleRegister = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('place', place);
        formData.append('phone', phone);
        formData.append('password', password);
        formData.append('password_confirmation', password_confirmation);
        if (photo) {
            formData.append('photo', photo); // Добавляем фото в FormData
        }
        console.log(formData.getAll('name'));
        console.log(formData.getAll('place'));
        console.log(formData.getAll('phone'));
        console.log(formData.getAll('password'));
        console.log(formData.getAll('password_confirmation'));
        console.log(formData.getAll('photo'));
        try {
            await register(formData); // Предполагается, что register принимает FormData
            await login(phone, password);
            router.push('/profile');
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center text-[#0013FF]">Регистрация</h1>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">ФИО:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#0066FF]"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Номер телефона:</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#0066FF]"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Место:</label>
                        <input
                            type="text"
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#0066FF]"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Пароль:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#0066FF]"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Подтверждение пароля:</label>
                        <input
                            type="password"
                            value={password_confirmation}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#0066FF]"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Загрузить фото:</label>
                        <input
                            type="file"
                            accept="image/*" // Ограничиваем выбор только изображениями
                            onChange={(e) => setPhoto(e.target.files[0])} // Сохраняем выбранный файл
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#0066FF]"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#0066FF] text-white font-semibold py-2 rounded-md hover:bg-[#0013FF] transition duration-200"
                    >
                        Зарегистрироваться
                    </button>
                    <div className="mt-4 text-center">
                        <p className="text-sm">У вас уже есть аккаунт?</p>
                        <Link href="/login" className="text-[#0066FF] hover:text-[#0013FF] transition duration-200">
                            Войти
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;