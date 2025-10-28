import { Page, Locator } from '@playwright/test';

/**
 * Common methods
 */
export class CommonPage {
    constructor(readonly page: Page, readonly isMob: boolean | undefined) {}

    /**
     * Get page title locator
     * @param title Title text
     */
    async getTitleLocator(title: string): Promise<Locator> {
        return this.page.getByRole('heading', { name: title });
    }

    /**
     * Get paragraph locator by text
     * @param text Paragraph text
     */
    async getParagraphLocator(text: string): Promise<Locator> {
        return this.page.locator('p', { hasText: text });
    }
}
