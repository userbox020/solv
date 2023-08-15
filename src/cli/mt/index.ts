import { program } from '@/index'
import { mount } from './mount'
import { spawnSync } from 'child_process'

export const mountCommands = () => {
  program
    .command('mt')
    .description('Solana Mount Command')
    .option('-p,--path', 'File System Path e.g /sda/vda', '/sda/vda')
    .action((options: any) => {
      mount(options.path)
    })

  program
    .command('umt')
    .description('Solana Umount Command')
    .option('-p,--path', 'File System Path e.g /sda/vda', '/sda/vda')
    .action((options: any) => {
      mount(options.path)
    })

  program
    .command('reload')
    .description('Mount Reload Command')
    .action(() => {
      const cmd = `sudo mount --all --verbose`
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    })
}
