/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as CampaignsImport } from './routes/campaigns'
import { Route as IndexImport } from './routes/index'
import { Route as CampaignsCreateImport } from './routes/campaigns_.create'
import { Route as CampaignNotesImport } from './routes/$campaign.notes'
import { Route as CampaignNoteImport } from './routes/$campaign.$note'
import { Route as CampaignNotesCreateImport } from './routes/$campaign.notes_.create'

// Create/Update Routes

const CampaignsRoute = CampaignsImport.update({
  path: '/campaigns',
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
  path: '/$campaign/notes',
  getParentRoute: () => rootRoute,
} as any)

const CampaignNoteRoute = CampaignNoteImport.update({
  path: '/$campaign/$note',
  getParentRoute: () => rootRoute,
} as any)

const CampaignNotesCreateRoute = CampaignNotesCreateImport.update({
  path: '/$campaign/notes/create',
  getParentRoute: () => rootRoute,
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
    '/campaigns': {
      id: '/campaigns'
      path: '/campaigns'
      fullPath: '/campaigns'
      preLoaderRoute: typeof CampaignsImport
      parentRoute: typeof rootRoute
    }
    '/$campaign/$note': {
      id: '/$campaign/$note'
      path: '/$campaign/$note'
      fullPath: '/$campaign/$note'
      preLoaderRoute: typeof CampaignNoteImport
      parentRoute: typeof rootRoute
    }
    '/$campaign/notes': {
      id: '/$campaign/notes'
      path: '/$campaign/notes'
      fullPath: '/$campaign/notes'
      preLoaderRoute: typeof CampaignNotesImport
      parentRoute: typeof rootRoute
    }
    '/campaigns/create': {
      id: '/campaigns/create'
      path: '/campaigns/create'
      fullPath: '/campaigns/create'
      preLoaderRoute: typeof CampaignsCreateImport
      parentRoute: typeof rootRoute
    }
    '/$campaign/notes/create': {
      id: '/$campaign/notes/create'
      path: '/$campaign/notes/create'
      fullPath: '/$campaign/notes/create'
      preLoaderRoute: typeof CampaignNotesCreateImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/campaigns': typeof CampaignsRoute
  '/$campaign/$note': typeof CampaignNoteRoute
  '/$campaign/notes': typeof CampaignNotesRoute
  '/campaigns/create': typeof CampaignsCreateRoute
  '/$campaign/notes/create': typeof CampaignNotesCreateRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/campaigns': typeof CampaignsRoute
  '/$campaign/$note': typeof CampaignNoteRoute
  '/$campaign/notes': typeof CampaignNotesRoute
  '/campaigns/create': typeof CampaignsCreateRoute
  '/$campaign/notes/create': typeof CampaignNotesCreateRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/campaigns': typeof CampaignsRoute
  '/$campaign/$note': typeof CampaignNoteRoute
  '/$campaign/notes': typeof CampaignNotesRoute
  '/campaigns/create': typeof CampaignsCreateRoute
  '/$campaign/notes/create': typeof CampaignNotesCreateRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/campaigns'
    | '/$campaign/$note'
    | '/$campaign/notes'
    | '/campaigns/create'
    | '/$campaign/notes/create'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/campaigns'
    | '/$campaign/$note'
    | '/$campaign/notes'
    | '/campaigns/create'
    | '/$campaign/notes/create'
  id:
    | '__root__'
    | '/'
    | '/campaigns'
    | '/$campaign/$note'
    | '/$campaign/notes'
    | '/campaigns/create'
    | '/$campaign/notes/create'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CampaignsRoute: typeof CampaignsRoute
  CampaignNoteRoute: typeof CampaignNoteRoute
  CampaignNotesRoute: typeof CampaignNotesRoute
  CampaignsCreateRoute: typeof CampaignsCreateRoute
  CampaignNotesCreateRoute: typeof CampaignNotesCreateRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CampaignsRoute: CampaignsRoute,
  CampaignNoteRoute: CampaignNoteRoute,
  CampaignNotesRoute: CampaignNotesRoute,
  CampaignsCreateRoute: CampaignsCreateRoute,
  CampaignNotesCreateRoute: CampaignNotesCreateRoute,
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
        "/campaigns",
        "/$campaign/$note",
        "/$campaign/notes",
        "/campaigns/create",
        "/$campaign/notes/create"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/campaigns": {
      "filePath": "campaigns.tsx"
    },
    "/$campaign/$note": {
      "filePath": "$campaign.$note.tsx"
    },
    "/$campaign/notes": {
      "filePath": "$campaign.notes.tsx"
    },
    "/campaigns/create": {
      "filePath": "campaigns_.create.tsx"
    },
    "/$campaign/notes/create": {
      "filePath": "$campaign.notes_.create.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
