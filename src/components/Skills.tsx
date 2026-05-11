
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Brain, Globe, Cloud, Plus, Trash2, Edit2, Terminal, Layers } from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Brain: <Brain className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  Cloud: <Cloud className="w-5 h-5" />,
  Terminal: <Terminal className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
};

const DEFAULT_SKILLS = [
  {
    id: '1',
    title: "AI & Generative AI",
    iconName: 'Brain',
    skills: ["RAG", "CAG", "MCP Protocol", "Graph Query", "Semantic Search", "LLMs", "LangChain", "Genkit"]
  },
  {
    id: '2',
    title: "Geospatial & Scraping",
    iconName: 'Globe',
    skills: ["PostGIS", "GeoPandas", "QGIS", "Puppeteer", "Playwright", "Web Automation", "BeautifulSoup"]
  },
  {
    id: '3',
    title: "Infrastructure & Data",
    iconName: 'Cloud',
    skills: ["Vector DBs", "Graph Databases", "Docker", "Kubernetes", "AWS/GCP", "CI/CD", "Terraform"]
  }
];

export function Skills() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    iconName: 'Brain',
    skills: ''
  });

  useEffect(() => {
    const stored = localStorage.getItem('hanes_skills');
    if (stored) {
      setCategories(JSON.parse(stored));
    } else {
      setCategories(DEFAULT_SKILLS);
      localStorage.setItem('hanes_skills', JSON.stringify(DEFAULT_SKILLS));
    }
    setIsAdmin(localStorage.getItem('hanes_admin') === 'true');
  }, []);

  const saveSkills = (newSkills: any[]) => {
    setCategories(newSkills);
    localStorage.setItem('hanes_skills', JSON.stringify(newSkills));
  };

  const handleOpenDialog = (cat: any = null) => {
    if (cat) {
      setEditingCategory(cat);
      setFormData({
        title: cat.title,
        iconName: cat.iconName,
        skills: cat.skills.join(', ')
      });
    } else {
      setEditingCategory(null);
      setFormData({
        title: '',
        iconName: 'Brain',
        skills: ''
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const catData = {
      ...formData,
      id: editingCategory ? editingCategory.id : Date.now().toString(),
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s)
    };

    if (editingCategory) {
      saveSkills(categories.map(c => c.id === editingCategory.id ? catData : c));
    } else {
      saveSkills([...categories, catData]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this skill category?')) {
      saveSkills(categories.filter(c => c.id !== id));
    }
  };

  return (
    <section id="skills" className="py-24 px-6 bg-muted/30 relative">
      <div className="grid-background absolute inset-0 opacity-10" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Expertise</h2>
          <h3 className="text-4xl font-headline font-bold mb-6">Tech Stack & Proficiency</h3>
          {isAdmin && (
            <Button onClick={() => handleOpenDialog()} variant="outline" className="rounded-full gap-2 border-primary text-primary mx-auto">
              <Plus className="w-4 h-4" /> Add Category
            </Button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative group"
              >
                <div className="glass p-8 rounded-2xl border-white/5 h-full spotlight-hover">
                  {isAdmin && (
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                      <Button size="icon" variant="ghost" className="w-8 h-8 hover:text-primary" onClick={() => handleOpenDialog(cat)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="w-8 h-8 hover:text-destructive" onClick={() => handleDelete(cat.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {ICON_MAP[cat.iconName] || <Brain className="w-5 h-5" />}
                    </div>
                    <h4 className="text-xl font-headline font-bold">
                      {cat.title}
                    </h4>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill: string, j: number) => (
                      <Badge 
                        key={j} 
                        variant="outline" 
                        className="px-3 py-1.5 bg-white/5 border-white/10 text-xs font-medium"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="glass border-white/10 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingCategory ? 'Edit Skill Category' : 'Add Skill Category'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})} 
                placeholder="e.g. AI & ML" 
                className="bg-white/5" 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Icon</label>
              <select 
                className="w-full h-10 px-3 rounded-md border border-input bg-background/5 text-sm outline-none focus:ring-2 focus:ring-ring"
                value={formData.iconName}
                onChange={e => setFormData({...formData, iconName: e.target.value})}
              >
                {Object.keys(ICON_MAP).map(icon => (
                  <option key={icon} value={icon} className="bg-background text-foreground">{icon}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Skills (comma separated)</label>
              <Input 
                value={formData.skills} 
                onChange={e => setFormData({...formData, skills: e.target.value})} 
                placeholder="RAG, CAG, Graph Query" 
                className="bg-white/5" 
                required 
              />
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit">{editingCategory ? 'Update' : 'Add'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
