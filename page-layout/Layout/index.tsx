import React, { ReactNode } from 'react'
import { Header } from '../Header';

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="relative">
            <Header/>
            {children}
        </div>
    )
}