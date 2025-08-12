<link rel="stylesheet" href="/it-docs/assets/css/custom.css">

{% include lang-toggle.html %}

# 📊 RBAC 데이터 모델

이 문서는 새로운 역할 기반 접근 제어(RBAC) 시스템의 관계형 구조를 설명하며, 기업, 산업 세그먼트, 권한, 권한 수준 기반 접근 제어를 지원합니다.

<details>
<summary><strong>📑 목차 (클릭하여 펼치기)</strong></summary>

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

## 핵심 테이블

---

### `users`

시스템 사용자 정보를 저장하며 역할이 할당됩니다.

| 컬럼       | 타입     | 설명                |
|------------|----------|---------------------|
| `id`       | INT      | 기본 키             |
| `email`    | VARCHAR  | 사용자 이메일 주소  |

---

### `roles`

사용자에게 할당되며, 기업과 세그먼트 범위에 따라 재사용 가능한 역할 템플릿.

| 컬럼          | 타입     | 설명                   |
|---------------|----------|------------------------|
| `id`          | INT      | 기본 키                |
| `name`        | VARCHAR  | 역할 표시 이름         |
| `description` | TEXT     | 선택적 설명            |

---

### `user_roles`

사용자와 그에게 할당된 역할을 연결.

| 컬럼       | 타입     | 설명                   |
|------------|----------|------------------------|
| `user_id`  | INT      | `users.id` FK          |
| `role_id`  | INT      | `roles.id` FK          |

---

### `role_corporation`

역할을 하나 이상의 기업(예: US, CA, MX)에 범위 지정.

| 컬럼          | 타입     | 설명                        |
|---------------|----------|-----------------------------|
| `role_id`     | INT      | `roles.id` FK               |
| `corporation` | VARCHAR  | 국가 코드(예: 'US')         |

---

### `role_segment`

역할을 하나 이상의 산업 세그먼트(예: Fleet, Retail)에 범위 지정.

| 컬럼              | 타입     | 설명                         |
|-------------------|----------|------------------------------|
| `role_id`         | INT      | `roles.id` FK                |
| `industry_segment`| VARCHAR  | 세그먼트 코드 또는 라벨      |

---

### `permissions`

기능 내에서 고유한 작업을 나타냄 (예: "Order Submission").

| 컬럼       | 타입      | 설명                             |
|------------|-----------|----------------------------------|
| `id`       | INT       | 기본 키                          |
| `name`     | VARCHAR   | 권한 이름                        |
| `feature`  | VARCHAR   | 예: Order, Warranty, Report      |
| `action`   | VARCHAR   | 예: Create, Status               |

---

### `privileges`

권한에 부여된 접근 수준 정의.

| 컬럼     | 타입     | 설명                   |
|----------|----------|------------------------|
| `code`   | CHAR(1)  | A, S, U, L 중 하나     |
| `label`  | VARCHAR  | Access, Stock 등       |

---

### `role_permissions`

역할과 권한을 연결하며 특정 권한 수준을 지정.

| 컬럼             | 타입     | 설명                           |
|------------------|----------|--------------------------------|
| `role_id`        | INT      | `roles.id` FK                  |
| `permission_id`  | INT      | `permissions.id` FK            |
| `privilege_code` | CHAR(1)  | `privileges.code` FK           |

## 🧭 엔터티 관계 다이어그램

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
     ┌──────────────────┐ ┌─────────────────────────┐ ┌────────────────────┐
     │ role_corporation │ │  role_industry_segment  │ │  role_permissions  │
     └──────────────────┘ └─────────────────────────┘ └──────────┬─────────┘
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

### 🔧 예시: 실제 적용 사례

한 사용자가 **"Order – WH Order Submission"** 역할을 부여받고, **US 법인**과 **Fleet 세그먼트** 범위로 지정되며 다음 권한을 가짐:

- **권한:** Order Submission  
- **기능:** Order  
- **동작:** Create  
- **권한 수준:** A, S, U

---

### 🗂️ 관련 데이터 행

#### `users`

| id   | email                 |
|------|------------------------|
| 2001 | johndoe@example.com    |

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

#### `role_segment`

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

---

#### `role_permissions`

| role_id | permission_id | privilege_code |
|---------|----------------|----------------|
| 1       | 101            | A              |
| 1       | 101            | S              |
| 1       | 101            | U              |
