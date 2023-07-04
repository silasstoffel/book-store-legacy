import { APIGatewayEvent } from "aws-lambda";
import { DynamoBookRepository } from "../../repositories/dynamo-book.repository";
import { DynamoDB } from "aws-sdk";
import { LoadAllBooksUseCase } from "../../uses-cases/load-all-books.use-case";

const repository = new DynamoBookRepository(
    new DynamoDB.DocumentClient(),
    process.env.BOOKS_TABLE_NAME! as string,
);
const useCase = new LoadAllBooksUseCase(repository);

export const main = async (event: APIGatewayEvent) => {
    const books = await useCase.execute();

    return {
        statusCode: 200,
        body: JSON.stringify(books)
    }
};