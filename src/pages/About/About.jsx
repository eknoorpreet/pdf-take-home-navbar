import styles from './About.module.css';

export default function About({ theme }) {
  return <div className={styles[theme]}>About Page</div>;
}
