import React, { useState, useEffect } from 'react';
import { Heart, Menu, X, Lock } from 'lucide-react';
import { usePhotos } from '../context/PhotoContext';

export const RomanticNavbar: React.FC = () => {
  const { setIsAdminOpen } = usePhotos();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Our Beginning", href: "#beginning" },
    { label: "21 Oct 2019", href: "#said-yes" },
    { label: "12 Chapters", href: "#chapters" },
    { label: "Colleges & Roads", href: "#colleges-and-distance" },
    { label: "Friends' Weddings", href: "#wedding-memories" },
    { label: "Photos (10th+)", href: "#gallery" },
    { label: "Love Letter", href: "#letter" },
    { label: "Reasons", href: "#why-i-love" },
    { label: "Love Quiz", href: "#quiz" },
    { label: "Grand Finale", href: "#grand-finale" },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-burgundy-950/95 backdrop-blur-md border-b border-gold/20 py-3 shadow-romantic'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 group text-left"
        >
          <div className="w-8 h-8 rounded-full bg-wine/80 border border-gold/40 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Heart className="w-4 h-4 text-cream fill-blush" />
          </div>
          <div>
            <span className="font-serif font-bold text-base text-cream group-hover:text-gold transition-colors">
              Finu & Kaakooka
            </span>
            <span className="text-[10px] text-blush/80 block font-mono">
              7th Anniversary • 2026
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden xl:flex items-center gap-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleLinkClick(link.href)}
              className="text-[11px] uppercase font-serif tracking-wider text-cream/80 hover:text-gold transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-1 text-[11px] font-serif text-gold/80 hover:text-gold px-2.5 py-1 rounded-full border border-gold/40 hover:border-gold transition-colors bg-burgundy-900/60"
            title="Open Photo Admin Panel"
          >
            <Lock className="w-3 h-3 text-gold" />
            <span>Admin 📸</span>
          </button>
        </div>

        {/* Mobile menu toggle button */}
        <div className="xl:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-xl bg-burgundy-900/80 border border-gold/30 text-cream"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-burgundy-950/95 border-b border-gold/30 px-6 py-5 backdrop-blur-xl max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="text-left font-serif text-sm text-cream/90 hover:text-gold py-1.5 border-b border-gold/10"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAdminOpen(true);
              }}
              className="text-left font-serif text-sm text-gold hover:text-amber-300 py-1.5 border-b border-gold/20 flex items-center gap-2"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Kaakooka Photo Admin 📸</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
