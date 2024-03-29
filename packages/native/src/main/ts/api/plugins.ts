import axios from 'axios'
import omit from 'lodash.omit'

import { TPluginInfo } from '../types/index'
// NOTE: https://gerrit-review.googlesource.com/Documentation/rest-api.html#output
const xssiPrefix = ")]}'"
const parseGerritResponse = (data: string) =>
  JSON.parse(data.slice(xssiPrefix.length))

export function pluginEndpoints({
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
    pluginEndpoints: {
      async listPlugins({
        params,
      }: {
        params: {
          all?: string
          limit?: string
          prefix?: string
          regex?: string
          skip?: string
          substring?: string
        } & Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/plugins/`,
          auth,
          params: {
            a: params.all,
            n: params.limit,
            p: params.prefix,
            r: params.regex,
            S: params.skip,
            m: params.substring,
            ...omit(params, [
              'all',
              'limit',
              'prefix',
              'regex',
              'skip',
              'substring',
            ]),
          },
        }).then(
          ({ data }) =>
            parseGerritResponse(data) as Record<string, TPluginInfo>,
        )
      },

      async installPlugin({
        args: { pluginId },
        params,
      }: {
        args: { pluginId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'PUT',
          url: `${baseUrl}/plugins/${pluginId}.jar`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TPluginInfo)
      },

      async getPluginStatus({
        args: { pluginId },
        params,
      }: {
        args: { pluginId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'GET',
          url: `${baseUrl}/plugins/${pluginId}/gerrit~status`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TPluginInfo)
      },

      async enablePlugin({
        args: { pluginId },
        params,
      }: {
        args: { pluginId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/plugins/${pluginId}/gerrit~enable`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TPluginInfo)
      },

      async disablePlugin({
        args: { pluginId },
        params,
      }: {
        args: { pluginId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/plugins/${pluginId}/gerrit~disable`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TPluginInfo)
      },

      async reloadPlugin({
        args: { pluginId },
        params,
      }: {
        args: { pluginId: string }
        params?: Record<string, any>
      }) {
        return axios({
          method: 'POST',
          url: `${baseUrl}/plugins/${pluginId}/gerrit~reload`,
          auth,
          params,
        }).then(({ data }) => parseGerritResponse(data) as TPluginInfo)
      },
    },
  }
}
