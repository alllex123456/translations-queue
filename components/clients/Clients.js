import classes from './Clients.module.css';
import { useState, useEffect } from 'react';

import ClientItem from './ClientItem';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);
      const request = await fetch('/api/clients/get-clients');
      const response = await request.json();
      setClients(response.message);
      setIsLoading(false);
    };
    fetchClients();
  }, []);

  return (
    <section className={classes.register}>
      <h2>Registrul de clienți</h2>
      <ul className={classes.list}>
        {isLoading && <p className={classes.loading}>Se încarcă...</p>}
        {clients.map((client) => (
          <ClientItem
            key={client.id}
            clientData={{
              id: client.id,
              name: client.name,
              rate: client.rate,
              taxNumber: client.taxNumber,
              registrationNumber: client.registrationNumber,
              phone: client.phone,
              email: client.email,
              registeredOffice: client.registeredOffice,
              notes: client.notes,
              bank: client.bank,
              bankNumber: client.bankNumber,
            }}
          />
        ))}
      </ul>
    </section>
  );
};

export default Clients;
