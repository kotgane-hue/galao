
import { Tour, TeamMember, GalleryItem, TourDate, Review } from './types';

type Language = 'ru' | 'en' | 'zh';

// Helper to generate date objects for 2026 (Single Day)
const createDates = (month: number, days: number[], totalSpots: number = 10): TourDate[] => {
  return days.map(day => ({
    startDate: `2026-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    endDate: `2026-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    totalSpots,
    bookedSpots: 0
  }));
};

// Helper to generate gallery images
const generateGallery = (id: string): string[] => {
  return Array.from({ length: 25 }, (_, i) => `/images/${id}/${i + 1}.webp`);
};

// --- SCHEDULES 2026 ---

// Kazbek (Multi-day)
const KAZBEK_DATES: TourDate[] = [
  { startDate: '2026-07-05', endDate: '2026-07-12', totalSpots: 5, bookedSpots: 0 },
  { startDate: '2026-07-20', endDate: '2026-07-27', totalSpots: 5, bookedSpots: 0 },
  { startDate: '2026-08-05', endDate: '2026-08-12', totalSpots: 5, bookedSpots: 0 },
  { startDate: '2026-08-20', endDate: '2026-08-27', totalSpots: 5, bookedSpots: 0 },
  { startDate: '2026-09-07', endDate: '2026-09-14', totalSpots: 5, bookedSpots: 0 },
];

// Karmadon (Upper Karmadon Springs) - 3 days
const KARMADON_DATES: TourDate[] = [
  { startDate: '2026-05-01', endDate: '2026-05-03', totalSpots: 10, bookedSpots: 0 },
  { startDate: '2026-05-29', endDate: '2026-05-31', totalSpots: 10, bookedSpots: 0 },
  { startDate: '2026-06-12', endDate: '2026-06-14', totalSpots: 10, bookedSpots: 0 },
  { startDate: '2026-07-10', endDate: '2026-07-12', totalSpots: 10, bookedSpots: 0 },
  { startDate: '2026-07-24', endDate: '2026-07-26', totalSpots: 10, bookedSpots: 0 },
  { startDate: '2026-08-07', endDate: '2026-08-09', totalSpots: 10, bookedSpots: 0 },
  { startDate: '2026-08-28', endDate: '2026-08-30', totalSpots: 10, bookedSpots: 0 },
  { startDate: '2026-09-04', endDate: '2026-09-06', totalSpots: 10, bookedSpots: 0 },
  { startDate: '2026-09-25', endDate: '2026-09-27', totalSpots: 10, bookedSpots: 0 },
  { startDate: '2026-10-23', endDate: '2026-10-25', totalSpots: 10, bookedSpots: 0 },
];

// Huppara Lake - 4 days
const HUPPARA_DATES: TourDate[] = [
  { startDate: '2026-05-28', endDate: '2026-05-31', totalSpots: 10, bookedSpots: 0 },
  { startDate: '2026-06-27', endDate: '2026-06-30', totalSpots: 10, bookedSpots: 0 },
  { startDate: '2026-07-16', endDate: '2026-07-19', totalSpots: 10, bookedSpots: 0 },
  { startDate: '2026-08-01', endDate: '2026-08-04', totalSpots: 10, bookedSpots: 0 },
  { startDate: '2026-08-13', endDate: '2026-08-16', totalSpots: 10, bookedSpots: 0 },
  { startDate: '2026-09-10', endDate: '2026-09-13', totalSpots: 10, bookedSpots: 0 },
  { startDate: '2026-09-17', endDate: '2026-09-20', totalSpots: 10, bookedSpots: 0 },
];

// Kaisar Waterfall and Lake - 3 days
const KAISAR_DATES: TourDate[] = [
  { startDate: '2026-06-05', endDate: '2026-06-07', totalSpots: 10, bookedSpots: 0 },
  { startDate: '2026-06-15', endDate: '2026-06-17', totalSpots: 10, bookedSpots: 0 },
  { startDate: '2026-07-03', endDate: '2026-07-05', totalSpots: 10, bookedSpots: 0 },
  { startDate: '2026-07-28', endDate: '2026-07-30', totalSpots: 10, bookedSpots: 0 },
  { startDate: '2026-08-03', endDate: '2026-08-05', totalSpots: 10, bookedSpots: 0 },
  { startDate: '2026-08-17', endDate: '2026-08-19', totalSpots: 10, bookedSpots: 0 },
  { startDate: '2026-09-11', endDate: '2026-09-13', totalSpots: 10, bookedSpots: 0 },
  { startDate: '2026-09-28', endDate: '2026-09-30', totalSpots: 10, bookedSpots: 0 },
];

// Fetkhuz
const FETKHUZ_DATES: TourDate[] = [
  ...createDates(3, [22, 29]),
  ...createDates(4, [12, 26]),
  ...createDates(5, [2, 10, 31]),
  ...createDates(6, [1, 21, 28]),
  ...createDates(9, [20, 27]),
  ...createDates(10, [4, 17, 25]),
  ...createDates(11, [7, 15, 22, 28]),
  ...createDates(12, [1, 7]),
];

// Kandyl-Khokh
const KANDYL_DATES: TourDate[] = [
  ...createDates(1, [10, 25]),
  ...createDates(2, [1, 8]),
  ...createDates(3, [7, 14, 28]),
  ...createDates(4, [4, 11, 19]),
  ...createDates(5, [1, 10, 16, 31]),
  ...createDates(9, [6, 13, 26]),
  ...createDates(10, [3, 11, 25]),
  ...createDates(11, [7, 21, 28]),
  ...createDates(12, [5, 13, 19]),
];

// Osman Lagat
const OSMAN_DATES: TourDate[] = [
  ...createDates(4, [5, 12, 25]),
  ...createDates(5, [2, 8, 24]),
  ...createDates(6, [5, 14]),
  ...createDates(9, [13, 19, 27]),
  ...createDates(10, [9, 12, 18, 30]),
  ...createDates(11, [7, 21, 28]),
  ...createDates(12, [6, 12]),
];

// Galdoridon
const GALDORIDON_DATES: TourDate[] = [
  ...createDates(3, [22, 29]),
  ...createDates(4, [11, 19, 26]),
  ...createDates(5, [3, 10, 23, 30]),
  ...createDates(6, [1, 7, 20, 30]),
  ...createDates(7, [1, 5, 16, 25, 30]),
  ...createDates(8, [4, 9, 10, 23, 31]),
  ...createDates(9, [6, 12, 26, 28]),
  ...createDates(10, [4, 17, 25]),
  ...createDates(11, [8, 12, 22, 30]),
  ...createDates(12, [1, 6, 12, 27]),
];

// Tsey Glacier
const TSEY_DATES: TourDate[] = [
  ...createDates(6, [20, 28, 30]),
  ...createDates(7, [1, 5, 16, 20, 25, 27]),
  ...createDates(8, [3, 7, 12, 20, 25, 30]),
  ...createDates(9, [1, 5, 11, 13, 19]),
];

// Zrug Lake
const ZRUG_DATES: TourDate[] = [
  ...createDates(4, [26, 30]),
  ...createDates(5, [2, 9, 16, 31]),
  ...createDates(6, [26, 29]),
  ...createDates(7, [3, 9, 13, 19, 23, 27]),
  ...createDates(8, [5, 15, 18, 23, 25, 30]),
  ...createDates(9, [5, 12, 20, 27]),
  ...createDates(10, [2, 10, 18, 31]),
  ...createDates(11, [8, 15, 22, 29]),
];

// Stolovaya
const STOLOVAYA_DATES: TourDate[] = [
  ...createDates(5, [1, 10, 30]),
  ...createDates(6, [5, 14, 20, 29]),
  ...createDates(7, [3, 8, 17, 20, 26, 28]),
  ...createDates(8, [4, 10, 15, 20, 23, 24, 30]),
  ...createDates(9, [5, 10, 13, 20, 26, 30]),
  ...createDates(10, [3, 10, 18, 25]),
  ...createDates(11, [1, 8, 15, 30]),
];

// Chyzdzhity-Khokh
const CHYZ_DATES: TourDate[] = [
  ...createDates(4, [18, 26]),
  ...createDates(5, [1, 10, 23, 30]),
  ...createDates(6, [6, 14]),
  ...createDates(9, [13, 20, 27]),
  ...createDates(10, [1, 4, 11, 15, 24]),
  ...createDates(11, [1, 8, 16, 22]),
  ...createDates(12, [5, 13]),
];

// Kubus
const KUBUS_DATES: TourDate[] = [
  ...createDates(4, [25, 30]),
  ...createDates(5, [2, 10, 30]),
  ...createDates(6, [27, 30]),
  ...createDates(7, [3, 5, 19, 22, 25, 31]),
  ...createDates(8, [2, 12, 16, 20, 23, 25, 29, 31]),
  ...createDates(9, [1, 6, 13, 20]),
  ...createDates(10, [3, 11, 25, 31]),
  ...createDates(11, [1, 8, 12, 14, 20, 30]),
];

// --- NEW TOURS DATES (SUMMER RANDOM) ---

const TBAY_DATES: TourDate[] = [
  ...createDates(6, [6, 13, 20, 27]),
  ...createDates(7, [4, 11, 18, 25]),
  ...createDates(8, [1, 8, 15, 22, 29]),
  ...createDates(9, [5, 12, 19]),
];

const KARIY_DATES: TourDate[] = [
  ...createDates(6, [7, 14, 21, 28]),
  ...createDates(7, [5, 12, 19, 26]),
  ...createDates(8, [2, 9, 16, 23, 30]),
  ...createDates(9, [6, 20]), // September dates
  ...createDates(10, [4, 11]), // October dates
];

const DASHSAR_DATES: TourDate[] = [
  ...createDates(6, [3, 17]),
  ...createDates(7, [1, 15, 29]),
  ...createDates(8, [12, 26]),
  ...createDates(9, [9, 23]),
];

const DASHSAR_KARI_DATES: TourDate[] = [
  ...createDates(7, [8, 22]),
  ...createDates(8, [5, 19]),
  ...createDates(9, [16]),
];


// KAZBEK PROGRAM & GEAR
const KAZBEK_PROGRAM_RU = [
  'День 1. Встреча участников в г.Владикавказ, трансфер в Геналдонское ущелье. Пеший переход к базовому лагерю (2300м).',
  'День 2. Переход в следующий лагерь на высоту 3500 по северо-западному контрфорсу.',
  'День 3. Переход в штурмовой лагерь на высоте 4200 метров.',
  'День 4. Днёвка. День восстановления и отдыха, подготовка к штурму. Есть возможность поднять на пик Полякова (ОЖД).',
  'День 5. Штурм. Ранний подъем. Восхождение на вершину Казбека и возвращение в лагерь.',
  'День 6. Спуск в базовый лагерь до горящих источников (верхние Кармадонские ванны).',
  'День 7. Спуск до с.Тменикау и возвращение в г.Владикавказ.',
  'День 8. Запасной день.',
  'ВНИМАНИЕ: В зависимости от погодных условий гид может менять программу восхождения, ибо безопасность прежде всего.'
];

const KAZBEK_GEAR_RU = `Альпинистское снаряжение:
— Палатка
— Каремат/пенка (коврик под спальник)
— Альпинистские кошки (12 зубьев, мягкие, либо полуавтоматические, подходящие под Ваш тип ботинок)
— Альпинистская каска, сертифицированная по стандарту UIAA
— Альпинистская страховочная система
— Три альпинистских карабина с муфтой
— Ус самостраховки
— Альпинистский ледоруб (классический, прямой)
— Налобный фонарик
— Плащ от дождя
— Треккинговые палки
— Горные очки (с фактором защиты не ниже 3)
— Термос объемом от 0,75 мл
Одежда:
— Альпинистские высотные ботинки (однослойные или двухслойные)
— Рюкзак объемом 80 литров и более
— Альпинистские гамаши
— Бахилы (полностью закрывающие ботинок)
— Теплый спальник (температура комфорта -5, -10)
— Мембранные брюки (Защита от ветра и паропропускная способность более 8 000 мм)
— Мембранная куртка (Защита от ветра и паропропускная способность более 8 000 мм)
— Пуховая куртка (плотность пуха 600+ или синтетические аналоги)
— Пуховые или горнолыжные брюки с утеплителем
— Пуховые рукавицы
— Сменная обувь (кроссовки или кроксы)
— Шапка (желательно с флисовой подкладкой)
— Балаклава/Бафф (тёплая)
— Головной убор (кепка, повязка, бафф)
— Флисовые перчатки
— Тонкие треккинговые носки 2 пары
— Теплые треккинговые или горнолыжные носки 2 пары
— Тонкое верхнее и нижнее термобелье
— Толстое верхнее и нижнее термобельё (POLARTEC)
— Флисовая кофта (доп. слой между курткой и термобельём)
Гигиена и посуда:
— Туалетная бумага (2 рулона)
— Влажная туалетная бумага (2 упаковки по 20 штук)
— Зубная щётка и паста
— Гигиеническая помада с УФ защитой
— Беруши (по желанию для тех, кто чутко спит)
— Крем от загара с уровнем защиты 50+
— Зажигалка (кремневая)
— Миска, кружка, ложка (пластиковые или железные)
Документы:
Паспорт, деньги (и карточка), телефон, медицинская страховка.
Лекарства:
Крем от солнечного загара, обезболивающее, индивидуальные препараты.
Рекомендуем взять с собой:
Личный перекус (от 10 батончиков шоколада и 400 гр. орехов, кураги и фиников дополнительно). При желании изотоник и витамин С.`;

const KAZBEK_PROGRAM_EN = [
  'Day 1. Meeting in Vladikavkaz, transfer to Genaldon Gorge. Trek to base camp (2300m).',
  'Day 2. Trek to the next camp at 3500m via NW buttress.',
  'Day 3. Trek to assault camp at 4200m.',
  'Day 4. Rest day / Acclimatization. Optional hike to Polyakov Peak.',
  'Day 5. Summit Day. Early start. Ascent to Kazbek summit and return to camp.',
  'Day 6. Descent to base camp (Karmadon springs).',
  'Day 7. Descent to Tmenikau village and return to Vladikavkaz.',
  'Day 8. Reserve day.',
  'ATTENTION: Depending on weather conditions, the guide may change the climbing program, because safety comes first.'
];

const KAZBEK_GEAR_EN = `Mountaineering equipment:
- Tent, Sleeping pad
- Crampons (12 points)
- Helmet (UIAA), Harness
- 3 Carabiners, Lanyard
- Ice axe (classic)
- Headlamp, Raincoat, Trekking poles
- Mountain sunglasses (Cat 3+)
- Thermos (0.75L+)
Clothing:
- Mountaineering boots
- Backpack (80L+)
- Gaiters, Warm sleeping bag (-10C)
- Membrane jacket & pants
- Down jacket, Warm pants, Mittens
- Thermal underwear (thin & thick)
- Fleece jacket
- Hat, Balaclava, Gloves
- Trekking socks (thin & warm)
Hygiene & Extras:
- Hygiene kit, Sunscreen (50+), Lip balm
- Mug, spoon, bowl
- Passport, Insurance, Personal meds
- Snacks (nuts, chocolate)`;


export const RAW_TOURS = [
  // --- ONE DAY TOURS ---
  { 
    id: 'tbayhoh', 
    image: '/images/tbayhoh/main.webp', 
    color: 'emerald', 
    category: 'one-day',
    gallery: generateGallery('tbayhoh')
  },
  { 
    id: 'kariyhoh', 
    image: '/images/Kariyhoh/main.webp', 
    color: 'purple', 
    category: 'one-day',
    gallery: generateGallery('Kariyhoh')
  },
  { 
    id: 'dashsar', 
    image: '/images/Dashsar/main.webp', 
    color: 'blue', 
    category: 'one-day',
    gallery: generateGallery('Dashsar')
  },
  { 
    id: 'dashsar-karihoh', 
    image: '/images/Dashsar-Karihoh/main.webp', 
    color: 'red', 
    category: 'one-day',
    gallery: generateGallery('Dashsar-Karihoh')
  },
  { 
    id: 'kubus', 
    image: '/images/kubus/main.webp', 
    color: 'emerald', 
    category: 'one-day',
    gallery: generateGallery('kubus')
  },
  { 
    id: 'tsey', 
    image: '/images/tsey/main.webp', 
    color: 'blue', 
    category: 'one-day',
    gallery: generateGallery('tsey')
  },
  { 
    id: 'chyzdzhyty-khokh', 
    image: '/images/chyzdzhyty-khokh/main.webp', 
    color: 'emerald', 
    category: 'one-day',
    gallery: generateGallery('chyzdzhyty-khokh')
  },
  { 
    id: 'fetkhuz', 
    image: '/images/fetkhuz/main.webp', 
    color: 'blue', 
    category: 'one-day',
    gallery: generateGallery('fetkhuz')
  },
  { 
    id: 'galdoridon', 
    image: '/images/galdoridon/main.webp', 
    color: 'emerald', 
    category: 'one-day',
    gallery: generateGallery('galdoridon')
  },
  { 
    id: 'osman-lagat', 
    image: '/images/osman-lagat/main.webp', 
    color: 'purple', 
    category: 'one-day',
    gallery: generateGallery('osman-lagat')
  },
  { 
    id: 'stolovaya', 
    image: '/images/stolovaya/main.webp', 
    color: 'red', 
    category: 'one-day',
    gallery: generateGallery('stolovaya')
  },
  { 
    id: 'zrug-lake', 
    image: '/images/zrug-lake/main.webp', 
    color: 'emerald', 
    category: 'one-day',
    gallery: generateGallery('zrug-lake')
  },
  { 
    id: 'kandyl-khokh', 
    image: '/images/kandyl-khokh/main.webp', 
    color: 'purple', 
    category: 'one-day',
    gallery: generateGallery('kandyl-khokh')
  },

  // --- MULTI DAY TOURS ---
  { 
    id: 'karmadon', 
    image: '/images/karmadon/main.webp', 
    color: 'purple', 
    category: 'multi-day',
    gallery: generateGallery('karmadon')
  },
  { 
    id: 'huppara', 
    image: '/images/huppara/main.webp', 
    color: 'orange', 
    category: 'multi-day',
    gallery: generateGallery('huppara')
  },
  { 
    id: 'kaisar', 
    image: '/images/kaisar/main.webp', 
    color: 'orange', 
    category: 'multi-day',
    gallery: generateGallery('kaisar')
  },
  { 
    id: 'kazbek', 
    image: '/images/kazbek/main.webp', 
    color: 'red', 
    category: 'multi-day',
    gallery: generateGallery('kazbek')
  },

  // --- PLACEHOLDERS FOR EMPTY CATEGORIES ---
  { 
    id: 'dev-jeep', 
    image: '/images/mainfoto/2.webp', 
    color: 'gray', 
    category: 'jeep', 
    gallery: [] 
  },
  { 
    id: 'dev-excursion', 
    image: '/images/mainfoto/3.webp', 
    color: 'gray', 
    category: 'excursion', 
    gallery: [] 
  },
  { 
    id: 'dev-gastro', 
    image: '/images/mainfoto/4.webp', 
    color: 'gray', 
    category: 'gastro', 
    gallery: [] 
  },
  { 
    id: 'dev-other', 
    image: '/images/mainfoto/5.webp', 
    color: 'gray', 
    category: 'other', 
    gallery: [] 
  }
];

const RAW_TEAM: TeamMember[] = [
  {
    id: 'vitaliy',
    name: 'Vitaliy',
    role: 'Guide',
    desc: 'Safety expert. Certified rescuer of the Ministry of Emergency Situations. Multiple successful ascents to Kazbek.',
    image: '/images/vitalik.webp',
    instagram: 'https://www.instagram.com/vitalii.alborov'
  },
  {
    id: 'roman',
    name: 'Roman',
    role: 'Guide Instructor',
    desc: 'Expert on Ossetia. 2nd category in mountaineering. Ultramarathon runner and skyrunner.',
    image: '/images/ROMAN.webp',
    instagram: 'https://www.instagram.com/dankevich__adventure'
  },
  {
    id: 'danil',
    name: 'Danil',
    role: 'Technical Expert',
    desc: 'Guide instructor. Ice climbing, rock climbing, ski mountaineering. Leads complex technical groups.',
    image: '/images/danilphoto.webp',
    instagram: 'https://www.instagram.com/'
  },
  {
    id: 'anastasia',
    name: 'Anastasia',
    role: 'Guide Organizer',
    desc: 'Soul of the team. In tourism since age 12. Artist-teacher and organizer of art trips.',
    image: '/images/anastasia.webp',
    instagram: 'https://www.instagram.com/belyaeva.mountains'
  },
  {
    id: 'konstantin',
    name: 'Konstantin',
    role: 'Guide Photographer',
    desc: 'Athlete. Mountaineer and cyclist. Captures the drive and mountains in photos/video.',
    image: '/images/konstantin.webp',
    instagram: 'https://www.instagram.com/kos_kor_a'
  },
  {
    id: 'avocado',
    name: 'Avocado',
    role: 'Club Mascot',
    desc: 'Chief of Atmosphere. A real mountain wolf (in plush skin). 3rd "plush" category climber.',
    image: '/images/avokado.webp',
    instagram: 'https://www.instagram.com/'
  }
];

const TEAM_TRANSLATIONS: Record<string, Record<Language, { name: string, role: string, desc: string }>> = {
  vitaliy: {
    ru: { 
      name: 'Виталий', 
      role: 'Гид. Эксперт по безопасности', 
      desc: 'Аттестованный спасатель ГУ МЧС РСО-Алания. Многократные успешные восхождения на Казбек в любых условиях. Гарант безопасности на маршруте.' 
    },
    en: { 
      name: 'Vitaliy', 
      role: 'Guide. Safety Expert', 
      desc: 'Certified rescuer of the Ministry of Emergency Situations. Multiple successful ascents to Kazbek in all conditions. Safety guarantor on the route.' 
    },
    zh: { 
      name: 'Vitaliy', 
      role: '向导。安全专家', 
      desc: '紧急情况部认证救援人员。在任何条件下多次成功攀登卡兹别克峰。路线安全保障。' 
    },
  },
  roman: {
    ru: { 
      name: 'Роман', 
      role: 'Гид-инструктор. Знаток Осетии', 
      desc: '2-й спортивный разряд по альпинизму. Регулярные восхождения на Эльбрус и Казбек. Ультрамарафонец и скайраннер — задает отличный темп и знает все ущелья республики.' 
    },
    en: { 
      name: 'Roman', 
      role: 'Guide Instructor. Ossetia Expert', 
      desc: '2nd sports category in mountaineering. Regular ascents to Elbrus and Kazbek. Ultramarathon runner and skyrunner — sets a great pace and knows all the gorges of the republic.' 
    },
    zh: { 
      name: 'Roman', 
      role: '向导教练。奥塞梯专家', 
      desc: '登山运动二级运动员。定期攀登厄尔布鲁士峰和卡兹别克峰。超级马拉松运动员和高空跑步者 —— 设定极佳的节奏并了解共和国的所有峡谷。' 
    },
  },
  danil: {
    ru: { 
      name: 'Данил', 
      role: 'Гид-инструктор. Технический эксперт', 
      desc: '2-й разряд (закрывает 1-й). В туризме с 2016 года. Ледолазание, скалолазание, ски-альпинизм. Водит сложные технические и коммерческие группы на вершины Кавказа.' 
    },
    en: { 
      name: 'Danil', 
      role: 'Guide Instructor. Technical Expert', 
      desc: 'In tourism since 2016. Ice climbing, rock climbing, ski mountaineering. Leads complex technical and commercial groups to the peaks of the Caucasus.' 
    },
    zh: { 
      name: 'Danil', 
      role: '向导教练。技术专家', 
      desc: '自2016年起从事旅游业。攀冰，攀岩，滑雪登山。带领复杂的技术和商业团队攀登高加索山峰。' 
    },
  },
  anastasia: {
    ru: { 
      name: 'Анастасия', 
      role: 'Гид-организатор. Душа команды', 
      desc: 'В походах с 12 лет, в профи-туризме с 2021 года. Трейлраннинг, сплавы, пещеры и горные переходы. Художник-преподаватель и организатор авторских арт-путешествий.' 
    },
    en: { 
      name: 'Anastasia', 
      role: 'Guide Organizer. Soul of the Team', 
      desc: 'In hiking since age 12, pro tourism since 2021. Trail running, rafting, caves. Artist-teacher and organizer of author\'s art trips.' 
    },
    zh: { 
      name: 'Anastasia', 
      role: '向导组织者。团队灵魂', 
      desc: '12岁开始徒步，2021年进入专业旅游。越野跑，漂流，洞穴。艺术家教师和艺术旅行组织者。' 
    },
  },
  konstantin: {
    ru: { 
      name: 'Константин', 
      role: 'Гид. Фотограф. Спортсмен', 
      desc: 'Альпинист (3 разряд), велогонщик (шоссе и МТБ). Снимает горы и драйв. Превращает тяжелый подъем в захватывающий фото- и видеоконтент.' 
    },
    en: { 
      name: 'Konstantin', 
      role: 'Guide. Photographer. Athlete', 
      desc: 'Mountaineer (3rd category), cyclist (road and MTB). Captures mountains and drive. Turns a hard climb into exciting photo and video content.' 
    },
    zh: { 
      name: 'Konstantin', 
      role: '向导。摄影师。运动员', 
      desc: '登山者（三级），自行车手（公路和山地）。拍摄山脉和激情。将艰难的攀登转化为激动人心的照片和视频内容。' 
    },
  },
  avocado: {
    ru: { 
      name: 'Авокадо', 
      role: 'Талисман клуба. Главный по атмосфере', 
      desc: 'Настоящий горный волк (в плюшевой шкуре). Альпинист 3-го «плюшевого» разряда. Миссия: Поднимать настроение там, где кончаются силы.' 
    },
    en: { 
      name: 'Avocado', 
      role: 'Club Mascot. Chief of Atmosphere', 
      desc: 'A real mountain wolf (in plush skin). Climber of the 3rd "plush" category. Mission: To raise spirits where strength ends.' 
    },
    zh: { 
      name: 'Avocado', 
      role: '俱乐部吉祥物。气氛主管', 
      desc: '真正的山狼（披着毛绒皮）。第三“毛绒”级登山者。使命：在力量耗尽的地方提振精神。' 
    },
  }
};

// Helper to generate random date between May-July for years 2023, 2024, 2025
const getRandomDate = () => {
  const year = 2023 + Math.floor(Math.random() * 3); // 2023, 2024, 2025
  const month = 4 + Math.floor(Math.random() * 3); // 4 (May), 5 (June), 6 (July)
  const day = 1 + Math.floor(Math.random() * 28);
  return new Date(year, month, day).toLocaleDateString('ru-RU');
};

export const REVIEWS_DATA: Review[] = [
  {
    author: 'Алексей',
    rating: 5,
    text: 'Восхождение на Казбек с Виталием — это проверка себя на прочность. Было сложно, ветер сбивал с ног, но когда стоишь на вершине (5033м) и видишь под собой облака — это непередаваемо. Организация безопасности на высоте.',
    date: getRandomDate(),
    avatar: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    author: 'Семья Смирновых',
    rating: 5,
    text: 'Ходили в "Кубусскую кругосветку" с детьми. Маршрут идеален для знакомства с Дигорией. Лес сказочный, водопады мощные. Гид Анастасия увлекла детей рассказами, так что они даже не заметили, как прошли весь путь.',
    date: getRandomDate(),
    avatar: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    author: 'Дмитрий',
    rating: 5,
    text: 'Кармадонские ванны — это место силы. После треккинга окунуться в горячие источники с видом на ледник Майли — лучший релакс. Ночевка в палатках под таким звездным небом запомнится на всю жизнь.',
    date: getRandomDate(),
    avatar: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    author: 'Елена',
    rating: 5,
    text: 'Цейский ледник поражает своим масштабом. Тропа через сосновый лес очень живописная, дышится невероятно легко. Спасибо Роману за интересный темп и отличные фотографии!',
    date: getRandomDate(),
    avatar: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    author: 'Игорь',
    rating: 5,
    text: 'Тур на Столовую гору. Подъем затяжной, но вид на Владикавказ и Казбек с плато стоит каждого шага. Древний храм Мят-Сели добавляет мистики. Очень атмосферное место.',
    date: getRandomDate(),
    avatar: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    author: 'Марина и Олег',
    rating: 5,
    text: 'Мидаграбинские водопады — это мощь! Казалось, вода падает прямо с неба. Спасибо команде за комфортный трансфер и вкусный осетинский обед на природе.',
    date: getRandomDate(),
    avatar: 'https://images.unsplash.com/photo-1534008236166-70cb65885b5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  }
];

const GENERIC_TRANSLATIONS: Record<Language, {
  groupSizeOneDay: string;
  groupSizeMulti: string;
  diff: string[];
  titles: string[];
  descs: string;
  prog: string[];
  gear: string;
}> = {
  ru: {
    groupSizeOneDay: 'до 15 человек',
    groupSizeMulti: 'до 10 человек',
    diff: ['Легкий', 'Средний', 'Сложный', 'Экстрим'],
    titles: Array.from({ length: 20 }, (_, i) => `Тур ${i + 1}`),
    descs: 'Увлекательное путешествие по живописным местам Северной Осетии. Вас ждут незабываемые виды и яркие эмоции.',
    prog: [
      'Встреча участников',
      'Трансфер к началу маршрута',
      'Активная часть маршрута',
      'Обед с видом на горы',
      'Возвращение'
    ],
    gear: 'Удобная обувь, ветровка, головной убор, солнцезащитные очки, крем от загара, вода.'
  },
  en: {
    groupSizeOneDay: 'up to 15 people',
    groupSizeMulti: 'up to 10 people',
    diff: ['Easy', 'Medium', 'Hard', 'Extreme'],
    titles: Array.from({ length: 20 }, (_, i) => `Tour ${i + 1}`),
    descs: 'An exciting journey through the picturesque places of North Ossetia. Unforgettable views and vivid emotions await you.',
    prog: [
      'Meeting participants',
      'Transfer to the start',
      'Active part of the route',
      'Lunch with a view',
      'Return'
    ],
    gear: 'Comfortable shoes, windbreaker, hat, sunglasses, sunscreen, water.'
  },
  zh: {
    groupSizeOneDay: '最多15人',
    groupSizeMulti: '最多10人',
    diff: ['简单', '中等', '困难', '极限'],
    titles: Array.from({ length: 20 }, (_, i) => `路线 ${i + 1}`),
    descs: '北奥塞梯风景名胜的激动人心的旅程。难忘的景色和生动的情感等着你。',
    prog: [
      '会议参加者',
      '转移到起点',
      '路线的活动部分',
      '有风景的午餐',
      '返回'
    ],
    gear: '舒适的鞋子，防风衣，帽子，墨镜，防晒霜，水。'
  }
};

export const getTours = (lang: Language): Tour[] => {
  return RAW_TOURS.map((tour, index) => {
    // Determine common properties first
    const isKazbek = tour.id === 'kazbek';
    const isMultiDay = tour.category === 'multi-day';
    const isDev = tour.id.startsWith('dev-');
    
    // Assign schedules based on ID
    let dates: TourDate[] | undefined;
    if (tour.id === 'kazbek') dates = KAZBEK_DATES;
    else if (tour.id === 'karmadon') dates = KARMADON_DATES;
    else if (tour.id === 'huppara') dates = HUPPARA_DATES;
    else if (tour.id === 'fetkhuz') dates = FETKHUZ_DATES;
    else if (tour.id === 'kandyl-khokh') dates = KANDYL_DATES;
    else if (tour.id === 'osman-lagat') dates = OSMAN_DATES;
    else if (tour.id === 'galdoridon') dates = GALDORIDON_DATES;
    else if (tour.id === 'tsey') dates = TSEY_DATES;
    else if (tour.id === 'zrug-lake') dates = ZRUG_DATES;
    else if (tour.id === 'stolovaya') dates = STOLOVAYA_DATES;
    else if (tour.id === 'chyzdzhyty-khokh') dates = CHYZ_DATES;
    else if (tour.id === 'kubus') dates = KUBUS_DATES;
    else if (tour.id === 'kaisar') dates = KAISAR_DATES;
    // New tours
    else if (tour.id === 'tbayhoh') dates = TBAY_DATES;
    else if (tour.id === 'kariyhoh') dates = KARIY_DATES;
    else if (tour.id === 'dashsar') dates = DASHSAR_DATES;
    else if (tour.id === 'dashsar-karihoh') dates = DASHSAR_KARI_DATES;

    const gen = GENERIC_TRANSLATIONS[lang];
    
    // Group size logic
    let groupSizeInfo = gen.groupSizeOneDay;
    if (isMultiDay) groupSizeInfo = gen.groupSizeMulti;
    if (isKazbek) groupSizeInfo = lang === 'ru' ? '5 человек на гида' : '5 people per guide';
    if (isDev) groupSizeInfo = '';

    // Calculate Defaults
    let diff = gen.diff[0]; // Easy
    if (index > 8) diff = gen.diff[1]; // Medium
    
    // Overrides based on instructions
    if (isKazbek) diff = gen.diff[3]; // Extreme
    else if (isMultiDay && tour.id !== 'karmadon') diff = gen.diff[1]; // Multi-day -> Medium (except Karmadon)
    else if (tour.id === 'karmadon') diff = gen.diff[0]; // Karmadon -> Easy
    if (isDev) diff = lang === 'ru' ? 'В разработке' : 'Coming Soon';

    const titleIndex = Math.max(0, index - 2); 
    const title = gen.titles[titleIndex] || 'Tour';

    // Pricing & Duration Logic based on category
    const isStandardOneDay = ['one-day', 'jeep', 'excursion', 'gastro', 'other'].includes(tour.category);
    
    const defaultPrice = isStandardOneDay ? '3 500 ₽' : '12 000 ₽';
    const defaultDuration = isStandardOneDay ? (lang === 'ru' ? '1 день' : '1 day') : (lang === 'ru' ? '3+ дня' : '3+ days');
    const defaultLocation = lang === 'ru' ? 'Осетия' : 'Ossetia';
    const defaultDistance = '10-20 km';

    let tourData = { ...tour, dates, groupSizeInfo } as Tour;

    // 1. Check for specific translation in TOUR_TRANSLATIONS
    if (TOUR_TRANSLATIONS[tour.id] && TOUR_TRANSLATIONS[tour.id][lang]) {
      const translation = TOUR_TRANSLATIONS[tour.id][lang];
      return { 
        ...tourData,
        // Defaults that might be missing from RAW_TOURS or translation
        difficulty: diff,
        location: defaultLocation,
        distance: isDev ? '—' : defaultDistance,
        program: isDev ? [] : gen.prog,
        gear: isDev ? '' : gen.gear,
        reviews: [],
        // Spread translation to override defaults if present
        ...translation,
        // Override price/duration logic
        price: isDev ? '—' : (translation.price || defaultPrice),
        duration: isDev ? '—' : (translation.duration || defaultDuration),
        // Ensure dev items have placeholder content if translation didn't provide specific override
        ...(isDev ? {
             title: translation.title || (lang === 'ru' ? 'В разработке' : (lang === 'zh' ? '开发中' : 'In Development')),
             desc: translation.desc || (lang === 'ru' ? 'Мы готовим новые уникальные маршруты.' : 'We are preparing new unique routes.'),
             program: [],
             gear: '',
             distance: '—'
        } : {})
      } as Tour;
    }
    
    // 2. Generic fallback logic
    return {
      ...tourData,
      title: isDev ? (lang === 'ru' ? 'В разработке' : (lang === 'zh' ? '开发中' : 'In Development')) : title,
      price: isDev ? '—' : defaultPrice,
      duration: isDev ? '—' : defaultDuration,
      difficulty: diff,
      location: defaultLocation,
      distance: isDev ? '—' : defaultDistance,
      desc: isDev ? (lang === 'ru' ? 'Мы готовим новые уникальные маршруты.' : 'We are preparing new unique routes.') : gen.descs,
      program: isDev ? [] : gen.prog,
      gear: isDev ? '' : gen.gear,
      reviews: []
    } as Tour;
  });
};

export const getTeam = (lang: Language): TeamMember[] => {
  return RAW_TEAM.map(member => {
    const trans = TEAM_TRANSLATIONS[member.id];
    if (trans && trans[lang]) {
      return { ...member, ...trans[lang] };
    }
    return {
       ...member,
       name: member.id.charAt(0).toUpperCase() + member.id.slice(1),
       role: lang === 'ru' ? 'Гид' : 'Guide',
       desc: lang === 'ru' ? 'Профессионал своего дела.' : 'Professional guide.'
    };
  });
};

// Motivational phrases for the Gallery
const MOTIVATIONAL_PHRASES = [
  "Горы зовут тех, чья душа им по росту",
  "Лучше гор могут быть только горы",
  "Счастье не за горами, оно в горах",
  "Вершина — это только начало",
  "Дыши полной грудью",
  "Оставь суету внизу",
  "Твой путь к себе",
  "Выше облаков",
  "Свобода быть собой",
  "Момент вечности"
];

// Generate gallery items (1 to 10) from local folder 'galagon'
export const GALLERY_DATA: GalleryItem[] = Array.from({ length: 10 }, (_, i) => ({
  id: String(i + 1),
  src: `/images/galagon/${i + 1}.webp`,
  alt: MOTIVATIONAL_PHRASES[i] || 'Галагон Тревел', // Fallback if phrases run out
  large: false
}));

const TOUR_TRANSLATIONS: Record<string, Record<Language, Partial<Tour>>> = {
  tbayhoh: {
    ru: {
      title: 'Тбау-Хох: Восхождение к истокам легенды',
      location: 'Скалистый хребет',
      difficulty: 'Средний',
      duration: '1 день',
      price: '4 000 ₽',
      shortDesc: 'Покорите вершину, изображенную на знаменитой бутылке воды «Тбау». Панорамный вид на Казбек, альпинистский драйв и прикосновение к священной горе Осетии за один день.',
      desc: 'Тбау-Хох — это не просто гора, это символ чистоты и мощи. Именно этот скалистый массив фильтрует ледниковую воду, которая попадает на столы по всей России под брендом «Тбау». Но смотреть на неё снизу или с этикетки — это одно, а стоять на вершине, когда облака проплывают под ногами — совсем другое. Это восхождение — вызов для сильных духом и возможность увидеть Главный Кавказский хребет как на ладони.\n\nTRAVEL-DOSSIER: Факты и История:\n\nЛокация: Северная Осетия, Скалистый хребет. Гора возвышается между Куртатинским и Гизельдонским ущельями, доминируя над пейзажем.\n\nТип: Карстовый массив. Гора сложена из юрских известняков и доломитов, которые действуют как гигантский природный фильтр, рождая знаменитые родники.\n\nВысоты: Абсолютная высота — 2980 метров над уровнем моря. Перепад высот на маршруте ощутимый, требует выносливости.\n\nЭтимология: Название «Тбау» связывают с древним святилищем, находившимся в этом районе (Тбау-Уацилла). В осетинской мифологии гора почиталась как место обитания духа, покровительствующего воинам и охотникам.\n\nАльпинизм: Тбау-Хох — классическая вершина для выполнения разрядов. Маршруты здесь варьируются от простых пешеходных (1Б категории сложности) до серьезных скальных стен для профи. Наш путь пройдет по классическому маршруту, доступному людям в хорошей физической форме.\n\nПанорама: С вершины открывается один из лучших видов на пятитысячник Казбек, гору Джимара и «Город мертвых» Даргавс.',
      gear: 'Треккинговые ботинки с высоким голенищем (обязательно!)\nТреккинговые палки (снижают нагрузку на колени)\nВетрозащитная куртка и флиска (на вершине ветрено)\nСолнцезащитные очки и крем (SPF 50)\nГоловной убор (кепка/бафф)\nРюкзак 20-30 литров\nВода (минимум 1.5 литра) и перекус'
    },
    en: {
      title: 'Tbau-Khokh: Ascent to the Legend',
      location: 'Rocky Ridge',
      difficulty: 'Medium',
      duration: '1 day',
      price: '4 000 ₽',
      desc: 'Conquer the peak depicted on the famous "Tbau" water bottle. Tbau-Khokh is a symbol of purity and power. This rocky massif acts as a giant natural filter, birthing famous springs. From the summit (2980m), you get one of the best views of Mount Kazbek and the "City of the Dead" in Dargavs.',
      gear: 'Trekking boots (high ankle)\nTrekking poles\nWindproof jacket & fleece\nSunglasses & Sunscreen (SPF 50)\nHat\nBackpack 20-30L\nWater (1.5L+) & Snacks'
    },
    zh: {
      title: 'Tbau-Khokh：攀登传奇',
      location: '岩石岭',
      difficulty: '中等',
      duration: '1天',
      price: '4 000 ₽',
      desc: '征服著名的“Tbau”水瓶上描绘的山峰。Tbau-Khokh 是纯洁和力量的象征。这座岩石山体就像一个巨大的天然过滤器，孕育了著名的泉水。从山顶（2980米）可以看到卡兹别克山和达尔加夫斯“死城”的最佳景色之一。',
      gear: '登山靴（高帮）\n登山杖\n防风夹克和抓绒衣\n太阳镜和防晒霜 (SPF 50)\n帽子\n背包 20-30升\n水 (1.5升以上) 和零食'
    }
  },
  kariyhoh: {
    ru: {
      title: 'Восхождение на Кариу-Хох: Тропа к облакам',
      location: 'Скалистый хребет',
      difficulty: 'Сложный',
      duration: '1 день',
      price: '5 000 ₽',
      shortDesc: 'Классический маршрут на высшую точку Скалистого хребта (3439 м). Без экстремального лазания, но с серьезным набором высоты. Панорамные виды на 360 градусов и проверка вашей выносливости.',
      desc: 'Кариу-Хох — это «Эверест» районного масштаба. Гора, которая доминирует над пейзажем и притягивает взгляд своим силуэтом «Спящего медведя». Классический маршрут позволяет подняться на эту высоту без альпинистского снаряжения и риска, присущего экстремальным траверсам. Но не обольщайтесь: это настоящая мужская (и женская) работа. Долгий, упорный подъем вверх, шаг за шагом, сквозь альпийские луга и каменные осыпи. Награда — чувство победы и вид, от которого захватывает дух: вся Осетия и Главный Кавказский хребет как на ладони.\n\nTRAVEL-DOSSIER: Факты\n\nЛокация: Северная Осетия, Ирафский район. Одна из высочайших вершин Скалистого хребта.\n\nСпецифика: Маршрут проходит по явной тропе, без скалолазания и опасных обрывов. Главная сложность здесь — физическая нагрузка. Вам предстоит долго идти вверх.\n\nВысоты: Вершина — 3 439 метров. Зона альпийского редколесья сменяется суровыми каменистыми пейзажами.\n\nМифология: На вершине, по преданию, находится святилище Фалвара — покровителя скота. Это место силы, где принято просить о благополучии и мире.\n\nПанорама: С вершины открывается, пожалуй, лучший вид на Дигорское ущелье, массив Караугомского ледника и легендарную гору Уаза-Хох.',
      gear: 'Треккинговые ботинки (Обязательно разношенные)\nТреккинговые палки (Критически важны!)\nВетровка / Мембрана\nФлисовая кофта\nДождевик\nГоловной убор и очки\nРюкзак 25-30 литров\nВода (Минимум 2 литра) и сытный перекус'
    },
    en: {
      title: 'Climbing Kariu-Khokh: Trail to the Clouds',
      location: 'Rocky Ridge',
      difficulty: 'Hard',
      duration: '1 day',
      price: '5 000 ₽',
      desc: 'Classic route to the highest point of the Rocky Ridge (3439m). No extreme climbing, but strict physical test. "Sleeping Bear" silhouette dominates the landscape. A long, persistent climb through alpine meadows and scree slopes. The reward is a breath-taking 360-degree view of Ossetia and the Main Caucasian Ridge.',
      gear: 'Trekking boots (broken in)\nTrekking poles (Critical!)\nWindbreaker / Membrane\nFleece jacket\nRaincoat\nHat and sunglasses\nBackpack 25-30L\nWater (Min 2L) & Snacks'
    },
    zh: {
      title: '攀登 Kariu-Khokh：云端之路',
      location: '岩石岭',
      difficulty: '困难',
      duration: '1天',
      price: '5 000 ₽',
      desc: '岩石岭最高点（3439米）的经典路线。没有极限攀登，但对体能有严格要求。“沉睡的熊”轮廓主宰着风景。穿过高山草甸和碎石坡的长途跋涉。奖励是令人叹为观止的奥塞梯和主高加索山脉的360度全景。',
      gear: '登山靴（磨合过的）\n登山杖（关键！）\n防风衣/膜衣\n抓绒衣\n雨衣\n帽子和墨镜\n背包 25-30升\n水（最少2升）和零食'
    }
  },
  dashsar: {
    ru: {
      title: 'Дашсар: Вершина Тишины',
      location: 'Куртатинское ущелье',
      difficulty: 'Средний',
      duration: '1 день',
      price: '3 800 ₽',
      shortDesc: 'Эстетичный треккинг на вершину 2868 м. Маршрут проходит через древние руины и цветущие альпийские поля. Идеальный баланс физической нагрузки и созерцания.',
      desc: 'Дашсар — менее популярная, но невероятно красивая вершина. Здесь меньше туристов, чем на Столовой горе, поэтому вы остаетесь наедине с природой. Тропа ведет мимо старинных родовых башен, через зоны, где можно встретить горных туров и хищных птиц. С вершины открывается уникальный ракурс на Кариу-Хох и Тбау-Хох.',
      gear: 'Треккинговая обувь\nДождевик\nГоловной убор\nРюкзак\nВода'
    },
    en: {
      title: 'Dashsar: Peak of Silence',
      location: 'Kurtatin Gorge',
      difficulty: 'Medium',
      duration: '1 day',
      price: '3 800 ₽',
      desc: 'Aesthetic trekking to the summit of 2868 m. The route passes through ancient ruins and blooming alpine fields. Perfect balance of physical activity and contemplation.',
      gear: 'Trekking shoes\nRaincoat\nHat\nBackpack\nWater'
    },
    zh: {
      title: 'Dashsar：寂静之峰',
      location: 'Kurtatin 峡谷',
      difficulty: '中等',
      duration: '1天',
      price: '3 800 ₽',
      desc: '攀登 2868 米山峰的美学徒步旅行。路线穿过古老的废墟和盛开的高山原野。体育活动与沉思的完美平衡。',
      gear: '登山鞋\n雨衣\n帽子\n背包\n水'
    }
  },
  'dashsar-karihoh': {
    ru: {
      title: 'Траверс Дашсар — Кариу-Хох',
      location: 'Скалистый хребет',
      difficulty: 'Сложный',
      duration: '1 день',
      price: '5 000 ₽',
      shortDesc: 'Ультимативный маршрут для сильных духом. Проход по гребню Скалистого хребта, соединяющий две знаковые вершины. Весь день на высоте, весь день над облаками.',
      desc: 'Это маршрут-мечта для любителей долгих переходов. Мы поднимаемся на Дашсар, а затем не спускаемся вниз, а идем по гребню к массиву Кариу-Хох. Это путешествие "по лезвию ножа": слева и справа обрывы, а впереди — бесконечная панорама гор. Требует отличной физической формы и уверенности на скальном рельефе.',
      gear: 'Горные ботинки (жесткая подошва)\nКаска (рекомендуется)\nТреккинговые палки\nМембранная одежда\nПерчатки\nЗапас воды (минимум 2л)\nЭнергетические гели/батончики'
    },
    en: {
      title: 'Traverse Dashsar — Kariu-Khokh',
      location: 'Rocky Ridge',
      difficulty: 'Hard',
      duration: '1 day',
      price: '5 000 ₽',
      desc: 'Ultimate route for the strong-spirited. Ridge walk connecting two iconic peaks. All day at altitude, all day above the clouds. Requires excellent fitness.',
      gear: 'Mountain boots\nHelmet (recommended)\nTrekking poles\nMembrane clothing\nGloves\nWater reserve (min 2L)\nEnergy gels/bars'
    },
    zh: {
      title: '穿越 Dashsar — Kariu-Khokh',
      location: '岩石岭',
      difficulty: '困难',
      duration: '1天',
      price: '5 000 ₽',
      desc: '强者的终极路线。连接两座标志性山峰的山脊行走。整天在海拔高度，整天在云端之上。需要极好的体能。',
      gear: '登山靴\n头盔（推荐）\n登山杖\n膜衣\n手套\n水储备（最少2升）\n能量胶/棒'
    }
  },
  kubus: {
    ru: { 
      title: 'Кубусская кругосветка', 
      location: 'Дигория', 
      difficulty: 'Легкий', 
      duration: '1 день', 
      price: '3 200 ₽', 
      shortDesc: 'Главный панорамный маршрут Горной Дигории. Путешествие по кругу через заколдованный сосновый лес на вершину горы Кубус, спуск в ледниковую долину реки Танадон и выход к подножию легендарных водопадов «Три Сестры». Концентрация красоты на каждый километр пути зашкаливает.',
      desc: 'Амфитеатр богов Этот маршрут — как симфония в трех частях. Часть первая: Лесная сказка. Подъем на гору Кубус начинается в реликтовом сосновом лесу. Здесь всегда царит полумрак, а воздух настолько плотный от аромата хвои и смолы, что кажется осязаемым. Корни вековых сосен переплетаются на тропе, создавая причудливые ступени. Вы выходите на смотровую площадку «Медвежий угол» и замираете: перед вами открывается грандиозный скальный амфитеатр, где ледники сползают прямо в зеленые долины.\n\nЧасть вторая: Ледяное дыхание Тана. Обогнув вершину Кубуса (или поднявшись на неё), вы спускаетесь в сторону ущелья Танадон. Здесь пейзаж меняется: лес отступает, открывая вид на мощный язык ледника Тана. Вы видите, как эта гигантская ледяная река, изрезанная трещинами, медленно умирает, рождая бурную реку. Ветер здесь всегда холодный — он несет прохладу с вечных снегов вершины Лабода.\n\nЧасть третья: Слезы Таймази. Финал маршрута — выход на поляну Таймази, к подножию массива, с которого срываются Водопады «Три Сестры». Зрелище гипнотическое: три белоснежные нити воды падают параллельно друг другу с черных отвесных скал высотой в триста метров. На фоне суровой стены горы Таймази они кажутся хрупкими, пульсирующими венами. Вода разбивается о камни, долетая до земли уже в виде водяной пыли, которая в солнечный день превращается в сплошную радугу. Это место, где хочется лечь в траву и просто смотреть, как движется вода.\n\nTRAVEL-DOSSIER: Факты\n\nЛокация: Северная Осетия, Ирафский район, Горная Дигория (бассейн реки Харес).\n\nТип маршрута: Кольцевой треккинг («Кругосветка» вокруг горы Кубус).\n\nКлючевые точки:\n\nГора Кубус: Высота 2 340 м. Покрыта сосновым лесом, является лучшей обзорной точкой района.\n\nЛедник Тана (Моска): Долинный ледник массива Лабода. Один из самых доступных для наблюдения ледников Дигории.\n\nВодопады «Три Сестры» (Таймазинские): Три параллельных каскада, питающиеся ледником Восточный Таймази. Высота падения воды — около 300 метров.\n\nГора Таймази: Высота главной вершины — 3 424 м.\n\nСложность: Средняя. Маршрут доступен физически активным людям. Набор высоты плавный, проходит по лесным и альпийским тропам.\n\nСезонность: Июнь — Октябрь. Осенью (в конце сентября – октябре) Кубус особенно красив: хвоя контрастирует с золотом лиственных деревьев, а вершины уже припорошены свежим снегом.',
      program: [
        '07:00 — Старт из Владикавказа в Дигорское ущелье. Остановки у арт-объектов.', 
        '10:00 — Начало «Кругосветки». Подъем к перевалу и на вершину Кубус (2340 м).', 
        'Смотровая площадка: вид на горный амфитеатр и водопады «Три сестры». Сосна желаний.',
        'Обед с видом на горы. Спуск к перевалу.',
        'Траверс склона через густой хвойный лес над каньоном реки Танадон.',
        'Финал: вид на ледники Тана и Таймази. Спуск к машине и возвращение.'
      ], 
      gear: 'Треккинговые ботинки (обязательно!)\nСинтетическая футболка, легкие штаны, головной убор\nДождевик/мембранная куртка\nРюкзак (10–30 л), термос, вода, сидушка\nПаспорт РФ (оригинал)' 
    },
    en: { 
      title: 'Kubus Round Trip', 
      location: 'Digoria', 
      difficulty: 'Easy', 
      duration: '1 day', 
      price: '3 200 ₽', 
      desc: 'Mount Kubus is the heart of Digoria. This circular route takes you around the mountain, through pine forests, offering views of Tana and Taimazi glaciers and the Three Sisters waterfalls.', 
      program: [
        '07:00 — Departure from Vladikavkaz to Digoria.',
        '10:00 — Start. Ascent to the pass and Kubus summit (2340 m).',
        'Viewpoint for waterfalls and glaciers. Wishing pine tree.',
        'Lunch with mountain views.',
        'Descent through pine forest and Tanadon river canyon.',
        'Return to Vladikavkaz.'
      ], 
      gear: 'Trekking boots\nSynthetic shirt, light pants\nHat, raincoat\nBackpack, thermos, water, seat pad\nPassport (border zone)' 
    },
    zh: { 
      title: '库布斯环游', 
      location: '迪戈里亚', 
      difficulty: '简单', 
      duration: '1天', 
      price: '3 200 ₽', 
      desc: '库布斯山是迪戈里亚的心脏。这条环形路线带您绕山而行，穿过松林，欣赏塔纳和泰马齐冰川以及三姐妹瀑布的景色。', 
      program: [
        '07:00 — 从弗拉季高加索出发前往迪戈里亚。',
        '10:00 — 开始。攀登至山口和库布斯峰顶（2340米）。',
        '瀑布和冰川的观景点。许愿松。',
        '山景午餐。',
        '穿过松林和塔纳顿河峡谷下山。',
        '返回弗拉季高加索。'
      ], 
      gear: '登山鞋\n合成衬衫，轻便裤子\n帽子，雨衣\n背包，保温瓶，水，坐垫\n护照（边境区）' 
    },
  },
  'chyzdzhyty-khokh': {
    ru: {
      title: 'Гора Чызджыты-хох',
      location: 'Даргавс',
      difficulty: 'Средний',
      duration: '1 день',
      price: '3 000 ₽',
      shortDesc: 'Каменный монумент чести в Скалистом хребте. Вершина высотой 2823 метра, разделяющая Куртатинское и Гизельдонское ущелья. Гора с узнаваемым зазубренным силуэтом, овеянная трагической легендой о непокоренных аланских девушках.',
      desc: 'Застывший хоровод над пропастью Чызджыты-хох притягивает взгляд своей странной, «рукотворной» архитектурой. Это не классическая пирамида, а сложный, изрезанный гребень, который на закате выглядит как вереница человеческих фигур, идущих по лезвию ножа.\n\nГора стоит на стыке миров: она служит водоразделом между двумя главными долинами Осетии. С одной стороны — древний Даргавс, с другой — солнечный Фиагдон. Поднимаясь сюда (или наблюдая за ней с перевала), вы видите, как облака цепляются за острые скальные жандармы, словно пытаясь укрыть их белой вуалью.\n\nЗдесь, на высоте почти трех километров, ветер гудит в скалах, как орган. Известняковые породы под действием эррозии приобрели причудливые формы: башни, шпили, статуи. Когда солнце уходит за горизонт, тени удлиняются, и кажется, что каменные фигуры на вершине оживают. Это место, где невероятной визуальной драмы — суровое, гордое и немного печальное.\n\nTRAVEL-DOSSIER: Факты и Легенды\n\nЛокация: Республика Северная Осетия — Алания. Центральная часть Скалистого хребта. Расположена в междуречье рек Фиагдон и Гизельдон.\n\nВысота: 2 823 м над уровнем моря.\n\nЭтимология: В переводе с осетинского: Чызг — девушка, Чызджыты — девушек (родительный падеж мн. ч.), Хох — гора. Буквально: «Гора Дев» или «Девичья гора».\n\nЛегенда: Предание (относящееся ко временам нашествия персидского шаха Аббаса или Хромого Тимура) гласит, что группа девушек из окрестных сел, спасаясь от врагов, убежала высоко в горы. Оказавшись на краю пропасти и видя приближающуюся погоню, они взмолились Богу, прося превратить их в камни, но не отдать на поругание врагу. Молитва была услышана — девушки застыли каменными изваяниями, которые сегодня образуют причудливый гребень вершины.\n\nГеология: Гора сложена верхнеюрскими известняками и доломитами. Характерный «зубчатый» рельеф — результат выветривания карстующихся пород.\n\nВизуальный маркер: Вершина хорошо видна с дороги на Даргавс (через перевал Кахтисар) и со стороны селения Лац в Куртатинском ущелье.',
      program: [
        '07:00 — Выезд из Владикавказа через живописное Кармадонское ущелье.',
        '08:30 — Начало подъема. Крутой набор высоты (1000м) по альпийским лугам.',
        'Осмотр причудливых каменных останцев на склонах.',
        'Штурм вершины (2880 м). Панорамный привал и перекус.',
        'Спуск к машине и возвращение во Владикавказ.'
      ],
      gear: 'Треккинговые ботинки (обязательно!)\nТреккинговые палки (рекомендуется)\nГоловной убор, очки, крем от загара\nРюкзак, вода (1.5л), ветровка\nПаспорт РФ'
    },
    en: {
      title: 'Chyzdzhity-Khokh',
      location: 'Dargavs',
      difficulty: 'Medium',
      duration: '1 day',
      price: '3 000 ₽',
      desc: 'Chyzdzhity-Khokh (Maiden Mountain) offers the best panorama of Ossetia. From the summit (2880m), you can see the City of the Dead (Dargavs) like a toy town and the wall of glaciers led by Kazbek.',
      program: [
        '07:00 — Departure from Vladikavkaz via Karmadon Gorge.',
        '08:30 — Start of ascent. Steep climb (1000m gain) through alpine meadows.',
        'Viewing stone pillars ("petrified maidens").',
        'Summit (2880m). Rest with a panoramic view.',
        'Descent and return to Vladikavkaz.'
      ],
      gear: 'Trekking boots (mandatory)\nTrekking poles (highly recommended)\nHat, sunglasses, sunscreen\nBackpack, water (1.5L), windbreaker\nPassport'
    },
    zh: {
      title: '少女山',
      location: '达尔加夫斯',
      difficulty: '中等',
      duration: '1天',
      price: '3 000 ₽',
      desc: '少女山提供奥塞梯最好的全景。从山顶（2880米），您可以像看玩具城一样看到死者之城（达尔加夫斯）和以卡兹别克为首的冰川墙。',
      program: [
        '07:00 — 经卡尔马顿峡谷从弗拉季高加索出发。',
        '08:30 — 开始攀登。穿过高山草甸的陡峭攀登（升高1000米）。',
        '观看石柱（"石化的少女"）。',
        '登顶（2880米）。全景休息。',
        '下山并返回弗拉季高加索。'
      ],
      gear: '登山鞋（必须）\n登山杖（强烈推荐）\n帽子，墨镜，防晒霜\n背包，水（1.5升），防风衣\n护照'
    }
  },
  tsey: {
    ru: { 
      title: 'Цейский ледник', 
      location: 'Цей', 
      difficulty: 'Легкий', 
      duration: '1 день', 
      price: '3 500 ₽', 
      shortDesc: 'Самый доступный «язык вечности» на Кавказе. Гигантская ледяная река длиной 8 километров, которая спускается прямо в зону хвойного леса. Место, где лето встречается с зимой, а из-под многотонной ледяной арки с ревом рождается река Цейдон.',
      desc: 'Голубой лед в изумрудной оправе Маршрут к Цейскому леднику — это не просто треккинг, это сеанс ароматерапии и визуального восторга. Тропа, названная «Экологической», петляет сквозь вековой сосновый бор. Воздух здесь настолько густой от запаха хвои и смолы, что его хочется есть ложкой. Под ногами пружинит мягкий ковер из игл и мха, а над головой, словно страж в капюшоне, нависает гора Монах.\n\nПостепенно лес расступается, и декорации меняются. Вы выходите в каменистое русло реки, где воздух мгновенно остывает на несколько градусов. Впереди, в обрамлении гранитных скал, лежит ОН — Цейский ледник. Вблизи он не белый, а грязно-серый от каменной пыли, но стоит подойти к разломам или гроту — и вы увидите его истинный цвет. Глубокий, светящийся изнутри неоново-голубой оттенок. Это спрессованное время.\n\nЗдесь, у подножия ледяной стены, вы слышите, как гора «дышит». Ледник живой: он трещит, стонет, внутри него перекатываются камни. Из гигантской ледяной арки (грота) с мощным гулом вырывается поток ледяной воды — начало реки Цейдон. Стоять рядом с этой мощью страшно и притягательно: вы чувствуете холодное дыхание тысячелетней мерзлоты на своем лице, даже если на термометре +25.\n\nTRAVEL-DOSSIER: Факты\n\nЛокация: Северная Осетия, Алагирский район. Верховья Цейского ущелья. Территория Северо-Осетинского государственного заповедника.\n\nТип: Долинный ледник. Один из крупнейших и наиболее низко опускающихся ледников Кавказа.\n\nВысоты:\n\nЯзык ледника (нижняя точка) спускается до отметки ~2 200 метров над уровнем моря.\n\nФирновые поля (зона питания) лежат на высоте 3 800 – 4 000 метров и выше.\n\nРазмеры: Длина ледника — около 8,6 км, площадь льда — более 9 кв. км.\n\nДинамика: Ледник активно отступает (тает) из-за глобального потепления. Ежегодно кромка льда уходит вверх на несколько метров, обнажая «бараньи лбы» — гладкие, отшлифованные льдом скалы.\n\nОкружение: Ледник питается снегами с вершин Адай-Хох (4408 м) и Уилпата (4649 м).\n\nДоступность: К подножию ведет маркированная эко-тропа (вход платный, так как это заповедник). Путь через лес и курумник (камни) занимает около 2–3 часов в одну сторону. Спецснаряжение для подхода к языку не требуется, но заходить в ледяной грот категорически запрещено (высокий риск обрушения льда).',
      program: [
        'Трансфер из Владикавказа в Цейское ущелье.', 
        'Старт на специально размеченной экологической тропе через сосновый лес.', 
        'Выход к нижнему языку Цейского ледника. Вид на ледяной грот.',
        'Лёгкий перекус на природе с видом на вершины.',
        'Возвращение во Владикавказ.'
      ], 
      gear: 'Удобные треккинговые ботинки или кроссовки с хорошим протектором\nСинтетическая футболка, легкие брюки, головной убор\nВетровка/мембранная куртка\nРюкзак (10–30 л), очки, крем, термос, паспорт' 
    },
    en: { title: 'Tsey Glacier', location: 'Tsey', difficulty: 'Easy', duration: '1 day', price: '3 200 ₽', desc: 'Visit one of the most accessible glaciers in the Caucasus.', program: ['Eco-trail', 'Glacier', 'Lunch'], gear: 'Comfortable shoes, sunglasses' },
    zh: { title: '采伊冰川', location: '采伊', difficulty: '简单', duration: '1天', price: '3 200 ₽', desc: '参观高加索地区最容易到达的冰川之一。', program: ['生态步道', '冰川', '午餐'], gear: '舒适的鞋子，墨镜' },
  },
  kazbek: {
    ru: { 
      title: 'Восхождение на Казбек', 
      location: 'Кармадон', 
      difficulty: 'Экстрим', 
      duration: '8 дней', 
      price: '55 000 ₽', 
      desc: 'Восхождение на Казбек со стороны России — это серьёзный вызов и настоящее приключение в условиях высокогорья. Маршрут проходит по северному склону и считается более интересным и диким. Вас ждут грандиозные виды Большого Кавказа, ледники и ночёвки выше облаков.', 
      program: KAZBEK_PROGRAM_RU, 
      gear: KAZBEK_GEAR_RU 
    },
    en: { 
      title: 'Mount Kazbek Climbing', 
      location: 'Karmadon', 
      difficulty: 'Extreme', 
      duration: '8 days', 
      price: '55 000 ₽', 
      desc: 'Climbing one of the highest peaks of the Caucasus (5033 m). A complete reboot and challenge for yourself.', 
      program: KAZBEK_PROGRAM_EN, 
      gear: KAZBEK_GEAR_EN 
    },
    zh: { 
      title: '攀登卡兹别克山', 
      location: 'Karmadon', 
      difficulty: '极限', 
      duration: '8天', 
      price: '55 000 ₽', 
      desc: '攀登高加索最高峰之一（5033米）。', 
      program: KAZBEK_PROGRAM_EN, 
      gear: KAZBEK_GEAR_EN 
    },
  },
  kaisar: {
    ru: {
      title: 'Кайсарский водопад',
      location: 'Дигория',
      difficulty: 'Средний',
      duration: '3 дня',
      price: '12 000 ₽',
      desc: 'Откройте для себя скрытую красоту отдаленных ущелий горной Дигории. Маршрут проходит через грандиозный каньон Кайсарского ущелья к живописному водопаду и озеру, расположенному на высоте 3100 метров в окружении ледников и заснеженных вершин.',
      program: [
        'День 1. Ранний выезд из Владикавказа в с.Дунта. Переход через лесной массив вдоль реки Сонгутидон. Ночевка на берегу.',
        'День 2. Подъем по узкой тропе над каньоном. Панорама водопада. Переход через альпийские луга к озеру (3100м). Ночевка у озера.',
        'День 3. Завтрак с видом на ледник. Спуск в село Дунта и возвращение во Владикавказ.'
      ],
      gear: 'Рюкзак, палатка, спальник, каремат\nТреккинговая обувь\nТеплая одежда (флис, куртка)\nДождевик\nЛичная посуда и гигиена'
    },
    en: {
      title: 'Kaisar Falls',
      location: 'Digoria',
      difficulty: 'Medium',
      duration: '3 days',
      price: '12 000 ₽',
      desc: 'Discover the hidden beauty of remote gorges in mountainous Digoria. The route goes through the grandiose canyon of the Kaisar Gorge to a picturesque waterfall and lake located at an altitude of 3100 meters surrounded by glaciers and snowy peaks.',
      program: [
        'Day 1. Early departure from Vladikavkaz to Dunta village. Trek through the forest along the Songutidon River. Overnight on the bank.',
        'Day 2. Climb along a narrow path above the canyon. Panorama of the waterfall. Trek across alpine meadows to the lake (3100m). Overnight by the lake.',
        'Day 3. Breakfast with a view of the glacier. Descent to Dunta village and return to Vladikavkaz.'
      ],
      gear: 'Backpack, tent, sleeping bag, mat\nTrekking shoes\nWarm clothes (fleece, jacket)\nRaincoat\nPersonal tableware and hygiene'
    },
    zh: {
      title: '凯萨尔瀑布',
      location: '迪戈里亚',
      difficulty: '中等',
      duration: '3天',
      price: '12 000 ₽',
      desc: '探索迪戈里亚山区偏远峡谷的隐藏之美。这条路线穿过凯萨尔峡谷宏伟的峡谷，通往位于海拔3100米、被冰川和雪峰环绕的风景如画的瀑布和湖泊。',
      program: [
        '第1天。清晨从弗拉季高加索出发前往Dunta村。沿着Songutidon河穿越森林。在河岸过夜。',
        '第2天。沿着峡谷上方的狭窄小径攀登。瀑布全景。穿越高山草甸前往湖泊（3100米）。在湖边过夜。',
        '第3天。欣赏冰川景色的早餐。下山至Dunta村并返回弗拉季高加索。'
      ],
      gear: '背包，帐篷，睡袋，垫子\n登山鞋\n保暖衣物（抓绒，夹克）\n雨衣\n个人餐具和卫生用品'
    }
  },
  karmadon: {
    ru: {
      title: 'Верхние Кармадонские ванны',
      location: 'Кармадон',
      difficulty: 'Легкий',
      duration: '3 дня',
      price: '15 000 ₽',
      shortDesc: 'Геотермальный оазис на пути к Казбеку. Дикие горячие источники на высоте 2300 метров, где можно лежать в дымящейся каменной ванне, глядя, как снег срывается с ледника Майли. Контраст, от которого закипает кровь.',
      desc: 'Горячее сердце ледника Чтобы попасть сюда, нужно пройти через суровое Геналдонское ущелье. Пейзаж здесь аскетичный, порой пугающий своими масштабами: серые морены, следы схода ледника Колка и рев реки, перемалывающей камни. Это путь преодоления.\n\nНо в конце маршрута вас ждет чудо. Среди холодного камня и снежников из земли бьет кипяток. Ванны представляют собой несколько выложенных камнями чаш под открытым небом. Вода в них мутновато-бирюзовая, пахнет сероводородом и нагретыми минералами — специфический, «аптечный» запах недр земли.\n\nСамый сильный момент — это погружение. Когда вы, уставший после подъема, опускаете тело в горячую (до +45°C и выше) воду, мышцы моментально расслабляются. Вы лежите в природном кипятке, а над головой нависает ледяной язык ледника Майли. Пар от воды смешивается с туманом, создавая ощущение полной нереальности происходящего. Особенно остро это чувствуется в сумерках, когда горы становятся синими, а над паром загораются первые звезды.\n\nTRAVEL-DOSSIER: Факты\n\nЛокация: Северная Осетия, Кармадонское (Геналдонское) ущелье. Верховья реки Геналдон, у подножия ледника Майли.\n\nВысота: Источники расположены на высоте ~2 300 метров над уровнем моря.\n\nТемпература: Вода в источниках термальная, температура варьируется в разных ваннах от +40°C до +60°C.\n\nСостав: Минеральные воды вулканического происхождения (хлоридно-натриевые).\n\nМаршрут: Это пеший маршрут. От пограничного поста (с. Тменикау) нужно пройти около 6–7 км (в одну сторону) с набором высоты. Тропа идет по широкой долине, затем переходит в узкую тропу над обрывом.\n\nВажный нюанс (Hard Skill):\n\nПогранзона: Ванны находятся в непосредственной близости от границы с Грузией. Наличие паспорта РФ обязательно (проверяют на посту). Иностранцам требуется заранее оформленный пропуск.\n\nНижние vs Верхние: Важно не путать. Есть Нижние Кармадонские ванны (были уничтожены ледником Колка в 2002 году, сейчас восстанавливаются энтузиастами, но это другое место) и Верхние (о которых идет речь, до них ледник не дошел).\n\nАльпинизм: Именно здесь проходит классический маршрут восхождения на гору Казбек (5033 м) с севера. Ванны — традиционное место ночевки и акклиматизации альпинистов.',
      program: [
        'День 1. Трансфер в Кармадон, переход к источникам (2300м).',
        'День 2. Отдых, купание в ваннах, прогулка к языку ледника Майли.',
        'День 3. Спуск по ущелью и возвращение во Владикавказ.'
      ],
      gear: 'Треккинговая обувь, рюкзак, спальник, купальные принадлежности, теплая одежда.'
    },
    en: {
      title: 'Karmadon Springs',
      location: 'Karmadon',
      difficulty: 'Easy',
      duration: '3 days',
      price: '15 000 ₽',
      desc: 'A journey to one of the most impressive places in North Ossetia — the Upper Karmadon Thermal Springs. The route passes through the Genaldon Gorge, which preserves traces of the Kolka glacier slide, and leads to the foot of the Maili glacier, where hot springs gush straight from the bowels of the earth.',
      program: [
        'Day 1. Transfer to Karmadon, trek to the springs (2300m).',
        'Day 2. Rest, bathing in the baths, walk to the tongue of the Maili glacier.',
        'Day 3. Descent along the gorge and return to Vladikavkaz.'
      ],
      gear: 'Trekking shoes, backpack, sleeping bag, swimwear, warm clothes.'
    },
    zh: {
      title: '卡尔马顿温泉',
      location: '卡尔马顿',
      difficulty: '简单',
      duration: '3天',
      price: '15 000 ₽',
      desc: '前往北奥塞梯最令人印象深刻的地方之一——上卡尔马顿温泉。路线穿过保留着Kolka冰川滑坡痕迹的Genaldon峡谷，通往Maili冰川脚下，那里热泉直接从地底喷涌而出。',
      program: [
        '第1天。前往卡尔马顿，徒步至温泉（2300米）。',
        '第2天。休息，泡温泉，步行至Maili冰川舌。',
        '第3天。沿峡谷下山并返回弗拉季高加索。'
      ],
      gear: '登山鞋，背包，睡袋，泳衣，保暖衣物。'
    }
  },
  stolovaya: {
    ru: {
      title: 'Столовая гора',
      location: 'Джейрах',
      difficulty: 'Сложный',
      duration: '1 день',
      price: '3 500 ₽',
      shortDesc: 'Геологический амфитеатр на границе Ингушетии и Северной Осетии. Священное плато высотой 3000 метров, где древняя архитектура спорит с вечностью, а панорама Кавказского хребта переписывает ваше представление о масштабе.',
      desc: 'На спине каменного гиганта Кандыл-Хох — это гора с характером и узнаваемым лицом. Пока другие вершины соревнуются в высоте, эта берет своей формой. Огромные пласты известняка, деформированные миллионы лет назад, сложились в фигуру, напоминающую исполинского жука с мощным панцирем.\n\nПрогулка по крыше мира Это место ломает стереотипы о горах. Здесь нет острого пика, к которому нужно карабкаться из последних сил. Вместо этого небеса подпирает гигантский каменный стол — Мят-Лоам.\n\nПодъем сюда — это путешествие сквозь климатические зоны. Вы начинаете путь в густом аромате нагретого солнцем чабреца и рододендрона, но чем выше, тем прозрачнее и «хрустящее» становится воздух. Звуки мира внизу исчезают, уступая место звенящей тишине, которую нарушает лишь свист ветра в ушах да клекот орлов.\n\nСтупив на плато, вы попадаете в иное измерение. Ощущение сюрреалистичное: вы идете по ровной, как степь, земле, но под ногами проплывают облака. С одной стороны, как на ладони, лежит игрушечный Владикавказ, с другой — ослепительно сияет ледниками Казбек. Контраст белого снега, синего неба и охристых скал здесь настолько резок, что пейзаж кажется нарисованным.\n\nВ центре этого природного величия стоит рукотворный шедевр — древнее святилище Мят-Сели. Шершавые, покрытые лишайником камни хранят тепло рук, сложивших их полтысячелетия назад. Здесь предки говорили с небом на равных. Стоя у этих стен, вы чувствуете не просто высоту, а густую, осязаемую энергию времени. Это идеальная точка, чтобы налить чай из термоса и молча смотреть, как тени облаков скользят по ущельям, меняя геометрию гор.\n\nTRAVEL-DOSSIER: Факты и Легенды\n\nЛокация: Скалистый хребет, граница Республики Ингушетия и РСО-Алания.\n\nВысота: 2 993 м над уровнем моря (высшая точка).\n\nГеология: Классическая «столовая гора» (тип меза). Вершина представляет собой плато, обрывающееся отвесными стенами. Порода — юрские известняки, бывшее дно древнего океана Тетис.\n\nИстория: На вершине находятся руины языческих святилищ, главное из которых — Мят-Сели (ориентировочно XV–XVI вв.). До конца XIX века здесь проводились ежегодные моления о дожде и урожае, куда поднимались старейшины родов.\n\nЛегенда: Согласно преданию, Бог специально выровнял вершину этой горы своей ладонью, чтобы создать место для отдыха ангелов или божественных пиршеств, недоступное для простых смертных.\n\nИнтересный факт: Силуэт Столовой горы изображен на гербе города Владикавказа, являясь его главным природным символом, хотя географически вершина находится на территории Ингушетии.',
      program: [
        '07:00 — Выезд из Владикавказа в Джейрахский район.',
        'Начало восхождения от с. Бейни по серпантину.',
        'Посещение древнего святилища Мят-Сели и горного озера.',
        'Штурм вершины (2998 м). Обед с панорамным видом.',
        '19:00 — Спуск и возвращение во Владикавказ.'
      ],
      gear: 'Треккинговая обувь\nВетровка/дождевик\nРюкзак, вода, перекус\nПаспорт (приграничная зона)'
    },
    en: {
      title: 'Table Mountain',
      location: 'Dzheyrah',
      difficulty: 'Hard',
      duration: '1 day',
      price: '3 500 ₽',
      desc: 'Table Mountain (Myat-Loam) is a sacred mountain and a natural symbol. You will walk the path of ancestors to the ancient sanctuary of Myat-Seli, see places where wild yaks roam, and find yourself on a flat summit (2998m) with views of Kazbek and Elbrus.',
      program: [
        '07:00 — Departure from Vladikavkaz to Dzheyrah district.',
        'Start of the ascent from Beyni village along the serpentine.',
        'Visit to the ancient sanctuary Myat-Seli and mountain lake.',
        'Summit assault (2998 m). Lunch with panoramic view.',
        '19:00 — Descent and return to Vladikavkaz.'
      ],
      gear: 'Trekking shoes\nWindbreaker/raincoat\nBackpack, water, snacks\nPassport (border zone)'
    },
    zh: {
      title: '桌山',
      location: 'Dzheyrah',
      difficulty: '困难',
      duration: '1天',
      price: '3 500 ₽',
      desc: '桌山 (Myat-Loam) 是一座神山和自然象征。你将沿着祖先的道路前往古老的Myat-Seli圣所，看到野生牦牛漫游的地方，并登上平坦的山顶（2998米），眺望卡兹别克山和厄尔布鲁士山。',
      program: [
        '07:00 — 从弗拉季高加索出发前往Dzheyrah区。',
        '从Beyni村沿蜿蜒小路开始攀登。',
        '参观古老的Myat-Seli圣所和山地湖泊。',
        '冲顶（2998米）。全景午餐。',
        '19:00 — 下山并返回弗拉季高加索。'
      ],
      gear: '登山鞋\n防风衣/雨衣\n背包，水，零食\n护照（边境区）'
    }
  },
  fetkhuz: {
    ru: {
      title: 'Фетхуз',
      shortDesc: 'Главная панорамная точка Владикавказа. Вершина высотой 1745 метров, укрытая изумрудным лесом, откуда открывается лучший вид на «Врата Кавказа» и геометрию города, лежащего у ног как на ладони.',
      desc: 'Зеленый балкон Алании Фетхуз — это гора-интроверт, которая не кричит о своем величии скальными пиками, а мягко обнимает город своими зелеными склонами. Восхождение сюда — это погружение в густую, влажную прохладу широколиственного леса.\n\nТропа петляет сквозь буки и грабы, где даже в полдень царит полумрак, а воздух пахнет грибницей и мокрой корой. Вы поднимаетесь под аккомпанемент лесной акустики, пока внезапно деревья не расступаются, выпуская вас на простор альпийских лугов. Здесь случается тот самый момент катарсиса: горизонт распахивается на 360 градусов.\n\nВнизу, в глубоком каньоне, свинцовой лентой извивается Терек. С такой высоты его рев превращается в монотонный гул, задающий ритм всему пейзажу. Прямо перед вами — зев Дарьяльского ущелья, легендарный проход в Закавказье, зажатый между скалистыми гигантами. Обернувшись, вы видите Владикавказ: с высоты Фетхуза город превращается в идеальный архитектурный макет, расчерченный проспектами, который к вечеру вспыхивает тысячами огней, отражаясь в низких облаках.\n\nНа вершине всегда ветрено. Этот ветер несет запах озона с ледников и сладость горного разнотравья. Фетхуз дает редкое ощущение: вы находитесь на границе двух миров — упорядоченной цивилизации и дикой, первозданной стихии гор.\n\nTRAVEL-DOSSIER: Факты и Легенды\n\nЛокация: Республика Северная Осетия — Алания, южная окраина Владикавказа (над поселком Балта).\n\nВысота: 1 745 м над уровнем моря.\n\nГеография: Относится к Пастбищному хребту (Вторая гряда Крымско-Кавказской горной системы).\n\nГеология: Гора сложена осадочными породами — известняками и доломитами. В середине XX века здесь велась активная добыча доломита, следы старых карьеров видны на склонах и сегодня, напоминая античные террасы.\n\nЭтимология: Название имеет несколько трактовок. Самая распространенная версия перевода с осетинского — «Луковая гора» (из-за обилия дикого лука на склонах).\n\nЭкология: Фетхуз часто называют «легкими Владикавказа». Благодаря особому расположению и розе ветров, именно с его лесистых склонов в город по ночам спускается свежий, обогащенный фитонцидами воздух, проветривая улицы.\n\nИнтересный факт: Это одна из немногих вершин в окрестностях, доступная для восхождения круглый год без специального альпинистского снаряжения, что делает её идеальной для встречи рассветов.',
    },
    en: { title: 'Fetkhuz', desc: 'A unique combination of light trekking to the summit of Fetkhuz and a national Ossetian feast overlooking the city. Pies, herbal tea and sunset.' },
    zh: { title: 'Fetkhuz', desc: '轻度徒步至Fetkhuz山顶与俯瞰城市的奥塞梯民族盛宴的独特结合。馅饼，凉茶和日落。' }
  },
  'kandyl-khokh': {
    ru: {
      title: 'Гора Кандыл-Хох',
      shortDesc: 'Самый необычный «житель» Дарьяльского ущелья. Гора высотой 1744 метра, чей силуэт с трассы безошибочно напоминает гигантского жука, ползущего по склону. Панорамная точка, с которой Военно-Грузинская дорога кажется тонкой нитью.',
      desc: 'На спине каменного гиганта Кандыл-Хох — это гора с характером и узнаваемым лицом. Пока другие вершины соревнуются в высоте, эта берет своей формой. Огромные пласты известняка, деформированные миллионы лет назад, сложились в фигуру, напоминающую исполинского жука с мощным панцирем.\n\nПодъем сюда — это прогулка по «спине» этого каменного существа. Маршрут начинается от бурных вод Терека и уводит вверх, к солнцу. Здесь нет густых лесов, скрывающих обзор: только простор, ветер и скалы, прогретые южным солнцем.\n\nНа вершине (1744 м) вас ждет «эффект дрона». Вы стоите над пропастью, где ревет Терек, а прямо напротив вздымаются суровые стены Скалистого хребта. Это лучшее место, чтобы увидеть, как узкое горло Дарьяльского ущелья — легендарных «Врат Алан» — раскрывается навстречу долине. Здесь, сидя на краю обрыва, чувствуешь себя не покорителем природы, а её гостем, которому дозволили взглянуть на мир с плеча великана.\n\nTRAVEL-DOSSIER: Факты и Источники\n\nЛокация: Республика Северная Осетия — Алания. Правобережье реки Терек, южнее селения Верхний Ларс (Чми).\n\nВысота: 1 744 м.\n\nЭтимология: Название Кандыл-Хох переводится с осетинского как «Жук-гора».\n\nИсточник: Твердый А. В. «Топонимический словарь Кавказа».\n\nВизуальный образ: Ороним (название горы) идеально соответствует её визуальному восприятию. Со стороны Военно-Грузинской дороги складки местности и скальные выходы формируют четкий силуэт крупного насекомого (жука), ползущего вверх.\n\nДоступность: Вершина является популярным объектом для однодневных восхождений (хайкинга), так как не требует специального альпинистского снаряжения, но предлагает одни из лучших видов на долину Терека.'
    },
    en: { title: 'Kandyl-Khokh (Beetle Mountain)', desc: 'The most unusual resident of the Daryal Gorge. A panoramic point from which the Georgian Military Road seems like a thin thread.' },
    zh: { title: 'Kandyl-Khokh (甲虫山)', desc: '达里亚尔峡谷最不寻常的居民。一个全景点，从那里看格鲁吉亚军用公路就像一条细线。' }
  },
  'osman-lagat': {
    ru: {
      title: 'Пещера Осман Лагат',
      shortDesc: 'Скрытый портал в Карцинском ущелье. Сквозная пещера-туннель длиной 200 метров, которая буквально предлагает увидеть «свет в конце тоннеля». Маршрут проходит через реликтовый каньон, напоминающий декорации «Парка юрского периода», мимо уникального водопадом, пробившего скалу насквозь.',
      desc: 'Путешествие к центру Земли Если другие локации — это просто красивые виды, то поход к Осман Лагат — это полноценный квест. Вы попадаете в Карцинское ущелье — узкий, заросший мхом каньон, где солнце играет в прятки с отвесными стенами. Здесь царит вечный полумрак и влажная прохлада, а тропа петляет между гигантскими валунами, скатившимися с гор столетия назад.\n\nПервая награда на пути — водопад Кольцо. Это редчайший природный феномен: горная река Карцадон веками точила камень и в итоге пробила себе «окно» прямо в скале. Вода с шумом падает сквозь каменное кольцо в кристально чистую чашу — зрелище гипнотическое.\n\nНо главная цель выше. Пещера Осман Лагат спрятана от случайных глаз. Вход в неё — огромный каменный вестибюль, где в древности пастухи укрывали целые отары овец от непогоды. Внутри царит абсолютная, густая темнота и тишина, которую нарушает лишь свист ветра. Самое интересное начинается в глубине: пещера сужается в длинный коридор. Пройдя его насквозь (местами придется пригнуться), вы выходите с другой стороны горы. Этот момент выхода из каменного чрева к солнцу и лесу дарит ни с чем не сравнимое чувство перерождения.\n\nTRAVEL-DOSSIER: Факты\n\nЛокация: Северная Осетия, Алагирский район. Карцинское ущелье (боковое ответвление Куртатинского ущелья). Ближайший ориентир — село Горный Карца.\n\nТип объекта: Карстовая сквозная пещера.\n\nПараметры: Длина ходов около 150–200 метров. Входной зал просторный, далее сужается в лаз.\n\nЭтимология: «Лагат» в переводе с осетинского — «пещера». «Осман» — имя собственное. По преданию, пещера названа в честь охотника или абрека (горца-изгнанника) по имени Осман, который использовал её как надежное убежище, зная все тайные ходы.\n\nМаршрут: Считается треккинговым маршрутом средней сложности. Набор высоты составляет около 350 метров. Тропа требует внимательности: приходится перелезать через завалы камней и переходить ручей вброд.\n\nСоседство: Обычно посещается в связке с водопадом Кольцо (расстояние между объектами небольшое, но подъем к пещере крутой).'
    },
    en: { title: 'Osman Lagat Cave', desc: 'A hidden portal in the Kartsinsky Gorge. A through cave-tunnel 200 meters long, offering a view of the "light at the end of the tunnel".' },
    zh: { title: '奥斯曼拉加特洞穴', desc: '卡尔钦斯基峡谷中的一个隐藏入口。一条200米长的穿透性洞穴隧道，字面上提供了“隧道尽头的光”。' }
  },
  galdoridon: {
    ru: {
      title: 'Водопад Галдоридон',
      shortDesc: 'Главная водная артерия ущелья Харес. Пятикаскадный гигант в сердце Дигории, который с грохотом обрушивается с черных сланцевых скал, создавая вокруг себя зону вечной свежести и радуг.',
      desc: 'Белый шрам на черном камне Дигория считается самым отдаленным и «альпийским» уголком Осетии, и Голдаридон — её живое сердце. Вы слышите его раньше, чем видите: низкий, вибрирующий гул разносится по всему ущелью реки Харес.\n\nПуть к водопаду — это подъем по зоне субальпийских лугов, где трава по пояс, а воздух густой от ароматов цветения. Когда тропа выводит к подножию, масштаб поражает. Это не одна струя, а сложная система из пяти каскадов. Вода, разогнавшись на ледниках выше, с яростью бьет в черные, отполированные до блеска скалы, разбиваясь в мелкую алмазную пыль.\n\nЕсли подойти ближе (готовьтесь промокнуть за секунду), можно почувствовать дыхание горы. Здесь всегда холодно, даже если в долине жара. Вода ледяная, «колючая». Контраст угольно-черной породы и кипящей белой пены создает невероятную графику, а в солнечный день над чашей водопада почти всегда висит яркая, осязаемая радуга.\n\nTRAVEL-DOSSIER: Факты\n\nЛокация: Республика Северная Осетия — Алания, Ирафский район, Горная Дигория. Ущелье реки Харес.\n\nОриентир: Туристическая база «Таймази» или «Порог Неба». Водопад хорошо виден с территории этих баз.\n\nВысота падения: Общая высота каскадов — около 35 метров.\n\nГидрология: Водопад образует река Голдаридон (Галдоридон), которая питается ледниками и снежниками горного массива Суган. Является левым притоком реки Харес.\n\nЭтимология: Название Галдоридон (осет. Галдорыдон) происходит от трех слов: Гал — «бык», Дор — «камень», Дон — «вода/река». Буквальный перевод — «Река у бычьего камня» (или «Река камня быка»). Вероятно, название связано с огромными валунами в русле реки.\n\nОсобенность: Водопад никогда не пересыхает, но наиболее полноводен и зрелищен в первой половине лета (июнь-июль), в период активного таяния ледников.'
    },
    en: { title: 'Galdoridon Falls', desc: 'Jeep tour to the heart of mountain Digoria. Minimal walking, maximum impressions.' },
    zh: { title: '加尔多里顿瀑布', desc: '前往迪戈里亚山区中心的吉普车之旅。步行最少，印象最深。' }
  },
  'zrug-lake': {
    ru: {
      title: 'Зругское озеро',
      shortDesc: '«Серебряное зеркало» Осетии. Высокогорное озеро ледникового происхождения, скрытое в самом труднодоступном и диком ущелье республики на высоте почти 3000 метров. Локация для тех, кто ищет тишину и лунные пейзажи.',
      desc: 'Озеро цвета жидкой ртути Путь к озеру лежит через Зругское ущелье — место с трагической и величественной историей. Вы оставляете позади руины древнего храма Хозиты Майрам, и зелень альпийских лугов постепенно сменяется аскетичным миром камня.\n\nЗдесь, в гигантском скальном цирке (амфитеатре), лежит оно. Вода в Зругском озере редко бывает прозрачно-голубой. Чаще она напоминает жидкое серебро или ртуть из-за взвеси горных пород и игры света. Озеро идеально гладкое, в нем, как в перевернутом мире, отражаются острые пики Главного Кавказского хребта и плывущие облака.\n\nНа этой высоте (почти 3 километра!) меняется восприятие звука. Здесь царит абсолютная, вакуумная тишина. Нет шелеста листвы, нет пения птиц — только свист ветра в осыпях и хруст камней под ногами. Стоя на берегу, вы чувствуете холодное дыхание ледников, которые питают этот водоем. Это пейзаж в стиле «минимализм»: только вода, камень и небо.\n\nTRAVEL-DOSSIER: Факты\n\nЛокация: Республика Северная Осетия, Алагирский район. Верховья Зругского ущелья (Зруггом).\n\nВысота: Расположено на высоте 2 990 – 3 000 метров над уровнем моря.\n\nПроисхождение: Классическое ледниково-моренное озеро. Образовалось в углублении (каре), выработанном древним ледником.\n\nОсобенность воды: Вода остается ледяной даже в разгар августа. Из-за минеральных примесей (ледниковой мути) вода часто имеет белесый, матовый или бирюзово-стальной оттенок.\n\nФлора: Озеро находится в нивальном поясе (пояс вечных снегов и скал), растительность здесь практически отсутствует, что создает эффект «лунного ландшафта».\n\nВажный нюанс (Hard Skill): Озеро находится в пограничной зоне (буквально в нескольких сотнях метров от границы с Южной Осетией/Государственной границы РФ).\n\nТребование: Для посещения обязательно наличие пограничного пропуска и паспорта РФ. Без документов проход в верховья ущелья невозможен.\n\nОриентир: По пути к озеру туристы проходят мимо руин Зругского храма (Успения Пресвятой Богородицы) X–XI века, который часто называют «Золотым храмом» из-за особого цвета травертина, из которого он сложен.',
      difficulty: 'Сложный',
      duration: '1 день',
      price: '3 500 ₽',
    },
    en: { title: 'Zrug Lake', desc: 'The Silver Mirror of Ossetia. A high-mountain lake hidden in a wild gorge.' },
    zh: { title: '兹鲁格湖', desc: '奥塞梯的银镜。隐藏在狂野峡谷中的高山湖泊。' }
  },
  'huppara': {
    ru: {
      title: 'Озеро Хуппара',
      location: 'Дигория',
      difficulty: 'Сложный',
      duration: '3 дня', 
      price: '15 000 ₽',
      shortDesc: 'Самый дикий и вертикальный маршрут Дигории. Путь от зеленых альпийских лугов к суровому ледниковому цирку на высоте ~2900 метров. Ключевая точка маршрута — мощный водопад Хуппара, который служит «воротами» в высокогорную зону вечных снегов.',
      desc: 'Вертикальный километр к тишине Этот маршрут — настоящая драматургия природы. Всё начинается внизу, в ущелье реки Харес, где воздух напоен ароматом трав и хвои. Тропа резко уходит вверх, вдоль русла реки Хуппара. Здесь нет пологих прогулок — только набор высоты, только хардкор.\n\nПримерно на середине пути, когда лес уже остался позади, а дыхание сбивается от крутизны, горы преподносят первый подарок — водопад Хуппара. Это не просто вода, падающая со скалы. Это ревущий зверь, зажатый в узком каменном кулуаре. Поток, вырываясь из теснины, разбивается о камни в алмазную пыль. Здесь, в облаке водяной взвеси, вы делаете привал, чтобы остудить лицо ледяными брызгами и почувствовать мощь стихии.\n\nДалее тропа становится суровее: альпийские луга сменяются каменными осыпями (моренами). Вы поднимаетесь в «каменный мешок» — гигантский цирк горы Хуппара. И вот, когда кажется, что выше только небо, перед вами открывается Озеро Хуппара. Темная, почти чернильная гладь воды (а в солнечный день — пронзительно бирюзовая) лежит в полной тишине, окруженная отвесными скалами. Здесь, на краю снежников, чувствуешь себя на другой планете. Контраст между ревущим водопадом внизу и абсолютной, вакуумной тишиной наверху — главное впечатление этого похода.\n\nTRAVEL-DOSSIER: Факты о маршруте\n\nЛокация: Северная Осетия, Горная Дигория (Ирафский район), ущелье реки Харес, боковое ущелье Хуппара.\n\nНитка маршрута: р. Харес — подъем вдоль р. Хуппара — Водопад Хуппара — ледниковый цирк — Озеро Хуппара.\n\nВысоты:\n\nСтарт: ~1700–1800 м.\n\nВодопад: ~2200–2300 м (промежуточная точка).\n\nОзеро (финиш): ~2900 м.\n\nОбщий набор высоты: более 1000 метров (требует хорошей физической формы).\n\nВодопад: Каскадного типа, расположен в узком скальном желобе. Является ключевым ориентиром: после него зона растительности заканчивается, начинается зона камней.\n\nОзеро: Ледникового происхождения (карстово-ледниковое). Большую часть года (до июля) может быть частично скрыто под снегом и льдом.\n\nОсобенности: Маршрут тупиковый (радиальный). Считается одним из самых красивых, но физически затратных однодневных выходов в районе.',
      program: [
          'День 1. Трансфер в Дигорию. Разбивка лагеря.',
          'День 2. Радиальный выход к озеру Хуппара. Набор высоты.',
          'День 3. Запасной день / Отдых.',
          'День 4. Спуск и возвращение во Владикавказ.'
      ],
      gear: 'Треккинговая обувь, палки, рюкзак, мембранная одежда'
    },
    en: { title: 'Huppara Lake', desc: 'Wild and vertical route in Digoria to a glacial lake.' },
    zh: { title: '胡帕拉湖', desc: '迪戈里亚通往冰川湖的狂野垂直路线。' }
  },
  // PLACEHOLDER TRANSLATIONS
  'dev-jeep': {
    ru: { title: 'Джип-туры: Скоро!', desc: 'Мы разрабатываем новые маршруты на внедорожниках. Следите за обновлениями!' },
    en: { title: 'Jeep Tours: Coming Soon!', desc: 'We are developing new off-road routes. Stay tuned!' },
    zh: { title: '吉普车之旅：即将推出！', desc: '我们要开发新的越野路线。敬请期待！' }
  },
  'dev-gastro': {
    ru: { title: 'Гастро-туры: Скоро!', desc: 'Вкуснейшие осетинские пироги и горный чай. Программа в разработке.' },
    en: { title: 'Gastro Tours: Coming Soon!', desc: 'Delicious Ossetian pies and mountain tea. Program in development.' },
    zh: { title: '美食之旅：即将推出！', desc: '美味的奥塞梯馅饼和高山茶。计划正在制定中。' }
  },
  'dev-excursion': {
    ru: { title: 'Экскурсии: Скоро!', desc: 'Исторические памятники и культурное наследие Алании. Готовим программу.' },
    en: { title: 'Excursions: Coming Soon!', desc: 'Historical monuments and cultural heritage of Alania. Preparing the program.' },
    zh: { title: '游览：即将推出！', desc: '阿兰尼亚的历史古迹和文化遗产。正在准备计划。' }
  },
  'dev-other': {
    ru: { title: 'Другое: Скоро!', desc: 'Нестандартные маршруты и эксклюзивные предложения.' },
    en: { title: 'Other: Coming Soon!', desc: 'Non-standard routes and exclusive offers.' },
    zh: { title: '其他：即将推出！', desc: '非标准路线和独家优惠。' }
  }
};
