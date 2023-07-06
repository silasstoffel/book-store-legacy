import { SNS } from 'aws-sdk';
import { Book } from '../entities/book.entity';

export class BookEventPublisher {
    
    constructor(
        private readonly awsRegion: string,
        private readonly topicARN: string
    ) {}

    public async publish(eventType: string, book: Book): Promise<void> {
       const client = new SNS({
            region: this.awsRegion,
            apiVersion: '2010-03-31'
       });

       const message = {
            eventType,
            occurredAt: new Date(),
            data: book
       }

       const data = {
            Message: JSON.stringify(message),
            TopicArn: this.topicARN,
            MessageGroupId: book.id,
            MessageDeduplicationId: `${book.id}-${Date.now()}`,
            MessageAttributes: {
                eventType: {
                    DataType: 'String',
                    StringValue: 'eventType',
                },
                entity: {
                    DataType: 'String',
                    StringValue: 'books',
                },
            }
       }

       await client.publish(data).promise();
    }
}