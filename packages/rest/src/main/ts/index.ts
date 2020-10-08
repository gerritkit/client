import { Core } from './core'
import { gitPlugin, orgsPlugin, reposPlugin } from './plugins'

const plugins = [gitPlugin, orgsPlugin, reposPlugin]
export const GerritKit = Core.plugin(...plugins)
export type GerritKit = InstanceType<typeof Core>
