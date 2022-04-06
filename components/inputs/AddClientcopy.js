import classes from './AddClientcopy.module.css';
import { useRef, useState } from 'react';

const AddClient = (props) => {
  const [addedClient, setAddedClient] = useState();
  const [isAdding, setIsAdding] = useState(false);

  const nameInputRef = useRef();
  const taxInputRef = useRef();
  const currencyInputRef = useRef();
  const registrationInputRef = useRef();
  const officeInputRef = useRef();
  const phoneInputRef = useRef();
  const emailInputRef = useRef();
  const banknumberInputRef = useRef();
  const bankInputRef = useRef();
  const rateInputRef = useRef();
  const notesInputRef = useRef();

  const addClientHandler = async (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredTax = taxInputRef.current.value;
    const enteredCurrency = currencyInputRef.current.value;
    const enteredRegistration = registrationInputRef.current.value;
    const enteredOffice = officeInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredBankNumber = banknumberInputRef.current.value;
    const enteredBank = bankInputRef.current.value;
    const enteredRate = +rateInputRef.current.value;
    const enteredNotes = notesInputRef.current.value;

    setIsAdding(true);
    const response = await fetch('/api/clients/new-client', {
      method: 'POST',
      body: JSON.stringify({
        name: 'alex',
        // name: enteredName.toUpperCase(),
        // taxNumber: enteredTax,
        // currency: enteredCurrency,
        // registrationNumber: enteredRegistration,
        // registeredOffice: enteredOffice,
        // phone: enteredPhone,
        // email: enteredEmail,
        // bankNumber: enteredBankNumber,
        // bank: enteredBank,
        // rate: enteredRate,
        // notes: enteredNotes,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const returnData = await response.json();
    setIsAdding(false);
    setAddedClient(returnData.message);
    console.log(returnData);
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
          <label htmlFor="name">Client legal name:</label>
          <input type="text" id="name" ref={nameInputRef} required />
        </div>

        <div className={classes['controls-flex']}>
          <div className={classes.control}>
            <label htmlFor="tax">Tax number:</label>
            <input type="text" id="tax" ref={taxInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="registration">Company registration number:</label>
            <input type="text" id="registration" ref={registrationInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="currency">Currency:</label>
            <select type="text" id="currency" ref={currencyInputRef} required>
              <option value="RON">RON</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>

        <div className={classes['controls-flex']}>
          <div className={classes.control}>
            <label htmlFor="phone">Phone number:</label>
            <input type="phone" id="phone" ref={phoneInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="email">Email address:</label>
            <input type="email" id="email" ref={emailInputRef} />
          </div>
        </div>

        <div className={classes['controls-flex']}>
          <div className={classes.control}>
            <label htmlFor="banknumber">Bank account:</label>
            <input type="text" id="banknumber" ref={banknumberInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="bank">Bank:</label>
            <input type="text" id="bank" ref={bankInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="rate">Rate/2,000 chars w/ spaces:</label>
            <input type="number" id="rate" ref={rateInputRef} required />
          </div>
        </div>

        <div className={classes.controls}>
          <label htmlFor="office">Registered office:</label>
          <input type="text" id="office" ref={officeInputRef} />
        </div>

        <div className={classes.controls}>
          <label htmlFor="notes">Notes:</label>
          <textarea id="notes" rows="5" ref={notesInputRef}></textarea>
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
