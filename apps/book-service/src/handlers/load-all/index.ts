export default {
    handler: `handler.main`,
    events: [
        {
            http: {
                method: 'GET',
                path: '/v1/books'
            }
        }
    ]
}