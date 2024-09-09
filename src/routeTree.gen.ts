/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as CampaignsImport } from './routes/campaigns'
import { Route as AccountImport } from './routes/account'
import { Route as NoteImport } from './routes/$note'
import { Route as CampaignImport } from './routes/$campaign'
import { Route as IndexImport } from './routes/index'
import { Route as CampaignsCreateImport } from './routes/campaigns_.create'
import { Route as CampaignNotesImport } from './routes/$campaign.notes'

// Create/Update Routes

const CampaignsRoute = CampaignsImport.update({
  path: '/campaigns',
  getParentRoute: () => rootRoute,
} as any)

const AccountRoute = AccountImport.update({
  path: '/account',
  getParentRoute: () => rootRoute,
} as any)

const NoteRoute = NoteImport.update({
  path: '/$note',
  getParentRoute: () => rootRoute,
} as any)

const CampaignRoute = CampaignImport.update({
  path: '/$campaign',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const CampaignsCreateRoute = CampaignsCreateImport.update({
  path: '/campaigns/create',
  getParentRoute: () => rootRoute,
} as any)

const CampaignNotesRoute = CampaignNotesImport.update({
  path: '/notes',
  getParentRoute: () => CampaignRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/$campaign': {
      id: '/$campaign'
      path: '/$campaign'
      fullPath: '/$campaign'
      preLoaderRoute: typeof CampaignImport
      parentRoute: typeof rootRoute
    }
    '/$note': {
      id: '/$note'
      path: '/$note'
      fullPath: '/$note'
      preLoaderRoute: typeof NoteImport
      parentRoute: typeof rootRoute
    }
    '/account': {
      id: '/account'
      path: '/account'
      fullPath: '/account'
      preLoaderRoute: typeof AccountImport
      parentRoute: typeof rootRoute
    }
    '/campaigns': {
      id: '/campaigns'
      path: '/campaigns'
      fullPath: '/campaigns'
      preLoaderRoute: typeof CampaignsImport
      parentRoute: typeof rootRoute
    }
    '/$campaign/notes': {
      id: '/$campaign/notes'
      path: '/notes'
      fullPath: '/$campaign/notes'
      preLoaderRoute: typeof CampaignNotesImport
      parentRoute: typeof CampaignImport
    }
    '/campaigns/create': {
      id: '/campaigns/create'
      path: '/campaigns/create'
      fullPath: '/campaigns/create'
      preLoaderRoute: typeof CampaignsCreateImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

interface CampaignRouteChildren {
  CampaignNotesRoute: typeof CampaignNotesRoute
}

const CampaignRouteChildren: CampaignRouteChildren = {
  CampaignNotesRoute: CampaignNotesRoute,
}

const CampaignRouteWithChildren = CampaignRoute._addFileChildren(
  CampaignRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/$campaign': typeof CampaignRouteWithChildren
  '/$note': typeof NoteRoute
  '/account': typeof AccountRoute
  '/campaigns': typeof CampaignsRoute
  '/$campaign/notes': typeof CampaignNotesRoute
  '/campaigns/create': typeof CampaignsCreateRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/$campaign': typeof CampaignRouteWithChildren
  '/$note': typeof NoteRoute
  '/account': typeof AccountRoute
  '/campaigns': typeof CampaignsRoute
  '/$campaign/notes': typeof CampaignNotesRoute
  '/campaigns/create': typeof CampaignsCreateRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/$campaign': typeof CampaignRouteWithChildren
  '/$note': typeof NoteRoute
  '/account': typeof AccountRoute
  '/campaigns': typeof CampaignsRoute
  '/$campaign/notes': typeof CampaignNotesRoute
  '/campaigns/create': typeof CampaignsCreateRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/$campaign'
    | '/$note'
    | '/account'
    | '/campaigns'
    | '/$campaign/notes'
    | '/campaigns/create'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/$campaign'
    | '/$note'
    | '/account'
    | '/campaigns'
    | '/$campaign/notes'
    | '/campaigns/create'
  id:
    | '__root__'
    | '/'
    | '/$campaign'
    | '/$note'
    | '/account'
    | '/campaigns'
    | '/$campaign/notes'
    | '/campaigns/create'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CampaignRoute: typeof CampaignRouteWithChildren
  NoteRoute: typeof NoteRoute
  AccountRoute: typeof AccountRoute
  CampaignsRoute: typeof CampaignsRoute
  CampaignsCreateRoute: typeof CampaignsCreateRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CampaignRoute: CampaignRouteWithChildren,
  NoteRoute: NoteRoute,
  AccountRoute: AccountRoute,
  CampaignsRoute: CampaignsRoute,
  CampaignsCreateRoute: CampaignsCreateRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/$campaign",
        "/$note",
        "/account",
        "/campaigns",
        "/campaigns/create"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/$campaign": {
      "filePath": "$campaign.tsx",
      "children": [
        "/$campaign/notes"
      ]
    },
    "/$note": {
      "filePath": "$note.tsx"
    },
    "/account": {
      "filePath": "account.tsx"
    },
    "/campaigns": {
      "filePath": "campaigns.tsx"
    },
    "/$campaign/notes": {
      "filePath": "$campaign.notes.tsx",
      "parent": "/$campaign"
    },
    "/campaigns/create": {
      "filePath": "campaigns_.create.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
