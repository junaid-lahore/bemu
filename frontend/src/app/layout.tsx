import type { Metadata } from 'next';
import { ThemeProvider } from '@/internal-components/ThemeProvider';
import { DEFAULT_THEME } from '@/constants/default-theme';
import { OuterErrorBoundary } from '@/prod-components/OuterErrorBoundary';
import { AppProvider } from '@/components/AppProvider';
import { StackProviders } from '@/components/StackProviders';
import '@/index.css';

export const metadata: Metadata = {
  title: 'Beamu World',
  description: 'Every light tells a story. Meet Beamu — the glowing friend who learns from every adventure.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <OuterErrorBoundary>
          <StackProviders>
            <ThemeProvider defaultTheme={DEFAULT_THEME}>
              <AppProvider>
                {children}
              </AppProvider>
            </ThemeProvider>
          </StackProviders>
        </OuterErrorBoundary>
      </body>
    </html>
  );
}

