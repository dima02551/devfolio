import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'DevFolio — Full-Stack Developer', template: '%s | DevFolio' },
  description: 'Full-stack developer portfolio with projects, blog, and more.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
