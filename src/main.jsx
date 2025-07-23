import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router";
import { router } from './router/router.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import 'flowbite';
import 'aos/dist/aos.css';
import Aos from 'aos';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';

Aos.init();

const queryClient =new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
   <QueryClientProvider client={queryClient}>
      <AuthProvider>
  <div className='mx-auto max-w-6xl'>
        <RouterProvider router={router} />
  </div>
    </AuthProvider>
   </QueryClientProvider>
   </HelmetProvider>
    
 </StrictMode>,
)
