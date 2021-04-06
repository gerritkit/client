import axios from 'axios'

import {
  TCacheInfo,
  TCacheOperationInput,
  TCapabilityInfo,
  TConsistencyCheckInfo,
  TConsistencyCheckInput,
  TDiffPreferencesInput,
  TEmailConfirmationInput,
  TPreferencesInput,
  TServerInfo,
  TSummaryInfo,
  TTaskInfo,
} from '../types/index'
// NOTE: https://gerrit-review.googlesource.com/Documentation/rest-api.html#output
const xssiPrefix = ")]}'"
const parseGerritResponse = (data: string) =>
  JSON.parse(data.slice(xssiPrefix.length))

export function configEndpoints({
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
    configEndpoints: {
      async getVersion({ params }: { params?: Record<string, any> }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/config/server/version`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getServerInfo({ params }: { params?: Record<string, any> }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/config/server/info`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TServerInfo)
      },

      async checkConsistency({
        data,
        params,
      }: {
        data: TConsistencyCheckInput
        params?: Record<string, any>
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/config/server/check.consistency`,
          auth,
          params,
          data,
        }).then(
          ({ data }) => parseGerritResponse(data) as TConsistencyCheckInfo,
        )
      },

      async reloadConfig({ params }: { params?: Record<string, any> }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/config/server/reload`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async confirmEmail({
        data,
        params,
      }: {
        data: TEmailConfirmationInput
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/config/server/email.confirm`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async listCaches({ params }: { params?: Record<string, any> }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/config/server/caches/`,
          auth,
          params,
        }).then(
          ({ data }) => parseGerritResponse(data) as Record<string, TCacheInfo>,
        )
      },

      async cacheOperations({
        data,
        params,
      }: {
        data: TCacheOperationInput
        params?: Record<string, any>
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/config/server/caches/`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getCache({
        args: { cacheName },
        params,
      }: {
        args: { cacheName: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/config/server/caches/${cacheName}`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TCacheInfo)
      },

      async flushCache({
        args: { cacheName },
        params,
      }: {
        args: { cacheName: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/config/server/caches/${cacheName}/flush`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getSummary({ params }: { params?: Record<string, any> }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/config/server/summary`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TSummaryInfo)
      },

      async listCapabilities({ params }: { params?: Record<string, any> }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/config/server/capabilities`,
          auth,
          params,
        }).then(
          ({ data }) =>
            parseGerritResponse(data) as Record<string, TCapabilityInfo>,
        )
      },

      async listTasks({ params }: { params?: Record<string, any> }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/config/server/tasks/`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TTaskInfo[])
      },

      async getTask({
        args: { taskId },
        params,
      }: {
        args: { taskId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/config/server/tasks/${taskId}`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TTaskInfo)
      },

      async deleteTask({
        args: { taskId },
        params,
      }: {
        args: { taskId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'DELETE',
          url: `${baseUrl}/config/server/tasks/${taskId}`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getTopMenus({ params }: { params?: Record<string, any> }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/config/server/top-menus`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getDefaultUserPreferences({
        params,
      }: {
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/config/server/preferences`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async setDefaultUserPreferences({
        data,
        params,
      }: {
        data: TPreferencesInput
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/config/server/preferences`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getDefaultDiffPreferences({
        params,
      }: {
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/config/server/preferences.diff`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async setDefaultDiffPreferences({
        data,
        params,
      }: {
        data: TDiffPreferencesInput
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/config/server/preferences.diff`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async getDefaultEditPreferences({
        params,
      }: {
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/config/server/preferences.edit`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },

      async setDefaultEditPreferences({
        data,
        params,
      }: {
        data: any
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/config/server/preferences.edit`,
          auth,
          params,
          data,
        }).then(({ data }) => parseGerritResponse(data) as any)
      },
    },
  }
}
