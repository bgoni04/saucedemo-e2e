import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';

test(
  qase(2, 'Flujo completo: login, buscar asociado id 40 e imprimir credencial'),
  async ({ page }) => {

    // 1. Login
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.getByLabel(/usuario|user|correo|email/i).fill('test');
    await page.getByLabel(/contraseña|password/i).fill('test');
    await page.getByRole('button', { name: /iniciar sesión|login|entrar|ingresar/i }).click();

    await page.waitForLoadState('networkidle');

    // 2. Navigate to Asociados
    await page.getByRole('link', { name: /asociados/i }).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/asociados/i);

    // 3. Find user with id 40 and click
    await page.getByRole('row', { name: /\b40\b/ }).click();

    // 4. Click Credencial button
    await page.getByRole('button', { name: /credencial/i }).click();
    await page.waitForLoadState('networkidle');

    // 5. Click Imprimir Credencial and verify preview generates
    await page.getByRole('button', { name: /imprimir credencial/i }).click();
    await page.waitForLoadState('networkidle');

    const preview = page.locator('iframe, [class*="preview"], [class*="print"], [id*="preview"], [id*="print"]').first();
    await expect(preview).toBeVisible({ timeout: 10000 });

    // 6. Screenshot of the preview
    await page.screenshot({ path: 'test-results/credencial-preview.png', fullPage: true });
  }
);
