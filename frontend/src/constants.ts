export enum Mode {
  DEV = "development",
  PROD = "production",
}

export const mode = (process.env.NODE_ENV === 'production' ? Mode.PROD : Mode.DEV);

export const APP_ID = process.env.NEXT_PUBLIC_APP_ID ?? process.env.DATABUTTON_PROJECT_ID ?? '';
export const API_PATH = process.env.NEXT_PUBLIC_API_PATH ?? '';
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';
export const API_HOST = process.env.NEXT_PUBLIC_API_HOST ?? '';
export const API_PREFIX_PATH = process.env.NEXT_PUBLIC_API_PREFIX_PATH ?? '';
export const WS_API_URL = process.env.NEXT_PUBLIC_WS_API_URL ?? 'ws://localhost:8000';
export const APP_BASE_PATH = process.env.NEXT_PUBLIC_APP_BASE_PATH ?? '/';
export const APP_TITLE = process.env.NEXT_PUBLIC_APP_TITLE ?? 'Databutton';
export const APP_FAVICON_LIGHT = process.env.NEXT_PUBLIC_APP_FAVICON_LIGHT ?? '/favicon-light.svg';
export const APP_FAVICON_DARK = process.env.NEXT_PUBLIC_APP_FAVICON_DARK ?? '/favicon-dark.svg';
export const APP_DEPLOY_USERNAME = process.env.NEXT_PUBLIC_APP_DEPLOY_USERNAME ?? '';
export const APP_DEPLOY_APPNAME = process.env.NEXT_PUBLIC_APP_DEPLOY_APPNAME ?? '';
export const APP_DEPLOY_CUSTOM_DOMAIN = process.env.NEXT_PUBLIC_APP_DEPLOY_CUSTOM_DOMAIN ?? '';
