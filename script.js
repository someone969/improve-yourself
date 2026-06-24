// ==========================================
// 1. DEKLARASI ELEMEN UTAMA
// ==========================================
const homePage = document.getElementById("home-page");
const authPage = document.getElementById("auth-page");
const mainContent = document.getElementById("main-content");

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const authError = document.getElementById("auth-error");

const userRankTitle = document.getElementById("user-rank-title");
const userLevel = document.getElementById("user-level");
const userXpBar = document.getElementById("user-xp-bar");
const xpNumber = document.getElementById("xp-number");

// Menu-Menu Besar Navbar Bawah
const menuUtama = document.getElementById("menu-utama");
const menuRiwayat = document.getElementById("menu-riwayat");
const menuProfil = document.getElementById("menu-profil");

const navUtamaBtn = document.getElementById("nav-utama-btn");
const navRiwayatBtn = document.getElementById("nav-riwayat-btn");
const navProfilBtn = document.getElementById("nav-profil-btn");

// Hub Pilihan di Menu Utama & Sub-Halamannya
const dashboardHub = document.getElementById("dashboard-hub");
const pageDetailLatihan = document.getElementById("page-detail-latihan");
const pageDetailImprove = document.getElementById("page-detail-improve");
const pageDetailTabungan = document.getElementById("page-detail-tabungan");

const hubLatihanBtn = document.getElementById("hub-latihan-btn");
const hubImproveBtn = document.getElementById("hub-improve-btn");
const hubTabunganBtn = document.getElementById("hub-tabungan-btn");

const currentDayName = document.getElementById("current-day-name");
const currentRoutineTitle = document.getElementById("current-routine-title");
const dynamicWorkoutList = document.getElementById("dynamic-workout-list");

const totalSavingsEl = document.getElementById("total-savings");
const inputMoney = document.getElementById("input-money");
const addMoneyBtn = document.getElementById("add-money-btn");
const withdrawMoneyBtn = document.getElementById("withdraw-money-btn");

let dailyChart, weeklyChart;

// Data Konfigurasi Rutinitas Latihan Mingguan
const JADWAL_WORKOUT = {
  0: {
    nama: "MINGGU",
    ritual: "REST DAY",
    list: [
      "Istirahat Total",
      "Peregangan Otot Ringan",
      "Meditasi / Evaluasi Diri",
    ],
  },
  1: {
    nama: "SENIN",
    ritual: "PUSH DAY",
    list: [
      "Push Up Biasa (12x3)",
      "Wide Push Up (12x3)",
      "Incline Push Up (12x3)",
    ],
  },
  2: {
    nama: "SELASA",
    ritual: "PULL DAY",
    list: [
      "Pull Up / Chin Up (Max)",
      "Barbel Row (12x3)",
      "Bicep Curl Karet/Beban (12x3)",
    ],
  },
  3: {
    nama: "RABU",
    ritual: "CORE & ARM",
    list: [
      "Plank (MAX)",
      "Sit Up (12x3",
      "Rusian Twist (12x3)",
      "Handgrip / Wrist Curls (12x3)",
    ],
  },
  4: {
    nama: "KAMIS",
    ritual: "PUSH DAY",
    list: [
      "Push Up Biasa (12x3)",
      "Wide Push Up (12x3)",
      "Incline Push Up (12x3)",
      "Plank Push Up (10x3)",
    ],
  },
  5: {
    nama: "JUMAT",
    ritual: "CORE & ABS",
    list: [
      "Pull Up / Chin Up (Max)",
      "Barbel Row (12x3)",
      "Bicep Curl Karet/Beban (12x3)",
    ],
  },
  6: {
    nama: "SABTU",
    ritual: "CARDIO & LEG",
    list: [
      "Jumping Jacks (30 Detik)",
      "High Knees (30 Detik)",
      "Squat Hold (45 Detik)",
    ],
  },
};

const TEMA_WARNA = {
  green: { primary: "#00ff88", glow: "0 0 12px rgba(0, 255, 136, 0.6)" },
  blue: { primary: "#00d2ff", glow: "0 0 12px rgba(0, 210, 255, 0.6)" },
  red: { primary: "#ff3366", glow: "0 0 12px rgba(255, 51, 102, 0.6)" },
  purple: { primary: "#9d4edd", glow: "0 0 12px rgba(157, 78, 221, 0.6)" },
  orange: { primary: "#ff9100", glow: "0 0 12px rgba(255, 145, 0, 0.6)" },
  yellow: { primary: "#ffd60a", glow: "0 0 12px rgba(255, 214, 10, 0.6)" },
  pink: { primary: "#ff007f", glow: "0 0 12px rgba(255, 0, 127, 0.6)" },
  cyan: { primary: "#00f5d4", glow: "0 0 12px rgba(0, 245, 212, 0.6)" },
  white: { primary: "#ffffff", glow: "0 0 12px rgba(255, 255, 255, 0.6)" },
  gray: { primary: "#8d99ae", glow: "0 0 12px rgba(141, 153, 174, 0.6)" },
}

// ==========================================
// 2. LOGIKA NAVIGASI HALAMAN (MENCEGAH BUG BOCOR)
// ==========================================
document.getElementById("get-started-btn").addEventListener("click", () => {
  homePage.classList.add("hidden");
  authPage.classList.remove("hidden");
});
document.getElementById("back-to-home-btn").addEventListener("click", () => {
  authPage.classList.add("hidden");
  homePage.classList.remove("hidden");
  authError.textContent = "";
});
document.getElementById("go-to-register").addEventListener("click", () => {
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
});
document.getElementById("go-to-login").addEventListener("click", () => {
  registerForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
});

function bersihkanMenuBesar() {
  [menuUtama, menuRiwayat, menuProfil].forEach((m) =>
    m.classList.add("hidden"),
  );
  [navUtamaBtn, navRiwayatBtn, navProfilBtn].forEach((n) =>
    n.classList.remove("active"),
  );
}

function resetTampilanHubUtama() {
  dashboardHub.classList.remove("hidden");
  [pageDetailLatihan, pageDetailImprove, pageDetailTabungan].forEach((page) =>
    page.classList.add("hidden"),
  );
}

// Event Pindah Menu Navbar Bawah
navUtamaBtn.addEventListener("click", () => {
  bersihkanMenuBesar();
  menuUtama.classList.remove("hidden");
  navUtamaBtn.classList.add("active");
  resetTampilanHubUtama();
});
navRiwayatBtn.addEventListener("click", () => {
  bersihkanMenuBesar();
  menuRiwayat.classList.remove("hidden");
  navRiwayatBtn.classList.add("active");
  susunGrafik();
});
navProfilBtn.addEventListener("click", () => {
  bersihkanMenuBesar();
  menuProfil.classList.remove("hidden");
  navProfilBtn.classList.add("active");
});

// Event Klik 3 Tombol Menu Hub di Halaman Utama
hubLatihanBtn.addEventListener("click", () => {
  dashboardHub.classList.add("hidden");
  pageDetailLatihan.classList.remove("hidden");
});
hubImproveBtn.addEventListener("click", () => {
  dashboardHub.classList.add("hidden");
  pageDetailImprove.classList.remove("hidden");
});
hubTabunganBtn.addEventListener("click", () => {
  dashboardHub.classList.add("hidden");
  pageDetailTabungan.classList.remove("hidden");
});

// Tombol Kembali Ke Hub Utama
document
  .getElementById("back-to-hub-1")
  .addEventListener("click", resetTampilanHubUtama);
document
  .getElementById("back-to-hub-2")
  .addEventListener("click", resetTampilanHubUtama);
document
  .getElementById("back-to-hub-3")
  .addEventListener("click", resetTampilanHubUtama);

// ==========================================
// 3. REGISTRASI & LOGIN SYSTEM
// ==========================================
document.getElementById("register-btn").addEventListener("click", () => {
  const username = document.getElementById("reg-username").value.trim();
  const password = document.getElementById("reg-password").value.trim();
  const tb = document.getElementById("reg-tb").value;
  const bb = document.getElementById("reg-bb").value;
  const target = document.getElementById("reg-target").value;

  if (!username || !password || !tb || !bb || !target) {
    authError.textContent = "Data pendaftaran tidak lengkap!";
    return;
  }

  const userObj = {
    username,
    password,
    tb,
    bb,
    target,
    level: 1,
    xp: 0,
    tabungan: 0,
    tema: "green",
  };
  localStorage.setItem(`user_${username}`, JSON.stringify(userObj));
  localStorage.setItem("currentUser", username);
  localStorage.setItem("isLoggedIn", "true");
  bukaAplikasi(userObj);
});

document.getElementById("login-btn").addEventListener("click", () => {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  const dataSaves = localStorage.getItem(`user_${username}`);
  if (dataSaves) {
    const userObj = JSON.parse(dataSaves);
    if (userObj.password === password) {
      localStorage.setItem("currentUser", username);
      localStorage.setItem("isLoggedIn", "true");
      bukaAplikasi(userObj);
      return;
    }
  }
  authError.textContent = "Username atau password salah!";
});

document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  location.reload();
});

// ==========================================
// 4. SISTEM RANK & LEVEL RPG (PROGRES SUSAH)
// ==========================================
function bukaAplikasi(userObj) {
  homePage.classList.add("hidden");
  authPage.classList.add("hidden");
  mainContent.classList.remove("hidden");

  document.getElementById("profile-name").textContent = userObj.username;
  document.getElementById("profile-stats-summary").textContent =
    `TB: ${userObj.tb} cm | BB: ${userObj.bb} kg`;
  document.getElementById("profile-target").textContent =
    `Target: ${userObj.target}`;

  terapkanTema(userObj.tema || "green");
  cekResetOtomatisHarian(userObj.username);
  muatJadwalDanMisi(userObj.username);
  updateTampilanXpDanRank(userObj);
  updateTampilanTabungan(userObj.username);
  kalkulasiProgresHarianBeranda(userObj.username);
  resetTampilanHubUtama();
}

// Rumus Leveling Eksponensial: Naik level semakin tinggi = butuh XP makin banyak
function hitungMaxXp(level) {
  return level * 100 + (level - 1) * 75;
}

function dapatkanRankTitle(level) {
  if (level < 5) return "Bronze Novice";
  if (level < 12) return "🥈 Silver Warrior";
  if (level < 22) return "🥇 Gold Elite";
  return "💎 Diamond Master";
}

function tambahXp(jumlah) {
  const username = localStorage.getItem("currentUser");
  let userObj = JSON.parse(localStorage.getItem(`user_${username}`));

  userObj.xp += jumlah;
  if (userObj.xp < 0) userObj.xp = 0;
  let maxXp = hitungMaxXp(userObj.level);

  while (userObj.xp >= maxXp) {
    userObj.xp -= maxXp;
    userObj.level++;
    maxXp = hitungMaxXp(userObj.level);
    alert(`🎉 Karakter dirimu naik kelas! Sekarang Level ${userObj.level}!`);
  }

  localStorage.setItem(`user_${username}`, JSON.stringify(userObj));
  updateTampilanXpDanRank(userObj);
  kalkulasiProgresHarianBeranda(username);
}

function updateTampilanXpDanRank(userObj) {
  const maxXp = hitungMaxXp(userObj.level);
  userLevel.textContent = `LV. ${userObj.level}`;
  userRankTitle.textContent = `🎖️ ${dapatkanRankTitle(userObj.level)}`;
  xpNumber.textContent = `${userObj.xp} / ${maxXp} XP`;
  userXpBar.style.width = `${(userObj.xp / maxXp) * 100}%`;
}

// ==========================================
// 5. DETEKSI RESET HARIAN & AKTIVITAS MISI
// ==========================================
function cekResetOtomatisHarian(username) {
  const hariIni = new Date().toDateString();
  const hariTerakhirAktivitas = localStorage.getItem(
    `${username}_last_active_date`,
  );

  if (hariTerakhirAktivitas && hariTerakhirAktivitas !== hariIni) {
    simpanProgresKeRiwayatMingguan(username, hariTerakhirAktivitas);

    const objekHariKemarinIdx = new Date(hariTerakhirAktivitas).getDay();
    if (JADWAL_WORKOUT[objekHariKemarinIdx]) {
      JADWAL_WORKOUT[objekHariKemarinIdx].list.forEach((_, idx) => {
        localStorage.removeItem(
          `${username}_work_${objekHariKemarinIdx}_${idx}`,
        );
      });
    }
    ["imp-book", "imp-code", "imp-shalat", "imp-shalat1", "imp-shalat2", "imp-shalat3", "imp-shalat4", "imp-shalat5"].forEach((id) =>
      localStorage.removeItem(`${username}_${id}`),
    );
  }
  localStorage.setItem(`${username}_last_active_date`, hariIni);
}

function kalkulasiPersentaseSelesai(username) {
  const hariIndex = new Date().getDay();
  const totalMisi = JADWAL_WORKOUT[hariIndex].list.length + 3;
  let misiSelesai = 0;

  JADWAL_WORKOUT[hariIndex].list.forEach((_, idx) => {
    if (localStorage.getItem(`${username}_work_${hariIndex}_${idx}`) === "true")
      misiSelesai++;
  });
  ["imp-book", "imp-code", "imp-shalat", "imp-shalat1", "imp-shalat2", "imp-shalat3", "imp-shalat4", "imp-shalat5"].forEach((id) => {
    if (localStorage.getItem(`${username}_${id}`) === "true") misiSelesai++;
  });

  return totalMisi > 0 ? Math.round((misiSelesai / totalMisi) * 100) : 0;
}

function kalkulasiProgresHarianBeranda(username) {
  const persentase = kalkulasiPersentaseSelesai(username);
  const homeProgressBar = document.getElementById("home-progress-bar");
  const homeProgressText = document.getElementById("home-progress-text");
  if (homeProgressBar) homeProgressBar.style.width = `${persentase}%`;
  if (homeProgressText)
    homeProgressText.textContent =
      persentase > 0
        ? `${persentase}% Misi Selesai`
        : "Belum ada aktivitas selesai";
}

function simpanProgresKeRiwayatMingguan(username, tanggalString) {
  const indexHari = new Date(tanggalString).getDay();
  const persentaseKemarin = kalkulasiPersentaseSelesai(username);

  let riwayatChart = JSON.parse(
    localStorage.getItem(`${username}_weekly_chart_data`),
  ) || [0, 0, 0, 0, 0, 0, 0];
  riwayatChart[indexHari] = persentaseKemarin;
  localStorage.setItem(
    `${username}_weekly_chart_data`,
    JSON.stringify(riwayatChart),
  );
}

function muatJadwalDanMisi(username) {
  const hariIndex = new Date().getDay();
  const infoJadwal = JADWAL_WORKOUT[hariIndex];

  currentDayName.textContent = `HARI ${infoJadwal.nama}`;
  currentRoutineTitle.textContent = `🔥 ${infoJadwal.ritual}`;

  dynamicWorkoutList.innerHTML = "";
  infoJadwal.list.forEach((gerakan, idx) => {
    const idMisi = `work_${hariIndex}_${idx}`;
    const isChecked = localStorage.getItem(`${username}_${idMisi}`) === "true";

    const label = document.createElement("label");
    label.className = "workout-item";
    label.innerHTML = `
            <input type="checkbox" id="${idMisi}" ${isChecked ? "checked" : ""}>
            <span class="workout-text">${gerakan}</span>
        `;

    label.querySelector("input").addEventListener("change", (e) => {
      localStorage.setItem(`${username}_${idMisi}`, e.target.checked);
      tambahXp(e.target.checked ? 15 : -15);
      simpanProgresKeRiwayatMingguan(username, new Date().toDateString());
    });

    dynamicWorkoutList.appendChild(label);
  });

  ["imp-book", "imp-code", "imp-shalat", "imp-shalat1", "imp-shalat2", "imp-shalat3", "imp-shalat4", "imp-shalat5"].forEach((idImp) => {
    const inputImp = document.getElementById(idImp);
    inputImp.checked = localStorage.getItem(`${username}_${idImp}`) === "true";

    inputImp.onchange = null;
    inputImp.onchange = (e) => {
      localStorage.setItem(`${username}_${idImp}`, e.target.checked);
      tambahXp(e.target.checked ? 10 : -10);
      simpanProgresKeRiwayatMingguan(username, new Date().toDateString());
    };
  });
}

document.getElementById("reset-btn").addEventListener("click", () => {
  if (confirm("Reset semua status centang misi hari ini?")) {
    const username = localStorage.getItem("currentUser");
    const hariIndex = new Date().getDay();
    JADWAL_WORKOUT[hariIndex].list.forEach((_, idx) => {
      localStorage.removeItem(`${username}_work_${hariIndex}_${idx}`);
    });
    ["imp-book", "imp-code", "imp-shalat", "imp-shalat1", "imp-shalat2", "imp-shalat3", "imp-shalat4", "imp-shalat5"].forEach((id) =>
      localStorage.removeItem(`${username}_${id}`),
    );
    muatJadwalDanMisi(username);
    tambahXp(0);
  }
});

// ==========================================
// 6. TABUNGAN & SELEKTOR TEMA WARNA
// ==========================================
function updateTampilanTabungan(username) {
  const userObj = JSON.parse(localStorage.getItem(`user_${username}`));
  totalSavingsEl.textContent = `Rp ${parseInt(userObj.tabungan || 0).toLocaleString("id-ID")}`;
}

addMoneyBtn.addEventListener("click", () => {
  eksekusiTabungan(true);
});
withdrawMoneyBtn.addEventListener("click", () => {
  eksekusiTabungan(false);
});

function eksekusiTabungan(isTambah) {
  const username = localStorage.getItem("currentUser");
  let userObj = JSON.parse(localStorage.getItem(`user_${username}`));
  const nominal = parseInt(inputMoney.value);

  if (!nominal || nominal <= 0) {
    alert("Masukkan jumlah uang!");
    return;
  }
  if (!isTambah && userObj.tabungan < nominal) {
    alert("Tabungan tidak cukup!");
    return;
  }

  userObj.tabungan = isTambah
    ? userObj.tabungan + nominal
    : userObj.tabungan - nominal;
  localStorage.setItem(`user_${username}`, JSON.stringify(userObj));
  inputMoney.value = "";
  updateTampilanTabungan(username);
  tambahXp(5);
}

document.querySelectorAll(".theme-dot").forEach((dot) => {
  dot.addEventListener("click", (e) => {
    const temaTerpilih = e.target.getAttribute("data-theme");
    terapkanTema(temaTerpilih);
    const username = localStorage.getItem("currentUser");
    let userObj = JSON.parse(localStorage.getItem(`user_${username}`));
    userObj.tema = temaTerpilih;
    localStorage.setItem(`user_${username}`, JSON.stringify(userObj));
  });
});

function terapkanTema(namaTema) {
  const tema = TEMA_WARNA[namaTema] || TEMA_WARNA.green;
  document.documentElement.style.setProperty("--primary-color", tema.primary);
  document.documentElement.style.setProperty("--glow-shadow", tema.glow);
}

// ==========================================
// 7. REAL-TIME AKTIVITAS GRAFIK CHALENGE 📈
// ==========================================
function susunGrafik() {
  const username = localStorage.getItem("currentUser");
  const ctxDaily = document.getElementById("dailyChart").getContext("2d");
  const ctxWeekly = document.getElementById("weeklyChart").getContext("2d");

  if (dailyChart) dailyChart.destroy();
  if (weeklyChart) weeklyChart.destroy();

  const warnaTema = getComputedStyle(document.documentElement)
    .getPropertyValue("--primary-color")
    .trim();
  const totalSelesaiHariIni = kalkulasiPersentaseSelesai(username);

  dailyChart = new Chart(ctxDaily, {
    type: "bar",
    data: {
      labels: ["Sisa Misi", "Misi Selesai"],
      datasets: [
        {
          label: "Aktivitas Hari Ini (%)",
          data: [100 - totalSelesaiHariIni, totalSelesaiHariIni],
          backgroundColor: ["#333333", warnaTema],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { labels: { color: "#fff" } } },
    },
  });

  const dataAsliMingguan = JSON.parse(
    localStorage.getItem(`${username}_weekly_chart_data`),
  ) || [0, 0, 0, 0, 0, 0, 0];

  weeklyChart = new Chart(ctxWeekly, {
    type: "line",
    data: {
      labels: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
      datasets: [
        {
          label: "Konsistensi Mingguan %",
          data: dataAsliMingguan,
          borderColor: warnaTema,
          backgroundColor: "rgba(0,0,0,0.1)",
          tension: 0.2,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { labels: { color: "#fff" } } },
    },
  });
}

// Pemulihan Sesi Akun saat Reload
window.onload = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const currentUsername = localStorage.getItem("currentUser");
  if (isLoggedIn && currentUsername) {
    const savedUser = localStorage.getItem(`user_${currentUsername}`);
    if (savedUser) {
      bukaAplikasi(JSON.parse(savedUser));
    }
  }
};
