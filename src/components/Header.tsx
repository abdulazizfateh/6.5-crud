import React, { type Dispatch, type FormEvent, type SetStateAction } from 'react'

const Header = ({ searchValue, setSearchValue }: { searchValue: string, setSearchValue: Dispatch<SetStateAction<string>> }) => {
    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
    }

    return (
        <header className='site_header border-b border-gray-300'>
            <div className='container'>
                <nav className='header_nav h-[60px] md:h-[70px] flex items-center justify-center relative'>
                    <p className='text-lg'>CRUD with React Query</p>
                    <div className='search'>
                        <form onSubmit={handleSearch}>
                            <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className='absolute -translate-y-1/2 top-1/2 right-0 outline-none uppercase placeholder:capitalize px-2.5 h-9 w-60 border border-gray-400' type="search" placeholder='Search (name, surname)' />
                        </form>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default React.memo(Header);