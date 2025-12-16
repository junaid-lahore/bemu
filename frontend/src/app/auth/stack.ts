import { APP_BASE_PATH } from '@/constants';
import { StackClientApp } from '@stackframe/react';
import { config } from './config';
import { joinPaths } from './utils';

// For Next.js, we'll use window.location for navigation
const useNavigate = () => {
  return (path: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  };
};

export const stackClientApp = new StackClientApp({
  projectId: config.projectId,
  publishableClientKey: config.publishableClientKey,
  tokenStore: typeof window !== 'undefined' ? 'cookie' : 'memory',
  redirectMethod: {
    useNavigate
  },
  urls: {
    handler: joinPaths(APP_BASE_PATH, config.handlerUrl),
    // Trailing slash to correctly hit the UI
    home: joinPaths(APP_BASE_PATH, '/'),
    afterSignIn: joinPaths(APP_BASE_PATH, config.handlerUrl, 'redirect'),
    afterSignUp:joinPaths(APP_BASE_PATH, config.handlerUrl, 'redirect')
  }
})

