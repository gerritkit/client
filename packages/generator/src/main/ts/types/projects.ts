export type TAccessCheckInfo = {
  status: any
  message?: any
}

export type TAutoCloseableChangesCheckInput = {
  fix?: any
  branch: any
  skip_commits?: any
  max_commits?: any
}

export type TAutoCloseableChangesCheckResult = {
  auto_closeable_changes: any
}

export type TBanInput = {
  commits: any
  reason?: any
}

export type TBanResultInfo = {
  newly_banned?: any
  already_banned?: any
  ignored?: any
}

export type TBranchInfo = {
  ref: any
  revision: any
  can_delete: any
  web_links?: any
}

export type TBranchInput = {
  ref?: any
  revision?: any
}

export type TCheckProjectInput = {
  auto_closeable_changes_check?: any
}

export type TCheckProjectResultInfo = {
  auto_closeable_changes_check_result?: any
}

export type TCommentLinkInfo = {
  match: any
  link: any
  enabled?: any
}

export type TConfigInfo = {
  description?: any
  use_contributor_agreements?: any
  use_content_merge?: any
  use_signed_off_by?: any
  create_new_change_for_all_not_in_target?: any
  require_change_id?: any
  enable_signed_push: any
  require_signed_push: any
  reject_implicit_merges?: any
  private_by_default: any
  work_in_progress_by_default: any
  max_object_size_limit: any
  default_submit_type: any
  submit_type: any
  match_author_to_committer_date?: any
  state?: any
  commentlinks: any
  plugin_config?: any
  actions?: any
  reject_empty_commit?: any
}

export type TConfigInput = {
  description?: any
  use_contributor_agreements?: any
  use_content_merge?: any
  use_signed_off_by?: any
  create_new_change_for_all_not_in_target?: any
  require_change_id?: any
  reject_implicit_merges?: any
  max_object_size_limit?: any
  submit_type?: any
  state?: any
  plugin_config_values?: any
  reject_empty_commit?: any
  commentlinks?: any
}

export type TConfigParameterInfo = {
  display_name?: any
  description?: any
  warning?: any
  type: any
  value?: any
  values?: any
  editable: any
  permitted_values?: any
  inheritable: any
  configured_value?: any
  inherited_value?: any
}

export type TDashboardInfo = {
  id: any
  project: any
  defining_project: any
  ref: any
  path: any
  description?: any
  foreach?: any
  url: any
  is_default: any
  title?: any
  sections: any
}

export type TDashboardInput = {
  id?: any
  commit_message?: any
}

export type TDashboardSectionInfo = {
  name: any
  query: any
}

export type TDeleteLabelInput = {
  commit_message?: any
}

export type TDeleteBranchesInput = {
  branches: any
}

export type TDeleteTagsInput = {
  tags: any
}

export type TGCInput = {
  show_progress: any
  aggressive: any
  async: any
}

export type THeadInput = {
  ref: any
}

export type TIndexProjectInput = {
  index_children: any
  async: any
}

export type TInheritedBooleanInfo = {
  value: any
  configured_value: any
  inherited_value?: any
}

export type TLabelDefinitionInfo = {
  name: any
  project_name: any
  function: any
  values: any
  default_value: any
  branches?: any
  can_override: any
  copy_any_score: any
  copy_min_score: any
  copy_max_score: any
  copy_all_scores_if_no_change: any
  copy_all_scores_if_no_code_change: any
  copy_all_scores_on_trivial_rebase: any
  copy_all_scores_on_merge_first_parent_update: any
  copy_values?: any
  allow_post_submit: any
  ignore_self_approval: any
}

export type TLabelDefinitionInput = {
  commit_message?: any
  name?: any
  function?: any
  values?: any
  default_value?: any
  branches?: any
  can_override?: any
  copy_any_score?: any
  copy_min_score?: any
  copy_max_score?: any
  copy_all_scores_if_no_change?: any
  copy_all_scores_if_no_code_change?: any
  copy_all_scores_on_trivial_rebase?: any
  copy_all_scores_on_merge_first_parent_update?: any
  copy_values?: any
  allow_post_submit?: any
  ignore_self_approval?: any
}

export type TLabelTypeInfo = {
  values: any
  default_value: any
}

export type TMaxObjectSizeLimitInfo = {
  value?: any
  configured_value?: any
  summary?: any
}

export type TBatchLabelInput = {
  commit_message?: any
  delete?: any
  create?: any
  update?: any
}

export type TProjectAccessInput = {
  remove?: any
  add?: any
  message?: any
  parent?: any
}

export type TProjectDescriptionInput = {
  description?: any
  commit_message?: any
}

export type TProjectInfo = {
  id: any
  name: any
  parent?: any
  description?: any
  state?: any
  branches?: any
  labels?: any
  web_links?: any
}

export type TProjectInput = {
  name?: any
  parent?: any
  description?: any
  permissions_only: any
  create_empty_commit: any
  submit_type?: any
  branches?: any
  owners?: any
  use_contributor_agreements: any
  use_signed_off_by: any
  create_new_change_for_all_not_in_target: any
  use_content_merge: any
  require_change_id: any
  enable_signed_push: any
  require_signed_push: any
  max_object_size_limit?: any
  plugin_config_values?: any
  reject_empty_commit?: any
}

export type TProjectParentInput = {
  parent: any
  commit_message?: any
}

export type TReflogEntryInfo = {
  old_id: any
  new_id: any
  who: any
  comment: any
}

export type TRepositoryStatisticsInfo = {
  number_of_loose_objects: any
  number_of_loose_refs: any
  number_of_pack_files: any
  number_of_packed_objects: any
  number_of_packed_refs: any
  size_of_loose_objects: any
  size_of_packed_objects: any
}

export type TSubmitTypeInfo = {
  value: any
  configured_value: any
  inherited_value: any
}

export type TTagInfo = {
  ref: any
  revision: any
  object: any
  message: any
  tagger: any
  created?: any
  can_delete: any
  web_links?: any
}

export type TTagInput = {
  ref: any
  revision?: any
  message?: any
}
