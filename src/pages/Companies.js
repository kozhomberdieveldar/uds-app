import React, { useState, useEffect } from 'react';
import { companiesAPI } from '../services/api';

function Companies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      const response = await companiesAPI.getCompanies();
      setCompanies(response.data);
      setError(null);
    } catch (err) {
      setError('Ошибка при загрузке компаний');
      console.error('Error loading companies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (companyId) => {
    try {
      await companiesAPI.connectToCompany(companyId);
      // Обновляем список компаний после подключения
      loadCompanies();
    } catch (err) {
      console.error('Error connecting to company:', err);
    }
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Компании-партнеры</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Поиск компаний..."
            className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-uds-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => (
          <div key={company.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
            <div className="h-48 bg-uds-primary/10 flex items-center justify-center">
              <span className="text-4xl font-bold text-uds-primary">
                {company.name.charAt(0)}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{company.name}</h3>
              <p className="text-gray-600 mb-4">{company.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-uds-primary font-semibold">
                  {company.bonus_percent || 5}% бонусов
                </span>
                <button
                  onClick={() => handleConnect(company.id)}
                  className="bg-uds-primary text-white px-4 py-2 rounded-full hover:bg-uds-secondary transition"
                >
                  Подключить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          Компании не найдены
        </div>
      )}
    </div>
  );
}

export default Companies; 