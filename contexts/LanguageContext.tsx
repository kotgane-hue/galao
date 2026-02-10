
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Tour, TeamMember, GalleryItem, Review } from '../types';
import { getTours, getTeam, GALLERY_DATA, REVIEWS_DATA } from '../constants';

type Language = 'ru' | 'en' | 'zh';

interface Translations {
  nav: {
    home: string;
    tours: string;
    team: string;
    about: string;
    contacts: string;
    contactUs: string;
    reviews: string;
  };
  hero: {
    choose: string;
    individual: string;
    plan: string;
    mainTitle: [string, string, string]; // WE, TEAM, GALAGON
    subtitlePrefix: string;
    subtitleHighlight: string;
    subtitleSuffix: string;
    season: string;
    slogans: { title: string; highlight: string; text: string }[];
    images: {
      highlands: { alt: string; label: string };
      atmosphere: { alt: string; label: string };
      team: { alt: string; label: string };
    };
  };
  calendar: {
    weekDays: string[];
    selectedDate: string;
    noTours: string;
    orderIndiv: string;
    oneDay: string;
    multiDay: string;
    spots: string;
    available: string;
  };
  common: {
    readMore: string;
    details: string;
    book: string;
    send: string;
    name: string;
    phone: string;
    message: string;
    cancel: string;
    submitted: string;
  };
  tours: { 
    title: string;
    subtitle: string;
    directions: string;
    filters: { 
      all: string; 
      oneDay: string; 
      multiDay: string; 
      jeep: string;
      excursion: string;
      gastro: string;
      other: string;
      diff: string; 
      any: string 
    };
    notFound: string;
    reset: string;
    card: { group: string; spotsAvailable: string; maxPeople: string };
    showAll: string;
  };
  team: {
    title: string;
    subtitle: string;
    pride: string;
    reviewBtn: string;
  };
  gallery: { 
    title: string;
    highlight: string;
    desc: string;
    stats: { tourists: string; routes: string };
    contactBtn: string;
  };
  video: {
    title: string;
    subtitle: string;
  };
  reviewsSection: {
    title: string;
    subtitle: string;
    trust: string;
    leaveReview: string;
  };
  footer: {
    nav: string;
    contacts: string;
    questions: string;
    writeTg: string;
    rights: string;
  };
  modal: { 
    active: string;
    about: string;
    program: string;
    gear: string;
    reviews: string;
    apply: string;
    namePlace: string;
    phonePlace: string;
    sendBtn: string;
    agreement: string;
    gallery: string;
    schedule: string;
    spots: string;
    groupSize: string;
    seatsAvailable: string;
    reviewTitle: string;
    rating: string;
    reviewTextPlace: string;
    reviewTextPlaceHolder: string;
  };
  god: {
    tag: string;
    bgText: string;
    titlePart1: string;
    titlePart2: string;
    desc1: string;
    desc2: string;
    quote: string;
  };
  marquee: string[];
}

const BASE_TRANSLATIONS: Record<Language, Translations> = {
  ru: {
    nav: { home: 'Главная', tours: 'Маршруты', team: 'Команда', about: 'О нас', reviews: 'Отзывы', contacts: 'Контакты', contactUs: 'Связаться' },
    hero: { 
      choose: 'Выбрать маршрут', individual: 'Индивидуальный маршрут', plan: 'Спланировать путешествие',
      mainTitle: ['МЫ', 'КОМАНДА', 'ГАЛАГОН'],
      subtitlePrefix: 'Открываем', subtitleHighlight: 'дикий мир', subtitleSuffix: '. Неоновые закаты, вечные ледники и маршруты, которые меняют жизнь.',
      season: 'Сезон 2026',
      slogans: [
        { title: "Горы зовут,", highlight: "а мы знаем путь", text: "Авторские туры, ПВД и восхождения с командой профессионалов." },
        { title: "Твоя свобода", highlight: "начинается здесь", text: "Забудь о городской суете. Вдохни чистейший горный воздух." }
      ],
      images: {
        highlands: { alt: "Горный пик", label: "Высокогорье" },
        atmosphere: { alt: "Звездное небо", label: "Атмосфера" },
        team: { alt: "Туристы", label: "Команда" }
      }
    },
    calendar: {
      weekDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      selectedDate: 'Выбранная дата',
      noTours: 'Нет походов на этот день',
      orderIndiv: 'Заказать индивидуально',
      oneDay: '1 день',
      multiDay: 'Многодневный',
      spots: 'Места',
      available: 'Есть'
    },
    common: { readMore: 'Подробнее', details: 'Детали', book: 'Записаться', send: 'Отправить', name: 'Имя', phone: 'Телефон', message: 'Сообщение', cancel: 'Отмена', submitted: 'Заявка отправлена!' },
    tours: { 
      title: 'Выберите свое приключение', subtitle: 'От легких прогулок до экстремальных восхождений', directions: 'Направления',
      filters: { 
        all: 'Все', 
        oneDay: 'Однодневные', 
        multiDay: 'Многодневные', 
        jeep: 'Джип-туринг',
        excursion: 'Экскурсии',
        gastro: 'Гастро-тур',
        other: 'Другое',
        diff: 'Сложность:', 
        any: 'Любая' 
      },
      notFound: 'Маршруты не найдены', reset: 'Сбросить фильтры',
      card: { group: 'Группа', spotsAvailable: 'Есть свободные места', maxPeople: 'Максимум участников' },
      showAll: 'Показать все маршруты'
    },
    team: { title: 'Команда Галагон', subtitle: 'Профессионалы, влюбленные в горы.', pride: 'Наша гордость', reviewBtn: 'Оставить отзыв' },
    gallery: { 
      title: 'Мы показываем', 
      highlight: 'настоящую красоту', 
      desc: 'Уже более 5 лет команда Галагон открывает людям магию гор. За это время мы провели более 2000 довольных туристов по самым диким тропам Кавказа. Наши гиды — опытные профессионалы, для которых безопасность — это закон, а горы — это жизнь. Мы продумываем каждую деталь вашего путешествия, чтобы вы вернулись домой не только с красивыми фото, но и с новым взглядом на мир.', 
      stats: { tourists: 'Счастливых туристов', routes: 'Уникальных маршрутов' }, 
      contactBtn: 'Связаться с нами' 
    },
    video: {
      title: 'Наши приключения',
      subtitle: 'Погрузитесь в атмосферу гор вместе с нами.'
    },
    reviewsSection: {
      title: 'Что говорят наши туристы',
      subtitle: 'Живые эмоции, настоящие истории и тысячи пройденных километров вместе с нами.',
      trust: 'Доверие',
      leaveReview: 'Оставить отзыв'
    },
    footer: { nav: 'Навигация', contacts: 'Контакты', questions: 'Остались вопросы?', writeTg: 'Написать в Telegram', rights: 'Все права защищены.' },
    modal: { 
      active: 'Активный', about: 'О походе', program: 'Программа', gear: 'Что взять с собой', reviews: 'Отзывы участников', apply: 'Записаться', namePlace: 'Ваше имя', phonePlace: 'Номер телефона', sendBtn: 'Отправить', agreement: 'Нажимая кнопку, вы соглашаетесь с условиями обработки данных', gallery: 'Фотогалерея',
      schedule: 'Расписание и группы', spots: 'мест', groupSize: 'Размер группы', seatsAvailable: 'Свободно мест',
      reviewTitle: 'Поделитесь впечатлениями', rating: 'Ваша оценка', reviewTextPlace: 'Расскажите, как все прошло...', reviewTextPlaceHolder: 'Ваш отзыв...'
    },
    god: {
      tag: 'Мифология Осетии',
      bgText: 'ГАЛАГОН',
      titlePart1: 'ЛЕГЕНДА',
      titlePart2: 'О ГАЛАГОНЕ',
      desc1: 'В древних аланских преданиях Галагон — это дух ветра и покровитель путников. Он живет на стыке неба и камня, там, где облака касаются ледников.',
      desc2: 'Говорят, что он открывает путь только тем, кто идет в горы с чистым сердцем и уважением. Галагон — это не просто миф, это воплощение дикой, необузданной природы Осетии, которую мы стремимся показать вам.',
      quote: '«Тот, кто слышит шепот ветра, слышит голос Галагона»'
    },
    marquee: ['Горы зовут', 'Приключения ждут', 'Безопасность', 'Лучшие гиды', 'Эмоции']
  },
  en: {
    nav: { home: 'Home', tours: 'Tours', team: 'Team', about: 'About', reviews: 'Reviews', contacts: 'Contacts', contactUs: 'Contact Us' },
    hero: { 
      choose: 'Choose Tour', individual: 'Private Tour', plan: 'Plan a Trip',
      mainTitle: ['WE ARE', 'THE TEAM', 'GALAGON'],
      subtitlePrefix: 'Discovering', subtitleHighlight: 'wild world', subtitleSuffix: '. Neon sunsets, eternal glaciers, and life-changing routes.',
      season: 'Season 2026',
      slogans: [
        { title: "Mountains calling,", highlight: "we know the way", text: "Author tours and climbing with a team of professionals." },
        { title: "Your freedom", highlight: "starts here", text: "Forget the city bustle. Breathe in the pure mountain air." }
      ],
      images: {
        highlands: { alt: "Mountain Peak", label: "Highlands" },
        atmosphere: { alt: "Starry Sky", label: "Atmosphere" },
        team: { alt: "Hikers", label: "Team" }
      }
    },
    calendar: {
      weekDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      selectedDate: 'Selected Date',
      noTours: 'No tours on this day',
      orderIndiv: 'Book Private Tour',
      oneDay: '1 Day',
      multiDay: 'Multi-day',
      spots: 'Spots',
      available: 'Yes'
    },
    common: { readMore: 'Details', details: 'Details', book: 'Book Now', send: 'Send', name: 'Name', phone: 'Phone', message: 'Message', cancel: 'Cancel', submitted: 'Application sent!' },
    tours: { 
      title: 'Choose Your Adventure', subtitle: 'From easy walks to extreme climbs', directions: 'Destinations',
      filters: { 
        all: 'All', 
        oneDay: '1 day', 
        multiDay: 'Multi-day',
        jeep: 'Jeep Touring',
        excursion: 'Excursions',
        gastro: 'Gastro Tour',
        other: 'Other', 
        diff: 'Difficulty:', 
        any: 'Any' 
      },
      notFound: 'No tours found', reset: 'Reset filters',
      card: { group: 'Group', spotsAvailable: 'Spots available', maxPeople: 'Max participants' },
      showAll: 'See All Routes'
    },
    team: { title: 'Galagon Team', subtitle: 'Professionals in love with mountains.', pride: 'Our Pride', reviewBtn: 'Leave Review' },
    gallery: { 
      title: 'We show', 
      highlight: 'true beauty', 
      desc: 'For over 5 years, the Galagon team has been revealing the magic of the mountains. In this time, we have guided over 2000 happy tourists along the wildest trails of the Caucasus. Our guides are experienced professionals for whom safety is the law and mountains are life. We plan every detail of your journey so you return home with a new perspective on the world.', 
      stats: { tourists: 'Happy Tourists', routes: 'Unique Routes' }, 
      contactBtn: 'Contact Us' 
    },
    video: {
      title: 'Our Adventures',
      subtitle: 'Immerse yourself in the mountain atmosphere with us.'
    },
    reviewsSection: {
      title: 'What Our Tourists Say',
      subtitle: 'Real emotions, true stories, and thousands of kilometers traveled together with us.',
      trust: 'Trust',
      leaveReview: 'Leave a Review'
    },
    footer: { nav: 'Navigation', contacts: 'Contacts', questions: 'Questions?', writeTg: 'Write on Telegram', rights: 'All rights reserved.' },
    modal: { 
      active: 'Active', about: 'About Tour', program: 'Program', gear: 'What to bring', reviews: 'Reviews', apply: 'Book Now', namePlace: 'Your Name', phonePlace: 'Phone Number', sendBtn: 'Send Request', agreement: 'By clicking, you agree to terms', gallery: 'Photo Gallery',
      schedule: 'Schedule & Groups', spots: 'spots', groupSize: 'Group Size', seatsAvailable: 'Seats Available',
      reviewTitle: 'Share your experience', rating: 'Your Rating', reviewTextPlace: 'Tell us how it went...', reviewTextPlaceHolder: 'Your review...'
    },
    god: {
      tag: 'North Ossetian Mythology',
      bgText: 'GALAGON',
      titlePart1: 'THE LEGEND',
      titlePart2: 'OF GALAGON',
      desc1: 'In ancient Alan legends, Galagon is the spirit of the wind and the patron of travelers. He lives where the sky touches the glaciers.',
      desc2: 'It is said that he reveals the path only to those who go to the mountains with a pure heart and respect. Galagon is not just a myth, it is the embodiment of the wild, untamed nature of Ossetia.',
      quote: '"He who hears the whisper of the wind, hears the voice of Galagon"'
    },
    marquee: ['Mountains Calling', 'Adventure Awaits', 'Safety First', 'Best Guides', 'Emotions']
  },
  zh: {
    nav: { home: '首页', tours: '路线', team: '团队', about: '关于我们', reviews: '评论', contacts: '联系方式', contactUs: '联系我们' },
    hero: { 
      choose: '选择路线', individual: '私人旅游', plan: '计划旅行', 
      mainTitle: ['我们', '团队', 'GALAGON'],
      subtitlePrefix: '发现', subtitleHighlight: '狂野世界', subtitleSuffix: '。霓虹般的日落，永恒的冰川和改变生活的路线。',
      season: '2026 赛季',
      slogans: [{ title: "大山在召唤，", highlight: "我们知道路", text: "专业团队带领的特色旅游和登山。" }, { title: "你的自由", highlight: "从这里开始", text: "忘记城市的喧嚣。呼吸纯净的山区空气。" }],
      images: {
        highlands: { alt: "山峰", label: "高地" },
        atmosphere: { alt: "星空", label: "气氛" },
        team: { alt: "游客", label: "团队" }
      }
    },
    calendar: {
      weekDays: ['一', '二', '三', '四', '五', '六', '日'],
      selectedDate: '选定日期',
      noTours: '这天没有旅游',
      orderIndiv: '预订私人旅游',
      oneDay: '1天',
      multiDay: '多天',
      spots: '座位',
      available: '有'
    },
    common: { readMore: '详情', details: '细节', book: '预订', send: '发送', name: '姓名', phone: '电话', message: '信息', cancel: '取消', submitted: '已发送！' },
    tours: { 
      title: '选择你的冒险', subtitle: '从轻松散步到极限攀登', directions: '目的地', 
      filters: { 
        all: '全部', 
        oneDay: '1天', 
        multiDay: '多天',
        jeep: '吉普车旅游',
        excursion: '游览',
        gastro: '美食之旅',
        other: '其他', 
        diff: '难度:', 
        any: '任意' 
      }, 
      notFound: '未找到', reset: '重置',
      card: { group: '团队', spotsAvailable: '有空位', maxPeople: '最大人数' },
      showAll: '显示所有路线'
    },
    team: { title: 'Galagon 团队', subtitle: '热爱大山的专业人士。', pride: '我们的骄傲', reviewBtn: '留下评论' },
    gallery: { 
      title: '我们展示', 
      highlight: '真正的美', 
      desc: '5年多来，Galagon 团队一直在揭示大山的魔力。在此期间，我们带领超过2000名快乐的游客走过高加索最野性的道路。我们的向导是经验丰富的专业人士，对他们来说，安全是法律。我们精心策划您旅程的每一个细节，让您带着对世界的新视角回家。', 
      stats: { tourists: '快乐的游客', routes: '独特的路线' }, 
      contactBtn: '联系我们' 
    },
    video: {
      title: '我们的冒险',
      subtitle: '与我们一起沉浸在山区的氛围中。'
    },
    reviewsSection: {
      title: '游客评价',
      subtitle: '真实的情感，真实的故事，以及与我们一起走过的数千公里。',
      trust: '信任',
      leaveReview: '留下评论'
    },
    footer: { nav: '导航', contacts: '联系方式', questions: '有问题吗？', writeTg: '在 Telegram 上写信', rights: '保留所有权利。' },
    modal: { active: '活跃', about: '关于旅游', program: '行程', gear: '携带物品', reviews: '评论', apply: '预订', namePlace: '您的姓名', phonePlace: '电话号码', sendBtn: '发送请求', agreement: '点击即表示同意条款', gallery: '相册', schedule: '时间表', spots: '个位', groupSize: '团队规模', seatsAvailable: '可用座位', reviewTitle: '分享您的体验', rating: '您的评分', reviewTextPlace: '告诉我们要怎么...', reviewTextPlaceHolder: '您的评论...' },
    god: {
      tag: '北奥塞梯神话',
      bgText: 'GALAGON',
      titlePart1: '加拉贡',
      titlePart2: '的传说',
      desc1: '在古老的阿兰传说中，Galagon 是风之灵。他住在天空接触冰川的地方。',
      desc2: '据说他只向心地纯洁的人展示道路。Galagon 是奥塞梯狂野自然的化身。',
      quote: '“听到风的低语，就是听到 Galagon 的声音”'
    },
    marquee: ['大山在召唤', '冒险等待', '安全第一', '最好的向导', '情感']
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  tours: Tour[];
  team: TeamMember[];
  gallery: GalleryItem[];
  reviews: Review[];
  // CRUD Operations
  addTour: (tour: Tour) => void;
  updateTour: (tour: Tour) => void;
  deleteTour: (id: string) => void;
  bookTour: (tourId: string, startDate: string) => void; 
  cancelBooking: (tourId: string, startDate: string) => void; // New function
  addReview: (review: Review) => void;
  deleteReview: (index: number) => void;
  addGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');
  
  // Initialize state with default data
  const [tours, setTours] = useState<Tour[]>(() => getTours('ru'));
  const [reviews, setReviews] = useState<Review[]>(REVIEWS_DATA);
  const [gallery, setGallery] = useState<GalleryItem[]>(GALLERY_DATA);

  // Update tours when language changes to get correct translations
  useEffect(() => {
    // Note: This will reset any custom added tours when language switches.
    setTours(getTours(language));
  }, [language]);

  const team = getTeam(language);

  // Actions
  const addTour = (tour: Tour) => setTours(prev => [...prev, tour]);
  const updateTour = (tour: Tour) => setTours(prev => prev.map(t => t.id === tour.id ? tour : t));
  const deleteTour = (id: string) => setTours(prev => prev.filter(t => t.id !== id));

  // Increment booked spots
  const bookTour = (tourId: string, startDate: string) => {
    setTours(prev => prev.map(t => {
      if (t.id !== tourId || !t.dates) return t;
      
      const updatedDates = t.dates.map(date => {
        if (date.startDate === startDate && date.bookedSpots < date.totalSpots) {
          return { ...date, bookedSpots: date.bookedSpots + 1 };
        }
        return date;
      });

      return { ...t, dates: updatedDates };
    }));
  };

  // Decrement booked spots (Cancel)
  const cancelBooking = (tourId: string, startDate: string) => {
    setTours(prev => prev.map(t => {
      if (t.id !== tourId || !t.dates) return t;
      
      const updatedDates = t.dates.map(date => {
        if (date.startDate === startDate && date.bookedSpots > 0) {
          return { ...date, bookedSpots: date.bookedSpots - 1 };
        }
        return date;
      });

      return { ...t, dates: updatedDates };
    }));
  };

  const addReview = (review: Review) => setReviews(prev => [review, ...prev]);
  const deleteReview = (index: number) => setReviews(prev => prev.filter((_, i) => i !== index));

  const addGalleryItem = (item: GalleryItem) => setGallery(prev => [...prev, item]);
  const deleteGalleryItem = (id: string) => setGallery(prev => prev.filter(i => i.id !== id));

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t: BASE_TRANSLATIONS[language], 
      tours, 
      team, 
      gallery, 
      reviews,
      addTour,
      updateTour,
      deleteTour,
      bookTour,
      cancelBooking,
      addReview,
      deleteReview,
      addGalleryItem,
      deleteGalleryItem
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
];
