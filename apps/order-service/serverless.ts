import type { AWS } from '@serverless/typescript'
import functions from './src/handlers'
import serverlessSidecar from '../../packages/serverless-sidecar'

const slsConfig: AWS = {
    service: 'bookstore-orders',
    provider: {
        name: 'aws'
    },
    functions
}

module.exports = serverlessSidecar(slsConfig)