import type { AWS } from '@serverless/typescript'
import functions from './src/handlers'
import serverlessSidecar from '../../packages/serverless-sidecar'
import { BooksTable } from './src/infra/books-dynamo-table'

const booksTable = new BooksTable()

const slsConfig: AWS = {
    service: 'bookstore-books',
    provider: {
        name: 'aws',
        environment: {
            BOOKS_TABLE_NAME: 'books',
        },
    },
    resources: {
        Resources: {
            ...booksTable.getResource()
        }
    },
    functions
}

module.exports = serverlessSidecar(slsConfig)