# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Run all Playwright E2E tests
npm test
# or
npx playwright test

# Run a single test file
npx playwright test tests/purchase.spec.ts

# Run Jest unit tests
npx jest pruebasjest.test.js

# Run Jest in watch mode
npx jest --watch

# Show Playwright test report
npx playwright show-report
```

## Architecture

This is a QA/testing project for the [SauceDemo](https://www.saucedemo.com) e-commerce demo site, with two distinct testing layers:

### Unit Tests (Jest)
- `classifyTriangle.js` — pure function that classifies triangles as Equilatero/Isosceles/Escaleno/Invalido
- `pruebasjest.test.js` — Jest tests covering valid triangles, invalid inputs (zero/negative sides, floats, impossible triangles, missing params)

### E2E Tests (Playwright + QASE)
- `tests/` — Playwright specs targeting `https://www.saucedemo.com`
- `playwright.config.ts` — configured for Chromium headless, 30s timeout, screenshots/video on failure
- Tests report to **QASE TestOps** (project `SEE`) via `playwright-qase-reporter`; wrap test names with `qase(caseId, 'title')` to link to QASE test cases
- `baseURL` is pre-set to `https://www.saucedemo.com`, so `page.goto('/')` works in tests

### QASE Integration
The reporter token and project are hardcoded in `playwright.config.ts`. Test runs are auto-completed on finish. Test IDs passed to `qase()` must match existing case IDs in the QASE `SEE` project.
