import type { Metadata } from 'next';
import { ThemeProvider } from '@/internal-components/ThemeProvider';
import { DEFAULT_THEME } from '@/constants/default-theme';
import { StackProvider, StackTheme } from '@stackframe/react';
import { stackClientApp } from '@/app/auth';
import { OuterErrorBoundary } from '@/prod-components/OuterErrorBoundary';
import { AppProvider } from '@/components/AppProvider';
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
          <StackProvider app={stackClientApp}>
            <StackTheme>
              <ThemeProvider defaultTheme={DEFAULT_THEME}>
                <AppProvider>
                  {children}
                </AppProvider>
              </ThemeProvider>
            </StackTheme>
          </StackProvider>
        </OuterErrorBoundary>
      </body>
    </html>
  );
}

