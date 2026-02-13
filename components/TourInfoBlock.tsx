import React from 'react';
import { Shield, ChefHat, Backpack, AlertCircle, CheckCircle2, ThermometerSnowflake } from "lucide-react";
import { TourDetails } from '../types';

interface TourInfoBlockProps {
  details: TourDetails;
}

const TourInfoBlock: React.FC<TourInfoBlockProps> = ({ details }) => {
  return (
    <div className="space-y-16 py-8">
      
      {/* --- VIP SECTION: EXPEDITION UPGRADES --- */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          <span className="text-emerald-500 font-mono text-xs uppercase tracking-[0.3em] font-bold">
            VIP Опции
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {details.vip.map((vip, idx) => (
            <div key={idx} className="group relative p-8 rounded-[2rem] border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent overflow-hidden hover:border-emerald-500/40 transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                {vip.icon === 'Backpack' ? <Backpack size={120} /> : <ChefHat size={120} />}
                </div>
                <h4 className="text-2xl font-black text-gray-900 dark:text-white uppercase mb-2">
                {vip.title}
                </h4>
                <p className="text-emerald-600 dark:text-emerald-400 font-bold text-xl mb-4 whitespace-nowrap">{vip.price}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                {vip.desc}
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-500">
                <CheckCircle2 size={16} /> Premium Service
                </span>
            </div>
          ))}
        </div>
      </section>

      {/* --- RENTAL SECTION: GEAR ARMORY --- */}
      <section className="relative">
        <h3 className="text-3xl md:text-4xl font-black text-center text-gray-900 dark:text-white mb-10 uppercase tracking-tight">
          Арсенал <span className="text-emerald-500">Снаряжения</span>
        </h3>
        
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-[2.5rem] p-8 border border-gray-200 dark:border-gray-800 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-6 text-gray-400 text-xs uppercase tracking-widest font-bold">
            <ThermometerSnowflake size={16} />
            <span>Стоимость аренды (Весь поход)</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {details.rental.map((category, idx) => (
                <div key={idx}>
                    <h4 className="text-emerald-600 dark:text-emerald-400 font-bold text-sm uppercase tracking-wider mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                        {category.category}
                    </h4>
                    <div className="space-y-3">
                        {category.items.map((item, itemIdx) => (
                            <div key={itemIdx} className="flex justify-between items-center text-sm">
                                <span className="text-gray-700 dark:text-gray-300 font-medium">{item.name}</span>
                                <span className="text-gray-900 dark:text-white font-bold font-mono whitespace-nowrap">{item.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
          </div>
          <div className="mt-8 text-center border-t border-gray-200 dark:border-gray-800 pt-4">
             <p className="text-xs text-gray-400">* Полный прайс-лист доступен у менеджера. Оплата снаряжения производится единоразово за весь поход.</p>
          </div>
        </div>
      </section>

      {/* --- IMPORTANT INFO: THE PROTOCOL --- */}
      <section className="grid md:grid-cols-12 gap-8">
        {/* Rules List */}
        <div className="md:col-span-7 space-y-6">
          <h3 className="text-xl font-black uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-3">
            <Shield className="text-emerald-500" /> Протокол Безопасности
          </h3>
          <ul className="space-y-4">
            {details.rules.map((rule, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                <span className="text-emerald-500 font-bold">•</span>
                {rule}
              </li>
            ))}
          </ul>
        </div>

        {/* Booking Card */}
        <div className="md:col-span-5">
          <div className="h-full bg-gray-900 text-white rounded-[2rem] p-8 flex flex-col justify-center relative overflow-hidden">
             {/* Abstract Decor */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full blur-[60px] opacity-20" />
             
             <div className="relative z-10">
               <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-4">
                 Условия Бронирования
               </h4>
               <div className="mb-6">
                 <span className="text-4xl font-black block mb-1 whitespace-nowrap">{details.booking.deposit}</span>
                 <span className="text-gray-400 text-sm">Предоплата для бронирования</span>
               </div>
               
               <div className="flex items-start gap-3 bg-white/10 rounded-xl p-4 backdrop-blur-md">
                 <AlertCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                 <p className="text-xs text-gray-300 leading-relaxed">
                   {details.booking.refundPolicy}
                 </p>
               </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TourInfoBlock;