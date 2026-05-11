
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Edit2, X, Briefcase } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

const DEFAULT_EXPERIENCES = [
  {
    id: '1',
    company: 'PT Verset Teknologi Nusantara',
    role: 'Lead AI Engineer',
    period: 'July 2025 - Present',
    desc: `As an AI Engineer and technical lead, I am responsible for orchestrating end-to-end AI product development, from research and system architecture to deployment and production optimization. I lead cross-functional teams in building scalable AI solutions across backend services, LLM-based applications, multimodal generative AI, and full-stack platforms. My responsibilities include AI architecture design, agent orchestration, on-premise and cloud-based LLM deployment, infrastructure coordination, and performance optimization to ensure reliable, production-grade systems integrated into real-world workflows.

Key Projects & Contributions

• Led the development of a cross-platform AI automation system for contextual comment generation across Instagram, YouTube, X, Facebook, and TikTok. Managed the full project lifecycle, including multimedia data scraping (videos, images, and post content), AI agent and prompt engineering, on-premise LLM deployment, infrastructure orchestration, and inference latency optimization for high-throughput production workloads. Coordinated team execution across research, backend engineering, and deployment pipelines to deliver a scalable end-to-end system.

• Directed multimodal LLM research and fine-tuning initiatives using Qwen-VL, overseeing automated dataset generation, large-scale data curation, and training workflows with Unsloth. Integrated the system with ADB emulators to enable scalable multimodal interaction automation, while leading experimentation, evaluation, and engineering collaboration to improve model performance and operational efficiency.

• Designed and delivered a production-grade AI chatbot platform as a full-stack AI product. Led the end-to-end development process, including Python-based backend services and a Next.js (TypeScript & React) frontend, while implementing LLM tool/function calling, MCP-based integrations, prompt orchestration, multi-agent workflows, and latency optimization. Oversaw system integration, deployment strategy, and technical coordination to ensure scalable and maintainable AI infrastructure.`
  },
  {
    id: '2',
    company: 'PT Ebdesk Teknologi',
    role: 'AI Researcher',
    period: 'August 2023 - June 2025',
    desc: `As an AI Researcher, I specialize in designing and developing LLM-powered systems, multi-agent architectures, and scalable AI data pipelines for production-grade applications, including SDIKTI-related data initiatives. I work closely with cross-functional teams to deliver end-to-end AI solutions spanning both NLP and computer vision domains.

Key Projects & Contributions

• Designed and developed a multi-agent system for automated regional profiling at village, sub-district, and district levels. Built scalable web and document scraping pipelines, transformed extracted data into structured knowledge nodes, and constructed a hierarchical knowledge graph (desa–kecamatan–kabupaten). Implemented CI/CD pipelines to support reliable deployment, version control, and continuous data updates for downstream analytics and decision-making.

• Researched and implemented automated document processing workflows to extract structured tabular information from PDFs and unstructured documents using Docling. Developed AI agents to support internal data science teams in data cleaning, validation, and normalization tasks. Led dataset creation and annotation workflows with Label Studio, including automation-assisted labeling, while also exploring agent frameworks such as MemGPT to improve long-context memory handling and data organization.

• Designed and deployed an AI-powered image generation pipeline using Stable Diffusion (Text-to-Image and Image-to-Image) for public campaign projects. The pipeline included automated data scraping and curation, CLIP-based caption similarity generation, LoRA fine-tuning on SDXL models, and scalable API deployment for automated image generation and content production.`
  }
];

export function Experience() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    period: '',
    desc: ''
  });

  useEffect(() => {
    const stored = localStorage.getItem('hanes_experiences');
    let next: any[];
    if (stored) {
      const storedExps = JSON.parse(stored);
      const storedIds = new Set(storedExps.map((e: any) => e.id));
      const newDefaults = DEFAULT_EXPERIENCES.filter(e => !storedIds.has(e.id));
      next = newDefaults.length ? [...newDefaults, ...storedExps] : storedExps;
    } else {
      next = DEFAULT_EXPERIENCES;
    }
    setExperiences(next);
    localStorage.setItem('hanes_experiences', JSON.stringify(next));
    setIsAdmin(localStorage.getItem('hanes_admin') === 'true');
  }, []);

  const saveExperiences = (newExp: any[]) => {
    setExperiences(newExp);
    localStorage.setItem('hanes_experiences', JSON.stringify(newExp));
  };

  const handleOpenDialog = (exp: any = null) => {
    if (exp) {
      setEditingExp(exp);
      setFormData({
        company: exp.company,
        role: exp.role,
        period: exp.period,
        desc: exp.desc
      });
    } else {
      setEditingExp(null);
      setFormData({
        company: '',
        role: '',
        period: '',
        desc: ''
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const expData = {
      ...formData,
      id: editingExp ? editingExp.id : Date.now().toString()
    };

    if (editingExp) {
      saveExperiences(experiences.map(e => e.id === editingExp.id ? expData : e));
    } else {
      saveExperiences([expData, ...experiences]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this experience item?')) {
      saveExperiences(experiences.filter(e => e.id !== id));
    }
  };

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 relative">
          <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Journey</h2>
          <h3 className="text-4xl font-headline font-bold mb-4">Experience Timeline</h3>
          {isAdmin && (
            <Button onClick={() => handleOpenDialog()} variant="outline" className="rounded-full gap-2 border-primary text-primary mx-auto">
              <Plus className="w-4 h-4" /> Add Experience
            </Button>
          )}
        </div>

        <div className="relative border-l border-white/10 ml-4 md:ml-0 md:pl-0 space-y-12">
          <AnimatePresence mode="popLayout">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-12 md:pl-24"
              >
                <div className="absolute left-[-5px] top-0 w-[10px] h-[10px] rounded-full bg-primary shadow-[0_0_10px_rgba(51,136,255,1)]" />
                <div className="bg-white/5 border border-white/5 p-8 rounded-2xl glass spotlight-hover group relative">
                  {isAdmin && (
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="ghost" className="w-8 h-8 hover:text-primary" onClick={() => handleOpenDialog(exp)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="w-8 h-8 hover:text-destructive" onClick={() => handleDelete(exp.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  <div className="flex flex-col md:flex-row justify-between mb-4 gap-2">
                    <div>
                      <h4 className="text-xl font-headline font-bold">{exp.role}</h4>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                    <span className="text-sm text-muted-foreground font-mono bg-white/5 px-3 py-1 rounded-full h-fit self-start whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{exp.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="glass border-white/10 sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingExp ? 'Edit Experience' : 'Add Experience'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company</label>
                <Input value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} placeholder="Company Name" className="bg-white/5" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Input value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} placeholder="Role" className="bg-white/5" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Period</label>
              <Input value={formData.period} onChange={e => setFormData({...formData, period: e.target.value})} placeholder="2022 - Present" className="bg-white/5" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} placeholder="Responsibilities and achievements..." className="bg-white/5" required />
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit">{editingExp ? 'Update' : 'Add'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
