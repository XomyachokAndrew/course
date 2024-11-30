import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-600">Рыбный Мост</h1>
        <p className="mt-4 text-lg text-gray-700">
          Добро пожаловать в нашу подсистему, где вы можете легко заказывать
          все необходимое для рыбалки!
        </p>
      </header>

      <main className="w-full max-w-2xl">
        <section className="mb-10">
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
          <Link href="/orders" className="inline-block px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition duration-200">
            К заказам
          </Link>
        </section>
      </main>

      <footer className="mt-10 text-center text-gray-600">
        <p>© 2023 Рыбный Мост. Все права защищены.</p>
      </footer>
    </div>
  );
}