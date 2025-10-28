import { CommonPage } from '../../pages/common/common.page';
import formsFixtures from '../forms/forms.fixtures';

type ExtendedFixtures = {
    commonPage: CommonPage;
};

// Common fixtures
const commonFixtures = formsFixtures.extend<ExtendedFixtures>({
    // Common page fixtures
    commonPage: async ({ page, isMobile }, use) => {
        await use(new CommonPage(page, isMobile));
    },
});

commonFixtures.extend<{}>({});
export default commonFixtures;
