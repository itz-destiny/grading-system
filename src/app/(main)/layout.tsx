
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {GraduationCap} from 'lucide-react';
import {MainNav} from '@/components/main-nav';
import {Header} from '@/components/header';
import {DataProvider} from '@/context/data-provider';

export default function AppLayout({children}: {children: React.ReactNode}) {
  return (
    <DataProvider>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
              <GraduationCap className="w-8 h-8 text-primary" />
              <h2 className="text-xl font-bold font-headline text-primary tracking-tight">
                GradeAssist
              </h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <MainNav />
          </SidebarContent>
          <SidebarFooter>
            {/* Optional Footer Content */}
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <Header />
          <main className="flex-1">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </DataProvider>
  );
}
