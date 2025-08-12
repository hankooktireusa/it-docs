<link rel="stylesheet" href="/it-docs/assets/css/custom.css">

{% include lang-toggle.html %}

# 📘 Role Definitions

> **ℹ️ This role catalog reflects the new RBAC model.**  
> Each role in this document is informed by patterns in legacy group usage, but refactored to create clean, consistent, and reusable access bundles.  
>
> The roles below are intended to support least-privilege access by default, with specialized overrides applied as needed.

<details>
<summary><strong>📑 Table of Contents (click to expand)</strong></summary>

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

</details>

---

## `Order – WH Order Submission`

Grants users the ability to submit warehouse-based orders. Typically used by warehouse dealers and national partners.

### Permissions
- Order → WH Order Submission: A, S, U

### Related Legacy Groups
- `(US) TCI - [O-WNG] [S-NG] [A] [W]`
- `Order Submission & National Account & Sales Report`

### Notes
- Often combined with Status or Report roles  
- Consider pairing with `No Pricing` if price access should be restricted

---

## `Order – WH Quick Order`

Enables quick-entry ordering through the warehouse system.

### Permissions
- Order → WH Quick Order: A, S, U

### Notes
- Designed for returning customers who place repeat orders

---

## `Order – Secondary Supply Delivery Check`

Grants access to stock and delivery availability from secondary supply.

### Permissions
- Order → Secondary Supply → Delivery Check: A

### Notes
- Read-only role — no ordering capability

---

## `Order – Secondary Supply Submission`

Allows users to place orders via secondary supply networks.

### Permissions
- Order → Secondary Supply → Order Submission: A, S, U

### Notes
- Often used alongside WH Order roles for hybrid supply access

---

## `Order – Car Dealer Order`

Enables car dealers to submit orders directly.

### Permissions
- Order → Car Dealer → Order: A, S, U

---

## `Order – DFC Order`

Grants access to submit Direct Fulfillment Center orders.

### Permissions
- Order → DFC Order: A

---

## `National Account – Fleet Create a New Delivery Receipt`

For National Account fleet users who initiate delivery receipts.

### Permissions
- Hankook National Fleets → Create A New Delivery Receipt: A

---

## `National Account – Gov't & Bus`

Enables government and business partners to interact via National Account channels.

### Permissions
- Gov’t & Bus: A

---

## `Status – Order Submission`

Lets users view the status of submitted orders.

### Permissions
- Status → Order Submission: A, S, U

---

## `Status – Secondary Supply`

Track secondary supply orders and delivery status.

### Permissions
- Status → Secondary Supply: A, S, U

---

## `Status – Gov't & Bus`

Provides status visibility for government and business orders.

### Permissions
- Status → Gov’t & Bus: A

---

## `Status – Car Dealer`

Allows tracking of Car Dealer order fulfillment.

### Permissions
- Status → Car Dealer: A

---

## `Status – DFC`

Lets users track Direct Fulfillment Center orders.

### Permissions
- Status → DFC: A

---

## `Status – Open Items`

Access to unpaid or unprocessed items in billing.

### Permissions
- Status → Open Items: A

---

## `Status – Invoice`

Grants invoice visibility and optionally stock/quantity tracking.

### Permissions
- Status → Invoice: A, S

---

## `Report – Statement`

Provides access to account financial statements.

### Permissions
- Report → Statement: A

---

## `Report – Sales Report`

Enables viewing of sales performance metrics.

### Permissions
- Report → Sales Report: A, S

---

## `Report – Stock Report`

View current inventory levels and stock health.

### Permissions
- Report → Stock Report: A, S

---

## `Warranty – Create Warranty`

Allows users to create and submit new warranty claims.

### Permissions
- Warranty Return → Create: A, S

---

## `Warranty – Warranty Status`

Provides insight into the processing status of warranty claims.

### Permissions
- Warranty Return → Status: A, S

---

## `All Permissions`

Grants access to all system functionality, including pricing, reporting, ordering, and warranty. Use with caution.

### Permissions
- Full access to all defined permissions: A, S, U, L

### Notes
- Reserved for system administrators or high-trust user profiles  
- Supersedes the need for any other role  
- Do not assign by default
