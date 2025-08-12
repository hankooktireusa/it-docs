---
layout: default
title: 📘 테이블 정의
permalink: /ko/web/proposals/ePortal-roles/table-definitions/
---

<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
{% include lang-toggle.html %}

# 📘 테이블 정의

<details>
<summary><strong>📑 목차 (클릭하여 펼치기)</strong></summary>

- [`users`](#users)
- [`roles`](#roles)
- [`user_roles`](#user_roles)
- [`role_corporation`](#role_corporation)
- [`role_industry_segment`](#role_industry-segment)
- [`permissions`](#permissions)
- [`privileges`](#privileges)
- [`role_permissions`](#role_permissions)
</details>

---

## `users`
하나 이상의 역할을 부여받을 수 있는 개별 사용자 계정을 저장합니다. 사용자는 직접 권한이나 권한 수준(Privileges)을 부여받지 않으며, 모든 권한은 부여된 역할을 통해 상속됩니다.

> ### 컬럼  
> | 컬럼명       | 타입     | 설명                              |
> |--------------|----------|-----------------------------------|
> | `id`         | INT      | 기본 키                           |
> | `email`      | VARCHAR  | 사용자의 이메일 주소 (고유)       |
> | `name`       | VARCHAR  | 전체 이름 (선택 사항)             |
>
> ### 관계  
> - 🔗 `user_roles` → 이 사용자에게 역할을 부여
>
> ### 비고  
> - 사용자는 동시에 여러 역할을 가질 수 있음  
> - 권한과 접근 수준은 전적으로 역할 상속을 통해 결정됨  
> - `name`, `department`, `employee_id`와 같은 선택적 메타데이터를 추가할 수 있음

---

## `roles`
권한/권한 수준(Privileges) 쌍을 정의하는 재사용 가능한 역할 템플릿을 저장합니다. 역할은 기본적으로 특정 사용자, 법인(Corporation) 또는 세그먼트에 연결되지 않으며, `user_roles`, `role_corporation`, `role_industry_segment` 테이블을 통해 컨텍스트를 부여받습니다.

> ### 컬럼  
> | 컬럼명        | 타입      | 설명                                |
> |---------------|-----------|-------------------------------------|
> | `id`          | INT       | 역할의 고유 식별자                  |
> | `name`        | VARCHAR   | 표시 이름 (예: "Order – WH Order Submission") |
> | `description` | TEXT      | 역할의 목적에 대한 선택적 설명      |
>
> ### 관계  
> - 🔗 `user_roles` → 이 역할을 사용자에게 할당  
> - 🔗 `role_permissions` → 이 역할이 부여하는 권한과 권한 수준 정의  
> - 🔗 `role_corporation` → 이 역할을 하나 이상의 법인에 범위 지정  
> - 🔗 `role_industry_segment` → 이 역할을 하나 이상의 산업 세그먼트에 범위 지정
>
> ### 비고  
> - 역할 이름은 설명적이고 사용자 친화적으로 작성됨  
> - 범위 제한이 없는 한 역할은 법인과 세그먼트를 가로질러 재사용 가능

---

## `user_roles`
사용자와 부여된 역할을 연결합니다.

> ### 컬럼  
> | 컬럼명     | 타입     | 설명                 |
> |------------|----------|----------------------|
> | `user_id`  | INT      | `users.id` 외래 키    |
> | `role_id`  | INT      | `roles.id` 외래 키    |
>
> ### 관계  
> - 🔗 `users` → 역할이 부여된 사용자  
> - 🔗 `roles` → 사용자가 받는 권한 정의
>
> ### 비고  
> - 한 사용자가 여러 역할을 가질 수 있음 (예: "Order Submitter", "Report Viewer")  
> - 권한은 항상 이 테이블을 통해 역할로 부여됨  
> - 법인/세그먼트 범위 지정은 사용자 단위가 아닌 역할 단위에서 결정됨

---

## `role_corporation`
역할을 하나 이상의 법인(예: US, CA, MX)에 범위 지정합니다.

> ### 컬럼  
> | 컬럼명        | 타입     | 설명                            |
> |---------------|----------|---------------------------------|
> | `role_id`     | INT      | `roles.id` 외래 키              |
> | `corporation` | VARCHAR  | 국가 코드 또는 사업 단위        |
>
> ### 관계  
> - 🔗 `roles` → 범위가 지정된 역할
>
> ### 비고  
> - 항목이 없으면 글로벌 접근(법인 제한 없음)으로 간주  
> - 법인별 접근 정책 적용에 사용  
> - 코드는 시스템의 표준 법인 정의와 일치해야 함

---

## `role_industry_segment`
역할을 하나 이상의 산업 세그먼트(예: Fleet, Retail, Commercial)에 범위 지정합니다.

> ### 컬럼  
> | 컬럼명             | 타입     | 설명                                 |
> |--------------------|----------|--------------------------------------|
> | `role_id`          | INT      | `roles.id` 외래 키                   |
> | `industry_segment` | VARCHAR  | 세그먼트 이름 (예: 'Fleet', 'Retail')|
>
> ### 관계  
> - 🔗 `roles` → 범위가 지정된 역할
>
> ### 비고  
> - 세그먼트가 지정되지 않으면 모든 세그먼트에서 사용 가능  
> - 여러 행을 통해 동일한 역할을 여러 세그먼트에 할당 가능  
> - 세그먼트 명칭은 플랫폼 전반에서 표준화되어야 함

---

## `permissions`
기능(Feature)과 동작 유형(Action Type)으로 그룹화된 고유한 시스템 작업을 나타냅니다.

> ### 컬럼  
> | 컬럼명     | 타입      | 설명                                |
> |------------|-----------|-------------------------------------|
> | `id`       | INT       | 권한의 고유 식별자                  |
> | `name`     | VARCHAR   | 표준 라벨                           |
> | `feature`  | VARCHAR   | 상위 카테고리                       |
> | `action`   | VARCHAR   | 동작 유형: "Create" 또는 "Status"   |
>
> ### 관계  
> - 🔗 `role_permissions` → 이 권한을 특정 역할에 부여
>
> ### 비고  
> - UI에서 그룹화 및 필터링 가능  
> - 이름은 시스템 전반에서 안정적으로 유지되어야 함  
> - 권한은 역할과 법인 간에 재사용됨

---

## `privileges`
특정 권한에 대해 사용자가 갖는 접근 수준을 정의합니다.

> ### 컬럼  
> | 컬럼명     | 타입     | 설명                  |
> |------------|----------|-----------------------|
> | `code`     | CHAR(1)  | 고유 코드: A, S, U, L |
> | `label`    | VARCHAR  | 전체 명칭             |
>
> ### 관계  
> - 🔗 `role_permissions` → 권한 수준은 권한 매핑을 통해 역할에 연결
>
> ### 비고  
> - 현재 지원 값:  
>   - `A`: 접근 (Access)  
>   - `S`: 재고 (Stock)  
>   - `U`: 단가 (Unit Price)  
>   - `L`: 정가 (List Price)

---

## `role_permissions`
역할과 권한을 연결하고 적용되는 구체적인 권한 수준을 정의합니다.

> ### 컬럼  
> | 컬럼명           | 타입     | 설명                             |
> |------------------|----------|----------------------------------|
> | `role_id`        | INT      | `roles.id` 외래 키               |
> | `permission_id`  | INT      | `permissions.id` 외래 키         |
> | `privilege_code` | CHAR(1)  | `privileges.code` 외래 키        |
>
> ### 관계  
> - 🔗 `roles` → 권한이 적용되는 역할  
> - 🔗 `permissions` → 허용되는 작업 정의  
> - 🔗 `privileges` → 접근 수준 정의
>
> ### 비고  
> - 하나의 역할은 동일한 권한에 대해 여러 권한 수준을 가질 수 있음  
> - 역할 수준에서 최소 권한 원칙을 적용  
> - 법인/세그먼트 범위는 여기서 적용되지 않으며, `role_corporation`과 `role_industry_segment`에서 결정됨
