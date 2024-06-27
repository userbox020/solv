import { ELSOL_MINT_ADDRESS, getAllKeyPaths } from '@/config/config'
import { SOLANA_RPC_URL } from '@/index'
import chalk from 'chalk'
import { execSync } from 'child_process'
import { homedir } from 'os'

const getElSOLBalance = async () => {
  try {
    const homeDir = homedir()
    const home = homeDir.includes('solv')
      ? '/home/solv'
      : `${homeDir}/solvKeys/upload`
    const { mainnetValidatorAuthorityKey } = getAllKeyPaths(home)
    const cmd = `spl-token balance ${ELSOL_MINT_ADDRESS} --fee-payer ${mainnetValidatorAuthorityKey} --url ${SOLANA_RPC_URL}`
    const balance = execSync(cmd).toString().trim()
    return Number(balance)
  } catch (error) {
    console.log(chalk.red(`Error: ${error}`))
    console.log(chalk.yellow(`You might need to install the Solana SPL CLI:\n`))
    console.log(chalk.white(`$ cargo install spl-token-cli`))
    return 0
  }
}

export default getElSOLBalance
