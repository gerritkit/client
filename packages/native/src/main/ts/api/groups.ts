import axios from 'axios'
import {
  TGroupOptionsInput,
  TMembersInput,
  TGroupsInput,
  TGroupInfo,
  TGroupOptionsInfo,
  TGroupAuditEventInfo,
  TAccountInfo,
} from '../types/index'
// NOTE: https://gerrit-review.googlesource.com/Documentation/rest-api.html#output
const xssiPrefix = ")]}'"
const parseGerritResponse = (data: string) =>
  JSON.parse(data.slice(xssiPrefix.length))

export function groupEndpoints({
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
    groupEndpoints: {
      async listGroups({
        params: { regex, substring },
      }: {
        params: { regex?: string; substring?: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/groups/`,
          auth,
          params: {
            r: regex,
            m: substring,
          },
        }).then(
          ({ data }) => parseGerritResponse(data) as Record<string, TGroupInfo>,
        )
      },

      async queryGroups() {
        return axios({
          method: 'GET',
          url: `${baseUrl}/groups/`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TGroupInfo[])
      },

      async getGroup({ args: { groupId } }: { args: { groupId: string } }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/groups/${groupId}`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TGroupInfo)
      },

      async createGroup({
        args: { groupName },
      }: {
        args: { groupName: string }
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/groups/${groupName}`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TGroupInfo)
      },

      async getGroupDetail({
        args: { groupId },
      }: {
        args: { groupId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/groups/${groupId}/detail`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TGroupInfo)
      },

      async getGroupName({ args: { groupId } }: { args: { groupId: string } }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/groups/${groupId}/name`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async renameGroup({ args: { groupId } }: { args: { groupId: string } }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/groups/${groupId}/name`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getGroupDescription({
        args: { groupId },
      }: {
        args: { groupId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/groups/${groupId}/description`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async setGroupDescription({
        args: { groupId },
      }: {
        args: { groupId: string }
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/groups/${groupId}/description`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async deleteGroupDescription({
        args: { groupId },
      }: {
        args: { groupId: string }
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/groups/${groupId}/description`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getGroupOptions({
        args: { groupId },
      }: {
        args: { groupId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/groups/${groupId}/options`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TGroupOptionsInfo)
      },

      async setGroupOptions({
        data,
        args: { groupId },
      }: {
        data: TGroupOptionsInput
        args: { groupId: string }
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/groups/${groupId}/options`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as TGroupOptionsInfo)
      },

      async getGroupOwner({
        args: { groupId },
      }: {
        args: { groupId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/groups/${groupId}/owner`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TGroupInfo)
      },

      async setGroupOwner({
        args: { groupId },
      }: {
        args: { groupId: string }
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/groups/${groupId}/owner`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TGroupInfo)
      },

      async getAuditLog({ args: { groupId } }: { args: { groupId: string } }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/groups/${groupId}/log.audit`,
          auth,
          params: {},
        }).then(
          ({ data }) => parseGerritResponse(data) as TGroupAuditEventInfo[],
        )
      },

      async indexGroup({ args: { groupId } }: { args: { groupId: string } }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/groups/${groupId}/index`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },
    },
  }
}

export function groupMemberEndpoints({
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
    groupMemberEndpoints: {
      async listGroupMembers({
        args: { groupId },
      }: {
        args: { groupId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/groups/${groupId}/members/`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TAccountInfo[])
      },

      async getGroupMember({
        args: { groupId, accountId },
      }: {
        args: { groupId: string; accountId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/groups/${groupId}/members/${accountId}`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TAccountInfo)
      },

      async addGroupMember({
        args: { groupId, accountId },
      }: {
        args: { groupId: string; accountId: string }
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/groups/${groupId}/members/${accountId}`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TAccountInfo)
      },

      async addGroupMembers({
        data,
        args: { groupId },
      }: {
        data: TMembersInput
        args: { groupId: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/groups/${groupId}/members`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async removeGroupMember({
        args: { groupId, accountId },
      }: {
        args: { groupId: string; accountId: string }
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/groups/${groupId}/members/${accountId}`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async removeGroupMembers({
        data,
        args: { groupId },
      }: {
        data: TMembersInput
        args: { groupId: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/groups/${groupId}/members.delete`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },
    },
  }
}

export function subgroupEndpoints({
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
    subgroupEndpoints: {
      async listSubgroups({
        args: { groupId },
      }: {
        args: { groupId: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/groups/${groupId}/groups/`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TGroupInfo[])
      },

      async getSubgroup({
        args: { groupId, groupId1 },
      }: {
        args: { groupId: string; groupId1: string }
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/groups/${groupId}/groups/${groupId1}`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TGroupInfo)
      },

      async addSubgroup({
        args: { groupId, groupId1 },
      }: {
        args: { groupId: string; groupId1: string }
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/groups/${groupId}/groups/${groupId1}`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as TGroupInfo)
      },

      async addSubgroups({
        data,
        args: { groupId },
      }: {
        data: TGroupsInput
        args: { groupId: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/groups/${groupId}/groups`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async removeSubgroup({
        args: { groupId, groupId1 },
      }: {
        args: { groupId: string; groupId1: string }
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/groups/${groupId}/groups/${groupId1}`,
          auth,
          params: {},
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async removeSubgroups({
        data,
        args: { groupId },
      }: {
        data: TGroupsInput
        args: { groupId: string }
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/groups/${groupId}/groups.delete`,
          auth,
          params: {},
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },
    },
  }
}
