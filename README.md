## Environment Setup

1. Create a local copy of the project:`git clone `
2. Install NodeJS [Download](https://nodejs.org/en)
3. Install project dependencies:`npm i`
4. Install browsers: `npx playwright install`

## Running Tests

Commands to run tests:

-   `npm run all` - runs tests on both desktop and mobile
-   `npm run desktop` - runs tests on desktop
-   `npm run mobile` - runs tests on mobile
-   `npx playwright show-report` - opens the latest report

The selected scenarios were chosen because they cover functionality with high business value and represent the main element for establishing contact between the business and the end user.

To improve the project, it’s recommended to add Husky, ESLint, Prettier, and tsconfig, as well as use the faker-js library to generate test data.
