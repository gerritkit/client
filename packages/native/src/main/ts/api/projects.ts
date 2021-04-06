import axios from 'axios'
import omit from 'lodash.omit'

import {
  TAccessCheckInfo,
  TBanInput,
  TBanResultInfo,
  TBatchLabelInput,
  TBranchInfo,
  TChangeInfo,
  TCherryPickInput,
  TCommitInfo,
  TConfigInfo,
  TConfigInput,
  TDashboardInfo,
  TDashboardInput,
  TDeleteBranchesInput,
  TDeleteLabelInput,
  TDeleteTagsInput,
  TFileInfo,
  TGCInput,
  THeadInput,
  TIncludedInInfo,
  TLabelDefinitionInfo,
  TMergeableInfo,
  TProjectAccessInfo,
  TProjectDescriptionInput,
  TProjectInfo,
  TProjectParentInput,
  TRepositoryStatisticsInfo,
  TTagInfo,
} from '../types/index'
// NOTE: https://gerrit-review.googlesource.com/Documentation/rest-api.html#output
const xssiPrefix = ")]}'"
const parseGerritResponse = (data: string) =>
  JSON.parse(data.slice(xssiPrefix.length))

export function projectEndpoints({
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
    projectEndpoints: {
      async listProjects({
        params,
      }: {
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
        } & Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/`,
          auth,
          params: {
            b: params.branch,
            d: params.description,
            n: params.limit,
            p: params.prefix,
            r: params.regex,
            S: params.skip,
            m: params.substring,
            t: params.tree,
            type: params.type,
            s: params.state,
            ...omit(params, [
              'branch',
              'description',
              'limit',
              'prefix',
              'regex',
              'skip',
              'substring',
              'tree',
              'type',
              'state',
            ]),
          },
        }).then(
          ({ data }) =>
            parseGerritResponse(data) as Record<string, TProjectInfo>,
        )
      },

      async queryProjects({ params }: { params?: Record<string, any> }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TProjectInfo[])
      },

      async getProject({
        args: { projectName },
        params,
      }: {
        args: { projectName: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TProjectInfo)
      },

      async createProject({
        args: { projectName },
        params,
      }: {
        args: { projectName: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/projects/${projectName}`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TProjectInfo)
      },

      async getProjectDescription({
        args: { projectName },
        params,
      }: {
        args: { projectName: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/description`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async setProjectDescription({
        data,
        args: { projectName },
        params,
      }: {
        data: TProjectDescriptionInput
        args: { projectName: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/projects/${projectName}/description`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async deleteProjectDescription({
        data,
        args: { projectName },
        params,
      }: {
        data: TProjectDescriptionInput
        args: { projectName: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/projects/${projectName}/description`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getProjectParent({
        args: { projectName },
        params,
      }: {
        args: { projectName: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/parent`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async setProjectParent({
        data,
        args: { projectName },
        params,
      }: {
        data: TProjectParentInput
        args: { projectName: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/projects/${projectName}/parent`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getHEAD({
        args: { projectName },
        params,
      }: {
        args: { projectName: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/HEAD`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async setHEAD({
        data,
        args: { projectName },
        params,
      }: {
        data: THeadInput
        args: { projectName: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/projects/${projectName}/HEAD`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getRepositoryStatistics({
        args: { projectName },
        params,
      }: {
        args: { projectName: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/statistics.git`,
          auth,
          params,
        }).then(
          ({ data }) => parseGerritResponse(data) as TRepositoryStatisticsInfo,
        )
      },

      async getConfig({
        args: { projectName },
        params,
      }: {
        args: { projectName: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/config`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TConfigInfo)
      },

      async setConfig({
        data,
        args: { projectName },
        params,
      }: {
        data: TConfigInput
        args: { projectName: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/projects/${projectName}/config`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as TConfigInfo)
      },

      async runGC({
        data,
        args: { projectName },
        params,
      }: {
        data: TGCInput
        args: { projectName: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/projects/${projectName}/gc`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async banCommit({
        data,
        args: { projectName },
        params,
      }: {
        data: TBanInput
        args: { projectName: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/projects/${projectName}/ban`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as TBanResultInfo)
      },

      async listAccessRightsforProject({
        args: { projectName },
        params,
      }: {
        args: { projectName: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/access`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TProjectAccessInfo)
      },

      async addUpdateandDeleteAccessRightsforProject({
        args: { projectName },
        params,
      }: {
        args: { projectName: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/projects/${projectName}/access`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TProjectAccessInfo)
      },

      async checkAccess({
        params,
      }: {
        params: {
          account?: string
          permission?: string
          ref?: string
        } & Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/MyProject/check.access`,
          auth,
          params: {
            account: params.account,
            perm: params.permission,
            ref: params.ref,
            ...omit(params, ['account', 'permission', 'ref']),
          },
        }).then(({ data }) => parseGerritResponse(data) as TAccessCheckInfo)
      },
    },
  }
}

export function branchEndpoints({
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
    branchEndpoints: {
      async listBranches({
        args: { projectName },
        params,
      }: {
        args: { projectName: string }
        params: {
          limit?: string
          skip?: string
          substring?: string
          regex?: string
        } & Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/branches/`,
          auth,
          params: {
            n: params.limit,
            S: params.skip,
            m: params.substring,
            r: params.regex,
            ...omit(params, ['limit', 'skip', 'substring', 'regex']),
          },
        }).then(({ data }) => parseGerritResponse(data) as TBranchInfo[])
      },

      async getBranch({
        args: { projectName, branchId },
        params,
      }: {
        args: { projectName: string; branchId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/branches/${branchId}`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TBranchInfo)
      },

      async createBranch({
        args: { projectName, branchId },
        params,
      }: {
        args: { projectName: string; branchId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/projects/${projectName}/branches/${branchId}`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TBranchInfo)
      },

      async deleteBranch({
        args: { projectName, branchId },
        params,
      }: {
        args: { projectName: string; branchId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/projects/${projectName}/branches/${branchId}`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async deleteBranches({
        data,
        args: { projectName },
        params,
      }: {
        data: TDeleteBranchesInput
        args: { projectName: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/projects/${projectName}/branches:delete`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getContent({
        args: { projectName, branchId, fileId },
        params,
      }: {
        args: { projectName: string; branchId: string; fileId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/branches/${branchId}/files/${fileId}/content`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getMergeableInformation({
        args: { projectName, branchId },
        params,
      }: {
        args: { projectName: string; branchId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/branches/${branchId}/mergeable`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TMergeableInfo)
      },

      async getReflog({
        args: { projectName, branchId },
        params,
      }: {
        args: { projectName: string; branchId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/branches/${branchId}/reflog`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },
    },
  }
}

export function childProjectEndpoints({
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
    childProjectEndpoints: {
      async listChildProjects({
        args: { projectName },
        params,
      }: {
        args: { projectName: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/children/`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TProjectInfo[])
      },

      async getChildProject({
        args: { projectName, projectName1 },
        params,
      }: {
        args: { projectName: string; projectName1: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/children/${projectName1}`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TProjectInfo)
      },
    },
  }
}

export function tagEndpoints({
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
    tagEndpoints: {
      async createTag({
        args: { projectName, tagId },
        params,
      }: {
        args: { projectName: string; tagId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/projects/${projectName}/tags/${tagId}`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TTagInfo)
      },

      async listTags({
        args: { projectName },
        params,
      }: {
        args: { projectName: string }
        params: {
          limit?: string
          skip?: string
          substring?: string
          regex?: string
        } & Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/tags/`,
          auth,
          params: {
            n: params.limit,
            S: params.skip,
            m: params.substring,
            r: params.regex,
            ...omit(params, ['limit', 'skip', 'substring', 'regex']),
          },
        }).then(({ data }) => parseGerritResponse(data) as TTagInfo[])
      },

      async getTag({
        args: { projectName, tagId },
        params,
      }: {
        args: { projectName: string; tagId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/tags/${tagId}`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TTagInfo)
      },

      async deleteTag({
        args: { projectName, tagId },
        params,
      }: {
        args: { projectName: string; tagId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/projects/${projectName}/tags/${tagId}`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async deleteTags({
        data,
        args: { projectName },
        params,
      }: {
        data: TDeleteTagsInput
        args: { projectName: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/projects/${projectName}/tags:delete`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },
    },
  }
}

export function commitEndpoints({
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
    commitEndpoints: {
      async getCommit({
        args: { projectName, commitId },
        params,
      }: {
        args: { projectName: string; commitId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/commits/${commitId}`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TCommitInfo)
      },

      async getIncludedIn({
        args: { projectName, commitId },
        params,
      }: {
        args: { projectName: string; commitId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/commits/${commitId}/in`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TIncludedInInfo)
      },

      async getContent({
        args: { projectName, commitId, fileId },
        params,
      }: {
        args: { projectName: string; commitId: string; fileId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/commits/${commitId}/files/${fileId}/content`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async cherryPickCommit({
        data,
        args: { projectName, commitId },
        params,
      }: {
        data: TCherryPickInput
        args: { projectName: string; commitId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/projects/${projectName}/commits/${commitId}/cherrypick`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as TChangeInfo)
      },

      async listFiles({
        args: { projectName, commitId },
        params,
      }: {
        args: { projectName: string; commitId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/commits/${commitId}/files/`,
          auth,
          params,
        }).then(
          ({ data }) => parseGerritResponse(data) as Record<string, TFileInfo>,
        )
      },
    },
  }
}

export function dashboardEndpoints({
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
    dashboardEndpoints: {
      async listDashboards({
        args: { projectName },
        params,
      }: {
        args: { projectName: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/dashboards/`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TDashboardInfo[])
      },

      async getDashboard({
        args: { projectName, dashboardId },
        params,
      }: {
        args: { projectName: string; dashboardId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/dashboards/${dashboardId}`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TDashboardInfo)
      },

      async createDashboard({
        data,
        args: { projectName, dashboardId },
        params,
      }: {
        data: TDashboardInput
        args: { projectName: string; dashboardId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/projects/${projectName}/dashboards/${dashboardId}`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as TDashboardInfo)
      },

      // eslint-disable-next-line sonarjs/no-identical-functions
      async updateDashboard({
        data,
        args: { projectName, dashboardId },
        params,
      }: {
        data: TDashboardInput
        args: { projectName: string; dashboardId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/projects/${projectName}/dashboards/${dashboardId}`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as TDashboardInfo)
      },

      async deleteDashboard({
        data,
        args: { projectName, dashboardId },
        params,
      }: {
        data: TDashboardInput
        args: { projectName: string; dashboardId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/projects/${projectName}/dashboards/${dashboardId}`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },
    },
  }
}

export function labelEndpoints({
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
    labelEndpoints: {
      async listLabels({
        args: { projectName },
        params,
      }: {
        args: { projectName: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/labels/`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getLabel({
        args: { projectName, labelName },
        params,
      }: {
        args: { projectName: string; labelName: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/labels/${labelName}`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TLabelDefinitionInfo)
      },

      async createLabel({
        args: { projectName, labelName },
        params,
      }: {
        args: { projectName: string; labelName: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/projects/${projectName}/labels/${labelName}`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TLabelDefinitionInfo)
      },

      // eslint-disable-next-line sonarjs/no-identical-functions
      async setLabel({
        args: { projectName, labelName },
        params,
      }: {
        args: { projectName: string; labelName: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/projects/${projectName}/labels/${labelName}`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TLabelDefinitionInfo)
      },

      async deleteLabel({
        data,
        args: { projectName, labelName },
        params,
      }: {
        data: TDeleteLabelInput
        args: { projectName: string; labelName: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/projects/${projectName}/labels/${labelName}`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async batchUpdateLabels({
        data,
        args: { projectName },
        params,
      }: {
        data: TBatchLabelInput
        args: { projectName: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/projects/${projectName}/labels/`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },
    },
  }
}
