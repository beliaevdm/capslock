import test from '../fixtures/all.fixtures';

/**
 * Add a step number to each test step
 */
export function createStep<T>(): (description: string, callback: () => Promise<T>) => Promise<T> {
    let stepNumber = 1;
    return async function step(description: string, callback: () => Promise<T>): Promise<T> {
        const result = await test.step(`${stepNumber}. ${description}`, callback);
        stepNumber++;
        return result;
    };
}
