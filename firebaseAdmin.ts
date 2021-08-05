import * as firebaseAdmin from "firebase-admin";

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      type: process.env.NEXT_PUBLIC_FIREBASE_TYPE,
      project_id: "scalelaced",
      private_key_id: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY,
      client_email: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
      client_id: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_ID,
      auth_uri: process.env.NEXT_PUBLIC_FIREBASE_AUTH_URI,
      token_uri: process.env.NEXT_PUBLIC_FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url:
        process.env.NEXT_PUBLIC_FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url:
        process.env.NEXT_PUBLIC_FIREBASE_CLIENT_X509_CERT_URL,
    } as any),
  });
}

export { firebaseAdmin };
