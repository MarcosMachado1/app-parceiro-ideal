import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script' // 👈 IMPORTAÇÃO OBRIGATÓRIA

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Parceiro Ideal',
  description: 'App que analisa relacionamentos e compatibilidade amorosa',
  manifest: '/manifest.json',
  themeColor: '#ffffff',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* 👇 COLE ESTE CÓDIGO DO PIXEL AQUI (SUBSTITUA TODO O <head>) */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '766352659592489');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{display:'none'}}
            src="https://www.facebook.com/tr?id=766352659592489&ev=PageView&noscript=1"
          />
        </noscript>
        {/* 👆 FIM DO CÓDIGO DO PIXEL */}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
