
import React, { useState, useEffect, useRef } from 'react';
import { Mountain, Instagram, Send, Phone, Mail, MapPin, Copy, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [showPromo, setShowPromo] = useState(false);
  const [copied, setCopied] = useState(false);
  const promoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowPromo(true);
        }
      },
      { threshold: 0.5 }
    );

    if (promoRef.current) {
      observer.observe(promoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("GALAGON15");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contacts" className="bg-gray-950 dark:bg-gray-950 text-white pt-20 pb-0 border-t border-gray-900 relative overflow-hidden">
      {/* Note: Footer stays dark in both modes for contrast/anchor */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-electric-blue dark:from-emerald-900 via-gray-950 to-gray-950"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Mountain className="w-8 h-8 text-electric-blue dark:text-emerald-500" />
              <span className="text-2xl font-heading font-bold tracking-wider uppercase">Галагон</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              {t.hero.slogans[0].text}
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/dankevich__adventure" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-500 transition-all transform hover:-translate-y-1 text-white shadow-lg border border-gray-800">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://t.me/Galagon_support_bot" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-[#2AABEE] transition-all transform hover:-translate-y-1 text-white shadow-lg border border-gray-800">
                <Send className="w-5 h-5" />
              </a>
              <a href="https://vk.com/roma155" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-[#0077FF] transition-all transform hover:-translate-y-1 text-white shadow-lg border border-gray-800">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.942 13.904c0.88 0 1.54 0.61 2.22 1.34 0.74 0.79 1.54 1.57 1.54 1.57s0.81 0.74 0.12 0.74h-3.48c-0.29 0-0.65-0.12-0.97-0.54 -0.38-0.49-1.06-1.52-1.34-1.74 -0.27-0.22-0.53-0.27-0.81-0.08 -0.46 0.3-0.55 1.77-0.55 1.77s0 0.59-0.84 0.59h-1.63c-3.13 0-5.83-3.66-8.21-10.45 0 0-0.15-0.59 0.58-0.59h3.63c0.31 0 0.59 0.17 0.74 0.53 0 0 1.25 3.32 2.76 5.86 0.44 0.74 0.73 0.94 1.01 0.94 0.18 0 0.38-0.11 0.46-0.34 0.41-1.08 0.1-4.66-0.69-5.91 -0.16-0.25-0.56-0.34-0.94-0.39 -0.56-0.07 0.04-1.28 2.05-1.28h0.2c1.76 0 1.63 0.23 1.63 1.34 0 2.65-0.46 3.65 0.52 3.65 0.46 0 1.33-1.85 2.5-4.5 0.15-0.34 0.4-0.49 0.79-0.49h3.6c1.06 0 0.86 0.76 0.86 0.76s-0.19 1.1-2.58 4.29c-2.48 3.29-0.96 3.66-0.96 3.66Z"/></svg>
              </a>
              <a href="https://rutube.ru/channel/69171706/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-[#00A1E7] transition-all transform hover:-translate-y-1 text-white shadow-lg border border-gray-800">
                 {/* Simple Triangle for Play/Rutube metaphor */}
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-electric-blue dark:text-emerald-500 uppercase tracking-widest text-sm">{t.footer.nav}</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="/#home" className="hover:text-white hover:translate-x-1 transition-all inline-block">{t.nav.home}</a></li>
              <li><a href="/#tours" className="hover:text-white hover:translate-x-1 transition-all inline-block">{t.nav.tours}</a></li>
              <li><a href="/#team" className="hover:text-white hover:translate-x-1 transition-all inline-block">{t.nav.team}</a></li>
              <li><a href="/#about" className="hover:text-white hover:translate-x-1 transition-all inline-block">{t.nav.about}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-electric-blue dark:text-emerald-500 uppercase tracking-widest text-sm">{t.footer.contacts}</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3 group">
                <div className="bg-gray-900 p-2 rounded-lg group-hover:bg-electric-blue/20 dark:group-hover:bg-emerald-900/50 transition-colors">
                  <Phone className="w-5 h-5 text-electric-blue dark:text-emerald-500" />
                </div>
                <span>
                  <a href="tel:+79969417143" className="block font-bold text-white hover:text-electric-blue dark:hover:text-emerald-400 transition-colors">+7 996 941 71 43</a>
                  <span className="text-xs text-gray-500">09:00 - 21:00</span>
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                 <div className="bg-gray-900 p-2 rounded-lg group-hover:bg-electric-blue/20 dark:group-hover:bg-emerald-900/50 transition-colors">
                   <Mail className="w-5 h-5 text-electric-blue dark:text-emerald-500" />
                 </div>
                <a href="mailto:tour_club365@mail.ru" className="hover:text-electric-blue dark:hover:text-emerald-400 transition-colors">tour_club365@mail.ru</a>
              </li>
              <li className="flex items-start gap-3">
                 <div className="bg-gray-900 p-2 rounded-lg">
                   <MapPin className="w-5 h-5 text-electric-blue dark:text-emerald-500" />
                 </div>
                <span>Россия, РСО-Алания, <br/>г. Владикавказ</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-electric-blue dark:text-emerald-500 uppercase tracking-widest text-sm">{t.footer.questions}</h4>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">{t.hero.slogans[1].text}</p>
            <a href="https://t.me/Galagon_support_bot" target="_blank" rel="noopener noreferrer" className="w-full block text-center bg-electric-blue dark:bg-emerald-600 hover:bg-blue-600 dark:hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-electric-blue/25 dark:hover:shadow-emerald-500/25 transform hover:-translate-y-1">
              {t.footer.writeTg}
            </a>
          </div>

        </div>

        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Galagon Travel. {t.footer.rights}</p>
        </div>
      </div>
      
      {/* SECRET PROMO SECTION AT THE VERY BOTTOM */}
      <div ref={promoRef} className="w-full bg-gradient-to-r from-gray-900 to-black border-t border-gray-800 py-12 md:py-16 pb-32 md:pb-16 relative overflow-hidden group cursor-default">
         {/* Background Glow */}
         <div className={`absolute inset-0 bg-emerald-500/5 transition-opacity duration-1000 ${showPromo ? 'opacity-100' : 'opacity-0'}`}></div>

         <div className={`max-w-4xl mx-auto px-6 text-center relative z-10 transition-all duration-1000 transform ${showPromo ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            
            {/* Mascot Container */}
            <div className="mb-6 relative inline-block">
               <div className="text-6xl md:text-8xl animate-bounce filter drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">🥑</div>
               {/* Speech Bubble */}
               <div className="absolute -top-4 -right-24 md:-right-32 bg-white text-black px-4 py-2 rounded-xl rounded-bl-none text-xs md:text-sm font-bold shadow-lg transform rotate-6 animate-pulse">
                  Ты долистал до конца! <br/> You reached the end!
               </div>
            </div>

            <h3 className="text-2xl md:text-4xl font-heading font-black text-white mb-2">
               Ваша награда за упорство!
            </h3>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
               Лови секретный промокод на скидку для самых внимательных путешественников.
            </p>

            <div 
              onClick={handleCopy}
              className="inline-flex items-center gap-4 bg-gray-800 hover:bg-gray-700 border-2 border-dashed border-emerald-500/50 hover:border-emerald-400 rounded-2xl px-6 py-4 cursor-pointer transition-all group/code relative"
            >
               <span className="text-2xl md:text-4xl font-mono font-bold text-emerald-400 tracking-widest select-all">
                  GALAGON15
               </span>
               <div className="bg-emerald-500/20 p-2 rounded-lg">
                  {copied ? <Check className="w-6 h-6 text-emerald-400" /> : <Copy className="w-6 h-6 text-emerald-400 group-hover/code:scale-110 transition-transform" />}
               </div>
               
               {copied && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-fade-in-up">
                     Скопировано!
                  </div>
               )}
            </div>

         </div>
      </div>

    </footer>
  );
};

export default Footer;
