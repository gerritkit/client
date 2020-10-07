import { UnionToIntersection } from '@qiwi/substrate'

import {
  accessRightsEndpoints,
  accountEndpoints,
  attentionSetEndpoints,
  branchEndpoints,
  changeEditEndpoints,
  changeEndpoints,
  childProjectEndpoints,
  commitEndpoints,
  configEndpoints,
  dashboardEndpoints,
  documentationSearchEndpoints,
  groupEndpoints,
  groupMemberEndpoints,
  labelEndpoints,
  pluginEndpoints,
  projectEndpoints,
  reviewerEndpoints,
  revisionEndpoints,
  revisionReviewerEndpoints,
  subgroupEndpoints,
  tagEndpoints,
} from './api'
import { Core } from './core'

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

export { VERSION } from './version'
