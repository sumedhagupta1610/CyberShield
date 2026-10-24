/**
 * CyberShield – Application Logic
 * ================================
 * Features:
 *   1. Password Strength Checker  (runs 100% in the browser – no data sent anywhere)
 *   2. Suspicious URL Analyzer    (text-only heuristics – URL is never visited/fetched)
 *
 * Security note:
 *   - All DOM writes use textContent / createElement, never innerHTML with user data.
 *   - No external network calls are made at any point.
 *
 * Author  : CyberShield Project
 * Version : 1.0.0
 */

'use strict';

/* ===========================================================
   SECTION 1 – PASSWORD STRENGTH CHECKER
   =========================================================== */

/**
 * Evaluate the strength of a password and return a result object.
 *
 * Scoring (0–5):
 *   +1  Length >= 8
 *   +1  Length >= 12
 *   +1  Contains uppercase AND lowercase letters
 *   +1  Contains digits
 *   +1  Contains special characters
 *
 * Penalties applied for common patterns that reduce the score.
 *
 * @param {string} password - The password string to evaluate.
 * @returns {{ score: number, label: string, suggestions: string[], criteria: object }}
 */
function checkPasswordStrength(password) {
  // Guard: empty input
  if (!password || password.length === 0) {
    return { score: 0, label: '', suggestions: [], criteria: {} };
  }

  const criteria = {
    hasMinLength:    password.length >= 8,
    hasGoodLength:   password.length >= 12,
    hasUppercase:    /[A-Z]/.test(password),
    hasLowercase:    /[a-z]/.test(password),
    hasDigit:        /[0-9]/.test(password),
    hasSpecial:      /[^A-Za-z0-9]/.test(password),
    noRepeats:       !/(.)\1{2,}/.test(password),           // e.g. "aaa"
    noSequential:    !/(?:abcd|bcde|cdef|defg|efgh|fghi|ghij|hijk|ijkl|jklm|klmn|lmno|mnop|nopq|opqr|pqrs|qrst|rstu|stuv|tuvw|uvwx|vwxy|wxyz|0123|1234|2345|3456|4567|5678|6789)/i.test(password),
    noCommonWords:   !/^(password|passw0rd|123456|qwerty|letmein|welcome|admin|login|iloveyou|monkey|dragon|master|hello|shadow|sunshine|princess|abc123|football|baseball|soccer)$/i.test(password),
  };

  // Base score
  let score = 0;
  if (criteria.hasMinLength)  score += 1;
  if (criteria.hasGoodLength) score += 1;
  if (criteria.hasUppercase && criteria.hasLowercase) score += 1;
  if (criteria.hasDigit)      score += 1;
  if (criteria.hasSpecial)    score += 1;

  // Penalties
  if (!criteria.noRepeats)     score = Math.max(score - 1, 1);
  if (!criteria.noSequential)  score = Math.max(score - 1, 1);
  if (!criteria.noCommonWords) score = 1;  // override to very weak

  // Clamp score to [0,5]
  score = Math.min(Math.max(score, password.length > 0 ? 1 : 0), 5);

  // Human-readable label
  const labels = ['', 'Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const label  = labels[score] || '';

  // Improvement suggestions
  const suggestions = [];
  if (!criteria.hasMinLength)   suggestions.push('Use at least 8 characters.');
  if (!criteria.hasGoodLength)  suggestions.push('Aim for 12 or more characters for better security.');
  if (!criteria.hasUppercase)   suggestions.push('Add uppercase letters (A–Z).');
  if (!criteria.hasLowercase)   suggestions.push('Add lowercase letters (a–z).');
  if (!criteria.hasDigit)       suggestions.push('Include at least one number (0–9).');
  if (!criteria.hasSpecial)     suggestions.push('Add special characters such as !@#$%^&*.');
  if (!criteria.noRepeats)      suggestions.push('Avoid repeating the same character three or more times.');
  if (!criteria.noSequential)   suggestions.push('Avoid sequential patterns like "abc" or "123".');
  if (!criteria.noCommonWords)  suggestions.push('Avoid common passwords — this one appears on known breach lists.');

  return { score, label, suggestions, criteria };
}

/* DOM wiring – Password Checker (browser only) */
if (typeof document !== 'undefined') (function initPasswordChecker() {
  const pwdInput     = document.getElementById('pwd-input');
  const toggleBtn    = document.getElementById('toggle-pwd');
  const meterBar     = document.getElementById('meter-bar');
  const strengthLbl  = document.getElementById('strength-label');
  const feedbackBox  = document.getElementById('pwd-feedback');
  const clearBtn     = document.getElementById('clear-pwd');

  if (!pwdInput) return; // guard for test environments

  /* --- Live analysis on every keystroke --- */
  pwdInput.addEventListener('input', function () {
    renderPasswordResult(this.value);
  });

  /* --- Toggle password visibility --- */
  toggleBtn.addEventListener('click', function () {
    const isHidden = pwdInput.type === 'password';
    pwdInput.type  = isHidden ? 'text' : 'password';
    this.textContent = isHidden ? '🙈' : '👁️';
    this.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
  });

  /* --- Clear --- */
  clearBtn.addEventListener('click', function () {
    pwdInput.value = '';
    pwdInput.type  = 'password';
    toggleBtn.textContent = '👁️';
    toggleBtn.setAttribute('aria-label', 'Show or hide password');
    meterBar.className  = 'meter-bar';
    meterBar.style.width = '0%';
    strengthLbl.textContent = '';
    strengthLbl.className = 'strength-label';
    feedbackBox.innerHTML = '';
    pwdInput.focus();
  });

  /**
   * Render password analysis result into the DOM.
   * Uses safe DOM APIs – no innerHTML with user input.
   * @param {string} value
   */
  function renderPasswordResult(value) {
    const result = checkPasswordStrength(value);

    /* Meter bar */
    meterBar.className = 'meter-bar score-' + result.score;

    /* Strength label */
    strengthLbl.textContent = result.label ? 'Strength: ' + result.label : '';
    strengthLbl.className   = 'strength-label score-' + result.score;

    /* Feedback box – built with DOM nodes, never innerHTML with user data */
    feedbackBox.innerHTML = ''; // safe: no user data placed here yet

    if (!value) return;

    // Criteria checklist
    const criteriaList = [
      { key: 'hasMinLength',   text: '8+ characters'              },
      { key: 'hasGoodLength',  text: '12+ characters'             },
      { key: 'hasUppercase',   text: 'Uppercase letter (A–Z)'     },
      { key: 'hasLowercase',   text: 'Lowercase letter (a–z)'     },
      { key: 'hasDigit',       text: 'Number (0–9)'               },
      { key: 'hasSpecial',     text: 'Special character (!@#…)'   },
      { key: 'noRepeats',      text: 'No repeated characters'     },
      { key: 'noSequential',   text: 'No sequential patterns'     },
      { key: 'noCommonWords',  text: 'Not a common password'      },
    ];

    const ul = document.createElement('ul');
    ul.style.listStyle = 'none';
    ul.style.padding   = '0';
    criteriaList.forEach(function (item) {
      const met  = result.criteria[item.key];
      const li   = document.createElement('li');
      const icon = document.createTextNode(met ? '✅ ' : '❌ ');
      const txt  = document.createTextNode(item.text);
      li.style.marginBottom = '3px';
      li.appendChild(icon);
      li.appendChild(txt);
      ul.appendChild(li);
    });
    feedbackBox.appendChild(ul);

    // Suggestions
    if (result.suggestions.length > 0) {
      const heading = document.createElement('p');
      heading.style.marginTop    = '10px';
      heading.style.fontWeight   = '600';
      heading.style.color        = '#f1f5f9';
      heading.textContent        = 'Suggestions to improve:';
      feedbackBox.appendChild(heading);

      const sugList = document.createElement('ul');
      result.suggestions.forEach(function (s) {
        const li = document.createElement('li');
        li.textContent = s;       // textContent is safe — no HTML injection
        sugList.appendChild(li);
      });
      feedbackBox.appendChild(sugList);
    } else if (result.score >= 5) {
      const p = document.createElement('p');
      p.style.color  = '#22c55e';
      p.style.fontWeight = '600';
      p.textContent  = '🎉 Excellent password! No improvements needed.';
      feedbackBox.appendChild(p);
    }
  }
})(); // end initPasswordChecker


/* ===========================================================
   SECTION 2 – SUSPICIOUS URL ANALYZER
   =========================================================== */

/**
 * Analyse a URL string for common warning signs using heuristics.
 * The URL is NEVER fetched, opened, or visited.
 *
 * @param {string} rawInput - The raw string entered by the user.
 * @returns {{ findings: Array<{level:'danger'|'warn'|'ok'|'info', message:string}>, riskLevel: string }}
 */
function analyzeURL(rawInput) {
  const input = rawInput.trim();
  if (!input) {
    return { findings: [], riskLevel: 'unknown', parseError: 'Please enter a URL.' };
  }

  const findings = [];

  // ---- 0. Pre-check for dangerous non-http schemes (before URL parsing) ----
  const dangerSchemeMatch = input.match(/^([a-zA-Z][a-zA-Z0-9+\-.]*):/);
  if (dangerSchemeMatch) {
    const rawScheme = dangerSchemeMatch[1].toLowerCase();
    if (rawScheme === 'javascript' || rawScheme === 'data' || rawScheme === 'vbscript') {
      findings.push({ level: 'danger', message: 'Scheme "' + rawScheme + '" can execute code in a browser — extremely suspicious.' });
      return { findings: findings, riskLevel: 'high' };
    }
  }

  // ---- 1. Attempt to parse ----
  let parsed = null;
  try {
    // Prepend http:// if no scheme so the URL parser can work
    const toParse = /^[a-zA-Z][a-zA-Z0-9+\-.]*:\/\//.test(input) ? input : 'http://' + input;
    parsed = new URL(toParse);
  } catch (_) {
    return {
      findings: [{ level: 'danger', message: 'The text entered is not a recognisable URL format.' }],
      riskLevel: 'high',
    };
  }

  const scheme   = parsed.protocol.replace(':', '').toLowerCase();  // e.g. "http"
  const hostname = parsed.hostname.toLowerCase();
  const pathname = parsed.pathname;
  const search   = parsed.search;
  const userInfo = parsed.username || parsed.password;

  // ---- 2. Scheme checks ----
  if (scheme === 'http') {
    findings.push({ level: 'warn', message: 'Uses plain HTTP (not HTTPS). Data is transmitted unencrypted. Look for HTTPS on pages that handle sensitive data.' });
  } else if (scheme === 'https') {
    findings.push({ level: 'ok',   message: 'Uses HTTPS — connection is encrypted.' });
  } else if (scheme === 'javascript' || scheme === 'data' || scheme === 'vbscript') {
    findings.push({ level: 'danger', message: 'Scheme "' + scheme + '" can execute code in a browser — extremely suspicious.' });
  } else if (scheme === 'file') {
    findings.push({ level: 'warn', message: 'This is a local file path, not a web URL.' });
  } else {
    findings.push({ level: 'info',  message: 'Non-standard scheme "' + scheme + '".' });
  }

  // ---- 3. IP-address host ----
  const ipv4Pattern  = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6Pattern  = /^\[?[0-9a-f:]+\]?$/i;
  if (ipv4Pattern.test(hostname) || ipv6Pattern.test(hostname)) {
    findings.push({ level: 'warn', message: 'Host is an IP address (' + hostname + '). Legitimate services typically use domain names. Be cautious.' });
  }

  // ---- 4. Embedded credentials ----
  if (userInfo) {
    findings.push({ level: 'danger', message: 'URL contains embedded credentials (username/password) — a strong phishing indicator.' });
  }

  // ---- 5. Suspicious hostname patterns ----
  // Only flag generic security-action words (login, verify, etc.).
  // Brand names (google, paypal, …) are intentionally excluded here because
  // their own legitimate domains would produce false positives.
  // Brand-name abuse is detected more precisely in Section 6 (brand-in-subdomain).
  const suspiciousKeywords = ['login', 'signin', 'verify', 'secure', 'account', 'update', 'bank', 'confirm', 'wallet', 'password', 'credential'];
  const foundKeywords = suspiciousKeywords.filter(function (k) { return hostname.includes(k); });
  if (foundKeywords.length > 0) {
    findings.push({ level: 'warn', message: 'Hostname contains sensitive keyword(s): "' + foundKeywords.join('", "') + '". Verify the full domain carefully.' });
  }

  // ---- 6. Misleading subdomain (brand in subdomain, not in TLD) ----
  // e.g. paypal.com.evil.com — real domain is "evil.com"
  const domainParts = hostname.split('.');
  const registrableDomain = domainParts.slice(-2).join('.');  // simplistic: last two labels
  const subdomainPart     = domainParts.slice(0, -2).join('.').toLowerCase();
  const brandMimics = ['paypal', 'google', 'amazon', 'apple', 'microsoft', 'netflix', 'facebook', 'instagram', 'twitter', 'chase', 'wellsfargo', 'hsbc', 'barclays'];
  const mimic = brandMimics.find(b => subdomainPart.includes(b));
  if (mimic) {
    findings.push({ level: 'danger', message: 'A well-known brand name ("' + mimic + '") appears in the subdomain, not in the main domain. This is a common phishing trick. The actual domain is: "' + registrableDomain + '".' });
  }

  // ---- 7. Excessive subdomains ----
  if (domainParts.length > 4) {
    findings.push({ level: 'warn', message: 'Unusually many subdomain levels (' + domainParts.length + ' labels) — sometimes used to obscure the real domain.' });
  }

  // ---- 8. Very long URL ----
  if (input.length > 200) {
    findings.push({ level: 'warn', message: 'URL is very long (' + input.length + ' characters). Phishing URLs are often long to hide the real destination.' });
  }

  // ---- 9. Suspicious TLD ----
  const tld = domainParts[domainParts.length - 1].toLowerCase();
  const suspiciousTLDs = ['zip', 'mov', 'tk', 'ml', 'ga', 'cf', 'gq'];
  if (suspiciousTLDs.includes(tld)) {
    findings.push({ level: 'warn', message: 'Top-level domain ".' + tld + '" is frequently abused in phishing campaigns.' });
  }

  // ---- 10. Punycode / homograph ----
  if (hostname.startsWith('xn--') || hostname.includes('.xn--')) {
    findings.push({ level: 'warn', message: 'Hostname uses Punycode (internationalised domain). This can be used in homograph attacks to mimic familiar brands.' });
  }

  // ---- 11. Path / query double-URL trick ----
  const fullURL = input;
  const httpCount = (fullURL.match(/https?:\/\//gi) || []).length;
  if (httpCount > 1) {
    findings.push({ level: 'danger', message: 'Multiple "http(s)://" detected in the URL. This is a redirect/obfuscation trick used in phishing links.' });
  }

  // ---- 12. Short hostname (potential URL shortener) ----
  const urlShorteners = ['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 'is.gd', 'buff.ly', 'rebrand.ly', 'cutt.ly'];
  if (urlShorteners.includes(hostname)) {
    findings.push({ level: 'info', message: 'This appears to be a shortened URL (' + hostname + '). The real destination is hidden — expand it with a trusted service before clicking.' });
  }

  // ---- Determine overall risk ----
  const dangerCount = findings.filter(f => f.level === 'danger').length;
  const warnCount   = findings.filter(f => f.level === 'warn').length;

  let riskLevel;
  if (dangerCount >= 1)             riskLevel = 'high';
  else if (warnCount >= 2)          riskLevel = 'medium';
  else if (warnCount === 1)         riskLevel = 'low-medium';
  else                              riskLevel = 'low';

  return { findings, riskLevel, hostname, scheme };
}

/* DOM wiring – URL Analyzer (browser only) */
if (typeof document !== 'undefined') (function initURLAnalyzer() {
  const urlInput   = document.getElementById('url-input');
  const analyzeBtn = document.getElementById('analyze-btn');
  const clearBtn   = document.getElementById('clear-url');
  const resultBox  = document.getElementById('url-result');

  if (!urlInput) return; // guard for test environments

  /* --- Analyze on button click --- */
  analyzeBtn.addEventListener('click', function () {
    renderURLResult(urlInput.value);
  });

  /* --- Also allow pressing Enter --- */
  urlInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') renderURLResult(this.value);
  });

  /* --- Clear --- */
  clearBtn.addEventListener('click', function () {
    urlInput.value   = '';
    resultBox.innerHTML = '';
    urlInput.focus();
  });

  /**
   * Build and display URL analysis results.
   * All DOM writes use textContent — no innerHTML with user data.
   * @param {string} value
   */
  function renderURLResult(value) {
    resultBox.innerHTML = ''; // clear previous

    if (!value.trim()) {
      const err = document.createElement('p');
      err.style.color = '#ef4444';
      err.textContent = 'Please enter a URL before clicking Analyze.';
      resultBox.appendChild(err);
      return;
    }

    const result = analyzeURL(value);

    // Risk header
    const riskColors = { high: '#ef4444', medium: '#f97316', 'low-medium': '#eab308', low: '#22c55e' };
    const riskEmojis  = { high: '🚨', medium: '⚠️', 'low-medium': '⚠️', low: '✅' };
    const riskLabels  = { high: 'HIGH RISK', medium: 'MEDIUM RISK', 'low-medium': 'LOW-MEDIUM RISK', low: 'LOW RISK' };

    const header = document.createElement('div');
    header.className = 'url-result-header';

    const badge = document.createElement('span');
    badge.className = 'tag';
    badge.style.background = riskColors[result.riskLevel] + '22';
    badge.style.color       = riskColors[result.riskLevel];
    badge.textContent = (riskEmojis[result.riskLevel] || '') + ' ' + (riskLabels[result.riskLevel] || 'UNKNOWN');
    header.appendChild(badge);

    if (result.hostname) {
      const host = document.createElement('span');
      host.style.color    = '#94a3b8';
      host.style.fontSize = '0.8rem';
      host.textContent    = result.hostname;
      header.appendChild(host);
    }
    resultBox.appendChild(header);

    // Disclaimer paragraph
    const disclaimer = document.createElement('p');
    disclaimer.style.fontSize  = '0.8rem';
    disclaimer.style.color     = '#64748b';
    disclaimer.style.marginBottom = '10px';
    disclaimer.textContent = '⚠️ These are heuristic indicators only. They cannot confirm a URL is safe or malicious. Always verify with a trusted service such as Google Safe Browsing or VirusTotal.';
    resultBox.appendChild(disclaimer);

    // Findings list
    if (result.findings && result.findings.length > 0) {
      const ul = document.createElement('ul');
      ul.style.listStyle = 'none';
      ul.style.padding   = '0';
      result.findings.forEach(function (f) {
        const li      = document.createElement('li');
        li.style.marginBottom = '6px';
        li.style.display = 'flex';
        li.style.gap = '8px';
        li.style.alignItems = 'flex-start';

        const levelEmoji = { danger: '🚨', warn: '⚠️', ok: '✅', info: 'ℹ️' };
        const icon = document.createTextNode(levelEmoji[f.level] || '');
        const txt  = document.createTextNode(' ' + f.message);
        li.appendChild(icon);
        li.appendChild(txt);
        ul.appendChild(li);
      });
      resultBox.appendChild(ul);
    }
  }
})(); // end initURLAnalyzer

/* ===========================================================
   MODULE EXPORTS (for Node.js test runner)
   =========================================================== */
// When running in Node.js (no `window` object), export the analysis functions.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { checkPasswordStrength, analyzeURL };
}
