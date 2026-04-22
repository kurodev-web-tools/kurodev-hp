"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  User, 
  FolderGit2, 
  Code2, 
  Mail,
  Globe,
  Share2,
  Menu,
  X,
  Moon,
  Sun
} from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Projects", href: "/projects", icon: FolderGit2 },
  { name: "Skills", href: "/skills", icon: Code2 },
  { name: "Contact", href: "/contact", icon: Mail },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const closeMenu = () => setMobileMenuOpen(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-card md:bg-transparent px-6 py-8">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
          <Code2 className="text-white w-5 h-5" />
        </div>
        <span className="text-xl font-bold tracking-wider">kurodev</span>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={closeMenu}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-6 mt-8">
        <div className="flex items-center gap-4 text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors"><Globe className="w-5 h-5" /></a>
          <a href="#" className="hover:text-foreground transition-colors"><Share2 className="w-5 h-5" /></a>
        </div>
        
        {mounted && (
          <button 
            onClick={toggleTheme}
            className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors w-max"
          >
            <div className="relative w-12 h-6 bg-muted rounded-full flex items-center px-1">
              <motion.div
                layout
                className="w-4 h-4 rounded-full bg-primary"
                initial={false}
                animate={{
                  x: theme === "dark" ? 24 : 0
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </div>
            {theme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-[260px] border-r border-border shrink-0 bg-background/50 backdrop-blur-xl">
        <SidebarContent />
      </aside>

      {/* Mobile Header & Toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b border-border bg-background/80 backdrop-blur-md z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
            <Code2 className="text-white w-4 h-4" />
          </div>
          <span className="font-bold">kurodev</span>
        </div>
        <button onClick={() => setMobileMenuOpen(true)} className="text-foreground">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex justify-end"
          >
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="w-[280px] h-full bg-card shadow-2xl relative"
            >
              <button 
                onClick={closeMenu} 
                className="absolute top-5 right-6 text-muted-foreground hover:text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
              <SidebarContent />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
