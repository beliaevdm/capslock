/**
 * Button names
 */
export type ButtonsNames = 'Next' | 'Go To Estimate' | 'Submit Your Request';

/**
 * Input field names
 */
export type InputFields = 'Name' | 'Email' | 'ZIP Code' | 'Phone Number';

/**
 * Request reasons
 */
export const reasonsForRequest = ['Independence', 'Safety', 'Therapy', 'Other'] as const;

/**
 * Reason types
 */
export type ReasonsForRequest = (typeof reasonsForRequest)[number];

/**
 * Property categories
 */
export const propertyTypes = ['Owned House / Condo', 'Rental Property', 'Mobile Home'] as const;

/**
 * Property type
 */
export type PropertyTypes = (typeof propertyTypes)[number];
