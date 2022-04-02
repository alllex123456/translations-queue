import classes from './Scheduler.module.css';

import { useState } from 'react';
import { Fragment } from 'react';

import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/react';

import Orders from '../orders/Orders';
import Form from '../inputs/Form';
import AddClient from '../inputs/AddClient';

const Profile = (props) => {
  const [orders, setOrders] = useState(props.orders);

  const [isFetching, setIsFetching] = useState(false);

  const [isRemoving, setIsRemoving] = useState(false);
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
        setIsRemoving(false);
      });
  };

  return (
    <Fragment>
      <Orders
        isRemoving={isRemoving}
        orders={orders}
        onCompleteOrder={completeOrderHandler}
      />
      <ClipLoader css={override} loading={isRemoving} size={30} color="white" />
      <div className={classes['form-group']}>
        <Form
          clients={props.clients}
          onAddOrder={addOrderHandler}
          isFetching={isFetching}
        />
        {/* <AddClient /> */}
      </div>
    </Fragment>
  );
};

export default Profile;
