## changeEndpoints

### native.changeEndpoints.createChange(input: TInput)

#### inputs:

```typescript
type TInput = {
  undefined
}
```

#### returns:

```typescript
type TChangeInfo = {
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
```

The change input ChangeInput entity must be provided in the
request body.

To create a change the calling user must be allowed to
upload to code review.

As response a ChangeInfo entity is returned that describes
the resulting change.

,

### native.changeEndpoints.queryChanges(input: TInput)

#### inputs:

```typescript
type TInput = {}
```

#### returns:

```typescript
type TChangeInfo = {
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
```

Queries changes visible to the caller. The
query string must be provided
by the q parameter. The n parameter can be used to limit the
returned results. The no-limit parameter can be used remove the default
limit on queries and return all results. This might not be supported by
all index backends.

As result a list of ChangeInfo entries is returned.
The change output is sorted by the last update time, most recently
updated to oldest updated.

Query for open changes of watched projects:

If the number of changes matching the query exceeds either the internal
limit or a supplied n query parameter, the last change object has a
\_more_changes: true JSON field set.

The S or start query parameter can be supplied to skip a number
of changes from the list.

Clients are allowed to specify more than one query by setting the q
parameter multiple times. In this case the result is an array of
arrays, one per query in the same order the queries were given in.

Query that retrieves changes for a user’s dashboard:

Additional fields can be obtained by adding o parameters, each
option requires more database lookups and slows down the query
response time to the client so they are generally disabled by
default. Optional fields are:

,

### native.changeEndpoints.getChange(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
}
```

#### returns:

```typescript
type TChangeInfo = {
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
```

Retrieves a change.

Additional fields can be obtained by adding o parameters, each
option requires more database lookups and slows down the query
response time to the client so they are generally disabled by
default. Fields are described in Query Changes.

As response a ChangeInfo entity is returned that
describes the change.

,

### native.changeEndpoints.getChangeDetail(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
}
```

#### returns:

```typescript
type TChangeInfo = {
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
```

Retrieves a change with labels,
detailed labels, detailed accounts,
reviewer updates, and messages.

Additional fields can be obtained by adding o parameters, each
option requires more database lookups and slows down the query
response time to the client so they are generally disabled by
default. Fields are described in Query Changes.

As response a ChangeInfo entity is returned that
describes the change. This response will contain all votes for each
label and include one combined vote. The combined label vote is
calculated in the following order (from highest to lowest):
REJECTED > APPROVED > DISLIKED > RECOMMENDED.

,

### native.changeEndpoints.createMergePatchSetForChange(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
}
```

#### returns:

```typescript
type TChangeInfo = {
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
```

Update an existing change by using a
MergePatchSetInput entity.

Gerrit will create a merge commit based on the information of
MergePatchSetInput and add a new patch set to the change corresponding
to the new merge commit.

As response a ChangeInfo entity with current revision is
returned that describes the resulting change.

,

### native.changeEndpoints.setCommitMessage(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
  undefined
}
```

#### returns:

```typescript

```

Creates a new patch set with a new commit message.

The new commit message must be provided in the request body inside a
CommitMessageInput entity. If a Change-Id
footer is specified, it must match the current Change-Id footer. If
the Change-Id footer is absent, the current Change-Id is added to the
message.

Notifications
An email will be sent using the "newpatchset" template.

,

### native.changeEndpoints.getTopic(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
}
```

#### returns:

```typescript

```

Retrieves the topic of a change.

If the change does not have a topic an empty string is returned.

,

### native.changeEndpoints.setTopic(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
  undefined
}
```

#### returns:

```typescript

```

Sets the topic of a change.

The new topic must be provided in the request body inside a
TopicInput entity. Any leading or trailing whitespace
in the topic name will be removed.

As response the new topic is returned.

If the topic was deleted the response is “204 No Content”.

,

### native.changeEndpoints.deleteTopic(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
}
```

#### returns:

```typescript

```

Deletes the topic of a change.

,

### native.changeEndpoints.getAssignee(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
}
```

#### returns:

```typescript

```

Retrieves the account of the user assigned to a change.

As a response an AccountInfo entity
describing the assigned account is returned.

If the change has no assignee the response is “204 No Content”.

,

### native.changeEndpoints.getPastAssignees(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
}
```

#### returns:

```typescript

```

Returns a list of every user ever assigned to a change, in the order in which
they were first assigned.

As a response a list of AccountInfo
entities is returned.

,

### native.changeEndpoints.setAssignee(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
  undefined
}
```

#### returns:

```typescript

```

Sets the assignee of a change.

The new assignee must be provided in the request body inside a
AssigneeInput entity.

As a response an AccountInfo entity
describing the assigned account is returned.

,

### native.changeEndpoints.deleteAssignee(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
}
```

#### returns:

```typescript

```

Deletes the assignee of a change.

As a response an AccountInfo entity
describing the account of the deleted assignee is returned.

If the change had no assignee the response is “204 No Content”.

,

### native.changeEndpoints.getPureRevert(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
}
```

#### returns:

```typescript
type TPureRevertInfo = {
  is_pure_revert: any
}
```

Check if the given change is a pure revert of the change it references in revertOf.
Optionally, the query parameter o can be passed in to specify a commit (SHA1 in
40 digit hex representation) to check against. It takes precedence over revertOf.
If the change has no reference in revertOf, the parameter is mandatory.

As response a PureRevertInfo entity is returned.

,

### native.changeEndpoints.abandonChange(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
  undefined
}
```

#### returns:

```typescript
type TChangeInfo = {
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
```

Abandons a change.

The request body does not need to include a
AbandonInput entity if no review comment is added.

As response a ChangeInfo entity is returned that
describes the abandoned change.

If the change cannot be abandoned because the change state doesn’t
allow abandoning of the change, the response is “409 Conflict” and
the error message is contained in the response body.

Notifications
An email will be sent using the "abandon" template. The notify handling is ALL.
Notifications are suppressed on WIP changes that have never started review.

,

### native.changeEndpoints.restoreChange(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
  undefined
}
```

#### returns:

```typescript
type TChangeInfo = {
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
```

Restores a change.

The request body does not need to include a
RestoreInput entity if no review comment is added.

As response a ChangeInfo entity is returned that
describes the restored change.

If the change cannot be restored because the change state doesn’t
allow restoring the change, the response is “409 Conflict” and
the error message is contained in the response body.

,

### native.changeEndpoints.rebaseChange(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
}
```

#### returns:

```typescript
type TChangeInfo = {
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
```

Rebases a change.

Optionally, the parent revision can be changed to another patch set through the
RebaseInput entity.

As response a ChangeInfo entity is returned that
describes the rebased change. Information about the current patch set
is included.

If the change cannot be rebased, e.g. due to conflicts, the response is
“409 Conflict” and the error message is contained in the response
body.

,

### native.changeEndpoints.moveChange(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
  undefined
}
```

#### returns:

```typescript
type TChangeInfo = {
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
```

Move a change.

The destination branch must be provided in the request body inside a
MoveInput entity.

As response a ChangeInfo entity is returned that
describes the moved change.

Note that this endpoint will not update the change’s parents, which is
different from the cherry-pick endpoint.

If the change cannot be moved because the change state doesn’t
allow moving the change, the response is “409 Conflict” and
the error message is contained in the response body.

If the change cannot be moved because the user doesn’t have
abandon permission on the change or upload permission on the destination,
the response is “409 Conflict” and the error message is contained in the
response body.

,

### native.changeEndpoints.revertChange(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
  undefined
}
```

#### returns:

```typescript
type TChangeInfo = {
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
```

Reverts a change.

The subject of the newly created change will be
'Revert "<subject-of-reverted-change>"'. If the subject of the change reverted is
above 63 characters, it will be cut down to 59 characters with "…​" in the end.

The request body does not need to include a
RevertInput entity if no review comment is added.

As response a ChangeInfo entity is returned that
describes the reverting change.

If the user doesn’t have revert permission on the change or upload permission on
the destination branch, the response is “403 Forbidden”, and the error message is
contained in the response body.

If the change cannot be reverted because the change state doesn’t
allow reverting the change the response is “409 Conflict”, and the error
message is contained in the response body.

,

### native.changeEndpoints.revertSubmission(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
}
```

#### returns:

```typescript
type TRevertSubmissionInfo = {
  revert_changes: any
}
```

Creates open revert changes for all of the changes of a certain submission.

The subject of each revert change will be 'Revert "<subject-of-reverted-change"'.
If the subject is above 60 characters, the subject will be cut to 56 characters
with "…​" in the end. However, whenever reverting the submission of a revert
submission, the subject will be shortened from
'Revert "Revert "<subject-of-reverted-change""' to
'Revert^2 "<subject-of-reverted-change"'. Also, for every future revert submission,
the only difference in the subject will be the number of the revert (instead of
Revert^2 the subject will change to Revert^3 and so on).
There are no guarantees about the subjects if the users change the default subjects.

Details for the revert can be specified in the request body inside a
RevertInput The topic of all created revert changes will be
revert-{submission_id}-{random_string_of_size_10}.

The changes will not be rebased on onto the destination branch so the users may still
have to manually rebase them to resolve conflicts and make them submittable.

However, the changes that have the same project and branch will be rebased on top
of each other. E.g, the first revert change will have the original change as a
parent, and the second revert change will have the first revert change as a
parent.

There is one special case that involves merge commits; if a user has multiple
changes in the same project and branch, but not in the same change series, those
changes can still get submitted together if they have the same topic and
change.submitWholeTopic in
gerrit.config is set to true. In the case, Gerrit may create merge commits on
submit (depending on the submit types
of the project).
The first parent for the reverts will be the most recent merge commit that was
created by Gerrit to merge the different change series into the target branch.

As response RevertSubmissionInfo entity
is returned. That entity describes the revert changes.

If the user doesn’t have revert permission on the change or upload permission on
the destination, the response is “403 Forbidden”, and the error message is
contained in the response body.

If the change cannot be reverted because the change state doesn’t
allow reverting the change the response is “409 Conflict”, and the error
message is contained in the response body.

,

### native.changeEndpoints.submitChange(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
  undefined
}
```

#### returns:

```typescript
type TChangeInfo = {
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
```

Submits a change.

The request body only needs to include a
SubmitInput entity if submitting on behalf of another user.

As response a ChangeInfo entity is returned that
describes the submitted/merged change.

If the change cannot be submitted because the submit rule doesn’t allow
submitting the change, the response is “409 Conflict” and the error
message is contained in the response body.

,

### native.changeEndpoints.changesSubmittedTogether(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
}
```

#### returns:

```typescript
type TSubmittedTogetherInfo = {
  changes: any
  non_visible_changes: any
}
```

Computes list of all changes which are submitted when
Submit is called for this change,
including the current change itself.

The list consists of:

As a special case, the list is empty if this change would be
submitted by itself (without other changes).

As a response a SubmittedTogetherInfo
entity is returned that describes what would happen if the change were
submitted. This response contains a list of changes and a count of
changes that are not visible to the caller that are part of the set of
changes to be merged.

The listed changes use the same format as in
Query Changes with the
LABELS, DETAILED_LABELS,
CURRENT_REVISION,and
SUBMITTABLE options set.

Standard formatting options can be specified
with the o parameter, as well as the submitted_together specific
option NON_VISIBLE_CHANGES.

If the o=NON_VISIBLE_CHANGES query parameter is not passed, then
instead of a SubmittedTogetherInfo
entity, the response is a list of changes, or a 403 response with a
message if the set of changes to be submitted with this change
includes changes the caller cannot read.

,

### native.changeEndpoints.deleteChange(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
}
```

#### returns:

```typescript

```

Deletes a change.

New or abandoned changes can be deleted by their owner if the user is granted
the Delete Own Changes permission,
otherwise only by administrators.

,

### native.changeEndpoints.getIncludedIn(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
}
```

#### returns:

```typescript
type TIncludedInInfo = {
  branches: any
  tags: any
  external?: any
}
```

Retrieves the branches and tags in which a change is included. As result
an IncludedInInfo entity is returned.

,

### native.changeEndpoints.indexChange(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
}
```

#### returns:

```typescript

```

Adds or updates the change in the secondary index.

,

### native.changeEndpoints.listChangeComments(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
}
```

#### returns:

```typescript

```

Lists the published comments of all revisions of the change.

Returns a map of file paths to lists of CommentInfo
entries. The entries in the map are sorted by file path, and the
comments for each path are sorted by patch set number. Each comment has
the patch_set and author fields set.

,

### native.changeEndpoints.listChangeRobotComments(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
}
```

#### returns:

```typescript

```

Lists the robot comments of all revisions of the change.

Return a map that maps the file path to a list of
RobotCommentInfo entries. The entries in the
map are sorted by file path.

,

### native.changeEndpoints.listChangeDrafts(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
}
```

#### returns:

```typescript

```

Lists the draft comments of all revisions of the change that belong to
the calling user.

Returns a map of file paths to lists of CommentInfo
entries. The entries in the map are sorted by file path, and the
comments for each path are sorted by patch set number. Each comment has
the patch_set field set, and no author.

,

### native.changeEndpoints.checkChange(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
}
```

#### returns:

```typescript

```

Performs consistency checks on the change, and returns a
ChangeInfo entity with the problems field set to a
list of ProblemInfo entities.

Depending on the type of problem, some fields not marked optional may be
missing from the result. At least id, project, branch, and
\_number will be present.

,

### native.changeEndpoints.fixChange(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
  undefined
}
```

#### returns:

```typescript

```

Performs consistency checks on the change as with GET
/check, and additionally fixes any problems that can be fixed
automatically. The returned field values reflect any fixes.

Some fixes have options controlling their behavior, which can be set in the
FixInput entity body.

Only the change owner, a project owner, or an administrator may fix changes.

,

### native.changeEndpoints.setWorkInProgress(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
  undefined
}
```

#### returns:

```typescript

```

Marks the change as not ready for review yet. Changes may only be marked not
ready by the owner, project owners or site administrators.

The request body does not need to include a
WorkInProgressInput entity if no review comment
is added. Actions that create a new patch set in a WIP change default to
notifying OWNER instead of ALL.

,

### native.changeEndpoints.setReadyForReview(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
  undefined
}
```

#### returns:

```typescript

```

Marks the change as ready for review (set WIP property to false). Changes may
only be marked ready by the owner, project owners or site administrators.

Activates notifications of reviewer. The request body does not need
to include a WorkInProgressInput entity
if no review comment is added.

,

### native.changeEndpoints.markPrivate(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
  undefined
}
```

#### returns:

```typescript

```

Marks the change to be private. Only open changes can be marked private.
Changes may only be marked private by the owner or site administrators.

A message can be specified in the request body inside a
PrivateInput entity.

If the change was already private the response is “200 OK”.

,

### native.changeEndpoints.unmarkPrivate(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
  undefined
}
```

#### returns:

```typescript

```

Marks the change to be non-private. Note users can only unmark own private
changes.

If the change was already not private, the response is “409 Conflict”.

A message can be specified in the request body inside a
PrivateInput entity. Historically, this method allowed
a body in the DELETE, but that behavior is
deprecated.
In this case, use a POST request instead:

,

### native.changeEndpoints.ignore(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
}
```

#### returns:

```typescript

```

Marks a change as ignored. The change will not be shown in the incoming
reviews dashboard, and email notifications will be suppressed. Ignoring
a change does not cause the change’s "updated" timestamp to be modified,
and the owner is not notified.

,

### native.changeEndpoints.unignore(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
}
```

#### returns:

```typescript

```

Un-marks a change as ignored.

,

### native.changeEndpoints.markasReviewed(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
}
```

#### returns:

```typescript

```

Marks a change as reviewed.

This allows users to "de-highlight" changes in their dashboard until a new
patch set is uploaded.

This differs from the ignore endpoint, which will mute
emails and hide the change from dashboard completely until it is
unignored again.

,

### native.changeEndpoints.markasUnreviewed(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
}
```

#### returns:

```typescript

```

Marks a change as unreviewed.

This allows users to "highlight" changes in their dashboard

,

### native.changeEndpoints.getHashtags(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
}
```

#### returns:

```typescript

```

Gets the hashtags associated with a change.

As response the change’s hashtags are returned as a list of strings.

,

### native.changeEndpoints.setHashtags(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
  undefined
}
```

#### returns:

```typescript

```

Adds and/or removes hashtags from a change.

The hashtags to add or remove must be provided in the request body inside a
HashtagsInput entity.

As response the change’s hashtags are returned as a list of strings.

,

### native.changeEndpoints.listChangeMessages(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
}
```

#### returns:

```typescript
type TChangeMessageInfo = {
  id: any
  author?: any
  real_author?: any
  date: any
  message: any
  tag?: any
  _revision_number?: any
}
```

Lists all the messages of a change including detailed account information.

As response a list of ChangeMessageInfo entities is returned.

,

### native.changeEndpoints.getChangeMessage(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; changeMessageId: string }
}
```

#### returns:

```typescript
type TChangeMessageInfo = {
  id: any
  author?: any
  real_author?: any
  date: any
  message: any
  tag?: any
  _revision_number?: any
}
```

Retrieves a change message including detailed account information.

As response a ChangeMessageInfo entity is returned.

,

### native.changeEndpoints.deleteChangeMessage(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; changeMessageId: string }
  undefined
}
```

#### returns:

```typescript
type TChangeMessageInfo = {
  id: any
  author?: any
  real_author?: any
  date: any
  message: any
  tag?: any
  _revision_number?: any
}
```

Deletes a change message by replacing the change message with a new message,
which contains the name of the user who deleted the change message and the
reason why it was deleted. The reason can be provided in the request body as a
DeleteChangeMessageInput entity.

Note that only users with the
Administrate Server
global capability are permitted to delete a change message.

To delete a change message, send a DELETE request:

To provide a reason for the deletion, use a POST request:

As response a ChangeMessageInfo entity is returned that
describes the updated change message.

,

## changeEditEndpoints

### native.changeEditEndpoints.deletefileinChangeEdit(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
}
```

#### returns:

```typescript

```

Deletes a file from a change edit. This deletes the file from the repository
completely. This is not the same as reverting or restoring a file to its
previous contents.

When change edit doesn’t exist for this change yet it is created.

,

### native.changeEditEndpoints.deleteChangeEdit(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
}
```

#### returns:

```typescript

```

Deletes change edit.

As response “204 No Content” is returned.

,

## reviewerEndpoints

### native.reviewerEndpoints.listReviewers(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
}
```

#### returns:

```typescript
type TReviewerInfo = {
  approvals: any
  _account_id: any
}
```

Lists the reviewers of a change.

As result a list of ReviewerInfo entries is returned.

,

### native.reviewerEndpoints.suggestReviewers(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
}
```

#### returns:

```typescript
type TSuggestedReviewerInfo = {
  account?: any
  group?: any
  count: any
  confirm?: any
}
```

Suggest the reviewers for a given query q and result limit n. If result
limit is not passed, then the default 10 is used.

This REST endpoint only suggests accounts that

Groups can be excluded from the results by specifying the 'exclude-groups'
request parameter:

As result a list of SuggestedReviewerInfo entries is returned.

To suggest CCs reviewer-state=CC can be specified as additional URL
parameter. This includes existing reviewers in the result, but excludes
existing CCs.

,

### native.reviewerEndpoints.getReviewer(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; accountId: string }
}
```

#### returns:

```typescript
type TReviewerInfo = {
  approvals: any
  _account_id: any
}
```

Retrieves a reviewer of a change.

As response a ReviewerInfo entity is returned that
describes the reviewer.

,

### native.reviewerEndpoints.addReviewer(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string }
  undefined
}
```

#### returns:

```typescript
type TAddReviewerResult = {
  input: any
  reviewers?: any
  ccs?: any
  error?: any
  confirm: any
}
```

Adds one user or all members of one group as reviewer to the change.

The reviewer to be added to the change must be provided in the request
body as a ReviewerInput entity.

Users can be moved from reviewer to CC and vice versa. This means if a
user is added as CC that is already a reviewer on the change, the
reviewer state of that user is updated to CC. If a user that is already
a CC on the change is added as reviewer, the reviewer state of that
user is updated to reviewer.

As response an AddReviewerResult entity is
returned that describes the newly added reviewers.

If a group is specified, adding the group members as reviewers is an
atomic operation. This means if an error is returned, none of the
members are added as reviewer.

If a group with many members is added as reviewer a confirmation may be
required.

If a group is added as CC and members of this group are already
reviewers on the change, these members stay reviewers on the change
(they are not downgraded to CC). However if a group is added as
reviewer, all group members become reviewer of the change, even if they
have been added as CC before.

To confirm the addition of the reviewers, resend the request with the
confirmed flag being set.

If reviewer.enableByEmail is set
for the project, reviewers and CCs are not required to have a Gerrit account. If you POST
an email address of a reviewer or CC then, they will be added to the change even if they
don’t have a Gerrit account.

If this option is disabled, the request would fail with 400 Bad Request if the email
address can’t be resolved to an active Gerrit account.

Note that the name is optional so both "un.registered@reviewer.com" and
"John Doe <un.registered@reviewer.com>" are valid inputs.

Reviewers without Gerrit accounts can only be added on changes visible to anonymous users.

Notifications
An email will be sent using the "newchange" template.

,

### native.reviewerEndpoints.deleteReviewer(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; accountId: string }
  undefined
}
```

#### returns:

```typescript

```

Deletes a reviewer from a change.

Options can be provided in the request body as a
DeleteReviewerInput entity.
Historically, this method allowed a body in the DELETE, but that behavior is
deprecated.
In this case, use a POST request instead:

Notifications
An email will be sent using the "deleteReviewer" template. If deleting the
reviewer resulted in one or more approvals being removed, then the deleted
reviewer will also receive a notification (unless notify=NONE).

,

### native.reviewerEndpoints.listVotes(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; accountId: string }
}
```

#### returns:

```typescript

```

Lists the votes for a specific reviewer of the change.

As result a map is returned that maps the label name to the label value.
The entries in the map are sorted by label name.

,

### native.reviewerEndpoints.deleteVote(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; accountId: string; labelId: string }
  undefined
}
```

#### returns:

```typescript

```

Deletes a single vote from a change. Note, that even when the last vote of
a reviewer is removed the reviewer itself is still listed on the change.

Options can be provided in the request body as a
DeleteVoteInput entity.
Historically, this method allowed a body in the DELETE, but that behavior is
deprecated.
In this case, use a POST request instead:

,

## revisionEndpoints

### native.revisionEndpoints.getCommit(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string }
}
```

#### returns:

```typescript
type TCommitInfo = {
  commit: any
  parents: any
  author: any
  committer: any
  subject: any
  message: any
  web_links?: any
}
```

Retrieves a parsed commit of a revision.

As response a CommitInfo entity is returned that
describes the revision.

Adding query parameter links (for example /changes/…​/commit?links)
returns a CommitInfo with the additional field web_links.

,

### native.revisionEndpoints.getDescription(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string }
}
```

#### returns:

```typescript

```

Retrieves the description of a patch set.

If the patch set does not have a description an empty string is returned.

,

### native.revisionEndpoints.setDescription(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string }
  undefined
}
```

#### returns:

```typescript

```

Sets the description of a patch set.

The new description must be provided in the request body inside a
DescriptionInput entity.

As response the new description is returned.

,

### native.revisionEndpoints.getMergeList(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string }
}
```

#### returns:

```typescript
type TCommitInfo = {
  commit: any
  parents: any
  author: any
  committer: any
  subject: any
  message: any
  web_links?: any
}
```

Returns the list of commits that are being integrated into a target
branch by a merge commit. By default the first parent is assumed to be
uninteresting. By using the parent option another parent can be set
as uninteresting (parents are 1-based).

The list of commits is returned as a list of
CommitInfo entities. Web links are only included if
the links option was set.

,

### native.revisionEndpoints.getRevisionActions(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string }
}
```

#### returns:

```typescript

```

Retrieves revision actions of the revision of a change.

The response is a flat map of possible revision actions mapped to their
ActionInfo.

,

### native.revisionEndpoints.getReview(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string }
}
```

#### returns:

```typescript
type TChangeInfo = {
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
```

Retrieves a review of a revision.

As response a ChangeInfo entity with
detailed labels and
detailed accounts is returned that describes the review of the
revision. The revision for which the review is retrieved is contained
in the revisions field. In addition the current_revision field is
set if the revision for which the review is retrieved is the current
revision of the change. Please note that the returned labels are always
for the current patch set.

,

### native.revisionEndpoints.getRelatedChanges(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string }
}
```

#### returns:

```typescript
type TRelatedChangesInfo = {
  changes: any
}
```

Retrieves related changes of a revision. Related changes are changes that either
depend on, or are dependencies of the revision.

As result a RelatedChangesInfo entity is returned
describing the related changes.

,

### native.revisionEndpoints.setReview(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string }
  undefined
}
```

#### returns:

```typescript
type TReviewResult = {
  labels?: any
  reviewers?: any
  ready?: any
}
```

Sets a review on a revision, optionally also publishing draft comments, setting
labels, adding reviewers or CCs, and modifying the work in progress property.

The review must be provided in the request body as a
ReviewInput entity.

If the labels are set, the user sending the request will automatically be
added as a reviewer, otherwise (if they only commented) they are added to
the CC list.

A review cannot be set on a change edit. Trying to post a review for a
change edit fails with 409 Conflict.

Here is an example of using this method to set labels:

As response a ReviewResult entity is returned that
describes the applied labels and any added reviewers (e.g. yourself,
if you set a label but weren’t previously a reviewer on this CL).

It is also possible to add one or more reviewers or CCs
to a change simultaneously with a review:

Each element of the reviewers list is an instance of
ReviewerInput. The corresponding result of
adding each reviewer will be returned in a map of inputs to
AddReviewerResults.

If there are any errors returned for reviewers, the entire review request will
be rejected with 400 Bad Request. None of the entries will have the
reviewers or ccs field set, and those which specifically failed will have
the errors field set containing details of why they failed.

Notifications
An email will be sent using the "comment" template.

If the top-level notify property is null or not set, then notification behavior
depends on whether the change is WIP, whether it has started review, and whether
the tag property is null.

For the purposes of this table, everyone means owner, reviewers, CCs, stars, and ALL_COMMENTS
watchers.

If reviewers are added, then a second email will be sent using the "newchange"
template. The notification logic for this email is the same as for
Add Reviewer.

,

### native.revisionEndpoints.rebaseRevision(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string }
}
```

#### returns:

```typescript
type TChangeInfo = {
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
```

Rebases a revision.

Optionally, the parent revision can be changed to another patch set through the
RebaseInput entity.

As response a ChangeInfo entity is returned that
describes the rebased change. Information about the current patch set
is included.

If the revision cannot be rebased, e.g. due to conflicts, the response is
“409 Conflict” and the error message is contained in the response
body.

,

### native.revisionEndpoints.submitRevision(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string }
}
```

#### returns:

```typescript
type TSubmitInfo = {
  status: any
  on_behalf_of?: any
}
```

Submits a revision.

As response a SubmitInfo entity is returned that
describes the status of the submitted change.

If the revision cannot be submitted, e.g. because the submit rule
doesn’t allow submitting the revision or the revision is not the
current revision, the response is “409 Conflict” and the error
message is contained in the response body.

,

### native.revisionEndpoints.getPatch(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string }
}
```

#### returns:

```typescript

```

Gets the formatted patch for one revision.

The formatted patch is returned as text encoded inside base64:

Adding query parameter zip (for example /changes/…​/patch?zip)
returns the patch as a single file inside of a ZIP archive. Clients
can expand the ZIP to obtain the plain text patch, avoiding the
need for a base64 decoding step. This option implies download.

Query parameter download (e.g. /changes/…​/patch?download)
will suggest the browser save the patch as commitsha1.diff.base64,
for later processing by command line tools.

If the path parameter is set, the returned content is a diff of the single
file that the path refers to.

,

### native.revisionEndpoints.submitPreview(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string }
}
```

#### returns:

```typescript

```

Gets a file containing thin bundles of all modified projects if this
change was submitted. The bundles are named \${ProjectName}.git.
Each thin bundle contains enough to construct the state in which a project would
be in if this change were submitted. The base of the thin bundles are the
current target branches, so to make use of this call in a non-racy way, first
get the bundles and then fetch all projects contained in the bundle.
(This assumes no non-fastforward pushes).

You need to give a parameter '?format=zip' or '?format=tar' to specify the
format for the outer container. It is always possible to use tgz, even if
tgz is not in the list of allowed archive formats.

To make good use of this call, you would roughly need code as found at:

In case of an error, the response is not a zip file but a regular json response,
containing only the error message:

,

### native.revisionEndpoints.getMergeable(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string }
}
```

#### returns:

```typescript
type TMergeableInfo = {
  submit_type: any
  strategy?: any
  mergeable: any
  commit_merged?: any
  content_merged?: any
  conflicts?: any
  mergeable_into?: any
}
```

Gets the method the server will use to submit (merge) the change and
an indicator if the change is currently mergeable.

As response a MergeableInfo entity is returned.

If the other-branches parameter is specified, the mergeability will also be
checked for all other branches which are listed in the
branchOrder section in the
project.config file.

The response will then contain a list of all other branches where this changes
could merge cleanly.

,

### native.revisionEndpoints.getSubmitType(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string }
}
```

#### returns:

```typescript

```

Gets the method the server will use to submit (merge) the change.

,

### native.revisionEndpoints.testSubmitType(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string }
}
```

#### returns:

```typescript

```

Tests the submit_type Prolog rule in the project, or the one given.

Request body may be either the Prolog code as text/plain or a
RuleInput object. The query parameter filters
may be set to SKIP to bypass parent project filters while testing
a project-specific rule.

,

### native.revisionEndpoints.testSubmitRule(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string }
}
```

#### returns:

```typescript

```

Tests the submit_rule Prolog rule in the project, or the one given.

Request body may be either the Prolog code as text/plain or a
RuleInput object. The query parameter filters
may be set to SKIP to bypass parent project filters while testing
a project-specific rule.

The response is a SubmitRecord describing the
permutations that satisfy the tested submit rule.

If the submit rule was a no-op, the response is “204 No Content”.

When testing with the curl command line client the
--data-binary @rules.pl flag should be used to ensure
all LFs are included in the Prolog code:

,

### native.revisionEndpoints.listRevisionDrafts(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string }
}
```

#### returns:

```typescript

```

Lists the draft comments of a revision that belong to the calling
user.

Returns a map of file paths to lists of CommentInfo
entries. The entries in the map are sorted by file path.

,

### native.revisionEndpoints.createDraft(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string }
  undefined
}
```

#### returns:

```typescript
type TCommentInfo = {
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
```

Creates a draft comment on a revision.

The new draft comment must be provided in the request body inside a
CommentInput entity.

As response a CommentInfo entity is returned that
describes the draft comment.

,

### native.revisionEndpoints.getDraft(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string; draftId: string }
}
```

#### returns:

```typescript
type TCommentInfo = {
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
```

Retrieves a draft comment of a revision that belongs to the calling
user.

As response a CommentInfo entity is returned that
describes the draft comment.

,

### native.revisionEndpoints.updateDraft(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string; draftId: string }
  undefined
}
```

#### returns:

```typescript
type TCommentInfo = {
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
```

Updates a draft comment on a revision.

The new draft comment must be provided in the request body inside a
CommentInput entity.

As response a CommentInfo entity is returned that
describes the draft comment.

,

### native.revisionEndpoints.deleteDraft(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string; draftId: string }
}
```

#### returns:

```typescript

```

Deletes a draft comment from a revision.

,

### native.revisionEndpoints.listRevisionComments(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string }
}
```

#### returns:

```typescript
type TCommentInfo = {
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
```

Lists the published comments of a revision.

As result a map is returned that maps the file path to a list of
CommentInfo entries. The entries in the map are
sorted by file path and only include file (or inline) comments. Use
the Get Change Detail endpoint to retrieve
the general change message (or comment).

,

### native.revisionEndpoints.getComment(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string; commentId: string }
}
```

#### returns:

```typescript
type TCommentInfo = {
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
```

Retrieves a published comment of a revision.

As response a CommentInfo entity is returned that
describes the published comment.

,

### native.revisionEndpoints.deleteComment(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string; commentId: string }
  undefined
}
```

#### returns:

```typescript
type TCommentInfo = {
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
```

Deletes a published comment of a revision. Instead of deleting the
whole comment, this endpoint just replaces the comment’s message
with a new message, which contains the name of the user who deletes
the comment and the reason why it’s deleted.

Note that only users with the
Administrate Server
global capability are permitted to delete a comment.

Deletion reason can be provided in the request body as a
DeleteCommentInput entity.
Historically, this method allowed a body in the DELETE, but that behavior is
deprecated.
In this case, use a POST request instead:

As response a CommentInfo entity is returned that
describes the updated comment.

,

### native.revisionEndpoints.listRobotComments(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string }
}
```

#### returns:

```typescript
type TRobotCommentInfo = {
  robot_id: any
  robot_run_id: any
  url?: any
  properties?: any
  fix_suggestions?: any
}
```

Lists the robot comments of a
revision.

As result a map is returned that maps the file path to a list of
RobotCommentInfo entries. The entries in the
map are sorted by file path.

,

### native.revisionEndpoints.getRobotComment(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string; commentId: string }
}
```

#### returns:

```typescript
type TRobotCommentInfo = {
  robot_id: any
  robot_run_id: any
  url?: any
  properties?: any
  fix_suggestions?: any
}
```

Retrieves a robot comment of a
revision.

As response a RobotCommentInfo entity is
returned that describes the robot comment.

,

### native.revisionEndpoints.applyFix(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string; fixId: string }
}
```

#### returns:

```typescript

```

Applies a suggested fix by creating a change edit which includes the
modifications indicated by the fix suggestion. If a change edit already exists,
it will be updated accordingly. A fix can only be applied if no change edit
exists and the fix refers to the current patch set, or the fix refers to the
patch set on which the change edit is based.

If the fix was successfully applied, an EditInfo describing the
resulting change edit is returned.

If the application failed e.g. due to conflicts with an existing change edit,
the response “409 Conflict” including an error message in the response body
is returned.

,

### native.revisionEndpoints.listFiles(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string }
}
```

#### returns:

```typescript
type TFileInfo = {
  status?: any
  binary: any
  old_path?: any
  lines_inserted?: any
  lines_deleted?: any
  size_delta: any
  size: any
}
```

Lists the files that were modified, added or deleted in a revision.

As result a map is returned that maps the file path to a
FileInfo entry. The entries in the map are
sorted by file path.

The request parameter reviewed changes the response to return a list
of the paths the caller has marked as reviewed. Clients that also
need the FileInfo should make two requests.

The request parameter q changes the response to return a list
of all files (modified or unmodified) that contain that substring
in the path name. This is useful to implement suggestion services
finding a file by partial name. Clients that also need the FileInfo
should make two requests.

For merge commits only, the integer-valued request parameter parent
changes the response to return a map of the files which are different
in this commit compared to the given parent commit. The value is the
1-based index of the parent’s position in the commit object,
with the first parent always belonging to the target branch. If not
specified, the response contains a map of the files different in the
auto merge result.

The request parameter base changes the response to return a map of the
files which are different in this commit compared to the given revision. The
revision must correspond to a patch set in the change.

The reviewed, q, parent, and base options are mutually exclusive.
That is, only one of them may be used at a time.

,

### native.revisionEndpoints.getContent(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string; fileId: string }
}
```

#### returns:

```typescript

```

Gets the content of a file from a certain revision.

The optional, integer-valued parent parameter can be specified to request
the named file from a parent commit of the specified revision. The value is
the 1-based index of the parent’s position in the commit object. If the
parameter is omitted or the value is non-positive, the patch set is referenced.

The content is returned as base64 encoded string. The HTTP response
Content-Type is always text/plain, reflecting the base64 wrapping.
A Gerrit-specific X-FYI-Content-Type header is returned describing
the server detected content type of the file.

If only the content type is required, callers should use HEAD to
avoid downloading the encoded file contents.

Alternatively, if the only value of the Accept request header is
application/json the content is returned as JSON string and
X-FYI-Content-Encoding is set to json.

,

### native.revisionEndpoints.downloadContent(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string; fileId: string }
}
```

#### returns:

```typescript

```

Downloads the content of a file from a certain revision, in a safe format
that poses no risk for inadvertent execution of untrusted code.

If the content type is defined as safe, the binary file content is returned
verbatim. If the content type is not safe, the file is stored inside a ZIP
file, containing a single entry with a random, unpredictable name having the
same base and suffix as the true filename. The ZIP file is returned in
verbatim binary form.

See Gerrit config documentation
for information about safe file type configuration.

The HTTP resource Content-Type is dependent on the file type: the
applicable type for safe files, or "application/zip" for unsafe files.

The optional, integer-valued parent parameter can be specified to request
the named file from a parent commit of the specified revision. The value is
the 1-based index of the parent’s position in the commit object. If the
parameter is omitted or the value non-positive, the patch set is referenced.

Filenames are decorated with a suffix of \_new for the current patch,
\_old for the only parent, or \_oldN for the Nth parent of many.

,

### native.revisionEndpoints.getDiff(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string; fileId: string }
}
```

#### returns:

```typescript
type TDiffInfo = {
  meta_a: any
  meta_b: any
  change_type: any
  intraline_status: any
  diff_header: any
  content: any
  web_links?: any
  binary: any
}
```

Gets the diff of a file from a certain revision.

As response a DiffInfo entity is returned that describes the diff.

If the intraline parameter is specified, intraline differences are included in the diff.

The base parameter can be specified to control the base patch set from which the diff should
be generated.

The integer-valued request parameter parent can be specified to control the
parent commit number against which the diff should be generated. This is useful
for supporting review of merge commits. The value is the 1-based index of the
parent’s position in the commit object.

The whitespace parameter can be specified to control how whitespace
differences are reported in the result. Valid values are IGNORE_NONE,
IGNORE_TRAILING, IGNORE_LEADING_AND_TRAILING or IGNORE_ALL.

The context parameter can be specified to control the number of lines of surrounding context
in the diff. Valid values are ALL or number of lines.

,

### native.revisionEndpoints.previewfix(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string; fixId: string }
}
```

#### returns:

```typescript
type TDiffInfo = {
  meta_a: any
  meta_b: any
  change_type: any
  intraline_status: any
  diff_header: any
  content: any
  web_links?: any
  binary: any
}
```

Gets the diffs of all files for a certain {fix-id}.
As response, a map of DiffInfo entities is returned that describes the diffs.

Each DiffInfo is the differences between the patch set indicated by revision-id and a virtual patch set with the applied fix.

,

### native.revisionEndpoints.getBlame(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string; fileId: string }
}
```

#### returns:

```typescript
type TBlameInfo = {
  author: any
  id: any
  time: any
  commit_msg: any
  ranges: any
}
```

Gets the blame of a file from a certain revision.

As response a BlameInfo entity is returned that describes the
blame.

The base parameter can be specified to control the base patch set from which
the blame should be generated.

,

### native.revisionEndpoints.setReviewed(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string; fileId: string }
}
```

#### returns:

```typescript

```

Marks a file of a revision as reviewed by the calling user.

If the file was already marked as reviewed by the calling user the
response is “200 OK”.

,

### native.revisionEndpoints.deleteReviewed(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string; fileId: string }
}
```

#### returns:

```typescript

```

Deletes the reviewed flag of the calling user from a file of a revision.

,

### native.revisionEndpoints.cherryPickRevision(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string }
  undefined
}
```

#### returns:

```typescript
type TChangeInfo = {
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
```

Cherry picks a revision to a destination branch.

To cherry pick a commit with no change-id associated with it, see
CherryPickCommit.

The commit message and destination branch must be provided in the request body inside a
CherryPickInput entity. If the commit message
does not specify a Change-Id, a new one is picked for the destination change.

As response a ChangeInfo entity is returned that
describes the resulting cherry-pick change.

,

## revisionReviewerEndpoints

### native.revisionReviewerEndpoints.listRevisionReviewers(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string }
}
```

#### returns:

```typescript
type TReviewerInfo = {
  approvals: any
  _account_id: any
}
```

Lists the reviewers of a revision.

Please note that only the current revision is supported.

As result a list of ReviewerInfo entries is returned.

,

### native.revisionReviewerEndpoints.listRevisionVotes(input: TInput)

#### inputs:

```typescript
type TInput = {
  args: { changeId: string; revisionId: string; accountId: string }
}
```

#### returns:

```typescript

```

Lists the votes for a specific reviewer of the revision.

Please note that only the current revision is supported.

As result a map is returned that maps the label name to the label value.
The entries in the map are sorted by label name.
