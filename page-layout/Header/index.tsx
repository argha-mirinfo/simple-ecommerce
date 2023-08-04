import Link from "next/link"
import React from "react"
import { Section } from "../../components"
import styles from "./Header.module.scss"

export const Header = () => {
    return (
        <div className={styles.header}>
            <Section>
                <div className="flex items-center justify-center h-full">
                    <Link href="/">
                        <p className="text-lg">Home</p>
                    </Link>
                    <Link href="/cart">
                        <p className="text-lg" style={{ marginLeft: "30px" }}>Cart</p>
                    </Link>
                </div>
            </Section>
        </div>
    )
}