
import React from 'react';
import { Home, Compass } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-lg">
          {/* Avocado Graphic */}
          <div className="relative mb-8 inline-block">
             <div className="text-[8rem] md:text-[10rem] animate-bounce filter drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                🥑
             </div>
             <div className="absolute -top-4 -right-8 bg-white text-gray-900 px-4 py-2 rounded-xl rounded-bl-none font-bold text-sm shadow-xl animate-pulse transform rotate-12">
                Где мы?!
             </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-heading font-black text-white mb-4 leading-none">
             404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-400 mb-6 uppercase tracking-wide">
             Вы ушли с маршрута!
          </h2>
          
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
             Тут нет гор, только пустота. Авокадо напуган и хочет домой. 
             Вернемся к цивилизации?
          </p>

          <a 
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 hover:bg-emerald-400 hover:text-white rounded-full font-bold text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/10"
          >
             <Home className="w-5 h-5" />
             <span>Вернуться в лагерь</span>
          </a>
      </div>

      <div className="absolute bottom-8 text-gray-600 text-xs font-mono">
         Error Code: LOST_IN_MOUNTAINS
      </div>
    </div>
  );
};

export default NotFound;
