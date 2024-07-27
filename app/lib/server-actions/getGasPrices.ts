'use server'
import { createPublicClient, http } from 'viem'
import { polygonAmoy, sepolia } from 'viem/chains'
import viemErrorProcessing from '../viemErrorProcessing'

export async function gasPrices() {
  const publicClient = createPublicClient({
    chain: polygonAmoy,
    transport: http(process.env.ALCHEMY_AMOY_URL),
  })
  try {
    const { maxFeePerGas, maxPriorityFeePerGas } =
      await publicClient.estimateFeesPerGas()
    return { status: true, maxFeePerGas, maxPriorityFeePerGas }
  } catch (error) {
    return { status: false, error: viemErrorProcessing(error) }
  }
}
