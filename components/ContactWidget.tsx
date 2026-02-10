
import React, { useState } from 'react';
import { MessageCircle, Instagram, Phone, Mail, X, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ContactWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const contacts = [
    { 
      icon: <Send className="w-5 h-5" />, 
      href: 'https://t.me/Galagon_support_bot', 
      color: 'bg-[#2AABEE]', 
      label: 'Telegram',
      target: '_blank'
    },
    { 
      icon: <Instagram className="w-5 h-5" />, 
      href: 'https://www.instagram.com/dankevich__adventure', 
      color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500', 
      label: 'Instagram',
      target: '_blank'
    },
    { 
      icon: <Phone className="w-5 h-5" />, 
      href: 'tel:+79969417143', 
      color: 'bg-emerald-500', 
      label: t.common.phone,
      target: '_self'
    },
    { 
      icon: <Mail className="w-5 h-5" />, 
      href: 'mailto:tour_club365@mail.ru', 
      color: 'bg-blue-600', 
      label: 'Email',
      target: '_self'
    },
  ];

  return (
    <div className="hidden md:flex fixed bottom-6 right-6 z-[100] flex-col items-end gap-4 font-sans">
      {/* Backdrop for mobile to close when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1]" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Popup Menu items */}
      <div className={`flex flex-col items-end gap-3 transition-all duration-300 origin-bottom-right ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-10 pointer-events-none'}`}>
        {contacts.map((contact, idx) => (
          <a
            key={idx}
            href={contact.href}
            target={contact.target}
            rel="noopener noreferrer"
            className={`group flex items-center justify-end gap-3`}
            onClick={() => setIsOpen(false)}
          >
             <span className="bg-white text-gray-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none">
                {contact.label}
             </span>
             <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white shadow-lg hover:scale-110 transition-transform ${contact.color}`}>
                {contact.icon}
             </div>
          </a>
        ))}
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-14 h-14 flex items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 z-10 ${isOpen ? 'bg-gray-800 rotate-90' : 'bg-emerald-600 hover:bg-emerald-500'}`}
        aria-label="Связаться с нами"
      >
        <div className={`absolute transition-all duration-300 ${isOpen ? 'opacity-0 scale-50 rotate-90' : 'opacity-100 scale-100 rotate-0'}`}>
           <MessageCircle className="w-7 h-7 text-white" />
           <span className="absolute top-0 right-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
        </div>
        <div className={`absolute transition-all duration-300 ${isOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'}`}>
           <X className="w-7 h-7 text-white" />
        </div>
      </button>
    </div>
  );
};

export default ContactWidget;
