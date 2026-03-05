import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Tour, TeamMember, GalleryItem, Review } from '../types';
import { getTours, getTeam, GALLERY_DATA, REVIEWS_DATA } from '../constants';
import { supabase } from '../lib/supabase';

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
    mainTitle: [string, string, string];
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
  dataLoading: boolean;
  addTour: (tour: Tour) => Promise<void>;
  updateTour: (tour: Tour) => Promise<void>;
  deleteTour: (id: string) => Promise<void>;
  bookTour: (tourId: string, startDate: string) => void;
  cancelBooking: (tourId: string, startDate: string) => void;
  addReview: (review: Review) => Promise<void>;
  deleteReview: (index: number) => Promise<void>;
  addTeamMember: (member: TeamMember) => Promise<void>;
  updateTeamMember: (member: TeamMember) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;
  addGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;
  refreshData: () => Promise<void>;
  addDateToTour: (tourId: string, date: { startDate: string; endDate: string; totalSpots: number }) => Promise<void>;
  removeDateFromTour: (tourId: string, startDate: string) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper: Map Supabase row to Tour type
function mapDbTour(row: any): Tour {
  return {
    id: row.id,
    title: row.title,
    price: row.price,
    duration: row.duration,
    difficulty: row.difficulty,
    distance: row.distance || '',
    location: row.location || '',
    image: row.image,
    gallery: row.gallery || [],
    shortDesc: row.short_desc || '',
    desc: row.description || '',
    program: row.program || [],
    gear: row.gear || '',
    color: row.color || 'emerald',
    category: row.category || 'one-day',
    reviews: row.reviews || [],
    dates: row.dates || [],
    groupSizeInfo: row.group_size_info || '',
    details: row.details || undefined,
  };
}

// Helper: Map Tour to Supabase row
function tourToDb(tour: Tour): any {
  return {
    id: tour.id,
    title: tour.title,
    price: tour.price,
    duration: tour.duration,
    difficulty: tour.difficulty,
    distance: tour.distance || '',
    location: tour.location || '',
    image: tour.image,
    gallery: tour.gallery || [],
    short_desc: tour.shortDesc || '',
    description: tour.desc || '',
    program: tour.program || [],
    gear: tour.gear || '',
    color: tour.color || 'emerald',
    category: tour.category || 'one-day',
    reviews: tour.reviews || [],
    dates: tour.dates || [],
    group_size_info: tour.groupSizeInfo || '',
    details: tour.details || null,
    sort_order: 0,
    updated_at: new Date().toISOString(),
  };
}

// Helper: Map Supabase row to TeamMember
function mapDbTeam(row: any): TeamMember {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    desc: row.description || '',
    image: row.image,
    instagram: row.instagram || '',
  };
}

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const language = 'ru';

  // Initialize state with local data (instant UI), then overwrite from Supabase
  const [tours, setTours] = useState<Tour[]>(() => getTours());
  const [team, setTeam] = useState<TeamMember[]>(() => getTeam());
  const [reviews, setReviews] = useState<Review[]>(REVIEWS_DATA);
  const [gallery, setGallery] = useState<GalleryItem[]>(GALLERY_DATA);
  const [dataLoading, setDataLoading] = useState(true);

  // Fetch data from Supabase
  const refreshData = useCallback(async () => {
    try {
      const { data: toursData, error: toursErr } = await supabase
        .from('tours')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!toursErr && toursData) {
        const dbTours = toursData.map(mapDbTour);
        const localTours = getTours();
        // Merge dbTours with local getTours(), overriding local ones with DB ones by ID
        const mergedTours = localTours.map(local => dbTours.find(db => db.id === local.id) || local);
        // Add any new tours from DB that aren't in local
        const newDbTours = dbTours.filter(db => !localTours.some(local => local.id === db.id));
        setTours([...mergedTours, ...newDbTours]);
      }

      const { data: teamData, error: teamErr } = await supabase
        .from('team_members')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!teamErr && teamData) {
        const dbTeam = teamData.map(mapDbTeam);
        const localTeam = getTeam();
        const mergedTeam = localTeam.map(local => dbTeam.find(db => db.id === local.id) || local);
        const newDbTeam = dbTeam.filter(db => !localTeam.some(local => local.id === db.id));
        setTeam([...mergedTeam, ...newDbTeam]);
      }

      const { data: reviewsData, error: reviewsErr } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (!reviewsErr && reviewsData && reviewsData.length > 0) {
        setReviews(reviewsData.map(r => ({
          author: r.author,
          rating: r.rating,
          text: r.text,
          date: r.date,
          avatar: r.avatar || '',
        })));
      }
    } catch (err) {
      console.warn('Supabase fetch failed, using local data:', err);
    } finally {
      setDataLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // ======== TOUR CRUD ========
  const addTour = async (tour: Tour) => {
    setTours(prev => [...prev, tour]);
    const { error } = await supabase.from('tours').insert(tourToDb(tour));
    if (error) console.error('addTour error:', error.message);
    else await refreshData();
  };

  const updateTour = async (tour: Tour) => {
    setTours(prev => prev.map(t => t.id === tour.id ? tour : t));
    const { error } = await supabase.from('tours').upsert(tourToDb(tour));
    if (error) console.error('updateTour error:', error.message);
  };

  const deleteTour = async (id: string) => {
    setTours(prev => prev.filter(t => t.id !== id));
    const { error } = await supabase.from('tours').delete().eq('id', id);
    if (error) console.error('deleteTour error:', error.message);
  };

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

  // ======== REVIEW CRUD ========
  const addReview = async (review: Review) => {
    setReviews(prev => [review, ...prev]);
    const { error } = await supabase.from('reviews').insert({
      author: review.author,
      rating: review.rating,
      text: review.text,
      date: review.date,
      avatar: review.avatar || '',
    });
    if (error) console.error('addReview error:', error.message);
  };

  const deleteReview = async (index: number) => {
    const targetReview = reviews[index];
    setReviews(prev => prev.filter((_, i) => i !== index));
    if (targetReview) {
      const { error } = await supabase.from('reviews').delete().match({ author: targetReview.author, text: targetReview.text });
      if (error) console.error('deleteReview error:', error.message);
    }
  };

  // ======== TEAM CRUD ========
  const addTeamMember = async (member: TeamMember) => {
    setTeam(prev => [...prev, member]);
    const { error } = await supabase.from('team_members').insert({
      id: member.id,
      name: member.name,
      role: member.role,
      description: member.desc,
      image: member.image,
      instagram: member.instagram || '',
      sort_order: team.length,
    });
    if (error) console.error('addTeamMember error:', error.message);
  };

  const updateTeamMember = async (member: TeamMember) => {
    setTeam(prev => prev.map(m => m.id === member.id ? member : m));
    const { error } = await supabase.from('team_members').upsert({
      id: member.id,
      name: member.name,
      role: member.role,
      description: member.desc,
      image: member.image,
      instagram: member.instagram || '',
      sort_order: team.length,
    });
    if (error) console.error('updateTeamMember error:', error.message);
  };

  const deleteTeamMember = async (id: string) => {
    setTeam(prev => prev.filter(m => m.id !== id));
    const { error } = await supabase.from('team_members').delete().eq('id', id);
    if (error) console.error('deleteTeamMember error:', error.message);
  };

  // ======== GALLERY (kept local) ========
  const addGalleryItem = (item: GalleryItem) => setGallery(prev => [...prev, item]);
  const deleteGalleryItem = (id: string) => setGallery(prev => prev.filter(i => i.id !== id));

  // ======== CALENDAR DATE MANAGEMENT ========
  const addDateToTour = async (tourId: string, date: { startDate: string; endDate: string; totalSpots: number }) => {
    const tour = tours.find(t => t.id === tourId);
    if (!tour) return;

    const newDate = { ...date, bookedSpots: 0 };
    const updatedDates = [...(tour.dates || []), newDate];
    const updatedTour = { ...tour, dates: updatedDates };

    setTours(prev => prev.map(t => t.id === tourId ? updatedTour : t));

    const { error } = await supabase
      .from('tours')
      .upsert(tourToDb(updatedTour));
    if (error) console.error('addDateToTour error:', error.message);
  };

  const removeDateFromTour = async (tourId: string, startDate: string) => {
    const tour = tours.find(t => t.id === tourId);
    if (!tour || !tour.dates) return;

    const updatedDates = tour.dates.filter(d => d.startDate !== startDate);
    const updatedTour = { ...tour, dates: updatedDates };

    setTours(prev => prev.map(t => t.id === tourId ? updatedTour : t));

    const { error } = await supabase
      .from('tours')
      .upsert(tourToDb(updatedTour));
    if (error) console.error('removeDateFromTour error:', error.message);
  };

  return (
    <LanguageContext.Provider value={{
      language,
      t: RU_TRANSLATIONS,
      tours,
      team,
      gallery,
      reviews,
      dataLoading,
      addTour,
      updateTour,
      deleteTour,
      bookTour,
      cancelBooking,
      addReview,
      deleteReview,
      addTeamMember,
      updateTeamMember,
      deleteTeamMember,
      addGalleryItem,
      deleteGalleryItem,
      refreshData,
      addDateToTour,
      removeDateFromTour,
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