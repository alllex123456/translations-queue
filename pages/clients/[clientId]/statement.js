import ClientStatement from '../../../components/invoicing/ClientStatement';
import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../../lib/db-utils';
import { Fragment } from 'react';

const StatementPage = (props) => {
  return <ClientStatement client={props.client} />;
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  const { email } = session.user;
  const { clientId } = context.params;

  const connection = await connectToDatabase();
  const user = await connection
    .db()
    .collection('users')
    .findOne({ email: email });

  const client = user.clients.find((client) => client.id === clientId);

  return {
    props: {
      client,
    },
  };
}

export default StatementPage;
