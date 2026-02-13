import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Tour, TeamMember, GalleryItem, Review } from '../types';
import { getTours, getTeam, GALLERY_DATA, REVIEWS_DATA } from '../constants';

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

const RU_TRANSLATIONS: Translations = {
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
};

interface LanguageContextType {
  language: 'ru';
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
  cancelBooking: (tourId: string, startDate: string) => void; 
  addReview: (review: Review) => void;
  deleteReview: (index: number) => void;
  addGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Always Russian
  const language = 'ru';
  
  // Initialize state with default data
  const [tours, setTours] = useState<Tour[]>(() => getTours());
  const [reviews, setReviews] = useState<Review[]>(REVIEWS_DATA);
  const [gallery, setGallery] = useState<GalleryItem[]>(GALLERY_DATA);

  const team = getTeam();

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
      t: RU_TRANSLATIONS, 
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