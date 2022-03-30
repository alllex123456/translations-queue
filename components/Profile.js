import { useState, useEffect } from 'react';

import Orders from './Orders';
import Form from './Form';
import Modal from './Modal';
import { Fragment } from 'react';

const Profile = (props) => {
  const [orders, setOrders] = useState(props.orders);

  const [isFetching, setIsFetching] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

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

  return (
    <Fragment>
      <Orders orders={orders} onCompleteOrder={completeOrderHandler} />
      <Form onAddOrder={addOrderHandler} isFetching={isFetching} />
      {isRemoving && <Modal />}
    </Fragment>
  );
};

export default Profile;
