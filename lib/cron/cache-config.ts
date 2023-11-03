import { Protocol } from '@uniswap/router-sdk'
import { V3SubgraphProvider } from '@orbitalapes/smart-order-router'

export const chainProtocols = [
  // V3.
  {
    protocol: Protocol.V3,
    chainId: 9001,
    timeout: 90000,
    provider: new V3SubgraphProvider(9001, 3, 90000),
  },
]