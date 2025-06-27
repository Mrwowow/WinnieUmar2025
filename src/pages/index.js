import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../components/Layout';
import HomeSection from '../components/sections/HomeSection';
import OurStorySection from '../components/sections/OurStorySection';
import WeddingProgrammeSection from '../components/sections/WeddingProgrammeSection';
import BridalPartySection from '../components/sections/BridalPartySection';
import TraditionalWeddingSection from '../components/sections/TraditionalWeddingSection';
import ChurchWeddingSection from '../components/sections/ChurchWeddingSection';
import PreWeddingSection from '../components/sections/PreWeddingSection';
import GallerySection from '../components/sections/GallerySection';

export default function Home() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('home');

  // Handle URL parameters for navigation from other pages
  useEffect(() => {
    if (router.query.section) {
      setActiveSection(router.query.section);
      // Clean up the URL after setting the section
      router.replace('/', undefined, { shallow: true });
    }
  }, [router.query.section, router]);

  return (
    <>
      <Head>
        <title>Winnie & Omar&apos;s Wedding</title>
        <meta name="description" content="Join us to celebrate our special day" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout setActiveSection={setActiveSection}>
        {activeSection === 'home' && <HomeSection setActiveSection={setActiveSection} />}
        {activeSection === 'ourStory' && <OurStorySection />}
        {activeSection === 'programme' && <WeddingProgrammeSection />}
        {activeSection === 'bridalParty' && <BridalPartySection />}
        {activeSection === 'traditional' && <TraditionalWeddingSection />}
        {activeSection === 'church' && <ChurchWeddingSection />}
        {activeSection === 'preWedding' && <PreWeddingSection />}
        {activeSection === 'gallery' && <GallerySection />}
      </Layout>
    </>
  );
}