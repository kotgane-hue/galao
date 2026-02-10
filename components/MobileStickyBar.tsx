import React, { useState, useEffect } from 'react';
import { Home, Calendar, Users, Send, Check } from 'lucide-react';
import { vibrate } from '../utils/vibrate';

interface MobileStickyBarProps {
  onOpenCalendar: () => void;
}

const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenCalendar }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Show menu slightly later to avoid obstructing first screen
      setIsVisible(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (tab: string, hash?: string) => {
    vibrate(10);
    setActiveTab(tab);
    if (hash) window.location.hash = hash;
  };

  // Single button component
  const NavItem = ({ icon: Icon, label, id, onClick, isActiveOverride }: { icon: any, label: string, id: string, onClick: () => void, isActiveOverride?: boolean }) => {
    const isActive = isActiveOverride || activeTab === id;
    
    return (
      <button
        onClick={onClick}
        className="relative flex-1 flex flex-col items-center justify-center gap-1 h-full group active:scale-95 transition-transform"
      >
        {/* Spotlight */}
        {isActive && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-electric-blue/10 dark:bg-emerald-500/10 rounded-full blur-md transition-all duration-300" />
        )}
        
        <Icon 
            className={`w-6 h-6 z-10 transition-all duration-300 ${
                isActive 
                ? 'text-electric-blue dark:text-emerald-400 drop-shadow-[0_0_8px_rgba(37,99,235,0.6)]' 
                : 'text-gray-500 group-hover:text-gray-300'
            }`} 
            strokeWidth={isActive ? 2.5 : 2}
        />
        
        {/* Micro-text */}
        <span className={`text-[9px] font-bold uppercase tracking-wider z-10 transition-colors duration-300 ${
            isActive ? 'text-white' : 'text-gray-600'
        }`}>
            {label}
        </span>
      </button>
    );
  };

  return (
    <div 
        className={`fixed bottom-6 left-4 right-4 z-[90] md:hidden transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'
        }`}
    >
        {/* 🎛️ LAYER 1: Background & Texture (Clipped) */}
        <div className="absolute inset-0 bg-[#121212]/95 backdrop-blur-[20px] border border-white/10 rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] ring-1 ring-white/5 overflow-hidden">
            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
        </div>

        {/* 🎛️ LAYER 2: Content (Not Clipped) */}
        <div className="relative h-[72px] flex items-center justify-between px-2">
            
            {/* --- LEFT SIDE --- */}
            <NavItem 
                icon={Home} 
                label="Главная" 
                id="home" 
                onClick={() => handleNavClick('home', '#home')} 
            />
            
            <NavItem 
                icon={Calendar} 
                label="План" 
                id="plan" 
                onClick={() => { handleNavClick('plan'); onOpenCalendar(); }} 
            />

            {/* --- CENTRAL CORE (BOOKING) --- */}
            {/* Pop-out effect enabled by lack of overflow-hidden on this container */}
            <div className="relative -top-5 mx-1 z-20">
                <a 
                    href="#tours" 
                    onClick={() => { vibrate(20); setActiveTab('tours'); }}
                    className="flex flex-col items-center justify-center group active:scale-95 transition-transform duration-150"
                >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-b from-electric-blue to-blue-700 dark:from-emerald-500 dark:to-teal-600 flex items-center justify-center text-white shadow-[0_8px_25px_rgba(37,99,235,0.4)] dark:shadow-[0_8px_25px_rgba(16,185,129,0.4)] border-[4px] border-[#121212] animate-neon-pulse relative overflow-hidden">
                        
                        {/* Glare */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent opacity-60" />
                        
                        <Check className="w-7 h-7 stroke-[3] drop-shadow-md relative z-10" />
                    </div>
                    
                    <span className="absolute -bottom-4 bg-black/80 text-white/90 px-2 py-[2px] rounded-md text-[9px] font-black uppercase tracking-widest border border-white/10 shadow-lg backdrop-blur-md">
                        Запись
                    </span>
                </a>
            </div>

            {/* --- RIGHT SIDE --- */}
            <NavItem 
                icon={Users} 
                label="Команда" 
                id="team" 
                onClick={() => handleNavClick('team', '#team')} 
            />

            {/* Integrated Telegram */}
            <a 
                href="https://t.me/Galagon_support_bot" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => vibrate(10)}
                className="relative flex-1 flex flex-col items-center justify-center gap-1 h-full group active:scale-95 transition-transform"
            >
                 {/* Online Indicator (Green Dot) */}
                 <span className="absolute top-3 right-3 w-2 h-2 bg-green-500 rounded-full border border-[#121212] z-20 animate-pulse"></span>

                 <Send className="w-6 h-6 text-[#2AABEE] z-10 drop-shadow-[0_0_8px_rgba(42,171,238,0.5)]" strokeWidth={2} />
                 
                 <span className="text-[9px] font-bold uppercase tracking-wider z-10 text-gray-500 group-hover:text-white transition-colors">
                    Чат
                 </span>
            </a>

        </div>
    </div>
  );
};

export default MobileStickyBar;