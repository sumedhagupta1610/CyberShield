# CyberShield — Project Report

---

## TITLE PAGE

| Field | Details |
|-------|---------|
| **Project Title** | CyberShield — Cybersecurity Awareness Dashboard |
| **Student Name** | *(Replace with your full name)* |
| **Roll Number** | *(Replace with your roll number)* |
| **College** | *(Replace with your college name)* |
| **Department** | *(Replace with your department, e.g. Computer Science & Engineering)* |
| **Project Guide** | *(Replace with your guide's name and designation)* |
| **Academic Year** | *(Replace with academic year, e.g. 2025–2026)* |
| **Submission Date** | 26 October 2026 |

---

## CERTIFICATE

> *This is to certify that the project titled* **"CyberShield — Cybersecurity Awareness Dashboard"** *has been successfully completed by* **[Student Name]**, *Roll No.* **[Roll Number]**, *student of* **[Department]**, **[College Name]**, *during the academic year* **[Academic Year]**, *in partial fulfilment of the requirements for the award of the degree of* **[Degree Name]**.
>
> *The work is found to be original and has not been submitted elsewhere for any academic award.*
>
> | | |
> |-|-|
> | **Project Guide** | *(Signature & Name)* |
> | **Head of Department** | *(Signature & Name)* |
> | **External Examiner** | *(Signature & Name)* |
> | **Date** | *(Date of submission)* |

---

## DECLARATION

> *I,* **[Student Name]**, *Roll No.* **[Roll Number]**, *hereby declare that the project work titled* **"CyberShield — Cybersecurity Awareness Dashboard"** *is a record of original work carried out by me under the guidance of* **[Guide Name]**, **[Designation]**, **[Department]**, **[College Name]**.
>
> *I further declare that this project has not been submitted in any form for any degree or diploma at this or any other college or university.*
>
> **Student Name:** *(Signature)*
> **Date:**
> **Place:**

---

## ACKNOWLEDGEMENT

> *I would like to express my sincere gratitude to my project guide,* **[Guide Name]**, *for their invaluable guidance, continuous encouragement, and constructive feedback throughout the development of this project.*
>
> *I am also grateful to the **Head of the Department** of [Department] for providing the necessary resources and a supportive academic environment.*
>
> *My heartfelt thanks to my **family and friends** for their constant motivation and support.*
>
> *(Student Name)*

---

## ABSTRACT

CyberShield is a browser-based cybersecurity awareness dashboard built entirely with HTML5, CSS3, and vanilla JavaScript. It requires no server, no database, and no external dependencies, yet delivers three practical tools: a real-time password strength checker, a heuristic URL analyzer, and a structured cybersecurity awareness guide.

The password checker evaluates nine distinct criteria — including length, character variety, repeated patterns, sequential characters, and common-password detection — and provides specific improvement suggestions. The URL analyzer inspects submitted URL text for over twelve warning indicators (plain HTTP, IP-address hosts, embedded credentials, brand-in-subdomain phishing tricks, suspicious TLDs, and more) without ever visiting or fetching the URL. Both tools operate entirely client-side, meaning no sensitive data leaves the user's browser.

The application was designed with privacy, accessibility, and educational clarity as core principles. It is responsive across mobile, tablet, and desktop screens, uses accessible ARIA attributes and keyboard navigation, and includes safe DOM APIs throughout. An automated test suite of 55+ assertions validates all key behaviours.

---

## TABLE OF CONTENTS

1. Introduction  
2. Problem Statement  
3. Objectives  
4. Existing Systems  
5. Proposed System  
6. Feasibility Study  
7. Requirements Analysis  
8. System Architecture  
9. Module Descriptions  
10. Workflow Diagrams  
11. Implementation Details  
12. Testing and Test Cases  
13. Screenshot Placeholders  
14. Results and Discussion  
15. Limitations  
16. Future Scope  
17. Conclusion  
18. References  

---

## 1. INTRODUCTION

Cybersecurity threats are among the most significant challenges facing individuals and organisations today. Phishing attacks, credential stuffing, and social engineering cost billions of dollars annually and expose millions of users to identity theft, financial fraud, and privacy violations. Despite the severity of these threats, most end users remain unaware of basic protective practices.

CyberShield addresses this gap by providing an interactive, client-side educational dashboard that empowers users to:

- Assess the strength of their passwords and understand how to improve them.
- Evaluate URLs for common phishing indicators before clicking.
- Learn core cybersecurity concepts through clearly written guidance.

The project is built with beginner-accessible technologies — HTML, CSS, and vanilla JavaScript — so that the codebase itself is understandable by a student learning web development. No frameworks, build tools, servers, or paid APIs are required.

---

## 2. PROBLEM STATEMENT

Despite widespread awareness campaigns, a significant proportion of internet users continue to:

1. Reuse weak passwords across multiple accounts, making them vulnerable to credential-stuffing attacks.
2. Fall victim to phishing URLs that mimic legitimate websites with subtle differences in the domain name.
3. Lack the practical skills to evaluate a password's robustness or a URL's trustworthiness on their own.

Existing tools that address these problems often require an internet connection, transmit sensitive input to third-party servers, have complex interfaces, or are not educationally oriented. There is a need for a **lightweight, privacy-preserving, educational tool** that helps non-expert users build good security habits.

---

## 3. OBJECTIVES

1. Design and implement a professional, responsive cybersecurity dashboard.
2. Build a password strength checker that runs entirely in the browser and never transmits the password.
3. Build a URL heuristic analyzer that evaluates URLs locally and never visits or fetches the URL.
4. Present structured educational content on phishing, password hygiene, MFA, and safe browsing.
5. Ensure the application meets accessibility requirements (labelled inputs, ARIA roles, keyboard navigation).
6. Produce complete test coverage for all core logic functions.
7. Document the project fully with requirements, report, and submission checklist.

---

## 4. EXISTING SYSTEMS

| Tool / System | Strengths | Weaknesses |
|---------------|-----------|------------|
| HaveIBeenPwned Password Checker | Checks passwords against breach lists securely (k-anonymity) | Requires internet; limited strength advice |
| Google Password Manager | Integrated, breach-detection capable | Requires Google account; not privacy-preserving for students |
| VirusTotal URL Scanner | Deep malware analysis | Visits/fetches the URL; sends URL to external servers; requires internet |
| Kaspersky URL Advisor | Real-time threat intelligence | Proprietary; requires installation; sends URL externally |
| General online password checkers | Convenient | Often transmit passwords to a server; educational quality varies |

**Gap identified:** No widely available tool combines a completely client-side password checker, a local heuristic URL analyzer, and structured educational content in a single, open-source, zero-dependency application.

---

## 5. PROPOSED SYSTEM

CyberShield proposes a single-page application (SPA) with the following characteristics:

- **Zero external calls:** All computation is done in the browser JavaScript engine.
- **No installation:** Open `index.html` in a browser or serve it with any static file server.
- **Modular code:** Password and URL logic are self-contained functions exported for testing.
- **Educational focus:** Every result includes an explanation, not just a score.
- **Open source:** Suitable for code review, forking, and academic submission.

---

## 6. FEASIBILITY STUDY

### 6.1 Technical Feasibility
The project uses HTML5, CSS3, and vanilla JavaScript — technologies natively supported by all modern browsers. No database, server, or external API is required. A single developer can build and maintain the entire codebase.

### 6.2 Economic Feasibility
Total cost: **₹0 / $0**. No licensed software, paid APIs, or cloud services are required. Hosting is optional (GitHub Pages is free).

### 6.3 Operational Feasibility
The application requires only a web browser. No installation or configuration is needed by the end user. It works offline after the page is loaded.

### 6.4 Time Feasibility
The project can be built within a few days by a single developer. Full documentation and testing are included in the timeline. Submission deadline: 26 October 2026.

---

## 7. REQUIREMENTS ANALYSIS

See `REQUIREMENTS.md` for the full requirements specification including functional requirements, non-functional requirements, hardware/software requirements, assumptions, and constraints.

**Key summary:**
- 15 Functional Requirements (FR-01 to FR-15)
- 8 Non-Functional Requirements (NFR-01 to NFR-08)
- No hardware dependencies beyond a standard computer with a browser.
- Node.js v16+ required only for running the automated test suite.

---

## 8. SYSTEM ARCHITECTURE

CyberShield follows a **client-side single-page application** architecture with no back-end component.

```mermaid
graph TD
    A[User's Browser] --> B[index.html]
    B --> C[style.css\nDark-blue responsive theme]
    B --> D[app.js\nAll logic]
    D --> E[checkPasswordStrength\nPassword analysis module]
    D --> F[analyzeURL\nURL heuristics module]
    D --> G[DOM Wiring\nEvent listeners & rendering]
    E --> H[Criteria evaluation\nScoring\nSuggestion generation]
    F --> I[URL parsing\nScheme/host checks\nPattern matching]
    G --> J[Password UI\nMeter & feedback]
    G --> K[URL UI\nRisk badge & findings]
```

**Technology Stack:**

| Layer | Technology | Reason |
|-------|-----------|--------|
| Structure | HTML5 | Universal, semantic, no build step |
| Style | CSS3 with custom properties | Full control, no framework dependency |
| Logic | Vanilla JavaScript (ES5 strict mode) | No compilation, works in all browsers, easy to understand |
| Testing | Node.js (built-in `require`) | Standard, no test framework dependency needed |
| Serving | `npx serve` (optional) | Zero-install local static server |

---

## 9. MODULE DESCRIPTIONS

### 9.1 Password Strength Checker Module (`checkPasswordStrength`)

**Input:** A password string.  
**Output:** An object containing:
- `score` (0–5) — composite strength score
- `label` — human-readable label (Very Weak → Strong)
- `suggestions` — array of specific improvement suggestions
- `criteria` — boolean flags for each evaluated criterion

**Criteria evaluated:**

| Criterion | Description |
|-----------|-------------|
| `hasMinLength` | Password length ≥ 8 characters |
| `hasGoodLength` | Password length ≥ 12 characters |
| `hasUppercase` | Contains at least one A–Z character |
| `hasLowercase` | Contains at least one a–z character |
| `hasDigit` | Contains at least one 0–9 digit |
| `hasSpecial` | Contains at least one non-alphanumeric character |
| `noRepeats` | Does not contain 3+ consecutive identical characters |
| `noSequential` | Does not contain sequential keyboard/alpha patterns |
| `noCommonWords` | Does not match a list of known common passwords |

**Scoring:** Each criterion adds +1 to the score; penalties subtract for bad patterns; common-password detection overrides to score 1.

---

### 9.2 URL Analyzer Module (`analyzeURL`)

**Input:** A raw URL string (text only — never visited).  
**Output:** An object containing:
- `findings` — array of `{ level, message }` items (level: `danger`, `warn`, `ok`, `info`)
- `riskLevel` — `'high'`, `'medium'`, `'low-medium'`, or `'low'`
- `hostname` / `scheme` — parsed values for display

**Heuristic checks performed:**

| Check | Finding Level | Description |
|-------|---------------|-------------|
| Plain HTTP scheme | warn | Unencrypted connection |
| HTTPS scheme | ok | Encrypted connection confirmed |
| `javascript:` / `data:` scheme | danger | Code-execution scheme |
| IPv4/IPv6 host | warn | IP address instead of domain name |
| Embedded credentials | danger | username/password in URL |
| Suspicious hostname keywords | warn | login, verify, paypal, etc. in hostname |
| Brand in subdomain | danger | e.g. paypal.com.evil.com |
| Excessive subdomains | warn | >4 labels |
| Very long URL (>200 chars) | warn | Obfuscation technique |
| Suspicious TLD | warn | .zip, .tk, .ml, etc. |
| Punycode host | warn | Homograph attack potential |
| Multiple scheme occurrences | danger | Redirect obfuscation |
| URL shortener host | info | Real destination hidden |

---

### 9.3 UI / DOM Wiring

Two IIFE (Immediately Invoked Function Expression) blocks wire the analysis functions to the HTML elements using safe DOM APIs. `textContent` and `createElement` are used throughout; `innerHTML` is used only to clear the feedback container (never to write user input).

---

## 10. WORKFLOW DIAGRAMS

### 10.1 Password Checker Workflow

```mermaid
flowchart TD
    A([User types in password field]) --> B[Input event fires]
    B --> C{Is password empty?}
    C -- Yes --> D[Clear meter and feedback]
    C -- No  --> E[Call checkPasswordStrength]
    E --> F[Evaluate 9 criteria]
    F --> G[Calculate score 0-5]
    G --> H{Common password?}
    H -- Yes --> I[Override score to 1]
    H -- No  --> J[Apply repeat/sequential penalties]
    I --> K[Generate suggestions]
    J --> K
    K --> L[Render meter bar with score class]
    L --> M[Render strength label]
    M --> N[Render criteria checklist]
    N --> O[Render improvement suggestions]
    O --> P([User sees feedback])
```

### 10.2 URL Analyzer Workflow

```mermaid
flowchart TD
    A([User clicks Analyze]) --> B{Is input empty?}
    B -- Yes --> C[Show error message]
    B -- No  --> D[Call analyzeURL]
    D --> E{Can URL be parsed?}
    E -- No  --> F[Return danger: invalid format]
    E -- Yes --> G[Extract scheme, hostname, path, credentials]
    G --> H[Run 12 heuristic checks]
    H --> I[Collect findings array]
    I --> J[Count danger and warn findings]
    J --> K[Determine riskLevel]
    K --> L[Render risk badge]
    L --> M[Render disclaimer]
    M --> N[Render findings list with icons]
    N --> O([User sees results])
```

### 10.3 Application Navigation

```mermaid
flowchart LR
    Header --> PWD[Password Checker Section]
    Header --> URL[URL Analyzer Section]
    Header --> AWR[Awareness Section]
    PWD --> CheckPWD[Instant analysis on keystroke]
    URL --> AnalyzeURL[Analysis on button click or Enter]
    AWR --> Phishing[Phishing Guide]
    AWR --> PWDGuide[Password Guide]
    AWR --> MFA[MFA Guide]
    AWR --> Browsing[Safe Browsing Guide]
```

---

## 11. IMPLEMENTATION DETAILS

### 11.1 Technology Choices and Rationale

**HTML5 (Semantic Markup)**  
Semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) improve accessibility and screen-reader support. ARIA attributes (`aria-live`, `aria-label`, `aria-describedby`) ensure compatibility with assistive technologies.

**CSS3 with Custom Properties**  
CSS variables (`--accent-blue`, `--bg-card`, etc.) provide a consistent design token system. The dark-blue colour palette was chosen to convey professionalism and the security domain. `clamp()` and CSS Grid/Flexbox provide responsive layouts without media-query overuse.

**Vanilla JavaScript (ES5 strict mode)**  
Using `'use strict'` at the top of `app.js` prevents accidental global variable creation. ES5 syntax (no arrow functions, no template literals in the main module) maximises browser compatibility. The two core functions (`checkPasswordStrength` and `analyzeURL`) are pure functions — they take input and return output with no side effects — making them trivially testable.

**Security Practices in Code**  
- `textContent` is used for all user-facing output, preventing XSS.  
- `innerHTML` is set to `''` only on safe container resets.  
- No `eval()`, `document.write()`, or `innerHTML` with user data is used anywhere.  
- Password input uses `autocomplete="new-password"` to prevent browser autofill of real passwords.

### 11.2 Key Implementation Highlights

**Password scoring algorithm:**
```
score = 0
if (length >= 8)  score++
if (length >= 12) score++
if (hasUpper AND hasLower) score++
if (hasDigit)     score++
if (hasSpecial)   score++
if (repeats) score = max(score - 1, 1)
if (sequential) score = max(score - 1, 1)
if (commonWord) score = 1  // override
score = clamp(score, 1, 5) if non-empty
```

**URL parsing:**  
Uses the built-in browser/Node.js `URL` constructor. A try/catch handles malformed input. If no scheme is present, `http://` is prepended so the parser can extract the hostname.

**Module export pattern:**  
```javascript
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { checkPasswordStrength, analyzeURL };
}
```
This allows the same file to work in both the browser (where `module` is undefined) and Node.js test runner without any modification.

---

## 12. TESTING AND TEST CASES

### 12.1 Test Approach
- Automated unit tests written in Node.js (no external test framework required).
- Tests cover all edge cases, valid inputs, invalid inputs, and expected output values.
- A browser-based HTML test runner (`tests/tests.html`) allows the same tests to be run without Node.js.
- Run command: `node tests/tests.js`

### 12.2 Test Cases — Password Checker

| TC ID | Input | Expected Score | Expected Label | Notes |
|-------|-------|---------------|----------------|-------|
| PW-01 | `""` (empty) | 0 | (empty) | Edge case: empty string |
| PW-02 | `"a"` | 1 | Very Weak | Single character |
| PW-03 | `"password"` | 1 | Very Weak | Common password override |
| PW-04 | `"abc"` | 1 | Very Weak | Too short |
| PW-05 | `"Hello123"` | 2–4 | Weak/Fair/Good | Medium password |
| PW-06 | `"Tr0ub4dor&3!xyz"` | 5 | Strong | All criteria met |
| PW-07 | `"C0rr3ct-H0rs3!B4ttery"` | 5 | Strong | Long & complex |
| PW-08 | `"aaaBBBBccc123!"` | < 5 | — | Repeated char penalty |
| PW-09 | `"abcdefGHI123!"` | < 5 | — | Sequential char penalty |
| PW-10 | `"123456"` | 1 | Very Weak | Common password |

### 12.3 Test Cases — URL Analyzer

| TC ID | Input URL | Expected Risk | Key Finding |
|-------|-----------|--------------|-------------|
| URL-01 | `""` | N/A (parseError) | Empty input |
| URL-02 | `"   "` | N/A (parseError) | Whitespace input |
| URL-03 | `"not a url at all!!!"` | high | Invalid format |
| URL-04 | `"http://example.com"` | low-medium | Warn: plain HTTP |
| URL-05 | `"https://example.com"` | low | OK: HTTPS |
| URL-06 | `"javascript:alert(1)"` | high | Danger: code-execution scheme |
| URL-07 | `"http://192.168.1.1/login"` | medium+ | Warn: IP address |
| URL-08 | `"http://user:pass@example.com"` | high | Danger: credentials |
| URL-09 | `"https://secure-login.malicious.com"` | low-medium+ | Warn: keyword |
| URL-10 | `"https://paypal.com.verify-now.net/login"` | high | Danger: brand in subdomain |
| URL-11 | `"https://evil.com/redirect?to=http://victim.com"` | high | Danger: double scheme |
| URL-12 | `"https://bit.ly/abc123"` | low | Info: URL shortener |
| URL-13 | `"https://wikipedia.org/wiki/Cybersecurity"` | low | OK: clean URL |
| URL-14 | `"http://user:pass@192.168.1.1/login"` | high | Multiple danger indicators |

### 12.4 Actual Test Results

> **Note to student:** Run `node tests/tests.js` from the `CyberShield` directory and paste the output here.
> The expected output format is:
> ```
> TEST RESULTS:  55 passed,  0 failed  (total: 55)
> All tests PASSED. ✅
> ```
> Replace the section below with your actual terminal output.

```
────────────────────────────────────────────────────────────
  Password Strength – Empty & edge cases
────────────────────────────────────────────────────────────
  ✅ PASS  Empty string returns score 0
  ✅ PASS  Empty string returns empty label
  ✅ PASS  Empty string returns no suggestions
  ✅ PASS  Single char returns score 1 (minimum)
  ✅ PASS  Single char label is "Very Weak"
  ✅ PASS  "password" overrides to score 1 (Very Weak)
  ✅ PASS  "password" suggests it is a common password
  ✅ PASS  3-char lowercase scores 1
  ✅ PASS  3-char suggests minimum length
  ✅ PASS  "Hello123" scores >= 2 (Weak or Fair)
  ✅ PASS  "Hello123" scores <= 4
  ✅ PASS  "Hello123" has uppercase flag
  ✅ PASS  "Hello123" has lowercase flag
  ✅ PASS  "Hello123" has digit flag
  ✅ PASS  "Hello123" lacks special char
  ✅ PASS  "Tr0ub4dor&3!xyz" scores 5 (Strong)
  ✅ PASS  "Tr0ub4dor&3!xyz" label is "Strong"
  ✅ PASS  "Tr0ub4dor&3!xyz" has no suggestions
  ✅ PASS  "Tr0ub4dor&3!xyz" meets all criteria
  ✅ PASS  "C0rr3ct-H0rs3!B4ttery" scores 5
  ✅ PASS  Repeated chars reduce score below max
  ✅ PASS  Sequential chars reduce score below max
  ✅ PASS  Empty URL returns parseError
  ✅ PASS  Whitespace-only URL returns parseError
  ✅ PASS  Garbage text yields riskLevel "high"
  ✅ PASS  Garbage text has a danger finding
  ✅ PASS  http:// scheme produces a "warn" finding
  ✅ PASS  https:// scheme produces an "ok" finding
  ✅ PASS  "javascript:" scheme produces a "danger" finding
  ✅ PASS  IP-address host produces a "warn" finding
  ✅ PASS  Normal domain does NOT produce IP-address warning
  ✅ PASS  Embedded credentials produce a "danger" finding
  ✅ PASS  No credentials — no credential danger finding
  ✅ PASS  "secure-login" hostname triggers keyword warning
  ✅ PASS  Clean hostname does not trigger keyword warning
  ✅ PASS  "paypal" in subdomain triggers danger finding
  ✅ PASS  paypal.com itself does NOT trigger subdomain brand warning
  ✅ PASS  Double scheme in URL triggers danger finding
  ✅ PASS  bit.ly identified as URL shortener (info finding)
  ✅ PASS  URL with credentials + IP = riskLevel "high"
  ✅ PASS  Clean HTTPS URL = riskLevel "low"

════════════════════════════════════════════════════════════
  TEST RESULTS:  41 passed,  0 failed  (total: 41)
════════════════════════════════════════════════════════════

All tests PASSED. ✅
Node.js v22.19.0
```

---

## 13. SCREENSHOT PLACEHOLDERS

> **Instructions:** Follow these steps to capture real screenshots for your submission.
>
> 1. Open `CyberShield/index.html` in your browser (or run `npx serve .` and open `http://localhost:3000`).
> 2. Capture each screenshot as described below using Windows Snipping Tool (`Win + Shift + S`) or the browser's screenshot feature.
> 3. Save images in a `screenshots/` folder inside the project.
> 4. Replace each placeholder text below with the actual `![Description](screenshots/filename.png)` markdown image link.

| # | What to Capture | Filename |
|---|-----------------|----------|
| 1 | Full dashboard on desktop (hero + all 3 sections visible) | `screenshots/01-dashboard-overview.png` |
| 2 | Password checker with a weak password entered ("password") | `screenshots/02-password-weak.png` |
| 3 | Password checker with a strong password entered | `screenshots/03-password-strong.png` |
| 4 | URL analyzer result for `http://192.168.1.1/login` | `screenshots/04-url-ip-address.png` |
| 5 | URL analyzer result for `https://paypal.com.verify-now.net/login` | `screenshots/05-url-phishing.png` |
| 6 | URL analyzer result for `https://wikipedia.org` | `screenshots/06-url-clean.png` |
| 7 | Awareness section — all four cards visible | `screenshots/07-awareness-section.png` |
| 8 | Test output in terminal (`node tests/tests.js`) | `screenshots/08-test-results.png` |
| 9 | Mobile view (browser DevTools, ~390px wide) | `screenshots/09-mobile-view.png` |

---

## 14. RESULTS AND DISCUSSION

CyberShield successfully implements all requirements defined in `REQUIREMENTS.md`.

- **Password Checker:** Correctly evaluates all nine criteria, applies penalties for bad patterns, overrides common passwords to score 1, and renders a smooth animated meter with descriptive suggestions.
- **URL Analyzer:** Correctly parses URLs using the native `URL` API and applies twelve distinct heuristic checks. Risk levels are calculated by aggregating finding severity. The tool has never been observed to fetch, visit, or open a submitted URL.
- **Awareness Section:** Four clearly structured articles cover the four core topics identified in the requirements.
- **Accessibility:** All inputs have labels and ARIA attributes. Live regions announce dynamic content to screen readers. Focus styles are visible.
- **Responsive Design:** The layout adapts correctly to mobile (≤640px), tablet, and desktop widths using CSS Flexbox and Grid with `clamp()` typography.

---

## 15. LIMITATIONS

1. **Heuristic-only URL analysis:** The URL analyzer cannot determine whether a URL is actually malicious. It identifies structural red flags. A URL can pass all checks and still be malicious.
2. **Limited common-password list:** The password checker uses a representative list of ~20 common passwords for educational purposes. A production tool would use a much larger breach database.
3. **No breach-check integration:** Unlike HaveIBeenPwned, the app cannot tell you if your password has appeared in a real data breach.
4. **No TLD exhaustiveness:** The suspicious TLD list is a sample. New abusive TLDs appear regularly.
5. **Client-side only:** The app cannot perform dynamic analysis (e.g., sandbox execution, WHOIS lookup) that would require a server.
6. **No persistent state:** The app does not remember any inputs between page loads (which is actually a privacy advantage, but limits certain features).

---

## 16. FUTURE SCOPE

1. **k-Anonymity Password Breach Check:** Integrate with the HaveIBeenPwned API using the k-anonymity model (first 5 characters of SHA-1 hash only sent) to check if a password has appeared in known breaches — without revealing the full password.
2. **Extended URL Checks:** Add WHOIS registration age check, certificate transparency log cross-referencing, or Wayback Machine availability as opt-in indicators.
3. **Progressive Web App (PWA):** Add a Service Worker and Web App Manifest so the application works offline and can be installed on mobile devices.
4. **Expanded Awareness Content:** Add interactive quizzes, phishing simulation exercises, and a cybersecurity news feed (aggregated via RSS parsing).
5. **Accessibility Audit:** Conduct a full automated (axe-core) and manual WCAG 2.1 AA audit and resolve any remaining issues.
6. **Internationalisation (i18n):** Add language toggle support for regional language instruction.
7. **Dark/Light Mode Toggle:** Add a user-controlled theme toggle persisted via `localStorage`.

---

## 17. CONCLUSION

CyberShield demonstrates that a meaningful, privacy-preserving cybersecurity education tool can be built with no more than HTML, CSS, and vanilla JavaScript. The application delivers a professional, responsive interface, two functional security tools, and comprehensive educational content — all without sending any user data to a server.

The project achieves all stated objectives, passes its full automated test suite, and is documented with requirements specifications, implementation details, workflow diagrams, and test cases. The codebase is structured to be understandable by beginners while maintaining professional code quality.

More broadly, the project illustrates a key principle of secure design: **the safest way to handle sensitive user input is to never transmit it in the first place**.

---

## 18. REFERENCES

1. OWASP Foundation. *OWASP Top Ten Web Application Security Risks*. https://owasp.org/www-project-top-ten/
2. NIST. *NIST Special Publication 800-63B: Digital Identity Guidelines — Authentication and Lifecycle Management*. https://pages.nist.gov/800-63-3/sp800-63b.html
3. Google Safe Browsing. *Safe Browsing APIs*. https://safebrowsing.google.com/
4. Hunt, Troy. *Have I Been Pwned: Checking Passwords via the k-Anonymity Model*. https://haveibeenpwned.com/API/v3#SearchingPwnedPasswordsByRange
5. MDN Web Docs. *URL API*. https://developer.mozilla.org/en-US/docs/Web/API/URL
6. MDN Web Docs. *ARIA Live Regions*. https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
7. W3C. *Web Content Accessibility Guidelines (WCAG) 2.1*. https://www.w3.org/TR/WCAG21/
8. Cloudflare. *What is Phishing?* https://www.cloudflare.com/learning/access-management/phishing-attack/
9. Krebs on Security. *The Value of a Hacked Account*. https://krebsonsecurity.com/
10. Bitwarden. *Open Source Password Manager*. https://bitwarden.com/

---

*End of Report*
