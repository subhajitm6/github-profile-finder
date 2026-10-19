import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-white/60 py-6 text-center text-xs text-slate-500 transition-colors dark:border-[#30363D] dark:bg-[#161B22]/60 dark:text-[#9198A1]">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-1.5 px-4">
        <span>GitHub Profile Finder &bull; Built with React &amp; Tailwind CSS</span>
        <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 inline" />
      </div>
    </footer>
  );
}
