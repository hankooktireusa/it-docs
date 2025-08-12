---
layout: default
title: 🧮 RBAC 평가 순서
permalink: /ko/web/proposals/ePortal-roles/evaluation-order/
---

<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
{% include lang-toggle.html %}

# 🧮 RBAC 평가 순서

이 문서는 새 RBAC(역할 기반 접근 제어) 모델에서 사용자의 권한이 어떻게 결정되는지 설명합니다. 시스템은 폭넓은 역할 부여에서 시작해 세밀한 예외 처리까지 단계적으로 평가하여 유연성과 최소 권한 원칙을 모두 충족합니다.

<details>
  <summary><strong>📑 목차</strong></summary>
  <div markdown="1">

- [1. 🧱 역할 부여](#role-assignment)
- [2. 🧭 역할 범위 지정(옵션)](#role-scoping)
- [3. ➕ 역할 결합 및 병합](#role-combination)
- [4. 🚫 제한 역할(수정자)](#restrictive-roles)
- [5. 🛠️ 직접 권한 오버라이드(예외)](#direct-overrides)
- [🔁 요약 표](#summary-table)

  </div>
</details>

---

## 1. 🧱 역할 부여 {: #role-assignment }

각 사용자는 하나 이상의 역할을 부여받으며, 역할은 다음을 정의합니다:

- **권한(permissions)** 집합 (예: *주문 제출*, *보증 상태 조회*)
- 각 권한에 대한 **특권(privileges)**:
  - `A` – Access(접근)
  - `S` – Stock(재고)
  - `U` – Unit Price(단가)
  - `L` – List Price(리스트가)

📚 이러한 역할은 [role-definitions](./role-definitions.md)에 정의되어 있으며, 기본 접근 모델을 구성합니다.

---

## 2. 🧭 역할 범위 지정(옵션) {: #role-scoping }

역할은 적용 범위를 좁히기 위해 범위 지정이 가능합니다:

- **법인(Corporation)** (예: US, CA, MX)
- **산업 세그먼트(Industry Segment)** (예: 리테일, 플릿, 보험)
- **기능 → 액션 → 채널** 조합

▶ 범위가 지정된 경우, 해당 **컨텍스트 내에서만** 역할이 적용됩니다.

---

## 3. ➕ 역할 결합 및 병합 {: #role-combination }

사용자에게 여러 역할이 있는 경우:

- 모든 역할의 권한이 **병합**됩니다.
- 동일 권한의 특권은 **합집합(논리적 유니온)** 으로 결정됩니다.

📝 예:  
한 역할이 *주문 제출*에 `A, S`를 부여하고, 다른 역할이 `U`를 부여하면 결과는 `A, S, U`입니다.

---

## 4. 🚫 제한 역할(수정자) {: #restrictive-roles }

일부 역할은 특권을 추가하는 대신 **제거**합니다.

- 예: `No Pricing` 역할은 적용되는 모든 권한에서 `U`, `L` 특권을 제거합니다.
- 이러한 제한은 역할 병합 **후**에 적용됩니다.

🔒 `[SH-N]` 같은 레거시 그룹 로직을 강제할 때 사용됩니다.

---

## 5. 🛠️ 직접 권한 오버라이드(예외) {: #direct-overrides }

드문 예외 상황에서는:

- **사용자 수준**에서 특권을 직접 추가/제거할 수 있습니다.
- 이러한 오버라이는 **모든 역할 및 제한이 평가된 이후**에 적용됩니다.

⚠️ 역할만으로 표현할 수 없을 때에만 **최소한으로** 사용하세요.

---

## 🔁 요약 표 {: #summary-table }

| 단계                  | 설명                                             | 예시                                      |
|-----------------------|--------------------------------------------------|-------------------------------------------|
| **기본 역할**         | 권한/특권의 주요 출처                           | `Order – WH Order Submission (A, S, U)`   |
| **범위 지정 역할**    | 법인/세그먼트/채널로 제한된 역할                | `Warranty – Create Warranty (CA only)`    |
| **역할 병합**         | 모든 역할을 결합하여 누적 접근 권한 형성       | `Order + Status + Warranty`               |
| **제한 역할**         | 기본 역할로 부여된 특권을 축소                  | `No Pricing` → `U`, `L` 제거              |
| **직접 오버라이드**   | 사용자 단위의 최종 예외 처리                    | 특정 사용자에게 *Stock Report*의 `U` 추가 |
