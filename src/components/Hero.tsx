
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Edit2, Camera } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export function Hero() {
  const roles = ["AI Architect", "AI Engineer", "Generative AI Developer", "Agentic AI Developer"];
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    setIsAdmin(localStorage.getItem('hanes_admin') === 'true');
    const savedPhoto = localStorage.getItem('hanes_profile_photo');
    if (savedPhoto) {
      setPhotoUrl(savedPhoto);
    } else {
      const avatar = PlaceHolderImages.find(img => img.id === 'avatar');
      if (avatar) setPhotoUrl(avatar.imageUrl);
    }
  }, []);

  useEffect(() => {
    const currentRole = roles[roleIdx];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIdx((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIdx]);

  const handleUpdatePhoto = () => {
    localStorage.setItem('hanes_profile_photo', photoUrl);
    setIsPhotoDialogOpen(false);
    window.location.reload();
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 md:px-12 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary/20 rounded-full blur-[80px] md:blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-secondary/20 rounded-full blur-[80px] md:blur-[120px] animate-pulse-slow" />
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left order-2 lg:order-1"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8 mx-auto lg:mx-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Hanes Portfolio Active
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-headline font-bold mb-8 leading-[1.1] tracking-tight">
            Empowering <br className="hidden sm:block" />
            Future <span className="text-gradient">With AI</span>
          </h1>
          
          <div className="min-h-[2.5rem] mb-8">
            <span className="text-lg md:text-3xl text-muted-foreground font-medium">
              I am <span className="text-foreground border-r-2 border-primary pr-2">{displayText}</span>
            </span>
          </div>

          <p className="text-base md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-12 leading-relaxed">
            Crafting the next generation of intelligent systems using MCP Protocol, Geospatial AI, and advanced technical architectures.
          </p>

          <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start">
            <Button size="lg" className="rounded-full px-8 md:px-10 h-14 gap-2 group shadow-xl shadow-primary/20 text-lg">
              Explore Work <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 md:px-10 h-14 glass hover:bg-white/5 transition-all text-lg">
              Get in Touch
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex justify-center lg:justify-end order-1 lg:order-2 mb-12 lg:mb-0"
        >
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-[420px] md:h-[420px]">
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-[spin_15s_linear_infinite]" />
            <div className="absolute inset-6 rounded-full border border-secondary/20 animate-[spin_20s_linear_infinite_reverse]" />
            <div className="absolute -inset-8 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl rounded-full opacity-30" />
            
            <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white/5 glass shadow-2xl group">
              {photoUrl && (
                <Image 
                  src={photoUrl} 
                  alt="Hanes Avatar"
                  fill
                  priority
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
              )}
              {isAdmin && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="secondary" size="sm" className="rounded-full gap-2" onClick={() => setIsPhotoDialogOpen(true)}>
                    <Camera className="w-4 h-4" /> Change Photo
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <Dialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen}>
        <DialogContent className="glass border-white/10 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Profile Photo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Photo URL</label>
              <Input 
                value={photoUrl} 
                onChange={(e) => setPhotoUrl(e.target.value)} 
                placeholder="https://images.unsplash.com/..." 
                className="bg-white/5"
              />
            </div>
            <p className="text-xs text-muted-foreground">Use a square image for best results.</p>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsPhotoDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdatePhoto}>Save Photo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
