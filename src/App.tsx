import React, { lazy, useState, type ReactNode } from 'react'
const Header = lazy(() => import("./components/Header"));
const Create = lazy(() => import("./components/Form"));
const Card = lazy(() => import("./components/Card"));
import type { IStudent } from './types';

const CustomSuspense = ({ children }: { children: ReactNode }) => {
  return <React.Suspense fallback={
    <div className="w-full h-dvh flex items-center justify-center">
      <div className='lds-spinner'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  }>{children}</React.Suspense>
}

const App = () => {
  const [update, setUpdate] = useState<IStudent | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <CustomSuspense>
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <Create update={update} setUpdate={setUpdate} />
      <Card update={update} setUpdate={setUpdate} searchValue={searchValue} />
    </CustomSuspense>
  )
}

export default React.memo(App);