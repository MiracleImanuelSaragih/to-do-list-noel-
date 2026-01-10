// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAcnTpDBXO2WpXs3ri21SXJfzUMC_xkCkU",
  authDomain: "premium-todo-list.firebaseapp.com",
  projectId: "premium-todo-list",
  storageBucket: "premium-todo-list.appspot.com",
  messagingSenderId: "630693485104",
  appId: "1:630693485104:web:820a99e6af935a7345abf5"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Fungsi tambah tugas
function tambahTugas() {
  const input = document.getElementById("inputTugas");
  const isiTugas = input.value.trim();
  if (isiTugas === "") return;

  db.collection("tugas").add({
    isi: isiTugas,
    selesai: false,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });

  input.value = "";
}

// Fungsi tampilkan tugas real-time
db.collection("tugas").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
  const list = document.getElementById("daftarTugas");
  list.innerHTML = "";

  snapshot.forEach((doc) => {
    const data = doc.data();
    const item = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = data.selesai;
    checkbox.onchange = () => {
      db.collection("tugas").doc(doc.id).update({
        selesai: checkbox.checked
      });
    };

    item.appendChild(checkbox);
    item.appendChild(document.createTextNode(" " + data.isi));
    list.appendChild(item);
  });
});
