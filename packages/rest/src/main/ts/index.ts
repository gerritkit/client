import { GerritKitCore } from './gerritKitCore'
import { projectsEndpoints } from './projectsEndpoints'
import { commitEndpoints } from './commitEndpoints'
import { branchEndpoints } from './branchEndpoints'

export const GerritKit = GerritKitCore.plugin(
  branchEndpoints,
  commitEndpoints,
  projectsEndpoints,
)

export type GerritKit = InstanceType<typeof GerritKitCore>
