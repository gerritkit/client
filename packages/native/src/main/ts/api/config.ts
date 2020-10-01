import axios from 'axios'
import {
  TCacheInfo,
  TCacheOperationInput,
  TCapabilityInfo,
  TConsistencyCheckInfo,
  TDiffPreferencesInput,
  TEmailConfirmationInput,
  TPreferencesInput,
  TServerInfo,
  TSummaryInfo,
  TTaskInfo,
  TConsistencyCheckInput,
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
    async getVersion() {
      return axios({
        method: 'GET',
        url: `${baseUrl}/config/server/version`,
        auth,
        params: {},
      }).then(({ data }) => parseGerritResponse(data) as any)
    },

    async getServerInfo() {
      return axios({
        method: 'GET',
        url: `${baseUrl}/config/server/info`,
        auth,
        params: {},
      }).then(({ data }) => parseGerritResponse(data) as TServerInfo)
    },

    async checkConsistency({ data }: { data: TConsistencyCheckInput }) {
      return axios({
        method: 'POST',
        url: `${baseUrl}/config/server/check.consistency`,
        auth,
        params: {},
        data,
      }).then(({ data }) => parseGerritResponse(data) as TConsistencyCheckInfo)
    },

    async reloadConfig() {
      return axios({
        method: 'POST',
        url: `${baseUrl}/config/server/reload`,
        auth,
        params: {},
      }).then(({ data }) => parseGerritResponse(data) as any)
    },

    async confirmEmail({ data }: { data: TEmailConfirmationInput }) {
      return axios({
        method: 'PUT',
        url: `${baseUrl}/config/server/email.confirm`,
        auth,
        params: {},
        data,
      }).then(({ data }) => parseGerritResponse(data) as any)
    },

    async listCaches() {
      return axios({
        method: 'GET',
        url: `${baseUrl}/config/server/caches/`,
        auth,
        params: {},
      }).then(({ data }) => parseGerritResponse(data) as TCacheInfo[])
    },

    async cacheOperations({ data }: { data: TCacheOperationInput }) {
      return axios({
        method: 'POST',
        url: `${baseUrl}/config/server/caches/`,
        auth,
        params: {},
        data,
      }).then(({ data }) => parseGerritResponse(data) as any)
    },

    async getCache({ args: { cacheName } }: { args: { cacheName: string } }) {
      return axios({
        method: 'GET',
        url: `${baseUrl}/config/server/caches/${cacheName}`,
        auth,
        params: {},
      }).then(({ data }) => parseGerritResponse(data) as TCacheInfo)
    },

    async flushCache({ args: { cacheName } }: { args: { cacheName: string } }) {
      return axios({
        method: 'POST',
        url: `${baseUrl}/config/server/caches/${cacheName}/flush`,
        auth,
        params: {},
      }).then(({ data }) => parseGerritResponse(data) as any)
    },

    async getSummary() {
      return axios({
        method: 'GET',
        url: `${baseUrl}/config/server/summary`,
        auth,
        params: {},
      }).then(({ data }) => parseGerritResponse(data) as TSummaryInfo)
    },

    async listCapabilities() {
      return axios({
        method: 'GET',
        url: `${baseUrl}/config/server/capabilities`,
        auth,
        params: {},
      }).then(({ data }) => parseGerritResponse(data) as TCapabilityInfo[])
    },

    async listTasks() {
      return axios({
        method: 'GET',
        url: `${baseUrl}/config/server/tasks/`,
        auth,
        params: {},
      }).then(({ data }) => parseGerritResponse(data) as TTaskInfo[])
    },

    async getTask({ args: { taskId } }: { args: { taskId: string } }) {
      return axios({
        method: 'GET',
        url: `${baseUrl}/config/server/tasks/${taskId}`,
        auth,
        params: {},
      }).then(({ data }) => parseGerritResponse(data) as TTaskInfo)
    },

    async deleteTask({ args: { taskId } }: { args: { taskId: string } }) {
      return axios({
        method: 'DELETE',
        url: `${baseUrl}/config/server/tasks/${taskId}`,
        auth,
        params: {},
      }).then(({ data }) => parseGerritResponse(data) as any)
    },

    async getTopMenus() {
      return axios({
        method: 'GET',
        url: `${baseUrl}/config/server/top-menus`,
        auth,
        params: {},
      }).then(({ data }) => parseGerritResponse(data) as any)
    },

    async getDefaultUserPreferences() {
      return axios({
        method: 'GET',
        url: `${baseUrl}/config/server/preferences`,
        auth,
        params: {},
      }).then(({ data }) => parseGerritResponse(data) as any)
    },

    async setDefaultUserPreferences({ data }: { data: TPreferencesInput }) {
      return axios({
        method: 'PUT',
        url: `${baseUrl}/config/server/preferences`,
        auth,
        params: {},
        data,
      }).then(({ data }) => parseGerritResponse(data) as any)
    },

    async getDefaultDiffPreferences() {
      return axios({
        method: 'GET',
        url: `${baseUrl}/config/server/preferences.diff`,
        auth,
        params: {},
      }).then(({ data }) => parseGerritResponse(data) as any)
    },

    async setDefaultDiffPreferences({ data }: { data: TDiffPreferencesInput }) {
      return axios({
        method: 'PUT',
        url: `${baseUrl}/config/server/preferences.diff`,
        auth,
        params: {},
        data,
      }).then(({ data }) => parseGerritResponse(data) as any)
    },

    async getDefaultEditPreferences() {
      return axios({
        method: 'GET',
        url: `${baseUrl}/config/server/preferences.edit`,
        auth,
        params: {},
      }).then(({ data }) => parseGerritResponse(data) as any)
    },

    async setDefaultEditPreferences({ data }: { data: TEditPreferencesInput }) {
      return axios({
        method: 'PUT',
        url: `${baseUrl}/config/server/preferences.edit`,
        auth,
        params: {},
        data,
      }).then(({ data }) => parseGerritResponse(data) as any)
    },
  }
}
