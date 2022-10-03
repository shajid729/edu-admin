import Layout from '../components/Layout'
import Nav from '../components/Nav'
import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SessionProvider session={pageProps.session} refetchInterval={1000}>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={12}
          containerStyle={{position:'sticky'}}
        />
        <NextNProgress
          color="#7659ff"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          spinner={false}
          showOnShallow={false}
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  )
}

export default MyApp
