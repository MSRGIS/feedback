// netlify/functions/firebase-config.js

// זוהי פונקציית שרת שרצה על השרתים של Netlify, לא בדפדפן.
// היא קוראת את משתני הסביבה המאובטחים שהגדרת ב-Netlify
// ומחזירה אותם כ-JSON לקוד בצד הלקוח.

exports.handler = async function(event, context) {
  // ודא שהמשתנים קיימים ב-Netlify
  if (!process.env.VITE_API_KEY || !process.env.VITE_AUTH_DOMAIN) {
      return {
          statusCode: 500,
          body: JSON.stringify({ message: "משתני הסביבה של Firebase אינם מוגדרים ב-Netlify" })
      }
  }

  const firebaseConfig = {
    apiKey: process.env.VITE_API_KEY,
    authDomain: process.env.VITE_AUTH_DOMAIN,
    databaseURL: process.env.VITE_DATABASE_URL,
    projectId: process.env.VITE_PROJECT_ID,
    storageBucket: process.env.VITE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_APP_ID,
  };

  return {
    statusCode: 200,
    body: JSON.stringify(firebaseConfig),
  };
};

