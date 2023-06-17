import { APIGatewayEvent } from "aws-lambda";

export const main = async (event: APIGatewayEvent) => {
    const books = [
        { id: 1, title:"Book 1" },
        { id: 2, title:"Book 2" },
        { id: 3, title:"Book 3" }
    ];
    
    return {
        statusCode: 200,
        body: JSON.stringify(books)
    }
};