import axios from 'axios'
import {
  TAbandonInput,
  TAccountInfo,
  TAddReviewerResult,
  TAssigneeInput,
  TAttentionSetInfo,
  TAttentionSetInput,
  TBlameInfo,
  TChangeInfo,
  TChangeInput,
  TChangeMessageInfo,
  TCherryPickInput,
  TCommentInfo,
  TCommentInput,
  TCommitInfo,
  TCommitMessageInput,
  TDeleteChangeMessageInput,
  TDeleteCommentInput,
  TDeleteReviewerInput,
  TDeleteVoteInput,
  TDescriptionInput,
  TDiffInfo,
  TFileInfo,
  TFixInput,
  THashtagsInput,
  TIncludedInInfo,
  TMergeableInfo,
  TMoveInput,
  TPrivateInput,
  TPureRevertInfo,
  TRelatedChangesInfo,
  TRestoreInput,
  TRevertInput,
  TRevertSubmissionInfo,
  TReviewerInfo,
  TReviewerInput,
  TReviewInput,
  TReviewResult,
  TRobotCommentInfo,
  TSubmitInfo,
  TSubmitInput,
  TSubmittedTogetherInfo,
  TSuggestedReviewerInfo,
  TTopicInput,
  TWorkInProgressInput,
} from '../types/index'
// NOTE: https://gerrit-review.googlesource.com/Documentation/rest-api.html#output
const xssiPrefix = ")]}'"
const parseGerritResponse = (data: string) =>
  JSON.parse(data.slice(xssiPrefix.length))

export function changeEndpoints({
  baseUrl,
  auth,
}: {
  baseUrl: string
  auth: {
    username: string
    password: string
  }
}) {
  return {
    changeEndpoints: {
      async createChange({ data }: { data: TChangeInput }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/changes/`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as TChangeInfo)
      },

      async queryChanges() {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TChangeInfo[])
      },

      async getChange({ args: { changeId } }: { args: { changeId: string } }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TChangeInfo)
      },

      async getChangeDetail({
        args: { changeId },
      }: {
        args: { changeId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/detail`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TChangeInfo)
      },

      async createMergePatchSetForChange({
        args: { changeId },
      }: {
        args: { changeId: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/changes/${changeId}/merge`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TChangeInfo)
      },

      async setCommitMessage({
        data,
        args: { changeId },
      }: {
        data: TCommitMessageInput
        args: { changeId: string }
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/changes/${changeId}/message`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getTopic({ args: { changeId } }: { args: { changeId: string } }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/topic`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async setTopic({
        data,
        args: { changeId },
      }: {
        data: TTopicInput
        args: { changeId: string }
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/changes/${changeId}/topic`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async deleteTopic({
        args: { changeId },
      }: {
        args: { changeId: string }
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/changes/${changeId}/topic`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getAssignee({
        args: { changeId },
      }: {
        args: { changeId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/assignee`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TAccountInfo)
      },

      async getPastAssignees({
        args: { changeId },
      }: {
        args: { changeId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/past_assignees`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TAccountInfo[])
      },

      async setAssignee({
        data,
        args: { changeId },
      }: {
        data: TAssigneeInput
        args: { changeId: string }
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/changes/${changeId}/assignee`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as TAccountInfo)
      },

      async deleteAssignee({
        args: { changeId },
      }: {
        args: { changeId: string }
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/changes/${changeId}/assignee`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TAccountInfo)
      },

      async getPureRevert({
        args: { changeId },
      }: {
        args: { changeId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/pure_revert`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TPureRevertInfo)
      },

      async abandonChange({
        data,
        args: { changeId },
      }: {
        data: TAbandonInput
        args: { changeId: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/changes/${changeId}/abandon`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as TChangeInfo)
      },

      async restoreChange({
        data,
        args: { changeId },
      }: {
        data: TRestoreInput
        args: { changeId: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/changes/${changeId}/restore`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as TChangeInfo)
      },

      async rebaseChange({
        args: { changeId },
      }: {
        args: { changeId: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/changes/${changeId}/rebase`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TChangeInfo)
      },

      async moveChange({
        data,
        args: { changeId },
      }: {
        data: TMoveInput
        args: { changeId: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/changes/${changeId}/move`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as TChangeInfo)
      },

      async revertChange({
        data,
        args: { changeId },
      }: {
        data: TRevertInput
        args: { changeId: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/changes/${changeId}/revert`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as TChangeInfo)
      },

      async revertSubmission({
        args: { changeId },
      }: {
        args: { changeId: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/changes/${changeId}/revert_submission`,
          auth,
          params: {},
        }).then(
          ({ data }) => parseGerritResponse(data) as TRevertSubmissionInfo,
        )
      },

      async submitChange({
        data,
        args: { changeId },
      }: {
        data: TSubmitInput
        args: { changeId: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/changes/${changeId}/submit`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as TChangeInfo)
      },

      async changesSubmittedTogether({
        args: { changeId },
      }: {
        args: { changeId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/submitted_together`,
          auth,
          params: {},
        }).then(
          ({ data }) => parseGerritResponse(data) as TSubmittedTogetherInfo,
        )
      },

      async deleteChange({
        args: { changeId },
      }: {
        args: { changeId: string }
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/changes/${changeId}`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getIncludedIn({
        args: { changeId },
      }: {
        args: { changeId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/in`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TIncludedInInfo)
      },

      async indexChange({
        args: { changeId },
      }: {
        args: { changeId: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/changes/${changeId}/index`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async listChangeComments({
        args: { changeId },
      }: {
        args: { changeId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/comments`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async listChangeRobotComments({
        args: { changeId },
      }: {
        args: { changeId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/robotcomments`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async listChangeDrafts({
        args: { changeId },
      }: {
        args: { changeId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/drafts`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async checkChange({
        args: { changeId },
      }: {
        args: { changeId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/check`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async fixChange({
        data,
        args: { changeId },
      }: {
        data: TFixInput
        args: { changeId: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/changes/${changeId}/check`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async setWorkInProgress({
        data,
        args: { changeId },
      }: {
        data: TWorkInProgressInput
        args: { changeId: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/changes/${changeId}/wip`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async setReadyForReview({
        data,
        args: { changeId },
      }: {
        data: TWorkInProgressInput
        args: { changeId: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/changes/${changeId}/ready`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async markPrivate({
        data,
        args: { changeId },
      }: {
        data: TPrivateInput
        args: { changeId: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/changes/${changeId}/private`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async unmarkPrivate({
        data,
        args: { changeId },
      }: {
        data: TPrivateInput
        args: { changeId: string }
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/changes/${changeId}/private`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async ignore({ args: { changeId } }: { args: { changeId: string } }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/changes/${changeId}/ignore`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async unignore({ args: { changeId } }: { args: { changeId: string } }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/changes/${changeId}/unignore`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async markasReviewed({
        args: { changeId },
      }: {
        args: { changeId: string }
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/changes/${changeId}/reviewed`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async markasUnreviewed({
        args: { changeId },
      }: {
        args: { changeId: string }
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/changes/${changeId}/unreviewed`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getHashtags({
        args: { changeId },
      }: {
        args: { changeId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/hashtags`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async setHashtags({
        data,
        args: { changeId },
      }: {
        data: THashtagsInput
        args: { changeId: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/changes/${changeId}/hashtags`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async listChangeMessages({
        args: { changeId },
      }: {
        args: { changeId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/messages`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TChangeMessageInfo[])
      },

      async getChangeMessage({
        args: { changeId, changeMessageId },
      }: {
        args: { changeId: string; changeMessageId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/messages/${changeMessageId}`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TChangeMessageInfo)
      },

      async deleteChangeMessage({
        data,
        args: { changeId, changeMessageId },
      }: {
        data: TDeleteChangeMessageInput
        args: { changeId: string; changeMessageId: string }
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/changes/${changeId}/messages/${changeMessageId}`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as TChangeMessageInfo)
      },
    },
  }
}

export function changeEditEndpoints({
  baseUrl,
  auth,
}: {
  baseUrl: string
  auth: {
    username: string
    password: string
  }
}) {
  return {
    changeEditEndpoints: {
      async deletefileinChangeEdit({
        args: { changeId },
      }: {
        args: { changeId: string }
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/changes/${changeId}/edit/path%2fto%2ffile`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async deleteChangeEdit({
        args: { changeId },
      }: {
        args: { changeId: string }
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/changes/${changeId}/edit`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },
    },
  }
}

export function reviewerEndpoints({
  baseUrl,
  auth,
}: {
  baseUrl: string
  auth: {
    username: string
    password: string
  }
}) {
  return {
    reviewerEndpoints: {
      async listReviewers({
        args: { changeId },
      }: {
        args: { changeId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/reviewers/`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TReviewerInfo[])
      },

      async suggestReviewers({
        args: { changeId },
      }: {
        args: { changeId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/suggest_reviewers`,
          auth,
          params: {},
        }).then(
          ({ data }) => parseGerritResponse(data) as TSuggestedReviewerInfo[],
        )
      },

      async getReviewer({
        args: { changeId, accountId },
      }: {
        args: { changeId: string; accountId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/reviewers/${accountId}`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TReviewerInfo)
      },

      async addReviewer({
        data,
        args: { changeId },
      }: {
        data: TReviewerInput
        args: { changeId: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/changes/${changeId}/reviewers`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as TAddReviewerResult)
      },

      async deleteReviewer({
        data,
        args: { changeId, accountId },
      }: {
        data: TDeleteReviewerInput
        args: { changeId: string; accountId: string }
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/changes/${changeId}/reviewers/${accountId}`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async listVotes({
        args: { changeId, accountId },
      }: {
        args: { changeId: string; accountId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/reviewers/${accountId}/votes/`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async deleteVote({
        data,
        args: { changeId, accountId, labelId },
      }: {
        data: TDeleteVoteInput
        args: { changeId: string; accountId: string; labelId: string }
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/changes/${changeId}/reviewers/${accountId}/votes/${labelId}`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },
    },
  }
}

export function revisionEndpoints({
  baseUrl,
  auth,
}: {
  baseUrl: string
  auth: {
    username: string
    password: string
  }
}) {
  return {
    revisionEndpoints: {
      async getCommit({
        args: { changeId, revisionId },
      }: {
        args: { changeId: string; revisionId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/commit`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TCommitInfo)
      },

      async getDescription({
        args: { changeId, revisionId },
      }: {
        args: { changeId: string; revisionId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/description`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async setDescription({
        data,
        args: { changeId, revisionId },
      }: {
        data: TDescriptionInput
        args: { changeId: string; revisionId: string }
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/description`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getMergeList({
        args: { changeId, revisionId },
      }: {
        args: { changeId: string; revisionId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/mergelist`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TCommitInfo[])
      },

      async getRevisionActions({
        args: { changeId, revisionId },
      }: {
        args: { changeId: string; revisionId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/actions`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getReview({
        args: { changeId, revisionId },
      }: {
        args: { changeId: string; revisionId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/review`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TChangeInfo)
      },

      async getRelatedChanges({
        args: { changeId, revisionId },
      }: {
        args: { changeId: string; revisionId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/related`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TRelatedChangesInfo)
      },

      async setReview({
        data,
        args: { changeId, revisionId },
      }: {
        data: TReviewInput
        args: { changeId: string; revisionId: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/review`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as TReviewResult)
      },

      async rebaseRevision({
        args: { changeId, revisionId },
      }: {
        args: { changeId: string; revisionId: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/rebase`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TChangeInfo)
      },

      async submitRevision({
        args: { changeId, revisionId },
      }: {
        args: { changeId: string; revisionId: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/submit`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TSubmitInfo)
      },

      async getPatch({
        args: { changeId, revisionId },
      }: {
        args: { changeId: string; revisionId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/patch`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async submitPreview({
        args: { changeId, revisionId },
      }: {
        args: { changeId: string; revisionId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/preview_submit`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getMergeable({
        args: { changeId, revisionId },
      }: {
        args: { changeId: string; revisionId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/mergeable`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TMergeableInfo)
      },

      async getSubmitType({
        args: { changeId, revisionId },
      }: {
        args: { changeId: string; revisionId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/submit_type`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async testSubmitType({
        args: { changeId, revisionId },
      }: {
        args: { changeId: string; revisionId: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/test.submit_type`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async testSubmitRule({
        args: { changeId, revisionId },
      }: {
        args: { changeId: string; revisionId: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/test.submit_rule`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async listRevisionDrafts({
        args: { changeId, revisionId },
      }: {
        args: { changeId: string; revisionId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/drafts/`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async createDraft({
        data,
        args: { changeId, revisionId },
      }: {
        data: TCommentInput
        args: { changeId: string; revisionId: string }
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/drafts`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as TCommentInfo)
      },

      async getDraft({
        args: { changeId, revisionId, draftId },
      }: {
        args: { changeId: string; revisionId: string; draftId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/drafts/${draftId}`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TCommentInfo)
      },

      async updateDraft({
        data,
        args: { changeId, revisionId, draftId },
      }: {
        data: TCommentInput
        args: { changeId: string; revisionId: string; draftId: string }
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/drafts/${draftId}`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as TCommentInfo)
      },

      async deleteDraft({
        args: { changeId, revisionId, draftId },
      }: {
        args: { changeId: string; revisionId: string; draftId: string }
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/drafts/${draftId}`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async listRevisionComments({
        args: { changeId, revisionId },
      }: {
        args: { changeId: string; revisionId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/comments/`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TCommentInfo[])
      },

      async getComment({
        args: { changeId, revisionId, commentId },
      }: {
        args: { changeId: string; revisionId: string; commentId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/comments/${commentId}`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TCommentInfo)
      },

      async deleteComment({
        data,
        args: { changeId, revisionId, commentId },
      }: {
        data: TDeleteCommentInput
        args: { changeId: string; revisionId: string; commentId: string }
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/comments/${commentId}`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as TCommentInfo)
      },

      async listRobotComments({
        args: { changeId, revisionId },
      }: {
        args: { changeId: string; revisionId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/robotcomments/`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TRobotCommentInfo[])
      },

      async getRobotComment({
        args: { changeId, revisionId, commentId },
      }: {
        args: { changeId: string; revisionId: string; commentId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/robotcomments/${commentId}`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TRobotCommentInfo)
      },

      async getPortedComments({
        args: { changeId, revisionId },
      }: {
        args: { changeId: string; revisionId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/ported_comments`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TCommentInfo[])
      },

      async getPortedDrafts({
        args: { changeId, revisionId },
      }: {
        args: { changeId: string; revisionId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/ported_drafts`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async applyFix({
        args: { changeId, revisionId, fixId },
      }: {
        args: { changeId: string; revisionId: string; fixId: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/fixes/${fixId}/apply`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async listFiles({
        args: { changeId, revisionId },
      }: {
        args: { changeId: string; revisionId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/files/`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TFileInfo)
      },

      async getContent({
        args: { changeId, revisionId, fileId },
      }: {
        args: { changeId: string; revisionId: string; fileId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/files/${fileId}/content`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async downloadContent({
        args: { changeId, revisionId, fileId },
      }: {
        args: { changeId: string; revisionId: string; fileId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/files/${fileId}/download`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getDiff({
        args: { changeId, revisionId, fileId },
      }: {
        args: { changeId: string; revisionId: string; fileId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/files/${fileId}/diff`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TDiffInfo)
      },

      async previewfix({
        args: { changeId, revisionId, fixId },
      }: {
        args: { changeId: string; revisionId: string; fixId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/fixes/${fixId}/preview`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TDiffInfo[])
      },

      async getBlame({
        args: { changeId, revisionId, fileId },
      }: {
        args: { changeId: string; revisionId: string; fileId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/files/${fileId}/blame`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TBlameInfo)
      },

      async setReviewed({
        args: { changeId, revisionId, fileId },
      }: {
        args: { changeId: string; revisionId: string; fileId: string }
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/files/${fileId}/reviewed`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async deleteReviewed({
        args: { changeId, revisionId, fileId },
      }: {
        args: { changeId: string; revisionId: string; fileId: string }
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/files/${fileId}/reviewed`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async cherryPickRevision({
        data,
        args: { changeId, revisionId },
      }: {
        data: TCherryPickInput
        args: { changeId: string; revisionId: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/cherrypick`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as TChangeInfo)
      },
    },
  }
}

export function revisionReviewerEndpoints({
  baseUrl,
  auth,
}: {
  baseUrl: string
  auth: {
    username: string
    password: string
  }
}) {
  return {
    revisionReviewerEndpoints: {
      async listRevisionReviewers({
        args: { changeId, revisionId },
      }: {
        args: { changeId: string; revisionId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/reviewers/`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TReviewerInfo[])
      },

      async listRevisionVotes({
        args: { changeId, revisionId, accountId },
      }: {
        args: { changeId: string; revisionId: string; accountId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/revisions/${revisionId}/reviewers/${accountId}/votes/`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },
    },
  }
}

export function attentionSetEndpoints({
  baseUrl,
  auth,
}: {
  baseUrl: string
  auth: {
    username: string
    password: string
  }
}) {
  return {
    attentionSetEndpoints: {
      async getAttentionSet({
        args: { changeId },
      }: {
        args: { changeId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/changes/${changeId}/attention`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TAttentionSetInfo)
      },

      async addToAttentionSet({
        data,
        args: { changeId },
      }: {
        data: TAttentionSetInput
        args: { changeId: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/changes/${changeId}/attention`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async removefromAttentionSet({
        data,
        args: { changeId, accountId },
      }: {
        data: TAttentionSetInput
        args: { changeId: string; accountId: string }
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/changes/${changeId}/attention/${accountId}`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },
    },
  }
}
