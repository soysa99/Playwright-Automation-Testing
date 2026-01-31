# IT3040 Assignment 1 - Playwright-Automation-Testing
Playwright automation project to test Singlish-to-Sinhala translation accuracy and real-time UI updates


## Project Overview
This repository contains the **Playwright automation project** and **Excel test cases** for **IT3040 – IT Project Management (BSc Hons, Year 3, Semester 1)**.  

The project is designed to test the **Singlish-to-Sinhala conversion system** available at [SwiftTranslator](https://www.swifttranslator.com/).  

**Objectives:**
- Test the **accuracy** of Singlish input conversion to Sinhala output.
- Verify the **stability and usability** of the user interface under different input conditions.
- Automate all identified **functional and UI test scenarios** using Playwright.

---
## Prerequisites

Before running the tests, ensure you have:

- **Node.js** (v18 or above) – [https://nodejs.org/](https://nodejs.org/)
- **npm** (comes with Node.js)
- Internet connection to access [SwiftTranslator](https://www.swifttranslator.com/)


## Installation

### Step 1: Clone or Download the Repository

If you have the project as a zip file, extract it. If it's a Git repository:

```bash
git clone <repository-url>
cd <project-directory>
```

### Step 2: Install Dependencies

Run the following command in the project root directory:

```bash
npm install
```

### Step 3: Install Playwright Browsers

After installing dependencies, install the required browsers:

```bash
npx playwright install chromium
```

#### 5. Running the Tests

Run All Tests
```bash
npx playwright test
```
#### 6. Run Tests in Headed Mode (With Browser UI)
```bash
npx playwright test --headed
```
#### 7. View Test Report

After running tests, generate and open the report
```bash
npx playwright show-report
```

---


## Test Coverage

### Positive Functional Tests (24)
- Sentence structures (simple, compound, complex)
- Questions and commands
- Past, present, and future tenses
- Negative sentence forms
- Greetings and daily conversations
- Mixed Singlish and English inputs
- Punctuation, numbers, and currency formats

### Negative Functional Tests (10)
- Missing or extra spaces
- Line breaks and formatting issues
- Slang and informal expressions
- Mixed language and abbreviations
- Typographical errors

### UI Test (1)
- Real-time Sinhala output update while typing

---

### Tests Failing

1. **Network Issues**: Ensure stable internet connection
2. **Site Changes**: Website structure may have changed - verify selectors
3. **Timeout Errors**: Increase timeout values in config or test files

### Installation Issues

1. **Node.js Version**: Ensure you're using Node.js 16+
   ```bash
   node --version
   ```

2. **Clear Cache**: If having npm issues
   ```bash
   npm cache clean --force
   npm install
   ```

### Browser Issues

If Playwright browsers aren't working:
```bash
npx playwright install --force chromium
```

## Test Results

Test results are saved in the `test-results/` directory:
- HTML report: `test-results/html-report/`
- JSON results: `test-results/test-results.json`
- Screenshots/Videos: `test-results/artifacts/`

## Notes

- Tests run sequentially (workers: 1) to avoid conflicts
- Each test waits 2 seconds between executions for stability
- Screenshots and videos are captured only on failure
- All tests use the same base URL configured in `playwright.config.js`

-----

## License
Academic use only – created for IT3040 Assignment 1.


