const admin = require('firebase-admin');

// Initialize the Firebase Admin SDK
// This uses the service account credentials you set as an environment variable in Netlify
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY))
  });
}

exports.handler = async function(event, context) {
  try {
    const listUsersResult = await admin.auth().listUsers(1000); // Get up to 1000 users
    const users = listUsersResult.users.map(userRecord => {
      return {
        uid: userRecord.uid,
        email: userRecord.email,
      };
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify(users),
    };
  } catch (error) {
    console.error('Error listing users:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to list users.' }),
    };
  }
};
