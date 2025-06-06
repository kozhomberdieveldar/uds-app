import React, { useEffect, useState } from 'react';

function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Замените на реальный API запрос
    setClients([
      { id: 1, name: 'Иван Иванов', email: 'ivan@example.com' },
      { id: 2, name: 'Мария Петрова', email: 'maria@example.com' },
    ]);
  }, []);

  return (
    <div>
      <h2>Клиенты</h2>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            {client.name} ({client.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Clients;
