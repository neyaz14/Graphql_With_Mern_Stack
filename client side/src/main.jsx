import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './Router/AppRoutes.jsx'
import AuthProvider from './Providers/AuthProviders.jsx'

import client from './apolloClient.js'
import { ApolloProvider } from '@apollo/client'


createRoot(document.getElementById('root')).render(




    <StrictMode>
        <ApolloProvider client={client}>

            <AuthProvider>
                <AppRoutes></AppRoutes>
            </AuthProvider>
        </ApolloProvider>
    </StrictMode>
    ,
)
