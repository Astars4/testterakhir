// Data kuis dengan level kesulitan berbeda
const quizDatabase = {
  easy: [
    {
      question: "Siapa yang membacakan teks Proklamasi Kemerdekaan Indonesia?",
      options: ["Soekarno", "Mohammad Hatta", "Sutan Sjahrir", "Bung Tomo"],
      answer: "Soekarno",
    },
    {
      question: "Kerajaan Hindu tertua di Indonesia adalah?",
      options: ["Kutai", "Majapahit", "Sriwijaya", "Tarumanegara"],
      answer: "Kutai",
    },
    {
      question: "Sumpah Pemuda terjadi pada tahun?",
      options: ["1928", "1945", "1908", "1918"],
      answer: "1928",
    },
    {
      question:
        "Pahlawan nasional dari Aceh yang dijuluki 'Singa Aceh' adalah?",
      options: [
        "Cut Nyak Dhien",
        "Teuku Umar",
        "Pangeran Diponegoro",
        "Sultan Hasanuddin",
      ],
      answer: "Cut Nyak Dhien",
    },
    {
      question: "Ibu kota Indonesia pertama setelah kemerdekaan adalah?",
      options: ["Jakarta", "Yogyakarta", "Bandung", "Surabaya"],
      answer: "Jakarta",
    },
  ],
  medium: [
    {
      question: "Perang Diponegoro terjadi pada tahun berapa?",
      options: ["1825-1830", "1945-1949", "1900-1905", "1800-1805"],
      answer: "1825-1830",
    },
    {
      question:
        "Gerakan Reformasi 1998 bertujuan untuk mengakhiri pemerintahan siapa?",
      options: ["Soeharto", "Soekarno", "BJ Habibie", "Gus Dur"],
      answer: "Soeharto",
    },
    {
      question: "Tokoh yang dikenal sebagai Bapak Pendidikan Nasional adalah?",
      options: [
        "Ki Hajar Dewantara",
        "Dewi Sartika",
        "R.A. Kartini",
        "Ahmad Dahlan",
      ],
      answer: "Ki Hajar Dewantara",
    },
    {
      question: "Peristiwa Bandung Lautan Api terjadi pada tahun?",
      options: ["1946", "1945", "1947", "1948"],
      answer: "1946",
    },
    {
      question:
        "Konferensi Meja Bundar yang mengakui kedaulatan Indonesia dilaksanakan di?",
      options: ["Den Haag", "Jakarta", "Yogyakarta", "London"],
      answer: "Den Haag",
    },
  ],
  hard: [
    {
      question:
        "Siapa pemimpin perlawanan rakyat Bali terhadap Belanda dalam Perang Puputan?",
      options: [
        "I Gusti Ngurah Rai",
        "I Gusti Ketut Jelantik",
        "Patimura",
        "Sisingamangaraja XII",
      ],
      answer: "I Gusti Ngurah Rai",
    },
    {
      question:
        "Perjanjian Renville ditandatangani di atas kapal perang milik negara mana?",
      options: ["Amerika Serikat", "Belanda", "Inggris", "Prancis"],
      answer: "Amerika Serikat",
    },
    {
      question:
        "Siapa tokoh pergerakan nasional yang mendirikan Indische Partij?",
      options: [
        "Douwes Dekker, Tjipto Mangunkusumo, Ki Hajar Dewantara",
        "H.O.S. Cokroaminoto",
        "Sutan Sjahrir",
        "Mohammad Hatta",
      ],
      answer: "Douwes Dekker, Tjipto Mangunkusumo, Ki Hajar Dewantara",
    },
    {
      question: "Peristiwa apa yang terjadi pada 10 November 1945 di Surabaya?",
      options: [
        "Pertempuran Surabaya",
        "Proklamasi Kemerdekaan",
        "Sumpah Pemuda",
        "Bandung Lautan Api",
      ],
      answer: "Pertempuran Surabaya",
    },
    {
      question: "Kerajaan Islam pertama di Jawa adalah?",
      options: ["Demak", "Mataram Islam", "Pajang", "Cirebon"],
      answer: "Demak",
    },
  ],
};

let quizData = [];
let currentQuestion = 0;
let score = 0;
let currentDifficulty = "";

// Fungsi untuk memulai kuis
function startQuiz(difficulty) {
  currentDifficulty = difficulty;
  quizData = quizDatabase[difficulty];
  currentQuestion = 0;
  score = 0;

  // Sembunyikan semua konten lain
  document.querySelectorAll("#output .content").forEach((content) => {
    content.classList.add("hidden");
  });

  // Tampilkan konten quiz
  const quizContent = document.getElementById("quizContent");
  quizContent.classList.remove("hidden");
  quizContent.innerHTML = `
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg mx-auto">
      <h1 class="mb-6 text-2xl font-bold text-center">Kuis Sejarah Indonesia</h1>
      
      <div id="quizDifficultySelection" class="text-center">
        <h2 class="mb-4 text-xl font-semibold">Pilih Tingkat Kesulitan:</h2>
        <div class="space-y-3">
          <button onclick="selectQuizDifficulty('easy')" class="w-full p-3 text-white bg-green-500 rounded-lg hover:bg-green-600 ${
            difficulty === "easy" ? "ring-2 ring-offset-2 ring-green-500" : ""
          }">
            Mudah
          </button>
          <button onclick="selectQuizDifficulty('medium')" class="w-full p-3 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 ${
            difficulty === "medium"
              ? "ring-2 ring-offset-2 ring-yellow-500"
              : ""
          }">
            Menengah
          </button>
          <button onclick="selectQuizDifficulty('hard')" class="w-full p-3 text-white bg-red-500 rounded-lg hover:bg-red-600 ${
            difficulty === "hard" ? "ring-2 ring-offset-2 ring-red-500" : ""
          }">
            Sulit
          </button>
        </div>
        <button onclick="startSelectedQuiz()" class="w-full mt-4 p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
          Mulai Kuis
        </button>
      </div>
      
      <div id="quizContainer" class="hidden"></div>
      
      <div id="quizResult" class="hidden text-center">
        <h2 class="mb-4 text-xl font-bold">Hasil Kuis</h2>
        <div id="resultText" class="mb-6"></div>
        <button onclick="resetQuiz()" class="p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
          Ulangi Kuis
        </button>
      </div>
    </div>
  `;

  // Tampilkan pilihan difficulty lagi (untuk memungkinkan perubahan)
  document.getElementById("quizDifficultySelection").classList.remove("hidden");
}

function selectQuizDifficulty(difficulty) {
  currentDifficulty = difficulty;
  const buttons = document.querySelectorAll("#quizDifficultySelection button");
  buttons.forEach((btn) => {
    if (btn.onclick.toString().includes(`'${difficulty}'`)) {
      btn.classList.add("ring-2", "ring-offset-2");
      if (difficulty === "easy") btn.classList.add("ring-green-500");
      if (difficulty === "medium") btn.classList.add("ring-yellow-500");
      if (difficulty === "hard") btn.classList.add("ring-red-500");
    } else {
      btn.classList.remove(
        "ring-2",
        "ring-offset-2",
        "ring-green-500",
        "ring-yellow-500",
        "ring-red-500"
      );
    }
  });
}

function startSelectedQuiz() {
  quizData = quizDatabase[currentDifficulty];
  document.getElementById("quizDifficultySelection").classList.add("hidden");
  document.getElementById("quizContainer").classList.remove("hidden");
  loadQuestion();
}

// Fungsi untuk menampilkan pertanyaan
function loadQuestion() {
  const quizContainer = document.getElementById("quizContainer");
  const questionData = quizData[currentQuestion];

  // Tampilkan indikator tingkat kesulitan
  let difficultyBadge = "";
  let badgeColor = "";

  if (currentDifficulty === "easy") {
    difficultyBadge = "Mudah";
    badgeColor = "bg-green-500";
  } else if (currentDifficulty === "medium") {
    difficultyBadge = "Menengah";
    badgeColor = "bg-yellow-500";
  } else {
    difficultyBadge = "Sulit";
    badgeColor = "bg-red-500";
  }

  quizContainer.innerHTML = `
    <div class="flex justify-between items-center mb-2">
      <span class="text-sm text-gray-600">
        Pertanyaan ${currentQuestion + 1} dari ${quizData.length}
      </span>
      <span class="text-sm text-white ${badgeColor} px-2 py-1 rounded">
        ${difficultyBadge}
      </span>
    </div>
    <h3 class="text-xl font-bold mb-4">${questionData.question}</h3>
    <div class="space-y-4">
      ${questionData.options
        .map(
          (option) => `
        <button onclick="selectAnswer('${option}')" class="w-full bg-gray-200 p-4 rounded-lg hover:bg-gray-300 transition">
          ${option}
        </button>
      `
        )
        .join("")}
    </div>
  `;
}

// Fungsi untuk memilih jawaban
function selectAnswer(selectedOption) {
  const correctAnswer = quizData[currentQuestion].answer;
  const buttons = document.querySelectorAll("#quizContainer button");

  // Nonaktifkan semua tombol setelah jawaban dipilih
  buttons.forEach((button) => {
    button.disabled = true;
    button.classList.remove("hover:bg-gray-300");
  });

  // Cek jawaban dan beri feedback
  buttons.forEach((button) => {
    if (button.innerText === correctAnswer) {
      button.classList.add("bg-green-500", "text-white");
    } else if (button.innerText === selectedOption) {
      button.classList.add("bg-red-500", "text-white");
    }
  });

  // Tambah skor jika jawaban benar
  if (selectedOption === correctAnswer) {
    score++;
  }

  // Lanjut ke soal berikutnya setelah 1 detik
  setTimeout(() => {
    if (currentQuestion < quizData.length - 1) {
      currentQuestion++;
      loadQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

// Fungsi untuk menampilkan hasil kuis
function showResult() {
  const quizContainer = document.getElementById("quizContainer");
  const quizResult = document.getElementById("quizResult");
  const resultText = document.getElementById("resultText");

  quizContainer.classList.add("hidden");
  quizResult.classList.remove("hidden");

  // Hitung persentase
  const percentage = Math.round((score / quizData.length) * 100);
  let message = "";
  let emoji = "";

  if (percentage >= 80) {
    message = "Sangat Baik! Anda sangat menguasai materi sejarah Indonesia.";
    emoji = "🎉";
  } else if (percentage >= 60) {
    message = "Baik! Anda cukup memahami sejarah Indonesia.";
    emoji = "👍";
  } else {
    message = "Anda perlu mempelajari lebih lanjut tentang sejarah Indonesia.";
    emoji = "📚";
  }

  resultText.innerHTML = `
    <p class="text-lg font-semibold">${emoji} Anda menjawab <span class="text-blue-600">${score}</span> dari ${
    quizData.length
  } pertanyaan dengan benar (${percentage}%).</p>
    <p class="mt-2">${message}</p>
    <p class="mt-4 text-sm text-gray-600">Tingkat kesulitan: ${
      currentDifficulty === "easy"
        ? "Mudah"
        : currentDifficulty === "medium"
        ? "Menengah"
        : "Sulit"
    }</p>
  `;
}

// Fungsi untuk mengulang kuis
function resetQuiz() {
  document.getElementById("quizResult").classList.add("hidden");
  document.getElementById("quizDifficultySelection").classList.remove("hidden");
  document.getElementById("quizContainer").classList.add("hidden");
  currentQuestion = 0;
  score = 0;
}

// Handle menu navigation
function handleMenu(menu) {
  document.querySelectorAll("#output .content").forEach((content) => {
    content.classList.add("hidden");
  });

  if (menu === "quiz") {
    startQuiz("easy"); // Default to easy difficulty
  } else {
    document.getElementById(`${menu}Content`).classList.remove("hidden");
  }
}
