"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, ExternalLink, User as UserIcon } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

export default function Home() {
  return (
    <div className="w-full max-w-7xl mx-auto pb-20 pt-[80px] md:pt-0">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min"
      >
        {/* HERO SECTION - Spans 2 cols on Desktop */}
        <motion.div
          variants={itemVariants}
          className="col-span-1 md:col-span-2 row-span-2 bg-card border border-border rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[400px] group"
        >
          {/* Abstract Particle Wave BG - Placeholder */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/40 via-background to-background pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-xl text-muted-foreground mb-4">Hi, I&apos;m</h2>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight">
              kurodev
            </h1>
            <p className="text-lg text-muted-foreground max-w-sm mb-12">
              I build exceptional digital experiences with{" "}
              <span className="text-primary italic">elegant code.</span>
            </p>

            <div className="flex items-center gap-4">
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full font-medium transition-transform hover:scale-105 active:scale-95 flex items-center gap-2">
                View Projects <ArrowRight className="w-4 h-4" />
              </button>
              <button className="bg-transparent border border-border hover:bg-muted text-foreground px-6 py-3 rounded-full font-medium transition-colors">
                Contact Me
              </button>
            </div>
          </div>

          <div className="absolute top-8 right-8 w-48 h-48 md:w-64 md:h-64 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm flex items-center justify-center overflow-hidden">
            {/* Avatar Placeholder */}
            <div className="w-full h-full  bg-gradient-to-tr from-primary/20 to-accent/20 flex flex-col items-center justify-center text-muted-foreground shadow-[0_0_50px_-15px_rgba(var(--color-primary),0.3)]">
               <UserIcon className="w-16 h-16 opacity-50" />
            </div>
            <div className="absolute inset-0 rounded-full border border-primary/30 blur-sm group-hover:border-primary/60 transition-colors" />
          </div>
        </motion.div>

        {/* FEATURE CARD 1 - Nebula UI */}
        <motion.div
          variants={itemVariants}
          className="col-span-1 bg-card border border-border rounded-3xl p-6 flex flex-col group relative overflow-hidden"
        >
          <div className="flex justify-between items-start mb-6">
            <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
              Featured
            </span>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          
          <div className="absolute -z-10 top-0 left-0 w-full h-[60%] bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-50 transition-opacity group-hover:opacity-100" />
          
          <div className="mt-auto">
            <h3 className="text-2xl font-bold mb-2">Nebula UI</h3>
            <p className="text-muted-foreground text-sm mb-6">
              A modern UI component library built with React & TypeScript.
            </p>
            <div className="flex flex-wrap gap-2">
              {["React", "TypeScript", "Tailwind CSS"].map((tech) => (
                <span
                  key={tech}
                  className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* MINI CARDS */}
        <motion.div
          variants={itemVariants}
          className="col-span-1 bg-card border border-border rounded-3xl p-6 group cursor-pointer hover:border-primary/50 transition-colors"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <span className="font-bold text-primary">V</span>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <h3 className="font-bold mb-2">void.dev</h3>
          <p className="text-muted-foreground text-sm mb-4">Minimal developer portfolio template.</p>
          <div className="flex gap-2">
             <span className="text-xs bg-background border border-border px-2 py-1 rounded-md">Next.js</span>
          </div>
        </motion.div>

        {/* CODE SNIPPET */}
        <motion.div
          variants={itemVariants}
          className="col-span-1 md:col-span-2 bg-zinc-950 border border-border/50 rounded-3xl p-6 overflow-hidden relative shadow-inner"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
          <pre className="text-sm font-mono text-zinc-300 overflow-x-auto">
            <code className="text-emerald-400">const</code> <span className="text-blue-400">kurodev</span> <span className="text-emerald-400">=</span> {"{"}
            <br />  <span className="text-purple-400">name</span>: <span className="text-amber-300">'kurodev'</span>,
            <br />  <span className="text-purple-400">focus</span>: <span className="text-amber-300">'Building exceptional products'</span>,
            <br />  <span className="text-purple-400">passion</span>: <span className="text-amber-300">'Clean Code & Minimal Design'</span>,
            <br />{"}"};
            <br />
            <br /><span className="text-rose-400">export default</span> kurodev;
          </pre>
        </motion.div>

        {/* STATS */}
        <motion.div
          variants={itemVariants}
          className="col-span-1 bg-card border border-border rounded-3xl p-6"
        >
          <h3 className="font-bold mb-6">Quick Stats</h3>
          <div className="space-y-4">
            {[
              { label: "Projects Completed", value: "24+" },
              { label: "Years of Experience", value: "8+" },
              { label: "Happy Clients", value: "12+" },
            ].map((stat, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{stat.label}</span>
                <span className="font-bold">{stat.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
