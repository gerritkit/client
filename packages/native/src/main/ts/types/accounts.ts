export type TAccountDetailInfo = {
  registered_on: any
}

export type TAccountExternalIdInfo = {
  identity: any
  email?: any
  trusted: any
  can_delete: any
}

export type TAccountInfo = {
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

export type TAccountInput = {
  username?: any
  name?: any
  display_name?: any
  email?: any
  ssh_key?: any
  http_password?: any
  groups?: any
}

export type TAccountNameInput = {
  name?: any
}

export type TAccountStatusInput = {
  status?: any
}

export type TAvatarInfo = {
  url: any
  height: any
  width: any
}

export type TCapabilityInfo = {
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

export type TContributorAgreementInfo = {
  name: any
  description: any
  url: any
  auto_verify_group?: any
}

export type TContributorAgreementInput = {
  name: any
}

export type TDeleteDraftCommentsInput = {
  query?: any
}

export type TDeletedDraftCommentInfo = {
  change: any
  deleted: any
}

export type TDiffPreferencesInfo = {
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

export type TDiffPreferencesInput = {
  context?: any
  expand_all_comments?: any
  ignore_whitespace?: any
  intraline_difference?: any
  line_length?: any
  manual_review?: any
  retain_header?: any
  show_line_endings?: any
  show_tabs?: any
  show_whitespace_errors?: any
  skip_deleted?: any
  skip_uncommented?: any
  syntax_highlighting?: any
  hide_top_menu?: any
  auto_hide_diff_table_header?: any
  hide_line_numbers?: any
  tab_size?: any
  font_size?: any
  line_wrapping?: any
  indent_with_tabs?: any
}

export type TEditPreferencesInfo = {
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

export type TEmailInfo = {
  email: any
  preferred: any
  pending_confirmation: any
}

export type TEmailInput = {
  email: any
  preferred: any
  no_confirmation: any
}

export type TGpgKeyInfo = {
  id: any
  fingerprint: any
  user_ids: any
  key: any
  status: any
  problems: any
}

export type TGpgKeysInput = {
  add: any
  delete: any
}

export type THttpPasswordInput = {
  generate: any
  http_password?: any
}

export type TOAuthTokenInfo = {
  username: any
  resource_host: any
  access_token: any
  provider_id?: any
  expires_at?: any
  type: any
}

export type TPreferencesInfo = {
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

export type TPreferencesInput = {
  changes_per_page?: any
  expand_inline_diffs: any
  download_scheme?: any
  date_format?: any
  time_format?: any
  relative_date_in_change_table?: any
  diff_view?: any
  size_bar_in_change_table?: any
  legacycid_in_change_table?: any
  mute_common_path_prefixes?: any
  signed_off_by?: any
  my?: any
  change_table: any
  email_strategy?: any
  default_base_for_merges?: any
}

export type TQueryLimitInfo = {
  min: any
  max: any
}

export type TSshKeyInfo = {
  seq: any
  ssh_public_key: any
  encoded_key: any
  algorithm: any
  comment?: any
  valid: any
}

export type TStarsInput = {
  add?: any
  remove?: any
}

export type TUsernameInput = {
  username: any
}

export type TDisplayNameInput = {
  display_name: any
}

export type TProjectWatchInfo = {
  project: any
  filter?: any
  notify_new_changes?: any
  notify_new_patch_sets?: any
  notify_all_comments?: any
  notify_submitted_changes?: any
  notify_abandoned_changes?: any
}
