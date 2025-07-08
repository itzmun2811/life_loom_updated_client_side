import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router";
import { router } from './router/router.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import 'flowbite';
import 'aos/dist/aos.css';
import Aos from 'aos';

Aos.init();



createRoot(document.getElementById('root')).render(
  <StrictMode>

    <AuthProvider>
  <div className='mx-auto max-w-7xl'>
        <RouterProvider router={router} />
  </div>
    </AuthProvider>
 </StrictMode>,
)
