import { FILE_SYSTEM_PATHS, MT_PATHS } from '@/config/config'
import { spawnSync } from 'child_process'

const swapLine = `/mt/swapfile swap swap defaults 0 0`

export const ensureFstabEntries = (fileSystem: string, fileSystem2 = '') => {
  const mtLineSingle = `${fileSystem}        ${MT_PATHS.ROOT}     ext4 auto 0 0`
  const mtLineForDouble = `${fileSystem}        ${MT_PATHS.LEDGER}     ext4 auto 0 0
${fileSystem2}        ${MT_PATHS.ACCOUNTS}     ext4 auto 0 0
`
  const mtLine = fileSystem2 !== '' ? mtLineForDouble : mtLineSingle
  const lines = [swapLine, mtLine]
  const output = spawnSync(`cat /etc/fstab`, {
    shell: true,
    encoding: 'utf8',
  })

  const fstabContent = output.stdout

  let linesToAdd = []

  for (let line of lines) {
    if (!fstabContent.includes(line)) {
      linesToAdd.push(line)
    }
  }

  if (linesToAdd.length) {
    const addCmd = `echo "${linesToAdd.join('\n')}" | sudo tee -a /etc/fstab`
    spawnSync(addCmd, {
      shell: true,
      encoding: 'utf8',
    })
    const reloadCmd = `sudo mount --all --verbose`
    spawnSync(reloadCmd, {
      shell: true,
      encoding: 'utf8',
    })
    console.log(`Added lines to /etc/fstab: \n${linesToAdd.join('\n')}`)
  } else {
    console.log('All lines are already present in /etc/fstab')
  }
}
