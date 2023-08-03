import React, { ReactNode } from 'react'

interface SectionProps {
    children: ReactNode;
}

export const Section: React.FC<SectionProps> = ({ children }) => {
    return (
        <div className='max-w-7xl mx-auto'>
            {children}
        </div>
    )
}