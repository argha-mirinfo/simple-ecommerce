import Link from "next/link"
import React from "react"
import { Section } from "../../components"
import styles from "./Header.module.scss"

export const Header = () => {
    return (
        <div className={styles.header}>
            <Section>
                <Link href="/">
                    <p>Ecommerce</p>
                </Link>
                <Link href="/cart">
                    <p>cart</p>
                </Link>
            </Section>
        </div>
    )
}