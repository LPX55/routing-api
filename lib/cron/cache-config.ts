import { Protocol } from '@uniswap/router-sdk'
import { ChainId, V3SubgraphProvider } from '@forge-trade/smart-order-router'

export const chainProtocols = [
  {
    protocol: Protocol.V3,
    chainId: ChainId.EVMOS,
    timeout: 90000,
    provider: new V3SubgraphProvider(ChainId.EVMOS, 3, 90000),
  },
]
