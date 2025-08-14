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
  <ul>
    <li><a href="#users"><code>users</code></a></li>
    <li><a href="#roles"><code>roles</code></a></li>
    <li><a href="#user_roles"><code>user_roles</code></a></li>
    <li><a href="#role_corporation"><code>role_corporation</code></a></li>
    <li><a href="#role_industry_segment"><code>role_industry_segment</code></a></li>
    <li><a href="#permissions"><code>permissions</code></a></li>
    <li><a href="#privileges"><code>privileges</code></a></li>
    <li><a href="#role_permissions"><code>role_permissions</code></a></li>
  </ul>
</details>

---

## `users`
개별 사용자 계정을 저장하며, 각 계정은 하나 이상의 역할(Role)을 가질 수 있습니다. 사용자는 직접 권한(Permission)이나 권한 수준(Privilege)을 부여받지 않고, 모든 권한은 할당된 역할을 통해 상속됩니다.

> ### 컬럼
>
> | 컬럼 | 타입 | 설명 |
> |------|------|------|
> | `id`   | INT  | 기본 키 |
> | `email`| VARCHAR | 사용자 이메일 주소 (고유) |
> | `name` | VARCHAR | 전체 이름 (선택 사항) |

> ### 관계
> - 🔗 `user_roles` → 이 사용자에게 역할을 할당

> ### 비고
> - 사용자는 동시에 여러 역할을 가질 수 있음  
> - 권한과 접근 수준은 전적으로 역할 상속을 통해 결정됨  
> - `name`, `department`, `employee_id` 같은 선택적 메타데이터를 추가 가능

---

## `roles`
권한/권한 수준 쌍을 정의하는 재사용 가능한 역할 템플릿을 저장합니다. 역할은 기본적으로 특정 사용자, 법인, 산업 세그먼트에 종속되지 않으며, `user_roles`, `role_corporation`, `role_industry_segment` 테이블을 통해 범위가 지정됩니다.

> ### 컬럼
>
> | 컬럼 | 타입 | 설명 |
> |------|------|------|
> | `id`   | INT  | 역할 고유 식별자 |
> | `name` | VARCHAR | 표시 이름 (예: “Order – WH Order Submission”) |
> | `description` | TEXT | 역할 목적에 대한 설명 (선택 사항) |

> ### 관계
> - 🔗 `user_roles` → 이 역할을 사용자에게 할당  
> - 🔗 `role_permissions` → 이 역할이 부여하는 권한과 권한 수준 정의  
> - 🔗 `role_corporation` → 이 역할을 하나 이상의 법인에 한정  
> - 🔗 `role_industry_segment` → 이 역할을 하나 이상의 산업 세그먼트에 한정

> ### 비고
> - 역할 이름은 설명적이고 사용자가 읽기 쉬워야 함  
> - 법인 및 세그먼트 제한이 없으면 재사용 가능

---

## `user_roles`
사용자와 그 사용자가 가진 역할을 연결합니다.

> ### 컬럼
>
> | 컬럼 | 타입 | 설명 |
> |------|------|------|
> | `user_id` | INT | `users.id`에 대한 외래 키(FK) |
> | `role_id` | INT | `roles.id`에 대한 외래 키(FK) |

> ### 관계
> - 🔗 `users` → 역할이 부여된 대상 사용자  
> - 🔗 `roles` → 사용자가 부여받은 권한

> ### 비고
> - 사용자는 여러 역할을 가질 수 있음 (예: “Order Submitter”와 “Report Viewer” 동시에)  
> - 모든 역할은 이 테이블을 통해 할당  
> - 법인/세그먼트 범위는 사용자 단위가 아닌 역할 단위에서 결정됨

---

## `role_corporation`
역할을 하나 이상의 법인(예: US, CA, MX)에 한정합니다.

> ### 컬럼
>
> | 컬럼 | 타입 | 설명 |
> |------|------|------|
> | `role_id` | INT | `roles.id`에 대한 FK |
> | `corporation` | VARCHAR | 국가 코드 또는 사업부 |

> ### 관계
> - 🔗 `roles` → 범위가 지정된 역할

> ### 비고
> - 레코드가 없으면 글로벌 접근(제한 없음)  
> - 법인별 정책을 강제하는 데 사용  
> - 코드 값은 표준 법인 정의와 일치해야 함

---

## `role_industry_segment`
역할을 하나 이상의 산업 세그먼트에 한정합니다.

> ### 컬럼
>
> | 컬럼 | 타입 | 설명 |
> |------|------|------|
> | `role_id` | INT | `roles.id`에 대한 FK |
> | `industry_segment` | VARCHAR | 세그먼트 이름 (예: “Fleet”, “Retail”) |

> ### 관계
> - 🔗 `roles` → 범위가 지정된 역할

> ### 비고
> - 레코드가 없으면 모든 세그먼트에 적용 가능  
> - 여러 세그먼트에 할당하려면 여러 행 사용  
> - 이름은 플랫폼 전반에서 표준화 필요

---

## `permissions`
기능(Feature)과 작업 유형(Action Type)별로 그룹화된 시스템 동작을 나타냅니다.

> ### 컬럼
>
> | 컬럼 | 타입 | 설명 |
> |------|------|------|
> | `id` | INT | 권한 고유 식별자 |
> | `name` | VARCHAR | 표준 이름 |
> | `feature` | VARCHAR | 상위 카테고리 |
> | `action` | VARCHAR | 작업 유형 |

> ### 관계
> - 🔗 `role_permissions` → 특정 역할에 이 권한을 부여

> ### 비고
> - UI에서 그룹화 및 필터링 가능  
> - 이름은 시스템 전반에서 안정적으로 유지  
> - 여러 역할과 법인에서 재사용 가능

---

## `privileges`
특정 권한에 대해 사용자가 가지는 접근 수준을 정의합니다.

> ### 컬럼
>
> | 컬럼 | 타입 | 설명 |
> |------|------|------|
> | `code` | CHAR(1) | 고유 코드: A, S, U, L |
> | `label` | VARCHAR | 전체 이름: Access, Stock 등 |

> ### 관계
> - 🔗 `role_permissions` → 권한 수준이 권한과 역할을 연결

> ### 비고
> - 현재 값:  
>   - `A`: Access  
>   - `S`: Stock  
>   - `U`: Unit Price  
>   - `L`: List Price

---

## `role_permissions`
역할과 권한을 연결하고, 해당 권한에 적용되는 구체적인 권한 수준을 정의합니다.

> ### 컬럼
>
> | 컬럼 | 타입 | 설명 |
> |------|------|------|
> | `role_id` | INT | `roles.id`에 대한 FK |
> | `permission_id` | INT | `permissions.id`에 대한 FK |
> | `privilege_code` | CHAR(1) | `privileges.code`에 대한 FK |

> ### 관계
> - 🔗 `roles` → 권한이 적용되는 대상 역할  
> - 🔗 `permissions` → 허용되는 동작  
> - 🔗 `privileges` → 접근 수준

> ### 비고
> - 동일한 권한에 대해 서로 다른 권한 수준을 가진 다중 매핑 가능  
> - 역할 수준에서 최소 권한 원칙을 적용  
> - 법인/세그먼트 범위 지정은 여기서 하지 않으며, `role_corporation`과 `role_industry_segment`에서 처리
