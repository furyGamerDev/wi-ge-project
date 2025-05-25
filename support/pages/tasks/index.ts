import { Page } from "@playwright/test";
import { expect } from '@playwright/test';
require('dotenv').config()

export class TasksPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async go() {
        const BASE_URL = process.env.BASE_URL
        await this.page.goto(`${BASE_URL}`)
    }

    async deveExibirNoticias() {
        const newsItems = this.page.locator('div.feed-post-body:not([data-type="video"])');

        await expect(async () => {
            const count = await newsItems.count();
            expect(count).toBeGreaterThanOrEqual(7);
        }).toPass({ timeout: 10_000 });

        const finalCount = await newsItems.count();
        console.log(`Encontradas ${finalCount} notícias na home`);
    }

    async noticiaPossuiTitutlo() {
        const titleSelector = '.feed-post-body h2 a.feed-post-link';
        await this.page.waitForSelector(titleSelector, { timeout: 10_000 });
        this.scroll(1000);
        const firstTitle = this.page.locator(titleSelector).first();
        await expect(firstTitle).toBeVisible();
        await expect(firstTitle).not.toHaveText('', { useInnerText: true });
    }

    async noticiaPossuiImg() {
        const imgSelector = '.feed-post-body a.feed-post-figure-link img';
        await this.page.waitForSelector(imgSelector, { timeout: 10_000 });
        this.scroll(1000);
        const firstImage = this.page.locator(imgSelector).first();
        await expect(firstImage).toBeVisible();
        await expect(firstImage).toHaveAttribute('src', /^https?:\/\//);
    }

    async scroll(y: number) {
        await this.page.mouse.wheel(0, y);
    }

    async materiaCompleta() {
        const link = this.page
            .locator('.feed-post-body h2 a.feed-post-link')
            .nth(3);
        const trechoResumo = this.page.locator('article[itemprop="articleBody"]');
        this.scroll(1000);
        await expect(link).toBeVisible();
        await link.click();
        this.scroll(1000);
        await expect(trechoResumo).toBeVisible();
    }

    async acessarTimes() {
        const timesLabel = this.page.locator('span.mosaico__header-personalization--times-label', { hasText: 'TIMES' })
            .first();
        await expect(timesLabel).toBeVisible();
        await timesLabel.hover();
        const santosLink = this.page.getByRole('link', { name: 'Santos' }).first();
        await expect(santosLink).toBeVisible();
        await santosLink.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL(/\/santos(-e-regiao)?\//i);
    }
}