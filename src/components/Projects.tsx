
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ExternalLink, Github, Plus, Trash2, Edit2, ImagePlus } from 'lucide-react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

const DEFAULT_PROJECTS = [
  {
    id: '1',
    title: 'AIverse Chat',
    category: 'Generative AI',
    desc: 'A production-grade conversational AI platform inspired by ChatGPT, featuring real-time streaming responses, RAG-powered knowledge retrieval, and persistent chat history. Users can design and deploy their own custom AI Agents through an intuitive form-based builder — defining personalities, tools, and knowledge sources — and create their own MCP (Model Context Protocol) servers to extend the agents with custom integrations, APIs, and data sources. The platform supports multi-agent orchestration, tool/function calling, and seamless context switching between user-built agents.',
    img: '/img/aiverse-chat.png',
    tags: ['RAG', 'MCP', 'OpenAI'],
    github: '',
    link: ''
  },
  {
    id: '2',
    title: 'Profil Desa',
    category: 'Geospatial',
    desc: 'An AI System for comprehensive regional profiling across 83,000+ villages in Indonesia. The platform aggregates and normalizes village-level data (demographics, economy, infrastructure, natural resources) into a hierarchical knowledge graph powered by Neo4j — modeling relationships between desa, kecamatan, and kabupaten. Users can run graph queries to traverse nodes, compare potential between villages, discover similarity patterns, and generate ranked insights for development planning, investment prioritization, and policy decisions. Backed by automated scraping pipelines, entity resolution, and AI-driven enrichment for continuous data freshness.',
    img: 'https://picsum.photos/seed/desa-indonesia/800/600',
    tags: ['Neo4j', 'Knowledge Graph', 'Python', 'AI Agents'],
    github: '',
    link: ''
  }
];

export function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [filter, setFilter] = useState('All');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Generative AI',
    desc: '',
    tags: '',
    github: '',
    link: '',
    img: ''
  });

  const categories = ['All', 'Agentic AI', 'Geospatial', 'Scraping', 'Multimodal'];

  useEffect(() => {
    const stored = localStorage.getItem('hanes_projects');
    if (stored) {
      setProjects(JSON.parse(stored));
    } else {
      setProjects(DEFAULT_PROJECTS);
      localStorage.setItem('hanes_projects', JSON.stringify(DEFAULT_PROJECTS));
    }
    setIsAdmin(localStorage.getItem('hanes_admin') === 'true');
  }, []);

  const saveProjects = (newProjects: any[]) => {
    setProjects(newProjects);
    localStorage.setItem('hanes_projects', JSON.stringify(newProjects));
  };

  const handleOpenDialog = (project: any = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        category: project.category,
        desc: project.desc,
        tags: project.tags.join(', '),
        github: project.github || '',
        link: project.link || '',
        img: project.img || ''
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        category: 'Generative AI',
        desc: '',
        tags: '',
        github: '',
        link: '',
        img: ''
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const projectData = {
      ...formData,
      id: editingProject ? editingProject.id : Date.now().toString(),
      img: formData.img || `https://picsum.photos/seed/${Date.now()}/800/600`,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
    };

    if (editingProject) {
      saveProjects(projects.map(p => p.id === editingProject.id ? projectData : p));
    } else {
      saveProjects([...projects, projectData]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      saveProjects(projects.filter(p => p.id !== id));
    }
  };

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 md:mb-16">
          <div>
            <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Portfolio</h2>
            <h3 className="text-4xl font-headline font-bold">Featured Projects</h3>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat ? 'bg-primary text-white' : 'glass hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
            {isAdmin && (
              <Button onClick={() => handleOpenDialog()} variant="outline" className="rounded-full gap-2 border-primary text-primary">
                <Plus className="w-4 h-4" /> Add Project
              </Button>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="glass overflow-hidden border-white/5 group h-full flex flex-col relative">
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    {project.img && (
                      <Image 
                        src={project.img} 
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <Badge className="absolute top-4 right-4 bg-primary/80 backdrop-blur-md">{project.category}</Badge>
                    
                    {isAdmin && (
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Button size="icon" variant="destructive" className="rounded-full w-8 h-8" onClick={() => handleDelete(project.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="secondary" className="rounded-full w-8 h-8" onClick={() => handleOpenDialog(project)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl font-headline group-hover:text-primary transition-colors">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground mb-4">{project.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags?.map((tag: string) => (
                        <Badge key={tag} variant="outline" className="text-[10px] uppercase tracking-wider">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="gap-3 pt-0">
                    {project.github ? (
                      <Button variant="outline" size="sm" className="rounded-full gap-2 glass" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer"><Github className="w-4 h-4" /> Code</a>
                      </Button>
                    ) : (
                      <Badge variant="outline" className="rounded-full text-xs px-3 py-1 border-white/10 text-muted-foreground gap-1.5">
                        <Github className="w-3 h-3" /> Private
                      </Badge>
                    )}
                    {project.link && (
                      <Button size="sm" className="rounded-full gap-2" asChild>
                        <a href={project.link} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-4 h-4" /> Live Demo</a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="glass border-white/10 sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Project Name" className="bg-white/5" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select 
                  className="w-full h-10 px-3 rounded-md border border-input bg-background/5 text-sm outline-none focus:ring-2 focus:ring-ring text-foreground"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  {categories.filter(c => c !== 'All').map(c => <option key={c} value={c} className="bg-background">{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tags (comma separated)</label>
                <Input value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} placeholder="React, AI, Python" className="bg-white/5" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <ImagePlus className="w-4 h-4" /> Image URL
              </label>
              <Input value={formData.img} onChange={e => setFormData({...formData, img: e.target.value})} placeholder="https://picsum.photos/..." className="bg-white/5" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} placeholder="Brief description..." className="bg-white/5" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">GitHub Link</label>
                <Input value={formData.github} onChange={e => setFormData({...formData, github: e.target.value})} placeholder="https://..." className="bg-white/5" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Live Link</label>
                <Input value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} placeholder="https://..." className="bg-white/5" />
              </div>
            </div>
            <DialogFooter className="pt-4 flex flex-col sm:flex-row gap-2">
              <Button type="button" variant="ghost" className="sm:flex-1" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" className="sm:flex-1">{editingProject ? 'Update' : 'Create'} Project</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
