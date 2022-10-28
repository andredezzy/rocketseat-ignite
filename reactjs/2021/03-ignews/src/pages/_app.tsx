import { PrismicPreview } from '@prismicio/next'
import { PrismicProvider } from '@prismicio/react'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import Link from 'next/link'

import { Header } from '../components/Header'
import { repositoryName } from '../services/prismic'

import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={(pageProps as any).session}>
      <Header />
      
      <PrismicProvider
        internalLinkComponent={({ href, ...props }) => (
          <Link href={href}>
            <a {...props} />
          </Link>
        )}
      >
        <PrismicPreview repositoryName={repositoryName}>
          <Component {...pageProps} />
        </PrismicPreview>
      </PrismicProvider>
    </SessionProvider>
  )
}

export default MyApp
