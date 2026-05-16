import { test, expect } from '@playwright/test';

test.describe('Quiz Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows intro phase on load', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Engineering Leader');
    await expect(page.getByRole('button', { name: 'Start Your Monday' })).toBeVisible();
    await expect(page.locator('.archetype-tags .tag')).toHaveCount(5);
  });

  test('starts quiz when clicking start button', async ({ page }) => {
    await page.getByRole('button', { name: 'Start Your Monday' }).click();

    await expect(page.locator('.progress__label')).toContainText('Scenario 1 of 10');
    await expect(page.locator('.scenario-title')).toBeVisible();
    await expect(page.locator('.choice')).toHaveCount(4);
  });

  test('progresses through scenarios when answering', async ({ page }) => {
    await page.getByRole('button', { name: 'Start Your Monday' }).click();

    // Answer first question
    await page.locator('.choice').first().click();
    await expect(page.locator('.progress__label')).toContainText('Scenario 2 of 10');

    // Answer second question
    await page.locator('.choice').first().click();
    await expect(page.locator('.progress__label')).toContainText('Scenario 3 of 10');
  });

  test('shows results after completing all scenarios', async ({ page }) => {
    await page.getByRole('button', { name: 'Start Your Monday' }).click();

    // Answer all 10 questions
    for (let i = 0; i < 10; i++) {
      await page.locator('.choice').first().click();
    }

    // Should be on results page
    await expect(page.locator('.result-hero')).toBeVisible();
    await expect(page.locator('.result-title')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Play Again' })).toBeVisible();
  });

  test('displays strengths and watch outs on results', async ({ page }) => {
    await page.getByRole('button', { name: 'Start Your Monday' }).click();

    for (let i = 0; i < 10; i++) {
      await page.locator('.choice').first().click();
    }

    await expect(page.locator('.section-label--success')).toContainText('Strengths');
    await expect(page.locator('.section-label--warning')).toContainText('Watch Outs');
  });

  test('resets quiz when clicking play again', async ({ page }) => {
    await page.getByRole('button', { name: 'Start Your Monday' }).click();

    for (let i = 0; i < 10; i++) {
      await page.locator('.choice').first().click();
    }

    await page.getByRole('button', { name: 'Play Again' }).click();

    // Back to intro
    await expect(page.locator('h1')).toContainText('Engineering Leader');
    await expect(page.getByRole('button', { name: 'Start Your Monday' })).toBeVisible();
  });
});

test.describe('Theme Toggle', () => {
  test('toggles between dark and light mode', async ({ page }) => {
    await page.goto('/');

    const html = page.locator('html');
    const toggle = page.locator('.theme-toggle');

    // Default should be dark (or system preference)
    await toggle.click();
    const themeAfterClick = await html.getAttribute('data-theme');

    // Click again to toggle back
    await toggle.click();
    const themeAfterSecondClick = await html.getAttribute('data-theme');

    // Should have toggled
    expect(themeAfterClick).not.toBe(themeAfterSecondClick);
  });

  test('persists theme preference', async ({ page }) => {
    await page.goto('/');

    // Set to light mode
    const html = page.locator('html');
    const toggle = page.locator('.theme-toggle');

    // Click until we're in light mode
    await toggle.click();
    let theme = await html.getAttribute('data-theme');
    if (theme !== 'light') {
      await toggle.click();
    }

    // Reload and check persistence
    await page.reload();
    await expect(html).toHaveAttribute('data-theme', 'light');
  });
});

test.describe('Score Preview', () => {
  test('updates scores as user answers questions', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Start Your Monday' }).click();

    // All scores should start at 0
    const scoreChips = page.locator('.score-chip');
    await expect(scoreChips).toHaveCount(5);

    // Answer a question
    await page.locator('.choice').first().click();

    // At least one score should have changed (not all zeros anymore)
    const scoreTexts = await page.locator('.score-chip').allTextContents();
    const hasNonZero = scoreTexts.some(text => {
      const num = parseInt(text.replace(/\D/g, ''));
      return num > 0;
    });

    expect(hasNonZero).toBe(true);
  });
});
