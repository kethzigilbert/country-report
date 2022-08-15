import { Box } from '@mui/material'
import Head from 'next/head'
import Countries from '../src/components/Country'


export default function Home() {
  return (
    <Box>
      <Head>
        <title>Countries Report</title>


        <meta name="viewport" content="width=device-width, initial-scale=1" />

      </Head>

      <main >
        <Countries />
      </main>


    </Box>
  )
}
