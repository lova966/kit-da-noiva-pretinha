import './globals.css';
import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FAF8F5',
};

export const metadata: Metadata = {
  title: 'Kit Gratuito da Noiva 2026/2027 | Planner 12 Meses & Guia de Paletas — Ateliê Pretinha',
  description: 'Baixe gratuitamente o Planner da Noiva com checklist completo de 12 meses até o altar e o Guia com 15 Paletas de Cores para Madrinhas. Criado com carinho pelo Ateliê Pretinha Costureira.',
  keywords: 'planner da noiva, checklist casamento, paleta de cores madrinhas, vestido de noiva, aluguel vestido noiva, atelier pretinha costureira',
  openGraph: {
    title: 'Kit Gratuito da Noiva — Ateliê Pretinha Costureira',
    description: 'Planeje seu casamento sem esquecer nenhum detalhe. Planner 12 meses + Guia com 15 Paletas de Cores.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#FAF8F5] text-slate-800 antialiased selection:bg-[#c5a059]/20 selection:text-[#8c6732]">
        {children}
      </body>
    </html>
  );
}
