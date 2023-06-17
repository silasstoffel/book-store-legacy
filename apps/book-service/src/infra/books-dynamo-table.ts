export class BooksTable {

    private tableName = 'books-${self:provider.stage}';
    
    getName(): string {
        return this.tableName
    }

    getResource() {
      return {
        BooksTable: {
            Type: 'AWS::DynamoDB::Table',
            Properties: {
                TableName: this.tableName,

                AttributeDefinitions: [
                    {
                        AttributeName: 'id',
                        AttributeType: 'S'
                    }
                ],
                KeySchema: [
                    {
                        AttributeName: 'id',
                        KeyType: 'HASH',
                    }
                ],
                BillingMode: 'PROVISIONED',
                ProvisionedThroughput: {
                    ReadCapacityUnits: 1,
                    WriteCapacityUnits: 1
                },
                Tags : [
                    {
                       Key : "squad",
                       Value : "core"
                    },
                    {
                        Key : "app",
                        Value : "book-store"
                    }
                ]
            }
        }
      }
    }
}