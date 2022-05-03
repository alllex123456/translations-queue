import Link from 'next/link';
import classes from './Button.module.css';

const Button = (props) => {
  if (props.href) {
    return (
      <Link href={props.href}>
        <a
          className={`${classes.button} ${props.className}`}
          target={props.target}
        >
          {props.children}
        </a>
      </Link>
    );
  } else {
    return (
      <button
        className={`${classes.button} ${props.className}`}
        type={props.type}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    );
  }
};

export default Button;
