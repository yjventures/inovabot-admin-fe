import api from '../api'

const rootApi = '/dashboards'

const dashboardsApi = api.injectEndpoints({
  endpoints: build => ({
    dashboardSearch: build.query({
      query: name => ({
        url: `${rootApi}/dashboard-search`,
        params: { name }
      })
    }),
    dashboardAnalytics: build.query({
      query: params => ({
        url: `${rootApi}/analytics`,
        params
      })
    })
  })
})

export const { useDashboardSearchQuery, useDashboardAnalyticsQuery } = dashboardsApi
