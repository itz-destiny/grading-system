'use client';
import Link from 'next/link';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  BookMarked,
  ClipboardEdit,
  FileBarChart,
  GraduationCap,
} from 'lucide-react';
import {usePathname} from 'next/navigation';

const menuItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/students',
    label: 'Students',
    icon: Users,
  },
  {
    href: '/assignments',
    label: 'Assignments',
    icon: BookMarked,
  },
  {
    href: '/grades',
    label: 'Grades',
    icon: ClipboardEdit,
  },
  {
    href: '/reports',
    label: 'Reports',
    icon: FileBarChart,
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {menuItems.map(({href, label, icon: Icon}) => (
        <SidebarMenuItem key={href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === href}
            tooltip={{children: label}}
          >
            <Link href={href}>
              <Icon />
              <span>{label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
