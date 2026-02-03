import { Provider } from "@/app/components/ui/provider"
import './globals.css';
import { AuthProvider } from "./contexts/AuthContext";

export default function RootLayout(props: { children: React.ReactNode }) {
    const { children } = props

    return (
        <html suppressHydrationWarning>
            <body suppressHydrationWarning>
                <Provider>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </Provider>
            </body>
        </html>
    )
}
