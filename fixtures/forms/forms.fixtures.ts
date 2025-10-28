import { test as base } from '@playwright/test';

import { FeedbackRequestForm } from '../../pages/feedbackRequestForm/feedbackRequestForm.page';

type ExtendedFixtures = {
    feedbackRequestForm: FeedbackRequestForm;
};

// Form fixtures
const formsFixtures = base.extend<ExtendedFixtures>({
    // Fixture for the feedback request form
    feedbackRequestForm: async ({ page, isMobile }, use) => {
        await use(new FeedbackRequestForm(page, isMobile));
    },
});

formsFixtures.extend<{}>({});
export default formsFixtures;
