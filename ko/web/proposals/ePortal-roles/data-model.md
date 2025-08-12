---
layout: default
title: 📊 RBAC 데이터 모델
permalink: /ko/web/proposals/ePortal-roles/data-model/
---

<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
{% include lang-toggle.html %}

# 📊 RBAC 데이터 모델

이 문서는 새로운 RBAC(역할 기반 접근 제어) 시스템의 관계형 구조를 설명합니다. 법인, 산업 세그먼트, 퍼미션, 특권 기반 접근 레벨을 모두 지원합니다.

<details>
  <summary><strong>📑 목차 (클릭하여 펼치기)</strong></summary>
  <div markdown="1">

- [`users`](#users)
- [`roles`](#roles)
- [`user_roles`](#user_roles)
- [`role_corporation`](#role_corporation)
- [`role_industry_segment`](#role_industry_segment)
- [`permissions`](#permissions)
- [`privileges`](#privileges)
- [`role_permissions`](#role_permissions)

  </div>
</details>

---

## 코어 테이블

---

### `users` {: #users }

역할이 부여되는 시스템 사용자.

| Column  | Type    | Description       |
|---------|---------|-------------------|
| `id`    | INT     | 기본 키           |
| `email` | VARCHAR | 사용자 이메일     |

---

### `roles` {: #roles }

사용자에게 부여되는 재사용 가능한 역할 템플릿(법인/세그먼트 범위 지정 가능).

| Column        | Type    | Description        |
|---------------|---------|--------------------|
| `id`          | INT     | 기본 키            |
| `name`        | VARCHAR | 역할 표시 이름     |
| `description` | TEXT    | 설명(선택)         |

---

### `user_roles` {: #user_roles }

사용자와 역할의 연결(다대다 조인).

| Column    | Type | Description        |
|-----------|------|--------------------|
| `user_id` | INT  | `users.id` FK      |
| `role_id` | INT  | `roles.id` FK      |

---

### `role_corporation` {: #role_corporation }

역할을 특정 법인(예: US, CA, MX)에 한정.

| Column        | Type    | Description               |
|---------------|---------|---------------------------|
| `role_id`     | INT     | `roles.id` FK             |
| `corporation` | VARCHAR | 국가/법인 코드(예: `US`)  |

---

### `role_industry_segment` {: #role_industry_segment }

역할을 특정 산업 세그먼트(예: Fleet, Retail)에 한정.

| Column             | Type    | Description          |
|--------------------|---------|----------------------|
| `role_id`          | INT     | `roles.id` FK        |
| `industry_segment` | VARCHAR | 세그먼트 코드/라벨   |

---

### `permissions` {: #permissions }

하나의 기능(feature) 아래에 속한 고유 동작(action)(예: “Order Submission”).

| Column    | Type    | Description                    |
|-----------|---------|--------------------------------|
| `id`      | INT     | 기본 키                        |
| `name`    | VARCHAR | 퍼미션 이름                    |
| `feature` | VARCHAR | 예: Order, Warranty, Report    |
| `action`  | VARCHAR | 예: Create, Status             |

---

### `privileges` {: #privileges }

퍼미션에 부여되는 접근 레벨.

| Column  | Type    | Description                   |
|---------|---------|-------------------------------|
| `code`  | CHAR(1) | `A`, `S`, `U`, `L` 중 하나    |
| `label` | VARCHAR | Access, Stock, Unit, List Price|

---

### `role_permissions` {: #role_permissions }

역할과 퍼미션을 특정 특권으로 연결.

| Column           | Type    | Description             |
|------------------|---------|-------------------------|
| `role_id`        | INT     | `roles.id` FK           |
| `permission_id`  | INT     | `permissions.id` FK     |
| `privilege_code` | CHAR(1) | `privileges.code` FK    |

## 🧭 개체 관계 다이어그램(ERD)

### 텍스트 버전
```text
           ┌───────────┐
           │   users   │
           └─────┬─────┘
                 │
                 ▼
          ┌──────────────┐
          │  user_roles  │
          └────┬────┬────┘
               │    │
               ▼    ▼
           ┌───────────┐
           │   roles   │
           └───┬──┬──┬─┘
               │  │  └───────────────────────────────────────────┐
               │  └─────────────────────┐                        │
               ▼                        ▼                        ▼
     ┌──────────────────┐ ┌──────────────────────────────┐ ┌────────────────────┐
     │ role_corporation │ │ role_industry_segment        │ │  role_permissions  │
     └──────────────────┘ └──────────────────────────────┘ └──────────┬─────────┘
                                                                     │
                                                                     ▼
                                                              ┌─────────────┐
                                                              │ permissions │
                                                              └──────┬──────┘
                                                                     │
                                                                     ▼
                                                               ┌────────────┐
                                                               │ privileges │
                                                               └────────────┘
```

### 🔧 예시: 실제 사용 모습

한 사용자가 **“Order – WH Order Submission”** 역할을 부여받고, **US 법인**과 **Fleet 세그먼트**로 범위가 지정되며, 다음을 부여받는 경우:

- **Permission:** Order Submission  
- **Feature:** Order  
- **Action:** Create  
- **Privileges:** A, S, U

---

### 🗂️ 관련 데이터 행

#### `users`

| id   | email               |
|------|---------------------|
| 2001 | johndoe@example.com |

---

#### `roles`

| id | name                        |
|----|-----------------------------|
| 1  | Order – WH Order Submission |

---

#### `user_roles`

| user_id | role_id |
|---------|---------|
| 2001    | 1       |

---

#### `role_corporation`

| role_id | corporation |
|---------|-------------|
| 1       | US          |

---

#### `role_industry_segment`

| role_id | industry_segment |
|---------|------------------|
| 1       | Fleet            |

---

#### `permissions`

| id  | name             | feature | action |
|-----|------------------|---------|--------|
| 101 | Order Submission | Order   | Create |

---

#### `privileges`

| code | label       |
|------|-------------|
| A    | Access      |
| S    | Stock       |
| U    | Unit Price  |
| L    | List Price  |

---

#### `role_permissions`

| role_id | permission_id | privilege_code |
|---------|----------------|----------------|
| 1       | 101            | A              |
| 1       | 101            | S              |
| 1       | 101            | U              |
