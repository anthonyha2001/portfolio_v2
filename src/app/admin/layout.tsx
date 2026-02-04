import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { AdminSidebar } from '@/components/layouts/admin-sidebar';
import { AdminHeader } from '@/components/layouts/admin-header';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  // Check if user role is admin - CRITICAL SECURITY CHECK
  const userRole = (session.user as { role?: string })?.role;
  if (userRole !== 'admin') {
    redirect('/portal');
  }

  return (
    <div className="min-h-screen bg-light flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-[250px] bg-[#1C2343] text-white flex-shrink-0">
        <AdminSidebar session={session} />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50">
        <AdminHeader session={session} />
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

