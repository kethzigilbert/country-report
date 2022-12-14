import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import Layout from '../src/components/Layouts/layout';
import { ThemeContext } from '../src/components/theme/theme';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useState, useMemo } from 'react';
import {  Box,  ScopedCssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import Head from 'next/head';



function MyApp({ Component, pageProps }) {
  const [mode, setMode] = useState('light');
  const [queryClient] = React.useState(() => new QueryClient());
  const colorMode = useMemo(
    () => ({
      toggleTheme: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );


  const themeLight = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: "#ffffff"
      },
      primary: {
        main: '#191b1c',

      },
    },
      overrides: {
        MuiButton: {
         
            root: {
            textTransform: 'none'
            }
          
          }
         
        },
      
      
    });

  const themeDark = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: "#ffffff",
        dark: "#ffffff"
      },
      info :{
        main: "#01579b"
      },
      background: {
        default: "#212c36",
        paper: "#2c3743"
      },
      text: {
        primary: "#ffffff"
      },
      },
      
      overrides: {
        MuiButton: {
         
        
          
          }
         
        },
    
  });
  return <>
  <Head>
  <title>Countries Report</title>


  <meta name="viewport" content="width=device-width, initial-scale=1" />

</Head>

<main >
  <ThemeContext.Provider value={colorMode}>
    <ThemeProvider theme={mode === 'light' ? themeLight : themeDark}>
      <ScopedCssBaseline sx={{ height : 'inherit' ,backgroundColor: 'background.default' }}>
      <Box sx={{ boxShadow: "none", border: "none", backgroundColor: 'background.default' }} >


        <Layout>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </Layout>
       
      </Box>
      </ScopedCssBaseline>
    </ThemeProvider>
  </ThemeContext.Provider>
</main>
</>
}

export default MyApp
