import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';

test(
  qase(1, 'Compra exitosa en carrito de compras'),
  async ({ page }) => {

    // Paso 1: Navegar al sitio
    await page.goto('https://www.saucedemo.com');
    await expect(page).toHaveTitle(/Swag Labs/);

    // Paso 2: Login
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Verificar página de productos
    await expect(page.locator('.inventory_list')).toBeVisible();
    await expect(page.locator('.btn_inventory').first()).toBeVisible();

    // Paso 3: Agregar producto al carrito
    await page.locator('.btn_inventory').first().click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // Paso 4: Ir al carrito
    await page.click('.shopping_cart_link');
    await expect(page.locator('.cart_item')).toBeVisible();

    // Paso 5: Proceder al checkout
    await page.click('#checkout');
    await expect(page.locator('#first-name')).toBeVisible();

    // Paso 6: Ingresar datos de envío
    await page.fill('#first-name', 'John');
    await page.fill('#last-name', 'Doe');
    await page.fill('#postal-code', '12345');
    await page.click('#continue');

    // Verificar resumen de orden
    await expect(page.locator('.summary_info')).toBeVisible();

    // Paso 7: Finalizar compra
    await page.click('#finish');
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  }
);