## projectEndpoints

### nativeClient.projectEndpoints.listProjects(input: TInput)

#### Arguments:

```typescript
type TInput = {
  params: {
    branch?: string
    description?: string
    limit?: string
    prefix?: string
    regex?: string
    skip?: string
    substring?: string
    tree?: string
    type?: string
    state?: string
  }
}
```

#### Returns:

```typescript
type TProjectInfo = {
  id: any
  name: any
  parent?: any
  description?: any
  state?: any
  branches?: any
  labels?: any
  web_links?: any
}
```

Lists the projects accessible by the caller. This is the same as
using the ls-projects command over SSH,
and accepts the same options as query parameters.

As result a map is returned that maps the project names to
ProjectInfo entries. The entries in the map are sorted
by project name.

### nativeClient.projectEndpoints.queryProjects(input: TInput)

#### Arguments:

```typescript
type TInput = {}
```

#### Returns:

```typescript
type TProjectInfo = {
  id: any
  name: any
  parent?: any
  description?: any
  state?: any
  branches?: any
  labels?: any
  web_links?: any
}
```

Queries projects visible to the caller. The
query string must be
provided by the query parameter. The start and limit parameters
can be used to skip/limit results.

As result a list of ProjectInfo entities is returned.

### nativeClient.projectEndpoints.getProject(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string }
}
```

#### Returns:

```typescript
type TProjectInfo = {
  id: any
  name: any
  parent?: any
  description?: any
  state?: any
  branches?: any
  labels?: any
  web_links?: any
}
```

Retrieves a project.

As response a ProjectInfo entity is returned that
describes the project.

### nativeClient.projectEndpoints.createProject(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string }
}
```

#### Returns:

```typescript
type TProjectInfo = {
  id: any
  name: any
  parent?: any
  description?: any
  state?: any
  branches?: any
  labels?: any
  web_links?: any
}
```

Creates a new project.

In the request body additional data for the project can be provided as
ProjectInput.

As response the ProjectInfo entity is returned that
describes the created project.

### nativeClient.projectEndpoints.getProjectDescription(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string }
}
```

#### Returns:

```typescript
type TReturnType = any
```

Retrieves the description of a project.

If the project does not have a description an empty string is returned.

### nativeClient.projectEndpoints.setProjectDescription(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string }
  undefined
}
```

#### Returns:

```typescript
type TReturnType = any
```

Sets the description of a project.

The new project description must be provided in the request body inside
a ProjectDescriptionInput entity.

As response the new project description is returned.

If the description was deleted the response is “204 No Content”.

### nativeClient.projectEndpoints.deleteProjectDescription(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string }
  undefined
}
```

#### Returns:

```typescript
type TReturnType = any
```

Deletes the description of a project.

A commit message can be provided in the request body as a
ProjectDescriptionInput entity.
Historically, this method allowed a body in the DELETE, but that behavior is
deprecated.
In this case, use PUT instead.

### nativeClient.projectEndpoints.getProjectParent(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string }
}
```

#### Returns:

```typescript
type TReturnType = any
```

Retrieves the name of a project’s parent project. For the
All-Projects root project an empty string is returned.

### nativeClient.projectEndpoints.setProjectParent(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string }
  undefined
}
```

#### Returns:

```typescript
type TReturnType = any
```

Sets the parent project for a project.

The new name of the parent project must be provided in the request body
inside a ProjectParentInput entity.

As response the new parent project name is returned.

### nativeClient.projectEndpoints.getHEAD(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string }
}
```

#### Returns:

```typescript
type TReturnType = any
```

Retrieves for a project the name of the branch to which HEAD points.

### nativeClient.projectEndpoints.setHEAD(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string }
  undefined
}
```

#### Returns:

```typescript
type TReturnType = any
```

Sets HEAD for a project.

The new ref to which HEAD should point must be provided in the
request body inside a HeadInput entity.

As response the new ref to which HEAD points is returned.

### nativeClient.projectEndpoints.getRepositoryStatistics(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string }
}
```

#### Returns:

```typescript
type TRepositoryStatisticsInfo = {
  number_of_loose_objects: any
  number_of_loose_refs: any
  number_of_pack_files: any
  number_of_packed_objects: any
  number_of_packed_refs: any
  size_of_loose_objects: any
  size_of_packed_objects: any
}
```

Return statistics for the repository of a project.

The repository statistics are returned as a
RepositoryStatisticsInfo entity.

### nativeClient.projectEndpoints.getConfig(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string }
}
```

#### Returns:

```typescript
type TConfigInfo = {
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
```

Gets some configuration information about a project. Note that this
config info is not simply the contents of project.config; it generally
contains fields that may have been inherited from parent projects.

A ConfigInfo entity is returned that describes the
project configuration. Some fields are only visible to users that have
read access to refs/meta/config.

### nativeClient.projectEndpoints.setConfig(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string }
  undefined
}
```

#### Returns:

```typescript
type TConfigInfo = {
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
```

Sets the configuration of a project.

The new configuration must be provided in the request body as a
ConfigInput entity.

As response the new configuration is returned as a
ConfigInfo entity.

### nativeClient.projectEndpoints.runGC(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string }
  undefined
}
```

#### Returns:

```typescript
type TReturnType = any
```

Run the Git garbage collection for the repository of a project.

Options for the Git garbage collection can be specified in the
request body as a GCInput entity.

The response is the streamed output of the garbage collection.

### nativeClient.projectEndpoints.banCommit(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string }
  undefined
}
```

#### Returns:

```typescript
type TBanResultInfo = {
  newly_banned?: any
  already_banned?: any
  ignored?: any
}
```

Marks commits as banned for the project. If a commit is banned Gerrit
rejects every push that includes this commit with
contains banned commit …​.

The commits to be banned must be specified in the request body as a
BanInput entity.

The caller must be project owner.

As response a BanResultInfo entity is returned.

### nativeClient.projectEndpoints.listAccessRightsforProject(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string }
}
```

#### Returns:

```typescript
type TReturnType = any
```

Lists the access rights for a single project.

As result a
ProjectAccessInfo
entity is returned.

### nativeClient.projectEndpoints.addUpdateandDeleteAccessRightsforProject(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string }
}
```

#### Returns:

```typescript
type TReturnType = any
```

Sets access rights for the project using the diff schema provided by
ProjectAccessInput. Deductions are used to
remove access sections, permissions or permission rules. The backend will remove
the entity with the finest granularity in the request, meaning that if an
access section without permissions is posted, the access section will be
removed; if an access section with a permission but no permission rules is
posted, the permission will be removed; if an access section with a permission
and a permission rule is posted, the permission rule will be removed.

Additionally, access sections and permissions will be cleaned up after applying
the deductions by removing items that have no child elements.

After removals have been applied, additions will be applied.

As result a
ProjectAccessInfo
entity is returned.

### nativeClient.projectEndpoints.checkAccess(input: TInput)

#### Arguments:

```typescript
type TInput = {
  params: { account?: string; permission?: string; ref?: string }
}
```

#### Returns:

```typescript
type TAccessCheckInfo = {
  status: any
  message?: any
}
```

This command runs access checks for other users. This requires the
View Access global
capability.

The result is a AccessCheckInfo entity
detailing the access of the given user for the given project,
project-ref, or project-permission-ref combination.

,

## branchEndpoints

### nativeClient.branchEndpoints.listBranches(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string }

  params: { limit?: string; skip?: string; substring?: string; regex?: string }
}
```

#### Returns:

```typescript
type TBranchInfo = {
  ref: any
  revision: any
  can_delete: any
  web_links?: any
}
```

List the branches of a project.

As result a list of BranchInfo entries is
returned.

### nativeClient.branchEndpoints.getBranch(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string; branchId: string }
}
```

#### Returns:

```typescript
type TBranchInfo = {
  ref: any
  revision: any
  can_delete: any
  web_links?: any
}
```

Retrieves a branch of a project.

As response a BranchInfo entity is returned that
describes the branch.

### nativeClient.branchEndpoints.createBranch(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string; branchId: string }
}
```

#### Returns:

```typescript
type TBranchInfo = {
  ref: any
  revision: any
  can_delete: any
  web_links?: any
}
```

Creates a new branch.

In the request body additional data for the branch can be provided as
BranchInput.

As response a BranchInfo entity is returned that
describes the created branch.

### nativeClient.branchEndpoints.deleteBranch(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string; branchId: string }
}
```

#### Returns:

```typescript
type TReturnType = any
```

Deletes a branch.

### nativeClient.branchEndpoints.deleteBranches(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string }
  undefined
}
```

#### Returns:

```typescript
type TReturnType = any
```

Delete one or more branches.

The branches to be deleted must be provided in the request body as a
DeleteBranchesInput entity.

If some branches could not be deleted, the response is “409 Conflict” and the
error message is contained in the response body.

### nativeClient.branchEndpoints.getContent(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string; branchId: string; fileId: string }
}
```

#### Returns:

```typescript
type TReturnType = any
```

Gets the content of a file from the HEAD revision of a certain branch.

The content is returned as base64 encoded string.

### nativeClient.branchEndpoints.getMergeableInformation(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string; branchId: string }
}
```

#### Returns:

```typescript
type TReturnType = any
```

Gets whether the source is mergeable with the target branch.

The source query parameter is required, which can be anything that could be
resolved to a commit, see examples of the source attribute in
MergeInput.

Also takes an optional parameter strategy, which can be recursive, resolve,
simple-two-way-in-core, ours or theirs, default will use project settings.

As response a MergeableInfo entity is returned.

or when there were conflicts.

or when the 'testbranch' has been already merged.

or when only the content of 'testbranch' has been merged.

### nativeClient.branchEndpoints.getReflog(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string; branchId: string }
}
```

#### Returns:

```typescript
type TReturnType = any
```

Gets the reflog of a certain branch.

The caller must be project owner.

As response a list of ReflogEntryInfo entities
is returned that describe the reflog entries. The reflog entries are
returned in reverse order.

The get reflog endpoint also accepts a limit integer in the n
parameter. This limits the results to show the last n reflog entries.

Query the last 25 reflog entries.

The reflog can also be filtered by timestamp by specifying the from
and to parameters. The timestamp for from and to must be given as
UTC in the following format: yyyyMMdd_HHmm.

,

## childProjectEndpoints

### nativeClient.childProjectEndpoints.listChildProjects(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string }
}
```

#### Returns:

```typescript
type TProjectInfo = {
  id: any
  name: any
  parent?: any
  description?: any
  state?: any
  branches?: any
  labels?: any
  web_links?: any
}
```

List the direct child projects of a project.

As result a list of ProjectInfo entries is
returned that describe the child projects.

To resolve the child projects of a project recursively the parameter
recursive can be set.

Child projects that are not visible to the calling user are ignored and
are not resolved further.

### nativeClient.childProjectEndpoints.getChildProject(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string; projectName1: string }
}
```

#### Returns:

```typescript
type TProjectInfo = {
  id: any
  name: any
  parent?: any
  description?: any
  state?: any
  branches?: any
  labels?: any
  web_links?: any
}
```

Retrieves a child project. If a non-direct child project should be
retrieved the parameter recursive must be set.

As response a ProjectInfo entity is returned that
describes the child project.

,

## tagEndpoints

### nativeClient.tagEndpoints.createTag(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string; tagId: string }
}
```

#### Returns:

```typescript
type TTagInfo = {
  ref: any
  revision: any
  object: any
  message: any
  tagger: any
  created?: any
  can_delete: any
  web_links?: any
}
```

Create a new tag on the project.

In the request body additional data for the tag can be provided as
TagInput.

If a message is provided in the input, the tag is created as an
annotated tag with the current user as tagger. Signed tags are not
supported.

As response a TagInfo entity is returned that describes
the created tag.

### nativeClient.tagEndpoints.listTags(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string }

  params: { limit?: string; skip?: string; substring?: string; regex?: string }
}
```

#### Returns:

```typescript
type TTagInfo = {
  ref: any
  revision: any
  object: any
  message: any
  tagger: any
  created?: any
  can_delete: any
  web_links?: any
}
```

List the tags of a project.

As result a list of TagInfo entries is returned.

Only includes tags under the refs/tags/ namespace.

### nativeClient.tagEndpoints.getTag(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string; tagId: string }
}
```

#### Returns:

```typescript
type TTagInfo = {
  ref: any
  revision: any
  object: any
  message: any
  tagger: any
  created?: any
  can_delete: any
  web_links?: any
}
```

Retrieves a tag of a project.

As response a TagInfo entity is returned that describes the tag.

### nativeClient.tagEndpoints.deleteTag(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string; tagId: string }
}
```

#### Returns:

```typescript
type TReturnType = any
```

Deletes a tag.

### nativeClient.tagEndpoints.deleteTags(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string }
  undefined
}
```

#### Returns:

```typescript
type TReturnType = any
```

Delete one or more tags.

The tags to be deleted must be provided in the request body as a
DeleteTagsInput entity.

If some tags could not be deleted, the response is “409 Conflict” and the
error message is contained in the response body.

,

## commitEndpoints

### nativeClient.commitEndpoints.getCommit(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string; commitId: string }
}
```

#### Returns:

```typescript
type TReturnType = any
```

Retrieves a commit of a project.

The commit must be visible to the caller.

As response a CommitInfo entity
is returned that describes the commit.

### nativeClient.commitEndpoints.getIncludedIn(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string; commitId: string }
}
```

#### Returns:

```typescript
type TReturnType = any
```

Retrieves the branches and tags in which a change is included. As result
an IncludedInInfo entity is returned.

### nativeClient.commitEndpoints.getContent(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string; commitId: string; fileId: string }
}
```

#### Returns:

```typescript
type TReturnType = any
```

Gets the content of a file from a certain commit.

The content is returned as base64 encoded string.

### nativeClient.commitEndpoints.cherryPickCommit(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string; commitId: string }
  undefined
}
```

#### Returns:

```typescript
type TReturnType = any
```

Cherry-picks a commit of a project to a destination branch.

To cherry pick a change revision, see CherryPick.

The destination branch must be provided in the request body inside a
CherryPickInput entity.
If the commit message is not set, the commit message of the source
commit will be used.

As response a ChangeInfo entity
is returned that describes the resulting cherry-picked change.

### nativeClient.commitEndpoints.listFiles(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string; commitId: string }
}
```

#### Returns:

```typescript
type TReturnType = any
```

Lists the files that were modified, added or deleted in a commit.

As result a map is returned that maps the file path to a
FileInfo entry. The entries in the map are
sorted by file path.

The integer-valued request parameter parent changes the response to return a
list of the files which are different in this commit compared to the given
parent commit. This is useful for supporting review of merge commits. The value
is the 1-based index of the parent’s position in the commit object.

,

## dashboardEndpoints

### nativeClient.dashboardEndpoints.listDashboards(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string }
}
```

#### Returns:

```typescript
type TDashboardInfo = {
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
```

List custom dashboards for a project.

As result a list of DashboardInfo entries is
returned.

List all dashboards for the work/my-project project:

### nativeClient.dashboardEndpoints.getDashboard(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string; dashboardId: string }
}
```

#### Returns:

```typescript
type TDashboardInfo = {
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
```

Retrieves a project dashboard. The dashboard can be defined on that
project or be inherited from a parent project.

As response a DashboardInfo entity is returned
that describes the dashboard.

To retrieve the default dashboard of a project use default as
dashboard-id.

### nativeClient.dashboardEndpoints.createDashboard(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string; dashboardId: string }
  undefined
}
```

#### Returns:

```typescript
type TDashboardInfo = {
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
```

Creates a project dashboard, if a project dashboard with the given
dashboard ID doesn’t exist yet.

Currently only supported for the default dashboard.

The creation information for the dashboard must be provided in
the request body as a DashboardInput entity.

As response the new dashboard is returned as a
DashboardInfo entity.

### nativeClient.dashboardEndpoints.updateDashboard(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string; dashboardId: string }
  undefined
}
```

#### Returns:

```typescript
type TDashboardInfo = {
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
```

Updates a project dashboard, if a project dashboard with the given
dashboard ID already exists.

Currently only supported for the default dashboard.

The update information for the dashboard must be provided in
the request body as a DashboardInput entity.

As response the updated dashboard is returned as a
DashboardInfo entity.

### nativeClient.dashboardEndpoints.deleteDashboard(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string; dashboardId: string }
  undefined
}
```

#### Returns:

```typescript
type TReturnType = any
```

Deletes a project dashboard.

Currently only supported for the default dashboard.

The request body does not need to include a
DashboardInput entity if no commit message is specified.

Please note that some proxies prohibit request bodies for DELETE
requests.

,

## labelEndpoints

### nativeClient.labelEndpoints.listLabels(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string }
}
```

#### Returns:

```typescript
type TReturnType = any
```

Lists the labels that are defined in this project.

The calling user must have read access to the refs/meta/config branch of the
project.

As result a list of LabelDefinitionInfo entities
is returned that describe the labels that are defined in this project
(inherited labels are not returned unless the inherited parameter is set, see
below). The returned labels are sorted by
label name.

To include inherited labels from all parent projects the parameter inherited
can be set.

The calling user must have read access to the refs/meta/config branch of the
project and all its parent projects.

As result a list of LabelDefinitionInfo entities
is returned that describe the labels that are defined in this project and in
all its parent projects. The returned labels are sorted by parent projects
in-order from All-Projects through the project hierarchy to this project.
Labels that belong to the same project are sorted by label name.

### nativeClient.labelEndpoints.getLabel(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string; labelName: string }
}
```

#### Returns:

```typescript
type TLabelDefinitionInfo = {
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
```

Retrieves the definition of a label that is defined in this project.

The calling user must have read access to the refs/meta/config branch of the
project.

As response a LabelDefinitionInfo entity is
returned that describes the label.

### nativeClient.labelEndpoints.createLabel(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string; labelName: string }
}
```

#### Returns:

```typescript
type TLabelDefinitionInfo = {
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
```

Creates a new label definition in this project.

The calling user must have write access to the refs/meta/config branch of the
project.

If a label with this name is already defined in this project, this label
definition is updated (see Set Label).

As response a LabelDefinitionInfo entity is
returned that describes the created label.

### nativeClient.labelEndpoints.setLabel(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string; labelName: string }
}
```

#### Returns:

```typescript
type TLabelDefinitionInfo = {
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
```

Updates the definition of a label that is defined in this project.

The calling user must have write access to the refs/meta/config branch of the
project.

Properties which are not set in the input entity are not modified.

As response a LabelDefinitionInfo entity is
returned that describes the updated label.

### nativeClient.labelEndpoints.deleteLabel(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string; labelName: string }
  undefined
}
```

#### Returns:

```typescript
type TReturnType = any
```

Deletes the definition of a label that is defined in this project.

The calling user must have write access to the refs/meta/config branch of the
project.

The request body does not need to include a
DeleteLabelInput entity if no commit message is specified.

If a label was deleted the response is “204 No Content”.

### nativeClient.labelEndpoints.batchUpdateLabels(input: TInput)

#### Arguments:

```typescript
type TInput = {
  args: { projectName: string }
  undefined
}
```

#### Returns:

```typescript
type TReturnType = any
```

Creates/updates/deletes multiple label definitions in this project at once.

The calling user must have write access to the refs/meta/config branch of the
project.

The updates must be specified in the request body as
BatchLabelInput entity.

The updates are processed in the following order:

If the label updates were done successfully the response is “200 OK”.
