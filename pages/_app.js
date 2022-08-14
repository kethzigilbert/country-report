import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import Layout from '../src/components/Layouts/layout';
import {ThemeContext} from '../src/components/theme/theme';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React,{ useState,useMemo } from 'react';
import {  CssBaseline, GlobalStyles, ScopedCssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";

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
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );


  return     <ThemeContext.Provider value={colorMode}>
  <ThemeProvider theme={theme}>
  <ScopedCssBaseline> 
  
   
<Layout>
   <QueryClientProvider client={queryClient}> 
   <Component {...pageProps} />
   </QueryClientProvider>
</Layout>

</ScopedCssBaseline>
  </ThemeProvider> 
  </ThemeContext.Provider>
  
}

export default MyApp
