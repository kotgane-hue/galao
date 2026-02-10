
import React from 'react';
import { X, MessageSquare } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ReviewModalProps {
  onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ onClose }) => {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl h-[90vh] relative z-10 overflow-hidden animate-scale-in border border-gray-200 dark:border-gray-700 flex flex-col">
        
        {/* Header */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center shrink-0">
            <h3 className="text-lg font-bold text-deep-slate dark:text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-electric-blue dark:text-emerald-400" />
                {t.modal.reviewTitle}
            </h3>
            <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-deep-slate dark:hover:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <X className="w-6 h-6" />
            </button>
        </div>

        <div className="flex-1 w-full bg-white relative">
           <iframe 
             src="https://docs.google.com/forms/d/e/1FAIpQLSePJUW3S5xG1An0tTRr3bwj-BzDgJPPZmqpUJFYavcfe44MNw/viewform?embedded=true" 
             width="100%" 
             height="100%" 
             frameBorder="0" 
             marginHeight={0} 
             marginWidth={0}
             title="Google Review Form"
             className="absolute inset-0 w-full h-full"
           >
             Загрузка…
           </iframe>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
