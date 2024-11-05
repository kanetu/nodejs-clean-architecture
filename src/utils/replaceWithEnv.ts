export const replaceWithEnv = (variable: keyof NodeJS.ProcessEnv) => {
  return process.env[variable] || '';
};
