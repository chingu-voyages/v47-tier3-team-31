import styles from './footer.module.css'

export default function Footer() {
    return(
        <div className={styles.footer}>
            <a>About us</a>
            <a>Chingu</a>
            <a>Team</a>
        </div>
    )
}