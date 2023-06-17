export default {
    handler: `handler.main`,
    events: [
        {
            http: {
                method: 'POST',
                path: '/v1/books'
            }
        }
    ]
}