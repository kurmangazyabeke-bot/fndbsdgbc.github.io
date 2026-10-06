import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MathQadam AI — Интеллектуалды Математика Платформасы',
  description: 'Бастауыш сынып оқушыларының математикадағы нақты қиындықтарын анықтау, деңгейді бейімдеу және педагогикалық аналитика ұсыну веб-платформасы.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kk" className="h-full bg-slate-50 text-slate-900 antialiased">
      <body className="flex min-h-full flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
