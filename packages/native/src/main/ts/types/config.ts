export type TAccountsConfigInfo = {
  visibility: any
  default_display_name: any
}

export type TAuthInfo = {
  type: any
  use_contributor_agreements: any
  contributor_agreements: any
  editable_account_fields: any
  login_url?: any
  login_text?: any
  switch_account_url?: any
  register_url?: any
  register_text?: any
  edit_full_name_url?: any
  http_password_url?: any
  git_basic_auth_policy?: any
}

export type TCacheInfo = {
  name: any
  type: any
  entries: any
  average_get?: any
  hit_ratio: any
}

export type TCacheOperationInput = {
  operation: any
  caches?: any
}

export type TCapabilityInfo = {
  id: any
  name: any
}

export type TChangeConfigInfo = {
  allow_blame: any
  large_change: any
  reply_label: any
  reply_tooltip: any
  update_delay: any
  submit_whole_topic: any
  disable_private_changes: any
  mergeability_computation_behavior: any
  enable_attention_set: any
  enable_assignee: any
}

export type TChangeIndexConfigInfo = {
  index_mergeable: any
}

export type TCheckAccountExternalIdsInput = {}

export type TCheckAccountExternalIdsResultInfo = {
  problems: any
}

export type TCheckAccountsInput = {}

export type TCheckAccountsResultInfo = {
  problems: any
}

export type TCheckGroupsInput = {}

export type TCheckGroupsResultInfo = {
  problems: any
}

export type TConsistencyCheckInfo = {
  check_accounts_result?: any
  check_account_external_ids_result?: any
  check_groups_result?: any
}

export type TConsistencyCheckInput = {
  check_accounts?: any
  check_account_external_ids?: any
  check_groups?: any
}

export type TConsistencyProblemInfo = {
  status: any
  message: any
}

export type TConfigUpdateInfo = {
  applied: any
  rejected: any
}

export type TConfigUpdateEntryInfo = {
  config_key: any
  old_value: any
  new_value: any
}

export type TDownloadInfo = {
  schemes: any
  archives: any
}

export type TDownloadSchemeInfo = {
  url: any
  is_auth_required: any
  is_auth_supported: any
  commands: any
  clone_commands: any
}

export type TEmailConfirmationInput = {
  token: any
}

export type TEntriesInfo = {
  mem?: any
  disk?: any
  space?: any
}

export type TGerritInfo = {
  all_projects_name: any
  all_users_name: any
  doc_search: any
  doc_url?: any
  edit_gpg_keys: any
  report_bug_url?: any
}

export type TIndexConfigInfo = {
  change: any
}

export type THitRatioInfo = {
  mem: any
  disk?: any
}

export type TIndexChangesInput = {
  changes: any
}

export type TJvmSummaryInfo = {
  vm_vendor: any
  vm_name: any
  vm_version: any
  os_name: any
  os_version: any
  os_arch: any
  user: any
  host?: any
  current_working_directory: any
  site: any
}

export type TMemSummaryInfo = {
  total: any
  used: any
  free: any
  buffers: any
  max: any
  open_files?: any
}

export type TPluginConfigInfo = {
  has_avatars: any
}

export type TReceiveInfo = {
  enableSignedPush?: any
}

export type TServerInfo = {
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

export type TSshdInfo = {}

export type TSuggestInfo = {
  from: any
}

export type TSummaryInfo = {
  task_summary: any
  mem_summary: any
  thread_summary: any
  jvm_summary?: any
}

export type TTaskInfo = {
  id: any
  state: any
  start_time: any
  delay: any
  command: any
  remote_name?: any
  project?: any
}

export type TTaskSummaryInfo = {
  total?: any
  running?: any
  ready?: any
  sleeping?: any
}

export type TThreadSummaryInfo = {
  cpus: any
  threads: any
  counts: any
}

export type TTopMenuEntryInfo = {
  name: any
  items: any
}

export type TTopMenuItemInfo = {
  url: any
  name: any
  target: any
  id?: any
}

export type TUserConfigInfo = {
  anonymous_coward_name: any
}
