import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-t-slate-200 py-10 bg-slate-950 text-slate-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-white">CareerHub</h2>
            <p className="text-sm mt-2 text-slate-400">A full-stack recruitment and placement platform designed for students, early-career candidates, and recruiters.</p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="text-sm">Career readiness platform</span>
            <span className="text-slate-500">•</span>
            <span className="text-sm">Recruitment workflow</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;