import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'

import { client } from './lib/apollo'
import App from './App'

import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)
