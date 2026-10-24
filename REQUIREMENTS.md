# REQUIREMENTS.md — CyberShield

## 1. Project Overview
**Project Name:** CyberShield  
**Type:** College Final-Year / Mini Project (Cybersecurity Awareness Dashboard)  
**Submission Deadline:** 26 October 2026  

CyberShield is a browser-based cybersecurity dashboard that provides three core tools:
- A **Password Strength Checker** that analyses a password locally and gives improvement advice.
- A **Suspicious URL Analyzer** that inspects URL text for phishing heuristics without ever visiting the URL.
- A **Cybersecurity Awareness** section covering phishing, passwords, MFA, and safe browsing.

---

## 2. Problem Statement
Everyday internet users are frequently targeted by phishing attacks and account takeovers, often because they use weak passwords and cannot identify suspicious URLs. A lightweight, privacy-first, browser-based tool that educates users about these risks can meaningfully improve their security posture without requiring them to install software or share their sensitive data with a server.

---

## 3. Objectives
1. Build a fully functional cybersecurity awareness dashboard that runs in any modern web browser with no installation.
2. Implement a password strength checker that evaluates multiple criteria and provides actionable suggestions without ever transmitting the password.
3. Implement a URL analyzer that applies heuristic checks on the URL text to surface phishing indicators, without fetching or visiting the URL.
4. Present clear cybersecurity educational content on phishing, strong passwords, MFA, and safe browsing.
5. Ensure the application is accessible (WCAG 2.1 AA target), responsive, and beginner-friendly in code structure.
6. Deliver complete documentation, automated tests, and submission materials.

---

## 4. Functional Requirements

| ID   | Requirement |
|------|-------------|
| FR-01 | The system SHALL provide a password strength checker accessible from the main dashboard. |
| FR-02 | The password checker SHALL evaluate: minimum length (8+), good length (12+), uppercase, lowercase, digits, special characters, repeated characters, sequential patterns, and known common passwords. |
| FR-03 | The password checker SHALL display a visual strength meter (0–5 scale) updated on every keystroke. |
| FR-04 | The password checker SHALL provide specific textual suggestions for improving a weak password. |
| FR-05 | The password checker SHALL allow toggling password field visibility. |
| FR-06 | The password checker SHALL NEVER transmit, log, or store the entered password. |
| FR-07 | The system SHALL provide a URL analyzer accessible from the main dashboard. |
| FR-08 | The URL analyzer SHALL check for: plain HTTP, IP-address hosts, embedded credentials, suspicious hostname keywords, brand-in-subdomain phishing tricks, excessive subdomains, very long URLs, suspicious TLDs, Punycode hostnames, multiple scheme occurrences, and known URL shorteners. |
| FR-09 | The URL analyzer SHALL display a risk level (High / Medium / Low-Medium / Low) and a list of findings with severity indicators. |
| FR-10 | The URL analyzer SHALL display a prominent disclaimer that results are heuristic and cannot guarantee safety. |
| FR-11 | The URL analyzer SHALL NEVER fetch, visit, or open the submitted URL. |
| FR-12 | The system SHALL include a cybersecurity awareness section covering phishing, strong passwords, MFA, and safe browsing. |
| FR-13 | All forms SHALL include accessible labels and ARIA attributes. |
| FR-14 | The application SHALL display friendly error messages for invalid inputs. |
| FR-15 | The layout SHALL be responsive and usable on mobile, tablet, and desktop screen sizes. |

---

## 5. Non-Functional Requirements

| ID    | Requirement |
|-------|-------------|
| NFR-01 | **Privacy:** No user input (passwords, URLs) shall leave the browser under any circumstances. |
| NFR-02 | **Performance:** The application SHALL load in under 2 seconds on a standard broadband connection. |
| NFR-03 | **Usability:** The UI SHALL follow standard accessibility guidelines (labelled inputs, ARIA live regions, keyboard navigability, focus indicators). |
| NFR-04 | **Compatibility:** The application SHALL run on current versions of Chrome, Firefox, Edge, and Safari. |
| NFR-05 | **Security:** All DOM manipulation SHALL use safe APIs (`textContent`, `createElement`). User input SHALL never be injected as raw HTML. |
| NFR-06 | **Maintainability:** Code SHALL be structured in clearly commented sections, with logic separated from presentation. |
| NFR-07 | **Portability:** The application SHALL run with no build step — open `index.html` directly or serve with any static file server. |
| NFR-08 | **Disclaimer:** The application SHALL clearly communicate that heuristic URL analysis cannot guarantee safety or maliciousness. |

---

## 6. Hardware Requirements

| Component | Minimum Specification |
|-----------|----------------------|
| Processor | Any processor capable of running a modern web browser |
| RAM       | 512 MB (browser can operate) |
| Storage   | ~200 KB (project files) |
| Display   | Any screen supporting 320px+ viewport width |
| Network   | None required (fully offline-capable) |

---

## 7. Software Requirements

| Software | Version / Notes |
|----------|----------------|
| Web Browser | Chrome 90+, Firefox 88+, Edge 90+, Safari 14+ |
| Node.js *(optional)* | v16+ (required only for running automated tests and the `serve` script) |
| Text Editor / IDE | Any (VS Code recommended) |
| Git | Any recent version (for GitHub submission) |

---

## 8. Assumptions
1. The end user has access to a modern web browser.
2. JavaScript is enabled in the browser.
3. The application will be evaluated in an offline or online browser environment.
4. No real user passwords are entered during demonstration; example passwords should be used.
5. The URL analyzer is understood to be a heuristic tool and not a definitive security scanner.

---

## 9. Constraints
1. No server-side component — all logic runs in the browser.
2. No database is used; no user data is persisted.
3. No paid external APIs or services are used.
4. The application must be completable and explainable by a single student.
5. Heuristic URL analysis does not replace professional security tooling.
6. The password common-word list is limited to a representative sample for educational purposes.
