# @gerritkit/generator
Code generator for gerrit REST API

## Install
```shell script
```

## Usage
```javascript
import { generates } from '@gerritkit/generator'
generates([
  ['access', 'https://gerrit-documentation.storage.googleapis.com/Documentation/3.2.3/rest-api-access.html'],
  ['accounts', 'https://gerrit-documentation.storage.googleapis.com/Documentation/3.2.3/rest-api-accounts.html'],
  ['changes', 'https://gerrit-documentation.storage.googleapis.com/Documentation/3.2.3/rest-api-changes.html'],
  ['config', 'https://gerrit-documentation.storage.googleapis.com/Documentation/3.2.3/rest-api-config.html'],
  ['groups', 'https://gerrit-documentation.storage.googleapis.com/Documentation/3.2.3/rest-api-groups.html'],
  ['plugins', 'https://gerrit-documentation.storage.googleapis.com/Documentation/3.2.3/rest-api-plugins.html'],
  ['projects', 'https://gerrit-documentation.storage.googleapis.com/Documentation/3.2.3/rest-api-projects.html'],
  ['documentation', 'https://gerrit-documentation.storage.googleapis.com/Documentation/3.2.3/rest-api-documentation.html'],
], path_to_save)
```
