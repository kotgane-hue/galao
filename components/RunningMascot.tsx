import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const RunningMascot: React.FC = () => {
  const { language } = useLanguage();
  const [deathType, setDeathType] = useState<number | null>(null);
  const [isGone, setIsGone] = useState(false);
  const [speech, setSpeech] = useState<string | null>(null);
  const [isStickyBarVisible, setIsStickyBarVisible] = useState(false);
  const [screenFlash, setScreenFlash] = useState(false);

  // Refs for animation
  const containerRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<SVGCircleElement>(null);
  const rightEyeRef = useRef<SVGCircleElement>(null);
  const lastSpeechTime = useRef<number>(0);

  // --- LOCALIZATION ---
  const MESSAGES = {
    ru: ["Хочу хычин", "Хочу пирог", "А когда привал?", "А вершина скоро?", "Меняю палки на еду", "Кто положил кирпич?!", "Лифт есть?", "Я - гуакамоле!", "Осторожно, я мягкий!", "Зелёный, но мощный!", "Ща упаду!"],
    en: ["Want Khychin!", "Want pie!", "When is break?", "Summit soon?", "Will trade poles for food", "Who added bricks?!", "Elevator?", "I am guacamole!", "Careful, soft!", "Green power!", "I'm falling!"],
    zh: ["想吃 Khychin!", "想吃馅饼!", "什么时候休息?", "顶峰快到了吗?", "用登山杖换食物!", "谁放了砖头?!", "有电梯吗?", "我要变成鳄梨酱!", "小心，我很软!", "绿色力量!", "我要倒了!"]
  };

  const FINAL_WORDS = {
    ru: "О нет! Только не это!",
    en: "Oh no! Not again!",
    zh: "哦不！别再来了！"
  };

  // --- EYE TRACKING ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (deathType !== null) return;

      const updateEye = (eye: SVGCircleElement | null, cx: number, cy: number) => {
        if (!eye) return;
        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;
        
        const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
        const distance = Math.min(1.5, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 15);
        
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        eye.style.transform = `translate(${x}px, ${y}px)`;
      };

      updateEye(leftEyeRef.current, 42, 45);
      updateEye(rightEyeRef.current, 58, 45);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [deathType]);

  // --- SPEECH LOGIC ---
  const showRandomPhrase = () => {
    if (deathType) return;
    const now = Date.now();
    if (now - lastSpeechTime.current < 15000) return;
    lastSpeechTime.current = now;

    const currentPhrases = MESSAGES[language] || MESSAGES['en'];
    const phrase = currentPhrases[Math.floor(Math.random() * currentPhrases.length)];
    setSpeech(phrase);
    setTimeout(() => setSpeech(null), 5000);
  };

  // --- SCROLL LISTENER ---
  useEffect(() => {
    const handleScroll = () => {
      setIsStickyBarVisible(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const el = containerRef.current;
    if (el) {
       const handleAnim = (e: any) => {
         if (e.target === el && e.animationName?.includes('mascotMove')) showRandomPhrase();
       };
       el.addEventListener('animationiteration', handleAnim);
       setTimeout(() => { if (!deathType) showRandomPhrase(); }, 2000);
       return () => {
         window.removeEventListener('scroll', handleScroll);
         el.removeEventListener('animationiteration', handleAnim);
       };
    }
  }, [deathType, language]);

  // --- INTERACTION ---
  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (deathType !== null) return;
    
    // Reset eyes
    if (leftEyeRef.current) leftEyeRef.current.style.transform = 'translate(0,0)';
    if (rightEyeRef.current) rightEyeRef.current.style.transform = 'translate(0,0)';

    const type = Math.floor(Math.random() * 6) + 1;
    setDeathType(type);
    setSpeech(FINAL_WORDS[language] || FINAL_WORDS['en']);
    
    // Flash Effect for Lightning
    if (type === 2) { 
        setScreenFlash(true);
        setTimeout(() => setScreenFlash(false), 200);
    }

    const timings: Record<number, number> = { 4: 2000, 5: 2000, 6: 1500 };
    const duration = timings[type] || 3000;

    setTimeout(() => setIsGone(true), duration);
  };

  if (isGone) return null;

  return (
    <>
      {/* GLOBAL SCREEN FLASH (For Lightning) */}
      {screenFlash && (
        <div className="fixed inset-0 z-[9999] bg-white pointer-events-none animate-[flash-screen_0.2s_ease-out_forwards]"></div>
      )}

      <div 
        ref={containerRef}
        className={`fixed right-0 z-[100] w-32 h-32 md:w-36 md:h-36 pointer-events-auto cursor-pointer animate-mascot-move will-change-transform touch-manipulation transition-[bottom] duration-500 ease-in-out
          ${isStickyBarVisible ? 'bottom-28' : 'bottom-4'} 
          md:bottom-4
          hover:scale-105 active:scale-95 transition-transform duration-150
          ${deathType === 1 ? 'animate-shake' : ''} 
        `}
        style={{ 
          animationPlayState: deathType ? 'paused' : 'running',
          WebkitAnimationPlayState: deathType ? 'paused' : 'running'
        }}
        onClick={handleClick}
        onTouchStart={handleClick}
      >
        <div className="absolute -inset-8 bg-transparent z-50"></div>

        {/* SPEECH BUBBLE */}
        <div className={`absolute -top-16 left-1/2 -translate-x-1/2 origin-bottom z-20 pointer-events-none transition-all duration-300 ease-out ${speech ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
            <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-4 py-2 rounded-xl rounded-bl-none shadow-xl border border-white/20 ring-1 ring-black/5">
              <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-gray-800 dark:text-gray-100 whitespace-nowrap">
                  {speech}
              </span>
            </div>
        </div>

        {/* SVG WRAPPER */}
        <div className="w-full h-full animate-mascot-flip will-change-transform"
            style={{ animationPlayState: deathType ? 'paused' : 'running' }}>
          
          <div className="w-full h-full animate-breathe">
              <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible transition-transform duration-200">
              <defs>
                  <linearGradient id="avocadoBody" x1="15" y1="20" x2="85" y2="105" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#BEF264" />
                      <stop offset="100%" stopColor="#65A30D" />
                  </linearGradient>
                  <linearGradient id="avocadoSkin" x1="50" y1="0" x2="50" y2="120" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#166534" />
                      <stop offset="100%" stopColor="#14532D" />
                  </linearGradient>
                  <radialGradient id="pitGradient" cx="50" cy="70" r="18" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#92400E" />
                      <stop offset="100%" stopColor="#451A03" />
                  </radialGradient>
                  <linearGradient id="headlight" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="rgba(255,255,200,0.8)" />
                      <stop offset="100%" stopColor="rgba(255,255,200,0)" />
                  </linearGradient>
              </defs>

              {/* ================= DEATH SCENARIOS ================= */}

              {/* 1. ROCKS */}
              {deathType === 1 && (
                  <g>
                      <g className="origin-bottom">
                          <circle cx="20" cy="110" r="8" fill="#A8A29E" className="animate-[dust_0.8s_ease-out_0.3s_forwards] opacity-0" />
                          <circle cx="50" cy="110" r="14" fill="#78716C" className="animate-[dust_0.9s_ease-out_0.3s_forwards] opacity-0" />
                          <path d="M10 100 L0 110 L20 120 Z" fill="#57534E" className="animate-[dust_0.6s_ease-out_0.4s_forwards] opacity-0" />
                      </g>
                      <path d="M10 -80 L30 -90 L45 -40 L15 -30 Z" fill="#57534E" className="animate-[fall_0.4s_ease-in_forwards]" style={{ transformBox: 'fill-box' }} />
                      <path d="M-20 -200 L120 -200 L115 10 L80 35 L40 25 L-15 10 Z" fill="#44403C" stroke="#292524" strokeWidth="2" className="animate-[fall-big_0.25s_ease-in_forwards]" style={{ animationDelay: '0.1s', transformBox: 'fill-box' }} />
                  </g>
              )}

              {/* 2. LIGHTNING */}
              {deathType === 2 && (
                  <>
                    <g className="animate-[lightning-strike_0.4s_linear_forwards]" style={{ transformOrigin: '50% 100%' }}>
                       <path d="M40 -100 L65 -20 L30 10 L60 120" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" 
                             style={{ filter: 'drop-shadow(0 0 15px #FDE047) drop-shadow(0 0 30px #FDE047)' }} />
                       <path d="M65 -20 L80 10" stroke="#FEF08A" strokeWidth="3" />
                       <path d="M30 10 L10 50" stroke="#FEF08A" strokeWidth="3" />
                    </g>
                    <path d="M20 110 Q 50 80 80 110 Z" fill="#57534E" className="opacity-0 animate-[appear_0.1s_linear_0.3s_forwards]" />
                  </>
              )}

              {/* 3. SNOW */}
              {deathType === 3 && (
                  <g>
                      <circle cx="20" cy="-20" r="2" fill="white" className="animate-[snow-fall_1s_linear_forwards]" />
                      <circle cx="80" cy="-40" r="3" fill="white" className="animate-[snow-fall_1.2s_linear_forwards]" />
                      <circle cx="50" cy="-60" r="2" fill="white" className="animate-[snow-fall_0.8s_linear_forwards]" />
                      <path d="M-10 130 C -10 130, 20 130, 50 130 C 80 130, 110 130, 110 130 C 110 80, 90 50, 50 40 C 10 50, -10 80, -10 130 Z" fill="white" stroke="#E5E7EB" strokeWidth="2" className="animate-[snow-pile_0.8s_ease-out_forwards]" style={{ transformOrigin: 'bottom center' }} />
                  </g>
              )}

              {/* 4. EAGLE */}
              {deathType === 4 && (
                  <g className="animate-[eagle-swoop_2s_ease-in-out_forwards]">
                    <ellipse cx="50" cy="110" rx="30" ry="10" fill="black" opacity="0.2" className="animate-[shadow-pass_2s_ease-in-out_forwards]" />
                    <g transform="translate(10,0)">
                        <path d="M-30 -30 Q 10 20 40 -20 Q 70 20 110 -30 L 80 30 L 40 40 L 0 30 Z" fill="#451a03" />
                        <path d="M20 20 L 15 35 L 35 25 Z" fill="#f59e0b" />
                        <circle cx="25" cy="15" r="2" fill="white" />
                    </g>
                  </g>
              )}

              {/* 5. BEAR (NEW: FACE + PAW SWIPE) */}
              {deathType === 5 && (
                  <g className="animate-[bear-enter_0.6s_ease-out_forwards]" style={{ transformBox: 'fill-box' }}>
                      {/* BEAR HEAD (Peeking from Right) */}
                      <g transform="translate(60, 0)"> 
                          <circle cx="60" cy="50" r="40" fill="#5D4037" stroke="#3E2723" strokeWidth="2" /> {/* Head */}
                          <circle cx="35" cy="20" r="12" fill="#5D4037" /> {/* Left Ear */}
                          <circle cx="85" cy="20" r="12" fill="#5D4037" /> {/* Right Ear */}
                          
                          {/* Face Features */}
                          <ellipse cx="60" cy="65" rx="16" ry="12" fill="#D7CCC8" /> {/* Snout */}
                          <path d="M54 62 L 66 62 L 60 70 Z" fill="#2E1A16" /> {/* Nose */}
                          
                          {/* Angry Eyes */}
                          <g transform="rotate(10 45 45)">
                            <path d="M40 35 L 55 40" stroke="#2E1A16" strokeWidth="3" strokeLinecap="round" />
                            <circle cx="48" cy="45" r="3" fill="white" />
                            <circle cx="48" cy="45" r="1.5" fill="black" />
                          </g>
                          <g transform="rotate(-10 75 45)">
                             <path d="M65 40 L 80 35" stroke="#2E1A16" strokeWidth="3" strokeLinecap="round" />
                             <circle cx="72" cy="45" r="3" fill="white" />
                             <circle cx="72" cy="45" r="1.5" fill="black" />
                          </g>
                      </g>

                      {/* HUGE PAW SWIPE */}
                      <g className="animate-[paw-swipe_0.3s_ease-in_0.3s_forwards] opacity-0">
                           <path d="M120 10 Q 80 50 60 100 L 150 120 Z" fill="#5D4037" stroke="#3E2723" strokeWidth="3" />
                           {/* Claws */}
                           <path d="M65 70 L 50 80 L 70 85 Z" fill="#D7CCC8" />
                           <path d="M55 95 L 40 105 L 60 110 Z" fill="#D7CCC8" />
                      </g>
                  </g>
              )}

              {/* 6. JEEP */}
              {deathType === 6 && (
                  <g className="animate-[jeep-drive_1.4s_linear_forwards]" style={{ transform: 'translateX(350px)' }}>
                      <circle cx="130" cy="90" r="5" fill="#A8A29E" className="animate-[dust_1s_linear_infinite]" />
                      <circle cx="150" cy="80" r="8" fill="#A8A29E" className="animate-[dust_1s_linear_infinite]" style={{animationDelay: '0.1s'}} />
                      <g transform="scale(0.8)">
                          <path d="M-10 60 L 130 60 L 130 100 L -10 95 L -20 80 Z" fill="#2F3831" stroke="#181F1A" strokeWidth="2" />
                          <path d="M10 60 L 30 35 L 90 35 L 90 60" fill="#415245" stroke="#181F1A" strokeWidth="2" />
                          <path d="M-10 70 L -150 40 L -150 110 Z" fill="url(#headlight)" />
                          <circle cx="-15" cy="65" r="5" fill="#FBBF24" filter="blur(1px)" />
                      </g>
                      <g transform="translate(16, 80) scale(0.8)">
                          <circle cx="0" cy="0" r="18" fill="#111827" stroke="#000" strokeWidth="4" />
                          <path d="M-10 0 L10 0 M0 -10 L0 10" stroke="#374151" strokeWidth="2" className="animate-spin" style={{ animationDuration: '0.1s' }} />
                      </g>
                      <g transform="translate(80, 80) scale(0.8)">
                          <circle cx="0" cy="0" r="18" fill="#111827" stroke="#000" strokeWidth="4" />
                          <path d="M-10 0 L10 0 M0 -10 L0 10" stroke="#374151" strokeWidth="2" className="animate-spin" style={{ animationDuration: '0.1s' }} />
                      </g>
                  </g>
              )}

              {/* ================= CHARACTER BODY ================= */}
              <g className={`transition-all duration-300 
                  ${deathType === 1 ? 'animate-[squash_0.2s_ease-out_0.25s_forwards] origin-bottom' : ''} 
                  ${deathType === 2 ? 'animate-[burn_0.1s_linear_0.1s_forwards]' : ''} 
                  ${deathType === 3 ? 'animate-[freeze_1s_ease-out_forwards]' : ''} 
                  ${deathType === 4 ? 'animate-[carried-away_2s_ease-in-out_forwards]' : ''} 
                  ${deathType === 5 ? 'delay-[0.4s] animate-[knockout_0.4s_ease-out_forwards]' : ''} 
                  ${deathType === 6 ? 'animate-[hit-by-jeep_1s_linear_0.4s_forwards] origin-center' : ''}
              `}>
                  
                  {/* SKELETON */}
                  <g className={`opacity-0 ${deathType === 2 ? 'animate-[xray_0.2s_linear_forwards]' : ''}`}>
                     <path d="M50 30 L50 80 M40 90 L50 80 L60 90 M30 60 L50 40 L70 60" stroke="white" strokeWidth="3" />
                     <circle cx="50" cy="70" r="10" stroke="white" strokeWidth="2" fill="none"/>
                  </g>

                  {/* Normal Body */}
                  <g className={`${deathType === 2 ? 'animate-[flicker-out_0.2s_linear]' : ''}`}>
                    <g className={`origin-top ${deathType ? '' : 'animate-leg-wiggle'}`} style={{ transformOrigin: '50% 20%' }}>
                        <path d="M40 90 L30 110" stroke="#5D4037" strokeWidth="6" strokeLinecap="round" />
                        <path d="M30 110 L22 110" stroke="#5D4037" strokeWidth="6" strokeLinecap="round" />
                    </g>
                    <g className={`origin-top ${deathType ? '' : 'animate-leg-wiggle'}`} style={{ transformOrigin: '50% 20%' }}>
                        <path d="M60 90 L70 110" stroke="#5D4037" strokeWidth="6" strokeLinecap="round" />
                        <path d="M70 110 L78 110" stroke="#5D4037" strokeWidth="6" strokeLinecap="round" />
                    </g>
                    <path d="M25 60 L10 70" stroke="#5D4037" strokeWidth="5" strokeLinecap="round" />

                    <path d="M50 20 C20 20 10 50 15 80 C20 105 80 105 85 80 C90 50 80 20 50 20 Z" fill="url(#avocadoBody)" stroke="url(#avocadoSkin)" strokeWidth="2" />
                    <circle cx="50" cy="70" r="18" fill="url(#pitGradient)" />
                    <path d="M15 65 Q 50 85 85 65" stroke="#1F2937" strokeWidth="4" fill="none" strokeLinecap="round" filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.3))" />

                    {/* FACE */}
                    <circle ref={leftEyeRef} cx="42" cy="45" r="2.5" fill="#1F2937" /> 
                    <circle ref={rightEyeRef} cx="58" cy="45" r="2.5" fill="#1F2937" /> 
                    
                    {deathType ? (<circle cx="50" cy="52" r="4" fill="none" stroke="#1F2937" strokeWidth="1.5" />) : (<path d="M46 50 Q 50 53 54 50" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />)}
                    
                    <circle cx="36" cy="50" r="3" fill="#F472B6" opacity="0.6" /> 
                    <circle cx="64" cy="50" r="3" fill="#F472B6" opacity="0.6" /> 

                    <path d="M20 35 C20 15 35 5 50 5 C65 5 80 15 80 35" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
                    <path d="M18 35 L82 35" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
                    <path d="M75 60 L90 55" stroke="#5D4037" strokeWidth="5" strokeLinecap="round" />
                    <g transform="translate(88, 45) rotate(15)"><rect x="-2" y="0" width="4" height="40" rx="1" fill="#374151" /><path d="M-10 0 L10 0 L12 5 L-8 5 Z" fill="#9CA3AF" /></g>
                  </g>
              </g>
              </svg>
          </div>
        </div>
        
        {/* KEYFRAMES */}
        <style>{`
          @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px) rotate(-5deg); } 75% { transform: translateX(5px) rotate(5deg); } }
          
          @keyframes fall { 0% { transform: translateY(0); opacity: 0; } 10% { opacity: 1; } 100% { transform: translateY(130px) rotate(20deg); opacity: 1; } }
          @keyframes fall-big { 0% { transform: translateY(-100px); opacity: 0; } 20% { opacity: 1; } 100% { transform: translateY(135px); opacity: 1; } }
          @keyframes squash { 0% { transform: scaleY(1); } 100% { transform: scaleY(0.1) translateY(80px); opacity: 0; } }
          @keyframes dust { 0% { opacity: 0; transform: scale(0.2); } 30% { opacity: 0.8; } 100% { opacity: 0; transform: scale(2.0) translateY(-20px); } }
          
          @keyframes lightning-strike { 0% { opacity: 0; transform: scaleY(0); } 5% { opacity: 1; transform: scaleY(1); } 20% { opacity: 0.5; } 40% { opacity: 1; } 100% { opacity: 0; } }
          @keyframes burn { 0% { filter: none; } 50% { filter: grayscale(100%) brightness(0); } 100% { filter: grayscale(100%) brightness(0); opacity: 0; transform: scaleY(0.1) translateY(100px); } }
          @keyframes xray { 0% { opacity: 1; } 50% { opacity: 1; } 100% { opacity: 0; } }
          @keyframes flicker-out { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }
          
          @keyframes appear { to { opacity: 1; } }
          
          @keyframes snow-pile { 0% { transform: scaleY(0); } 100% { transform: scaleY(1); } }
          @keyframes snow-fall { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(150px); opacity: 0; } }
          @keyframes freeze { 0% { filter: none; } 100% { filter: hue-rotate(180deg) brightness(1.5); opacity: 0; } }
  
          @keyframes eagle-swoop { 0% { transform: translate(150px, -150px) scale(0.5); } 40% { transform: translate(40px, 40px) scale(1.2); } 100% { transform: translate(-150px, -200px) scale(0.8); } }
          @keyframes shadow-pass { 0% { transform: translate(150px, 0); opacity: 0; } 40% { transform: translate(0, 0); opacity: 0.3; } 100% { transform: translate(-150px, 0); opacity: 0; } }
          @keyframes carried-away { 0% { transform: translate(0, 0); } 40% { transform: translate(0, 0); } 100% { transform: translate(-140px, -190px) rotate(-20deg); } }
          
          /* BEAR ANIMATIONS */
          @keyframes bear-enter { 0% { transform: translateX(50px); opacity: 0; } 20% { opacity: 1; } 100% { transform: translateX(0); } }
          @keyframes paw-swipe { 0% { transform: translateX(20px) rotate(10deg); opacity: 0; } 20% { opacity: 1; } 100% { transform: translateX(-60px) rotate(-20deg); opacity: 1; } }
          @keyframes knockout { 0% { transform: translateX(0); } 20% { transform: translateX(-10px) rotate(-10deg); } 100% { transform: translateX(-200px) rotate(-360deg); opacity: 0; } }
  
          @keyframes jeep-drive { 0% { transform: translateX(350px); } 100% { transform: translateX(-350px); } }
          @keyframes hit-by-jeep { 0% { transform: translate(0,0); } 40% { transform: translate(0,0); } 100% { transform: translate(-300px, -100px) rotate(-720deg); opacity: 0; } }
  
          @keyframes flash-screen { 0% { opacity: 1; } 100% { opacity: 0; } }
        `}</style>
      </div>
    </>
  );
};

export default RunningMascot;