import classes from './ClientItem.module.css';

const ClientItem = (props) => {
  const { name, rate } = props;
  return (
    <li className={classes.item}>
      <h3>{name}</h3>
      <p>{rate}</p>
    </li>
  );
};

export default ClientItem;
