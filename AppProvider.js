import React from 'react';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';

import App from './App';
import config from './src/Auth/authConfig';

const pca = new PublicClientApplication(config);

// Component
export default function AppProvider() {
  <MsalProvider
    instance={pca}
    config={config}
    webviewProps={{ sharedCookiesEnabled: true }}
  >
    <App />
  </MsalProvider>;
}
