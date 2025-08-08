# 📘 Table Definitions

<details>
<summary><strong>📑 Table of Contents (click to expand)</strong></summary>

- [`users`](#users)
- [`roles`](#roles)
- [`user_roles`](#user_roles)
- [`role_corporation`](#role_corporation)
- [`role_industry_segment`](#role_industry_segment)
- [`permissions`](#permissions)
- [`privileges`](#privileges)
- [`role_permissions`](#role_permissions)

</details>

---

## `users`

Stores individual user accounts that can be assigned one or more roles. Users do not directly receive permissions or privileges — everything is inherited through assigned roles.


### Columns

 | Column     | Type     | Description                      |
 |------------|----------|----------------------------------|
 | `id`       | INT      | Primary key                      |
 | `email`    | VARCHAR  | User’s email address (unique)    |
 | `name`     | VARCHAR  | Full name (optional)             |

### Relationships

 - 🔗 `user_roles` → assigns roles to this user

### Notes

 - Users can be assigned multiple roles at once  
 - Permissions and access levels are resolved entirely through role inheritance  
 - Optional metadata like `name`, `department`, or `employee_id` can be added

---

## `roles`

Stores reusable role templates that define a set of permission/privilege pairs. Roles are not tied to a specific user, corporation, or segment by default — they gain context through the `user_roles`, `role_corporation`, and `role_industry_segment` tables.


### Columns

 | Column        | Type      | Description                          |
 |---------------|-----------|--------------------------------------|
 | `id`          | INT       | Unique identifier for the role       |
 | `name`        | VARCHAR   | Display name (e.g., "Order – WH Order Submission") |
 | `description` | TEXT      | Optional explanation of the role’s purpose |

### Relationships

 - 🔗 `user_roles` → assigns this role to users  
 - 🔗 `role_permissions` → defines the permissions and privileges this role grants  
 - 🔗 `role_corporation` → scopes this role to one or more corporations  
 - 🔗 `role_industry_segment` → scopes this role to one or more industry segments

### Notes

 - Role names are designed to be descriptive and user-readable  
 - Roles can be reused across corporations and segments unless restricted by scoping

---

## `user_roles`

Links users to their assigned roles.


### Columns

 | Column     | Type     | Description               |
 |------------|----------|---------------------------|
 | `user_id`  | INT      | FK to `users.id`          |
 | `role_id`  | INT      | FK to `roles.id`          |

### Relationships

 - 🔗 `users` → defines who the role is assigned to  
 - 🔗 `roles` → defines what permissions the user receives

### Notes

 - A user may have multiple roles (e.g., "Order Submitter" and "Report Viewer")  
 - Roles are always assigned through this table, never directly to permissions  
 - Corporation/segment scoping is determined at the role level — not per user

---

## `role_corporation`

Scopes a role to one or more corporations (e.g., US, CA, MX). This allows roles to be reused across different corporate entities while maintaining clear boundaries for access control.


### Columns

 | Column        | Type     | Description                          |
 |---------------|----------|--------------------------------------|
 | `role_id`     | INT      | FK to `roles.id`                     |
 | `corporation` | VARCHAR  | Country code or business unit (e.g., 'US', 'CA') |

### Relationships

 - 🔗 `roles` → defines which role is scoped

### Notes

 - A role with no entry in this table is assumed to be global (not restricted by corp)  
 - Use this to enforce corporation-specific access policies (e.g., pricing, product lines)  
 - Corporation codes should align with your system's canonical corp definitions

---

## `role_industry_segment`

Scopes a role to one or more industry segments (e.g., Fleet, Retail, Commercial). This enables more granular control over who can use a role, based on business type.


### Columns

 | Column             | Type     | Description                              |
 |--------------------|----------|------------------------------------------|
 | `role_id`          | INT      | FK to `roles.id`                         |
 | `industry_segment` | VARCHAR  | Segment label (e.g., 'Fleet', 'Retail')  |

### Relationships

 - 🔗 `roles` → defines which role is scoped

### Notes

 - Roles with no associated segment are considered available to all segments  
 - You can assign the same role to multiple segments using multiple rows  
 - Segment names should be standardized across your platform (e.g., from a lookup table)

---

## `permissions`

Represents a unique system action grouped by feature and action type. Permissions define *what* the user is allowed to do (e.g., submit orders, view status, create claims), but not *how much* — privileges determine that.


### Columns

 | Column     | Type      | Description                                       |
 |------------|-----------|---------------------------------------------------|
 | `id`       | INT       | Unique identifier for the permission              |
 | `name`     | VARCHAR   | Canonical label (e.g., "Order Submission")        |
 | `feature`  | VARCHAR   | Top-level category (e.g., "Order", "Report")      |
 | `action`   | VARCHAR   | Action type: "Create" or "Status" (currently)     |

### Relationships

 - 🔗 `role_permissions` → assigns this permission to specific roles  
 - 🧭 Privileges for each permission are defined per role

### Notes

 - The `feature` and `action` columns allow for grouping and filtering in UI displays  
 - `name` should remain stable across corporations/segments unless there is a global change  
 - Permissions are reused across roles and corporations; they are **not scoped** by corp or segment directly

---

## `privileges`

Defines the level of access that a user has for a given permission. Privileges modify *how much* access a user has, in contrast to permissions which define *what* action is allowed.


### Columns

 | Column     | Type     | Description                         |
 |------------|----------|-------------------------------------|
 | `code`     | CHAR(1)  | Unique code: A, S, U, or L          |
 | `label`    | VARCHAR  | Full name: Access, Stock, etc.      |

### Relationships

 - 🔗 `role_permissions` → privileges are linked to roles via permission mappings

### Notes

 - Current supported values:  
   - `A`: Access (basic visibility or use)  
   - `S`: Stock (inventory or availability)  
   - `U`: Unit Price  
   - `L`: List Price  
 - These codes are consistent across all permissions and are **not scoped** by corp or segment  
 - Additional privilege codes could be added in the future as needed

---

## `role_permissions`

Joins roles to permissions and defines which specific privileges apply. This is the core table that controls *what* actions a role allows and *to what extent*.


### Columns

 | Column           | Type     | Description                           |
 |------------------|----------|---------------------------------------|
 | `role_id`        | INT      | FK to `roles.id`                      |
 | `permission_id`  | INT      | FK to `permissions.id`                |
 | `privilege_code` | CHAR(1)  | FK to `privileges.code` (A, S, U, L)  |

### Relationships

 - 🔗 `roles` → defines who the permission applies to  
 - 🔗 `permissions` → defines what action is allowed  
 - 🔗 `privileges` → defines the level of access for that action

### Notes

 - A single role can map to the same permission multiple times with different privileges  
 - This table is what enforces least privilege at the role level  
 - No corporate or segment scoping exists here — that comes from `role_corporation` and `role_industry_segment`
