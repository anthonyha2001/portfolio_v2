import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { PortalSidebar } from '@/components/layouts/portal-sidebar';
import { PortalHeader } from '@/components/layouts/portal-header';

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-light flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-[250px] bg-[#1C2343] text-white flex-shrink-0">
        <PortalSidebar session={session} />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50">
        <PortalHeader session={session} />
      </div>

      {/* Main Content */}
      <main className="flex-1 min-h-screen pt-16 md:pt-0">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

