// ─────────────────────────────────────────────
//  translations.js  —  SteadyRise i18n strings
//  Supported: "en" | "id"
// ─────────────────────────────────────────────

import { Settings } from "lucide-react";

export const translations = {
  en: {
    // ── App / Brand ──
    appName: "SteadyRise",
    tagline: "Control Your Time, Achieve Your Academic Goals.",
    taglineSub:
      "SteadyRise is your productivity command center — from task management and study target tracking, to monthly insights that keep you motivated.",

    // ── Navbar ──
    nav: {
      startNow: "Get Started",
      seeFeatures: "See Features",
    },

    // ── Hero badges / stats ──
    hero: {
      badge: "Productivity Platform for Students",
      startFree: "Start for Free",
      features: "See Features",
      stats: {
        features: "Productivity Features",
        free: "Free for Students",
        mode: "Display Mode",
        featuresVal: "8",
        freeVal: "100%",
        modeVal: "Dark & Light",
      },
    },

    // ── Features section ──
    features: {
      heading: "Everything you need,\nin one place.",
      sub: "Designed specifically for the dynamic and challenging rhythm of student life.",
      items: [
        {
          title: "Productivity Dashboard",
          desc: "Real-time progress visualization through charts, streaks, and activity calendar.",
        },
        {
          title: "Task Manager",
          desc: "Manage tasks with deadlines, priorities, and categories. Quick filters for focus.",
        },
        {
          title: "Target",
          desc: "Set study targets and track achievements with motivating progress bars.",
        },
        {
          title: "Monthly Recap",
          desc: "Full monthly recap: tasks, study hours, productive days, and time insights.",
        },
        {
          title: "Study Notes",
          desc: "Structured note-taking per subject with tags and quick search.",
        },
      ],
    },

    // ── CTA Banner ──
    cta: {
      heading: "Ready to be more productive?",
      sub: "Join now and start taking control of your study time.",
      button: "Get Started",
    },

    // ── Footer ──
    footer: {
      credit: "IFest WDC 2026 — Empowering Students Through Innovative Productivity Tools",
    },

    // ── Sidebar / Nav ──
    nav_items: {
      dashboard: "Dashboard",
      todo: "Task Manager",
      target: "Target",
      recap: "Monthly Recap",
      notes: "Study Notes",
      settings: "Settings",
    },

    sidebar: {
      theme: "Theme",
      activeStudent: "Active Student",
      logout: "Logout",
      preferences: "Preferences",
    },

    // ── Common UI ──
    common: {
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      add: "Add",
      close: "Close",
      search: "Search…",
      loading: "Loading…",
      noData: "No data yet.",
      confirm: "Confirm",
      back: "Back",
      next: "Next",
      done: "Done",
      reset: "Reset",
      filter: "Filter",
      sortBy: "Sort by",
      all: "All",
      today: "Today",
      week: "This Week",
      month: "This Month",
    },

    // ── Landing ──
    landing: {
      fitur: "Features",
      tentang: "About",
      mulai: "Get Started",
      headline1: "One platform.",
      headline2: "All productivity.",
      headline3: "Without limits.",
      cta_btn: "Start Productive",
      feat_heading: "Everything you need,",
      feat_sub_heading: "in one place.",
      feat_desc: "Designed for your dynamic and challenge-filled daily rhythm.",
      cta_title: "Ready to be more productive?",
      cta_desc: "Join now and start taking control of your study time.",
      cta_btn2: "Get Started",
      coba: "Try this feature",
      checklist: [
        "Manage study activities more structured",
        "Auto sync with Google Calendar",
        "Available in 2 languages: Indonesian & English",
        "Customize: theme, font, and text size",
      ],
      tags: ["Overview", "Productivity", "Goals", "Insight", "Study"],
      footer: "IFest WDC 2026 — Innovative Productivity Tools for a Better You",
      tagline: "Innovative Productivity Tools for a Better You",
    },

    // Target
    target: {
      title: "Productivity Targets",
      addTarget: "New Target",
      targetName: "Target name",
      subject: "Subject",
      currentVal: "Current",
      goalVal: "Goal",
      unit: "Unit",
      deadline: "Deadline",
      progress: "Progress",
      noTargets: "No targets set yet.",
      noTargetDesc: "Start setting your first target and achieve it with Pomodoro!",
      firstTarget: "Create First Target",
      typeHours: "Study Hours",
      typeTasks: "Tasks Done",
      typeDays: "Productive Days",
      formTitle: "New Target",
      formType: "Type",
      formInitial: "Initial Progress",
      tabTarget: "Target",
      tabPomodoro: "Focus Now",
      achieved: "Achieved!",
      onTrack: "On Track",
      needCatchUp: "Need to Catch Up",
      almostThere: (n) => `Almost there! ${n} more to go`,
      halfWay: "Halfway there, keep going!",
      justStarted: "Just started, let's go!",
      focusNow: "Focus now",
      workingOn: "What are you working on?",
      sessionsDone: "Sessions Done",
      focusMinutes: "Focus Minutes",
      subtitleDone: (done, total) => `${done} of ${total} targets achieved`,
      namePlaceholder: "e.g. Study 3 hours a day...",
      focusNowBtn: "Focus now",
      workingPlaceholder: "e.g. Chapter 3 Web Programming...",
    },

    // ── Dashboard ──
    dashboard: {
      greeting: "Good morning",
      greetingAfternoon: "Good afternoon",
      greetingEvening: "Good evening",
      subtitle: "Here's your productivity summary.",
      tasksToday: "Tasks Today",
      streak: "Day Streak",
      studyHours: "Study Hours",
      completionRate: "Completion Rate",
      recentActivity: "Recent Activity",
      upcomingDeadlines: "Upcoming Deadlines",
      noTasks: "No tasks for today.",
      noDeadlines: "No upcoming deadlines.",
    },

    // ── Todo ──
    todo: {
      title: "Task Manager",
      addTask: "Add Task",
      taskName: "Task name",
      deadline: "Deadline",
      priority: "Priority",
      category: "Category",
      priorityHigh: "High",
      priorityMed: "Medium",
      priorityLow: "Low",
      statusAll: "All",
      statusActive: "Active",
      statusDone: "Completed",
      noTasks: "No tasks found.",
      deleteConfirm: "Delete this task?",
    },


    // ── Recap ──
    recap: {
      title: "Monthly Recap",
      totalTasks: "Total Tasks",
      completed: "Completed",
      studyHours: "Study Hours",
      productiveDays: "Productive Days",
      completionRate: "Completion Rate",
      noData: "No data for this month yet.",
      weeklyTasks: "Tasks Completed per Week",
      lastMonthComparison: "Last Month Comparison",
      productiveDaysMonth: "Productive Days in",
      mostProductiveDay: "Most productive day:",
      mostProductiveTime: "Most productive at",
      vsLastMonth: "vs last month",
      greatWork: "Great work! You're more productive this month.",
      productive: "Productive",
      regular: "Low-key",
      summaryPrefix: "Productivity summary for",
      wednesday: "Wednesday",
      night: "night",
      recapLabel: "Recap",
      week1: "Week 1",
      week2: "Week 2",
      week3: "Week 3",
      week4: "Week 4",
    },

    // ── Notes ──
    notes: {
      title: "Study Notes",
      addNote: "New Note",
      noteName: "Title",
      subject: "Subject",
      content: "Content",
      tags: "Tags",
      noNotes: "No notes yet.",
      searchPlaceholder: "Search notes…",
      noteTitle: "Note Title",
      contentPlaceholder: "Write your notes here...",
      titlePlaceholder: "e.g. Database Summary Chapter 3",
      colorLabel: "Color",
      tagLabel: "Tag",
      cancelBtn: "Cancel",
      saveBtn: "Save",
      noContent: "No content yet.",
      noteSaved: "Note saved!",
      noteDeleted: "Note deleted",
      titleRequired: "Note title is required!",
      notesCount: (n) => `${n} note${n === 1 ? "" : "s"} saved`,
      tags: ["Course", "Tips", "Project", "Research", "Personal"],
    },
    // ── Pomodoro ──
    pomodoro: {
      title: "Pomodoro Timer",
      focus: "Focus",
      shortBreak: "Short Break",
      longBreak: "Long Break",
      start: "Start",
      pause: "Pause",
      reset: "Reset",
      sessionsToday: "Sessions Today",
      totalFocus: "Total Focus Time",
    },

    // ── Habit ──
    habit: {
      title: "Habit Tracker",
      addHabit: "Add Habit",
      habitName: "Habit name",
      streak: "Streak",
      completedToday: "Done Today",
      noHabits: "No habits tracked yet.",
    },

    // ── Auth / Login ──
    auth: {
      welcome: "Welcome to SteadyRise",
      loginTitle: "Sign In",
      registerTitle: "Create Account",
      name: "Full Name",
      email: "Email",
      password: "Password",
      loginBtn: "Sign In",
      registerBtn: "Create Account",
      switchToRegister: "Don't have an account? Sign up",
      switchToLogin: "Already have an account? Sign in",
      guestBtn: "Continue as Guest",
    },
  },

  // ────────────────────────────────────────────
  //  BAHASA INDONESIA
  // ────────────────────────────────────────────
  id: {
    appName: "SteadyRise",
    tagline: "Kendalikan Waktu, Capai Target Studimu.",
    taglineSub:
      "SteadyRise adalah ruang kendali produktivitasmu — dari manajemen tugas, tracking target belajar, hingga insight bulanan yang memotivasi.",

    nav: {
      startNow: "Mulai Sekarang",
      seeFeatures: "Lihat Fitur",
    },

    hero: {
      badge: "Platform Produktivitas untuk Mahasiswa Indonesia",
      startFree: "Mulai Gratis",
      features: "Lihat Fitur",
      stats: {
        features: "Fitur Produktivitas",
        free: "Gratis untuk Mahasiswa",
        mode: "Mode Tampilan",
        featuresVal: "8",
        freeVal: "100%",
        modeVal: "Dark & Light",
      },
    },

    features: {
      heading: "Semua yang kamu butuhkan,\ndalam satu tempat.",
      sub: "Dirancang untuk ritme hidupmu yang dinamis dan penuh tantangan.",
      items: [
        {
          title: "Beranda Produktivitas",
          desc: "Visualisasi real-time progress harian lewat grafik, streak, dan kalender aktivitas.",
        },
        {
          title: "Manajemen Tugas",
          desc: "Kelola tugas dengan deadline, prioritas, dan kategori. Filter cepat untuk fokus.",
        },
        {
          title: "Target",
          desc: "Set target belajar dan pantau pencapaian dengan progress bar yang memotivasi.",
        },
        {
          title: "Rekap Bulanan",
          desc: "Rekap bulanan lengkap: tugas, jam belajar, hari produktif, dan insight waktu.",
        },
        {
          title: "Catatan Belajar",
          desc: "Note-taking terstruktur per mata kuliah dengan tag dan pencarian cepat.",
        },
      ],
    },

    cta: {
      heading: "Siap jadi lebih produktif?",
      sub: "Bergabung sekarang dan mulai kendalikan waktu belajarmu.",
      button: "Mulai Sekarang",
    },

    footer: {
      credit: "IFest WDC 2026 — Empowering Students Through Innovative Productivity Tools",
    },

    nav_items: {
      dashboard: "Beranda",
      todo: "Manajemen Tugas",
      target: "Target",
      recap: "Rekap Bulanan",
      notes: "Catatan Belajar",
      settings: "Pengaturan",
      pomodoro: "Pomodoro",
      habit: "Habit Tracker",
    },

    sidebar: {
      theme: "Tema",
      activeStudent: "Mahasiswa Aktif",
      logout: "Keluar",
      preferences: "Preferensi",
    },

    common: {
      save: "Simpan",
      cancel: "Batal",
      delete: "Hapus",
      edit: "Edit",
      add: "Tambah",
      close: "Tutup",
      search: "Cari…",
      loading: "Memuat…",
      noData: "Belum ada data.",
      confirm: "Konfirmasi",
      back: "Kembali",
      next: "Lanjut",
      done: "Selesai",
      reset: "Reset",
      filter: "Filter",
      sortBy: "Urutkan",
      all: "Semua",
      today: "Hari Ini",
      week: "Minggu Ini",
      month: "Bulan Ini",
    },

    // ── Landing ──
    landing: {
      fitur: "Fitur",
      tentang: "Tentang",
      mulai: "Mulai Sekarang",
      headline1: "Satu platform.",
      headline2: "Semua produktivitas.",
      headline3: "Tanpa batas.",
      cta_btn: "Mulai Produktif",
      feat_heading: "Semua yang kamu butuhkan,",
      feat_sub_heading: "dalam satu tempat.",
      feat_desc: "Dirancang untuk ritme hidupmu yang dinamis dan penuh tantangan.",
      cta_title: "Siap jadi lebih produktif?",
      cta_desc: "Bergabung sekarang dan mulai kendalikan waktu belajarmu.",
      cta_btn2: "Mulai Sekarang",
      coba: "Coba fitur ini",
      checklist: [
        "Kelola aktivitas belajar dengan lebih terstruktur",
        "Sinkronisasi otomatis dengan Google Calendar",
        "Tersedia dalam 2 bahasa: Indonesia dan Inggris",
        "Kustomisasi tampilan: tema, font, dan ukuran teks",
      ],
        tags: ["Ringkasan", "Produktivitas", "Target", "Statistik", "Belajar"],
        footer: "IFest WDC 2026 — Inovasi Produktivitas untuk Versi Terbaikmu",
        tagline: "Inovasi Produktivitas untuk Versi Terbaikmu",
    },

    // Target
    target: {
      title: "Target Produktivitas",
      addTarget: "Target Baru",
      targetName: "Nama target",
      subject: "Mata Kuliah",
      currentVal: "Saat Ini",
      goalVal: "Target",
      unit: "Satuan",
      deadline: "Deadline",
      progress: "Progress",
      noTargets: "Belum ada target yang dibuat.",
      noTargetDesc: "Mulai set target pertamamu dan raih bersama Pomodoro!",
      firstTarget: "Buat Target Pertama",
      typeHours: "Jam Belajar",
      typeTasks: "Tugas Selesai",
      typeDays: "Hari Produktif",
      formTitle: "Target Baru",
      formType: "Tipe",
      formInitial: "Progress Awal",
      tabTarget: "Target",
      tabPomodoro: "Fokus Sekarang",
      achieved: "Tercapai!",
      onTrack: "On Track",
      needCatchUp: "Perlu Dikejar",
      almostThere: (n) => `Hampir sampai! Tinggal ${n} lagi`,
      halfWay: "Setengah jalan, tetap semangat!",
      justStarted: "Baru mulai, yuk gas!",
      focusNow: "Fokus sekarang",
      workingOn: "Sedang mengerjakan apa?",
      sessionsDone: "Sesi Selesai",
      focusMinutes: "Menit Fokus",
      subtitleDone: (done, total) => `${done} dari ${total} target tercapai`,
      namePlaceholder: "cth: Belajar 3 jam sehari...",
      focusNowBtn: "Fokus sekarang",
      workingPlaceholder: "cth: Bab 3 Pemrograman Web...",
    },

    dashboard: {
      greeting: "Selamat pagi",
      greetingAfternoon: "Selamat siang",
      greetingEvening: "Selamat malam",
      subtitle: "Berikut ringkasan produktivitasmu.",
      tasksToday: "Tugas Hari Ini",
      streak: "Hari Berturut",
      studyHours: "Jam Belajar",
      completionRate: "Tingkat Selesai",
      recentActivity: "Aktivitas Terkini",
      upcomingDeadlines: "Deadline Mendatang",
      noTasks: "Tidak ada tugas hari ini.",
      noDeadlines: "Tidak ada deadline mendatang.",
    },

    todo: {
      title: "Task Manager",
      addTask: "Tambah Tugas",
      taskName: "Nama tugas",
      deadline: "Deadline",
      priority: "Prioritas",
      category: "Kategori",
      priorityHigh: "Tinggi",
      priorityMed: "Sedang",
      priorityLow: "Rendah",
      statusAll: "Semua",
      statusActive: "Aktif",
      statusDone: "Selesai",
      noTasks: "Tidak ada tugas ditemukan.",
      deleteConfirm: "Hapus tugas ini?",
    },


    recap: {
      title: "Monthly Recap",
      totalTasks: "Total Tugas",
      completed: "Selesai",
      studyHours: "Jam Belajar",
      productiveDays: "Hari Produktif",
      completionRate: "Tingkat Selesai",
      noData: "Belum ada data bulan ini.",
      weeklyTasks: "Tugas Selesai per Minggu",
      lastMonthComparison: "Perbandingan Bulan Lalu",
      productiveDaysMonth: "Hari Produktif",
      mostProductiveDay: "Hari paling produktif:",
      mostProductiveTime: "Paling produktif di",
      vsLastMonth: "vs bulan lalu",
      greatWork: "Kerja bagus! Kamu lebih produktif bulan ini.",
      productive: "Produktif",
      regular: "Santai",
      summaryPrefix: "Ringkasan produktivitas",
      wednesday: "Rabu",
      night: "malam hari",
      recapLabel: "Rekap",
      week1: "Pekan 1",
      week2: "Pekan 2",
      week3: "Pekan 3",
      week4: "Pekan 4",
    },

    notes: {
      title: "Catatan Belajar",
      addNote: "Catatan Baru",
      noteName: "Judul",
      subject: "Mata Kuliah",
      content: "Isi",
      tags: "Tag",
      noNotes: "Belum ada catatan.",
      searchPlaceholder: "Cari catatan…",
      noteTitle: "Judul Catatan",
      contentPlaceholder: "Tulis catatanmu di sini...",
      titlePlaceholder: "cth: Ringkasan Basis Data Bab 3",
      colorLabel: "Warna",
      tagLabel: "Tag",
      cancelBtn: "Batal",
      saveBtn: "Simpan",
      noContent: "Tidak ada isi catatan.",
      noteSaved: "Catatan berhasil disimpan!",
      noteDeleted: "Catatan dihapus",
      titleRequired: "Judul catatan wajib diisi!",
      notesCount: (n) => `${n} catatan tersimpan`,
      tags: ["Kuliah", "Tips", "Proyek", "Riset", "Pribadi"],
    },

    pomodoro: {
      title: "Pomodoro Timer",
      focus: "Fokus",
      shortBreak: "Istirahat Singkat",
      longBreak: "Istirahat Panjang",
      start: "Mulai",
      pause: "Jeda",
      reset: "Reset",
      sessionsToday: "Sesi Hari Ini",
      totalFocus: "Total Waktu Fokus",
    },

    habit: {
      title: "Habit Tracker",
      addHabit: "Tambah Kebiasaan",
      habitName: "Nama kebiasaan",
      streak: "Streak",
      completedToday: "Selesai Hari Ini",
      noHabits: "Belum ada kebiasaan yang dilacak.",
    },

    auth: {
      welcome: "Selamat Datang di SteadyRise",
      loginTitle: "Masuk",
      registerTitle: "Buat Akun",
      name: "Nama Lengkap",
      email: "Email",
      password: "Kata Sandi",
      loginBtn: "Masuk",
      registerBtn: "Buat Akun",
      switchToRegister: "Belum punya akun? Daftar",
      switchToLogin: "Sudah punya akun? Masuk",
      guestBtn: "Lanjut sebagai Tamu",
    },
  },
};
