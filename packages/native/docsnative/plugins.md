## pluginEndpoints

### nativeClient.pluginEndpoints.listPlugins(input: TInput)

#### Arguments:

```typescript
type TInput = {
  params: {
    all?: string
    limit?: string
    prefix?: string
    regex?: string
    skip?: string
    substring?: string
  }
}
```

#### Returns:

```typescript
type TPluginInfo = {
  id: any
  version: any
  api_version?: any
  index_url?: any
  filename?: any
  disabled: any
}
```

Lists the plugins installed on the Gerrit server. Only the enabled
plugins are returned unless the all option is specified.

To be allowed to see the installed plugins, a user must be a member of
a group that is granted the 'View Plugins' capability or the
'Administrate Server' capability.

As result a map is returned that maps the plugin IDs to
PluginInfo entries. The entries in the map are sorted
by plugin ID.

### nativeClient.pluginEndpoints.installPlugin(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { pluginId: string }
}
```

#### Returns:

```typescript
type TPluginInfo = {
  id: any
  version: any
  api_version?: any
  index_url?: any
  filename?: any
  disabled: any
}
```

Installs a new plugin on the Gerrit server. If a plugin with the
specified name already exists it is overwritten. Note: if the plugin
provides its own name in the MANIFEST file, then the plugin name from
the MANIFEST file has precedence over the {plugin-id} above.

The plugin jar can either be sent as binary data in the request body
or a URL to the plugin jar must be provided in the request body inside
a PluginInput entity.

To provide the plugin jar as binary data in the request body the
following curl command can be used:

As response a PluginInfo entity is returned that
describes the plugin.

If an existing plugin was overwritten the response is “200 OK”.

### nativeClient.pluginEndpoints.getPluginStatus(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { pluginId: string }
}
```

#### Returns:

```typescript
type TPluginInfo = {
  id: any
  version: any
  api_version?: any
  index_url?: any
  filename?: any
  disabled: any
}
```

Retrieves the status of a plugin on the Gerrit server.

As response a PluginInfo entity is returned that
describes the plugin.

### nativeClient.pluginEndpoints.enablePlugin(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { pluginId: string }
}
```

#### Returns:

```typescript
type TPluginInfo = {
  id: any
  version: any
  api_version?: any
  index_url?: any
  filename?: any
  disabled: any
}
```

Enables a plugin on the Gerrit server.

As response a PluginInfo entity is returned that
describes the plugin.

### nativeClient.pluginEndpoints.disablePlugin(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { pluginId: string }
}
```

#### Returns:

```typescript
type TPluginInfo = {
  id: any
  version: any
  api_version?: any
  index_url?: any
  filename?: any
  disabled: any
}
```

OR

Disables a plugin on the Gerrit server.

As response a PluginInfo entity is returned that
describes the plugin.

Disabling of a mandatory plugin
is rejected:

### nativeClient.pluginEndpoints.reloadPlugin(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { pluginId: string }
}
```

#### Returns:

```typescript
type TPluginInfo = {
  id: any
  version: any
  api_version?: any
  index_url?: any
  filename?: any
  disabled: any
}
```

Reloads a plugin on the Gerrit server.

As response a PluginInfo entity is returned that
describes the plugin.
