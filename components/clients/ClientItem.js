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
          Numele: <strong>{name}</strong>
        </h3>
      </div>
      <div className={classes.group}>
        <p>Tarif: {rate}</p>
        <p>Telefon: {phone}</p>
      </div>
      <div className={classes.group}>
        <p>Email: {emailHref}</p>
        <p>Note: {notes}</p>
      </div>
      <Button onClick={clientPageHandler} className={classes.actions}>
        Vezi fișa clientului
      </Button>
      <Button href={`/clients/${id}/statement`} className={classes.actions}>
        Vezi situația clientului
      </Button>
    </li>
  );
};

export default ClientItem;
