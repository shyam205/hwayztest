import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import theme from './mui.theme.js'
import { GlobalStyles } from '@mui/material'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import images from './utilities/images.js'
import amplitude from 'amplitude-js';
//const apiKey = import.meta.env.VITE_AMPLITUD_API_KEY;
amplitude.getInstance().init(import.meta.env.VITE_AMPLITUD_API_KEY);
dayjs.extend(relativeTime)

const queryClient = new QueryClient()

Number.prototype.formatMoney = function(precision = 0) {
  return `${this.toLocaleString("en-IN", {
    maximumFractionDigits: precision,
    style: "currency",
    currency: "INR"
  })}`
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
        <GlobalStyles
          styles={theme => ({
            body: {
              // backgroundColor: theme.palette.primary.main,
              margin: 0,
              fontFamily: "Poppins !important",
              backgroundImage:`url(${images.HIGHWAY})`,
              position:'relative',
              '::after' :{
                content:'""',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex:-1,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.8)'
              }
            }
          })}
        />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
