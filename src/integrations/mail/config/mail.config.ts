import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => {
  return {
    gmail: process.env.GMAIL_ACCOUNT,
    password: process.env.GMAIL_PASSWORD,
  };
});
