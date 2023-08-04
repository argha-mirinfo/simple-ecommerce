import React, { ReactNode } from 'react'

interface SectionProps {
    children: ReactNode;
}

export const Section: React.FC<SectionProps> = ({ children }) => {
    return (
        <div className='max-w-7xl mx-auto px-5 py-5 xl:px-0 h-full'>
            {children}
        </div>
    )
}