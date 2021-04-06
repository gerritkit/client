export type TAbandonInput = {
  message?: any
  notify?: any
  notify_details?: any
}

export type TActionInfo = {
  method?: any
  label?: any
  title?: any
  enabled?: any
}

export type TAddReviewerResult = {
  input: any
  reviewers?: any
  ccs?: any
  error?: any
  confirm: any
}

export type TApprovalInfo = {
  value?: any
  permitted_voting_range?: any
  date?: any
  tag?: any
  post_submit: any
}

export type TAssigneeInput = {
  assignee: any
}

export type TBlameInfo = {
  author: any
  id: any
  time: any
  commit_msg: any
  ranges: any
}

export type TChangeEditInput = {
  restore_path?: any
  old_path?: any
  new_path?: any
}

export type TChangeEditMessageInput = {
  message: any
}

export type TChangeInfo = {
  id: any
  project: any
  branch: any
  topic?: any
  assignee?: any
  hashtags?: any
  change_id: any
  subject: any
  status: any
  created: any
  updated: any
  submitted: any
  submitter: any
  starred: any
  stars?: any
  reviewed: any
  submit_type?: any
  mergeable?: any
  submittable?: any
  insertions: any
  deletions: any
  total_comment_count?: any
  unresolved_comment_count?: any
  _number: any
  owner: any
  actions?: any
  requirements?: any
  labels?: any
  permitted_labels?: any
  removable_reviewers?: any
  reviewers?: any
  pending_reviewers?: any
  reviewer_updates?: any
  messages?: any
  current_revision?: any
  revisions?: any
  tracking_ids?: any
  _more_changes: any
  problems?: any
  is_private: any
  work_in_progress: any
  has_review_started: any
  revert_of?: any
  submission_id?: any
  cherry_pick_of_change?: any
  cherry_pick_of_patch_set?: any
  contains_git_conflicts: any
}

export type TChangeInput = {
  project: any
  branch: any
  subject: any
  topic?: any
  status: any
  is_private: any
  work_in_progress: any
  base_change?: any
  base_commit?: any
  new_branch: any
  merge?: any
  author?: any
  notify?: any
  notify_details?: any
}

export type TChangeMessageInfo = {
  id: any
  author?: any
  real_author?: any
  date: any
  message: any
  tag?: any
  _revision_number?: any
}

export type TCherryPickInput = {
  message?: any
  destination: any
  base?: any
  parent: any
  notify?: any
  notify_details?: any
  keep_reviewers: any
  allow_conflicts: any
  topic?: any
  allow_empty: any
}

export type TCommentInfo = {
  patch_set?: any
  id: any
  path?: any
  side?: any
  parent?: any
  line?: any
  range?: any
  in_reply_to?: any
  message?: any
  updated: any
  author?: any
  tag?: any
  unresolved?: any
  change_message_id?: any
}

export type TCommentInput = {
  id?: any
  path?: any
  side?: any
  line?: any
  range?: any
  in_reply_to?: any
  updated?: any
  message?: any
  tag: any
  unresolved?: any
}

export type TCommentRange = {
  start_line: any
  start_character: any
  end_line: any
  end_character: any
}

export type TCommitInfo = {
  commit: any
  parents: any
  author: any
  committer: any
  subject: any
  message: any
  web_links?: any
}

export type TCommitMessageInput = {
  message: any
  notify?: any
  notify_details?: any
}

export type TDeleteChangeMessageInput = {
  reason?: any
}

export type TDeleteCommentInput = {
  reason?: any
}

export type TDeleteReviewerInput = {
  notify?: any
  notify_details?: any
}

export type TDeleteVoteInput = {
  label?: any
  notify?: any
  notify_details?: any
}

export type TDescriptionInput = {
  description: any
}

export type TDiffContent = {
  a?: any
  b?: any
  ab?: any
  edit_a: any
  edit_b: any
  due_to_rebase: any
  skip?: any
  common?: any
}

export type TDiffFileMetaInfo = {
  name: any
  content_type: any
  lines: any
  web_links?: any
}

export type TDiffInfo = {
  meta_a: any
  meta_b: any
  change_type: any
  intraline_status: any
  diff_header: any
  content: any
  web_links?: any
  binary: any
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type TDiffIntralineInfo = {}

export type TDiffWebLinkInfo = {
  name: any
  url: any
  image_url: any
  show_on_side_by_side_diff_view: any
  show_on_unified_diff_view: any
}

export type TEditFileInfo = {
  web_links?: any
}

export type TEditInfo = {
  commit: any
  base_patch_set_number: any
  base_revision: any
  ref: any
  fetch?: any
  files?: any
}

export type TFetchInfo = {
  url: any
  ref: any
  commands?: any
}

export type TFileInfo = {
  status?: any
  binary: any
  old_path?: any
  lines_inserted?: any
  lines_deleted?: any
  size_delta: any
  size: any
}

export type TFixInput = {
  delete_patch_set_if_commit_missing: any
  expect_merged_as: any
}

export type TFixSuggestionInfo = {
  fix_id: any
  description: any
  replacements: any
}

export type TFixReplacementInfo = {
  path: any
  range: any
  replacement: any
}

export type TGitPersonInfo = {
  name: any
  email: any
  date: any
  tz: any
}

export type TGroupBaseInfo = {
  id: any
  name: any
}

export type THashtagsInput = {
  add?: any
  remove?: any
}

export type TIncludedInInfo = {
  branches: any
  tags: any
  external?: any
}

export type TLabelInfo = {
  optional: any
}

export type TMergeableInfo = {
  submit_type: any
  strategy?: any
  mergeable: any
  commit_merged?: any
  content_merged?: any
  conflicts?: any
  mergeable_into?: any
}

export type TMergeInput = {
  source: any
  source_branch?: any
  strategy?: any
  allow_conflicts: any
}

export type TMergePatchSetInput = {
  subject?: any
  inherit_parent: any
  base_change?: any
  merge: any
}

export type TMoveInput = {
  destination_branch: any
  message?: any
}

export type TNotifyInfo = {
  accounts?: any
}

export type TPrivateInput = {
  message?: any
}

export type TProblemInfo = {
  message: any
  status?: any
  outcome?: any
}

export type TPublishChangeEditInput = {
  notify?: any
  notify_details?: any
}

export type TPureRevertInfo = {
  is_pure_revert: any
}

export type TPushCertificateInfo = {
  certificate: any
  key: any
}

export type TRangeInfo = {
  start: any
  end: any
}

export type TRebaseInput = {
  base?: any
}

export type TRelatedChangeAndCommitInfo = {
  project: any
  change_id?: any
  commit: any
  _change_number?: any
  _revision_number?: any
  _current_revision_number?: any
  status?: any
}

export type TRelatedChangesInfo = {
  changes: any
}

export type TRequirement = {
  status: any
  fallbackText: any
  type: any
}

export type TRestoreInput = {
  message?: any
}

export type TRevertInput = {
  message?: any
  notify?: any
  notify_details?: any
  topic?: any
}

export type TRevertSubmissionInfo = {
  revert_changes: any
}

export type TReviewInfo = {
  labels: any
}

export type TReviewerUpdateInfo = {
  updated: any
  updated_by: any
  reviewer: any
  state: any
}

export type TReviewInput = {
  message?: any
  tag?: any
  labels?: any
  comments?: any
  robot_comments?: any
  drafts?: any
  notify?: any
  notify_details?: any
  omit_duplicate_comments?: any
  on_behalf_of?: any
  reviewers?: any
  ready?: any
  work_in_progress?: any
}

export type TReviewResult = {
  labels?: any
  reviewers?: any
  ready?: any
}

export type TReviewerInfo = {
  approvals: any
  _account_id: any
}

export type TReviewerInput = {
  reviewer: any
  state?: any
  confirmed?: any
  notify?: any
  notify_details?: any
}

export type TRevisionInfo = {
  kind: any
  _number: any
  created: any
  uploader: any
  ref: any
  fetch: any
  commit?: any
  files?: any
  actions?: any
  reviewed?: any
  commit_with_footers?: any
  push_certificate?: any
  description?: any
}

export type TRobotCommentInfo = {
  robot_id: any
  robot_run_id: any
  url?: any
  properties?: any
  fix_suggestions?: any
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type TRobotCommentInput = {}

export type TRuleInput = {
  rule: any
  filters: any
}

export type TSubmitInfo = {
  status: any
  on_behalf_of?: any
}

export type TSubmitInput = {
  on_behalf_of?: any
  notify?: any
  notify_details?: any
}

export type TSubmitRecord = {
  status: any
  ok?: any
  reject?: any
  need?: any
  may?: any
  impossible?: any
  error_message?: any
}

export type TSubmittedTogetherInfo = {
  changes: any
  non_visible_changes: any
}

export type TSuggestedReviewerInfo = {
  account?: any
  group?: any
  count: any
  confirm?: any
}

export type TTopicInput = {
  topic?: any
}

export type TTrackingIdInfo = {
  system: any
  id: any
}

export type TVotingRangeInfo = {
  min: any
  max: any
}

export type TWebLinkInfo = {
  name: any
  url: any
  image_url: any
}

export type TWorkInProgressInput = {
  message?: any
}
