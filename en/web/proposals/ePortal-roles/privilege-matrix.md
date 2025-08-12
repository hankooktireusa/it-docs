---
layout: default
title: 📊 Privilege Matrix
permalink: /en/web/proposals/ePortal-roles/privilege-matrix/
---

<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
{% include lang-toggle.html %}

# 📊 Privilege Matrix

A full matrix of all permissions used across roles, showing which privilege levels each permission exposes.

> **ℹ️ Note:** This matrix reflects the privilege levels defined by the new RBAC role model.  
> Each permission listed below maps to the `A`, `S`, `U`, and `L` privileges based on how it is used in the roles described in [`role-definitions.md`](/it-docs/en/web/proposals/ePortal-roles/role-definitions.md).  
> This document is forward-looking and intended to support auditing, override logic, and role design decisions. It does not reflect historical group usage.

---

<details>
  <summary><strong>📑 Table of Contents (click to expand)</strong></summary>
  <div markdown="1">

- [`Order`](#order)
- [`National Account`](#national-account)
- [`Status`](#status)
- [`Report`](#report)
- [`Warranty`](#warranty)
- [`All Permissions`](#all-permissions)

  </div>
</details>

---

- **A** = Access  
- **S** = Stock  
- **U** = Unit Price  
- **L** = List Price  

---

## `Order`

| Permission                            | A   | S   | U   | L   |
|----------------------------------------|-----|-----|-----|-----|
| WH Order → Order Submission            | ✅  | ✅  | ✅  |     |
| WH Order → Quick Order                 | ✅  | ✅  | ✅  |     |
| Secondary Supply → Delivery Check      | ✅  |     |     |     |
| Secondary Supply → Order Submission    | ✅  | ✅  | ✅  |     |
| Car Dealer → Order                     | ✅  | ✅  | ✅  |     |
| DFC Order                              | ✅  |     |     |     |

---

## `National Account`

| Permission                                              | A   | S   | U   | L   |
|---------------------------------------------------------|-----|-----|-----|-----|
| Hankook National Fleets → Create A New Delivery Receipt | ✅  |     |     |     |
| Gov't & Bus                                             | ✅  |     |     |     |

---

## `Status`

| Permission           | A   | S   | U   | L   |
|----------------------|-----|-----|-----|-----|
| Order Submission     | ✅  | ✅  | ✅  |     |
| Secondary Supply     | ✅  | ✅  | ✅  |     |
| Gov't & Bus          | ✅  |     |     |     |
| Car Dealer           | ✅  |     |     |     |
| DFC                  | ✅  |     |     |     |
| Open Items           | ✅  |     |     |     |
| Invoice              | ✅  | ✅  |     |     |

---

## `Report`

| Permission     | A   | S   | U   | L   |
|----------------|-----|-----|-----|-----|
| Statement      | ✅  |     |     |     |
| Sales Report   | ✅  | ✅  |     |     |
| Stock Report   | ✅  | ✅  |     |     |

---

## `Warranty`

| Permission      | A   | S   | U   | L   |
|-----------------|-----|-----|-----|-----|
| Create Warranty | ✅  | ✅  |     |     |
| Warranty Status | ✅  | ✅  |     |     |

---

## `All Permissions`

| Permission        | A   | S   | U   | L   |
|-------------------|-----|-----|-----|-----|
| All of the above  | ✅  | ✅  | ✅  | ✅  |
