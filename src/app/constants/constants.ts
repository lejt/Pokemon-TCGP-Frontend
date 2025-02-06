export enum STORAGE {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
}

// const currentEnv = process.env['something'];
const currentEnv = 'development';

export const getHost = () => {
  let host = '';

  switch (currentEnv) {
    // case 'production':
    //   host = 'https://';
    //   break;
    case 'development':
      host = 'http://localhost:3000';
      break;
    default:
      host = 'https://';
      break;
  }

  return host;
};

export const getBackEndHost = (): string => {
  const host = 'http://localhost:3001';
  return host;
};
