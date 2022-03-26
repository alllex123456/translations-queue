import classes from './Form.module.css';

import { useRef } from 'react';

const Form = (props) => {
  const clientInputRef = useRef();
  const pagesInputRef = useRef();
  const deadlineInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredClient = clientInputRef.current.value;
    const enteredPages = pagesInputRef.current.value;
    const enteredDeadline = deadlineInputRef.current.value;

    const newOrder = {
      client: enteredClient,
      pages: enteredPages,
      received: new Date().toLocaleDateString('ro'),
      deadline: new Date(enteredDeadline),
    };

    props.onAddOrder(newOrder);
    clientInputRef.current.value = '';
    pagesInputRef.current.value = '';
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <label htmlFor="client">Client:</label>
        <select id="client" ref={clientInputRef} required>
          <option value="">select...</option>
          <option value="Metafrasis">Metafrasis</option>
          <option value="Ada Traduceri">Ada Traduceri</option>
          <option value="Das Mak">Das Mak</option>
          <option value="Complet Trad">Complet Trad</option>
          <option value="Traduceri 10">Traduceri 10</option>
          <option value="Activ Traduceri">Activ Traduceri</option>
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
      <button className={classes.btn}>Register order</button>
    </form>
  );
};

export default Form;
