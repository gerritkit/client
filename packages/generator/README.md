# @gerritkit/generator
Code generator for gerrit REST API

## Install
```shell script
```

## Usage
```javascript
import { generates } from '@gerritkit/generator'
generates([
  ['access', 'https://gerrit-review.googlesource.com/Documentation/rest-api-access.html'],
  ['accounts', 'https://gerrit-review.googlesource.com/Documentation/rest-api-accounts.html'],
  ['changes', 'https://gerrit-review.googlesource.com/Documentation/rest-api-changes.html'],
  ['config', 'https://gerrit-review.googlesource.com/Documentation/rest-api-config.html'],
  ['groups', 'https://gerrit-review.googlesource.com/Documentation/rest-api-groups.html'],
  ['plugins', 'https://gerrit-review.googlesource.com/Documentation/rest-api-plugins.html'],
  ['projects', 'https://gerrit-review.googlesource.com/Documentation/rest-api-projects.html'],
  ['documentation', 'https://gerrit-review.googlesource.com/Documentation/rest-api-documentation.html'],
], path_to_save)
```
