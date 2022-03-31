import classes from './Form.module.css';

import { useRef } from 'react';

const Form = (props) => {
  const clientInputRef = useRef();
  const pagesInputRef = useRef();
  const deadlineInputRef = useRef();
  const sortedClientNames = props.clients.sort((a, b) =>
    a.name > b.name ? 1 : -1
  );
  const clientNames = props.clients.map((client) => (
    <option key={client.id} value={client.name.toLowerCase()}>
      {client.name.toUpperCase()}
    </option>
  ));

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredClient = clientInputRef.current.value;
    const enteredPages = pagesInputRef.current.value;
    const enteredDeadline = deadlineInputRef.current.value;

    const newOrder = {
      client: enteredClient,
      pages: enteredPages,
      received: new Date(),
      deadline: new Date(enteredDeadline),
    };

    props.onAddOrder(newOrder);
    clientInputRef.current.value = '';
    pagesInputRef.current.value = '';
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <p className={classes.title}>Add new order</p>
      <div className={classes.controls}>
        <label htmlFor="client">Client:</label>
        <select id="client" ref={clientInputRef} required>
          <option>select &darr;</option>
          {clientNames}
        </select>
      </div>
      <div className={classes.controls}>
        <label htmlFor="pages">Est. pages:</label>
        <input type="number" id="pages" ref={pagesInputRef} required />
      </div>
      <div className={classes.controls}>
        <label htmlFor="deadline">Deadline:</label>
        <input
          type="datetime-local"
          id="deadline"
          ref={deadlineInputRef}
          placeholder="dd-mm-yyyy"
          required
        />
      </div>
      <button className={classes.btn}>
        {props.isFetching ? 'Loading...' : 'Register order'}
      </button>
    </form>
  );
};

export default Form;
