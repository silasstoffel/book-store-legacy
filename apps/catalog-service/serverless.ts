import type { AWS } from '@serverless/typescript'
import serverlessSidecar from '../../packages/serverless-sidecar'
import { ProductCatalogQueue } from './infra/product-catalog-queue'

const syncProductCatalog = new ProductCatalogQueue();

const slsConfig: AWS = {
    service: 'bookstore-catalog',
    provider: {
        name: 'aws',
        memorySize: 128,
        environment: {
            PRODUCT_CATALOG_QUEUE_URL: syncProductCatalog.getQueueURL(),
        },
        iam: {
            role: {
                statements: [
                    syncProductCatalog.getRoles()
                ]
            }
        }
    },
    resources: {
        Resources: {
            ...syncProductCatalog.getResource()
        },
        Outputs: {
            ...syncProductCatalog.getOutputs()
        }
    }
}

module.exports = serverlessSidecar(slsConfig)


