import axios from 'axios'

import {
  TAccountExternalIdInfo,
  TAccountInfo,
  TAccountNameInput,
  TAccountStatusInput,
  TCapabilityInfo,
  TChangeInfo,
  TContributorAgreementInfo,
  TDeletedDraftCommentInfo,
  TDiffPreferencesInfo,
  TDiffPreferencesInput,
  TDisplayNameInput,
  TEditPreferencesInfo,
  TEmailInfo,
  TGpgKeyInfo,
  TGpgKeysInput,
  TGroupInfo,
  THttpPasswordInput,
  TOAuthTokenInfo,
  TPreferencesInfo,
  TPreferencesInput,
  TProjectWatchInfo,
  TSshKeyInfo,
  TStarsInput,
  TUsernameInput,
} from '../types/index'
// NOTE: https://gerrit-review.googlesource.com/Documentation/rest-api.html#output
const xssiPrefix = ")]}'"
const parseGerritResponse = (data: string) =>
  JSON.parse(data.slice(xssiPrefix.length))

export function accountEndpoints({
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
    accountEndpoints: {
      async queryAccount({ params }: { params?: Record<string, any> }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/accounts/`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TAccountInfo[])
      },

      async getAccount({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/accounts/${accountId}`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async createAccount({
        args: { username },
        params,
      }: {
        args: { username: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/accounts/${username}`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TAccountInfo)
      },

      async getAccountDetails({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/accounts/${accountId}/detail`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getAccountName({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/accounts/${accountId}/name`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async setAccountName({
        data,
        args: { accountId },
        params,
      }: {
        data: TAccountNameInput
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/accounts/${accountId}/name`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async deleteAccountName({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/accounts/${accountId}/name`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getAccountStatus({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/accounts/${accountId}/status`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async setAccountStatus({
        data,
        args: { accountId },
        params,
      }: {
        data: TAccountStatusInput
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/accounts/${accountId}/status`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getUsername({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/accounts/${accountId}/username`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async setUsername({
        data,
        args: { accountId },
        params,
      }: {
        data: TUsernameInput
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/accounts/${accountId}/username`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async setDisplayName({
        data,
        args: { accountId },
        params,
      }: {
        data: TDisplayNameInput
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/accounts/${accountId}/displayname`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getActive({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/accounts/${accountId}/active`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async setActive({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/accounts/${accountId}/active`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async deleteActive({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/accounts/${accountId}/active`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async setGenerateHTTPPassword({
        data,
        args: { accountId },
        params,
      }: {
        data: THttpPasswordInput
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/accounts/${accountId}/password.http`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async deleteHTTPPassword({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/accounts/${accountId}/password.http`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getOAuthAccessToken({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/accounts/${accountId}/oauthtoken`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TOAuthTokenInfo)
      },

      async listAccountEmails({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/accounts/${accountId}/emails`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TEmailInfo[])
      },

      async getAccountEmail({
        args: { accountId, emailId },
        params,
      }: {
        args: { accountId: string; emailId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/accounts/${accountId}/emails/${emailId}`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TEmailInfo)
      },

      async createAccountEmail({
        args: { accountId, emailId },
        params,
      }: {
        args: { accountId: string; emailId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/accounts/${accountId}/emails/${emailId}`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TEmailInfo)
      },

      async deleteAccountEmail({
        args: { accountId, emailId },
        params,
      }: {
        args: { accountId: string; emailId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/accounts/${accountId}/emails/${emailId}`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async setPreferredEmail({
        args: { accountId, emailId },
        params,
      }: {
        args: { accountId: string; emailId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/accounts/${accountId}/emails/${emailId}/preferred`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async listSSHKeys({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/accounts/${accountId}/sshkeys`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TSshKeyInfo[])
      },

      async getSSHKey({
        args: { accountId, sshKeyId },
        params,
      }: {
        args: { accountId: string; sshKeyId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/accounts/${accountId}/sshkeys/${sshKeyId}`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TSshKeyInfo)
      },

      async addSSHKey({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/accounts/${accountId}/sshkeys`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TSshKeyInfo)
      },

      async deleteSSHKey({
        args: { accountId, sshKeyId },
        params,
      }: {
        args: { accountId: string; sshKeyId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/accounts/${accountId}/sshkeys/${sshKeyId}`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async listGPGKeys({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/accounts/${accountId}/gpgkeys`,
          auth,
          params,
        }).then(
          ({ data }) =>
            parseGerritResponse(data) as Record<string, TGpgKeyInfo>,
        )
      },

      async getGPGKey({
        args: { accountId, gpgKeyId },
        params,
      }: {
        args: { accountId: string; gpgKeyId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/accounts/${accountId}/gpgkeys/${gpgKeyId}`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TGpgKeyInfo)
      },

      async addDeleteGPGKeys({
        data,
        args: { accountId },
        params,
      }: {
        data: TGpgKeysInput
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/accounts/${accountId}/gpgkeys`,
          auth,
          params,
          data,
        }).then(
          ({ data }) =>
            parseGerritResponse(data) as Record<string, TGpgKeyInfo>,
        )
      },

      async deleteGPGKey({
        args: { accountId, gpgKeyId },
        params,
      }: {
        args: { accountId: string; gpgKeyId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/accounts/${accountId}/gpgkeys/${gpgKeyId}`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async listAccountCapabilities({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/accounts/${accountId}/capabilities`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TCapabilityInfo)
      },

      async checkAccountCapability({
        args: { accountId, capabilityId },
        params,
      }: {
        args: { accountId: string; capabilityId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/accounts/${accountId}/capabilities/${capabilityId}`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async listGroups({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/accounts/${accountId}/groups/`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TGroupInfo[])
      },

      async getAvatar({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/accounts/${accountId}/avatar`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getAvatarChangeURL({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/accounts/${accountId}/avatar.change.url`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getUserPreferences({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/accounts/${accountId}/preferences`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TPreferencesInfo)
      },

      async setUserPreferences({
        data,
        args: { accountId },
        params,
      }: {
        data: TPreferencesInput
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/accounts/${accountId}/preferences`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as TPreferencesInfo)
      },

      async getDiffPreferences({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/accounts/${accountId}/preferences.diff`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TDiffPreferencesInfo)
      },

      async setDiffPreferences({
        data,
        args: { accountId },
        params,
      }: {
        data: TDiffPreferencesInput
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/accounts/${accountId}/preferences.diff`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as TDiffPreferencesInfo)
      },

      async getEditPreferences({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/accounts/${accountId}/preferences.edit`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TEditPreferencesInfo)
      },

      async setEditPreferences({
        data,
        args: { accountId },
        params,
      }: {
        data: TEditPreferencesInfo
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/accounts/${accountId}/preferences.edit`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as TEditPreferencesInfo)
      },

      async getWatchedProjects({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/accounts/${accountId}/watched.projects`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TProjectWatchInfo[])
      },

      async addUpdateaListofWatchedProjectEntities({
        data,
        args: { accountId },
        params,
      }: {
        data: TProjectWatchInfo
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/accounts/${accountId}/watched.projects`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as TProjectWatchInfo[])
      },

      async deleteWatchedProjects({
        data,
        args: { accountId },
        params,
      }: {
        data: TProjectWatchInfo[]
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/accounts/${accountId}/watched.projects:delete`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getAccountExternalIDs({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/accounts/${accountId}/external.ids`,
          auth,
          params,
        }).then(
          ({ data }) => parseGerritResponse(data) as TAccountExternalIdInfo[],
        )
      },

      async deleteAccountExternalIDs({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/accounts/${accountId}/external.ids:delete`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async listContributorAgreements({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/accounts/${accountId}/agreements`,
          auth,
          params,
        }).then(
          ({ data }) =>
            parseGerritResponse(data) as TContributorAgreementInfo[],
        )
      },

      async deleteDraftComments({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/accounts/${accountId}/drafts:delete`,
          auth,
          params,
        }).then(
          ({ data }) => parseGerritResponse(data) as TDeletedDraftCommentInfo[],
        )
      },

      async signContributorAgreement({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/accounts/${accountId}/agreements`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async indexAccount({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/accounts/${accountId}/index`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },
    },
  }
}

export function defaultStarEndpoints({
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
    defaultStarEndpoints: {
      async getChangesWithDefaultStar({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/accounts/${accountId}/starred.changes`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TChangeInfo[])
      },

      async putDefaultStarOnChange({
        args: { accountId, changeId },
        params,
      }: {
        args: { accountId: string; changeId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/accounts/${accountId}/starred.changes/${changeId}`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async removeDefaultStarFromChange({
        args: { accountId, changeId },
        params,
      }: {
        args: { accountId: string; changeId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/accounts/${accountId}/starred.changes/${changeId}`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },
    },
  }
}

export function starEndpoints({
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
    starEndpoints: {
      async getStarredChanges({
        args: { accountId },
        params,
      }: {
        args: { accountId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/accounts/${accountId}/stars.changes`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TChangeInfo[])
      },

      async getStarLabelsFromChange({
        args: { accountId, changeId },
        params,
      }: {
        args: { accountId: string; changeId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/accounts/${accountId}/stars.changes/${changeId}`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async updateStarLabelsOnChange({
        data,
        args: { accountId, changeId },
        params,
      }: {
        data: TStarsInput
        args: { accountId: string; changeId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/accounts/${accountId}/stars.changes/${changeId}`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },
    },
  }
}
