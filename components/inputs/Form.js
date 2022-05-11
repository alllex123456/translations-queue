import classes from './Form.module.css';

import { useRef, useState } from 'react';
import { useContext } from 'react';
import UserContext from '../../store/user-ctx';

const Form = (props) => {
  const { language } = useContext(UserContext);

  const [rate, setRate] = useState(0);
  const clientInputRef = useRef();
  const pagesInputRef = useRef();
  const deadlineInputRef = useRef();
  const notesInputRef = useRef();

  const clientNames = props.clients.map((client) => (
    <option key={client.id} value={client.name}>
      {client.name}
    </option>
  ));

  const rates = props.clients.map((client) => ({
    name: client.name,
    rate: client.rate,
  }));

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredClient = clientInputRef.current.value;
    const enteredPages = +pagesInputRef.current.value;
    const enteredDeadline = deadlineInputRef.current.value;
    const enteredNotes = notesInputRef.current.value;
    console.log(enteredDeadline);
    const newOrder = {
      client: enteredClient,
      rate: +rate,
      count: enteredPages,
      received: new Date(),
      deadline: new Date(enteredDeadline),
      notes: enteredNotes,
    };

    props.onAddOrder(newOrder);

    clientInputRef.current.value = '';
    pagesInputRef.current.value = '';
    notesInputRef.current.value = '';
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <p className={classes.title}>Adaugă comandă nouă</p>
      <div className={classes.controls}>
        <label htmlFor="client">Client:</label>
        <select
          id="client"
          ref={clientInputRef}
          onChange={(e) =>
            setRate(
              rates[rates.findIndex((client) => client.name === e.target.value)]
                .rate
            )
          }
          required
        >
          <option>select &darr;</option>
          {clientNames}
        </select>
      </div>
      <div className={`${classes.controls} ${classes.flex}`}>
        <div>
          <label htmlFor="pages">
            Volum estimat <br /> (în mii caractere + spații):
          </label>
          <input
            type="number"
            id="pages"
            placeholder="e.g. 24000"
            ref={pagesInputRef}
            required
          />
        </div>
        <div>
          <label htmlFor="rate">Tarif:</label>
          <input
            type="number"
            id="rate"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            required
          />
        </div>
      </div>
      <div className={classes.controls}>
        <label htmlFor="deadline">Termen:</label>
        <input
          type="datetime-local"
          id="deadline"
          ref={deadlineInputRef}
          required
        />
      </div>
      <div className={classes.controls}>
        <label htmlFor="notes">Note (opțional):</label>
        <textarea rows="5" id="notes" ref={notesInputRef}></textarea>
      </div>
      <button className={classes.btn}>
        {props.isFetching ? 'Se încarcă...' : 'Înregistrează comanda'}
      </button>
    </form>
  );

  // return (
  //   <form className={classes.form} onSubmit={submitHandler}>
  //     <p className={classes.title}>Add new order</p>
  //     <div className={classes.controls}>
  //       <label htmlFor="client">Client:</label>
  //       <select
  //         id="client"
  //         ref={clientInputRef}
  //         onChange={(e) =>
  //           setRate(
  //             rates[rates.findIndex((client) => client.name === e.target.value)]
  //               .rate
  //           )
  //         }
  //         required
  //       >
  //         <option>select &darr;</option>
  //         {clientNames}
  //       </select>
  //     </div>
  //     <div className={`${classes.controls} ${classes.flex}`}>
  //       <div>
  //         <label htmlFor="pages">
  //           Estimated workload <br /> (in thousand chars + spaces):
  //         </label>
  //         <input
  //           type="number"
  //           id="pages"
  //           placeholder="e.g. 24000"
  //           ref={pagesInputRef}
  //           required
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="rate">Rate:</label>
  //         <input
  //           type="number"
  //           id="rate"
  //           value={rate}
  //           onChange={(e) => setRate(e.target.value)}
  //           required
  //         />
  //       </div>
  //     </div>
  //     <div className={classes.controls}>
  //       <label htmlFor="deadline">Deadline:</label>
  //       <input
  //         type="datetime-local"
  //         id="deadline"
  //         ref={deadlineInputRef}
  //         required
  //       />
  //     </div>
  //     <div className={classes.controls}>
  //       <label htmlFor="notes">Notes (optional):</label>
  //       <textarea rows="5" id="notes" ref={notesInputRef}></textarea>
  //     </div>
  //     <button className={classes.btn}>
  //       {props.isFetching ? 'Loading...' : 'Register order'}
  //     </button>
  //   </form>
  // );
};

export default Form;
