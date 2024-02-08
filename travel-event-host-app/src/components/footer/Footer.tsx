import styles from './footer.module.css'
import Link from 'next/link'

export default function Footer() {
    return(
        <div className={styles.footer}>
            <Link href="/about">About us</Link>
            <a href="https://chingu.io/">Chingu</a>
            <Link href="/team">Team</Link>
        </div>
    )
}