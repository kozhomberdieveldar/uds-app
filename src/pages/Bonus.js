import React, { useState, useEffect } from 'react';
import { bonusAPI } from '../services/api';

function Bonus() {
  const [transactions, setTransactions] = useState([]);
  const [totalBonus, setTotalBonus] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBonusData();
  }, []);

  const loadBonusData = async () => {
    try {
      setLoading(true);
      const [transactionsResponse, totalBonusResponse] = await Promise.all([
        bonusAPI.getBonusHistory(),
        bonusAPI.getTotalBonus()
      ]);
      setTransactions(transactionsResponse.data);
      setTotalBonus(totalBonusResponse.data.total);
      setError(null);
    } catch (err) {
      setError('Ошибка при загрузке данных');
      console.error('Error loading bonus data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uds-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-uds-primary text-white rounded-2xl p-6">
        <h2 className="text-xl mb-2">Ваш баланс бонусов</h2>
        <p className="text-3xl font-bold">{totalBonus} баллов</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-4">История транзакций</h3>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex justify-between items-center border-b pb-4 last:border-0"
            >
              <div>
                <h4 className="font-semibold">{transaction.bonus && transaction.bonus.company ? transaction.bonus.company.name : '—'}</h4>
                <p className="text-sm text-gray-600">{transaction.description}</p>
                <p className="text-xs text-gray-500">
                  {new Date(transaction.created_at).toLocaleDateString('ru-RU')}
                </p>
              </div>
              <span
                className={`font-semibold ${
                  transaction.is_income
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {transaction.is_income ? '+' : '-'}
                {transaction.amount}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-4">Как получить больше бонусов?</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">Приветственные бонусы</h4>
            <p className="text-sm text-gray-600">
              Получите бонусы за подключение к программе лояльности
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">Покупки</h4>
            <p className="text-sm text-gray-600">
              Зарабатывайте бонусы за каждую покупку
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">Реферальная программа</h4>
            <p className="text-sm text-gray-600">
              Приглашайте друзей и получайте бонусы
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bonus; 