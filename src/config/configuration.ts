import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  awsS3Bucket: process.env.AWS_S3_BUCKET,

  awsCredential: {
    awsRegion: process.env.AWS_REGION,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsAccessSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
}));
