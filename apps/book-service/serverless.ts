import type { AWS } from '@serverless/typescript'
import functions from './src/handlers'
import serverlessSidecar from '../../packages/serverless-sidecar'
import { BooksTable } from './infra/books-dynamo-table'
import { BookTopic } from './infra/book-topic'

const booksTable = new BooksTable()
const bookTopic = new BookTopic()

const slsConfig: AWS = {
    service: 'bookstore-books',
    provider: {
        name: 'aws',
        environment: {
            BOOKS_TABLE_NAME: booksTable.getName(),
            BOOK_TOPIC_ARN: bookTopic.getARN()
        },
        iam: {
            role: {
                statements: [
                    booksTable.getRoles(),
                    bookTopic.getRoles()
                ]
            }
        }
    },
    resources: {
        Resources: {
            ...booksTable.getResource(),
            ...bookTopic.getResource()
        }
    },
    functions
}

module.exports = serverlessSidecar(slsConfig)