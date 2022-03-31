import classes from './AddClient.module.css';
import { useRef, useState } from 'react';

const AddClient = (props) => {
  const [addedClient, setAddedClient] = useState();
  const [isAdding, setIsAdding] = useState(false);
  const nameInputRef = useRef();

  const addClientHandler = async (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;

    setIsAdding(true);
    const response = await fetch('/api/new-client', {
      method: 'POST',
      body: JSON.stringify({
        name: enteredName,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const returnData = await response.json();
    setIsAdding(false);
    setAddedClient(returnData.message);
  };

  if (addedClient) {
    setTimeout(() => {
      setAddedClient(null);
    }, 3000);
  }

  return (
    <div className={classes.form}>
      <p className={classes.title}>Add new client</p>
      <form onSubmit={addClientHandler}>
        <div className={classes.controls}>
          <label htmlFor="name">Client Name:</label>
          <input type="text" id="name" ref={nameInputRef} />
        </div>
        <button className={classes.btn}>
          {isAdding ? 'Please wait...' : 'Register new client'}
        </button>
        {addedClient && (
          <p className={classes.message}>
            {addedClient.toUpperCase()} successfully added. It will be visible
            after refresh.
          </p>
        )}
      </form>
    </div>
  );
};

export default AddClient;
