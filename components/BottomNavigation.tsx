import React from 'react';
import { Home, Compass, Users, MessageSquare, Menu } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BottomNavProps {
    onMenuClick: () => void;
}

const BottomNavigation: React.FC<BottomNavProps> = ({ onMenuClick }) => {
    const { t } = useLanguage();

    const navItems = [
        { icon: <Home className="w-5 h-5" />, label: 'Главная', href: '#home' },
        { icon: <Compass className="w-5 h-5" />, label: 'Маршруты', href: '#tours' },
        { icon: <Users className="w-5 h-5" />, label: 'Команда', href: '#team' },
        { icon: <MessageSquare className="w-5 h-5" />, label: 'Отзывы', href: '#reviews' },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2 pointer-events-none">
            {/* Glassmorphism Floating Dock */}
            <div className="mx-auto max-w-sm bg-black/60 dark:bg-black/80 backdrop-blur-xl border border-white/10 dark:border-white/5 rounded-3xl shadow-2xl p-2 flex items-center justify-between pointer-events-auto">

                {navItems.map((item, idx) => (
                    <a
                        key={idx}
                        href={item.href}
                        className="flex flex-col items-center justify-center p-2 rounded-2xl w-14 h-14 transition-all duration-300 active:scale-95 text-gray-400 hover:text-white hover:bg-white/10"
                    >
                        {item.icon}
                        <span className="text-[9px] font-bold mt-1 uppercase tracking-wider">{item.label}</span>
                    </a>
                ))}

                {/* Menu / CTA Button */}
                <button
                    onClick={onMenuClick}
                    className="flex flex-col items-center justify-center p-2 rounded-2xl w-14 h-14 bg-gradient-to-br from-electric-blue to-purple-600 dark:from-emerald-400 dark:to-teal-500 text-white shadow-lg shadow-electric-blue/20 dark:shadow-emerald-500/20 active:scale-95 transition-transform"
                >
                    <Menu className="w-5 h-5" />
                    <span className="text-[9px] font-bold mt-1 uppercase tracking-wider">Меню</span>
                </button>
            </div>
        </div>
    );
};

export default BottomNavigation;
