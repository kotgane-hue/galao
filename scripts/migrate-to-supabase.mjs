/**
 * Migration script: Creates Supabase tables and seeds data from constants.ts
 * 
 * Run: node scripts/migrate-to-supabase.mjs
 */
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kgblltdkutkvyojpqgzx.supabase.co';
const SUPABASE_SERVICE_KEY = 'sb_secret_AlzfgImKTGrVtld4olWfMw_oDo41U8T';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ============================================
// 1. CREATE TABLES via SQL
// ============================================
async function createTables() {
    console.log('📦 Checking tables...');

    // Try to select from tours to check if it exists
    const { error: toursErr } = await supabase.from('tours').select('id').limit(1);
    if (toursErr && toursErr.code === '42P01') {
        console.log('⚠️  Tables do not exist. Please run the SQL from scripts/setup-database.sql in the Supabase SQL Editor first.');
        console.log('   Go to: https://supabase.com/dashboard → Your Project → SQL Editor → Paste the contents of setup-database.sql → Run');
        process.exit(1);
    }

    if (toursErr) {
        console.log('⚠️  Error checking tours table:', toursErr.message);
        console.log('   If tables do not exist, run scripts/setup-database.sql in the Supabase SQL Editor first.');
        process.exit(1);
    }

    console.log('✅ Tables verified!');
}

// ============================================
// 2. SEED TOUR DATA
// ============================================

// Helper to generate gallery images
const generateGallery = (id) => {
    return Array.from({ length: 25 }, (_, i) => `/images/${id}/${i + 1}.webp`);
};

// Helper to create dates
const createDates = (month, days, totalSpots = 10) => {
    return days.map(day => ({
        startDate: `2026-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
        endDate: `2026-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
        totalSpots,
        bookedSpots: 0
    }));
};

// KAZBEK
const KAZBEK_DATES = [
    { startDate: '2026-07-05', endDate: '2026-07-12', totalSpots: 5, bookedSpots: 0 },
    { startDate: '2026-07-20', endDate: '2026-07-27', totalSpots: 5, bookedSpots: 0 },
    { startDate: '2026-08-05', endDate: '2026-08-12', totalSpots: 5, bookedSpots: 0 },
    { startDate: '2026-08-20', endDate: '2026-08-27', totalSpots: 5, bookedSpots: 0 },
    { startDate: '2026-09-07', endDate: '2026-09-14', totalSpots: 5, bookedSpots: 0 },
];

const KAZBEK_DETAILS = {
    rental: [
        {
            category: "Спец. снаряжение (Железо)", items: [
                { name: "Кошки", price: "2 400 ₽" },
                { name: "Ледоруб", price: "1 600 ₽" },
                { name: "Страховочная система (комплект)", price: "2 000 ₽" },
                { name: "Каска", price: "2 000 ₽" },
                { name: "Жумар + спусковое + карабин", price: "1 300 ₽" },
            ]
        },
        {
            category: "Бивуак (Лагерь)", items: [
                { name: "Палатка Talberg Space Pro 2", price: "6 500 ₽" },
                { name: "Спальный мешок (комфорт -20)", price: "6 500 ₽" },
                { name: "Спальный мешок (комфорт -10)", price: "4 600 ₽" },
                { name: "Спальный мешок (комфорт 0)", price: "3 300 ₽" },
                { name: "Коврик надувной", price: "1 100 ₽" },
                { name: "Коврик-пенка (Carrimat)", price: "600 ₽" },
            ]
        },
        {
            category: "Одежда и Обувь", items: [
                { name: "Пуховая куртка (Высотная)", price: "5 200 ₽" },
                { name: "Куртка мембранная (20k)", price: "4 600 ₽" },
                { name: "Штаны мембранные (20k)", price: "4 600 ₽" },
                { name: "Ботинки (Двухслойные)", price: "7 800 ₽" },
                { name: "Ботинки (Треккинговые)", price: "3 900 ₽" },
                { name: "Гамаши / Бахилы", price: "1 100 - 2 000 ₽" },
            ]
        }
    ],
    vip: [
        { title: "Личный Портер", price: "70 000 ₽", desc: "Идите налегке. Ваш груз (до 15 кг) — наша забота на всем маршруте.", icon: "Backpack" },
        { title: "Альпийский Шеф-повар", price: "75 000 ₽", desc: "Персональное меню, готовка и обслуживание. VIP-питание на высоте.", icon: "ChefHat" }
    ],
    rules: [
        "Оформление погранпропусков происходит строго заранее.",
        "Базовый формат: участники несут личное и общественное снаряжение.",
        "Инструктор имеет право изменить маршрут ради безопасности группы.",
        "Лагерный быт (палатки, кухня) — командная работа (кроме VIP).",
        "Обязательна мед. справка: допуск к высотам >4000м.",
    ],
    booking: { deposit: "20 000 ₽", refundPolicy: "Возврат предоплаты возможен не позднее чем за 30 дней до старта." }
};

// All tour dates
const TOUR_DATES = {
    kazbek: KAZBEK_DATES,
    karmadon: [
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
    ],
    huppara: [
        { startDate: '2026-05-28', endDate: '2026-05-31', totalSpots: 10, bookedSpots: 0 },
        { startDate: '2026-06-27', endDate: '2026-06-30', totalSpots: 10, bookedSpots: 0 },
        { startDate: '2026-07-16', endDate: '2026-07-19', totalSpots: 10, bookedSpots: 0 },
        { startDate: '2026-08-01', endDate: '2026-08-04', totalSpots: 10, bookedSpots: 0 },
        { startDate: '2026-08-13', endDate: '2026-08-16', totalSpots: 10, bookedSpots: 0 },
        { startDate: '2026-09-10', endDate: '2026-09-13', totalSpots: 10, bookedSpots: 0 },
        { startDate: '2026-09-17', endDate: '2026-09-20', totalSpots: 10, bookedSpots: 0 },
    ],
    kaisar: [
        { startDate: '2026-06-05', endDate: '2026-06-07', totalSpots: 10, bookedSpots: 0 },
        { startDate: '2026-06-15', endDate: '2026-06-17', totalSpots: 10, bookedSpots: 0 },
        { startDate: '2026-07-03', endDate: '2026-07-05', totalSpots: 10, bookedSpots: 0 },
        { startDate: '2026-07-28', endDate: '2026-07-30', totalSpots: 10, bookedSpots: 0 },
        { startDate: '2026-08-03', endDate: '2026-08-05', totalSpots: 10, bookedSpots: 0 },
        { startDate: '2026-08-17', endDate: '2026-08-19', totalSpots: 10, bookedSpots: 0 },
        { startDate: '2026-09-11', endDate: '2026-09-13', totalSpots: 10, bookedSpots: 0 },
        { startDate: '2026-09-28', endDate: '2026-09-30', totalSpots: 10, bookedSpots: 0 },
    ],
    fetkhuz: [
        ...createDates(3, [22, 29]), ...createDates(4, [12, 26]), ...createDates(5, [2, 10, 31]),
        ...createDates(6, [1, 21, 28]), ...createDates(9, [20, 27]), ...createDates(10, [4, 17, 25]),
        ...createDates(11, [7, 15, 22, 28]), ...createDates(12, [1, 7]),
    ],
    'kandyl-khokh': [
        ...createDates(1, [10, 25]), ...createDates(2, [1, 8]), ...createDates(3, [7, 14, 28]),
        ...createDates(4, [4, 11, 19]), ...createDates(5, [1, 10, 16, 31]),
        ...createDates(9, [6, 13, 26]), ...createDates(10, [3, 11, 25]),
        ...createDates(11, [7, 21, 28]), ...createDates(12, [5, 13, 19]),
    ],
    'osman-lagat': [
        ...createDates(4, [5, 12, 25]), ...createDates(5, [2, 8, 24]),
        ...createDates(6, [5, 14]), ...createDates(9, [13, 19, 27]),
        ...createDates(10, [9, 12, 18, 30]), ...createDates(11, [7, 21, 28]),
        ...createDates(12, [6, 12]),
    ],
    galdoridon: [
        ...createDates(3, [22, 29]), ...createDates(4, [11, 19, 26]),
        ...createDates(5, [3, 10, 23, 30]), ...createDates(6, [1, 7, 20, 30]),
        ...createDates(7, [1, 5, 16, 25, 30]), ...createDates(8, [4, 9, 10, 23, 31]),
        ...createDates(9, [6, 12, 26, 28]), ...createDates(10, [4, 17, 25]),
        ...createDates(11, [8, 12, 22, 30]), ...createDates(12, [1, 6, 12, 27]),
    ],
    tsey: [
        ...createDates(6, [20, 28, 30]), ...createDates(7, [1, 5, 16, 20, 25, 27]),
        ...createDates(8, [3, 7, 12, 20, 25, 30]), ...createDates(9, [1, 5, 11, 13, 19]),
    ],
    'zrug-lake': [
        ...createDates(4, [26, 30]), ...createDates(5, [2, 9, 16, 31]),
        ...createDates(6, [26, 29]), ...createDates(7, [3, 9, 13, 19, 23, 27]),
        ...createDates(8, [5, 15, 18, 23, 25, 30]), ...createDates(9, [5, 12, 20, 27]),
        ...createDates(10, [2, 10, 18, 31]), ...createDates(11, [8, 15, 22, 29]),
    ],
    stolovaya: [
        ...createDates(5, [1, 10, 30]), ...createDates(6, [5, 14, 20, 29]),
        ...createDates(7, [3, 8, 17, 20, 26, 28]), ...createDates(8, [4, 10, 15, 20, 23, 24, 30]),
        ...createDates(9, [5, 10, 13, 20, 26, 30]), ...createDates(10, [3, 10, 18, 25]),
        ...createDates(11, [1, 8, 15, 30]),
    ],
    'chyzdzhyty-khokh': [
        ...createDates(4, [18, 26]), ...createDates(5, [1, 10, 23, 30]),
        ...createDates(6, [6, 14]), ...createDates(9, [13, 20, 27]),
        ...createDates(10, [1, 4, 11, 15, 24]), ...createDates(11, [1, 8, 16, 22]),
        ...createDates(12, [5, 13]),
    ],
    kubus: [
        ...createDates(4, [25, 30]), ...createDates(5, [2, 10, 30]),
        ...createDates(6, [27, 30]), ...createDates(7, [3, 5, 19, 22, 25, 31]),
        ...createDates(8, [2, 12, 16, 20, 23, 25, 29, 31]),
        ...createDates(9, [1, 6, 13, 20]), ...createDates(10, [3, 11, 25, 31]),
        ...createDates(11, [1, 8, 12, 14, 20, 30]),
    ],
    tbayhoh: [
        ...createDates(6, [6, 13, 20, 27]), ...createDates(7, [4, 11, 18, 25]),
        ...createDates(8, [1, 8, 15, 22, 29]), ...createDates(9, [5, 12, 19]),
    ],
    kariyhoh: [
        ...createDates(6, [7, 14, 21, 28]), ...createDates(7, [5, 12, 19, 26]),
        ...createDates(8, [2, 9, 16, 23, 30]), ...createDates(9, [6, 20]),
        ...createDates(10, [4, 11]),
    ],
    dashsar: [
        ...createDates(6, [3, 17]), ...createDates(7, [1, 15, 29]),
        ...createDates(8, [12, 26]), ...createDates(9, [9, 23]),
    ],
    'dashsar-karihoh': [
        ...createDates(7, [8, 22]), ...createDates(8, [5, 19]),
        ...createDates(9, [16]),
    ],
};

// All tours data (merged from constants.ts - RAW_TOURS + TOUR_TRANSLATIONS)
const TOURS = [
    { id: 'tbayhoh', title: 'Тбау-Хох: Восхождение к истокам легенды', price: '4 000 ₽', duration: '1 день', difficulty: 'Средний', distance: '10-20 km', location: 'Скалистый хребет', image: '/images/tbayhoh/main.webp', gallery: generateGallery('tbayhoh'), short_desc: 'Покорите вершину, изображенную на знаменитой бутылке воды «Тбау».', description: 'Тбау-Хох — это не просто гора, это символ чистоты и мощи.', program: ['07:00 — Старт из Владикавказа', 'Подъем на вершину (2980м)', 'Панорамный привал', 'Спуск и возвращение'], gear: 'Треккинговые ботинки, палки, ветровка, вода', color: 'emerald', category: 'one-day', group_size_info: 'до 15 человек', sort_order: 0 },
    { id: 'kariyhoh', title: 'Восхождение на Кариу-Хох: Тропа к облакам', price: '5 000 ₽', duration: '1 день', difficulty: 'Сложный', distance: '10-20 km', location: 'Скалистый хребет', image: '/images/Kariyhoh/main.webp', gallery: generateGallery('Kariyhoh'), short_desc: 'Классический маршрут на высшую точку Скалистого хребта (3439 м).', description: 'Кариу-Хох — это «Эверест» районного масштаба.', program: ['Выезд из Владикавказа', 'Подъем через альпийские луга', 'Вершина (3439м)', 'Спуск'], gear: 'Треккинговые ботинки, палки, мембрана', color: 'purple', category: 'one-day', group_size_info: 'до 15 человек', sort_order: 1 },
    { id: 'dashsar', title: 'Дашсар: Вершина Тишины', price: '3 800 ₽', duration: '1 день', difficulty: 'Средний', distance: '10-20 km', location: 'Куртатинское ущелье', image: '/images/Dashsar/main.webp', gallery: generateGallery('Dashsar'), short_desc: 'Эстетичный треккинг на вершину 2868 м.', description: 'Дашсар — менее популярная, но невероятно красивая вершина.', program: ['Сбор,', 'Подъем', 'Вершина', 'Спуск'], gear: 'Треккинговая обувь, дождевик, рюкзак, вода', color: 'blue', category: 'one-day', group_size_info: 'до 15 человек', sort_order: 2 },
    { id: 'dashsar-karihoh', title: 'Траверс Дашсар — Кариу-Хох', price: '5 000 ₽', duration: '1 день', difficulty: 'Сложный', distance: '10-20 km', location: 'Скалистый хребет', image: '/images/Dashsar-Karihoh/main.webp', gallery: generateGallery('Dashsar-Karihoh'), short_desc: 'Ультимативный маршрут для сильных духом.', description: 'Это маршрут-мечта для любителей долгих переходов.', program: ['Подъем на Дашсар', 'Траверс по гребню', 'Кариу-Хох', 'Спуск'], gear: 'Горные ботинки, каска, палки, мембрана, перчатки', color: 'red', category: 'one-day', group_size_info: 'до 15 человек', sort_order: 3 },
    { id: 'kubus', title: 'Кубусская кругосветка', price: '3 200 ₽', duration: '1 день', difficulty: 'Легкий', distance: '10-20 km', location: 'Дигория', image: '/images/kubus/main.webp', gallery: generateGallery('kubus'), short_desc: 'Главный панорамный маршрут Горной Дигории.', description: 'Амфитеатр богов. Этот маршрут — как симфония в трех частях.', program: ['07:00 — Старт из Владикавказа', '10:00 — Начало «Кругосветки»', 'Обед с видом на горы', 'Траверс через лес', 'Финал: вид на ледники'], gear: 'Треккинговая обувь, рюкзак, паспорт', color: 'emerald', category: 'one-day', group_size_info: 'до 15 человек', sort_order: 4 },
    { id: 'tsey', title: 'Цейский ледник', price: '3 500 ₽', duration: '1 день', difficulty: 'Легкий', distance: '10-20 km', location: 'Цей', image: '/images/tsey/main.webp', gallery: generateGallery('tsey'), short_desc: 'Самый доступный «язык вечности» на Кавказе.', description: 'Голубой лед в изумрудной оправе.', program: ['Трансфер в Цей', 'Эко-тропа через лес', 'Вид на ледник', 'Перекус', 'Возвращение'], gear: 'Треккинговые ботинки, ветровка, паспорт', color: 'blue', category: 'one-day', group_size_info: 'до 15 человек', sort_order: 5 },
    { id: 'chyzdzhyty-khokh', title: 'Гора Чызджыты-хох', price: '3 000 ₽', duration: '1 день', difficulty: 'Средний', distance: '10-20 km', location: 'Даргавс', image: '/images/chyzdzhyty-khokh/main.webp', gallery: generateGallery('chyzdzhyty-khokh'), short_desc: 'Каменный монумент чести в Скалистом хребте.', description: 'Застывший хоровод над пропастью.', program: ['07:00 — Выезд', '08:30 — Начало подъема', 'Вершина (2880м)', 'Спуск'], gear: 'Треккинговые ботинки, палки, рюкзак, вода, паспорт', color: 'emerald', category: 'one-day', group_size_info: 'до 15 человек', sort_order: 6 },
    { id: 'fetkhuz', title: 'Фетхуз', price: '3 500 ₽', duration: '1 день', difficulty: 'Легкий', distance: '10-20 km', location: 'Осетия', image: '/images/fetkhuz/main.webp', gallery: generateGallery('fetkhuz'), short_desc: 'Главная панорамная точка Владикавказа.', description: 'Зеленый балкон Алании.', program: ['Сбор', 'Подъем', 'Вершина', 'Спуск'], gear: 'Удобная обувь, ветровка, вода', color: 'blue', category: 'one-day', group_size_info: 'до 15 человек', sort_order: 7 },
    { id: 'galdoridon', title: 'Водопад Галдоридон', price: '3 500 ₽', duration: '1 день', difficulty: 'Легкий', distance: '10-20 km', location: 'Осетия', image: '/images/galdoridon/main.webp', gallery: generateGallery('galdoridon'), short_desc: 'Главная водная артерия ущелья Харес.', description: 'Белый шрам на черном камне.', program: ['Сбор', 'Подъем', 'Водопад', 'Возвращение'], gear: 'Удобная обувь, ветровка, вода', color: 'emerald', category: 'one-day', group_size_info: 'до 15 человек', sort_order: 8 },
    { id: 'osman-lagat', title: 'Пещера Осман Лагат', price: '3 500 ₽', duration: '1 день', difficulty: 'Средний', distance: '10-20 km', location: 'Осетия', image: '/images/osman-lagat/main.webp', gallery: generateGallery('osman-lagat'), short_desc: 'Скрытый портал в Карцинском ущелье.', description: 'Путешествие к центру Земли.', program: ['Сбор', 'Подъем', 'Пещера', 'Возвращение'], gear: 'Удобная обувь, фонарик, ветровка', color: 'purple', category: 'one-day', group_size_info: 'до 15 человек', sort_order: 9 },
    { id: 'stolovaya', title: 'Столовая гора', price: '3 500 ₽', duration: '1 день', difficulty: 'Сложный', distance: '10-20 km', location: 'Джейрах', image: '/images/stolovaya/main.webp', gallery: generateGallery('stolovaya'), short_desc: 'Геологический амфитеатр на границе Ингушетии и Северной Осетии.', description: 'На спине каменного гиганта.', program: ['07:00 — Выезд', 'Начало восхождения', 'Святилище Мят-Сели', 'Вершина (2998м)', '19:00 — Возвращение'], gear: 'Треккинговая обувь, ветровка, рюкзак, паспорт', color: 'red', category: 'one-day', group_size_info: 'до 15 человек', sort_order: 10 },
    { id: 'zrug-lake', title: 'Зругское озеро', price: '3 500 ₽', duration: '1 день', difficulty: 'Сложный', distance: '10-20 km', location: 'Осетия', image: '/images/zrug-lake/main.webp', gallery: generateGallery('zrug-lake'), short_desc: '«Серебряное зеркало» Осетии.', description: 'Озеро цвета жидкой ртути.', program: ['Сбор', 'Подъем', 'Озеро', 'Спуск'], gear: 'Треккинговая обувь, ветровка, паспорт', color: 'emerald', category: 'one-day', group_size_info: 'до 15 человек', sort_order: 11 },
    { id: 'kandyl-khokh', title: 'Гора Кандыл-Хох', price: '3 500 ₽', duration: '1 день', difficulty: 'Средний', distance: '10-20 km', location: 'Осетия', image: '/images/kandyl-khokh/main.webp', gallery: generateGallery('kandyl-khokh'), short_desc: 'Самый необычный «житель» Дарьяльского ущелья.', description: 'На спине каменного гиганта.', program: ['Сбор', 'Подъем', 'Вершина', 'Спуск'], gear: 'Удобная обувь, ветровка, вода', color: 'purple', category: 'one-day', group_size_info: 'до 15 человек', sort_order: 12 },
    // Multi-day
    { id: 'karmadon', title: 'Верхние Кармадонские ванны', price: '15 000 ₽', duration: '3 дня', difficulty: 'Легкий', distance: '10-20 km', location: 'Кармадон', image: '/images/karmadon/main.webp', gallery: generateGallery('karmadon'), short_desc: 'Геотермальный оазис на пути к Казбеку.', description: 'Горячее сердце ледника.', program: ['День 1. Трансфер, переход к источникам', 'День 2. Отдых, купание, прогулка к леднику', 'День 3. Спуск и возвращение'], gear: 'Треккинговая обувь, спальник, купальные принадлежности, теплая одежда', color: 'purple', category: 'multi-day', group_size_info: 'до 10 человек', sort_order: 13 },
    { id: 'huppara', title: 'Озеро Хуппара', price: '15 000 ₽', duration: '3 дня', difficulty: 'Сложный', distance: '10-20 km', location: 'Дигория', image: '/images/huppara/main.webp', gallery: generateGallery('huppara'), short_desc: 'Самый дикий и вертикальный маршрут Дигории.', description: 'Вертикальный километр к тишине.', program: ['День 1. Трансфер, разбивка лагеря', 'День 2. Выход к озеру', 'День 3. Запасной день', 'День 4. Спуск'], gear: 'Треккинговая обувь, палки, мембранная одежда', color: 'orange', category: 'multi-day', group_size_info: 'до 10 человек', sort_order: 14 },
    { id: 'kaisar', title: 'Кайсарский водопад', price: '12 000 ₽', duration: '3 дня', difficulty: 'Средний', distance: '10-20 km', location: 'Дигория', image: '/images/kaisar/main.webp', gallery: generateGallery('kaisar'), short_desc: 'Скрытая красота отдалённых ущелий.', description: 'Откройте для себя скрытую красоту.', program: ['День 1. Трансфер, переход', 'День 2. Подъем к водопаду и озеру', 'День 3. Спуск и возвращение'], gear: 'Рюкзак, палатка, спальник, треккинговая обувь', color: 'orange', category: 'multi-day', group_size_info: 'до 10 человек', sort_order: 15 },
    { id: 'kazbek', title: 'Восхождение на Казбек', price: '55 000 ₽', duration: '8 дней', difficulty: 'Экстрим', distance: '10-20 km', location: 'Кармадон', image: '/images/kazbek/main.webp', gallery: generateGallery('kazbek'), short_desc: 'Восхождение на высоту 5033м.', description: 'Восхождение на Казбек — серьёзный вызов и настоящее приключение.', program: ['День 1. Встреча, трансфер, переход (2300м)', 'День 2. Переход в лагерь (3500м)', 'День 3. Штурмовой лагерь (4200м)', 'День 4. Днёвка и отдых', 'День 5. Штурм вершины (5033м)', 'День 6. Спуск в базовый лагерь', 'День 7. Спуск и возвращение', 'День 8. Запасной день'], gear: 'Альпинистское снаряжение (полный комплект)', color: 'red', category: 'multi-day', group_size_info: '5 человек на гида', sort_order: 16, details: KAZBEK_DETAILS },
    // Dev placeholders
    { id: 'dev-jeep', title: 'Джип-туры: Скоро!', price: '—', duration: '—', difficulty: 'В разработке', distance: '—', location: 'Осетия', image: '/images/mainfoto/2.webp', gallery: [], short_desc: '', description: 'Мы разрабатываем новые маршруты на внедорожниках.', program: [], gear: '', color: 'gray', category: 'jeep', group_size_info: '', sort_order: 17 },
    { id: 'dev-excursion', title: 'Экскурсии: Скоро!', price: '—', duration: '—', difficulty: 'В разработке', distance: '—', location: 'Осетия', image: '/images/mainfoto/3.webp', gallery: [], short_desc: '', description: 'Исторические памятники Алании.', program: [], gear: '', color: 'gray', category: 'excursion', group_size_info: '', sort_order: 18 },
    { id: 'dev-gastro', title: 'Гастро-туры: Скоро!', price: '—', duration: '—', difficulty: 'В разработке', distance: '—', location: 'Осетия', image: '/images/mainfoto/4.webp', gallery: [], short_desc: '', description: 'Вкуснейшие осетинские пироги.', program: [], gear: '', color: 'gray', category: 'gastro', group_size_info: '', sort_order: 19 },
    { id: 'dev-other', title: 'Другое: Скоро!', price: '—', duration: '—', difficulty: 'В разработке', distance: '—', location: 'Осетия', image: '/images/mainfoto/5.webp', gallery: [], short_desc: '', description: 'Нестандартные маршруты.', program: [], gear: '', color: 'gray', category: 'other', group_size_info: '', sort_order: 20 },
];

// ============================================
// TEAM DATA
// ============================================
const TEAM = [
    { id: 'vitaliy', name: 'Виталий', role: 'Гид. Эксперт по безопасности', description: 'Аттестованный спасатель ГУ МЧС РСО-Алания. Многократные успешные восхождения на Казбек.', image: '/images/vitalik.webp', instagram: 'https://www.instagram.com/vitalii.alborov', sort_order: 0 },
    { id: 'roman', name: 'Роман', role: 'Гид-инструктор. Знаток Осетии', description: '2-й спортивный разряд по альпинизму. Ультрамарафонец и скайраннер.', image: '/images/ROMAN.webp', instagram: 'https://www.instagram.com/dankevich__adventure', sort_order: 1 },
    { id: 'danil', name: 'Данил', role: 'Гид-инструктор. Технический эксперт', description: 'В туризме с 2016 года. Ледолазание, скалолазание, ски-альпинизм.', image: '/images/danilphoto.webp', instagram: 'https://www.instagram.com/', sort_order: 2 },
    { id: 'anastasia', name: 'Анастасия', role: 'Гид-организатор. Душа команды', description: 'В походах с 12 лет, в профи-туризме с 2021 года. Художник-преподаватель.', image: '/images/anastasia.webp', instagram: 'https://www.instagram.com/belyaeva.mountains', sort_order: 3 },
    { id: 'konstantin', name: 'Константин', role: 'Гид. Фотограф. Спортсмен', description: 'Альпинист (3 разряд), велогонщик. Снимает горы и драйв.', image: '/images/konstantin.webp', instagram: 'https://www.instagram.com/kos_kor_a', sort_order: 4 },
    { id: 'avocado', name: 'Авокадо', role: 'Талисман клуба. Главный по атмосфере', description: 'Настоящий горный волк (в плюшевой шкуре). Альпинист 3-го «плюшевого» разряда.', image: '/images/avokado.webp', instagram: 'https://www.instagram.com/', sort_order: 5 },
];

// ============================================
// REVIEWS DATA
// ============================================
const REVIEWS = [
    { author: 'Алексей', rating: 5, text: 'Восхождение на Казбек с Виталием — это проверка себя на прочность. Было сложно, но стоя на вершине — это непередаваемо.', date: '15.06.2025', avatar: '' },
    { author: 'Азамат', rating: 5, text: 'Ходили в "Кубусскую кругосветку" с детьми. Маршрут идеален для знакомства с Дигорией.', date: '20.07.2024', avatar: '' },
    { author: 'Дмитрий', rating: 5, text: 'Кармадонские ванны — это место силы. После треккинга окунуться в горячие источники с видом на ледник — лучший релакс.', date: '10.08.2024', avatar: '' },
    { author: 'Елена', rating: 5, text: 'Цейский ледник поражает масштабом. Тропа через сосновый лес очень живописная.', date: '05.06.2025', avatar: '' },
    { author: 'Игорь', rating: 5, text: 'Тур на Столовую гору. Подъем затяжной, но вид на Владикавказ и Казбек стоит каждого шага.', date: '18.05.2024', avatar: '' },
    { author: 'Марина и Олег', rating: 5, text: 'Мидаграбинские водопады — это мощь! Спасибо за комфортный трансфер и вкусный осетинский обед.', date: '22.07.2023', avatar: '' },
];

// ============================================
// 3. RUN MIGRATION
// ============================================
async function migrate() {
    await createTables();

    // Add dates to tours
    for (const tour of TOURS) {
        tour.dates = TOUR_DATES[tour.id] || [];
        tour.reviews = [];
    }

    // Insert tours
    console.log(`\n📝 Inserting ${TOURS.length} tours...`);
    const { error: toursError } = await supabase.from('tours').upsert(TOURS, { onConflict: 'id' });
    if (toursError) {
        console.error('❌ Tours error:', toursError.message);
    } else {
        console.log('✅ Tours inserted!');
    }

    // Insert team
    console.log(`\n👥 Inserting ${TEAM.length} team members...`);
    const { error: teamError } = await supabase.from('team_members').upsert(TEAM, { onConflict: 'id' });
    if (teamError) {
        console.error('❌ Team error:', teamError.message);
    } else {
        console.log('✅ Team inserted!');
    }

    // Insert reviews
    console.log(`\n⭐ Inserting ${REVIEWS.length} reviews...`);
    // Delete existing reviews first to avoid duplicates
    await supabase.from('reviews').delete().neq('id', 0);
    const { error: reviewsError } = await supabase.from('reviews').insert(REVIEWS);
    if (reviewsError) {
        console.error('❌ Reviews error:', reviewsError.message);
    } else {
        console.log('✅ Reviews inserted!');
    }

    console.log('\n🎉 Migration complete!');
}

migrate().catch(console.error);
