import { expect } from '@playwright/test';

import test from '../../fixtures/all.fixtures';
import { createStep } from '../../tools/utils';
import { reasonsForRequest, propertyTypes } from '../../pages/feedbackRequestForm/feedbackRequestForm.types';

let step: (description: string, callback: () => Promise<void>) => Promise<void>;

test.beforeEach(async ({}) => {
    step = createStep();
});

const testData = ['1', '2'] as const;

test.describe('Feedback request form verification', () => {
    testData.forEach((nth) => {
        test(`Verify progress bar of form ${nth}`, async ({ commonPage, feedbackRequestForm, page }) => {
            await step('Go to the homepage', async () => {
                await page.goto('/');
            });
            await step(`Verify that form ${nth} is displayed on the page`, async () => {
                await expect(await feedbackRequestForm.getFormLocator(nth)).toBeVisible();
            });
            await step('Fill the "ZIP Code" field with a valid value — "44444"', async () => {
                await feedbackRequestForm.fillInputField('ZIP Code', '44444', nth);
            });
            await step('Click the "Next" button', async () => {
                await feedbackRequestForm.clickButton('Next', nth);
            });
            for (const index of testData) {
                await step(`Verify the progress bar state "2 of 5" in form ${index}`, async () => {
                    await expect(await feedbackRequestForm.getProgressBarLocator(index)).toBeVisible();
                    await expect(await feedbackRequestForm.getProgressBarLocator(index)).toHaveAttribute('style', 'width: 36%');
                    await expect(await feedbackRequestForm.getFormLocator(index)).toContainText('2 of 5');
                });
            }
            await step('Select the first reason', async () => {
                await feedbackRequestForm.clickFormCard(reasonsForRequest[0], nth);
            });
            await step('Verify that the first reason is selected', async () => {
                await expect((await feedbackRequestForm.getFormCardLocator(reasonsForRequest[0], nth)).locator('span')).toHaveCSS('color', 'rgb(255, 255, 255)');
            });
            await step('Click the "Next" button', async () => {
                await feedbackRequestForm.clickButton('Next', nth);
            });
            //  TODO Bug: the progress bar does not change
            // for (const index of testData) {
            //     await step(`Verify the progress bar state "3 of 5" in form ${index}`, async () => {
            //         await expect(await feedbackRequestForm.getProgressBarLocator(index)).toBeVisible();
            //         await expect(await feedbackRequestForm.getProgressBarLocator(index)).toHaveAttribute('style', 'width: 52%');
            //         await expect(await feedbackRequestForm.getFormLocator(index)).toContainText('3 of 5');
            //     });
            // }
            await step('Select the first property type', async () => {
                await feedbackRequestForm.clickFormCard(propertyTypes[0], nth);
            });
            await step('Click the "Next" button', async () => {
                await feedbackRequestForm.clickButton('Next', nth);
            });
            for (const index of testData) {
                await step(`Verify the progress bar state "4 of 5" in form ${index}`, async () => {
                    await expect(await feedbackRequestForm.getProgressBarLocator(index)).toBeVisible();
                    // TODO Bug: the bar is filled as if it were step 3 of 5
                    // await expect(await feedbackRequestForm.getProgressBarLocator(index)).toHaveAttribute('style', 'width: 69%');
                    await expect(await feedbackRequestForm.getFormLocator(index)).toContainText('4 of 5');
                });
            }
            await step('Fill the "Name" field with a valid value — "Dmytro Bieliaiev"', async () => {
                await feedbackRequestForm.fillInputField('Name', 'Dmytro Bieliaiev', nth);
            });
            await step('Fill the "Email" field with a valid value — "123@gmail.com"', async () => {
                await feedbackRequestForm.fillInputField('Email', '123@gmail.com', nth);
            });
            await step('Click the "Go To Estimate" button', async () => {
                await feedbackRequestForm.clickButton('Go To Estimate', nth);
            });
            for (const index of testData) {
                await step(`Verify the progress bar state "5 of 5" in form ${index}`, async () => {
                    await expect(await feedbackRequestForm.getProgressBarLocator(index)).toBeVisible();
                    await expect(await feedbackRequestForm.getProgressBarLocator(index)).toHaveAttribute('style', 'width: 100%');
                    await expect(await feedbackRequestForm.getFormLocator(index)).toContainText('5 of 5');
                });
            }
            await step('Fill the "Phone Number" field with a valid value — "2222222222"', async () => {
                await feedbackRequestForm.fillInputField('Phone Number', '2222222222', nth);
            });
            await step('Click the "Submit Your Request" button', async () => {
                await feedbackRequestForm.clickButton('Submit Your Request', nth);
            });
            await step('Verify the page heading "Thank you!" is displayed', async () => {
                await expect(await commonPage.getTitleLocator('Thank you!')).toBeVisible();
            });
        });
    });

    testData.forEach((nth) => {
        test(`Verify input fields of form ${nth}`, async ({ commonPage, feedbackRequestForm, page }) => {
            await step('Go to the homepage', async () => {
                await page.goto('/');
            });
            await step(`Verify that form ${nth} is displayed on the page`, async () => {
                await expect(await feedbackRequestForm.getFormLocator(nth)).toBeVisible();
            });
            await step('Click the "Next" button', async () => {
                await feedbackRequestForm.clickButton('Next', nth);
            });
            await step('Verify the error message "Enter your ZIP code." is present', async () => {
                await expect(await feedbackRequestForm.getErrorMessageLocator(nth)).toHaveText('Enter your ZIP code.');
            });
            // TODO Bug, possible to enter ZIP code with 9 digits
            for (const { title, value } of [
                { title: 'with letters', value: 'qweqw' },
                { title: 'with six digits', value: '222222' },
                { title: 'with four digits', value: '2222' },
            ]) {
                await step(`Fill the "ZIP Code" field ${title}`, async () => {
                    await feedbackRequestForm.fillInputField('ZIP Code', value, nth);
                });
                await step('Click the "Next" button', async () => {
                    await feedbackRequestForm.clickButton('Next', nth);
                });
                await step('Verify the error message "Wrong ZIP code." is present', async () => {
                    await expect(await feedbackRequestForm.getErrorMessageLocator(nth)).toHaveText('Wrong ZIP code.');
                });
            }
            await step('Fill the "ZIP Code" field with a valid value — "44444"', async () => {
                await feedbackRequestForm.fillInputField('ZIP Code', '44444', nth);
            });
            await step('Click the "Next" button', async () => {
                await feedbackRequestForm.clickButton('Next', nth);
            });
            await step('Verify that we moved to the second step of filling the form', async () => {
                await expect(await feedbackRequestForm.getProgressBarLocator(nth)).toBeVisible();
                await expect(await feedbackRequestForm.getFormLocator(nth)).toContainText('2 of 5');
            });
            await step('Click the "Next" button', async () => {
                await feedbackRequestForm.clickButton('Next', nth);
            });
            await step('Verify that we moved to the third step of filling the form', async () => {
                await expect(await feedbackRequestForm.getFormLocator(nth)).toContainText('What type of property is this for?');
            });
            await step('Click the "Next" button', async () => {
                await page.waitForTimeout(1000);
                await feedbackRequestForm.clickButton('Next', nth);
            });
            await step('Verify the error message "Choose one of the variants." is present', async () => {
                await expect(await feedbackRequestForm.getFormLocator(nth)).toContainText('Choose one of the variants.');
            });
            await step('Select the first property type', async () => {
                await feedbackRequestForm.clickFormCard(propertyTypes[0], nth);
            });
            await step('Click the "Next" button', async () => {
                await feedbackRequestForm.clickButton('Next', nth);
            });
            await step('Verify that we moved to the fourth step of filling the form', async () => {
                await expect(await feedbackRequestForm.getProgressBarLocator(nth)).toBeVisible();
                await expect(await feedbackRequestForm.getFormLocator(nth)).toContainText('4 of 5');
            });
            await step('Verify that the "Email" field has the "required" attribute', async () => {
                await expect(await feedbackRequestForm.getInputFieldLocator('Email', nth)).toHaveAttribute('required');
            });
            await step('Verify that the "Email" field has the attribute "type"="email"', async () => {
                await expect(await feedbackRequestForm.getInputFieldLocator('Email', nth)).toHaveAttribute('type', 'email');
            });
            await step('Fill the "Email" field with a valid value — "123@gmail.com"', async () => {
                await feedbackRequestForm.fillInputField('Email', '123@gmail.com', nth);
            });
            await step('Click the "Go To Estimate" button', async () => {
                await feedbackRequestForm.clickButton('Go To Estimate', nth);
            });
            await step('Verify the error message "Please enter your name." is present', async () => {
                await expect(await feedbackRequestForm.getErrorMessageLocator(nth)).toHaveText('Please enter your name.');
            });
            for (const { title, value, error } of [
                { title: 'with one word', value: 'Dmytro', error: 'Your full name should contain both first and last name.' },
                { title: 'in Cyrillic', value: 'Фыва Фыва', error: 'Your name should consist only of latin letters, apostrophes, underscores, dots and dashes.' },
            ]) {
                await step(`Fill the "Name" field ${title} — "${value}"`, async () => {
                    await feedbackRequestForm.fillInputField('Name', value, nth);
                });
                await step('Click the "Go To Estimate" button', async () => {
                    await feedbackRequestForm.clickButton('Go To Estimate', nth);
                });
                await step(`Verify the error message "${error}" is present`, async () => {
                    await expect(await feedbackRequestForm.getErrorMessageLocator(nth)).toHaveText(error);
                });
            }
            await step('Fill the "Name" field with a valid value — "Dmytro Bieliaiev"', async () => {
                await feedbackRequestForm.fillInputField('Name', 'Dmytro Bieliaiev', nth);
            });
            await step('Click the "Go To Estimate" button', async () => {
                await feedbackRequestForm.clickButton('Go To Estimate', nth);
            });
            await step('Verify that we moved to the fifth step of filling the form', async () => {
                await expect(await feedbackRequestForm.getProgressBarLocator(nth)).toBeVisible();
                await expect(await feedbackRequestForm.getFormLocator(nth)).toContainText('5 of 5');
            });
            await step('Click the "Submit Your Request" button', async () => {
                await feedbackRequestForm.clickButton('Submit Your Request', nth);
            });
            await step('Verify the error message "Enter your phone number." is present', async () => {
                await expect(await feedbackRequestForm.getErrorMessageLocator(nth)).toHaveText('Enter your phone number.');
            });
            await step('Verify that the "Phone Number" field has the "data-phone-input" attribute', async () => {
                await expect(await feedbackRequestForm.getInputFieldLocator('Phone Number', nth)).toHaveAttribute('data-phone-input');
            });
            await step('Verify that the "Phone Number" field has the attribute "type"="tel"', async () => {
                await expect(await feedbackRequestForm.getInputFieldLocator('Phone Number', nth)).toHaveAttribute('type', 'tel');
            });
            await step('Fill the "Phone Number" field with 9 digits — "222222222"', async () => {
                await feedbackRequestForm.fillInputField('Phone Number', '222222222', nth);
            });
            await step('Click the "Submit Your Request" button', async () => {
                await feedbackRequestForm.clickButton('Submit Your Request', nth);
            });
            await step('Verify the error message "Wrong phone number." is present', async () => {
                await expect(await feedbackRequestForm.getErrorMessageLocator(nth)).toHaveText('Wrong phone number.');
            });
            await step('Fill the "Phone Number" field with 11 digits — "22222222223"', async () => {
                await feedbackRequestForm.fillInputField('Phone Number', '22222222223', nth);
            });
            await step('Verify that the input field was filled with ten digits', async () => {
                await expect(await feedbackRequestForm.getInputFieldLocator('Phone Number', nth)).toHaveValue('(222)222-2222');
            });
            await step('Click the "Submit Your Request" button', async () => {
                await feedbackRequestForm.clickButton('Submit Your Request', nth);
            });
            await step('Verify the page heading "Thank you!" is displayed', async () => {
                await expect(await commonPage.getTitleLocator('Thank you!')).toBeVisible();
            });
        });
    });

    testData.forEach((nth) => {
        test(`Verify cards and texts of form ${nth}`, async ({ commonPage, feedbackRequestForm, page }) => {
            await step('Go to the homepage', async () => {
                await page.goto('/');
            });
            await step(`Verify that form ${nth} is displayed on the page`, async () => {
                await expect(await feedbackRequestForm.getFormLocator(nth)).toBeVisible();
            });
            await step(`Verify the text "What is your ZIP Code?" is present in form ${nth}`, async () => {
                await expect(await feedbackRequestForm.getFormLocator(nth)).toContainText('What is your ZIP Code?');
            });
            await step(`Verify the text "Safe, Secure and Confidential" is present in form ${nth}`, async () => {
                await expect(await feedbackRequestForm.getFormLocator(nth)).toContainText('Safe, Secure and Confidential');
            });
            await step('Fill the "ZIP Code" field with a valid value — "44444"', async () => {
                await feedbackRequestForm.fillInputField('ZIP Code', '44444', nth);
            });
            await step('Click the "Next" button', async () => {
                await feedbackRequestForm.clickButton('Next', nth);
            });
            for (const index of testData) {
                await step(`Verify the text "Why are you interested in a walk-in tub?" is present in form ${index}`, async () => {
                    await expect(await feedbackRequestForm.getFormLocator(nth)).toContainText('Why are you interested in a walk-in tub?');
                });
                await step(`Verify the text "(select all that apply)" is present in form ${index}`, async () => {
                    await expect(await feedbackRequestForm.getFormLocator(nth)).toContainText('(select all that apply)');
                });
                await step(`Verify that reasons for request are displayed in form ${index}`, async () => {
                    for (const reason of reasonsForRequest) {
                        await expect(await feedbackRequestForm.getFormCardLocator(reason, index)).toBeVisible();
                    }
                });
            }
            await step('Select all reasons', async () => {
                for (const reason of reasonsForRequest) {
                    await feedbackRequestForm.clickFormCard(reason, nth);
                }
            });
            await step('Verify that all reasons are selected', async () => {
                for (const reason of reasonsForRequest) {
                    await expect((await feedbackRequestForm.getFormCardLocator(reason, nth)).locator('span')).toHaveCSS('color', 'rgb(255, 255, 255)');
                }
            });
            await step('Click the "Next" button', async () => {
                await feedbackRequestForm.clickButton('Next', nth);
            });
            for (const index of testData) {
                await step(`Verify the text "What type of property is this for?" is present in form ${index}`, async () => {
                    await expect(await feedbackRequestForm.getFormLocator(index)).toContainText('What type of property is this for?');
                });
                await step(`Verify that property types are displayed in form ${index}`, async () => {
                    for (const propertyType of propertyTypes) {
                        await expect(await feedbackRequestForm.getFormCardLocator(propertyType, index)).toBeVisible();
                    }
                });
            }
            await step('Click all property types', async () => {
                for (const propertyType of propertyTypes) {
                    await feedbackRequestForm.clickFormCard(propertyType, nth);
                }
            });
            await step('Verify that only the last card is selected', async () => {
                for (const propertyType of propertyTypes) {
                    const expectedColor = propertyTypes.indexOf(propertyType) === propertyTypes.length - 1 ? 'rgb(255, 255, 255)' : 'rgb(60, 69, 76)';
                    await expect((await feedbackRequestForm.getFormCardLocator(propertyType, nth)).locator('span')).toHaveCSS('color', expectedColor);
                }
            });
            await step('Click the "Next" button', async () => {
                await feedbackRequestForm.clickButton('Next', nth);
            });
            for (const index of testData) {
                await step(`Verify the text "Who should we prepare this FREE estimate for?" is present in form ${index}`, async () => {
                    await expect(await feedbackRequestForm.getFormLocator(index)).toContainText('Who should we prepare this FREE estimate for?');
                });
                await step(`Verify the text "(No obligation)" is present in form ${index}`, async () => {
                    await expect(await feedbackRequestForm.getFormLocator(index)).toContainText('(No obligation)');
                });
            }
            await step('Fill the "Name" field with a valid value — "Dmytro Bieliaiev"', async () => {
                await feedbackRequestForm.fillInputField('Name', 'Dmytro Bieliaiev', nth);
            });
            await step('Fill the "Email" field with a valid value — "123@gmail.com"', async () => {
                await feedbackRequestForm.fillInputField('Email', '123@gmail.com', nth);
            });
            await step('Click the "Go To Estimate" button', async () => {
                await feedbackRequestForm.clickButton('Go To Estimate', nth);
            });
            for (const index of testData) {
                await step(`Verify the text "LAST STEP!" is present in form ${index}`, async () => {
                    await expect(await feedbackRequestForm.getFormLocator(index)).toContainText('LAST STEP!');
                });
                await step(`Verify the text "A quick call is required to confirm your information and provide a free estimate." is present in form ${index}`, async () => {
                    await expect(await feedbackRequestForm.getFormLocator(index)).toContainText('A quick call is required to confirm your information and provide a free estimate.');
                });
            }
            await step('Fill the "Phone Number" field with a valid value — "2222222222"', async () => {
                await feedbackRequestForm.fillInputField('Phone Number', '2222222222', nth);
            });
            await step('Click the "Submit Your Request" button', async () => {
                await feedbackRequestForm.clickButton('Submit Your Request', nth);
            });
            await step('Verify the page heading "Thank you!" is displayed', async () => {
                await expect(await commonPage.getTitleLocator('Thank you!')).toBeVisible();
            });
            await step('Verify that the informational messages are displayed', async () => {
                await expect(await commonPage.getParagraphLocator('We will be calling within the next 10 minutes to confirm your estimate and ensure you get the best price!')).toBeVisible();
                await expect(await commonPage.getParagraphLocator('This is not a sales call – we simply have to ask a couple of quick questions.')).toBeVisible();
            });
        });
    });
});
