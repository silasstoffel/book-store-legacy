import type { AWS } from '@serverless/typescript'
import functions from './src/handlers'
import serverlessSidecar from '../../packages/serverless-sidecar'
import { BooksTable } from './infra/books-dynamo-table'

const booksTable = new BooksTable()

const slsConfig: AWS = {
    service: 'bookstore-books',
    provider: {
        name: 'aws',
        environment: {
            BOOKS_TABLE_NAME: booksTable.getName(),
        },
        iam: {
            role: {
                statements: [
                    booksTable.getRoles()
                ]
            }
        }
    },
    resources: {
        Resources: {
            ...booksTable.getResource()
        }
    },
    functions
}

module.exports = serverlessSidecar(slsConfig)