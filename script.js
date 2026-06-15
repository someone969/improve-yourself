// ===============================
// NAVIGASI HALAMAN
// ===============================

function showPage(pageId) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");
}

// ===============================
// POPUP TARGET
// ===============================

const popupTarget = document.getElementById("popupTarget");

document.getElementById("addTargetBtn").addEventListener("click", () => {
  popupTarget.style.display = "flex";
});

document.getElementById("closePopupBtn").addEventListener("click", () => {
  popupTarget.style.display = "none";
});

// ===============================
// ARRAY TARGET
// ===============================

let targets = JSON.parse(localStorage.getItem("targets")) || [];

// ===============================
// TAMPILKAN TARGET
// ===============================

function tampilkanTarget() {
  let container = document.getElementById("targetContainer");

  container.innerHTML = "";

  targets.forEach((item, index) => {
    let persen = (item.current / item.target) * 100;

    container.innerHTML += `

        <div class="target-card">

        <img
        src="${item.image}"
        class="target-image">

        <h2>

        ${item.nama}

        </h2>

        <h3>

        Rp ${item.current.toLocaleString()}
        /
        Rp ${item.target.toLocaleString()}

        </h3>

        <div class="progress-bar">

        <div
        class="progress"
        style="width:${persen}%">

        </div>

        </div>

        <p>

        ${persen.toFixed(1)}%

        </p>

        <button
        onclick="tambahTabungan(${index})"
        class="main-btn">

        Tambah Tabungan

        </button>

        <button
        onclick="hapusTarget(${index})"
        class="cancel-btn">

        Hapus

        </button>

        </div>

        `;
  });
}

// ===============================
// SIMPAN TARGET
// ===============================

document.getElementById("saveTargetBtn").addEventListener("click", () => {
  let nama = document.getElementById("targetName").value;

  let target = Number(document.getElementById("targetMoney").value);

  let current = Number(document.getElementById("currentMoney").value);

  let file = document.getElementById("targetImage").files[0];

  if (!file) {
    alert("Masukkan gambar terlebih dahulu");

    return;
  }

  let reader = new FileReader();

  reader.onload = function () {
    targets.push({
      nama: nama,

      target: target,

      current: current,

      image: reader.result,
    });

    localStorage.setItem("targets", JSON.stringify(targets));

    tampilkanTarget();

    popupTarget.style.display = "none";
  };

  reader.readAsDataURL(file);
});

// ===============================
// TAMBAH TABUNGAN
// ===============================

function tambahTabungan(index) {
  let jumlah = Number(prompt("Masukkan jumlah tabungan tambahan"));

  if (jumlah > 0) {
    targets[index].current += jumlah;

    localStorage.setItem("targets", JSON.stringify(targets));

    tampilkanTarget();
  }
}

// ===============================
// HAPUS TARGET
// ===============================

function hapusTarget(index) {
  targets.splice(index, 1);

  localStorage.setItem("targets", JSON.stringify(targets));

  tampilkanTarget();
}

// ===============================
// PERTAMA KALI
// ===============================

tampilkanTarget();
// ===============================
// KEUANGAN
// ===============================

const namaBulan = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

let sekarang = new Date();

let bulanSekarang = namaBulan[sekarang.getMonth()];

document.getElementById("bulanSekarang").innerHTML = bulanSekarang;

// ===============================
// TANGGAL HARI INI
// ===============================

let hariIni = sekarang.toISOString().split("T")[0];

document.getElementById("tanggalPengeluaran").value = hariIni;

// ===============================
// AMBIL DATA KEUANGAN
// ===============================

let dataKeuangan = JSON.parse(localStorage.getItem("keuangan")) || {
  penghasilan: 0,

  danaDarurat: 0,

  kebutuhan: 0,

  tabungan: 0,

  pengeluaran: 0,
};

// ===============================
// TAMPILKAN DATA
// ===============================

document.getElementById("penghasilan").value = dataKeuangan.penghasilan;

document.getElementById("danaDarurat").value = dataKeuangan.danaDarurat;

document.getElementById("kebutuhan").value = dataKeuangan.kebutuhan;

document.getElementById("tabunganBulanan").value = dataKeuangan.tabungan;

// ===============================
// SIMPAN OTOMATIS
// ===============================

document.querySelectorAll("#keuangan input").forEach((input) => {
  input.addEventListener(
    "input",

    () => {
      dataKeuangan = {
        penghasilan: Number(document.getElementById("penghasilan").value),

        danaDarurat: Number(document.getElementById("danaDarurat").value),

        kebutuhan: Number(document.getElementById("kebutuhan").value),

        tabungan: Number(document.getElementById("tabunganBulanan").value),

        pengeluaran: Number(document.getElementById("pengeluaranHarian").value),
      };

      localStorage.setItem(
        "keuangan",

        JSON.stringify(dataKeuangan),
      );

      updateKeuanganChart();
    },
  );
});

// ===============================
// GRAFIK KEUANGAN
// ===============================

const keuanganChart = new Chart(
  document.getElementById("keuanganChart"),

  {
    type: "bar",

    data: {
      labels: [
        "Penghasilan",

        "Dana Darurat",

        "Kebutuhan",

        "Tabungan",

        "Pengeluaran",
      ],

      datasets: [
        {
          label: "Keuangan",

          data: [0, 0, 0, 0, 0],
        },
      ],
    },
  },
);

// ===============================
// UPDATE GRAFIK
// ===============================

function updateKeuanganChart() {
  keuanganChart.data.datasets[0].data = [
    dataKeuangan.penghasilan,

    dataKeuangan.danaDarurat,

    dataKeuangan.kebutuhan,

    dataKeuangan.tabungan,

    dataKeuangan.pengeluaran,
  ];

  keuanganChart.update();
}

updateKeuanganChart();
