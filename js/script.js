let counter = 1;
window.addEventListener("DOMContentLoaded", cekDataKosong);
function Tambah_Daftar() {
  const text = document.getElementById("todo-text").value.trim();
  const date = document.getElementById("todo-date").value;
  const tbody = document.getElementById("todo-body");

  if (text === "" || date === "") {
    alert("Masukkan kegiatan dan tanggal!");
    return;
  }

  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${counter++}</td>
    <td>${text}</td>
    <td>${date}</td>
    <td>
      <input type="checkbox" onchange="ToggleStatus(this)">
    </td>
    <td>
      <button class="btn delete" onclick="HapusBaris(this)">🗑</button>
    </td>
  `;

  tbody.appendChild(row);

  document.getElementById("todo-text").value = "";
  document.getElementById("todo-date").value = "";
  cekDataKosong();
}

// Status selesai / belum
function ToggleStatus(checkbox) {
  const row = checkbox.closest("tr");
  row.classList.toggle("done", checkbox.checked);
}

// Hapus per baris
function HapusBaris(button) {
  if (confirm("Hapus kegiatan ini?")) {
    button.closest("tr").remove();
  }
}

// Filter berdasarkan tanggal dan ToDo List
function Pencarian() {
    const text = document.getElementById("todo-text").value.trim();
    const date = document.getElementById("todo-date").value;
    const filterText = document.getElementById("todo-text").value.toLowerCase().trim();
    const filterDate = document.getElementById("todo-date").value;

    const rows = document.querySelectorAll("#todo-body tr");
  if (text === "" || date === "") {
    alert("Masukkan kegiatan dan tanggal!");
    return;
  }

  rows.forEach(row => {
    const kegiatan = row.children[1].textContent.toLowerCase();
    const tanggal  = row.children[2].textContent;

    let tampil = true;

    // Filter kegiatan
    if (filterText && !kegiatan.includes(filterText)) {
      tampil = true;
    }

    // Filter tanggal (samakan format datetime-local)
    if (filterDate && !tanggal.startsWith(filterDate)) {
      tampil = true;
    }
    if (filterText && !kegiatan.includes(filterText) && filterDate && !tanggal.startsWith(filterDate)) {
      tampil = false;
    }
    row.style.display = tampil ? "" : "none";
  });
  cekDataKosong();
}

// Hapus semua
function Hapus() {
  if (confirm("Hapus semua data?")) {
    document.getElementById("todo-body").innerHTML = "";
    counter = 1;
  }
}

// print data 
function PrintKegiatan() {
  const tabel = document.querySelector(".todo-table").outerHTML;

  const win = window.open("", "", "width=900,height=600");
  win.document.write(`
    <html>
    <head>
      <title>Daftar Kegiatan</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h2 { text-align: center; }
        table { width: 100%; border-collapse: collapse; }
        th, td {
          border: 1px solid #333;
          padding: 8px;
          text-align: center;
        }
        th {
          background: #f0f0f0;
        }
      </style>
    </head>
    <body>
      <h2>ToDo List</h2>
      ${tabel}
    </body>
    </html>
  `);

  win.document.close();
  win.focus();
  win.print();
}

function toggleTheme() {
  document.body.classList.toggle("dark");

  // Simpan preferensi
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Load saat halaman dibuka
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
});

function cekDataKosong() {
  const rows = document.querySelectorAll("#todo-body tr");
  const noTask = document.getElementById("no-task");

  let adaDataTampil = false;

  rows.forEach(row => {
    if (row.style.display !== "none") {
      adaDataTampil = true;
    }
  });

  noTask.style.display = adaDataTampil ? "none" : "block";

}
