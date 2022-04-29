import { Fragment, useState, useRef } from 'react';
import Modal from '../layout/Modal';
import Button from '../layout/Button';
import classes from './UserProfile.module.css';

const UserProfile = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const langInputRef = useRef();
  const nameInputRef = useRef();
  const taxNumberInputRef = useRef();
  const regNumberInputRef = useRef();
  const regOfficeInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredLanguage = langInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredTaxNumber = taxNumberInputRef.current.value;
    const enteredRegNumber = regNumberInputRef.current.value;
    const enteredRegOffice = regOfficeInputRef.current.value;

    const updatedUserInfo = {
      language: enteredLanguage,
      name: enteredName,
      taxNumber: enteredTaxNumber,
      registrationNumber: enteredRegNumber,
      registeredOffice: enteredRegOffice,
    };
    fetch('/', {
      method: 'POST',
      body: JSON.stringify(updatedUserInfo),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  if (isEditing) {
    return (
      <Modal onClose={() => setIsEditing(false)}>
        <form onSubmit={submitHandler}>
          <div className={classes.personal}>
            <h3>Personal Preferences</h3>
            <label htmlFor="language">Language</label>
            <select id="language">
              <option value="RO">Romanian</option>
              <option value="EN">English</option>
            </select>
          </div>
          <div className={classes.business}>
            <h3>Business Info</h3>
            <div className={classes.businessData}>
              <div>
                <label htmlFor="name">Corporate Name</label>
                <input type="text" id="name" />
                <label htmlFor="regno">Registration Number</label>
                <input type="text" id="regno" />
              </div>
              <div>
                <label htmlFor="taxno">Tax Number</label>
                <input type="text" id="taxno" />
                <label htmlFor="regoff">Registered Office</label>
                <input type="text" id="regoff" />
              </div>
            </div>
          </div>
        </form>
      </Modal>
    );
  }

  return (
    <Fragment>
      <div>
        <h2>User profile page</h2>
        <Button onClick={() => setIsEditing(true)}>Edit</Button>
      </div>
      <div>
        <p>Company Name</p>
        <p>Registration number</p>
        <p>Tax number</p>
      </div>
    </Fragment>
  );
};

export default UserProfile;
