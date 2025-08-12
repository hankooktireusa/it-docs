---
layout: default
title: 📘 Role Definitions
permalink: /en/web/proposals/ePortal-roles/role-definitions/
---

<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
{% include lang-toggle.html %}

# 📘 Role Definitions

> **ℹ️ This role catalog reflects the new RBAC model.**  
> Each role in this document is informed by patterns in legacy group usage, but refactored to create clean, consistent, and reusable access bundles.  
> Roles are designed for least-privilege access by default, with overrides applied only when necessary.

<details>
  <summary><strong>📑 Table of Contents (click to expand)</strong></summary>
  <div markdown="1">

- [`Order – WH Order Submission`](#order--wh-order-submission)
- [`Order – WH Quick Order`](#order--wh-quick-order)
- [`Order – Secondary Supply Delivery Check`](#order--secondary-supply-delivery-check)
- [`Order – Secondary Supply Submission`](#order--secondary-supply-submission)
- [`Order – Car Dealer Order`](#order--car-dealer-order)
- [`Order – DFC Order`](#order--dfc-order)
- [`National Account – Fleet Create a New Delivery Receipt`](#national-account--fleet-create-a-new-delivery-receipt)
- [`National Account – Gov't & Bus`](#national-account--govt--bus)
- [`Status – Order Submission`](#status--order-submission)
- [`Status – Secondary Supply`](#status--secondary-supply)
- [`Status – Gov't & Bus`](#status--govt--bus)
- [`Status – Car Dealer`](#status--car-dealer)
- [`Status – DFC`](#status--dfc)
- [`Status – Open Items`](#status--open-items)
- [`Status – Invoice`](#status--invoice)
- [`Report – Statement`](#report--statement)
- [`Report – Sales Report`](#report--sales-report)
- [`Report – Stock Report`](#report--stock-report)
- [`Warranty – Create Warranty`](#warranty--create-warranty)
- [`Warranty – Warranty Status`](#warranty--warranty-status)
- [`All Permissions`](#all-permissions)

  </div>
</details>

---

## `Order – WH Order Submission`
Grants ability to submit warehouse-based orders.  

**Permissions:** Order → WH Order Submission: A, S, U  

**Legacy Mapping:** `(US) TCI - [O-WNG] [S-NG] [A] [W]`, `Order Submission & National Account & Sales Report`  

**Notes:** Often paired with Status/Report roles; add `No Pricing` if price restrictions apply.

---

## `Order – WH Quick Order`
Quick-entry ordering in the warehouse system.  

**Permissions:** Order → WH Quick Order: A, S, U  

---

## `Order – Secondary Supply Delivery Check`
Stock/delivery availability from secondary supply.  

**Permissions:** Order → Secondary Supply → Delivery Check: A  

---

## `Order – Secondary Supply Submission`
Place orders via secondary supply networks.  

**Permissions:** Order → Secondary Supply → Order Submission: A, S, U  

---

## `Order – Car Dealer Order`
Submit car dealer orders directly.  

**Permissions:** Order → Car Dealer → Order: A, S, U  

---

## `Order – DFC Order`
Submit Direct Fulfillment Center orders.  

**Permissions:** Order → DFC Order: A  

---

## `National Account – Fleet Create a New Delivery Receipt`
Initiate delivery receipts for fleet accounts.  

**Permissions:** Hankook National Fleets → Create A New Delivery Receipt: A  

---

## `National Account – Gov't & Bus`
Government/business interaction via National Account channels.  

**Permissions:** Gov’t & Bus: A  

---

## `Status – Order Submission`
View status of submitted orders.  

**Permissions:** Status → Order Submission: A, S, U  

---

## `Status – Secondary Supply`
Track secondary supply orders.  

**Permissions:** Status → Secondary Supply: A, S, U  

---

## `Status – Gov't & Bus`
View government/business order status.  

**Permissions:** Status → Gov’t & Bus: A  

---

## `Status – Car Dealer`
Track car dealer orders.  

**Permissions:** Status → Car Dealer: A  

---

## `Status – DFC`
Track Direct Fulfillment Center orders.  

**Permissions:** Status → DFC: A  

---

## `Status – Open Items`
View unpaid/unprocessed billing items.  

**Permissions:** Status → Open Items: A  

---

## `Status – Invoice`
View invoices and stock details.  

**Permissions:** Status → Invoice: A, S  

---

## `Report – Statement`
Access account financial statements.  

**Permissions:** Report → Statement: A  

---

## `Report – Sales Report`
View sales metrics.  

**Permissions:** Report → Sales Report: A, S  

---

## `Report – Stock Report`
View current inventory.  

**Permissions:** Report → Stock Report: A, S  

---

## `Warranty – Create Warranty`
Submit new warranty claims.  

**Permissions:** Warranty Return → Create: A, S  

---

## `Warranty – Warranty Status`
View warranty claim status.  

**Permissions:** Warranty Return → Status: A, S  

---

## `All Permissions`
Full system access including pricing, reporting, ordering, and warranty.  

**Permissions:** All defined permissions: A, S, U, L  

**Notes:** Reserved for admins; do not assign by default.
