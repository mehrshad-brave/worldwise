import styles from './Button.module.css';


function Button({ children, dis, onClick, type }) {
  console.log(dis, "dddddiiiiiiSsSssSss")
  return <button onClick={onClick} disabled={dis} className={`${styles.btn} ${styles[type]}`}>{children}</button>
}

export default Button;
