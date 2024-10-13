export const metadata = {
  title: 'Data Grid Portfolio',
  description: 'Modern  Minimalistic Blog + portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
