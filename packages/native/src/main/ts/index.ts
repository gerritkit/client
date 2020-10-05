import { Core } from './core'
import { UnionToIntersection } from '@qiwi/substrate'

import {
  accountEndpoints,
  tagEndpoints,
  labelEndpoints,
  dashboardEndpoints,
  childProjectEndpoints,
  commitEndpoints,
  branchEndpoints,
  projectEndpoints,
  pluginEndpoints,
  subgroupEndpoints,
  groupMemberEndpoints,
  groupEndpoints,
  documentationSearchEndpoints,
  configEndpoints,
  attentionSetEndpoints,
  revisionReviewerEndpoints,
  revisionEndpoints,
  changeEditEndpoints,
  reviewerEndpoints,
  changeEndpoints,
  accessRightsEndpoints,
} from './api'

export const plugins = [
  accountEndpoints,
  tagEndpoints,
  labelEndpoints,
  dashboardEndpoints,
  childProjectEndpoints,
  commitEndpoints,
  branchEndpoints,
  projectEndpoints,
  pluginEndpoints,
  subgroupEndpoints,
  groupMemberEndpoints,
  groupEndpoints,
  documentationSearchEndpoints,
  configEndpoints,
  attentionSetEndpoints,
  revisionReviewerEndpoints,
  revisionEndpoints,
  changeEditEndpoints,
  reviewerEndpoints,
  changeEndpoints,
  accessRightsEndpoints,
]

export const GerritNative = Core.plugin(...plugins)
export type GerritNative = InstanceType<typeof Core>

export type GerritNativeInstance = UnionToIntersection<
  ReturnType<typeof plugins[number]>
>
// const a = {} as GerritNativeInstance
// a.commitEndpoints.getCommit({args: {
//   projectName: '132',
//     commitId: 'efef'
//   }})

export { VERSION } from './version'
