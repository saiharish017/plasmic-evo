// pages/_app.js
"use client";

import { PlasmicRootProvider } from '@plasmicapp/loader-nextjs';
import { useRouter } from 'next/router';
import { PLASMIC } from '../plasmic-init';
import LanguageSwitcher from '../components/LanguageSwitcher';
import '../styles/globals.css';
import ContactForm from "../components/ContactForm.tsx"

export default function CustomApp({ Component, pageProps }) {
  const { locale } = useRouter();

  return (
    <PlasmicRootProvider
      loader={PLASMIC}
      prefetchedData={pageProps.plasmicData}
      globalVariants={[{ name: 'Locale', value: locale }]}
      
    >
      <Component {...pageProps} />
      <LanguageSwitcher style={{ position: 'fixed', bottom: "10px", right: "25px"}}/>

      
    
    </PlasmicRootProvider>
  );
}

