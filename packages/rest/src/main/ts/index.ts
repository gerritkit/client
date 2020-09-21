import { Core } from './core'
import { repos } from './repos'
import { commit } from './commit'

export const GerritKit = Core.plugin(commit, repos)

export type GerritKit = InstanceType<typeof Core>
