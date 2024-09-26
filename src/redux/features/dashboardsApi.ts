import api from '../api'

const rootApi = '/dashboards'

const dashboardsApi = api.injectEndpoints({
  endpoints: build => ({
    dashboardSearch: build.query({
      query: name => ({
        url: `${rootApi}/dashboard-search`,
        params: { name }
      })
    })
  })
})

export const { useDashboardSearchQuery } = dashboardsApi
