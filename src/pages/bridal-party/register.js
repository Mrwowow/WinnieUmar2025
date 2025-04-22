// src/pages/bridal-party/register.js
import { useState } from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import BridalPartyForm from '../../components/BridalPartyForm';

export default function BridalPartyRegistration() {
  const [activeSection] = useState('bridalParty');

  return (
    <>
      <Head>
        <title>Wedding Party Registration | Omar & Winnie&apos;s Wedding</title>
        <meta name="description" content="Register to be part of Omar & Winnie's wedding party" />
      </Head>

      <Layout setActiveSection={() => {}}>
        <div className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-teal-800 mb-4">Wedding Party Registration</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Thank you for being part of our special day! Please complete this form with your information
                so we can include you in our wedding program and coordinate all the details.
              </p>
            </div>
            
            <BridalPartyForm />
            
            <div className="mt-12 text-center">
              <p className="text-gray-600">
                If you have any questions, please contact our wedding coordinator at <a href="mailto:coordinator@winniumar.com" className="text-teal-700 underline">coordinator@winniumar.com</a>
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}