import React, { useState, useRef } from 'react';
import { X, Save, Loader2, Plus, Trash2, Calendar, ImagePlus, Upload } from 'lucide-react';
import { Tour, TourDate } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { uploadImage } from '../../lib/uploadImage';

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
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadingGallery, setUploadingGallery] = useState(false);
    const [dragOverGallery, setDragOverGallery] = useState(false);
    const galleryInputRef = useRef<HTMLInputElement>(null);
    const [form, setForm] = useState({
        id: tour?.id || '',
        title: tour?.title || '',
        price: tour?.price || '3 500 ₽',
        duration: tour?.duration || '1 день',
        difficulty: tour?.difficulty || 'Легкий',
        distance: tour?.distance || '10-20 km',
        location: tour?.location || 'Осетия',
        image: tour?.image || '/images/mainfoto/1.webp',
        gallery: tour?.gallery || [] as string[],
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

    const [uploadError, setUploadError] = useState('');

    const handleImageUpload = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            setUploadError('Выберите изображение (JPG, PNG, WebP)');
            return;
        }
        setUploading(true);
        setUploadError('');
        try {
            const url = await uploadImage(file, 'tours');
            updateField('image', url);
        } catch (err: any) {
            const msg = err?.message || 'Ошибка загрузки';
            setUploadError(msg);
            console.error('Upload failed:', err);
        } finally {
            setUploading(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) handleImageUpload(file);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleImageUpload(file);
    };

    const handleGalleryUpload = async (files: FileList | File[]) => {
        setUploadingGallery(true);
        try {
            const urls = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file.type.startsWith('image/')) {
                    const url = await uploadImage(file, 'tours');
                    urls.push(url);
                }
            }
            if (urls.length > 0) {
                updateField('gallery', [...form.gallery, ...urls]);
            }
        } catch (err: any) {
            console.error('Gallery upload failed:', err);
        } finally {
            setUploadingGallery(false);
        }
    };

    const removeGalleryImage = (index: number) => {
        updateField('gallery', form.gallery.filter((_: string, i: number) => i !== index));
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
            gallery: form.gallery,
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
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className={labelClass}>Фото тура</label>
                        <div
                            className={`relative border-2 border-dashed rounded-2xl p-4 transition-all cursor-pointer group ${dragOver
                                ? 'border-emerald-400 bg-emerald-500/10'
                                : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
                                }`}
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={handleDrop}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileSelect}
                            />
                            {form.image ? (
                                <div className="flex items-center gap-4">
                                    <img
                                        src={form.image}
                                        alt="Preview"
                                        className="w-24 h-24 rounded-xl object-cover border border-gray-700"
                                        onError={(e) => { (e.target as HTMLImageElement).src = '/images/mainfoto/1.webp'; }}
                                    />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-300 truncate max-w-[200px]">{form.image.split('/').pop()}</p>
                                        <p className="text-xs text-gray-500 mt-1">Нажмите или перетащите для замены</p>
                                    </div>
                                    {uploading && (
                                        <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center py-6">
                                    {uploading ? (
                                        <Loader2 className="w-10 h-10 text-emerald-400 animate-spin mb-2" />
                                    ) : (
                                        <ImagePlus className="w-10 h-10 text-gray-500 group-hover:text-emerald-400 transition-colors mb-2" />
                                    )}
                                    <p className="text-sm text-gray-400">Нажмите или перетащите фото</p>
                                    <p className="text-[10px] text-gray-600 mt-1">JPG, PNG, WebP</p>
                                </div>
                            )}
                        </div>
                        {/* Fallback: manual URL */}
                        <input
                            value={form.image}
                            onChange={e => updateField('image', e.target.value)}
                            className={`${inputClass} mt-2 text-xs`}
                            placeholder="или вставьте URL: /images/tour/main.webp"
                        />
                        {uploadError && (
                            <p className="mt-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                                ❌ {uploadError}
                            </p>
                        )}
                    </div>

                    {/* Gallery Upload */}
                    <div>
                        <label className={labelClass}>Галерея тура (дополнительные фото)</label>
                        <div
                            className={`relative border-2 border-dashed rounded-2xl p-4 transition-all cursor-pointer group ${dragOverGallery
                                ? 'border-emerald-400 bg-emerald-500/10'
                                : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
                                }`}
                            onClick={() => galleryInputRef.current?.click()}
                            onDragOver={(e) => { e.preventDefault(); setDragOverGallery(true); }}
                            onDragLeave={() => setDragOverGallery(false)}
                            onDrop={(e) => {
                                e.preventDefault();
                                setDragOverGallery(false);
                                if (e.dataTransfer.files) handleGalleryUpload(e.dataTransfer.files);
                            }}
                        >
                            <input
                                ref={galleryInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={(e) => {
                                    if (e.target.files) handleGalleryUpload(e.target.files);
                                }}
                            />

                            <div className="flex flex-col items-center py-4">
                                {uploadingGallery ? (
                                    <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mb-2" />
                                ) : (
                                    <ImagePlus className="w-8 h-8 text-gray-500 group-hover:text-emerald-400 transition-colors mb-2" />
                                )}
                                <p className="text-sm text-gray-400">Нажмите или перетащите фото для галереи</p>
                            </div>
                        </div>

                        {/* Gallery Thumbnails */}
                        {form.gallery.length > 0 && (
                            <div className="flex gap-3 mt-3 overflow-x-auto pb-2 hide-scrollbar">
                                {form.gallery.map((img: string, i: number) => (
                                    <div key={i} className="relative w-20 h-20 shrink-0 group">
                                        <img src={img} alt="" className="w-full h-full object-cover rounded-xl border border-gray-700" onError={(e) => { (e.target as HTMLImageElement).src = '/images/mainfoto/1.webp'; }} />
                                        <button
                                            onClick={(e) => { e.stopPropagation(); e.preventDefault(); removeGalleryImage(i); }}
                                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <input
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    const val = (e.target as HTMLInputElement).value;
                                    if (val) {
                                        updateField('gallery', [...form.gallery, val]);
                                        (e.target as HTMLInputElement).value = '';
                                    }
                                }
                            }}
                            className={`${inputClass} mt-2 text-xs`}
                            placeholder="или вставьте URL картинки и нажмите Enter"
                        />
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
