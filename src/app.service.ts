import { Injectable } from '@nestjs/common';
import * as playwright from 'playwright';
import * as path from 'path';
@Injectable()
export class AppService {
  async getHello() {
    const browser = await playwright.chromium.launch({
      headless: false,
      slowMo: 1000 * 0.5,
      args: ['--start-maximized'],
    });
    try {
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto('https://bukabantuan.bukalapak.com/form/175');
      await page.waitForURL('https://bukabantuan.bukalapak.com/form/175');
      await page.locator('#name').fill('John Doe');
      await page.locator('#email').fill('john@doe.com');
      await page
        .locator(
          '[aria-label="Nama Kekayaan Intelektual (Intellectual Property Name)"]',
        )
        .fill('John Doe');
      await page
        .locator('[aria-label="Nomor Registrasi (Registration Number)"]')
        .fill('123456789');
      await page
        .locator('[aria-label=" Nama Pemilik (Owner Name)"]')
        .fill('John Doe');
      await page.locator('[value="Iya (Yes)"]').click();
      await page
        .locator(
          `[aria-label="Hubungan Pelapor dengan Pemilik (Informant's Relationship with the rights owner)"]`,
        )
        .fill('John Doe');
      await page
        .locator(
          `[aria-label="Nama Perusahaan Pelapor (Informant's Company Name)"]`,
        )
        .fill('John Doe');
      await page
        .locator(
          `[aria-label="Website Perusahaan Pelapor (Informant's Company Website)"]`,
        )
        .fill('https://www.google.com');
      await page
        .locator(
          `[aria-label="Alamat Perusahaan Pelapor (Informant's Company Address)"]`,
        )
        .fill('John Doe');
      await page
        .locator(
          `[aria-label="Alamat Surel Pemilik Kekayaan Intelektual atau Pelapor (Intellectual Property Owner’s or Informant’s Email)"]`,
        )
        .fill('John@Doe.com');
      await page
        .locator(
          `[aria-label="Nomor Telepon Pelapor (Informant’s Phone Number)"]`,
        )
        .fill('123456789');
      await page
        .locator(`[aria-label="Link Produk (Product's Link)"]`)
        .fill('https://www.google.com');
      await page
        .locator(`[aria-label="Detail Masalah (Problem Details)"]`)
        .fill('John Doe John Doe John Doe John Doe John Doe John Doe');

      let fileChooserPromise = page.waitForEvent('filechooser');
      await page.locator(`[name="link_barang_banyak"]`).click({ force: true });
      let fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(path.join(__dirname, '..', 'ss.png'));

      fileChooserPromise = page.waitForEvent('filechooser');
      await page
        .locator(`[name="surat_kepemilikan_merek"]`)
        .click({ force: true });
      fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(path.join(__dirname, '..', 'ss.png'));

      fileChooserPromise = page.waitForEvent('filechooser');
      await page.locator(`[name="bukti_surat_kuasa"]`).click({ force: true });
      fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(path.join(__dirname, '..', 'ss.png'));

      fileChooserPromise = page.waitForEvent('filechooser');
      await page
        .locator(`[name="bukti_surat_izin_usaha"]`)
        .click({ force: true });
      fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(path.join(__dirname, '..', 'ss.png'));

      await page.locator(`[value="isTncChecked"]`).click();

      await page.locator(`[type="submit"]`).click();
      return {
        status: 'ok',
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    } finally {
      browser.close();
    }
  }
}
