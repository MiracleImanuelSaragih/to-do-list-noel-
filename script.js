// Firebase versi 8.x (non-modular)
const firebaseConfig = {
  apiKey: "AIzaSyAcnTpDBXO2WpXs3ri21SXJfzUMC_xkCkU",
  authDomain: "premium-todo-list.firebaseapp.com",
  projectId: "premium-todo-list",
  storageBucket: "premium-todo-list.appspot.com",
  messagingSenderId: "630693485104",
  appId: "1:630693485104:web:820a99e6af935a7345abf5"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 🔹 To-Do List
function addTask() {
  const text = document.getElementById("taskText").value.trim();
  const time = document.getElementById("taskTime").value;
  const reminder = +document.getElementById("taskReminder").value;
  if (!text || !time) return alert("Lengkapi data tugas");

  db.collection("tasks").add({
    text,
    time,
    reminder,
    completed: false,
    reminded: false,
    alarmed: false,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });

  document.getElementById("taskText").value = "";
  document.getElementById("taskTime").value = "";
}

function toggleTask(id, current) {
  db.collection("tasks").doc(id).update({ completed: !current });
}

function delTask(id) {
  if (confirm("Hapus tugas?")) {
    db.collection("tasks").doc(id).delete();
  }
}

db.collection("tasks").orderBy("timestamp", "desc").onSnapshot(snapshot => {
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  snapshot.forEach(doc => {
    const t = doc.data();
    const dt = new Date(t.time);
    const div = document.createElement("div");
    div.className = "task" + (t.completed ? " completed" : "");
    div.innerHTML = `
      <input type="checkbox" ${t.completed ? "checked" : ""} onchange="toggleTask('${doc.id}', ${t.completed})">
      <span><b>${t.text}</b><br>⏰ ${dt.toLocaleString()}</span>
      <button onclick="delTask('${doc.id}')">🗑️</button>
    `;
    list.appendChild(div);
  });
});

// 🔹 Jadwal Harian
function addSchedule() {
  const text = document.getElementById("scheduleText").value.trim();
  const time = document.getElementById("scheduleTime").value;
  if (!text || !time) return alert("Lengkapi data jadwal");

  db.collection("schedule").add({
    text,
    time,
    completed: false,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });

  document.getElementById("scheduleText").value = "";
  document.getElementById("scheduleTime").value = "";
}

function toggleSchedule(id, current) {
  db.collection("schedule").doc(id).update({ completed: !current });
}

function delSchedule(id) {
  if (confirm("Hapus jadwal?")) {
    db.collection("schedule").doc(id).delete();
  }
}

db.collection("schedule").orderBy("timestamp", "desc").onSnapshot(snapshot => {
  const list = document.getElementById("scheduleList");
  list.innerHTML = "";
  snapshot.forEach(doc => {
    const s = doc.data();
    const dt = new Date(s.time);
    const div = document.createElement("div");
    div.className = "task" + (s.completed ? " completed" : "");
    div.innerHTML = `
      <input type="checkbox" ${s.completed ? "checked" : ""} onchange="toggleSchedule('${doc.id}', ${s.completed})">
      <span><b>${s.text}</b><br>⏰ ${dt.toLocaleString()}</span>
      <button onclick="delSchedule('${doc.id}')">🗑️</button>
    `;
    list.appendChild(div);
  });
});
