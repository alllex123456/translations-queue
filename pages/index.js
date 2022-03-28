import { useEffect, useState } from 'react';
import Form from '../components/Form';
import Orders from '../components/Orders';
import Layout from '../components/Layout';
import Modal from '../components/Modal';

const HomePage = () => {
  const [orders, setOrders] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  // const orderUpdates = orders.map((order) => order._id);

  const addOrderHandler = (newOrder) => {
    setIsFetching(true);
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
      .then((data) => {
        setOrders(data.message);
        setIsFetching(false);
      });
  };

  const completeOrderHandler = (id) => {
    setIsRemoving(true);
    fetch('/api/queueHandler', {
      method: 'DELETE',
      body: JSON.stringify({
        id: id,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.message);
        setIsRemoving(false);
      });
  };

  useEffect(() => {
    setIsFetching(true);
    fetch('/api/queueHandler')
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.message);
        setIsFetching(false);
      });
  }, []);

  return (
    <Layout>
      <Orders orders={orders} onCompleteOrder={completeOrderHandler} />
      <Form onAddOrder={addOrderHandler} isFetching={isFetching} />
      {isRemoving && <Modal />}
    </Layout>
  );
};

export default HomePage;
