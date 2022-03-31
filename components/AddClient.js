import classes from './AddClient.module.css';
import { useRef, useState } from 'react';

const AddClient = (props) => {
  const [addedClient, setAddedClient] = useState();
  const nameInputRef = useRef();

  const addClientHandler = async (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const response = await fetch('/api/new-client', {
      method: 'POST',
      body: JSON.stringify({
        name: enteredName,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const returnData = await response.json();
    setAddedClient(returnData.message);
  };
  return (
    <div className={classes.form}>
      <p className={classes.title}>Add new client</p>
      <form onSubmit={addClientHandler}>
        <div className={classes.controls}>
          <label htmlFor="name">Client Name:</label>
          <input type="text" id="name" ref={nameInputRef} />
        </div>
        <button className={classes.btn}>Register new client</button>
        {addedClient && <p>{addedClient} successfully added</p>}
      </form>
    </div>
  );
};

export default AddClient;
