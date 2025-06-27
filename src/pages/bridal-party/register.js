// src/pages/bridal-party/register.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../../components/Layout';
import BridalPartyForm from '../../components/BridalPartyForm';

export default function BridalPartyRegistration() {
  const router = useRouter();
  const [activeSection] = useState('bridalParty');

  const handleNavigation = (section) => {
    // Navigate back to the main page with the selected section
    router.push(`/?section=${section}`);
  };

  return (
    <>
      <Head>
        <title>WinnieOmar2025 | Groom Men & Bridal Trail</title>
        <meta name="description" content="Register to be part of Omar & Winnie's wedding party" />
      </Head>

      <Layout setActiveSection={handleNavigation}>
        <div className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-teal-800 mb-4">WinnieOmar2025</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Thank you for being part of our special day! Please complete this form with your information
                so we can include you in our wedding program and coordinate all the details.
              </p>
            </div>
            
            <BridalPartyForm />
            
            <div className="mt-12 text-center">
              <p className="text-gray-600">
                If you have any questions, please contact our wedding coordinator at <a href="mailto:coordinator@winniOmar.com" className="text-teal-700 underline">coordinator@winniOmar.com</a>
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}