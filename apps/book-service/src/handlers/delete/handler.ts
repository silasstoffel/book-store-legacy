import { DynamoDB } from "aws-sdk";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { DynamoBookRepository } from "../../repositories/dynamo-book.repository";
import { DeleteBookUseCase } from "../../uses-cases/delete-book.use-case";

const repository = new DynamoBookRepository(
    new DynamoDB.DocumentClient(),
    process.env.BOOKS_TABLE_NAME! as string,
);
const useCase = new DeleteBookUseCase(repository);

export const main = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters?.id as string;
    await useCase.execute(id);
    
    return { statusCode: 204, body: '' }
};