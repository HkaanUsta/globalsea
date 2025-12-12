'use client';

import { MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

export default function WhatsAppButton({
  phoneNumber = '+48123456789', // Replace with actual number
  message = 'Hello, I am interested in your yacht services.',
  className = '',
}: WhatsAppButtonProps) {
  const t = useTranslations('contact');

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 text-white px-6 py-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 ${className}`}
      aria-label={t('whatsapp')}
    >
      <MessageCircle className="w-6 h-6" />
      <span className="hidden sm:inline font-semibold">{t('whatsapp')}</span>
    </button>
  );
}
