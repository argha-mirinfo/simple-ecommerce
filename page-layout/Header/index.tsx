import React from "react"
import { Section } from "../../components"
import styles from "./Header.module.scss"

export const Header = () => {
    return(
        <div className={styles.header}>
            <Section>
                <p>Ecommerce</p>
            </Section>
        </div>
    )
}