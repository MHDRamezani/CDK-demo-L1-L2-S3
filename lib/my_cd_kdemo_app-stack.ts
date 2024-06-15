import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket, EventType } from 'aws-cdk-lib/aws-s3';
import { SqsDestination } from 'aws-cdk-lib/aws-s3-notifications';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class MyCdKdemoAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // L1 construct S3
    const level1S3Bucket = new CfnBucket(this, 'MyFirstLevel1ConstructBucket', {
      versioningConfiguration: {
        status: "Enabled"
      }
    });

    // L2 construct S3
    const level2S3Bucket = new Bucket(this, 'MyFirstLevel2ConstructBucket', {
      bucketName: "mohammad-myfirstlevel2constructbucket",
      versioned: true
    });

    const queue = new Queue(this, 'MyQueue', {
      queueName: 'MyQueue'
    });

    level2S3Bucket.addEventNotification(EventType.OBJECT_CREATED, new SqsDestination(queue))
  }
}
