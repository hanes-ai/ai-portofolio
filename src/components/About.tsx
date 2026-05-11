
'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Cpu, Globe, Search, MessageSquare, Network, Layers } from 'lucide-react';

export function About() {
  const focusAreas = [
    { icon: <Brain />, title: 'LLM & Generative AI', desc: 'Expert in fine-tuning and deploying large language models like GPT-4, Llama, and Mistral.' },
    { icon: <Layers />, title: 'MCP (Model Context Protocol)', desc: 'Building interoperable AI tools and connectors using the Model Context Protocol.' },
    { icon: <Globe />, title: 'Geospatial Intelligence', desc: 'Analyzing and visualizing spatial data using advanced GIS and AI mapping techniques.' },
    { icon: <Search />, title: 'Advanced Scraping', desc: 'Developing robust data extraction pipelines for large-scale web crawling and automation.' },
    { icon: <Network />, title: 'Multi-Agent Systems', desc: 'Developing collaborative AI agent networks for complex problem solving.' },
    { icon: <Cpu />, title: 'AI Automation', desc: 'Building autonomous agents and workflows to streamline complex business processes.' },
  ];

  const stats = [
    { value: '2+', label: 'Years Experience' },
    { value: '10+', label: 'Projects Completed' },
    // { value: '15+', label: 'AI Models Built' },
  ];

  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Discovery</h2>
            <h3 className="text-4xl md:text-5xl font-headline font-bold mb-8">Architecting Intelligent Solutions for a Better Tomorrow</h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              With a deep passion for artificial intelligence, I bridge the gap between academic research and industry application. My work focuses on creating scalable, ethical, and highly efficient AI systems that empower businesses.
            </p>
            
            <div className="grid grid-cols-3 gap-8 mb-12">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-headline font-bold text-gradient">{stat.value}</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            {focusAreas.map((area, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="glass h-full hover:bg-white/5 transition-all border-white/5 spotlight-hover">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                      {area.icon}
                    </div>
                    <h4 className="font-headline font-bold text-lg mb-2">{area.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{area.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
