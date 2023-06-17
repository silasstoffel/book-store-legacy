import { APIGatewayEvent } from "aws-lambda";

export const main = async (event: APIGatewayEvent) => {
    return {
        statusCode: 201,
        body: JSON.stringify({ message: 'Created', data: event.body })
    }
};