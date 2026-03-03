import React, { useState } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import { TeamMember } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface TeamEditModalProps {
    member: TeamMember | null; // null = creating new
    onClose: () => void;
}

const TeamEditModal: React.FC<TeamEditModalProps> = ({ member, onClose }) => {
    const { addTeamMember, updateTeamMember } = useLanguage();
    const isNew = !member;

    const [saving, setSaving] = useState(false);
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

                    <div>
                        <label className={labelClass}>URL фото</label>
                        <input value={form.image} onChange={e => updateField('image', e.target.value)} className={inputClass} placeholder="/images/team/photo.webp" />
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
