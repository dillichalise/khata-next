'use client';

import type { ComponentType } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FolderIcon, HomeIcon, JapaneseYenIcon, UserIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Outline to Solid swap when selected
const getIconPairs = (icon: ComponentType<{ className?: string }>) => {
  if (icon === HomeIcon) return HomeIcon;
  if (icon === JapaneseYenIcon) return JapaneseYenIcon;
  if (icon === FolderIcon) return FolderIcon;
  return icon;
};

interface NavItem {
  icon: ComponentType<{ className?: string }>;
  label: string;
  path: string;
}

//lacks translations
const getDefaultItems = (): NavItem[] => [
  {
    icon: HomeIcon,
    label: 'Dashboard',
    path: '/dashboard/overview'
  },
  {
    icon: JapaneseYenIcon,
    label: 'Transactions',
    path: '/dashboard/transaction'
  },
  {
    icon: UserIcon,
    label: 'Users',
    path: '/dashboard/user'
  },
  {
    icon: FolderIcon,
    label: 'Summary',
    path: '/dashboard/summary'
  }
];

export default function MobileNav() {
  const pathname = usePathname();

  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <nav className='fixed right-0 bottom-0 left-0 z-50 max-h-[80px] bg-[#121212]'>
      <div className='border-t'>
        <ul className='flex h-16 items-center gap-4 px-2'>
          {getDefaultItems().map((item) => {
            const href = item.path;
            const isActive =
              pathname === href ||
              (item.path !== '' && pathname.startsWith(href));

            const SolidIcon = getIconPairs(item.icon);

            return (
              <li key={href} className='flex-1'>
                <Link
                  href={href}
                  className={`relative flex h-full flex-col items-center justify-center ${
                    isActive ? 'text-orange-300' : 'text-[#AAAAAA]'
                  }`}
                >
                  {isActive ? (
                    <SolidIcon className='!h-4 !w-4' />
                  ) : (
                    <item.icon className='!h-4 !w-4' />
                  )}
                  <span className='mt-1 text-[0.6875rem]/4 font-medium'>
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
