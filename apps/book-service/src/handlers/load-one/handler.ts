import { APIGatewayProxyEvent } from "aws-lambda";
import { DynamoBookRepository } from "../../repositories/dynamo-book.repository";
import { DynamoDB } from "aws-sdk";
import { LoadOneBooksUseCase } from "../../uses-cases/load-one.use-case";

const repository = new DynamoBookRepository(
    new DynamoDB.DocumentClient(),
    process.env.BOOKS_TABLE_NAME! as string,
);
const useCase = new LoadOneBooksUseCase(repository);

export const main = async (event: APIGatewayProxyEvent) => {
    const id = event.pathParameters?.id as string;
    const book = await useCase.execute(id);
    
    return { statusCode: 200, body: JSON.stringify(book) }
};