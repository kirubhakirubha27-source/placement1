const firebaseConfig = {
apiKey: AIzaSyDhMFcHt2FV-rfiG0cPQsJvKCy-Qa9wq5w,
authDomain: collegeportal-35cd2.firebaseapp.com,
projectId: collegeportal-35cd2,
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();