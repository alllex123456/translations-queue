import { Fragment } from 'react';
import Clients from '../../components/clients/Clients';
import AddClientcopy from '../../components/inputs/AddClientcopy';

const ClientsPage = () => {
  return (
    <Fragment>
      <Clients />
      <AddClientcopy />
    </Fragment>
  );
};

export default ClientsPage;
