import React, { useState } from 'react'
import Header from './components/Header';
import Create from './components/Form';
import Card from './components/Card';
import type { IStudent } from './types';

const App = () => {
  const [update, setUpdate] = useState<IStudent | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <>
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <Create update={update} setUpdate={setUpdate} />
      <Card update={update} setUpdate={setUpdate} searchValue={searchValue} />
    </>
  )
}

export default React.memo(App);