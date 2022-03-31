import Profile from '../components/Profile';

import { connectToDatabase } from '../lib/db-utils';
import { getSession } from 'next-auth/client';

const ProfilePage = (props) => {
  return (
    <Profile clients={props.clients} orders={props.orders} id={props.id} />
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const authenticatedUser = session.user.email;
  const client = await connectToDatabase();
  const collection = client.db().collection('users');
  const mongoUser = await collection.findOne({ email: authenticatedUser });
  const orders = mongoUser.orders.map((order) => ({ id: order.id, ...order }));
  const clients = mongoUser.clients;
  console.log(clients);

  return {
    props: {
      orders,
      clients,
    },
  };
}

export default ProfilePage;
