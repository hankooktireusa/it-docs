---
layout: default
title: 🧮 Evaluation Order in the RBAC System
permalink: /en/web/proposals/ePortal-roles/evaluation-order/
---

<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
{% include lang-toggle.html %}

# 🧮 Evaluation Order in the RBAC System

This document explains how user permissions are determined in the new Role-Based Access Control (RBAC) model. The system moves from broad role assignment down to precise overrides, ensuring both flexibility and adherence to the Principle of Least Privilege.

<details>
  <summary><strong>📑 Table of Contents</strong></summary>
  <div markdown="1">

- [1. 🧱 Role Assignment](#role-assignment)
- [2. 🧭 Role Scoping (Optional)](#role-scoping)
- [3. ➕ Role Combination and Merging](#role-combination)
- [4. 🚫 Restrictive Roles (Modifiers)](#restrictive-roles)
- [5. 🛠️ Direct Privilege Overrides (Edge Cases)](#direct-overrides)
- [🔁 Summary Table](#summary-table)

  </div>
</details>

---

## 1. 🧱 Role Assignment {: #role-assignment }

Each user is assigned one or more roles, which define:

- A set of **permissions** (e.g., *Order Submission*, *Warranty Status*)
- The associated **privileges** for each permission:
  - `A` – Access
  - `S` – Stock
  - `U` – Unit Price
  - `L` – List Price

📚 These roles are defined in [role-definitions](./role-definitions.md) and serve as the foundational access model.

---

## 2. 🧭 Role Scoping (Optional) {: #role-scoping }

Roles may be scoped to narrow their effect:

- **Corporation** (e.g., US, CA, MX)
- **Industry Segment** (e.g., Retail, Fleet, Insurance)
- **Feature → Action → Channel** combinations

▶ If scoped, the role only applies **within that context**.

---

## 3. ➕ Role Combination and Merging {: #role-combination }

When users have multiple roles:

- Permissions from all roles are **merged**
- Privileges on a shared permission are **unified** (logical union)

📝 Example:  
If one role grants `A, S` on *Order Submission* and another grants `U`, the result is `A, S, U`.

---

## 4. 🚫 Restrictive Roles (Modifiers) {: #restrictive-roles }

Some roles act to **remove** privileges rather than add them.

- Example: `No Pricing` role removes all `U` and `L` privileges across all applicable permissions.
- These are layered **after** role merging.

🔒 Used to enforce restrictions such as `[SH-N]` legacy group logic.

---

## 5. 🛠️ Direct Privilege Overrides (Edge Cases) {: #direct-overrides }

In rare exceptions:

- Privileges may be directly added or removed at the **user level**
- These overrides apply **after all roles and restrictions** have been evaluated

⚠️ This should be used **sparingly**, only when roles cannot fully express the necessary access pattern.

---

## 🔁 Summary Table {: #summary-table }

| Level                | Description                                       | Example                                     |
|----------------------|---------------------------------------------------|---------------------------------------------|
| **Base Role**        | Main source of permissions/privileges            | `Order – WH Order Submission (A, S, U)`     |
| **Scoped Role**      | Role limited by corporation/segment/channel      | `Warranty – Create Warranty (CA only)`      |
| **Role Merging**     | Combines all roles for cumulative access         | `Order + Status + Warranty`                 |
| **Restrictive Role** | Reduces privileges granted by base roles         | `No Pricing` removes `U`, `L`               |
| **Direct Overrides** | Final edge-case adjustment at user level         | Add `U` to *Stock Report* for one user only |
