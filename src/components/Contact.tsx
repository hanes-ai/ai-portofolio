
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Connection</h2>
            <h3 className="text-5xl font-headline font-bold mb-8">Let&apos;s Build Something <span className="text-gradient">Extraordinary</span></h3>
            <p className="text-lg text-muted-foreground mb-12 max-w-md">
              Whether you have a complex problem to solve or just want to chat about the future of AI, my door is always open.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Email</div>
                  <div className="text-xl font-medium">yohanesegipratama26@gmail.com</div>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Linkedin</div>
                  <div className="text-xl font-medium">/in/yohanesegipratamayudoutomo</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:text-primary transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-3xl border-white/5"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium ml-1">Name</label>
                  <Input placeholder="Your Name" className="bg-white/5 border-white/10 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium ml-1">Email</label>
                  <Input type="email" placeholder="john@example.com" className="bg-white/5 border-white/10 rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium ml-1">Subject</label>
                <Input placeholder="AI Project Collaboration" className="bg-white/5 border-white/10 rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium ml-1">Message</label>
                <Textarea placeholder="Tell me about your vision..." className="min-h-[150px] bg-white/5 border-white/10 rounded-xl" />
              </div>
              <Button size="lg" className="w-full rounded-xl shadow-lg shadow-primary/20">
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
