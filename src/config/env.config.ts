import dotenv from 'dotenv';

dotenv.config();

const developmentOrigins = [
  'http://localhost:3000',
  'https://localhost:3000',
  'http://localhost:5173',
  'https://localhost:5173'
];

const productionOrigins = [
  'https://d15ju2xcsjey0j.cloudfront.net',
  'https://clinic-app.mufasa.ca'
];

export const config = {
  port: process.env.PORT || 8000,
  jwtSecret: process.env.JWT_SECRET || 'asdjafskljf',
  isDevelopment: process.env.NODE_ENV !== 'production',
  allowedOrigins: process.env.NODE_ENV === 'production' ? productionOrigins : developmentOrigins
}; 