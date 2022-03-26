import { useEffect, useState } from 'react';
import Form from '../components/Form';
import Orders from '../components/Orders';
import Layout from '../components/Layout';

// import { getOrders } from './api/queueHandler';

const HomePage = () => {
  const [orders, setOrders] = useState([]);

  const orderUpdates = orders.map((order) => order.id);

  const addOrderHandler = (newOrder) => {
    fetch('/api/queueHandler', {
      method: 'POST',
      body: JSON.stringify({
        client: newOrder.client,
        pages: newOrder.pages,
        received: newOrder.received,
        deadline: newOrder.deadline,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data.orders));
  };

  const completeOrderHandler = (id) => {
    fetch('/api/queueHandler', {
      method: 'DELETE',
      body: JSON.stringify({
        id: id,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data.orders));
  };

  useEffect(() => {
    fetch('/api/queueHandler')
      .then((res) => res.json())
      .then((data) => setOrders(data.orders));
  }, [orderUpdates]);

  return (
    <Layout>
      <Orders orders={orders} onCompleteOrder={completeOrderHandler} />
      <Form onAddOrder={addOrderHandler} />
    </Layout>
  );
};

// export function getServerSideProps() {
//   const orders = getOrders();

//   return {
//     props: {
//       orders,
//     },
//   };
// }

export default HomePage;
