import getSolanaVersion from '@/cli/epochTimer/getSolanaVersion'

const SOLANA_CLI = 'solana-validator'
const AGAVE_CLI = 'agave-validator'

export type SolanaCLI = typeof SOLANA_CLI | typeof AGAVE_CLI

const getSolanaCLI = (): SolanaCLI => {
  try {
    const solanaVersion = getSolanaVersion()
    console.log(solanaVersion)
    // convert solanaVersion to number. e.g. 1.2.0 to 120
    const hasVersion20 = solanaVersion.includes('2.0')
    if (hasVersion20) {
      return AGAVE_CLI
    }
    return SOLANA_CLI
  } catch (error) {
    console.error(error)
    return SOLANA_CLI
  }
}

export default getSolanaCLI
