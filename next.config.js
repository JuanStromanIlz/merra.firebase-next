/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: "AIzaSyDb5Kd8-4o_6E8qXXOiTbXDtRVfR6Ax7Yw",
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "merra-firebase-next.firebaseapp.com",
    NEXT_PUBLIC_FIREBASE_MESSAGE_ID: "203712236631",
    NEXT_PUBLIC_FIREBASE_APP_ID: "1:203712236631:web:322485ab6fe32b9c3b6712",
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: "G-L5LRV2G7K5",
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: "merra-firebase-next",
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "merra-firebase-next.appspot.com",
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
};

module.exports = nextConfig;
