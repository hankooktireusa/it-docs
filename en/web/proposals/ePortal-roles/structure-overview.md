---
layout: default
title: 🧠 RBAC Structure Overview
permalink: /en/web/proposals/ePortal-roles/structure-overview/
---

<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
{% include lang-toggle.html %}

# 🧠 RBAC Structure Overview

## Overview of the Object Structure

```yaml
Corporation: [COUNTRY]
└── Industry Segment: [Segment]
    └── Feature: [Feature]
        └── Action Type: [Create | Status]
            ├── Business Channel: [Channel 1]
            │   └── Access Level: [A/S/U/L]
            └── Business Channel: [Channel 2]
                └── Access Level: [A/S/U/L]
```

## Categories

<details>
<summary><strong>🏢 Corporations</strong></summary>

- US
- CA
- MX
- PA
- CO
- CL

</details>

<details>
<summary><strong>🏭 Industry Segments</strong></summary>

<details>
<summary>Wholesale</summary>

- Features: Order, Claims, Returns, Warranty Return, Finance, Report

</details>
<details>
<summary>Retail</summary>

- Features: Order, Claims, Returns, Warranty Return, Finance, Report

</details>
<details>
<summary>Fleet</summary>

- Features: Order, Claims, Returns, Warranty Return, Finance, Report

</details>
<details>
<summary>Insurance</summary>

- Features: Order, Claims, Returns, Warranty Return, Finance, Report

</details>
<details>
<summary>Commercial</summary>

- Features: Order, Claims, Returns, Warranty Return, Finance, Report

</details>
<details>
<summary>Wholesale + Retail</summary>

- Features: Order, Claims, Returns, Warranty Return, Finance, Report

</details>

</details>

<details>
<summary><strong>📁 Features</strong></summary>

<details>
<summary>Order</summary>

- Action: Create, Status

</details>
<details>
<summary>Claims</summary>

- Action: Create, Status

</details>
<details>
<summary>Returns</summary>

- Action: Create, Status

</details>
<details>
<summary>Warranty Return</summary>

- Action: Create, Status

</details>
<details>
<summary>Finance</summary>

- Action: Create, Status

</details>
<details>
<summary>Report</summary>

- Action: Create, Status

</details>

</details>

<details>
<summary><strong>🎯 Actions</strong></summary>

- Create
- Status

</details>

<details>
<summary><strong>🧭 Business Channels</strong></summary>

- WH (Warehouse)
- SSP (Secondary Supply)
- CDTP (Car Dealer)
- DFC
- NAP (National Account Program)
- Gov't & Bus

</details>

<details>
<summary><strong>🔐 Access Levels</strong></summary>

- Access (A)
- Stock (S)
- Unit Price (U)
- List Price (L)

</details>

## 🧪 Examples

```yaml
Corporation: US  
└── Industry Segment: Fleet  
    └── Feature: Order  
        └── Action Type: Create  
            ├── Business Channel: WH  
            │   └── Access Level: A, S, U  
            └── Business Channel: DFC  
                └── Access Level: A
```

```yaml
Corporation: US
    ├── Industry Segment: Fleet
    │   ├── Feature: Order
    │   │   ├── Action Type: Create
    │   │   │   ├── Business Channel: WH
    │   │   │   │   └── Access Level: A, S, U
    │   │   │   └── Business Channel: DFC
    │   │   │       └── Access Level: A
    │   │   └── Action Type: Status
    │   │       └── Business Channel: WH
    │   │           └── Access Level: A, S
    │   ├── Feature: Warranty Return
    │   │   ├── Action Type: Create
    │   │   │   └── Business Channel: WH
    │   │   │       └── Access Level: A, S
    │   │   └── Action Type: Status
    │   │       └── Business Channel: WH
    │   │           └── Access Level: A, S
    │   └── Feature: Report
    │       └── Action Type: Status
    │           ├── Business Channel: Sales Report
    │           │   └── Access Level: A, S
    │           └── Business Channel: Stock Report
    │               └── Access Level: A, S
    └── Industry Segment: Retail
        ├── Feature: Order
        │   ├── Action Type: Create
        │   │   ├── Business Channel: SSP
        │   │   │   └── Access Level: A
        │   │   └── Business Channel: CDTP
        │   │       └── Access Level: A, S, U
        │   └── Action Type: Status
        │       └── Business Channel: CDTP
        │           └── Access Level: A
        └── Feature: Report
            └── Action Type: Status
                └── Business Channel: Statement
                    └── Access Level: A
```
