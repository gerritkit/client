import axios from 'axios'
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

export type IListProjectsOpts = {
  branch?: string
  description?: string
  limit?: number
  prefix?: string
  regex?: string
  skip?: string
  substring?: string
  tree?: string
  state?: string
  type?: string
}

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
        params: {
          branch,
          description,
          limit,
          prefix,
          regex,
          skip,
          substring,
          tree,
          state,
          type,
        },
      }: {
        params: IListProjectsOpts
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/`,
          auth,
          params: {
            b: branch,
            d: description,
            n: limit,
            p: prefix,
            r: regex,
            S: skip,
            m: substring,
            t: tree,
            s: state,
            type,
          },
        }).then(({ data }) => parseGerritResponse(data) as TProjectInfo[])
      },

      async queryProjects() {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TProjectInfo[])
      },

      async getProject({
        args: { projectName },
      }: {
        args: { projectName: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TProjectInfo)
      },

      async createProject({
        args: { projectName },
      }: {
        args: { projectName: string }
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/projects/${projectName}`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TProjectInfo)
      },

      async getProjectDescription({
        args: { projectName },
      }: {
        args: { projectName: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/description`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async setProjectDescription({
        data,
        args: { projectName },
      }: {
        data: TProjectDescriptionInput
        args: { projectName: string }
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/projects/${projectName}/description`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async deleteProjectDescription({
        data,
        args: { projectName },
      }: {
        data: TProjectDescriptionInput
        args: { projectName: string }
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/projects/${projectName}/description`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getProjectParent({
        args: { projectName },
      }: {
        args: { projectName: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/parent`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async setProjectParent({
        data,
        args: { projectName },
      }: {
        data: TProjectParentInput
        args: { projectName: string }
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/projects/${projectName}/parent`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getHEAD({
        args: { projectName },
      }: {
        args: { projectName: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/HEAD`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async setHEAD({
        data,
        args: { projectName },
      }: {
        data: THeadInput
        args: { projectName: string }
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/projects/${projectName}/HEAD`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getRepositoryStatistics({
        args: { projectName },
      }: {
        args: { projectName: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/statistics.git`,
          auth,
          params: {},
        }).then(
          ({ data }) => parseGerritResponse(data) as TRepositoryStatisticsInfo,
        )
      },

      async getConfig({
        args: { projectName },
      }: {
        args: { projectName: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/config`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TConfigInfo)
      },

      async setConfig({
        data,
        args: { projectName },
      }: {
        data: TConfigInput
        args: { projectName: string }
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/projects/${projectName}/config`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as TConfigInfo)
      },

      async runGC({
        data,
        args: { projectName },
      }: {
        data: TGCInput
        args: { projectName: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/projects/${projectName}/gc`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async banCommit({
        data,
        args: { projectName },
      }: {
        data: TBanInput
        args: { projectName: string }
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/projects/${projectName}/ban`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as TBanResultInfo)
      },

      async listAccessRightsforProject({
        args: { projectName },
      }: {
        args: { projectName: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/access`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TProjectAccessInfo)
      },

      async addUpdateandDeleteAccessRightsforProject({
        args: { projectName },
      }: {
        args: { projectName: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/projects/${projectName}/access`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TProjectAccessInfo)
      },

      async checkAccess() {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/MyProject/check.access`,
          auth,
          params: {},
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
      }: {
        args: { projectName: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/branches/`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TBranchInfo[])
      },

      async getBranch({
        args: { projectName, branchId },
      }: {
        args: { projectName: string; branchId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/branches/${branchId}`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TBranchInfo)
      },

      async createBranch({
        args: { projectName, branchId },
      }: {
        args: { projectName: string; branchId: string }
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/projects/${projectName}/branches/${branchId}`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TBranchInfo)
      },

      async deleteBranch({
        args: { projectName, branchId },
      }: {
        args: { projectName: string; branchId: string }
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/projects/${projectName}/branches/${branchId}`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async deleteBranches({
        data,
        args: { projectName },
      }: {
        data: TDeleteBranchesInput
        args: { projectName: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/projects/${projectName}/branches:delete`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getContent({
        args: { projectName, branchId, fileId },
      }: {
        args: { projectName: string; branchId: string; fileId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/branches/${branchId}/files/${fileId}/content`,
          auth,
          params: {},
        }).then(({ data }) => data as any)
      },

      async getMergeableInformation({
        args: { projectName, branchId },
      }: {
        args: { projectName: string; branchId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/branches/${branchId}/mergeable`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TMergeableInfo)
      },

      async getReflog({
        args: { projectName, branchId },
      }: {
        args: { projectName: string; branchId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/branches/${branchId}/reflog`,
          auth,
          params: {},
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
      }: {
        args: { projectName: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/children/`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TProjectInfo[])
      },

      async getChildProject({
        args: { projectName, projectName1 },
      }: {
        args: { projectName: string; projectName1: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/children/${projectName1}`,
          auth,
          params: {},
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
      }: {
        args: { projectName: string; tagId: string }
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/projects/${projectName}/tags/${tagId}`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TTagInfo)
      },

      async listTags({
        args: { projectName },
      }: {
        args: { projectName: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/tags/`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TTagInfo[])
      },

      async getTag({
        args: { projectName, tagId },
      }: {
        args: { projectName: string; tagId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/tags/${tagId}`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TTagInfo)
      },

      async deleteTag({
        args: { projectName, tagId },
      }: {
        args: { projectName: string; tagId: string }
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/projects/${projectName}/tags/${tagId}`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async deleteTags({
        data,
        args: { projectName },
      }: {
        data: TDeleteTagsInput
        args: { projectName: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/projects/${projectName}/tags:delete`,
          auth,
          params: {},
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
      }: {
        args: { projectName: string; commitId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/commits/${commitId}`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TCommitInfo)
      },

      async getIncludedIn({
        args: { projectName, commitId },
      }: {
        args: { projectName: string; commitId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/commits/${commitId}/in`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TIncludedInInfo)
      },

      async getContent({
        args: { projectName, commitId, fileId },
      }: {
        args: { projectName: string; commitId: string; fileId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/commits/${commitId}/files/${fileId}/content`,
          auth,
          params: {},
        }).then(({ data }) => data as any)
      },

      async cherryPickCommit({
        data,
        args: { projectName, commitId },
      }: {
        data: TCherryPickInput
        args: { projectName: string; commitId: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/projects/${projectName}/commits/${commitId}/cherrypick`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as TChangeInfo)
      },

      async listFiles({
        args: { projectName, commitId },
      }: {
        args: { projectName: string; commitId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/commits/${commitId}/files/`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TFileInfo)
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
      }: {
        args: { projectName: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/dashboards/`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TDashboardInfo[])
      },

      async getDashboard({
        args: { projectName, dashboardId },
      }: {
        args: { projectName: string; dashboardId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/dashboards/${dashboardId}`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TDashboardInfo)
      },

      async createDashboard({
        data,
        args: { projectName, dashboardId },
      }: {
        data: TDashboardInput
        args: { projectName: string; dashboardId: string }
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/projects/${projectName}/dashboards/${dashboardId}`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as TDashboardInfo)
      },

      async updateDashboard({
        data,
        args: { projectName, dashboardId },
      }: {
        data: TDashboardInput
        args: { projectName: string; dashboardId: string }
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/projects/${projectName}/dashboards/${dashboardId}`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as TDashboardInfo)
      },

      async deleteDashboard({
        data,
        args: { projectName, dashboardId },
      }: {
        data: TDashboardInput
        args: { projectName: string; dashboardId: string }
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/projects/${projectName}/dashboards/${dashboardId}`,
          auth,
          params: {},
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
      }: {
        args: { projectName: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/labels/`,
          auth,
          params: {},
        }).then(
          ({ data }) => parseGerritResponse(data) as TLabelDefinitionInfo[],
        )
      },

      async getLabel({
        args: { projectName, labelName },
      }: {
        args: { projectName: string; labelName: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/projects/${projectName}/labels/${labelName}`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TLabelDefinitionInfo)
      },

      async createLabel({
        args: { projectName, labelName },
      }: {
        args: { projectName: string; labelName: string }
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/projects/${projectName}/labels/${labelName}`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TLabelDefinitionInfo)
      },

      async setLabel({
        args: { projectName, labelName },
      }: {
        args: { projectName: string; labelName: string }
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/projects/${projectName}/labels/${labelName}`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TLabelDefinitionInfo)
      },

      async deleteLabel({
        data,
        args: { projectName, labelName },
      }: {
        data: TDeleteLabelInput
        args: { projectName: string; labelName: string }
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/projects/${projectName}/labels/${labelName}`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async batchUpdateLabels({
        data,
        args: { projectName },
      }: {
        data: TBatchLabelInput
        args: { projectName: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/projects/${projectName}/labels/`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },
    },
  }
}
