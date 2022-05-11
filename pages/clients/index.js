import { Fragment } from 'react';
import Clients from '../../components/clients/Clients';
import AddClient from '../../components/inputs/AddClient';

const ClientsPage = () => {
  return (
    <Fragment>
      <Clients />
      <AddClient />
    </Fragment>
  );
};

export default ClientsPage;
