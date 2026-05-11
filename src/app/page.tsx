
'use client';

import { Hero } from '@/components/Hero';
import { Navigation } from '@/components/Navigation';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { AIPlayground } from '@/components/AIPlayground';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { ThreeBackground } from '@/components/ThreeBackground';
import { Toaster } from '@/components/ui/toaster';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative">
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
          >
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-primary font-headline font-bold tracking-widest uppercase text-sm"
            >
              Initializing Hanes Folio...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ThreeBackground />
      <Navigation />
      
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <AIPlayground />
        <Experience />
        <Contact />
        <Footer />
      </div>

      <Toaster />
    </main>
  );
}
