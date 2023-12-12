import ERRORS from './errors';

export const API_VERSIONS = ['1'];

export const API_VERSION_HEADER = 'x-api-version';

const ALL_ERRORS = Object.keys(ERRORS)
  .map((k) => {
    const obj = ERRORS[k];
    if (typeof obj === 'string') return obj;

    const internalKeys = Object.keys(obj).map((k2) => {
      const obj2 = obj[k2];
      if (typeof obj2 === 'string') return obj2;
      return '';
    });
    return internalKeys;
  })
  .flat()
  .filter((value) => !!value);

export const IGNORED_SENTRY_ERRORS = [...ALL_ERRORS, 'ThrottlerException: Too Many Requests'];
