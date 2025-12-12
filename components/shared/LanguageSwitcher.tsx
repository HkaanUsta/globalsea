'use client';

import { useParams } from 'next/navigation';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { locales } from '@/lib/i18n';

interface LanguageSwitcherProps {
  transparent?: boolean;
}

export default function LanguageSwitcher({ transparent = false }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string;

  const switchLocale = (newLocale: string) => {
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className={`w-4 h-4 ${transparent ? 'text-white/70' : 'text-gray-600'}`} />
      <div className="flex gap-1">
        {locales.map((locale) => (
          <button
            key={locale}
            onClick={() => switchLocale(locale)}
            className={`px-3 py-1 rounded text-sm font-medium transition ${
              transparent
                ? currentLocale === locale
                  ? 'bg-white/20 text-white backdrop-blur-sm'
                  : 'text-white/70 hover:bg-white/10'
                : currentLocale === locale
                ? 'bg-teal-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {locale.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
