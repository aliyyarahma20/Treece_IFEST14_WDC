src/
├── main.jsx                    # Entry point
├── App.jsx                     # Root app, routing, state
│
├── context/
│   ├── ThemeContext.jsx         # Dark/light mode
│   └── ToastContext.jsx         # Global toast notifications
│
├── hooks/
│   └── useLocalStorage.js       # Persistent state hook
│
├── utils/
│   └── helpers.js               # Format, date utils
│
├── components/                  # Reusable UI
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Card.jsx
│   │   ├── Badge.jsx
│   │   ├── Modal.jsx
│   │   ├── ProgressBar.jsx
│   │   └── Divider.jsx
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   └── Topbar.jsx
│   ├── GlobalStyle.jsx
│   └── ThemeToggle.jsx
│
└── pages/
    ├── Landing.jsx
    ├── Dashboard.jsx
    ├── TodoPage.jsx
    ├── TargetPage.jsx
    ├── ReminderPage.jsx
    ├── RecapPage.jsx
    ├── NotesPage.jsx
    ├── PomodoroPage.jsx
    └── HabitPage.jsx
