import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../lib/db-utils';
import StatisticsMain from '../../components/statistics/StatisticsMain';

const StatisticsPage = (props) => {
  return (
    <StatisticsMain
      invoicingList={props.invoicingList}
      clients={props.clients}
    />
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const authenticatedUser = session.user.email;
  const client = await connectToDatabase();
  const collection = client.db().collection('users');
  const mongoUser = await collection.findOne({ email: authenticatedUser });
  const invoicingList = mongoUser.invoicing;
  const clients = mongoUser.clients;

  return {
    props: {
      invoicingList,
      clients,
    },
  };
}

export default StatisticsPage;
