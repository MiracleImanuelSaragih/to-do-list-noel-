// Konfigurasi dari Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAcnTpDBXO2WpXs3ri21SXJfzUMC_xkCkU",
  authDomain: "premium-todo-list.firebaseapp.com",
  projectId: "premium-todo-list",
  storageBucket: "premium-todo-list.firebasestorage.app",
  messagingSenderId: "630693485104",
  appId: "1:630693485104:web:820a99e6af935a7345abf5"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const app = initializeApp(firebaseConfig);
