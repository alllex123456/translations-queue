import classes from './Clients.module.css';
import { useState, useEffect } from 'react';

import ClientItem from './ClientItem';

const Clients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const request = await fetch('/api/get-clients');
      const response = await request.json();
      setClients(response.message);
    };
    fetchClients();
  }, []);

  return (
    <section>
      <h2>Clients Register</h2>
      <ul className={classes.list}>
        {clients.map((client) => (
          <ClientItem id={client.id} name={client.name} rate={client.rate} />
        ))}
      </ul>
    </section>
  );
};

export default Clients;
