export class BookTopic {

    private name = 'book-topic-${self:provider.stage}.fifo';
    
    getName(): string {
        return this.name
    }

    getARN(): string {
      return 'arn:aws:sns:${aws:region}:${aws:accountId}:' + this.name;
    }

    getResource() {
      return {
        BookTopic: {
            Type: 'AWS::SNS::Topic',
            Properties: {
                DisplayName: this.name.replace(/.fifo/, ''),
                TopicName: this.name,
                FifoTopic: true,
                Tags : [
                    { Key : "squad", Value : "core" },
                    { Key : "app", Value : "book-store" }
                ]
          }
        }
      }
    }

    getRoles() {
        return {
            Effect: 'Allow',
            Resource: [
              'arn:aws:sns:${aws:region}:${aws:accountId}:' + this.name, 
              'arn:aws:lambda:${aws:region}:${aws:accountId}:function:bookstore-books-${self:provider.stage}-create-book',
              'arn:aws:lambda:${aws:region}:${aws:accountId}:function:bookstore-books-${self:provider.stage}-update-book',
              'arn:aws:lambda:${aws:region}:${aws:accountId}:function:bookstore-books-${self:provider.stage}-delete-book',
            ],
            Action: [
              'SNS:Publish',
              'SNS:SetTopicAttributes'
           ],
          }
    }
}