## groupEndpoints

### native.groupEndpoints.listGroups(input: TInput)

#### inputs:

```typescript
type TInput = {
  params: { regex?: string; substring?: string }
}
```

#### returns:

```typescript
type TGroupInfo = {
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
```

Lists the groups accessible by the caller. This is the same as
using the ls-groups command over SSH,
and accepts the same options as query parameters.

As result a map is returned that maps the group names to
GroupInfo entries. The entries in the map are sorted
by group name.

,

### native.groupEndpoints.queryGroups(input: TInput)

#### inputs:

```typescript
type TInput = {}
```

#### returns:

```typescript
type TGroupInfo = {
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
```

Queries internal groups visible to the caller. The
query string must be
provided by the query parameter. The start and limit parameters
can be used to skip/limit results.

As result a list of GroupInfo entities is returned.

If the number of groups matching the query exceeds either the internal
limit or a supplied limit query parameter, the last group object has
a \_more_groups: true JSON field set.

,

### native.groupEndpoints.getGroup(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { groupId: string }
}
```

#### returns:

```typescript
type TGroupInfo = {
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
```

Retrieves a group.

As response a GroupInfo entity is returned that
describes the group.

,

### native.groupEndpoints.createGroup(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { groupName: string }
}
```

#### returns:

```typescript
type TGroupInfo = {
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
```

Creates a new Gerrit internal group.

In the request body additional data for the group can be provided as
GroupInput.

As response the GroupInfo entity is returned that
describes the created group.

If the group creation fails because the name is already in use, or the
UUID was specified and the UUID is already in use, the response is
“409 Conflict”.

,

### native.groupEndpoints.getGroupDetail(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { groupId: string }
}
```

#### returns:

```typescript
type TGroupInfo = {
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
```

Retrieves a group with the direct members and the
directly included groups.

As response a GroupInfo entity is returned that
describes the group.

,

### native.groupEndpoints.getGroupName(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { groupId: string }
}
```

#### returns:

```typescript

```

Retrieves the name of a group.

,

### native.groupEndpoints.renameGroup(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { groupId: string }
}
```

#### returns:

```typescript

```

Renames a Gerrit internal group.

The new group name must be provided in the request body.

This endpoint is only allowed for Gerrit internal groups; attempting to call on a
non-internal group will return 405 Method Not Allowed.

As response the new group name is returned.

If renaming the group fails because the new name is already in use the
response is “409 Conflict”.

,

### native.groupEndpoints.getGroupDescription(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { groupId: string }
}
```

#### returns:

```typescript

```

Retrieves the description of a group.

This endpoint is only allowed for Gerrit internal groups; attempting to call on a
non-internal group will return 405 Method Not Allowed.

If the group does not have a description an empty string is returned.

,

### native.groupEndpoints.setGroupDescription(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { groupId: string }
}
```

#### returns:

```typescript

```

Sets the description of a Gerrit internal group.

The new group description must be provided in the request body.

This endpoint is only allowed for Gerrit internal groups; attempting to call on a
non-internal group will return 405 Method Not Allowed.

As response the new group description is returned.

If the description was deleted the response is “204 No Content”.

,

### native.groupEndpoints.deleteGroupDescription(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { groupId: string }
}
```

#### returns:

```typescript

```

Deletes the description of a Gerrit internal group.

,

### native.groupEndpoints.getGroupOptions(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { groupId: string }
}
```

#### returns:

```typescript
type TGroupOptionsInfo = {
  visible_to_all: any
}
```

Retrieves the options of a group.

As response a GroupOptionsInfo entity is
returned that describes the options of the group.

,

### native.groupEndpoints.setGroupOptions(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { groupId: string }
  undefined
}
```

#### returns:

```typescript
type TGroupOptionsInfo = {
  visible_to_all: any
}
```

Sets the options of a Gerrit internal group.

The new group options must be provided in the request body as a
GroupOptionsInput entity.

This endpoint is only allowed for Gerrit internal groups; attempting to call on a
non-internal group will return 405 Method Not Allowed.

As response the new group options are returned as a
GroupOptionsInfo entity.

,

### native.groupEndpoints.getGroupOwner(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { groupId: string }
}
```

#### returns:

```typescript
type TGroupInfo = {
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
```

Retrieves the owner group of a Gerrit internal group.

This endpoint is only allowed for Gerrit internal groups; attempting to call on a
non-internal group will return 405 Method Not Allowed.

As response a GroupInfo entity is returned that
describes the owner group.

,

### native.groupEndpoints.setGroupOwner(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { groupId: string }
}
```

#### returns:

```typescript
type TGroupInfo = {
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
```

Sets the owner group of a Gerrit internal group.

The new owner group must be provided in the request body.

The new owner can be specified by name, by group UUID or by the legacy
numeric group ID.

This endpoint is only allowed for Gerrit internal groups; attempting to call on a
non-internal group will return 405 Method Not Allowed.

As response a GroupInfo entity is returned that
describes the new owner group.

,

### native.groupEndpoints.getAuditLog(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { groupId: string }
}
```

#### returns:

```typescript
type TGroupAuditEventInfo = {
  member: any
  type: any
  user: any
  date: any
}
```

Gets the audit log of a Gerrit internal group.

This endpoint is only allowed for Gerrit internal groups; attempting to call on a
non-internal group will return 405 Method Not Allowed.

As response a list of GroupAuditEventInfo
entities is returned that describes the audit events of the group. The
returned audit events are sorted by date in reverse order so that the
newest audit event comes first.

,

### native.groupEndpoints.indexGroup(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { groupId: string }
}
```

#### returns:

```typescript

```

Adds or updates the internal group in the secondary index.

,

## groupMemberEndpoints

### native.groupMemberEndpoints.listGroupMembers(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { groupId: string }
}
```

#### returns:

```typescript

```

Lists the direct members of a Gerrit internal group.

As result a list of detailed
AccountInfo entries is returned. The entries in the list are sorted by
full name, preferred email and id.

This endpoint is only allowed for Gerrit internal groups; attempting to call on a
non-internal group will return 405 Method Not Allowed.

To resolve the included groups of a group recursively and to list all
members the parameter recursive can be set.

Members from included external groups and from included groups which
are not visible to the calling user are ignored.

,

### native.groupMemberEndpoints.getGroupMember(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { groupId: string; accountId: string }
}
```

#### returns:

```typescript

```

Retrieves a group member.

As response a detailed
AccountInfo entity is returned that describes the group member.

,

### native.groupMemberEndpoints.addGroupMember(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { groupId: string; accountId: string }
}
```

#### returns:

```typescript

```

Adds a user as member to a Gerrit internal group.

This endpoint is only allowed for Gerrit internal groups; attempting to call on a
non-internal group will return 405 Method Not Allowed.

As response a detailed
AccountInfo entity is returned that describes the group member.

The request also succeeds if the user is already a member of this
group, but then the HTTP response code is 200 OK.

,

### native.groupMemberEndpoints.addGroupMembers(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { groupId: string }
  undefined
}
```

#### returns:

```typescript

```

OR

Adds one or several users to a Gerrit internal group.

The users to be added to the group must be provided in the request body
as a MembersInput entity.

As response a list of detailed
AccountInfo entities is returned that describes the group members that
were specified in the MembersInput. An
AccountInfo entity
is returned for each user specified in the input, independently of
whether the user was newly added to the group or whether the user was
already a member of the group.

,

### native.groupMemberEndpoints.removeGroupMember(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { groupId: string; accountId: string }
}
```

#### returns:

```typescript

```

Removes a user from a Gerrit internal group.

This endpoint is only allowed for Gerrit internal groups; attempting to call on a
non-internal group will return 405 Method Not Allowed.

,

### native.groupMemberEndpoints.removeGroupMembers(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { groupId: string }
  undefined
}
```

#### returns:

```typescript

```

Removes one or several users from a Gerrit internal group.

The users to be removed from the group must be provided in the request
body as a MembersInput entity.

,

## subgroupEndpoints

### native.subgroupEndpoints.listSubgroups(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { groupId: string }
}
```

#### returns:

```typescript
type TGroupInfo = {
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
```

Lists the direct subgroups of a group.

As result a list of GroupInfo entries is returned.
The entries in the list are sorted by group name and UUID.

This endpoint is only allowed for Gerrit internal groups; attempting to call on a
non-internal group will return 405 Method Not Allowed.

,

### native.subgroupEndpoints.getSubgroup(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { groupId: string; groupId1: string }
}
```

#### returns:

```typescript
type TGroupInfo = {
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
```

Retrieves a subgroup.

As response a GroupInfo entity is returned that
describes the subgroup.

,

### native.subgroupEndpoints.addSubgroup(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { groupId: string; groupId1: string }
}
```

#### returns:

```typescript
type TGroupInfo = {
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
```

Adds an internal or external group as subgroup to a Gerrit internal group.
External groups must be specified using the UUID.

This endpoint is only allowed for Gerrit internal groups; attempting to call on a
non-internal group will return 405 Method Not Allowed.

As response a GroupInfo entity is returned that
describes the subgroup.

The request also succeeds if the group is already a subgroup of this
group.

,

### native.subgroupEndpoints.addSubgroups(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { groupId: string }
  undefined
}
```

#### returns:

```typescript

```

OR

Adds one or several groups as subgroups to a Gerrit internal group.

The subgroups to be added must be provided in the request body as a
GroupsInput entity.

As response a list of GroupInfo entities is
returned that describes the groups that were specified in the
GroupsInput. A GroupInfo entity
is returned for each group specified in the input, independently of
whether the group was newly added as subgroup or whether the
group was already a subgroup of the group.

,

### native.subgroupEndpoints.removeSubgroup(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { groupId: string; groupId1: string }
}
```

#### returns:

```typescript

```

Removes a subgroup from a Gerrit internal group.

This endpoint is only allowed for Gerrit internal groups; attempting to call on a
non-internal group will return 405 Method Not Allowed.

,

### native.subgroupEndpoints.removeSubgroups(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { groupId: string }
  undefined
}
```

#### returns:

```typescript

```

Removes one or several subgroups from a Gerrit internal group.

The subgroups to be removed must be provided in the request body as a
GroupsInput entity.
