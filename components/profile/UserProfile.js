import { Fragment, useState, useEffect } from 'react';
import Modal from '../layout/Modal';
import Button from '../layout/Button';
import classes from './UserProfile.module.css';

const UserProfile = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const [enteredLanguage, setEnteredLanguage] = useState();
  const [enteredName, setEnteredName] = useState();
  const [enteredTaxNumber, setEnteredTaxNumber] = useState();
  const [enteredRegNumber, setEnteredRegNumber] = useState();
  const [enteredRegOffice, setEnteredRegOffice] = useState();
  const [enteredEmail, setEnteredEmail] = useState();
  const [enteredPhone, setEnteredPhone] = useState();

  useEffect(() => {
    fetch('/api/user/get-user')
      .then((res) => res.json())
      .then((data) => {
        setEnteredLanguage(data.message.language);
        setEnteredName(data.message.name);
        setEnteredTaxNumber(data.message.taxNumber);
        setEnteredRegNumber(data.message.registrationNumber);
        setEnteredRegOffice(data.message.registeredOffice);
        setEnteredEmail(data.message.email);
        setEnteredPhone(data.message.phone);
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    const updatedUserInfo = {
      language: enteredLanguage,
      name: enteredName,
      taxNumber: enteredTaxNumber,
      registrationNumber: enteredRegNumber,
      registeredOffice: enteredRegOffice,
      email: enteredEmail,
      phone: enteredPhone,
    };

    fetch('/api/user/edit-user', {
      method: 'POST',
      body: JSON.stringify(updatedUserInfo),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.json());
        return res.json();
      })
      .then((data) => {
        setIsEditing(false);
        alert(`${data.message} actualizat cu succes`);
      })
      .catch((error) => alert(error.message));
  };

  if (isEditing) {
    return (
      <Modal onClose={() => setIsEditing(false)}>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.personal}>
            <h3>Preferințe personale</h3>
            <label htmlFor="language">Limbă</label>
            <select
              id="language"
              value={enteredLanguage}
              onChange={(e) => setEnteredLanguage(e.target.value)}
            >
              <option value="RO">Română</option>
              <option value="EN">Engleză</option>
            </select>
          </div>
          <div className={classes.business}>
            <h3>Informații juridice</h3>
            <div className={classes.businessData}>
              <div className={classes.formGroup}>
                <label htmlFor="name">Denumire firmă</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={enteredName}
                  onChange={(e) => setEnteredName(e.target.value)}
                />
                <label htmlFor="regno">Număr de înregistrare</label>
                <input
                  type="text"
                  id="regno"
                  value={enteredRegNumber}
                  onChange={(e) => setEnteredRegNumber(e.target.value)}
                />
              </div>
              <div className={classes.formGroup}>
                <label htmlFor="taxno">Cod fiscal</label>
                <input
                  type="text"
                  id="taxno"
                  required
                  value={enteredTaxNumber}
                  onChange={(e) => setEnteredTaxNumber(e.target.value)}
                />
                <label htmlFor="regoff">Sediul</label>
                <input
                  type="text"
                  id="regoff"
                  required
                  value={enteredRegOffice}
                  onChange={(e) => setEnteredRegOffice(e.target.value)}
                />
              </div>
              <div className={classes.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={enteredEmail}
                  onChange={(e) => setEnteredEmail(e.target.value)}
                />
                <label htmlFor="phone">Telefon</label>
                <input
                  type="phone"
                  id="phone"
                  value={enteredPhone}
                  onChange={(e) => setEnteredPhone(e.target.value)}
                />
              </div>
            </div>
            <div className={classes.actions}>
              <Button type="submit">Salvează</Button>
              <Button type="button" onClick={() => setIsEditing(false)}>
                Anulează
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    );
  }

  return (
    <Fragment>
      <div className={classes.userHead}>
        <h2>Profil utilizator curent</h2>
        <Button onClick={() => setIsEditing(true)}>Editează</Button>
      </div>
      <div className={classes.userInfo}>
        <p>
          Limba selectată: <strong>{enteredLanguage}</strong>
        </p>
        <p>
          Denumire firmă: <strong>{enteredName}</strong>
        </p>
        <p>
          Număr de înregistrare: <strong>{enteredRegNumber}</strong>
        </p>
        <p>
          Cod fiscal: <strong>{enteredTaxNumber}</strong>
        </p>
        <p>
          Sediul: <strong>{enteredRegOffice}</strong>
        </p>
        <p>
          Email: <strong>{enteredEmail}</strong>
        </p>
        <p>
          Telefon: <strong>{enteredPhone}</strong>
        </p>
      </div>
    </Fragment>
  );
};

export default UserProfile;
