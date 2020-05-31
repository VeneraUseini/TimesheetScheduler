import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAxtrGcvS4SojzpqWDH-WD7gM6pEe729u8',
  authDomain: 'timesheetapp-31a5e.firebaseapp.com',
  databaseURL: 'https://timesheetapp-31a5e.firebaseio.com',
  projectId: 'timesheetapp-31a5e',
  storageBucket: 'timesheetapp-31a5e.appspot.com',
  messagingSenderId: '539295019475',
  appId: '1:539295019475:web:8b525b431830372d657f26',
  measurementId: 'G-L9VHN5GWC1',
};

const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
