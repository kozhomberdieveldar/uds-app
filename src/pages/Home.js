import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-uds-primary text-white rounded-2xl p-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">UDS App</h1>
          <p className="text-xl mb-6">Зарабатывайте и тратьте бонусы в любимых магазинах</p>
          <Link to="/companies" className="bg-white text-uds-primary px-6 py-3 rounded-full font-semibold hover:bg-uds-gray transition">
            Начать сейчас
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Зарабатывайте баллы</h3>
          <p className="text-gray-600">Получайте бонусы за каждую покупку в партнерских магазинах</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Уникальные предложения</h3>
          <p className="text-gray-600">Специальные акции и скидки только для участников программы</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Экономьте на покупках</h3>
          <p className="text-gray-600">Используйте накопленные баллы для оплаты покупок</p>
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Популярные категории</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Красота', 'Рестораны', 'Здоровье', 'Магазины'].map((category) => (
            <div key={category} className="bg-white p-4 rounded-xl shadow-sm text-center hover:shadow-md transition cursor-pointer">
              <h3 className="font-semibold">{category}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white p-8 rounded-2xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold text-uds-primary mb-2">40M+</h2>
            <p className="text-gray-600">Пользователей уже используют UDS App</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-uds-primary mb-2">4.95</h2>
            <p className="text-gray-600">Рейтинг приложения</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home; 