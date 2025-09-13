import React, { type Dispatch, type FormEvent, type SetStateAction } from 'react'
import { RiSearchLine } from "react-icons/ri";

const Header = ({ searchValue, setSearchValue }: { searchValue: string, setSearchValue: Dispatch<SetStateAction<string>> }) => {
    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
    }

    return (
        <header className='site_header border-b border-gray-300'>
            <div className='container'>
                <nav className='header_nav min-h-[60px] md:min-h-[70px] flex items-center justify-end'>
                    <div className='header_search w-full md:w-auto'>
                        <form onSubmit={handleSearch} className='w-full h-9 md:w-[430px] relative'>
                            <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className='w-full h-full outline-none uppercase text-sm placeholder:capitalize pl-11 px-2.5 border border-gray-400' type="search" placeholder='Search by name, address, birthdate, phone number' />
                            <RiSearchLine className="absolute -translate-y-1/2 top-1/2 left-3 text-xl" />
                        </form>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default React.memo(Header);