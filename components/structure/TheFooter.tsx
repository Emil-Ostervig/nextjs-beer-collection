import styles from '../../styles/modules/Footer.module.css';

const TheFooter = () => {
  return <footer className={styles['site-footer']}>
    <div className="container">
      <div className={styles['site-footer-content']}>
        <p>This is a footer</p>
      </div>
    </div>
  </footer>
}

export default TheFooter
