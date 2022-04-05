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

  const completeOrderHandler = (id, finalCount, rate) => {
    setIsCompleting(true);
    fetch('/api/orders/complete-orders', {
      method: 'POST',
      body: JSON.stringify({
        id: id,
        finalCount,
        rate,
      }),
      headers: { 'Content-Type': 'application/json' },
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
