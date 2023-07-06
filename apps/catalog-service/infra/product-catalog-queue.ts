export class ProductCatalogQueue {

    private name = 'sync-product-catalog-${self:provider.stage}.fifo';
    
    getName(): string {
        return this.name
    }

    getQueueURL(): string {
      return 'https://sqs.${aws:region}.amazonaws.com/${aws:accountId}/' + this.name
    }

    getResource() {
      return {
        syncProductCatalogQueue: {
            Type: 'AWS::SQS::Queue',
            Properties: {
                QueueName: this.name,
                FifoQueue: true,
                ContentBasedDeduplication: true,
                VisibilityTimeout: 40,
                Tags : [
                    { Key : "squad", Value : "core" },
                    { Key : "app", Value : "book-store" }
                ]
          }
        },

        QueuePolicy: {
          DependsOn: ['syncProductCatalogQueue'],
          Type: 'AWS::SQS::QueuePolicy',
          Properties: {
            Queues: [
              { Ref: "syncProductCatalogQueue" }
            ],
            PolicyDocument: {
              Version: "2012-10-17",
              Statement: [
                {
                  Sid: "allow-sns-messages",
                  Effect: "Allow",
                  Principal: {"Service": "sns.amazonaws.com"},
                  Action: "sqs:SendMessage",
                  Resource: {"Fn::GetAtt": ["syncProductCatalogQueue", "Arn"]},
                  Condition: {
                    ArnEquals: {
                      'aws:SourceArn': 'arn:aws:sns:${aws:region}:${aws:accountId}:book-topic-${self:provider.stage}.fifo'
                    }
                  }
                }
              ]
            }
          }
        }
      }
    }

    getOutputs() {
      return {
        syncProductCatalogQueueArn: {
          Value: {
            'Fn::GetAtt': ['syncProductCatalogQueue', 'Arn'],
          },
          Export: {
            Name: '${self:service}-${self:provider.stage}-sync-product-catalog-queue-arn',
          },
        },
      }
    }    

    getRoles() {
        return {
          Effect: 'Allow',
          Principal: {
            Service: "sns.amazonaws.com"
          },
          Action: 'sqs:SendMessage',
          Resource: {
            'Fn::GetAtt': ['syncProductCatalogQueue', 'Arn']
          },
          Condition: {
              ArnEquals: {
                'aws:SourceArn': 'arn:aws:sns:${aws:region}:${aws:accountId}:book-topic-${self:provider.stage}.fifo'
              }
          }
      }
    }
}