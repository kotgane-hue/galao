import React, { useState } from 'react';
import { X, Save, Loader2, Plus, Trash2, Calendar } from 'lucide-react';
import { Tour, TourDate } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface TourEditModalProps {
    tour: Tour | null; // null = creating new
    onClose: () => void;
}

const CATEGORIES = [
    { value: 'one-day', label: 'Однодневный' },
    { value: 'multi-day', label: 'Многодневный' },
    { value: 'jeep', label: 'Джип-тур' },
    { value: 'excursion', label: 'Экскурсия' },
    { value: 'gastro', label: 'Гастро-тур' },
    { value: 'other', label: 'Другое' },
];

const DIFFICULTIES = ['Легкий', 'Средний', 'Сложный', 'Экстрим', 'В разработке'];
const COLORS = ['emerald', 'blue', 'purple', 'red', 'orange', 'gray'];

const TourEditModal: React.FC<TourEditModalProps> = ({ tour, onClose }) => {
    const { addTour, updateTour } = useLanguage();
    const isNew = !tour;

    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        id: tour?.id || '',
        title: tour?.title || '',
        price: tour?.price || '3 500 ₽',
        duration: tour?.duration || '1 день',
        difficulty: tour?.difficulty || 'Легкий',
        distance: tour?.distance || '10-20 km',
        location: tour?.location || 'Осетия',
        image: tour?.image || '/images/mainfoto/1.webp',
        shortDesc: tour?.shortDesc || '',
        desc: tour?.desc || '',
        gear: tour?.gear || '',
        color: tour?.color || 'emerald',
        category: tour?.category || 'one-day',
        groupSizeInfo: tour?.groupSizeInfo || 'до 15 человек',
        program: tour?.program || [] as string[],
        dates: tour?.dates || [] as TourDate[],
    });

    const [newProgramStep, setNewProgramStep] = useState('');
    const [newDate, setNewDate] = useState({ start: '', end: '', spots: '10' });

    const updateField = (field: string, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const addProgramStep = () => {
        if (!newProgramStep.trim()) return;
        updateField('program', [...form.program, newProgramStep.trim()]);
        setNewProgramStep('');
    };

    const removeProgramStep = (index: number) => {
        updateField('program', form.program.filter((_: string, i: number) => i !== index));
    };

    const addDate = () => {
        if (!newDate.start) return;
        const dateEntry: TourDate = {
            startDate: newDate.start,
            endDate: newDate.end || newDate.start,
            totalSpots: parseInt(newDate.spots) || 10,
            bookedSpots: 0,
        };
        updateField('dates', [...form.dates, dateEntry]);
        setNewDate({ start: '', end: '', spots: '10' });
    };

    const removeDate = (index: number) => {
        updateField('dates', form.dates.filter((_: TourDate, i: number) => i !== index));
    };

    const handleSave = async () => {
        if (!form.title || !form.id) return;
        setSaving(true);

        const tourData: Tour = {
            id: form.id,
            title: form.title,
            price: form.price,
            duration: form.duration,
            difficulty: form.difficulty,
            distance: form.distance,
            location: form.location,
            image: form.image,
            gallery: tour?.gallery || [],
            shortDesc: form.shortDesc,
            desc: form.desc,
            program: form.program,
            gear: form.gear,
            color: form.color,
            category: form.category,
            reviews: tour?.reviews || [],
            dates: form.dates,
            groupSizeInfo: form.groupSizeInfo,
            details: tour?.details,
        };

        if (isNew) {
            await addTour(tourData);
        } else {
            await updateTour(tourData);
        }

        setSaving(false);
        onClose();
    };

    const inputClass = "w-full px-3 py-2.5 bg-gray-800 border border-gray-600 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all";
    const labelClass = "block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5";

    return (
        <div className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-sm p-4 py-12" onClick={onClose}>
            <div
                className="relative w-full max-w-3xl bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800 rounded-t-2xl px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">
                        {isNew ? '➕ Новый тур' : `✏️ ${form.title}`}
                    </h2>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleSave}
                            disabled={saving || !form.title || !form.id}
                            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-700 text-white text-sm font-bold rounded-xl transition-all flex items-center gap-2"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            {saving ? 'Сохранение...' : 'Сохранить'}
                        </button>
                        <button onClick={onClose} className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>ID (латиница, уникальный)</label>
                            <input value={form.id} onChange={e => updateField('id', e.target.value)} className={inputClass} placeholder="my-new-tour" disabled={!isNew} />
                        </div>
                        <div>
                            <label className={labelClass}>Название</label>
                            <input value={form.title} onChange={e => updateField('title', e.target.value)} className={inputClass} placeholder="Название тура" />
                        </div>
                        <div>
                            <label className={labelClass}>Цена</label>
                            <input value={form.price} onChange={e => updateField('price', e.target.value)} className={inputClass} placeholder="3 500 ₽" />
                        </div>
                        <div>
                            <label className={labelClass}>Длительность</label>
                            <input value={form.duration} onChange={e => updateField('duration', e.target.value)} className={inputClass} placeholder="1 день" />
                        </div>
                        <div>
                            <label className={labelClass}>Сложность</label>
                            <select value={form.difficulty} onChange={e => updateField('difficulty', e.target.value)} className={inputClass}>
                                {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}>Категория</label>
                            <select value={form.category} onChange={e => updateField('category', e.target.value)} className={inputClass}>
                                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}>Локация</label>
                            <input value={form.location} onChange={e => updateField('location', e.target.value)} className={inputClass} placeholder="Осетия" />
                        </div>
                        <div>
                            <label className={labelClass}>Группа</label>
                            <input value={form.groupSizeInfo} onChange={e => updateField('groupSizeInfo', e.target.value)} className={inputClass} placeholder="до 15 человек" />
                        </div>
                        <div>
                            <label className={labelClass}>Цвет акцента</label>
                            <select value={form.color} onChange={e => updateField('color', e.target.value)} className={inputClass}>
                                {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}>URL изображения</label>
                            <input value={form.image} onChange={e => updateField('image', e.target.value)} className={inputClass} placeholder="/images/tour/main.webp" />
                        </div>
                    </div>

                    {/* Descriptions */}
                    <div>
                        <label className={labelClass}>Краткое описание (для карточки)</label>
                        <textarea value={form.shortDesc} onChange={e => updateField('shortDesc', e.target.value)} className={`${inputClass} h-20 resize-y`} placeholder="Короткое описание для карточки..." />
                    </div>
                    <div>
                        <label className={labelClass}>Полное описание (для модалки)</label>
                        <textarea value={form.desc} onChange={e => updateField('desc', e.target.value)} className={`${inputClass} h-32 resize-y`} placeholder="Подробное описание тура..." />
                    </div>
                    <div>
                        <label className={labelClass}>Снаряжение</label>
                        <textarea value={form.gear} onChange={e => updateField('gear', e.target.value)} className={`${inputClass} h-20 resize-y`} placeholder="Что взять с собой..." />
                    </div>

                    {/* Program */}
                    <div>
                        <label className={labelClass}>Программа</label>
                        <div className="space-y-2 mb-3">
                            {form.program.map((step: string, i: number) => (
                                <div key={i} className="flex items-center gap-2">
                                    <span className="text-emerald-400 text-xs font-bold w-6">{i + 1}.</span>
                                    <span className="flex-1 text-sm text-gray-300">{step}</span>
                                    <button onClick={() => removeProgramStep(i)} className="p-1 text-red-400 hover:text-red-300 transition-colors">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input value={newProgramStep} onChange={e => setNewProgramStep(e.target.value)} className={`${inputClass} flex-1`} placeholder="Добавить пункт программы..." onKeyDown={e => e.key === 'Enter' && addProgramStep()} />
                            <button onClick={addProgramStep} className="px-3 py-2 bg-emerald-500/20 text-emerald-400 rounded-xl hover:bg-emerald-500/30 transition-colors">
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Dates */}
                    <div>
                        <label className={labelClass}>
                            <Calendar className="w-3.5 h-3.5 inline mr-1" />
                            Даты (синхронизация с календарём)
                        </label>
                        <div className="space-y-2 mb-3 max-h-48 overflow-y-auto">
                            {form.dates.map((d: TourDate, i: number) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-gray-300 bg-gray-800/50 rounded-lg px-3 py-2">
                                    <span className="font-mono">{d.startDate}</span>
                                    {d.endDate !== d.startDate && <span className="text-gray-500">→ {d.endDate}</span>}
                                    <span className="text-gray-500 ml-auto">{d.totalSpots} мест</span>
                                    <button onClick={() => removeDate(i)} className="p-1 text-red-400 hover:text-red-300 transition-colors">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                            {form.dates.length === 0 && <p className="text-gray-600 text-xs italic">Нет дат</p>}
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            <input type="date" value={newDate.start} onChange={e => setNewDate(prev => ({ ...prev, start: e.target.value }))} className={`${inputClass} w-40`} />
                            <input type="date" value={newDate.end} onChange={e => setNewDate(prev => ({ ...prev, end: e.target.value }))} className={`${inputClass} w-40`} placeholder="Конец" />
                            <input type="number" value={newDate.spots} onChange={e => setNewDate(prev => ({ ...prev, spots: e.target.value }))} className={`${inputClass} w-20`} placeholder="Мест" />
                            <button onClick={addDate} className="px-3 py-2 bg-emerald-500/20 text-emerald-400 rounded-xl hover:bg-emerald-500/30 transition-colors">
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourEditModal;
