"use client";

import { motion, Variants } from "framer-motion";
import { FolderGit2, ExternalLink, ArrowRight } from "lucide-react";

export default function ProjectsPage() {
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
        className="flex flex-col gap-10"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-4 border-b border-border pb-6">
          <div className="p-3 rounded-full bg-primary/10">
            <FolderGit2 className="text-primary w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Projects & Tools</h1>
            <p className="text-muted-foreground mt-2">A showcase of full-stack applications and internal automation tools.</p>
          </div>
        </motion.div>

        {/* Web Showcase */}
        <div className="flex flex-col gap-6">
          <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight">Web Showcase</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* v-match card */}
            <motion.div variants={itemVariants} className="bg-card border border-border rounded-3xl p-8 relative group overflow-hidden hover:border-primary/50 transition-colors shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex justify-between items-start mb-12 relative z-10">
                <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">Client App</span>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-3 relative z-10 group-hover:text-primary transition-colors">v-match</h3>
              <p className="text-muted-foreground mb-6 relative z-10">A matching portal designed to bridge the gap between clients and specialized creators.</p>
              <div className="flex flex-wrap gap-2 relative z-10">
                <span className="text-xs bg-muted px-2 py-1 rounded-md text-foreground">Next.js</span>
                <span className="text-xs bg-muted px-2 py-1 rounded-md text-foreground">Supabase</span>
                <span className="text-xs bg-muted px-2 py-1 rounded-md text-foreground">Tailwind CSS</span>
              </div>
            </motion.div>

            {/* A-Z Template card */}
            <motion.div variants={itemVariants} className="bg-card border border-border rounded-3xl p-8 relative group overflow-hidden hover:border-accent/50 transition-colors shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex justify-between items-start mb-12 relative z-10">
                <span className="text-xs font-semibold bg-accent/10 text-accent px-3 py-1 rounded-full border border-accent/20">Product</span>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-3 relative z-10 group-hover:text-accent transition-colors">A-Z Templates</h3>
              <p className="text-muted-foreground mb-6 relative z-10">A premium collection of high-converting portal themes and UI structures.</p>
              <div className="flex flex-wrap gap-2 relative z-10">
                <span className="text-xs bg-muted px-2 py-1 rounded-md text-foreground">Next.js</span>
                <span className="text-xs bg-muted px-2 py-1 rounded-md text-foreground">Framer Motion</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Roadmap / Internal Tools */}
        <div className="flex flex-col gap-6 mt-6">
          <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight">Internal Tools Roadmap</motion.h2>
          <motion.div variants={itemVariants} className="border border-border rounded-3xl p-8 bg-background relative overflow-hidden shadow-sm">
            <div className="space-y-8 relative z-10">
              
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className="font-semibold text-lg flex items-center gap-2">Gemini Automation CLI</h4>
                    <span className="text-sm text-muted-foreground">Automating codebase sweeping and refactoring</span>
                  </div>
                  <span className="text-sm font-bold text-emerald-500">100%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-emerald-500 rounded-full" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className="font-semibold text-lg">Inventory Tracking Hub</h4>
                    <span className="text-sm text-muted-foreground">Internal SaaS tool for resource management</span>
                  </div>
                  <span className="text-sm font-bold text-accent">75%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "75%" }} transition={{ duration: 1, delay: 0.4 }} className="h-full bg-accent rounded-full" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className="font-semibold text-lg">Agentic Coding Workflow</h4>
                    <span className="text-sm text-muted-foreground">Orchestrating multiple LLMs for seamless app generation</span>
                  </div>
                  <span className="text-sm font-bold text-primary">40%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "40%" }} transition={{ duration: 1, delay: 0.6 }} className="h-full bg-primary rounded-full relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse" />
                  </motion.div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}
