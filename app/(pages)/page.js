'use client'

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative">
      <header className="text-center mb-10 z-10">
        <h1 className="text-4xl font-bold text-blue-600">Рыбный Мост</h1>
        <p className="mt-4 text-lg text-gray-700">
          Добро пожаловать в нашу подсистему, где вы можете легко заказывать
          все необходимое для рыбалки!
        </p>
      </header>

      <main className="w-full max-w-2xl flex flex-col items-center ">
        <section className="mb-10 z-10">
          <h2 className="text-2xl font-semibold mb-4">Наши функции</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>🎣 Удобный интерфейс для оформления заказов на рыбу</li>
            <li>🛒 Широкий выбор рыбы от частных продавцов</li>
            <li>💰 Возможность продажи рыбы от частных лиц</li>
            <li>📩 Оставляйте запросы на покупку рыбы, которую хотите приобрести</li>
          </ul>
        </section>

        <section className="mb-10 text-center">
          <h2 className="text-2xl font-semibold mb-4">Готовы сделать заказ или продать рыбу?</h2>
          <Link href="/catalog" className="inline-block px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition duration-200">
            К заказам
          </Link>
          {
            user ? (
              <Link href="/fish/add" className="inline-block px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition duration-200 ml-4">
                Добавить рыбу
              </Link>
            ) : (
              <Link href="/login" className="inline-block px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition duration-200 ml-4">
                Добавить рыбу
              </Link>
            )
          }
        </section>

        {/* <div className="absolute left-0 max-w-2xl z-0">
          <img
            src='../fish.png'
            className="h-24 sm:h-28 md:h-32 lg:h-36 object-cover rounded-md transition-transform duration-300 mr-4 hidden md:block z-0" // Уменьшена высота
            style={{ objectFit: 'cover' }} // Добавлено свойство objectFit
            alt="Рыба"
          />
        </div>
        <div className="absolute right-0 max-w-2xl z-0">
          <img
            src='../fish_2.png'
            className="h-24 sm:h-28 md:h-32 lg:h-36 object-cover rounded-md transition-transform duration-300 ml-4 hidden md:block z-0" // Уменьшена высота
            style={{ objectFit: 'cover' }} // Добавлено свойство objectFit
            alt="Рыба"
          />
        </div> */}
      </main>

      <footer className="mt-10 text-center text-gray-600 z-10">
        <p>© 2024 Рыбный Мост. Все права защищены.</p>
      </footer>
    </div>
  );
}
