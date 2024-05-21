const requiredEnvVariables = [
    'BACKCHECK_URL',
    'BACKCHECK_API_ROUTE',
    'BACKCHECK_API_KEY',
    'SECRET_KEY',
    'AUTH0_BASE_URL',
    'ENCODING_ALGORITHM',
    'AUDIENCE',
];

requiredEnvVariables.forEach((variable) => {
    if (!process.env[variable]) {
        throw new Error(`Environment variable ${variable} is missing`);
    }
});


export const BACKCHECK_URL = process.env.BACKCHECK_URL;
export const BACKCHECK_API_ROUTE = process.env.BACKCHECK_API_ROUTE;
export const BACKCHECK_API_KEY = process.env.BACKCHECK_API_KEY;
export const SECRET_KEY = process.env.SECRET_KEY;
export const AUTH0_BASE_URL = process.env.AUTH0_BASE_URL;
export const ENCODING_ALGORITHM = process.env.ENCODING_ALGORITHM ?? "Another one bites the dust!";
export const AUDIENCE = process.env.AUDIENCE ?? "Mario";


