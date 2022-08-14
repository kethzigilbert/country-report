import { Box, Paper } from '@mui/material'
import Head from 'next/head'
import Countries from '../src/components/Country'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Countries Report</title>
        
      
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      </Head>

      <main >
        <Countries/>
      </main>
      <footer className={styles.footer}>     
      </footer>
   
    </>
  )
}
