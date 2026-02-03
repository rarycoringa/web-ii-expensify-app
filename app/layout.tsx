import { Provider } from "@/app/components/ui/provider"
import './globals.css';

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
