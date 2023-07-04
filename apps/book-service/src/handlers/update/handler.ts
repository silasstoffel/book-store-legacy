import { APIGatewayEvent } from "aws-lambda";
import { DynamoBookRepository } from "../../repositories/dynamo-book.repository";
import { UpdateBookUseCase } from "../../uses-cases/update-book.use-case";
import { Book } from "../../entities/book.entity";
import DynamoDB from "aws-sdk/clients/dynamodb";

const repository = new DynamoBookRepository(
    new DynamoDB.DocumentClient(),
    process.env.BOOKS_TABLE_NAME! as string,
);
const useCase = new UpdateBookUseCase(repository);

export const main = async (event: APIGatewayEvent) => {
    const id = event.pathParameters?.id as string;
    const data = JSON.parse(event?.body || '{}') as Book; 
    const entity = Book.build(data)
    const record = await useCase.execute(id, entity);

    return { statusCode: 200, body: JSON.stringify(record) }
};