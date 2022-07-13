import { initializeApp } from 'firebase/app'
import 'firebase/auth';
import 'firebase/database';

/**
 * Config for firebase
 */
const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
}

/**
 * Initialize Firebase
 */
const app = initializeApp(config);

export default app;
