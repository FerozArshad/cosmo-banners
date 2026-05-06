import './globals.css';

export const metadata = {
  title: 'COSMO Cosmetics — Redefining Skincare Since 2006',
  description: 'Shop premium skincare, hair care, and body care products. Trusted in 170+ countries.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Libre+Franklin:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
