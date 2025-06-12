import React, { useState } from 'react';
import { authAPI } from '../services/api';

function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authAPI.login(phone, password);
      window.location.href = '/';
    } catch (err) {
      setError('Ошибка авторизации');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 space-y-4">
      <input
        type="text"
        placeholder="Телефон"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full border p-2 rounded"
      />
      {error && <div className="text-red-500">{error}</div>}
      <button type="submit" className="w-full bg-uds-primary text-white p-2 rounded">Войти</button>
    </form>
  );
}

export default Login; 