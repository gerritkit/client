## accountEndpoints

### native.accountEndpoints.queryAccount(input: TInput)

#### inputs:

```typescript
type TInput = {}
```

#### returns:

```typescript
type TAccountInfo = {
  _account_id: any
  name?: any
  display_name?: any
  email?: any
  secondary_emails?: any
  username?: any
  avatars?: any
  _more_accounts: any
  status?: any
  inactive: any
}
```

Queries accounts visible to the caller. The
query string must be
provided by the q parameter. The n parameter can be used to limit
the returned results.

As result a list of AccountInfo entities is
returned.

If the number of accounts matching the query exceeds either the
internal limit or a supplied n query parameter, the last account
object has a \_more_accounts: true JSON field set.

The S or start query parameter can be supplied to skip a number
of accounts from the list.

Additional fields can be obtained by adding o parameters, each
option slows down the query response time to the client so they are
generally disabled by default. Optional fields are:

To get account suggestions set the parameter suggest and provide the
typed substring as query q. If a result limit n is not specified,
then the default 10 is used.

For account suggestions account details and
all emails are always returned.

Secondary emails are only included if the calling user has the
Modify Account
capability.

,

### native.accountEndpoints.getAccount(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript

```

Returns an account as an AccountInfo entity.

,

### native.accountEndpoints.createAccount(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { username: string }
}
```

#### returns:

```typescript
type TAccountInfo = {
  _account_id: any
  name?: any
  display_name?: any
  email?: any
  secondary_emails?: any
  username?: any
  avatars?: any
  _more_accounts: any
  status?: any
  inactive: any
}
```

Creates a new account.

In the request body additional data for the account can be provided as
AccountInput.

As response a detailed AccountInfo entity is
returned that describes the created account.

,

### native.accountEndpoints.getAccountDetails(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript

```

Retrieves the details of an account as an
AccountDetailInfo entity.

,

### native.accountEndpoints.getAccountName(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript

```

Retrieves the full name of an account.

If the account does not have a name an empty string is returned.

,

### native.accountEndpoints.setAccountName(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
  undefined
}
```

#### returns:

```typescript

```

Sets the full name of an account.

The new account name must be provided in the request body inside
an AccountNameInput entity.

As response the new account name is returned.

If the name was deleted the response is “204 No Content”.

Some realms may not allow to modify the account name. In this case the
request is rejected with “405 Method Not Allowed”.

,

### native.accountEndpoints.deleteAccountName(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript

```

Deletes the name of an account.

,

### native.accountEndpoints.getAccountStatus(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript

```

Retrieves the status of an account.

If the account does not have a status an empty string is returned.

,

### native.accountEndpoints.setAccountStatus(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
  undefined
}
```

#### returns:

```typescript

```

Sets the status of an account.

The new account status must be provided in the request body inside
an AccountStatusInput entity.

As response the new account status is returned.

If the name was deleted the response is “204 No Content”.

,

### native.accountEndpoints.getUsername(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript

```

Retrieves the username of an account.

If the account does not have a username the response is “404 Not Found”.

,

### native.accountEndpoints.setUsername(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
  undefined
}
```

#### returns:

```typescript

```

The new username must be provided in the request body inside
a UsernameInput entity.

Once set, the username cannot be changed or deleted. If attempted this
fails with “405 Method Not Allowed”.

As response the new username is returned.

,

### native.accountEndpoints.setDisplayName(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
  undefined
}
```

#### returns:

```typescript

```

The new display name must be provided in the request body inside
a DisplayNameInput entity.

As response the new display name is returned.

,

### native.accountEndpoints.getActive(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript

```

Checks if an account is active.

If the account is active the string ok is returned.

If the account is inactive the response is “204 No Content”.

,

### native.accountEndpoints.setActive(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript

```

Sets the account state to active.

If the account was already active the response is “200 OK”.

,

### native.accountEndpoints.deleteActive(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript

```

Sets the account state to inactive.

If the account was already inactive the response is “409 Conflict”.

,

### native.accountEndpoints.setGenerateHTTPPassword(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
  undefined
}
```

#### returns:

```typescript

```

Sets/Generates the HTTP password of an account.

The options for setting/generating the HTTP password must be provided
in the request body inside a
HttpPasswordInput entity.

The account must have a username.

As response the new HTTP password is returned.

If the HTTP password was deleted the response is “204 No Content”.

,

### native.accountEndpoints.deleteHTTPPassword(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript

```

Deletes the HTTP password of an account.

,

### native.accountEndpoints.getOAuthAccessToken(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript
type TOAuthTokenInfo = {
  username: any
  resource_host: any
  access_token: any
  provider_id?: any
  expires_at?: any
  type: any
}
```

Returns a previously obtained OAuth access token.

As a response, an OAuthTokenInfo entity is returned
that describes the OAuth access token.

If there is no token available, or the token has already expired,
“404 Not Found” is returned as response. Requests to obtain an access
token of another user are rejected with “403 Forbidden”.

,

### native.accountEndpoints.listAccountEmails(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript
type TEmailInfo = {
  email: any
  preferred: any
  pending_confirmation: any
}
```

Returns the email addresses that are configured for the specified user.

ModifyAccount
capability is required to view emails of other users.

As response the email addresses of the user are returned as a list of
EmailInfo entities.

,

### native.accountEndpoints.getAccountEmail(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string; emailId: string }
}
```

#### returns:

```typescript
type TEmailInfo = {
  email: any
  preferred: any
  pending_confirmation: any
}
```

Retrieves an email address of a user.

As response an EmailInfo entity is returned that
describes the email address.

,

### native.accountEndpoints.createAccountEmail(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string; emailId: string }
}
```

#### returns:

```typescript
type TEmailInfo = {
  email: any
  preferred: any
  pending_confirmation: any
}
```

Registers a new email address for the user. A verification email is
sent with a link that needs to be visited to confirm the email address,
unless DEVELOPMENT_BECOME_ANY_ACCOUNT is used as authentication type.
For the development mode email addresses are directly added without
confirmation. A Gerrit administrator may add an email address without
confirmation by setting no_confirmation in the
EmailInput.
If sendemail.allowrcpt is
configured, the added email address must belong to a domain that is
allowed, unless no_confirmation is set.
If sendemail.denyrcpt
is configured, make sure that the added email address is not disallowed or
belongs to a domain that is disallowed.

The EmailInput object in the request body may
contain additional options for the email address.

As response the new email address is returned as
EmailInfo entity.

,

### native.accountEndpoints.deleteAccountEmail(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string; emailId: string }
}
```

#### returns:

```typescript

```

Deletes an email address of an account.

,

### native.accountEndpoints.setPreferredEmail(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string; emailId: string }
}
```

#### returns:

```typescript

```

Sets an email address as preferred email address for an account.

If the email address was already the preferred email address of the
account the response is “200 OK”.

,

### native.accountEndpoints.listSSHKeys(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript
type TSshKeyInfo = {
  seq: any
  ssh_public_key: any
  encoded_key: any
  algorithm: any
  comment?: any
  valid: any
}
```

Returns the SSH keys of an account.

As response the SSH keys of the account are returned as a list of
SshKeyInfo entities.

,

### native.accountEndpoints.getSSHKey(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string; sshKeyId: string }
}
```

#### returns:

```typescript
type TSshKeyInfo = {
  seq: any
  ssh_public_key: any
  encoded_key: any
  algorithm: any
  comment?: any
  valid: any
}
```

Retrieves an SSH key of a user.

As response an SshKeyInfo entity is returned that
describes the SSH key.

,

### native.accountEndpoints.addSSHKey(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript
type TSshKeyInfo = {
  seq: any
  ssh_public_key: any
  encoded_key: any
  algorithm: any
  comment?: any
  valid: any
}
```

Adds an SSH key for a user.

The SSH public key must be provided as raw content in the request body.

Trying to add an SSH key that already exists succeeds, but no new SSH
key is persisted.

As response an SshKeyInfo entity is returned that
describes the new SSH key.

,

### native.accountEndpoints.deleteSSHKey(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string; sshKeyId: string }
}
```

#### returns:

```typescript

```

Deletes an SSH key of a user.

,

### native.accountEndpoints.listGPGKeys(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript
type TGpgKeyInfo = {
  id: any
  fingerprint: any
  user_ids: any
  key: any
  status: any
  problems: any
}
```

Returns the GPG keys of an account.

As a response, the GPG keys of the account are returned as a map of
GpgKeyInfo entities, keyed by ID.

,

### native.accountEndpoints.getGPGKey(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string; gpgKeyId: string }
}
```

#### returns:

```typescript
type TGpgKeyInfo = {
  id: any
  fingerprint: any
  user_ids: any
  key: any
  status: any
  problems: any
}
```

Retrieves a GPG key of a user.

As a response, a GpgKeyInfo entity is returned that
describes the GPG key.

,

### native.accountEndpoints.addDeleteGPGKeys(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
  undefined
}
```

#### returns:

```typescript
type TGpgKeyInfo = {
  id: any
  fingerprint: any
  user_ids: any
  key: any
  status: any
  problems: any
}
```

Add or delete one or more GPG keys for a user.

The changes must be provided in the request body as a
GpgKeysInput entity. Each new GPG key is provided in
ASCII armored format, and must contain a self-signed certification
matching a registered email or other identity of the user.

As a response, the modified GPG keys are returned as a map of
GpgKeyInfo entities, keyed by ID. Deleted keys are
represented by an empty object.

,

### native.accountEndpoints.deleteGPGKey(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string; gpgKeyId: string }
}
```

#### returns:

```typescript

```

Deletes a GPG key of a user.

,

### native.accountEndpoints.listAccountCapabilities(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript
type TCapabilityInfo = {
  accessDatabase: any
  administrateServer: any
  createAccount: any
  createGroup: any
  createProject: any
  emailReviewers: any
  flushCaches: any
  killTask: any
  maintainServer: any
  priority: any
  queryLimit: any
  runAs: any
  runGC: any
  streamEvents: any
  viewAllAccounts: any
  viewCaches: any
  viewConnections: any
  viewPlugins: any
  viewQueue: any
}
```

Returns the global capabilities that are enabled for the specified
user.

If the global capabilities for the calling user should be listed,
self can be used as account-id. This can be used by UI tools to
discover if administrative features are available to the caller, so
they can hide (or show) relevant UI actions.

As response the global capabilities of the user are returned as a
CapabilityInfo entity.

Administrator that has authenticated with basic authentication:

To filter the set of global capabilities the q parameter can be used.
Filtering may decrease the response time by avoiding looking at every
possible alternative for the caller.

,

### native.accountEndpoints.checkAccountCapability(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string; capabilityId: string }
}
```

#### returns:

```typescript

```

Checks if a user has a certain global capability.

If the user has the global capability the string ok is returned.

If the user doesn’t have the global capability the response is
“404 Not Found”.

,

### native.accountEndpoints.listGroups(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript

```

Lists all groups that contain the specified user as a member.

As result a list of GroupInfo
entries is returned.

,

### native.accountEndpoints.getAvatar(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript

```

Retrieves the avatar image of the user.

With the size option (alias s) you can specify the preferred size
in pixels (height and width).

The response redirects to the URL of the avatar image.

,

### native.accountEndpoints.getAvatarChangeURL(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript

```

Retrieves the URL where the user can change the avatar image.

,

### native.accountEndpoints.getUserPreferences(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript
type TPreferencesInfo = {
  changes_per_page: any
  expand_inline_diffs: any
  download_scheme?: any
  date_format: any
  time_format: any
  relative_date_in_change_table: any
  diff_view: any
  size_bar_in_change_table: any
  legacycid_in_change_table: any
  mute_common_path_prefixes: any
  signed_off_by: any
  my: any
  change_table: any
  email_strategy: any
  default_base_for_merges: any
  publish_comments_on_push: any
  work_in_progress_by_default: any
}
```

Retrieves the user’s preferences.

As result the account preferences of the user are returned as a
PreferencesInfo entity.

Users may only retrieve the preferences for their own account,
unless they are an
Administrator or a member
of a group that is granted the
ModifyAccount
capability, in which case they can retrieve the preferences for
any account.

,

### native.accountEndpoints.setUserPreferences(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
  undefined
}
```

#### returns:

```typescript
type TPreferencesInfo = {
  changes_per_page: any
  expand_inline_diffs: any
  download_scheme?: any
  date_format: any
  time_format: any
  relative_date_in_change_table: any
  diff_view: any
  size_bar_in_change_table: any
  legacycid_in_change_table: any
  mute_common_path_prefixes: any
  signed_off_by: any
  my: any
  change_table: any
  email_strategy: any
  default_base_for_merges: any
  publish_comments_on_push: any
  work_in_progress_by_default: any
}
```

Sets the user’s preferences.

The new preferences must be provided in the request body as a
PreferencesInput entity.

As result the new preferences of the user are returned as a
PreferencesInfo entity.

,

### native.accountEndpoints.getDiffPreferences(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript
type TDiffPreferencesInfo = {
  context: any
  expand_all_comments: any
  ignore_whitespace: any
  intraline_difference: any
  line_length: any
  cursor_blink_rate: any
  manual_review: any
  retain_header: any
  show_line_endings: any
  show_tabs: any
  show_whitespace_errors: any
  skip_deleted: any
  skip_uncommented: any
  syntax_highlighting: any
  hide_top_menu: any
  auto_hide_diff_table_header: any
  hide_line_numbers: any
  tab_size: any
  font_size: any
  hide_empty_pane: any
  match_brackets: any
  line_wrapping: any
}
```

Retrieves the diff preferences of a user.

As result the diff preferences of the user are returned as a
DiffPreferencesInfo entity.

,

### native.accountEndpoints.setDiffPreferences(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
  undefined
}
```

#### returns:

```typescript
type TDiffPreferencesInfo = {
  context: any
  expand_all_comments: any
  ignore_whitespace: any
  intraline_difference: any
  line_length: any
  cursor_blink_rate: any
  manual_review: any
  retain_header: any
  show_line_endings: any
  show_tabs: any
  show_whitespace_errors: any
  skip_deleted: any
  skip_uncommented: any
  syntax_highlighting: any
  hide_top_menu: any
  auto_hide_diff_table_header: any
  hide_line_numbers: any
  tab_size: any
  font_size: any
  hide_empty_pane: any
  match_brackets: any
  line_wrapping: any
}
```

Sets the diff preferences of a user.

The new diff preferences must be provided in the request body as a
DiffPreferencesInput entity.

As result the new diff preferences of the user are returned as a
DiffPreferencesInfo entity.

,

### native.accountEndpoints.getEditPreferences(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript
type TEditPreferencesInfo = {
  tab_size: any
  line_length: any
  indent_unit: any
  cursor_blink_rate: any
  hide_top_menu: any
  show_tabs: any
  show_whitespace_errors: any
  syntax_highlighting: any
  hide_line_numbers: any
  match_brackets: any
  line_wrapping: any
  indent_with_tabs: any
  auto_close_brackets: any
  show_base: any
}
```

Retrieves the edit preferences of a user.

As result the edit preferences of the user are returned as a
EditPreferencesInfo entity.

,

### native.accountEndpoints.setEditPreferences(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
  undefined
}
```

#### returns:

```typescript
type TEditPreferencesInfo = {
  tab_size: any
  line_length: any
  indent_unit: any
  cursor_blink_rate: any
  hide_top_menu: any
  show_tabs: any
  show_whitespace_errors: any
  syntax_highlighting: any
  hide_line_numbers: any
  match_brackets: any
  line_wrapping: any
  indent_with_tabs: any
  auto_close_brackets: any
  show_base: any
}
```

Sets the edit preferences of a user.

The new edit preferences must be provided in the request body as a
EditPreferencesInfo entity.

As result the new edit preferences of the user are returned as a
EditPreferencesInfo entity.

,

### native.accountEndpoints.getWatchedProjects(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript
type TProjectWatchInfo = {
  project: any
  filter?: any
  notify_new_changes?: any
  notify_new_patch_sets?: any
  notify_all_comments?: any
  notify_submitted_changes?: any
  notify_abandoned_changes?: any
}
```

Retrieves all projects a user is watching.

As result the watched projects of the user are returned as a list of
ProjectWatchInfo entities.
The result is sorted by project name in ascending order.

,

### native.accountEndpoints.addUpdateaListofWatchedProjectEntities(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
  undefined
}
```

#### returns:

```typescript
type TProjectWatchInfo = {
  project: any
  filter?: any
  notify_new_changes?: any
  notify_new_patch_sets?: any
  notify_all_comments?: any
  notify_submitted_changes?: any
  notify_abandoned_changes?: any
}
```

Add new projects to watch or update existing watched projects.
Projects that are already watched by a user will be updated with
the provided configuration. All other projects in the request
will be watched using the provided configuration. The posted body
can contain ProjectWatchInfo entities.
Omitted boolean values will be set to false.

As result the watched projects of the user are returned as a list of
ProjectWatchInfo entities.
The result is sorted by project name in ascending order.

,

### native.accountEndpoints.deleteWatchedProjects(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
  undefined
}
```

#### returns:

```typescript

```

Projects posted to this endpoint will no longer be watched. The posted body
can contain a list of ProjectWatchInfo entities.

,

### native.accountEndpoints.getAccountExternalIDs(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript
type TAccountExternalIdInfo = {
  identity: any
  email?: any
  trusted: any
  can_delete: any
}
```

Retrieves the external ids of a user account.

Only external ids belonging to the caller may be requested. Users that have
Modify Account can request
external ids that belong to other accounts.

As result the external ids of the user are returned as a list of
AccountExternalIdInfo entities.

,

### native.accountEndpoints.deleteAccountExternalIDs(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript

```

Delete a list of external ids for a user account. The target external ids must
be provided as a list in the request body.

Only external ids belonging to the caller may be deleted. Users that have
Modify Account can delete
external ids that belong to other accounts.

,

### native.accountEndpoints.listContributorAgreements(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript
type TContributorAgreementInfo = {
  name: any
  description: any
  url: any
  auto_verify_group?: any
}
```

Gets a list of the user’s signed contributor agreements.

As response the user’s signed agreements are returned as a list
of ContributorAgreementInfo entities.

,

### native.accountEndpoints.deleteDraftComments(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript
type TDeletedDraftCommentInfo = {
  change: any
  deleted: any
}
```

Deletes some or all of a user’s draft comments. The set of comments to delete is
specified as a DeleteDraftCommentsInput
entity. An empty input entity deletes all comments.

Only drafts belonging to the caller may be deleted.

As a response, a list of
DeletedDraftCommentInfo entities is returned.

,

### native.accountEndpoints.signContributorAgreement(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript

```

Signs a contributor agreement.

The contributor agreement must be provided in the request body as
a ContributorAgreementInput.

As response the contributor agreement name is returned.

,

### native.accountEndpoints.indexAccount(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript

```

Adds or updates the account in the secondary index.

,

## defaultStarEndpoints

### native.defaultStarEndpoints.getChangesWithDefaultStar(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript

```

Gets the changes that were starred with the default star by the
identified user account. This URL endpoint is functionally identical
to the changes query GET /changes/?q=is:starred. The result is a list
of ChangeInfo entities.

,

### native.defaultStarEndpoints.putDefaultStarOnChange(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string; changeId: string }
}
```

#### returns:

```typescript

```

Star a change with the default label. Changes starred with the default
label are returned for the search query is:starred or starredby:USER
and automatically notify the user whenever updates are made to the
change.

,

### native.defaultStarEndpoints.removeDefaultStarFromChange(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string; changeId: string }
}
```

#### returns:

```typescript

```

Remove the default star label from a change. This stops notifications.

,

## starEndpoints

### native.starEndpoints.getStarredChanges(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string }
}
```

#### returns:

```typescript

```

Gets the changes that were starred with any label by the identified
user account. This URL endpoint is functionally identical to the
changes query GET /changes/?q=has:stars. The result is a list of
ChangeInfo entities.

,

### native.starEndpoints.getStarLabelsFromChange(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string; changeId: string }
}
```

#### returns:

```typescript

```

Get star labels from a change.

As response the star labels that the user applied on the change are
returned. The labels are lexicographically sorted.

,

### native.starEndpoints.updateStarLabelsOnChange(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { accountId: string; changeId: string }
  undefined
}
```

#### returns:

```typescript

```

Update star labels on a change. The star labels to be added/removed
must be specified in the request body as StarsInput
entity. Starred changes are returned for the search query has:stars.

As response the star labels that the user applied on the change are
returned. The labels are lexicographically sorted.
