"use client";
import Image from "next/image";
import styles from "./styles.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Image alt="logo" width={198} height={122} src="/images/Logo.png"></Image>
      <ul>
        <li>Disclaimer</li>
        <li>Blog</li>
        <li>Careers</li>
        <li>Privacy Policy</li>
        <li>Terms & Condition</li>
        <li>Twitter</li>
      </ul>
    </footer>
  );
}
