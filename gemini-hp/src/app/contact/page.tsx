"use client";

import { motion, Variants } from "framer-motion";
import { Mail, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
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
        className="flex flex-col gap-12"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-4 border-b border-border pb-6">
          <div className="p-3 rounded-full bg-primary/10">
            <Mail className="text-primary w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Contact & Pricing</h1>
            <p className="text-muted-foreground mt-2">Let&apos;s build something exceptional together.</p>
          </div>
        </motion.div>

        {/* Pricing Guide */}
        <div className="flex flex-col gap-6">
          <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight">Reference Pricing Guide</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div variants={itemVariants} className="bg-card border border-border rounded-3xl p-8 flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="font-bold text-xl mb-2">LP Creation</h3>
                <p className="text-sm text-muted-foreground mb-6">High-converting landing pages tailored to your brand.</p>
                <div className="text-2xl font-bold mb-6">¥100k<span className="text-sm text-muted-foreground font-normal"> ~</span></div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Design & Copywriting</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Responsive UI</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Basic SEO Optimization</li>
              </ul>
              <button className="w-full py-2 bg-muted hover:bg-primary hover:text-primary-foreground text-foreground rounded-xl transition-colors font-semibold text-sm">
                Discuss Requirements
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-zinc-950 border border-primary/50 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden shadow-lg shadow-primary/5">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-xl">Most Requested</div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-zinc-100">Web Dashboard</h3>
                <p className="text-sm text-zinc-400 mb-6">Custom metrics, portals, and dynamic web applications.</p>
                <div className="text-2xl font-bold mb-6 text-white">¥300k<span className="text-sm text-zinc-500 font-normal"> ~</span></div>
              </div>
              <ul className="space-y-3 mb-8 text-zinc-300">
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Auth & Database Auth</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Multi-page Routing</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Complex UI Components</li>
              </ul>
              <button className="w-full py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-colors font-semibold text-sm">
                Discuss Requirements
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-card border border-border rounded-3xl p-8 flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="font-bold text-xl mb-2">Internal Tools</h3>
                <p className="text-sm text-muted-foreground mb-6">Workflow automation and AI agent integrated flows.</p>
                <div className="text-2xl font-bold mb-6">¥500k<span className="text-sm text-muted-foreground font-normal"> ~</span></div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Logic automation</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> API Integrations</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Admin Management</li>
              </ul>
              <button className="w-full py-2 bg-muted hover:bg-primary hover:text-primary-foreground text-foreground rounded-xl transition-colors font-semibold text-sm">
                Discuss Requirements
              </button>
            </motion.div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="flex flex-col gap-6">
          <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight">Send a Message</motion.h2>
          <motion.div variants={itemVariants} className="bg-card border border-border rounded-3xl p-8 shadow-sm max-w-2xl">
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-semibold text-foreground">Name</label>
                  <input type="text" id="name" placeholder="John Doe" className="bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-semibold text-foreground">Email</label>
                  <input type="email" id="email" placeholder="john@example.com" className="bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-semibold text-foreground">Message</label>
                <textarea id="message" rows={5} placeholder="Tell me about your project..." className="bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none" />
              </div>
              <button type="submit" className="self-start flex items-center justify-center gap-2 bg-foreground text-background font-semibold rounded-xl px-8 py-3 hover:opacity-90 transition-opacity">
                Send Request <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}
