export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Basic SEO Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="A modern portfolio and blog website built with Next.js, Tailwind CSS, and Sanity backend." />
        <meta name="author" content="Kishore Shanmugam" />
        <meta name="keywords" content="portfolio, blog, web development, Next.js, Tailwind CSS, Sanity" />
        <link rel="canonical" href="https://www.kishore-portfolio-app.firebaseapp.com" />

        {/* Open Graph Metadata for Social Sharing */}
        <meta property="og:title" content="My Portfolio & Blog" />
        <meta property="og:description" content="Explore articles and projects on my modern portfolio website." />
        <meta property="og:url" content="https://www.kishore-portfolio-app.firebaseapp.com " />
        <meta property="og:type" content="website" />
        
        <meta property="og:locale" content="en_US" />

        

        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Robots Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

        {/* Theme Color for Mobile Browsers */}
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
