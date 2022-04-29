import classes from './Modal.module.css';
import ReactDOM from 'react-dom';
import { Fragment } from 'react';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const Overlay = (props) => {
  return (
    <div className={classes.overlay}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const destination = document.getElementById('modal');

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, destination)}
      {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, destination)}
    </Fragment>
  );
};

export default Modal;
