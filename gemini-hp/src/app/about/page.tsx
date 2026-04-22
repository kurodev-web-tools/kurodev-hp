"use client";

import { motion, Variants } from "framer-motion";
import { User, Code2, Cpu, Wrench, Layers } from "lucide-react";

export default function AboutPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto pb-20 pt-[80px] md:pt-0">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-full bg-primary/10">
            <User className="text-primary w-6 h-6" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">About Profile</h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stats Column */}
          <motion.div variants={itemVariants} className="col-span-1 flex flex-col gap-6">
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <Cpu className="text-muted-foreground w-5 h-5"/>
                <h3 className="font-semibold text-lg">Computing</h3>
              </div>
              <p className="text-3xl font-bold text-primary">8+ Years</p>
              <p className="text-muted-foreground text-sm mt-2">Developing, optimizing, and building systems from the ground up.</p>
            </div>
            
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <Wrench className="text-muted-foreground w-5 h-5"/>
                <h3 className="font-semibold text-lg">Tech Ecosystems</h3>
              </div>
              <p className="text-3xl font-bold text-accent">15+ Tools</p>
              <p className="text-muted-foreground text-sm mt-2">Mastered frameworks spanning frontend, backend, and AI integration.</p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <Layers className="text-muted-foreground w-5 h-5"/>
                <h3 className="font-semibold text-lg">Domains</h3>
              </div>
              <p className="text-3xl font-bold text-emerald-500">3 Fields</p>
              <p className="text-muted-foreground text-sm mt-2">Web Apps, Internal Tools, and AI Agent workflows.</p>
            </div>
          </motion.div>

          {/* Code Snippet Spotlight */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 bg-zinc-950 border border-border/50 rounded-3xl p-8 shadow-inner overflow-hidden flex flex-col relative h-full min-h-[400px]">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Code2 className="w-64 h-64 text-primary" />
            </div>
            
            <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="ml-2 text-zinc-500 text-sm font-mono">kurodev.ts</span>
            </div>
            
            <pre className="text-sm md:text-base font-mono text-zinc-300 overflow-x-auto whitespace-pre leading-relaxed relative z-10">
<code className="text-emerald-400">interface</code> Developer {"{"}
<br/>  name: <code className="text-blue-400">string</code>;
<br/>  passion: <code className="text-blue-400">string[]</code>;
<br/>  philosophy: <code className="text-blue-400">string</code>;
<br/>{"}"}
<br/><br/>
<code className="text-emerald-400">const</code> <span className="text-blue-400">identity</span>: Developer = {"{"}
<br/>  <span className="text-purple-400">name</span>: <span className="text-amber-300">'kurodev'</span>,
<br/>  <span className="text-purple-400">passion</span>: [
<br/>    <span className="text-amber-300">'Clean Architecture'</span>,
<br/>    <span className="text-amber-300">'Next-gen Agentic AI'</span>,
<br/>    <span className="text-amber-300">'Pixel-perfect UIs'</span>
<br/>  ],
<br/>  <span className="text-purple-400">philosophy</span>: <span className="text-amber-300">'Ideas, formed in the shortest distance.'</span>
<br/>{"}"};
            </pre>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
