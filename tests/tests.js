/**
 * CyberShield – Automated Test Suite
 * =====================================
 * Runs with Node.js: `node tests/tests.js`
 * Also has an HTML runner: open tests/tests.html in a browser.
 *
 * Covers:
 *   - Password strength scoring
 *   - Password criteria flags
 *   - Password suggestions
 *   - URL scheme detection
 *   - URL IP-address detection
 *   - URL embedded credentials
 *   - URL suspicious keywords
 *   - URL brand-in-subdomain trick
 *   - URL shorteners
 *   - URL double-scheme trick
 *   - Invalid URL inputs
 */

'use strict';

/* ----------------------------------------------------------
   Load the module under test
   ---------------------------------------------------------- */
const path   = require('path');
const { checkPasswordStrength, analyzeURL } = require(path.join(__dirname, '..', 'app.js'));

/* ----------------------------------------------------------
   Minimal test harness
   ---------------------------------------------------------- */
let passed = 0;
let failed = 0;
const results = [];

/**
 * Assert a condition is truthy.
 * @param {string} description - Human-readable test name.
 * @param {boolean} condition  - Whether the test passes.
 */
function assert(description, condition) {
  if (condition) {
    passed++;
    results.push({ status: 'PASS', description });
    console.log('  ✅ PASS  ' + description);
  } else {
    failed++;
    results.push({ status: 'FAIL', description });
    console.error('  ❌ FAIL  ' + description);
  }
}

/**
 * Group related tests under a heading.
 * @param {string} name    - Group label.
 * @param {Function} fn    - Function containing assert() calls.
 */
function describe(name, fn) {
  console.log('\n' + '─'.repeat(60));
  console.log('  ' + name);
  console.log('─'.repeat(60));
  fn();
}

/* ===========================================================
   TEST GROUP 1 – Password Strength: Empty / Edge Cases
   =========================================================== */
describe('Password Strength – Empty & edge cases', function () {
  const empty = checkPasswordStrength('');
  assert('Empty string returns score 0',   empty.score === 0);
  assert('Empty string returns empty label', empty.label === '');
  assert('Empty string returns no suggestions', empty.suggestions.length === 0);

  const singleChar = checkPasswordStrength('a');
  assert('Single char returns score 1 (minimum)',  singleChar.score === 1);
  assert('Single char label is "Very Weak"',       singleChar.label === 'Very Weak');
});

/* ===========================================================
   TEST GROUP 2 – Password Strength: Weak Passwords
   =========================================================== */
describe('Password Strength – Weak passwords', function () {
  const common = checkPasswordStrength('password');
  assert('"password" overrides to score 1 (Very Weak)', common.score === 1);
  assert('"password" suggests it is a common password',
    common.suggestions.some(s => s.toLowerCase().includes('common')));

  const short = checkPasswordStrength('abc');
  assert('3-char lowercase scores 1', short.score === 1);
  assert('3-char suggests minimum length',
    short.suggestions.some(s => s.includes('8 characters')));
});

/* ===========================================================
   TEST GROUP 3 – Password Strength: Medium Passwords
   =========================================================== */
describe('Password Strength – Medium passwords', function () {
  const medium = checkPasswordStrength('Hello123');
  assert('"Hello123" scores >= 2 (Weak or Fair)',  medium.score >= 2);
  assert('"Hello123" scores <= 4',                 medium.score <= 4);
  assert('"Hello123" has uppercase flag',          medium.criteria.hasUppercase);
  assert('"Hello123" has lowercase flag',          medium.criteria.hasLowercase);
  assert('"Hello123" has digit flag',              medium.criteria.hasDigit);
  assert('"Hello123" lacks special char',          !medium.criteria.hasSpecial);
});

/* ===========================================================
   TEST GROUP 4 – Password Strength: Strong Passwords
   =========================================================== */
describe('Password Strength – Strong passwords', function () {
  const strong = checkPasswordStrength('Tr0ub4dor&3!xyz');
  assert('"Tr0ub4dor&3!xyz" scores 5 (Strong)',   strong.score === 5);
  assert('"Tr0ub4dor&3!xyz" label is "Strong"',   strong.label === 'Strong');
  assert('"Tr0ub4dor&3!xyz" has no suggestions',  strong.suggestions.length === 0);
  assert('"Tr0ub4dor&3!xyz" meets all criteria',
    strong.criteria.hasMinLength && strong.criteria.hasGoodLength &&
    strong.criteria.hasUppercase && strong.criteria.hasLowercase &&
    strong.criteria.hasDigit     && strong.criteria.hasSpecial);

  const anotherStrong = checkPasswordStrength('C0rr3ct-H0rs3!B4ttery');
  assert('"C0rr3ct-H0rs3!B4ttery" scores 5', anotherStrong.score === 5);
});

/* ===========================================================
   TEST GROUP 5 – Password Strength: Penalties
   =========================================================== */
describe('Password Strength – Penalties for bad patterns', function () {
  const repeats = checkPasswordStrength('aaaBBBBccc123!');
  assert('Repeated chars reduce score below max', repeats.score < 5);

  const sequential = checkPasswordStrength('abcdefGHI123!');
  assert('Sequential chars reduce score below max', sequential.score < 5);
});

/* ===========================================================
   TEST GROUP 6 – URL Analyzer: Invalid Input
   =========================================================== */
describe('URL Analyzer – Invalid inputs', function () {
  const empty = analyzeURL('');
  assert('Empty URL returns parseError',  !!empty.parseError);

  const blank = analyzeURL('   ');
  assert('Whitespace-only URL returns parseError', !!blank.parseError);

  const garbage = analyzeURL('not a url at all!!!');
  assert('Garbage text yields riskLevel "high"',  garbage.riskLevel === 'high');
  assert('Garbage text has a danger finding',
    garbage.findings.some(f => f.level === 'danger'));
});

/* ===========================================================
   TEST GROUP 7 – URL Analyzer: Scheme Checks
   =========================================================== */
describe('URL Analyzer – Scheme detection', function () {
  const http = analyzeURL('http://example.com');
  assert('http:// scheme produces a "warn" finding',
    http.findings.some(f => f.level === 'warn' && f.message.toLowerCase().includes('http')));

  const https = analyzeURL('https://example.com');
  assert('https:// scheme produces an "ok" finding',
    https.findings.some(f => f.level === 'ok'));

  const jsScheme = analyzeURL('javascript:alert(1)');
  assert('"javascript:" scheme produces a "danger" finding',
    jsScheme.findings.some(f => f.level === 'danger' && f.message.toLowerCase().includes('javascript')));
});

/* ===========================================================
   TEST GROUP 8 – URL Analyzer: IP Address Host
   =========================================================== */
describe('URL Analyzer – IP address host', function () {
  const ipURL = analyzeURL('http://192.168.1.1/login');
  assert('IP-address host produces a "warn" finding',
    ipURL.findings.some(f => f.level === 'warn' && f.message.includes('IP address')));

  const domainURL = analyzeURL('https://mybank.com');
  const hasIPWarn = domainURL.findings.some(f => f.message.includes('IP address'));
  assert('Normal domain does NOT produce IP-address warning', !hasIPWarn);
});

/* ===========================================================
   TEST GROUP 9 – URL Analyzer: Embedded Credentials
   =========================================================== */
describe('URL Analyzer – Embedded credentials', function () {
  const creds = analyzeURL('http://user:pass@example.com');
  assert('Embedded credentials produce a "danger" finding',
    creds.findings.some(f => f.level === 'danger' && f.message.toLowerCase().includes('credential')));

  const noCreds = analyzeURL('https://example.com/path');
  assert('No credentials — no credential danger finding',
    !noCreds.findings.some(f => f.message.toLowerCase().includes('credential')));
});

/* ===========================================================
   TEST GROUP 10 – URL Analyzer: Suspicious Keywords
   =========================================================== */
describe('URL Analyzer – Suspicious hostname keywords', function () {
  // Generic action words in the hostname should still warn
  const keyword = analyzeURL('https://secure-login.malicious.com');
  assert('"secure-login" hostname triggers keyword warning',
    keyword.findings.some(f => f.level === 'warn' && f.message.includes('keyword')));

  // Ordinary clean hostname: no keyword warning
  const clean = analyzeURL('https://news.bbc.co.uk');
  assert('Clean hostname does not trigger keyword warning',
    !clean.findings.some(f => f.message.includes('keyword')));

  // Brand-name-only hostname (legitimate HTTPS): must NOT trigger keyword warning
  const google = analyzeURL('https://www.google.com');
  assert('https://www.google.com does NOT trigger keyword warning',
    !google.findings.some(f => f.message.includes('keyword')));

  // Brand-name-only: overall risk must be LOW (HTTPS, clean domain, no bad patterns)
  assert('https://www.google.com overall risk is "low"',
    google.riskLevel === 'low');

  // Plain HTTP is warn-level but not keyword-related
  const httpGoogle = analyzeURL('http://google.com');
  assert('http://google.com does NOT trigger keyword warning',
    !httpGoogle.findings.some(f => f.message.includes('keyword')));
});

/* ===========================================================
   TEST GROUP 11 – URL Analyzer: Brand-in-Subdomain Trick
   =========================================================== */
describe('URL Analyzer – Brand-in-subdomain phishing', function () {
  // Brand in subdomain, real domain is evil.com → danger
  const phish = analyzeURL('https://paypal.com.evil.com/account/login');
  assert('"paypal.com.evil.com" triggers brand-in-subdomain danger',
    phish.findings.some(f => f.level === 'danger' && f.message.toLowerCase().includes('paypal')));

  // Confirm original test case still works
  const phish2 = analyzeURL('https://paypal.com.verify-now.net/login');
  assert('"paypal.com.verify-now.net" triggers brand-in-subdomain danger',
    phish2.findings.some(f => f.level === 'danger' && f.message.toLowerCase().includes('paypal')));

  // Legitimate paypal.com must NOT trigger subdomain brand warning
  const legit = analyzeURL('https://www.paypal.com/login');
  assert('paypal.com itself does NOT trigger subdomain brand warning',
    !legit.findings.some(f => f.level === 'danger' && f.message.toLowerCase().includes('paypal') && f.message.includes('subdomain')));
});

/* ===========================================================
   TEST GROUP 12 – URL Analyzer: Double-Scheme Trick
   =========================================================== */
describe('URL Analyzer – Double scheme obfuscation', function () {
  const doubleScheme = analyzeURL('https://evil.com/redirect?to=http://victim.com');
  assert('Double scheme in URL triggers danger finding',
    doubleScheme.findings.some(f => f.level === 'danger' && f.message.includes('Multiple')));
});

/* ===========================================================
   TEST GROUP 13 – URL Analyzer: URL Shorteners
   =========================================================== */
describe('URL Analyzer – URL shortener detection', function () {
  const shortened = analyzeURL('https://bit.ly/abc123');
  assert('bit.ly identified as URL shortener (info finding)',
    shortened.findings.some(f => f.level === 'info' && f.message.includes('shortened')));
});

/* ===========================================================
   TEST GROUP 14 – URL Analyzer: Risk Level Calculation
   =========================================================== */
describe('URL Analyzer – Overall risk level', function () {
  const highRisk = analyzeURL('http://user:pass@192.168.1.1/login');
  assert('URL with credentials + IP = riskLevel "high"', highRisk.riskLevel === 'high');

  const lowRisk = analyzeURL('https://wikipedia.org/wiki/Cybersecurity');
  assert('Clean HTTPS URL = riskLevel "low"', lowRisk.riskLevel === 'low');
});

/* ===========================================================
   SUMMARY
   =========================================================== */
console.log('\n' + '═'.repeat(60));
console.log(`  TEST RESULTS:  ${passed} passed,  ${failed} failed  (total: ${passed + failed})`);
console.log('═'.repeat(60) + '\n');

if (failed > 0) {
  console.error('Some tests FAILED. Review output above.\n');
  process.exit(1);
} else {
  console.log('All tests PASSED. ✅\n');
  process.exit(0);
}
