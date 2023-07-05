import { APIGatewayEvent } from "aws-lambda";
import { DynamoBookRepository } from "../../repositories/dynamo-book.repository";
import { UpdateBookUseCase } from "../../uses-cases/update-book.use-case";
import { Book } from "../../entities/book.entity";
import DynamoDB from "aws-sdk/clients/dynamodb";
import { BookEventPublisher } from "../../services/book-event-publisher";

const repository = new DynamoBookRepository(
    new DynamoDB.DocumentClient(),
    process.env.BOOKS_TABLE_NAME! as string,
);

const event = new BookEventPublisher(
    process.env.AWS_REGION! as string,
    process.env.BOOK_TOPIC_ARN! as string,
)

const useCase = new UpdateBookUseCase(repository, event);

export const main = async (event: APIGatewayEvent) => {
    console.log('Environment: ', JSON.stringify(process.env, null, 2));

    const id = event.pathParameters?.id as string;
    const data = JSON.parse(event?.body || '{}') as Book; 
    const entity = Book.build(data)
    const record = await useCase.execute(id, entity);

    return { statusCode: 200, body: JSON.stringify(record) }
};