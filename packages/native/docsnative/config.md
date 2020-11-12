## configEndpoints

### nativeClient.configEndpoints.getVersion(input: TInput)

#### Arguments:

```typescript
type TInput = {}
```

#### Returns:

```typescript
type TReturnType = any
```

Returns the version of the Gerrit server.

### nativeClient.configEndpoints.getServerInfo(input: TInput)

#### Arguments:

```typescript
type TInput = {}
```

#### Returns:

```typescript
type TServerInfo = {
  accounts: any
  auth: any
  change: any
  download: any
  gerrit: any
  index: any
  note_db_enabled: any
  plugin: any
  receive?: any
  sshd?: any
  suggest: any
  user: any
  default_theme?: any
}
```

Returns the information about the Gerrit server configuration.

As result a ServerInfo entity is returned.

### nativeClient.configEndpoints.checkConsistency(input: TInput)

#### Arguments:

```typescript
type TInput = {
  undefined
}
```

#### Returns:

```typescript
type TConsistencyCheckInfo = {
  check_accounts_result?: any
  check_account_external_ids_result?: any
  check_groups_result?: any
}
```

Runs consistency checks and returns detected problems.

Input for the consistency checks that should be run must be provided in
the request body inside a
ConsistencyCheckInput entity.

As result a ConsistencyCheckInfo entity
is returned that contains detected consistency problems.

### nativeClient.configEndpoints.reloadConfig(input: TInput)

#### Arguments:

```typescript
type TInput = {}
```

#### Returns:

```typescript
type TReturnType = any
```

Reloads the gerrit.config configuration.

Not all configuration value can be picked up by this command. Which config
sections and values that are supported is documented here:
Configuration

The output shows only modified config values that are picked up by Gerrit
and applied.

If a config entry is added or removed from gerrit.config, but still brings
no effect due to a matching default value, no output for this entry is shown.

As result a ConfigUpdateInfo entity is returned that
contains information about how the updated config entries were handled.

### nativeClient.configEndpoints.confirmEmail(input: TInput)

#### Arguments:

```typescript
type TInput = {
  undefined
}
```

#### Returns:

```typescript
type TReturnType = any
```

Confirms that the user owns an email address.

The email token must be provided in the request body inside
an EmailConfirmationInput entity.

The response is “204 No Content”.

If the token is invalid or if it’s the token of another user the
request fails and the response is “422 Unprocessable Entity”.

### nativeClient.configEndpoints.listCaches(input: TInput)

#### Arguments:

```typescript
type TInput = {}
```

#### Returns:

```typescript
type TCacheInfo = {
  name: any
  type: any
  entries: any
  average_get?: any
  hit_ratio: any
}
```

Lists the caches of the server. Caches defined by plugins are included.

The caller must be a member of a group that is granted one of the
following capabilities:

As result a map of CacheInfo entities is returned.

The entries in the map are sorted by cache name.

It is possible to get different output formats by specifying the
format option:

### nativeClient.configEndpoints.cacheOperations(input: TInput)

#### Arguments:

```typescript
type TInput = {
  undefined
}
```

#### Returns:

```typescript
type TReturnType = any
```

Executes a cache operation that is specified in the request body in a
CacheOperationInput entity.

### nativeClient.configEndpoints.getCache(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { cacheName: string }
}
```

#### Returns:

```typescript
type TCacheInfo = {
  name: any
  type: any
  entries: any
  average_get?: any
  hit_ratio: any
}
```

Retrieves information about a cache.

The caller must be a member of a group that is granted one of the
following capabilities:

As result a CacheInfo entity is returned.

### nativeClient.configEndpoints.flushCache(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { cacheName: string }
}
```

#### Returns:

```typescript
type TReturnType = any
```

Flushes a cache.

The caller must be a member of a group that is granted one of the
following capabilities:

### nativeClient.configEndpoints.getSummary(input: TInput)

#### Arguments:

```typescript
type TInput = {}
```

#### Returns:

```typescript
type TSummaryInfo = {
  task_summary: any
  mem_summary: any
  thread_summary: any
  jvm_summary?: any
}
```

Retrieves a summary of the current server state.

The caller must be a member of a group that is granted the
Administrate
Server capability.

The following options are supported:

As result a SummaryInfo entity is returned.

### nativeClient.configEndpoints.listCapabilities(input: TInput)

#### Arguments:

```typescript
type TInput = {}
```

#### Returns:

```typescript
type TCapabilityInfo = {
  id: any
  name: any
}
```

Lists the capabilities that are available in the system. There are two
kinds of capabilities: core and plugin-owned capabilities.

As result a map of CapabilityInfo entities is
returned.

The entries in the map are sorted by capability ID.

### nativeClient.configEndpoints.listTasks(input: TInput)

#### Arguments:

```typescript
type TInput = {}
```

#### Returns:

```typescript
type TTaskInfo = {
  id: any
  state: any
  start_time: any
  delay: any
  command: any
  remote_name?: any
  project?: any
}
```

Lists the tasks from the background work queues that the Gerrit daemon
is currently performing, or will perform in the near future.

Gerrit contains an internal scheduler, similar to cron, that it uses to
queue and dispatch both short and long term tasks.

Tasks that are completed or canceled exit the queue very quickly once
they enter this state, but it can be possible to observe tasks in these
states.

End-users may see a task only if they can also see the project the task
is associated with. Tasks operating on other projects, or that do not
have a specific project, are hidden.

The caller must be a member of a group that is granted one of the
following capabilities:

As result a list of TaskInfo entities is returned.

The entries in the list are sorted by task state, remaining delay and
command.

### nativeClient.configEndpoints.getTask(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { taskId: string }
}
```

#### Returns:

```typescript
type TTaskInfo = {
  id: any
  state: any
  start_time: any
  delay: any
  command: any
  remote_name?: any
  project?: any
}
```

Retrieves a task from the background work queue that the Gerrit daemon
is currently performing, or will perform in the near future.

End-users may see a task only if they can also see the project the task
is associated with. Tasks operating on other projects, or that do not
have a specific project, are hidden.

The caller must be a member of a group that is granted one of the
following capabilities:

As result a TaskInfo entity is returned.

### nativeClient.configEndpoints.deleteTask(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { taskId: string }
}
```

#### Returns:

```typescript
type TReturnType = any
```

Kills a task from the background work queue that the Gerrit daemon
is currently performing, or will perform in the near future.

The caller must be a member of a group that is granted one of the
following capabilities:

End-users may see a task only if they can also see the project the task
is associated with. Tasks operating on other projects, or that do not
have a specific project, are hidden.

Members of a group granted one of the following capabilities may view
all tasks:

### nativeClient.configEndpoints.getTopMenus(input: TInput)

#### Arguments:

```typescript
type TInput = {}
```

#### Returns:

```typescript
type TReturnType = any
```

Returns the list of additional top menu entries.

As response a list of the additional top menu entries as
TopMenuEntryInfo entities is returned.

### nativeClient.configEndpoints.getDefaultUserPreferences(input: TInput)

#### Arguments:

```typescript
type TInput = {}
```

#### Returns:

```typescript
type TReturnType = any
```

Returns the default user preferences for the server.

As response a
PreferencesInfo is returned.

### nativeClient.configEndpoints.setDefaultUserPreferences(input: TInput)

#### Arguments:

```typescript
type TInput = {
  undefined
}
```

#### Returns:

```typescript
type TReturnType = any
```

Sets the default user preferences for the server.

The new user preferences must be provided in the request body as a
PreferencesInput
entity.

To be allowed to set default preferences, a user must be a member of
a group that is granted the

Administrate Server capability.

As response a
PreferencesInfo is returned.

### nativeClient.configEndpoints.getDefaultDiffPreferences(input: TInput)

#### Arguments:

```typescript
type TInput = {}
```

#### Returns:

```typescript
type TReturnType = any
```

Returns the default diff preferences for the server.

As response a
DiffPreferencesInfo is returned.

### nativeClient.configEndpoints.setDefaultDiffPreferences(input: TInput)

#### Arguments:

```typescript
type TInput = {
  undefined
}
```

#### Returns:

```typescript
type TReturnType = any
```

Sets the default diff preferences for the server.

The new diff preferences must be provided in the request body as a

DiffPreferencesInput entity.

To be allowed to set default diff preferences, a user must be a member
of a group that is granted the

Administrate Server capability.

As response a
DiffPreferencesInfo is returned.

### nativeClient.configEndpoints.getDefaultEditPreferences(input: TInput)

#### Arguments:

```typescript
type TInput = {}
```

#### Returns:

```typescript
type TReturnType = any
```

Returns the default edit preferences for the server.

As response a
EditPreferencesInfo is returned.

### nativeClient.configEndpoints.setDefaultEditPreferences(input: TInput)

#### Arguments:

```typescript
type TInput = {
  undefined
}
```

#### Returns:

```typescript
type TReturnType = any
```

Sets the default edit preferences for the server.

The new edit preferences must be provided in the request body as a

EditPreferencesInput entity.

To be allowed to set default edit preferences, a user must be a member
of a group that is granted the

Administrate Server capability.

As response a
EditPreferencesInfo is returned.
