import React, { ReactNode } from 'react'
import { Header } from '../Header';
import styles from "./Layout.module.scss"

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="relative">
            <Header/>
            <div className={styles.container}>
                {children}
            </div>
        </div>
    )
}