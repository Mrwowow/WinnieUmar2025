import { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import HomeSection from '../components/sections/HomeSection';
import AboutHimSection from '../components/sections/AboutHimSection';
import AboutHerSection from '../components/sections/AboutHerSection';
import TraditionalWeddingSection from '../components/sections/TraditionalWeddingSection';
import ChurchWeddingSection from '../components/sections/ChurchWeddingSection';
import PreWeddingSection from '../components/sections/PreWeddingSection';
import GallerySection from '../components/sections/GallerySection';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <>
      <Head>
        <title>Winnie & Umar&apos;s Wedding</title>
        <meta name="description" content="Join us to celebrate our special day" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout setActiveSection={setActiveSection}>
        {activeSection === 'home' && <HomeSection />}
        {activeSection === 'aboutHim' && <AboutHimSection />}
        {activeSection === 'aboutHer' && <AboutHerSection />}
        {activeSection === 'traditional' && <TraditionalWeddingSection />}
        {activeSection === 'church' && <ChurchWeddingSection />}
        {activeSection === 'preWedding' && <PreWeddingSection />}
        {activeSection === 'gallery' && <GallerySection />}
      </Layout>
    </>
  );
}