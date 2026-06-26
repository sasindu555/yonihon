export const ALL_PERMISSIONS = {
  "experiences:read": "View Experiences",
  "experiences:write": "Create/Edit Experiences",
  "experiences:delete": "Delete Experiences",
  "events:read": "View Events",
  "events:write": "Create/Edit Events",
  "events:delete": "Delete Events",
  "guides:read": "View Travel Guides",
  "guides:write": "Create/Edit Travel Guides",
  "guides:delete": "Delete Travel Guides",
  "destinations:read": "View Destinations",
  "destinations:write": "Create/Delete Destinations",
  "categories:read": "View Categories",
  "categories:write": "Create/Delete Categories",
  "users:read": "View Users",
  "users:write": "Create/Edit Users",
  "users:delete": "Delete Users",
} as const;

export type Permission = keyof typeof ALL_PERMISSIONS;

export interface RoleDefinition {
  role: string;
  label: string;
  permissions: Permission[];
}

export const DEFAULT_ROLES: RoleDefinition[] = [
  {
    role: "super_admin",
    label: "Super Admin",
    permissions: Object.keys(ALL_PERMISSIONS) as Permission[],
  },
  {
    role: "editor",
    label: "Editor",
    permissions: [
      "experiences:read",
      "experiences:write",
      "experiences:delete",
      "events:read",
      "events:write",
      "events:delete",
      "guides:read",
      "guides:write",
      "guides:delete",
      "destinations:read",
      "destinations:write",
      "categories:read",
      "categories:write",
    ],
  },
  {
    role: "support",
    label: "Support",
    permissions: [
      "experiences:read",
      "events:read",
      "guides:read",
      "destinations:read",
      "categories:read",
    ],
  },
];
