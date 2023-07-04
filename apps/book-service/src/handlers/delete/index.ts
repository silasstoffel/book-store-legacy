import { handlerPath } from "../../../../../packages/serverless-util";

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'DELETE',
                path: '/v1/books/{id}'
            }
        }
    ]
}