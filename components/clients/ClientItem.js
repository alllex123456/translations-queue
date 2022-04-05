import classes from './ClientItem.module.css';
import Button from '../layout/Button';

import { useRouter } from 'next/router';

const ClientItem = (props) => {
  const router = useRouter();

  const {
    id,
    name,
    rate,
    phone,
    email,
    registeredOffice,
    registrationNumber,
    taxNumber,
    bank,
    bankNumber,
    notes,
  } = props.clientData;

  const emailHref = <a href={`mailto:${email}`}>{email}</a>;

  const clientPageHandler = () => {
    router.push(`/clients/${id}`);
  };

  return (
    <li className={classes.item}>
      <div className={classes.name}>
        <h3>
          Name: <strong>{name}</strong>
        </h3>
      </div>
      <div className={classes.group}>
        <p>Rate: {rate}</p>
        <p>Phone: {phone}</p>
      </div>
      <div className={classes.group}>
        <p>Email: {emailHref}</p>
        <p>Notes: {notes}</p>
      </div>
      <Button onClick={clientPageHandler} className={classes.actions}>
        View client sheet
      </Button>
      <Button href={`/clients/${id}/statement`} className={classes.actions}>
        View client statement
      </Button>
    </li>
  );
};

export default ClientItem;
