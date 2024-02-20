import {
  ObjectCannedACL,
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';

export interface S3PutObjectCommandParams {
  Bucket: string;
  Key: string;
  Body: any;
  ACL: ObjectCannedACL;
  Metadata?: Record<string, string>;
}

export class SpacesFileUploader {
  private client: S3Client = new S3Client({
    endpoint: process.env.NEXT_PUBLIC_SPACES_ENDPOINT,
    forcePathStyle: false,
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_SPACES_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.NEXT_PUBLIC_SPACES_SECRET_KEY as string,
    },
  });

  public async uploadObject(params: S3PutObjectCommandParams): Promise<PutObjectCommandOutput> {
    try {
      const data = await this.client.send(new PutObjectCommand(params));
      return data;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
