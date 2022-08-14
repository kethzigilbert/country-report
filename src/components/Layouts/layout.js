import Header from './header'

import React,{ useEffect, useState, useContext } from 'react';
import { Box, Paper } from '@mui/material';

export default function Layout({ children }) {
  
  return (
    <>
   
      <Header  />
      
      {children}
   
      </>
  )
}