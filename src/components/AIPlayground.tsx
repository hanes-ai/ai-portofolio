
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Send, Sparkles, User, Loader2 } from 'lucide-react';
import { aiPlaygroundInteractionStream } from '@/ai/flows/ai-playground-interaction';

export function AIPlayground() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);
    setResponse(""); 
    
    try {
      // Use the server action stream
      const stream = await aiPlaygroundInteractionStream(input);
      for await (const chunk of stream) {
        setResponse((prev) => prev + chunk);
      }
    } catch (error) {
      console.error('AI Playground Error:', error);
      setResponse("I'm sorry, I encountered an error while processing your request. Please check your connection and try again.");
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <section id="playground" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-secondary font-bold uppercase tracking-widest text-sm mb-4">Interactive</h2>
          <h3 className="text-4xl font-headline font-bold mb-4">AI Playground</h3>
          <p className="text-muted-foreground">Ask anything about my expertise in AI Engineering and technical planning.</p>
        </div>

        <Card className="glass border-white/5 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Sparkles className="w-24 h-24" />
          </div>
          
          <CardHeader className="border-b border-white/5 bg-white/[0.02]">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="text-primary w-5 h-5" />
              </div>
              Hanes Assistant
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 md:p-8">
            <div className="min-h-[250px] mb-8 space-y-6">
              {response || loading ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4 items-start"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-white/5 p-5 rounded-2xl rounded-tl-none border border-white/5 text-sm leading-relaxed whitespace-pre-wrap flex-grow min-h-[60px] shadow-sm">
                    {response}
                    {loading && !response && (
                      <div className="flex items-center gap-2 text-primary/60">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Thinking...</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-40 py-16">
                  <Sparkles className="w-12 h-12 mb-4 animate-pulse" />
                  <p className="text-center max-w-xs">Ask about AI automation, LLMs, Computer Vision, or how I can help your project.</p>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-3">
              <div className="relative flex-grow">
                <Input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about AI, my experience, or planning..."
                  className="bg-white/5 border-white/10 rounded-xl pl-6 pr-12 focus:ring-primary h-14"
                />
                <User className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-50" />
              </div>
              <Button 
                type="submit" 
                disabled={loading} 
                className="rounded-xl w-14 h-14 p-0 bg-primary hover:bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
