import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';

test(
  qase(2, 'Carga de inventario exitosa con boton Cargar mas datos'),
  async ({ page }) => {
    await page.goto('/');
    await page.getByLabel(/usuario|username|user/i).fill('test');
    await page.getByLabel(/contraseña|password/i).fill('test');
    await page.getByRole('button', { name: /iniciar sesión|login|ingresar/i }).click();

    await page.waitForURL(/asociados/i);
    await page.getByRole('link', { name: 'Inventario' }).click();
    await page.waitForURL(/inventory/i);

    const rowsBefore = await page.locator('table tbody tr').count();

    await page.getByRole('button', { name: 'Cargar más datos' }).click();
    await page.waitForTimeout(1500);

    const rowsAfter = await page.locator('table tbody tr').count();
    expect(rowsAfter).toBeGreaterThan(rowsBefore);

    await page.screenshot({ path: 'screenshots/inventory-loaded.png', fullPage: true });
  }
);

test(
  qase(3, 'Login fallido con credenciales invalidas'),
  async ({ page }) => {
    await page.goto('/');
    await page.getByLabel(/usuario|username|user/i).fill('usuario_invalido');
    await page.getByLabel(/contraseña|password/i).fill('password_invalido');
    await page.getByRole('button', { name: /iniciar sesión|login|ingresar/i }).click();

    await expect(page.locator('[class*="error"], [class*="alert"], [role="alert"]')).toBeVisible();
    await expect(page).not.toHaveURL(/asociados/i);
  }
);
