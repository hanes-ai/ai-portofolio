
'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Cpu, Menu, X, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    setIsAdmin(typeof window !== 'undefined' && localStorage.getItem('hanes_admin') === 'true');
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('hanes_admin');
    window.location.reload();
  };

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Playground', href: '#playground' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-4 md:px-12",
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border py-3" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <Link href="/">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 group cursor-pointer shrink-0"
            >
              <div className="p-1.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Cpu className="w-5 h-5 text-primary" />
              </div>
              <span className="text-lg md:text-xl font-headline font-bold tracking-tight whitespace-nowrap">Hanes Folio</span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <div className="flex items-center gap-4 xl:gap-6">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              {isAdmin ? (
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-xs text-muted-foreground flex items-center gap-2">
                  <LogOut className="w-3 h-3" /> Logout
                </Button>
              ) : (
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                    Admin
                  </Button>
                </Link>
              )}
              <Button asChild size="sm" className="rounded-full px-6 shadow-[0_0_20px_rgba(51,136,255,0.3)]">
                <a href="#contact">Hire Me</a>
              </Button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden p-2 text-foreground focus:outline-none z-50" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden fixed inset-0 top-[72px] bg-background/95 backdrop-blur-xl border-t border-border overflow-y-auto z-40"
            >
              <div className="flex flex-col p-6 gap-1 max-h-[calc(100vh-72px)] overflow-y-auto">
                {navItems.map((item) => (
                  <a 
                    key={item.name} 
                    href={item.href} 
                    onClick={() => setIsOpen(false)}
                    className="text-base font-medium hover:text-primary py-2.5 border-b border-white/5 transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
                <div className="pt-4 flex flex-col gap-2">
                  {isAdmin ? (
                    <Button variant="outline" onClick={handleLogout} className="w-full justify-start gap-2 h-10 text-sm">
                      <LogOut className="w-4 h-4" /> Logout Admin
                    </Button>
                  ) : (
                    <Link href="/login" className="w-full" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full justify-start gap-2 h-10 text-sm">
                        <User className="w-4 h-4" /> Admin Login
                      </Button>
                    </Link>
                  )}
                  <Button asChild className="w-full rounded-xl py-5 text-base">
                    <a href="#contact" onClick={() => setIsOpen(false)}>Hire Me</a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
