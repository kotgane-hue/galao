import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Calendar as CalendarIcon, MapPin, Clock, ArrowRight as ArrowRightIcon, Plus, Trash2, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Tour } from '../types';

interface CalendarModalProps {
  onClose: () => void;
  onOpenTour: (tour: Tour) => void;
}

// Native Date Utils replacement for date-fns
const getStartOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);
const getEndOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);

const getStartOfWeek = (date: Date) => {
  const day = date.getDay();
  const diff = day === 0 ? 6 : day - 1;
  const d = new Date(date);
  d.setDate(d.getDate() - diff);
  return d;
};

const getEndOfWeek = (date: Date) => {
  const d = getStartOfWeek(date);
  d.setDate(d.getDate() + 6);
  return d;
};

const eachDayOfInterval = (start: Date, end: Date) => {
  const days: Date[] = [];
  const current = new Date(start);
  while (current <= end) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return days;
};

const isSameMonth = (d1: Date, d2: Date) =>
  d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();

const isSameDay = (d1: Date, d2: Date) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

const isToday = (d: Date) => isSameDay(d, new Date());

const addMonths = (d: Date, n: number) => {
  const newDate = new Date(d);
  newDate.setMonth(d.getMonth() + n);
  return newDate;
};

const subMonths = (d: Date, n: number) => addMonths(d, -n);

const parseISO = (s: string) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
};

const isWithinInterval = (date: Date, { start, end }: { start: Date, end: Date }) => {
  const t = date.getTime();
  const s = start.getTime();
  const e = end.getTime();
  return t >= s && t <= e;
};

const formatDateISO = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const CalendarModal: React.FC<CalendarModalProps> = ({ onClose, onOpenTour }) => {
  const { tours, t, addDateToTour, removeDateFromTour } = useLanguage();
  const { isAdmin } = useAuth();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Admin state
  const [showAddTour, setShowAddTour] = useState(false);
  const [addSpots, setAddSpots] = useState('10');
  const [addEndDate, setAddEndDate] = useState('');

  const monthStart = getStartOfMonth(currentMonth);
  const monthEnd = getEndOfMonth(monthStart);
  const startDate = getStartOfWeek(monthStart);
  const endDate = getEndOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval(startDate, endDate);
  const weekDays = t.calendar.weekDays;

  const getToursForDate = (date: Date) => {
    return tours.filter(tour =>
      tour.dates && tour.dates.some(tourDate => {
        const start = parseISO(tourDate.startDate);
        const end = parseISO(tourDate.endDate);
        return isWithinInterval(date, { start, end });
      })
    );
  };

  // Get tours that DON'T have this date yet (for the add dropdown)
  const getAvailableToursForDate = (date: Date) => {
    const dateStr = formatDateISO(date);
    return tours.filter(tour => {
      // Skip placeholder/dev tours
      if (tour.id.startsWith('dev-')) return false;
      const alreadyHasDate = tour.dates?.some(d => d.startDate === dateStr);
      return !alreadyHasDate;
    });
  };

  const selectedDayTours = getToursForDate(selectedDate);
  const availableTours = getAvailableToursForDate(selectedDate);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleTourClick = (tour: Tour) => {
    onOpenTour(tour);
    onClose();
  };

  const handleAddTourToDate = async (tourId: string) => {
    const dateStr = formatDateISO(selectedDate);
    const endStr = addEndDate || dateStr;
    await addDateToTour(tourId, {
      startDate: dateStr,
      endDate: endStr,
      totalSpots: parseInt(addSpots) || 10,
    });
    setShowAddTour(false);
    setAddEndDate('');
    setAddSpots('10');
  };

  const handleRemoveTourFromDate = async (tourId: string) => {
    const dateStr = formatDateISO(selectedDate);
    await removeDateFromTour(tourId, dateStr);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleOverlayClick}
      />

      {/* Glass Modal Container */}
      <div className="relative w-full max-w-7xl h-[85vh] bg-white/70 dark:bg-gray-900/60 backdrop-blur-3xl rounded-3xl md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/20 dark:border-white/10 animate-scale-in">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 md:top-6 md:right-6 z-[60] text-gray-600 dark:text-gray-300 hover:text-white bg-white/40 dark:bg-black/40 hover:bg-red-500 dark:hover:bg-red-500 rounded-full p-2.5 transition-all border border-white/10 hover:rotate-90 backdrop-blur-md shadow-sm"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left Side: Calendar Grid */}
        <div className="w-full md:w-2/3 p-6 md:p-10 flex flex-col overflow-y-auto scrollbar-thin pt-16 md:pt-10">
          <div className="flex justify-between items-center mb-6 md:mb-10">
            <button onClick={prevMonth} className="p-3 hover:bg-white/20 dark:hover:bg-white/10 rounded-full transition-all text-gray-700 dark:text-white border border-transparent hover:border-white/20">
              <ChevronLeft className="w-8 h-8" />
            </button>

            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-black text-gray-900 dark:text-white capitalize tracking-tight drop-shadow-sm">
                {currentMonth.toLocaleString('ru', { month: 'long' })}
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 font-light tracking-widest">
                {currentMonth.getFullYear()}
              </p>
            </div>

            <button onClick={nextMonth} className="p-3 hover:bg-white/20 dark:hover:bg-white/10 rounded-full transition-all text-gray-700 dark:text-white border border-transparent hover:border-white/20">
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>

          <div className="grid grid-cols-7 mb-6">
            {weekDays.map((day, idx) => (
              <div key={idx} className="text-center font-bold text-gray-400 dark:text-gray-500 text-xs md:text-sm uppercase tracking-widest">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 md:gap-4">
            {calendarDays.map((day) => {
              const isSelected = isSameDay(day, selectedDate);
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const isTodayDate = isToday(day);
              const dayTours = getToursForDate(day);
              const hasTours = dayTours.length > 0;

              return (
                <button
                  key={day.toString()}
                  onClick={() => { setSelectedDate(day); setShowAddTour(false); }}
                  className={`
                    relative aspect-square rounded-2xl md:rounded-3xl flex flex-col items-center justify-center transition-all duration-300 group
                    ${!isCurrentMonth ? 'opacity-20 text-gray-400 dark:text-gray-600' : 'text-gray-700 dark:text-gray-200'}
                    ${isSelected
                      ? 'bg-electric-blue/90 dark:bg-emerald-600/90 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] dark:shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-110 z-10 border border-white/20'
                      : 'bg-white/30 dark:bg-white/5 hover:bg-white/50 dark:hover:bg-white/10 hover:scale-105 border border-white/10'
                    }
                    ${isTodayDate && !isSelected ? 'ring-2 ring-electric-blue/50 dark:ring-emerald-500/50' : ''}
                  `}
                >
                  <span className={`text-base md:text-xl font-bold ${isSelected ? 'text-white' : ''}`}>
                    {day.getDate()}
                  </span>

                  {hasTours && (
                    <div className="flex gap-1 mt-1.5 md:mt-2">
                      {dayTours.slice(0, 3).map((tour, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full shadow-sm ${isSelected ? 'bg-white box-shadow-glow' : (tour.color === 'red' ? 'bg-red-500' : 'bg-electric-blue dark:bg-emerald-400')}`}
                        />
                      ))}
                      {dayTours.length > 3 && (
                        <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-gray-400 dark:bg-gray-500'}`} />
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Only: Simple List of Tours below calendar */}
          <div className="md:hidden mt-6 pb-32">
            {selectedDayTours.length > 0 ? (
              <div className="space-y-3">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-center uppercase tracking-wide text-xs">
                  {selectedDate.toLocaleString('ru', { day: 'numeric', month: 'long' })}
                </h4>
                {selectedDayTours.map(tour => (
                  <div
                    key={tour.id}
                    className="bg-white/40 dark:bg-gray-800/40 p-4 rounded-xl border border-white/10 flex justify-between items-center"
                  >
                    <div onClick={() => handleTourClick(tour)} className="flex-1 cursor-pointer">
                      <div className="font-bold text-sm text-gray-900 dark:text-white">{tour.title}</div>
                      <div className="text-xs text-gray-500">{tour.duration} • {tour.price}</div>
                    </div>
                    {isAdmin && (
                      <button
                        onClick={() => handleRemoveTourFromDate(tour.id)}
                        className="ml-2 p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Убрать с этой даты"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <ArrowRightIcon className="w-4 h-4 text-electric-blue dark:text-emerald-400 ml-2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 px-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <CalendarIcon className="w-10 h-10 text-gray-400 mb-3 opacity-50" />
                <p className="text-center text-sm text-gray-500 mb-4 font-medium">{t.calendar.noTours}</p>
                <a href="https://t.me/Galagon_support_bot" target="_blank" rel="noopener noreferrer" className="w-full max-w-xs py-4 bg-electric-blue/10 dark:bg-emerald-500/10 hover:bg-electric-blue/20 dark:hover:bg-emerald-500/20 backdrop-blur-md rounded-xl text-electric-blue dark:text-emerald-400 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all border border-electric-blue/20 dark:border-emerald-500/20 shadow-lg active:scale-95">
                  {t.calendar.orderIndiv} <ArrowRightIcon className="w-4 h-4" />
                </a>
              </div>
            )}

            {/* Mobile Admin: Add tour to date */}
            {isAdmin && (
              <div className="mt-4">
                {!showAddTour ? (
                  <button
                    onClick={() => setShowAddTour(true)}
                    className="w-full py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
                  >
                    <Plus className="w-4 h-4" /> Добавить маршрут на эту дату
                  </button>
                ) : (
                  <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-700 space-y-3">
                    <p className="text-xs text-gray-400 font-bold uppercase">Выберите маршрут:</p>
                    <div className="max-h-48 overflow-y-auto space-y-2">
                      {availableTours.map(tour => (
                        <button
                          key={tour.id}
                          onClick={() => handleAddTourToDate(tour.id)}
                          className="w-full text-left px-3 py-2.5 bg-gray-700/50 hover:bg-emerald-500/20 rounded-lg text-sm text-gray-200 hover:text-emerald-300 transition-colors flex items-center gap-2"
                        >
                          <Check className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100" />
                          <span className="font-medium">{tour.title}</span>
                          <span className="ml-auto text-xs text-gray-500">{tour.duration}</span>
                        </button>
                      ))}
                      {availableTours.length === 0 && (
                        <p className="text-xs text-gray-500 italic py-2">Все маршруты уже добавлены</p>
                      )}
                    </div>
                    <button
                      onClick={() => setShowAddTour(false)}
                      className="w-full py-2 text-xs text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      Отмена
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Details Sidebar (Darker Glass) - Hidden on Mobile */}
        <div className="hidden md:flex w-full md:w-1/3 bg-white/40 dark:bg-black/20 border-l border-white/20 dark:border-white/5 p-6 md:p-8 flex-col overflow-hidden backdrop-blur-md">
          <div className="w-full text-center py-4 mb-6 shrink-0 border-b border-gray-200/20 dark:border-white/10">
            <span className="text-electric-blue dark:text-emerald-400 font-bold uppercase tracking-[0.2em] text-xs">{t.calendar.selectedDate}</span>
            <h3 className="text-4xl font-heading font-black text-deep-slate dark:text-white mt-2 capitalize drop-shadow-md">
              {selectedDate.toLocaleString('ru', { day: 'numeric', month: 'short' })}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 capitalize font-medium">
              {selectedDate.toLocaleString('ru', { weekday: 'long' })}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin pb-4">
            {selectedDayTours.length > 0 ? (
              selectedDayTours.map(tour => (
                <div
                  key={tour.id}
                  className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-5 border border-white/40 dark:border-white/5 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all group shadow-lg cursor-pointer hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className="flex justify-between items-start mb-3" onClick={() => handleTourClick(tour)}>
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white leading-tight group-hover:text-electric-blue dark:group-hover:text-emerald-400 transition-colors">
                      {tour.title}
                    </h4>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide backdrop-blur-md ${tour.color === 'red' ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20' : 'bg-electric-blue/10 dark:bg-emerald-500/10 text-electric-blue dark:text-emerald-400 border border-electric-blue/20 dark:border-emerald-500/20'
                      }`}>
                      {tour.category === 'one-day' ? t.calendar.oneDay : t.calendar.multiDay}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-300 mb-4 font-medium" onClick={() => handleTourClick(tour)}>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-electric-blue dark:text-emerald-500" /> {tour.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-electric-blue dark:text-emerald-500" /> {tour.location}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-200/50 dark:border-white/10">
                    <span className="font-black text-lg text-gray-900 dark:text-white">{tour.price}</span>
                    <div className="flex items-center gap-2">
                      {isAdmin && (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleRemoveTourFromDate(tour.id); }}
                          className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Убрать с этой даты"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <div className="text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-1 font-bold uppercase">
                        {t.calendar.spots}: <span className="text-electric-blue dark:text-emerald-400">{t.calendar.available}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
                <div className="w-20 h-20 bg-gray-100/50 dark:bg-white/5 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm border border-white/10">
                  <CalendarIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">{t.calendar.noTours}</p>
                <a href="https://t.me/Galagon_support_bot" target="_blank" rel="noopener noreferrer" className="mt-6 px-6 py-3 bg-white/20 dark:bg-white/10 hover:bg-white/40 dark:hover:bg-white/20 backdrop-blur-md rounded-xl text-electric-blue dark:text-emerald-400 text-xs font-bold uppercase tracking-wide flex items-center gap-2 transition-all border border-white/10">
                  {t.calendar.orderIndiv} <ArrowRightIcon className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>

          {/* Desktop Admin: Add tour to date */}
          {isAdmin && (
            <div className="shrink-0 pt-4 border-t border-white/10 dark:border-white/5">
              {!showAddTour ? (
                <button
                  onClick={() => setShowAddTour(true)}
                  className="w-full py-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Plus className="w-4 h-4" /> Добавить маршрут
                </button>
              ) : (
                <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-700 space-y-3 animate-scale-in">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400 font-bold uppercase">Добавить на {selectedDate.toLocaleString('ru', { day: 'numeric', month: 'short' })}</p>
                    <button onClick={() => setShowAddTour(false)} className="p-1 text-gray-500 hover:text-white rounded transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={addSpots}
                      onChange={e => setAddSpots(e.target.value)}
                      className="w-20 px-2 py-1.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-xs"
                      placeholder="Мест"
                    />
                    <span className="text-xs text-gray-500 self-center">мест</span>
                  </div>
                  <div className="max-h-40 overflow-y-auto space-y-1.5">
                    {availableTours.map(tour => (
                      <button
                        key={tour.id}
                        onClick={() => handleAddTourToDate(tour.id)}
                        className="w-full text-left px-3 py-2 bg-gray-700/50 hover:bg-emerald-500/20 rounded-lg text-sm text-gray-200 hover:text-emerald-300 transition-colors flex items-center gap-2 group"
                      >
                        <Plus className="w-3 h-3 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="font-medium truncate">{tour.title}</span>
                        <span className="ml-auto text-[10px] text-gray-500 whitespace-nowrap">{tour.duration}</span>
                      </button>
                    ))}
                    {availableTours.length === 0 && (
                      <p className="text-xs text-gray-500 italic py-2 text-center">Все маршруты уже назначены</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CalendarModal;