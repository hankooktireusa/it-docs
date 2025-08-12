<link rel="stylesheet" href="/it-docs/assets/css/custom.css">

{% include lang-toggle.html %}

# 🧠 Roles & Permissions Documentation

This project defines a scalable Role-Based Access Control (RBAC) structure that replaces complex legacy groupings with clean, maintainable roles and privileges. It supports edge cases, pricing restrictions, and direct overrides while preserving equivalent access levels from the legacy system.

---

## 📑 Table of Contents

- 🧠 [Overview of Roles & Permissions](./structure-overview.md)  
  *Visual breakdown of role categories, features, actions, business channels, and access levels.*

- 📊 [RBAC Data Model](./data-model.md)  
  *Describes the core tables and relationships in the new roles and permissions structure.*

- 🧱 [Table Definitions](./table-definitions.md)  
  *Detailed schema for each table including columns, relationships, and notes.*

- 🧩 [Role Definitions](./role-definitions.md)  
  *Breakdown of all base roles and their assigned privileges.*

- 🔄 [Migration Plan](./migration-plan.md)  
  *Step-by-step process for converting legacy groups into RBAC roles and deploying the new system.*

- 🧮 [Privilege Matrix](./privilege-matrix.md)  
  *Maps legacy permissions to new privileges across all defined roles.*

- 🧭 [Evaluation Order](./evaluation-order.md)  
  *Clarifies how overlapping permissions are resolved in priority order.*

- 🚫 [No Pricing Rules](./no-pricing-rules.md)  
  *Defines restrictive rules that strip pricing privileges in specific edge cases.*

- 🧾 [Legacy Mapping](./legacy-mapping.md)  
  *Documentation of how legacy groups are interpreted into modern roles.*

- 🧷 [Direct Privileges](./direct-privileges.md)  
  *Guidance on granting user-specific overrides outside of role-based inheritance.*
