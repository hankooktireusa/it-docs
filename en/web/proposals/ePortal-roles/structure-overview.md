<link rel="stylesheet" href="/it-docs/assets/css/custom.css">

{% include lang-toggle.html %}

# 🧠 RBAC Structure Overview

## Overview of the object structure

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
  <div style="margin-left: 1.5em;">

  <details>
    <summary>Wholesale</summary>
    <div style="margin-left: 1.5em;">
      <ul>
        <li>Features: Order, Claims, Returns, Warranty Return, Finance, Report</li>
      </ul>
    </div>
  </details>

  <details>
    <summary>Retail</summary>
    <div style="margin-left: 1.5em;">
      <ul>
        <li>Features: Order, Claims, Returns, Warranty Return, Finance, Report</li>
      </ul>
    </div>
  </details>

  <details>
    <summary>Fleet</summary>
    <div style="margin-left: 1.5em;">
      <ul>
        <li>Features: Order, Claims, Returns, Warranty Return, Finance, Report</li>
      </ul>
    </div>
  </details>

  <details>
    <summary>Insurance</summary>
    <div style="margin-left: 1.5em;">
      <ul>
        <li>Features: Order, Claims, Returns, Warranty Return, Finance, Report</li>
      </ul>
    </div>
  </details>

  <details>
    <summary>Commercial</summary>
    <div style="margin-left: 1.5em;">
      <ul>
        <li>Features: Order, Claims, Returns, Warranty Return, Finance, Report</li>
      </ul>
    </div>
  </details>

  <details>
    <summary>Wholesale + Retail</summary>
    <div style="margin-left: 1.5em;">
      <ul>
        <li>Features: Order, Claims, Returns, Warranty Return, Finance, Report</li>
      </ul>
    </div>
  </details>
  </div>
</details>

<details>
  <summary><strong>📁 Features</strong></summary>
  <div style="margin-left: 1.5em;">

  <details>
    <summary>Order</summary>
    <ul>
      <li>Action: Create, Status</li>
    </ul>
  </details>

  <details>
    <summary>Claims</summary>
    <ul>
      <li>Action: Create, Status</li>
    </ul>
  </details>

  <details>
    <summary>Returns</summary>
    <ul>
      <li>Action: Create, Status</li>
    </ul>
  </details>

  <details>
    <summary>Warranty Return</summary>
    <ul>
      <li>Action: Create, Status</li>
    </ul>
  </details>

  <details>
    <summary>Finance</summary>
    <ul>
      <li>Action: Create, Status</li>
    </ul>
  </details>

  <details>
    <summary>Report</summary>
    <ul>
      <li>Action: Create, Status</li>
    </ul>
  </details>
</div>
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
