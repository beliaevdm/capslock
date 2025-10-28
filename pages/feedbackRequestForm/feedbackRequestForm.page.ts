import { Page, Locator } from '@playwright/test';
import { ButtonsNames, InputFields, ReasonsForRequest, PropertyTypes } from './feedbackRequestForm.types';

/**
 * Feedback request form
 */
export class FeedbackRequestForm {
    constructor(readonly page: Page, readonly isMob: boolean | undefined) {}

    /**
     * Get form locator
     * @param index Form number
     */
    async getFormLocator(index: '1' | '2' = '1'): Promise<Locator> {
        return this.page.locator(`#form-container-${index}`);
    }

    /**
     * Click a button on the form
     * @param buttonName ButtonsNames
     * @param index Form number
     */
    async clickButton(buttonName: ButtonsNames, index: '1' | '2' = '1'): Promise<void> {
        await (await this.getFormLocator(index)).getByRole('button', { name: buttonName })[this.isMob ? 'tap' : 'click']();
    }

    /**
     * Get input field locator
     * @param inputField InputFields
     * @param index Form number
     */
    async getInputFieldLocator(inputField: InputFields, index: '1' | '2' = '1'): Promise<Locator> {
        const locatorsMap: Record<InputFields, string> = {
            Name: 'Enter Your Name',
            Email: 'Enter Your Email',
            'Phone Number': '(XXX)XXX-XXXX',
            'ZIP Code': 'Enter ZIP Code',
        };
        return (await this.getFormLocator(index)).getByPlaceholder(locatorsMap[inputField]);
    }

    /**
     * Fill input field
     * @param inputField InputFields
     * @param value Value
     * @param index Form number
     */
    async fillInputField(inputField: InputFields, value: string, index: '1' | '2' = '1'): Promise<void> {
        await (await this.getInputFieldLocator(inputField, index)).fill(value);
    }

    /**
     * Get error message locator
     * @param index Form number
     */
    async getErrorMessageLocator(index: '1' | '2' = '1'): Promise<Locator> {
        return (await this.getFormLocator(index)).locator('[data-error-block]:visible');
    }

    /**
     * Get progress bar locator
     * @param index Form number
     */
    async getProgressBarLocator(index: '1' | '2' = '1'): Promise<Locator> {
        return (await this.getFormLocator(index)).locator('.stepProgress__value');
    }

    /**
     * Get card locator
     * @param cardName ReasonsForChoose | PropertyType
     * @param index Form number
     */
    async getFormCardLocator(cardName: ReasonsForRequest | PropertyTypes, index: '1' | '2' = '1'): Promise<Locator> {
        return (await this.getFormLocator(index)).locator('.quizCard').filter({ hasText: cardName });
    }

    /**
     * Click on a card
     * @param cardName ReasonsForChoose | PropertyType
     * @param index Form number
     */
    async clickFormCard(cardName: ReasonsForRequest | PropertyTypes, index: '1' | '2' = '1'): Promise<void> {
        await (await this.getFormCardLocator(cardName, index))[this.isMob ? 'tap' : 'click']();
    }
}
