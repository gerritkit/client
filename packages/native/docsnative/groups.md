## groupEndpoints

### nativeClient.groupEndpoints.listGroups(input: TInput)

#### Arguments:

```typescript
type TInput = {
  params: { regex?: string; substring?: string }
}
```

#### Returns:

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

### nativeClient.groupEndpoints.queryGroups(input: TInput)

#### Arguments:

```typescript
type TInput = {}
```

#### Returns:

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

### nativeClient.groupEndpoints.getGroup(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { groupId: string }
}
```

#### Returns:

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

### nativeClient.groupEndpoints.createGroup(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { groupName: string }
}
```

#### Returns:

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

### nativeClient.groupEndpoints.getGroupDetail(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { groupId: string }
}
```

#### Returns:

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

### nativeClient.groupEndpoints.getGroupName(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { groupId: string }
}
```

#### Returns:

```typescript
type TReturnType = any
```

Retrieves the name of a group.

### nativeClient.groupEndpoints.renameGroup(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { groupId: string }
}
```

#### Returns:

```typescript
type TReturnType = any
```

Renames a Gerrit internal group.

The new group name must be provided in the request body.

This endpoint is only allowed for Gerrit internal groups; attempting to call on a
non-internal group will return 405 Method Not Allowed.

As response the new group name is returned.

If renaming the group fails because the new name is already in use the
response is “409 Conflict”.

### nativeClient.groupEndpoints.getGroupDescription(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { groupId: string }
}
```

#### Returns:

```typescript
type TReturnType = any
```

Retrieves the description of a group.

This endpoint is only allowed for Gerrit internal groups; attempting to call on a
non-internal group will return 405 Method Not Allowed.

If the group does not have a description an empty string is returned.

### nativeClient.groupEndpoints.setGroupDescription(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { groupId: string }
}
```

#### Returns:

```typescript
type TReturnType = any
```

Sets the description of a Gerrit internal group.

The new group description must be provided in the request body.

This endpoint is only allowed for Gerrit internal groups; attempting to call on a
non-internal group will return 405 Method Not Allowed.

As response the new group description is returned.

If the description was deleted the response is “204 No Content”.

### nativeClient.groupEndpoints.deleteGroupDescription(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { groupId: string }
}
```

#### Returns:

```typescript
type TReturnType = any
```

Deletes the description of a Gerrit internal group.

### nativeClient.groupEndpoints.getGroupOptions(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { groupId: string }
}
```

#### Returns:

```typescript
type TGroupOptionsInfo = {
  visible_to_all: any
}
```

Retrieves the options of a group.

As response a GroupOptionsInfo entity is
returned that describes the options of the group.

### nativeClient.groupEndpoints.setGroupOptions(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { groupId: string }
  undefined
}
```

#### Returns:

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

### nativeClient.groupEndpoints.getGroupOwner(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { groupId: string }
}
```

#### Returns:

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

### nativeClient.groupEndpoints.setGroupOwner(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { groupId: string }
}
```

#### Returns:

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

### nativeClient.groupEndpoints.getAuditLog(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { groupId: string }
}
```

#### Returns:

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

### nativeClient.groupEndpoints.indexGroup(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { groupId: string }
}
```

#### Returns:

```typescript
type TReturnType = any
```

Adds or updates the internal group in the secondary index.

,

## groupMemberEndpoints

### nativeClient.groupMemberEndpoints.listGroupMembers(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { groupId: string }
}
```

#### Returns:

```typescript
type TReturnType = any
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

### nativeClient.groupMemberEndpoints.getGroupMember(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { groupId: string; accountId: string }
}
```

#### Returns:

```typescript
type TReturnType = any
```

Retrieves a group member.

As response a detailed
AccountInfo entity is returned that describes the group member.

### nativeClient.groupMemberEndpoints.addGroupMember(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { groupId: string; accountId: string }
}
```

#### Returns:

```typescript
type TReturnType = any
```

Adds a user as member to a Gerrit internal group.

This endpoint is only allowed for Gerrit internal groups; attempting to call on a
non-internal group will return 405 Method Not Allowed.

As response a detailed
AccountInfo entity is returned that describes the group member.

The request also succeeds if the user is already a member of this
group, but then the HTTP response code is 200 OK.

### nativeClient.groupMemberEndpoints.addGroupMembers(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { groupId: string }
  undefined
}
```

#### Returns:

```typescript
type TReturnType = any
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

### nativeClient.groupMemberEndpoints.removeGroupMember(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { groupId: string; accountId: string }
}
```

#### Returns:

```typescript
type TReturnType = any
```

Removes a user from a Gerrit internal group.

This endpoint is only allowed for Gerrit internal groups; attempting to call on a
non-internal group will return 405 Method Not Allowed.

### nativeClient.groupMemberEndpoints.removeGroupMembers(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { groupId: string }
  undefined
}
```

#### Returns:

```typescript
type TReturnType = any
```

Removes one or several users from a Gerrit internal group.

The users to be removed from the group must be provided in the request
body as a MembersInput entity.

,

## subgroupEndpoints

### nativeClient.subgroupEndpoints.listSubgroups(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { groupId: string }
}
```

#### Returns:

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

### nativeClient.subgroupEndpoints.getSubgroup(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { groupId: string; groupId1: string }
}
```

#### Returns:

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

### nativeClient.subgroupEndpoints.addSubgroup(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { groupId: string; groupId1: string }
}
```

#### Returns:

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

### nativeClient.subgroupEndpoints.addSubgroups(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { groupId: string }
  undefined
}
```

#### Returns:

```typescript
type TReturnType = any
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

### nativeClient.subgroupEndpoints.removeSubgroup(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { groupId: string; groupId1: string }
}
```

#### Returns:

```typescript
type TReturnType = any
```

Removes a subgroup from a Gerrit internal group.

This endpoint is only allowed for Gerrit internal groups; attempting to call on a
non-internal group will return 405 Method Not Allowed.

### nativeClient.subgroupEndpoints.removeSubgroups(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { groupId: string }
  undefined
}
```

#### Returns:

```typescript
type TReturnType = any
```

Removes one or several subgroups from a Gerrit internal group.

The subgroups to be removed must be provided in the request body as a
GroupsInput entity.
