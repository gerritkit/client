## accessRightsEndpoints

### native.accessRightsEndpoints.listAccessRights(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { projectName: string }
}
```

#### returns:

```typescript
type TProjectAccessInfo = {
  revision: any
  inherits_from: any
  local: any
  is_owner: any
  owner_of: any
  can_upload: any
  can_add: any
  can_add_tags: any
  config_visible: any
  groups: any
  configWebLinks: any
}
```

Lists the access rights for projects. The projects for which the access
rights should be returned must be specified as project options. The
project can be specified multiple times.

As result a map is returned that maps the project name to
ProjectAccessInfo entities.

The entries in the map are sorted by project name.
