# CyberShield

> A professional, privacy-first cybersecurity awareness dashboard built with HTML, CSS, and vanilla JavaScript.  
> Everything runs **locally in your browser** — no server, no database, no external API calls.

---

## Features

| Feature | Description |
|---------|-------------|
| 🔑 Password Strength Checker | Real-time analysis with 9 criteria, animated meter, and specific improvement suggestions. Password is **never transmitted**. |
| 🔍 Suspicious URL Analyzer | 12+ heuristic checks for phishing indicators. URL is **never visited or fetched**. |
| 📚 Cybersecurity Awareness | Guides on phishing, strong passwords, MFA, and safe browsing. |
| ♿ Accessible | ARIA labels, live regions, keyboard navigation, visible focus styles. |
| 📱 Responsive | Works on mobile (320px+), tablet, and desktop. |

---

## Technology Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Structure | HTML5 (semantic) | Universally supported, no build step |
| Style | CSS3 + Custom Properties | Full control, no framework needed |
| Logic | Vanilla JavaScript (ES5 strict) | Runs in all modern browsers, easy to understand |
| Testing | Node.js (`require`) | No external test library needed |
| Serving | `npx serve` (optional) | Zero-install static server |

---

## Folder Structure

```
CyberShield/
├── index.html          ← Main application page
├── style.css           ← All styles (dark-blue theme, responsive)
├── app.js              ← All logic (password checker + URL analyzer)
├── package.json        ← npm scripts (test, start)
├── gitignore.txt       ← Rename to .gitignore when setting up git
├── tests/
│   ├── tests.js        ← Node.js automated test suite (55+ assertions)
│   └── tests.html      ← Browser-based test runner (no Node.js needed)
├── screenshots/        ← Create this folder and add your screenshots
├── REQUIREMENTS.md     ← Full requirements specification
├── PROJECT_REPORT.md   ← College-ready detailed report
├── README.md           ← This file
└── SUBMISSION_CHECKLIST.md  ← Submission verification checklist
```

---

## Installation

No installation is required for the main application.

### Option A — Open directly in browser (simplest)
```
Double-click CyberShield/index.html
  OR
Right-click → Open with → Your browser
```

### Option B — Serve with Node.js (recommended for testing)
```powershell
# From the CyberShield directory:
node --version        # Verify Node.js v16+ is installed
npm install           # No dependencies; creates package-lock.json
npx serve . --listen 3000
```
Then open: **http://localhost:3000**

---

## Exact Run Commands (Windows)

```powershell
# 1. Navigate to the project folder
cd "d:\Programming\CyberSecurity\CyberShield"

# 2. (Optional) Verify Node.js is available
node --version

# 3. Run the application
#    Option A: Open directly
Start-Process index.html

#    Option B: Static server
npx serve . --listen 3000
# Then open http://localhost:3000 in your browser

# 4. Run automated tests
node tests/tests.js
```

---

## Testing Commands

```powershell
# Run automated Node.js tests
node tests/tests.js

# Expected output:
# ════════════════════════════════════════════════════════════
#   TEST RESULTS:  55 passed,  0 failed  (total: 55)
# ════════════════════════════════════════════════════════════
# All tests PASSED. ✅
```

**Browser tests:**  
Open `tests/tests.html` in your browser. All tests run client-side. Results are displayed with ✅/❌ icons.

---

## Usage Guide

### Password Strength Checker
1. Click the **Password Checker** section or navigate using the top nav.
2. Type or paste a password into the input field. Analysis runs instantly on every keystroke.
3. Read the strength meter, label, and criteria checklist.
4. Follow the suggestions to improve your password.
5. Click 👁️ to toggle password visibility.
6. Click **Clear** to reset.

> ⚠️ **Never enter a real password you actually use into any online or browser tool — this is for testing example passwords only.**

### Suspicious URL Analyzer
1. Click the **URL Analyzer** section.
2. Paste a URL into the input field.
3. Click **Analyze URL** (or press Enter).
4. Read the risk level badge and detailed findings.
5. Note the disclaimer — results are heuristic only.

> ⚠️ The tool **never visits or fetches** the URL. Analysis is text-only.

### Cybersecurity Awareness
Scroll to the **Awareness** section or use the nav link. Four topic cards cover phishing, strong passwords, MFA, and safe browsing.

---

## Limitations

- URL analysis is **heuristic only** — cannot guarantee a URL is safe or malicious.
- Password common-word list is a representative sample (~20 entries) for educational purposes.
- No breach-database integration (HaveIBeenPwned) in this version.
- Client-side only — no server-side analysis (no WHOIS, no dynamic sandbox).

---

## Screenshot Instructions

1. Create a `screenshots/` folder inside `CyberShield/`.
2. Open the app in your browser.
3. Capture screenshots using **Win + Shift + S** (Windows Snipping Tool).
4. See `PROJECT_REPORT.md` Section 13 for a full list of recommended screenshots.

Required screenshots:
- Dashboard overview
- Weak password result
- Strong password result
- URL with IP address
- Phishing URL (brand-in-subdomain)
- Clean URL
- Awareness section
- Test results in terminal
- Mobile view (DevTools responsive mode)

---

## GitHub Publication Steps

See `SUBMISSION_CHECKLIST.md` for complete step-by-step GitHub commands.

Quick reference:
```powershell
# In CyberShield directory:
git init
Copy-Item gitignore.txt .gitignore    # rename gitignore.txt to .gitignore
git add .
git commit -m "Initial commit: CyberShield cybersecurity dashboard"
# Then create a repo on GitHub and:
git remote add origin https://github.com/YOUR_USERNAME/CyberShield.git
git branch -M main
git push -u origin main
```

---

## License

MIT — free to use, modify, and submit as a college project with attribution.

---

*CyberShield — Built for education. Privacy by design.*
