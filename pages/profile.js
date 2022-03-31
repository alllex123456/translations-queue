import Profile from '../components/profile/Profile';

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
  const orders = mongoUser.orders
    .map((order) => ({ id: order.id, ...order }))
    .sort((a, b) => (a.deadline > b.deadline ? 1 : -1));
  const clients = mongoUser.clients;

  return {
    props: {
      orders,
      clients,
    },
  };
}

export default ProfilePage;
