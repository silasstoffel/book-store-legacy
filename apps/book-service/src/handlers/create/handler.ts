import { APIGatewayEvent } from "aws-lambda";
import { DynamoBookRepository } from "../../repositories/dynamo-book.repository";
import { CreateBookUseCase } from "../../uses-cases/create-book.use-case";
import { Book } from "../../entities/book.entity";
import DynamoDB from "aws-sdk/clients/dynamodb";

const repository = new DynamoBookRepository(
    new DynamoDB.DocumentClient(),
    process.env.BOOKS_TABLE_NAME! as string,
);
const useCase = new CreateBookUseCase(repository);

export const main = async (event: APIGatewayEvent) => {
    const data = JSON.parse(event?.body || '{}') as Book; 
    const entity = Book.build(data)
    const record = await useCase.execute(entity);

    return { statusCode: 201, body: JSON.stringify(record) }
};