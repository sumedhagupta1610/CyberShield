# SUBMISSION_CHECKLIST.md — CyberShield

> Use this checklist before submitting your project. Tick each item after completing it.

---

## SECTION 1 — Source Code Deliverables

- [ ] `index.html` — Main application page exists and opens in browser
- [ ] `style.css` — Stylesheet loads correctly (dark-blue theme visible)
- [ ] `app.js` — Application logic loads without console errors
- [ ] `package.json` — Contains correct `name`, `version`, `scripts.test`, and `scripts.start`
- [ ] `gitignore.txt` — Exists; rename to `.gitignore` when initialising Git

---

## SECTION 2 — Documentation Deliverables

- [ ] `REQUIREMENTS.md` — Complete with all 9 sections (overview through constraints)
- [ ] `PROJECT_REPORT.md` — All 18 sections present
- [ ] `README.md` — Contains features, tech stack, folder structure, run commands, usage guide
- [ ] `SUBMISSION_CHECKLIST.md` — This file

---

## SECTION 3 — Test Deliverables

- [ ] `tests/tests.js` — Node.js test suite exists
- [ ] `tests/tests.html` — Browser test runner exists
- [ ] Tests pass: run `node tests/tests.js` from the `CyberShield` directory
- [ ] Paste actual test output into `PROJECT_REPORT.md` Section 12.4

---

## SECTION 4 — Personal Information (Complete Before Submission)

- [ ] `PROJECT_REPORT.md` — Title page: replace all `*(Replace with…)*` placeholders with your details
  - [ ] Student Name
  - [ ] Roll Number
  - [ ] College Name
  - [ ] Department
  - [ ] Project Guide name and designation
  - [ ] Academic Year
- [ ] `PROJECT_REPORT.md` — Certificate section: filled in
- [ ] `PROJECT_REPORT.md` — Declaration section: filled in and signed
- [ ] `PROJECT_REPORT.md` — Acknowledgement: personalised

---

## SECTION 5 — Run and Verify

- [ ] Application opens in **Chrome** without errors
- [ ] Application opens in **Firefox** without errors (optional but recommended)
- [ ] Password strength checker works — tested with "password" (score 1) and "Tr0ub4dor&3!xyz" (score 5)
- [ ] Toggle visibility button works (eye icon)
- [ ] Clear button resets the password field
- [ ] URL analyzer works — tested with `http://192.168.1.1/login` (HIGH RISK expected)
- [ ] URL analyzer works — tested with `https://wikipedia.org` (LOW RISK expected)
- [ ] URL analyzer clear button works
- [ ] All four awareness cards are visible and formatted correctly
- [ ] Navigation links scroll to the correct sections
- [ ] Application is responsive — tested at 390px width (Chrome DevTools)
- [ ] No console errors in browser DevTools (F12 → Console)

---

## SECTION 6 — Screenshots

Create a `screenshots/` folder and capture the following. See `PROJECT_REPORT.md` Section 13 for details.

- [ ] `01-dashboard-overview.png` — Full dashboard view
- [ ] `02-password-weak.png` — Weak password result
- [ ] `03-password-strong.png` — Strong password result
- [ ] `04-url-ip-address.png` — IP address URL result
- [ ] `05-url-phishing.png` — Brand-in-subdomain result
- [ ] `06-url-clean.png` — Clean URL result
- [ ] `07-awareness-section.png` — Awareness section
- [ ] `08-test-results.png` — Terminal with `node tests/tests.js` output
- [ ] `09-mobile-view.png` — Mobile responsive view
- [ ] Screenshot image links added to `PROJECT_REPORT.md` Section 13

---

## SECTION 7 — Report Completion

- [ ] Section 12.4 (Actual Test Results) filled with real terminal output
- [ ] Section 13 (Screenshot Placeholders) updated with actual image links
- [ ] All Mermaid diagrams render correctly (preview in VS Code or GitHub)
- [ ] All references in Section 18 verified as accessible

---

## SECTION 8 — GitHub Repository Publication

### Step 1: Initialise Git (run from `CyberShield` directory in PowerShell)

```powershell
cd "d:\Programming\CyberSecurity\CyberShield"
git init
Copy-Item gitignore.txt .gitignore
git add .
git status
```

> Verify the status shows only your project files (no `node_modules`).

### Step 2: First Commit

```powershell
git config --global user.email "your-email@example.com"   # replace with your email
git config --global user.name  "Your Name"                # replace with your name
git commit -m "Initial commit: CyberShield cybersecurity dashboard"
```

### Step 3: Create a GitHub Repository

1. Go to **https://github.com/new** in your browser.
2. Repository name: `CyberShield`
3. Description: `Cybersecurity Awareness Dashboard — college project`
4. Set to **Public** (required for submission verification).
5. Do **NOT** tick "Add a README file" (you already have one).
6. Click **Create repository**.
7. Copy the repository URL shown (e.g. `https://github.com/YOUR_USERNAME/CyberShield.git`).

### Step 4: Connect and Push

```powershell
git remote add origin https://github.com/YOUR_USERNAME/CyberShield.git
git branch -M main
git push -u origin main
```

> If prompted, sign in with your GitHub credentials (or use a Personal Access Token if password login is disabled).

### Step 5: Verify Publication

1. Open `https://github.com/YOUR_USERNAME/CyberShield` in your browser.
2. Confirm all files are present: `index.html`, `style.css`, `app.js`, `tests/`, documentation files.
3. GitHub will automatically render `README.md` on the repository homepage.
4. Check that the `.gitignore` file is present and `node_modules/` is not uploaded.

### Step 6: Enable GitHub Pages (Optional — for live demo)

1. Go to your repository → **Settings** → **Pages**.
2. Source: **Deploy from a branch** → Branch: `main` → Folder: `/ (root)`.
3. Click **Save**.
4. After ~2 minutes, your app will be live at: `https://YOUR_USERNAME.github.io/CyberShield/`

---

## SECTION 9 — GitHub Checklist

- [ ] Repository created at `https://github.com/YOUR_USERNAME/CyberShield`
- [ ] All source files pushed successfully (`git push` returned success)
- [ ] `.gitignore` is present in the repository root
- [ ] `node_modules/` is NOT uploaded to GitHub
- [ ] `README.md` renders correctly on the repository homepage
- [ ] Repository is set to **Public**
- [ ] (Optional) GitHub Pages enabled and live URL noted

**Live URL:** `https://YOUR_USERNAME.github.io/CyberShield/` *(fill in after publishing)*  
**Repository URL:** `https://github.com/YOUR_USERNAME/CyberShield` *(fill in after creating)*

---

## FINAL SUBMISSION SIGN-OFF

- [ ] All source files created and working
- [ ] All documentation files complete
- [ ] Personal placeholders replaced with real information
- [ ] Tests passing (attach screenshot of output)
- [ ] Screenshots captured and added to report
- [ ] Git repository initialised and pushed to GitHub
- [ ] Report printed / exported to PDF for physical submission
- [ ] Submitted before **26 October 2026**

---

*Good luck with your submission! 🛡️*
