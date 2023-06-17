import type { AWS } from '@serverless/typescript'

export default function(config: AWS): AWS {
    const sls: AWS = config;
    sls.frameworkVersion = '3'
    sls.provider.runtime = 'nodejs16.x'
    sls.provider.region = 'us-east-1'
    sls.provider.timeout = 10
    sls.provider.stage = 'dev'
    //sls.provider.tracing = { lambda: false}

    return sls;
}