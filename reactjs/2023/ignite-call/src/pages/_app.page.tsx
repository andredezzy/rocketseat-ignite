import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'
import { globalStyles } from '@/styles/ignite-ui'

globalStyles()

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <Component {...pageProps} />
    </main>
  )
}
