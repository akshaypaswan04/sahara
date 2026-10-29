'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, Bell, Settings, User, Shield, ChevronDown } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { LANGUAGES } from '@/lib/languages';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/emergency', label: 'Emergency' },
  { href: '/forms', label: 'Forms' },
  { href: '/voice', label: 'Voice' },
  { href: '/organizations', label: 'For Orgs' },
];

export function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, isLoggedIn, userName, login, logout, accessibility, setAccessibility } = useAppStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const currentLang = LANGUAGES.find(l => l.code === language);

  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shadow-sm">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="leading-none">
            <div className="font-black text-lg text-slate-800 tracking-tight">Sahara</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                pathname.startsWith(l.href)
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-slate-600 hover:bg-slate-100'
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="btn-ghost text-sm gap-1.5"
              aria-label="Select language"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{currentLang?.nativeName ?? 'English'}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 max-h-80 overflow-y-auto">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                    className={cn(
                      'w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors',
                      language === lang.code
                        ? 'bg-teal-50 text-teal-700 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    )}
                  >
                    <span>{lang.nativeName}</span>
                    <span className="text-xs text-slate-400">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Accessibility */}
          <Link href="/accessibility" className="btn-ghost hidden sm:inline-flex" title="Accessibility Settings">
            <Settings className="w-4 h-4" />
          </Link>

          {/* Notifications */}
          <button className="btn-ghost relative" aria-label="Notifications">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Auth */}
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">{userName}</span>
            </button>
          ) : (
            <button
              onClick={() => login('Demo User')}
              className="btn-primary text-sm py-2 px-4"
            >
              Sign In
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden btn-ghost"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 flex flex-col gap-1">
          {navLinks.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'px-4 py-2.5 rounded-xl text-sm font-medium transition-colors',
                pathname.startsWith(l.href)
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-slate-700 hover:bg-slate-50'
              )}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/accessibility"
            onClick={() => setMobileOpen(false)}
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            ♿ Accessibility
          </Link>
        </div>
      )}
    </nav>
  );
}
