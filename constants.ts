import { Tour, TeamMember, GalleryItem, TourDate, Review, TourDetails } from './types';

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

// --- EXPEDITION DETAILS (NEW) ---
const KAZBEK_DETAILS: TourDetails = {
  rental: [
    { category: "Спец. снаряжение (Железо)", items: [
      { name: "Кошки", price: "2 400 ₽" },
      { name: "Ледоруб", price: "1 600 ₽" },
      { name: "Страховочная система (комплект)", price: "2 000 ₽" },
      { name: "Каска", price: "2 000 ₽" },
      { name: "Жумар + спусковое + карабин", price: "1 300 ₽" },
    ]},
    { category: "Бивуак (Лагерь)", items: [
      { name: "Палатка Talberg Space Pro 2", price: "6 500 ₽" },
      { name: "Спальный мешок (комфорт -20)", price: "6 500 ₽" },
      { name: "Спальный мешок (комфорт -10)", price: "4 600 ₽" },
      { name: "Спальный мешок (комфорт 0)", price: "3 300 ₽" },
      { name: "Коврик надувной", price: "1 100 ₽" },
      { name: "Коврик-пенка (Carrimat)", price: "600 ₽" },
    ]},
    { category: "Одежда и Обувь", items: [
      { name: "Пуховая куртка (Высотная)", price: "5 200 ₽" },
      { name: "Куртка мембранная (20k)", price: "4 600 ₽" },
      { name: "Штаны мембранные (20k)", price: "4 600 ₽" },
      { name: "Ботинки (Двухслойные)", price: "7 800 ₽" },
      { name: "Ботинки (Треккинговые)", price: "3 900 ₽" },
      { name: "Гамаши / Бахилы", price: "1 100 - 2 000 ₽" },
    ]}
  ],
  vip: [
    {
      title: "Личный Портер",
      price: "70 000 ₽",
      desc: "Идите налегке. Ваш груз (до 15 кг) — наша забота на всем маршруте.",
      icon: "Backpack"
    },
    {
      title: "Альпийский Шеф-повар",
      price: "75 000 ₽",
      desc: "Персональное меню, готовка и обслуживание. VIP-питание на высоте.",
      icon: "ChefHat"
    }
  ],
  rules: [
    "Оформление погранпропусков происходит строго заранее.",
    "Базовый формат: участники несут личное и общественное снаряжение.",
    "Инструктор имеет право изменить маршрут ради безопасности группы.",
    "Лагерный быт (палатки, кухня) — командная работа (кроме VIP).",
    "Обязательна мед. справка: допуск к высотам >4000м.",
  ],
  booking: {
    deposit: "20 000 ₽",
    refundPolicy: "Возврат предоплаты возможен не позднее чем за 30 дней до старта.",
  }
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
  'День 1. Встреча участников в г.Владикавказ, трансфер в Геналдонское ущелье. Автомобильная часть маршрута из Владикавказа занимает всего час. Последнее на маршруте село – Тменикау, на высоте 1700 метров. Дальше шлагбаум – это крайняя точка, куда можно добраться на машине. Дальше только пешком. Геналдонское ущелье находится в пограничной зоне, проверка документов и пропусков, и пеший переход к базовому лагерю (верхние Кармадонские ванны) на высоте 2300 метров.',
  'День 2. Переход в следующий лагерь на высоту 3500 по северо-западному контрфорсу.',
  'День 3. Переход в штурмовой лагерь на высоте 4200 метров.',
  'День 4. Днёвка. День восстановления и отдыха, подготовка к штурму. Есть возможность поднять на пик Полякова (ОЖД).',
  'День 5. Штурм. Подъем на Казбек будет очень ранний — чтобы успеть подняться на вершину Казбека и вернуться в лагерь в дневное время. В зависимости от прогноза и погодных условий выбирается время выхода на штурм.',
  'День 6. Спуск в базовый лагерь до горящих источников (верхние Кармадонские ванны).',
  'День 7. Спуск до с.Тменикау и возвращение в г.Владикавказ.',
  'День 8. Запасной день.'
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

const TEAM_TRANSLATIONS: Record<string, { ru: { name: string, role: string, desc: string } }> = {
  vitaliy: {
    ru: { 
      name: 'Виталий', 
      role: 'Гид. Эксперт по безопасности', 
      desc: 'Аттестованный спасатель ГУ МЧС РСО-Алания. Многократные успешные восхождения на Казбек в любых условиях. Гарант безопасности на маршруте.' 
    }
  },
  roman: {
    ru: { 
      name: 'Роман', 
      role: 'Гид-инструктор. Знаток Осетии', 
      desc: '2-й спортивный разряд по альпинизму. Регулярные восхождения на Эльбрус и Казбек. Ультрамарафонец и скайраннер — задает отличный темп и знает все ущелья республики.' 
    }
  },
  danil: {
    ru: { 
      name: 'Данил', 
      role: 'Гид-инструктор. Технический эксперт', 
      desc: 'В туризме с 2016 года. Ледолазание, скалолазание, ски-альпинизм. Водит сложные технические и коммерческие группы на вершины Кавказа.' 
    }
  },
  anastasia: {
    ru: { 
      name: 'Анастасия', 
      role: 'Гид-организатор. Душа команды', 
      desc: 'В походах с 12 лет, в профи-туризме с 2021 года. Трейлраннинг, сплавы, пещеры и горные переходы. Художник-преподаватель и организатор авторских арт-путешествий.' 
    }
  },
  konstantin: {
    ru: { 
      name: 'Константин', 
      role: 'Гид. Фотограф. Спортсмен', 
      desc: 'Альпинист (3 разряд), велогонщик (шоссе и МТБ). Снимает горы и драйв. Превращает тяжелый подъем в захватывающий фото- и видеоконтент.' 
    }
  },
  avocado: {
    ru: { 
      name: 'Авокадо', 
      role: 'Талисман клуба. Главный по атмосфере', 
      desc: 'Настоящий горный волк (в плюшевой шкуре). Альпинист 3-го «плюшевого» разряда. Миссия: Поднимать настроение там, где кончаются силы.' 
    }
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
    author: 'Азамат',
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

const GENERIC_TRANSLATIONS: {
  groupSizeOneDay: string;
  groupSizeMulti: string;
  diff: string[];
  titles: string[];
  descs: string;
  prog: string[];
  gear: string;
} = {
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
};

export const getTours = (): Tour[] => {
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

    const gen = GENERIC_TRANSLATIONS;
    
    // Group size logic
    let groupSizeInfo = gen.groupSizeOneDay;
    if (isMultiDay) groupSizeInfo = gen.groupSizeMulti;
    if (isKazbek) groupSizeInfo = '5 человек на гида';
    if (isDev) groupSizeInfo = '';

    // Calculate Defaults
    let diff = gen.diff[0]; // Easy
    if (index > 8) diff = gen.diff[1]; // Medium
    
    // Overrides based on instructions
    if (isKazbek) diff = gen.diff[3]; // Extreme
    else if (isMultiDay && tour.id !== 'karmadon') diff = gen.diff[1]; // Multi-day -> Medium (except Karmadon)
    else if (tour.id === 'karmadon') diff = gen.diff[0]; // Karmadon -> Easy
    if (isDev) diff = 'В разработке';

    const titleIndex = Math.max(0, index - 2); 
    const title = gen.titles[titleIndex] || 'Тур';

    // Pricing & Duration Logic based on category
    const isStandardOneDay = ['one-day', 'jeep', 'excursion', 'gastro', 'other'].includes(tour.category);
    
    const defaultPrice = isStandardOneDay ? '3 500 ₽' : '12 000 ₽';
    const defaultDuration = isStandardOneDay ? '1 день' : '3+ дня';
    const defaultLocation = 'Осетия';
    const defaultDistance = '10-20 km';

    let tourData = { ...tour, dates, groupSizeInfo } as Tour;

    // Inject Expedition Details for Kazbek
    if (isKazbek) {
        tourData.details = KAZBEK_DETAILS;
    }

    // 1. Check for specific translation in TOUR_TRANSLATIONS (Russian only now)
    if (TOUR_TRANSLATIONS[tour.id] && TOUR_TRANSLATIONS[tour.id].ru) {
      const translation = TOUR_TRANSLATIONS[tour.id].ru;
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
             title: translation.title || 'В разработке',
             desc: translation.desc || 'Мы готовим новые уникальные маршруты.',
             program: [],
             gear: '',
             distance: '—'
        } : {})
      } as Tour;
    }
    
    // 2. Generic fallback logic
    return {
      ...tourData,
      title: isDev ? 'В разработке' : title,
      price: isDev ? '—' : defaultPrice,
      duration: isDev ? '—' : defaultDuration,
      difficulty: diff,
      location: defaultLocation,
      distance: isDev ? '—' : defaultDistance,
      desc: isDev ? 'Мы готовим новые уникальные маршруты.' : gen.descs,
      program: isDev ? [] : gen.prog,
      gear: isDev ? '' : gen.gear,
      reviews: []
    } as Tour;
  });
};

export const getTeam = (): TeamMember[] => {
  return RAW_TEAM.map(member => {
    const trans = TEAM_TRANSLATIONS[member.id];
    if (trans && trans.ru) {
      return { ...member, ...trans.ru };
    }
    return {
       ...member,
       name: member.id.charAt(0).toUpperCase() + member.id.slice(1),
       role: 'Гид',
       desc: 'Профессионал своего дела.'
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

const TOUR_TRANSLATIONS: Record<string, { ru: Partial<Tour> }> = {
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
      gear: 'Треккинговая обувь (обязательно!)\nСинтетическая футболка, легкие штаны, головной убор\nДождевик/мембранная куртка\nРюкзак (10–30 л), термос, вода, сидушка\nПаспорт РФ (оригинал)' 
    }
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
      desc: 'Голубой лед в изумрудной оправе Маршрут к Цейскому леднику — это не просто треккинг, это сеанс ароматерапии и визуального восторга. Тропа, названная «Экологической», петляет сквозь вековой сосновый бор. Воздух здесь настолько густой от запаха хвои и смолы, что его хочется есть ложкой. Под ногами пружинит мягкий ковер из игл и мха, а над головой, словно страж в капюшоне, нависает гора Монах.\n\nПостепенно лес расступается, и декорации меняются. Вы выходите в каменистое русло реки, где воздух мгновенно остывает на несколько градусов. Впереди, в обрамлении гранитных скал, лежит ОН — Цейский ледник. Вблизи он не белый, а грязно-серый от каменной пыли, но стоит подойти к разломам или гроту — и вы увидите его истинный цвет. Глубокий, светящийся изнутри неоново-голубой оттенок. Это спрессованное время.\n\nЗдесь, у подножия ледяной стены, вы слышите, как гора «дышит». Ледник живой: он трещит, стонет, внутри него перекатываются камни. Из гигантской ледяной арки (грота) с мощным гулом вырывается поток ледяной воды — начало реки Цейдон. Стоя рядом с этой мощью страшно и притягательно: вы чувствуете холодное дыхание тысячелетней мерзлоты на своем лице, даже если на термометре +25.\n\nTRAVEL-DOSSIER: Факты\n\nЛокация: Северная Осетия, Алагирский район. Верховья Цейского ущелья. Территория Северо-Осетинского государственного заповедника.\n\nТип: Долинный ледник. Один из крупнейших и наиболее низко опускающихся ледников Кавказа.\n\nВысоты:\n\nЯзык ледника (нижняя точка) спускается до отметки ~2 200 метров над уровнем моря.\n\nФирновые поля (зона питания) лежат на высоте 3 800 – 4 000 метров и выше.\n\nРазмеры: Длина ледника — около 8,6 км, площадь льда — более 9 кв. км.\n\nДинамика: Ледник активно отступает (тает) из-за глобального потепления. Ежегодно кромка льда уходит вверх на несколько метров, обнажая «бараньи лбы» — гладкие, отшлифованные льдом скалы.\n\nОкружение: Ледник питается снегами с вершин Адай-Хох (4408 м) и Уилпата (4649 м).\n\nДоступность: К подножию ведет маркированная эко-тропа (вход платный, так как это заповедник). Путь через лес и курумник (камни) занимает около 2–3 часов в одну сторону. Спецснаряжение для подхода к языку не требуется, но заходить в ледяной грот категорически запрещено (высокий риск обрушения льда).',
      program: [
        'Трансфер из Владикавказа в Цейское ущелье.', 
        'Старт на специально размеченной экологической тропе через сосновый лес.', 
        'Выход к нижнему языку Цейского ледника. Вид на ледяной грот.',
        'Лёгкий перекус на природе с видом на вершины.',
        'Возвращение во Владикавказ.'
      ], 
      gear: 'Удобные треккинговые ботинки или кроссовки с хорошим протектором\nСинтетическая футболка, легкие брюки, головной убор\nВетровка/мембранная куртка\nРюкзак (10–30 л), очки, крем, термос, паспорт' 
    }
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
    }
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
    }
  },
  fetkhuz: {
    ru: {
      title: 'Фетхуз',
      shortDesc: 'Главная панорамная точка Владикавказа. Вершина высотой 1745 метров, укрытая изумрудным лесом, откуда открывается лучший вид на «Врата Кавказа» и геометрию города, лежащего у ног как на ладони.',
      desc: 'Зеленый балкон Алании Фетхуз — это гора-интроверт, которая не кричит о своем величии скальными пиками, а мягко обнимает город своими зелеными склонами. Восхождение сюда — это погружение в густую, влажную прохладу широколиственного леса.\n\nТропа петляет сквозь буки и грабы, где даже в полдень царит полумрак, а воздух пахнет грибницей и мокрой корой. Вы поднимаетесь под аккомпанемент лесной акустики, пока внезапно деревья не расступаются, выпуская вас на простор альпийских лугов. Здесь случается тот самый момент катарсиса: горизонт распахивается на 360 градусов.\n\nВнизу, в глубоком каньоне, свинцовой лентой извивается Терек. С такой высоты его рев превращается в монотонный гул, задающий ритм всему пейзажу. Прямо перед вами — зев Дарьяльского ущелья, легендарный проход в Закавказье, зажатый между скалистыми гигантами. Обернувшись, вы видите Владикавказ: с высоты Фетхуза город превращается в идеальный архитектурный макет, расчерченный проспектами, который к вечеру вспыхивает тысячами огней, отражаясь в низких облаках.\n\nНа вершине всегда ветрено. Этот ветер несет запах озона с ледников и сладость горного разнотравья. Фетхуз дает редкое ощущение: вы находитесь на границе двух миров — упорядоченной цивилизации и дикой, первозданной стихии гор.\n\nTRAVEL-DOSSIER: Факты и Легенды\n\nЛокация: Республика Северная Осетия — Алания, южная окраина Владикавказа (над поселком Балта).\n\nВысота: 1 745 м над уровнем моря.\n\nГеография: Относится к Пастбищному хребту (Вторая гряда Крымско-Кавказской горной системы).\n\nГеология: Гора сложена осадочными породами — известняками и доломитами. В середине XX века здесь велась активная добыча доломита, следы старых карьеров видны на склонах и сегодня, напоминая античные террасы.\n\nЭтимология: Название имеет несколько трактовок. Самая распространенная версия перевода с осетинского — «Луковая гора» (из-за обилия дикого лука на склонах).\n\nЭкология: Фетхуз часто называют «легкими Владикавказа». Благодаря особому расположению и розе ветров, именно с его лесистых склонов в город по ночам спускается свежий, обогащенный фитонцидами воздух, проветривая улицы.\n\nИнтересный факт: Это одна из немногих вершин в окрестностях, доступная для восхождения круглый год без специального альпинистского снаряжения, что делает её идеальной для встречи рассветов.',
    }
  },
  'kandyl-khokh': {
    ru: {
      title: 'Гора Кандыл-Хох',
      shortDesc: 'Самый необычный «житель» Дарьяльского ущелья. Гора высотой 1744 метра, чей силуэт с трассы безошибочно напоминает гигантского жука, ползущего по склону. Панорамная точка, с которой Военно-Грузинская дорога кажется тонкой нитью.',
      desc: 'На спине каменного гиганта Кандыл-Хох — это гора с характером и узнаваемым лицом. Пока другие вершины соревнуются в высоте, эта берет своей формой. Огромные пласты известняка, деформированные миллионы лет назад, сложились в фигуру, напоминающую исполинского жука с мощным панцирем.\n\nПодъем сюда — это прогулка по «спине» этого каменного существа. Маршрут начинается от бурных вод Терека и уводит вверх, к солнцу. Здесь нет густых лесов, скрывающих обзор: только простор, ветер и скалы, прогретые южным солнцем.\n\nНа вершине (1744 м) вас ждет «эффект дрона». Вы стоите над пропастью, где ревет Терек, а прямо напротив вздымаются суровые стены Скалистого хребта. Это лучшее место, чтобы увидеть, как узкое горло Дарьяльского ущелья — легендарных «Врат Алан» — раскрывается навстречу долине. Здесь, сидя на краю обрыва, чувствуешь себя не покорителем природы, а её гостем, которому дозволили взглянуть на мир с плеча великана.\n\nTRAVEL-DOSSIER: Факты и Источники\n\nЛокация: Республика Северная Осетия — Алания. Правобережье реки Терек, южнее селения Верхний Ларс (Чми).\n\nВысота: 1 744 м.\n\nЭтимология: Название Кандыл-Хох переводится с осетинского как «Жук-гора».\n\nИсточник: Твердый А. В. «Топонимический словарь Кавказа».\n\nВизуальный образ: Ороним (название горы) идеально соответствует её визуальному восприятию. Со стороны Военно-Грузинской дороги складки местности и скальные выходы формируют четкий силуэт крупного насекомого (жука), ползущего вверх.\n\nДоступность: Вершина является популярным объектом для однодневных восхождений (хайкинга), так как не требует специального альпинистского снаряжения, но предлагает одни из лучших видов на долину Терека.'
    }
  },
  'osman-lagat': {
    ru: {
      title: 'Пещера Осман Лагат',
      shortDesc: 'Скрытый портал в Карцинском ущелье. Сквозная пещера-туннель длиной 200 метров, которая буквально предлагает увидеть «свет в конце тоннеля». Маршрут проходит через реликтовый каньон, напоминающий декорации «Парка юрского периода», мимо уникального водопадом, пробившего скалу насквозь.',
      desc: 'Путешествие к центру Земли Если другие локации — это просто красивые виды, то поход к Осман Лагат — это полноценный квест. Вы попадаете в Карцинское ущелье — узкий, заросший мхом каньон, где солнце играет в прятки с отвесными стенами. Здесь царит вечный полумрак и влажная прохлада, а тропа петляет между гигантскими валунами, скатившимися с гор столетия назад.\n\nПервая награда на пути — водопад Кольцо. Это редчайший природный феномен: горная река Карцадон веками точила камень и в итоге пробила себе «окно» прямо в скале. Вода с шумом падает сквозь каменное кольцо в кристально чистую чашу — зрелище гипнотическое.\n\nНо главная цель выше. Пещера Осман Лагат спрятана от случайных глаз. Вход в неё — огромный каменный вестибюль, где в древности пастухи укрывали целые отары овец от непогоды. Внутри царит абсолютная, густая темнота и тишина, которую нарушает лишь свист ветра. Самое интересное начинается в глубине: пещера сужается в длинный коридор. Пройдя его насквозь (местами придется пригнуться), вы выходите с другой стороны горы. Этот момент выхода из каменного чрева к солнцу и лесу дарит ни с чем не сравнимое чувство перерождения.\n\nTRAVEL-DOSSIER: Факты\n\nЛокация: Северная Осетия, Алагирский район. Карцинское ущелье (боковое ответвление Куртатинского ущелья). Ближайший ориентир — село Горный Карца.\n\nТип объекта: Карстовая сквозная пещера.\n\nПараметры: Длина ходов около 150–200 метров. Входной зал просторный, далее сужается в лаз.\n\nЭтимология: «Лагат» в переводе с осетинского — «пещера». «Осман» — имя собственное. По преданию, пещера названа в честь охотника или абрека (горца-изгнанника) по имени Осман, который использовал её как надежное убежище, зная все тайные ходы.\n\nМаршрут: Считается треккинговым маршрутом средней сложности. Набор высоты составляет около 350 метров. Тропа требует внимательности: приходится перелезать через завалы камней и переходить ручей вброд.\n\nСоседство: Обычно посещается в связке с водопадом Кольцо (расстояние между объектами небольшое, но подъем к пещере крутой).'
    }
  },
  galdoridon: {
    ru: {
      title: 'Водопад Галдоридон',
      shortDesc: 'Главная водная артерия ущелья Харес. Пятикаскадный гигант в сердце Дигории, который с грохотом обрушивается с черных сланцевых скал, создавая вокруг себя зону вечной свежести и радуг.',
      desc: 'Белый шрам на черном камне Дигория считается самым отдаленным и «альпийским» уголком Осетии, и Голдаридон — её живое сердце. Вы слышите его раньше, чем видите: низкий, вибрирующий гул разносится по всему ущелью реки Харес.\n\nПуть к водопаду — это подъем по зоне субальпийских лугов, где трава по пояс, а воздух густой от ароматов цветения. Когда тропа выводит к подножию, масштаб поражает. Это не одна струя, а сложная система из пяти каскадов. Вода, разогнавшись на ледниках выше, с яростью бьет в черные, отполированные до блеска скалы, разбиваясь в мелкую алмазную пыль.\n\nЕсли подойти ближе (готовьтесь промокнуть за секунду), можно почувствовать дыхание горы. Здесь всегда холодно, даже если в долине жара. Вода ледяная, «колючая». Контраст угольно-черной породы и кипящей белой пены создает невероятную графику, а в солнечный день над чашей водопада почти всегда висит яркая, осязаемая радуга.\n\nTRAVEL-DOSSIER: Факты\n\nЛокация: Республика Северная Осетия — Алания, Ирафский район, Горная Дигория. Ущелье реки Харес.\n\nОриентир: Туристическая база «Таймази» или «Порог Неба». Водопад хорошо виден с территории этих баз.\n\nВысота падения: Общая высота каскадов — около 35 метров.\n\nГидрология: Водопад образует река Голдаридон (Галдоридон), которая питается ледниками и снежниками горного массива Суган. Является левым притоком реки Харес.\n\nЭтимология: Название Галдоридон (осет. Галдорыдон) происходит от трех слов: Гал — «бык», Дор — «камень», Дон — «вода/река». Буквальный перевод — «Река у бычьего камня» (или «Река камня быка»). Вероятно, название связано с огромными валунами в русле реки.\n\nОсобенность: Водопад никогда не пересыхает, но наиболее полноводен и зрелищен в первой половине лета (июнь-июль), в период активного таяния ледников.'
    }
  },
  'zrug-lake': {
    ru: {
      title: 'Зругское озеро',
      shortDesc: '«Серебряное зеркало» Осетии. Высокогорное озеро ледникового происхождения, скрытое в самом труднодоступном и диком ущелье республики на высоте почти 3000 метров. Локация для тех, кто ищет тишину и лунные пейзажи.',
      desc: 'Озеро цвета жидкой ртути Путь к озеру лежит через Зругское ущелье — место с трагической и величественной историей. Вы оставляете позади руины древнего храма Хозиты Майрам, и зелень альпийских лугов постепенно сменяется аскетичным миром камня.\n\nЗдесь, в гигантском скальном цирке (амфитеатре), лежит оно. Вода в Зругском озере редко бывает прозрачно-голубой. Чаще она напоминает жидкое серебро или ртуть из-за взвеси горных пород и игры света. Озеро идеально гладкое, в нем, как в перевернутом мире, отражаются острые пики Главного Кавказского хребта и плывущие облака.\n\nНа этой высоте (почти 3 километра!) меняется восприятие звука. Здесь царит абсолютная, вакуумная тишина. Нет шелеста листвы, нет пения птиц — только свист ветра в осыпях и хруст камней под ногами. Стоя на берегу, вы чувствуете холодное дыхание ледников, которые питают этот водоем. Это пейзаж в стиле «минимализм»: только вода, камень и небо.\n\nTRAVEL-DOSSIER: Факты\n\nЛокация: Республика Северная Осетия, Алагирский район. Верховья Зругского ущелья (Зруггом).\n\nВысота: Расположено на высоте 2 990 – 3 000 метров над уровнем моря.\n\nПроисхождение: Классическое ледниково-моренное озеро. Образовалось в углублении (каре), выработанном древним ледником.\n\nОсобенность воды: Вода остается ледяной даже в разгар августа. Из-за минеральных примесей (ледниковой мути) вода часто имеет белесый, матовый или бирюзово-стальной оттенок.\n\nФлора: Озеро находится в нивальном поясе (пояс вечных снегов и скал), растительность здесь практически отсутствует, что создает эффект «лунного ландшафта».\n\nВажный нюанс (Hard Skill): Озеро находится в пограничной зоне (буквально в нескольких сотнях метров от границы с Южной Осетией/Государственной границы РФ).\n\nТребование: Для посещения обязательно наличие пограничного пропуска и паспорта РФ. Без документов проход в верховья ущелья невозможен.\n\nОриентир: По пути к озеру туристы проходят мимо руин Зругского храма (Успения Пресвятой Богородицы) X–XI века, который часто называют «Золотым храмом» из-за особого цвета травертина, из которого он сложен.',
      difficulty: 'Сложный',
      duration: '1 день',
      price: '3 500 ₽',
    }
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
    }
  },
  // PLACEHOLDER TRANSLATIONS
  'dev-jeep': {
    ru: { title: 'Джип-туры: Скоро!', desc: 'Мы разрабатываем новые маршруты на внедорожниках. Следите за обновлениями!' }
  },
  'dev-gastro': {
    ru: { title: 'Гастро-туры: Скоро!', desc: 'Вкуснейшие осетинские пироги и горный чай. Программа в разработке.' }
  },
  'dev-excursion': {
    ru: { title: 'Экскурсии: Скоро!', desc: 'Исторические памятники и культурное наследие Алании. Готовим программу.' }
  },
  'dev-other': {
    ru: { title: 'Другое: Скоро!', desc: 'Нестандартные маршруты и эксклюзивные предложения.' }
  }
};