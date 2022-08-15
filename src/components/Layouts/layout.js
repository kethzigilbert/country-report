import Header from './header'

import React from 'react';


export default function Layout({ children }) {

  return (
    <>

      <Header />

      {children}

    </>
  )
}