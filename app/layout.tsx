import './globals.css';
import Providers from '@/components/Providers';

export const metadata = {
  title: 'TaskFlow - Simple Task Manager',
  description: 'Manage your tasks efficiently with TaskFlow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}