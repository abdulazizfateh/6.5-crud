import React from 'react'

const Header = () => {
    return (
        <header className='site_header border-b border-gray-400'>
            <div className='container'>
                <nav className='header_nav h-[60px] md:h-[70px] flex items-center justify-center'>
                    <p className='text-lg'>CRUD with React Query</p>
                </nav>
            </div>
        </header>
    )
}

export default React.memo(Header);