import React, { useState, useRef } from 'react';
import { X, Save, Loader2, ImagePlus } from 'lucide-react';
import { TeamMember } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { uploadImage } from '../../lib/uploadImage';

interface TeamEditModalProps {
    member: TeamMember | null; // null = creating new
    onClose: () => void;
}

const TeamEditModal: React.FC<TeamEditModalProps> = ({ member, onClose }) => {
    const { addTeamMember, updateTeamMember } = useLanguage();
    const isNew = !member;

    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [form, setForm] = useState({
        id: member?.id || '',
        name: member?.name || '',
        role: member?.role || '',
        desc: member?.desc || '',
        image: member?.image || '/images/team/new.webp',
        instagram: member?.instagram || '',
    });

    const updateField = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = async (file: File) => {
        if (!file.type.startsWith('image/')) return;
        setUploading(true);
        try {
            const url = await uploadImage(file, 'team');
            updateField('image', url);
        } catch (err) {
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

    const handleSave = async () => {
        if (!form.name || !form.id) return;
        setSaving(true);

        const memberData: TeamMember = {
            id: form.id,
            name: form.name,
            role: form.role,
            desc: form.desc,
            image: form.image,
            instagram: form.instagram,
        };

        if (isNew) {
            await addTeamMember(memberData);
        } else {
            await updateTeamMember(memberData);
        }

        setSaving(false);
        onClose();
    };

    const inputClass = "w-full px-3 py-2.5 bg-gray-800 border border-gray-600 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all";
    const labelClass = "block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5";

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
            <div
                className="relative w-full max-w-lg bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-6"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">
                        {isNew ? '➕ Новый участник' : `✏️ ${form.name}`}
                    </h2>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>ID (латиница)</label>
                            <input value={form.id} onChange={e => updateField('id', e.target.value)} className={inputClass} placeholder="ivan" disabled={!isNew} />
                        </div>
                        <div>
                            <label className={labelClass}>Имя</label>
                            <input value={form.name} onChange={e => updateField('name', e.target.value)} className={inputClass} placeholder="Иван Иванов" />
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Роль</label>
                        <input value={form.role} onChange={e => updateField('role', e.target.value)} className={inputClass} placeholder="Гид" />
                    </div>

                    <div>
                        <label className={labelClass}>Описание</label>
                        <textarea value={form.desc} onChange={e => updateField('desc', e.target.value)} className={`${inputClass} h-24 resize-y`} placeholder="Описание участника..." />
                    </div>

                    {/* Photo Upload */}
                    <div>
                        <label className={labelClass}>Фото</label>
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
                                        className="w-20 h-20 rounded-full object-cover border border-gray-700"
                                        onError={(e) => { (e.target as HTMLImageElement).src = '/images/mainfoto/1.webp'; }}
                                    />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-300 truncate max-w-[180px]">{form.image.split('/').pop()}</p>
                                        <p className="text-xs text-gray-500 mt-1">Нажмите или перетащите для замены</p>
                                    </div>
                                    {uploading && (
                                        <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center py-4">
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
                        <input
                            value={form.image}
                            onChange={e => updateField('image', e.target.value)}
                            className={`${inputClass} mt-2 text-xs`}
                            placeholder="или вставьте URL: /images/team/photo.webp"
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Instagram (ссылка)</label>
                        <input value={form.instagram} onChange={e => updateField('instagram', e.target.value)} className={inputClass} placeholder="https://instagram.com/username" />
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <button onClick={onClose} className="flex-1 py-3 rounded-xl text-sm font-bold text-gray-400 hover:bg-gray-800 transition-colors">
                        Отмена
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving || !form.name || !form.id}
                        className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-700 text-white text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {saving ? 'Сохранение...' : 'Сохранить'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TeamEditModal;
