export type TGroupAuditEventInfo = {
  member: any
  type: any
  user: any
  date: any
}

export type TGroupInfo = {
  id: any
  name: any
  url?: any
  options: any
  description: any
  group_id: any
  owner: any
  owner_id: any
  created_on: any
  _more_groups: any
  members: any
  includes: any
}

export type TGroupInput = {
  name?: any
  uuid?: any
  description?: any
  visible_to_all?: any
  owner_id?: any
  members?: any
}

export type TGroupOptionsInfo = {
  visible_to_all: any
}

export type TGroupOptionsInput = {
  visible_to_all: any
}

export type TGroupsInput = {
  _one_group?: any
  groups?: any
}

export type TMembersInput = {
  _one_member?: any
  members?: any
}
