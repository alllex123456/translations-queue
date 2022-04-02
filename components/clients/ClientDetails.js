import classes from './ClientDetails.module.css';
import { useState } from 'react';

import Button from '../layout/Button';

const ClientDetails = (props) => {
  const { client } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(client.name);
  const [registeredOffice, setRegisteredOffice] = useState(
    client.registeredOffice
  );
  const [email, setEmail] = useState(client.email);
  const [phone, setPhone] = useState(client.phone);
  const [taxNumber, setTaxNumber] = useState(client.taxNumber);
  const [registrationNumber, setRegistrationNumber] = useState(
    client.registrationNumber
  );
  const [bank, setBank] = useState(client.bank);
  const [bankNumber, setBankNumber] = useState(client.bankNumber);
  const [notes, setNotes] = useState(client.notes);
  const [rate, setRate] = useState(client.rate);

  const editHandler = async () => {
    setIsEditing((previous) => !previous);
    if (isEditing) {
      const response = await fetch('/api/clients/edit-client', {
        method: 'POST',
        body: JSON.stringify({
          id: client.id,
          name,
          taxNumber,
          registrationNumber,
          registeredOffice,
          email,
          phone,
          bankNumber,
          bank,
          rate,
          notes,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      console.log(data.message);
    }
  };
  const removeHandler = () => {
    if (isEditing) {
      setIsEditing(false);
    }
  };

  return (
    <ul className={classes.list}>
      <li className={classes.item}>
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <h3>{name}</h3>
        )}
        <p>
          <strong>Contact information:</strong>
        </p>
        <div className="flex">
          <p>
            <strong>Email: </strong>
            {isEditing ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <a href={`mailto:${email}`}>{email}</a>
            )}
          </p>
          <p>
            <strong>Phone: </strong>
            {isEditing ? (
              <input
                type="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            ) : (
              `${phone}`
            )}
          </p>
        </div>
      </li>
      <li className={classes.item}>
        <p>
          <strong>Registered office:</strong>
          {isEditing ? (
            <input
              type="text"
              value={registeredOffice}
              onChange={(e) => setRegisteredOffice(e.target.value)}
            />
          ) : (
            `${registeredOffice}`
          )}
        </p>
        <p>
          <strong>Tax number:</strong>
          {isEditing ? (
            <input
              type="text"
              value={taxNumber}
              onChange={(e) => setTaxNumber(e.target.value)}
            />
          ) : (
            `${taxNumber}`
          )}
        </p>
        <p>
          <strong>Company registration number: </strong>
          {isEditing ? (
            <input
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
            />
          ) : (
            `${registrationNumber}`
          )}
        </p>
      </li>
      <li className={classes.item}>
        <p>
          <strong>Bank data:</strong>
        </p>
        <p>
          <strong>IBAN:</strong>
          {isEditing ? (
            <input
              type="text"
              value={bankNumber}
              onChange={(e) => setBankNumber(e.target.value)}
            />
          ) : (
            `${bankNumber}`
          )}
        </p>
        <p>
          <strong>Bank:</strong>{' '}
          {isEditing ? (
            <input
              type="text"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
            />
          ) : (
            `${bank}`
          )}
        </p>
      </li>
      <li className={classes.item}>
        <p>
          <strong>Negotiated rate:</strong>{' '}
          {isEditing ? (
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          ) : (
            `${rate}`
          )}
        </p>
        <p>
          <strong>Notes:</strong>{' '}
          {isEditing ? (
            <textarea
              rows="5"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          ) : (
            `${notes}`
          )}
        </p>
      </li>
      <p className={classes.actions}>Options</p>
      <Button className={classes.btn} onClick={editHandler}>
        {isEditing ? 'Save' : 'Edit'}
      </Button>
      <Button className={classes.btn} onClick={removeHandler}>
        {isEditing ? 'Cancel' : 'Remove'}
      </Button>
    </ul>
  );
};

export default ClientDetails;
