import Link from 'next/link'
import classes from './button.module.css'
const Button = (props) => {
  return props.link ? (
    <Link href={props.link} legacyBehavior>
      <a className={classes.btn}>{props.children}</a>
    </Link>
  ) : (
    <button onClick={props.onClick} className={classes.btn}>
      {props.children}
    </button>
  )
}

export default Button
