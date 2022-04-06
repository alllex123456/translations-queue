import classes from './Scheduler.module.css';

import { useState } from 'react';
import { Fragment } from 'react';

import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/react';

import Orders from '../orders/Orders';
import Form from '../inputs/Form';

const Profile = (props) => {
  const [orders, setOrders] = useState(props.orders);

  const [isFetching, setIsFetching] = useState(false);

  const [isCompleting, setIsCompleting] = useState(false);

  const override = css`
    position: absolute;
    left: 35rem;
    top: 4rem;
  `;

  const addOrderHandler = (newOrder) => {
    setIsFetching(true);
    fetch('/api/orders/queueHandler', {
      method: 'POST',
      body: JSON.stringify({
        client: newOrder.client,
        rate: newOrder.rate,
        count: newOrder.count,
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

  const editOrderHandler = (orderData) => {
    fetch('/api/orders/edit-orders', {
      method: 'POST',
      body: JSON.stringify({
        id: orderData.id,
        client: orderData.client,
        count: orderData.count,
        rate: orderData.rate,
        received: orderData.received,
        deadline: orderData.deadline,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.message);
      });
  };

  const completeOrderHandler = (id, finalCount, finalRate) => {
    setIsCompleting(true);
    fetch('/api/orders/complete-orders', {
      method: 'POST',
      body: JSON.stringify({
        id: id,
        finalCount: finalCount,
        finalRate: finalRate,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
      });

    fetch('/api/orders/queueHandler', {
      method: 'DELETE',
      body: JSON.stringify({
        id: id,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.message);
        setIsCompleting(false);
      });
  };

  const removeOrderHandler = (id) => {
    fetch('/api/orders/queueHandler', {
      method: 'DELETE',
      body: JSON.stringify({
        id: id,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.message);
        setIsCompleting(false);
      });
  };

  return (
    <Fragment>
      <Orders
        isCompleting={isCompleting}
        orders={orders}
        onCompleteOrder={completeOrderHandler}
        onRemoveOrder={removeOrderHandler}
        onEditOrder={editOrderHandler}
      />
      <ClipLoader
        css={override}
        loading={isCompleting}
        size={30}
        color="white"
      />
      <div className={classes['form-group']}>
        <Form
          clients={props.clients}
          onAddOrder={addOrderHandler}
          isFetching={isFetching}
        />
      </div>
    </Fragment>
  );
};

export default Profile;
