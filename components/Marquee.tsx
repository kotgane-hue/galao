
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Mountain } from 'lucide-react';

const Marquee: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-emerald-900 py-4 overflow-hidden border-y border-emerald-800 relative z-20">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center">
            {t.marquee.map((text, idx) => (
              <React.Fragment key={`${i}-${idx}`}>
                <span className="text-emerald-100 font-bold text-lg uppercase tracking-widest px-8">
                  {text}
                </span>
                <Mountain className="w-5 h-5 text-emerald-500 opacity-50" />
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
