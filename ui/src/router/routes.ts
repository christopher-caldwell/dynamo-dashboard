export interface Route {
  title: string
  path?: string
  divider?: boolean
  icon?: string
  header?: string
}

const routes: Route[] = [
  {
    divider: true,
    title: 'Dynamo Options',
  },
  {
    title: 'Get Item',
    path: '/get-item',
  },
  {
    title: 'Query',
    path: '/query',
  },
  // {
  //   title: 'Put Item',
  //   path: '/put-item',
  // },
  // {
  //   divider: true,
  //   title: 'Settings',
  // },
  // {
  //   title: 'Global',
  //   path: '/settings',
  // },
]

export default routes
