---
layout: default
title: 평가 순서
permalink: /ko/web/proposals/ePortal-roles/evaluation-order/
nav: false
---

{% include lang-toggle.html %}

# 🧮 RBAC 시스템에서의 평가 순서

이 문서는 새로운 역할 기반 접근 제어(RBAC) 모델에서 사용자의 권한이 어떻게 결정되는지를 설명합니다.  
이 시스템은 넓은 역할 할당에서 시작하여 정밀한 재정의로 이동하며, 유연성과 최소 권한 원칙(Principle of Least Privilege)을 모두 보장합니다.

---

<details markdown="1">
  <summary><strong>📑 목차 (클릭하여 펼치기)</strong></summary>

- [`역할 할당`](#role-assignment)
- [`역할 범위 지정 (선택 사항)`](#role-scoping-optional)
- [`역할 결합 및 병합`](#role-combination-and-merging)
- [`제한적 역할 (수정자)`](#restrictive-roles-modifiers)
- [`직접 권한 재정의 (예외 케이스)`](#direct-privilege-overrides-edge-cases)
- [`요약 표`](#summary-table)

</details>

---

## 1. 🧱 역할 할당 {#role-assignment}

각 사용자는 하나 이상의 역할이 부여되며, 이는 다음을 정의합니다:

- **권한** 세트 (예: *주문 제출*, *보증 상태 확인*)
- 각 권한에 대한 **권한 수준(Privileges)**:
  - `A` – 접근(Access)
  - `S` – 재고(Stock)
  - `U` – 단가(Unit Price)
  - `L` – 정가(List Price)

📚 이러한 역할은 [role-definitions](./role-definitions.md)에 정의되어 있으며, 기본 접근 모델의 기초가 됩니다.

---

## 2. 🧭 역할 범위 지정 (선택 사항) {#role-scoping-optional}

역할은 그 적용 범위를 좁히도록 지정될 수 있습니다:

- **법인(Corporation)** (예: US, CA, MX)
- **산업 세그먼트(Industry Segment)** (예: 소매, 운송, 보험)
- **기능 → 작업 → 채널** 조합

▶ 범위가 지정되면, 해당 맥락에서만 역할이 적용됩니다.

---

## 3. ➕ 역할 결합 및 병합 {#role-combination-and-merging}

사용자가 여러 역할을 가진 경우:

- 모든 역할의 권한이 **병합**됩니다.
- 동일한 권한에 대한 권한 수준은 **통합**됩니다 (논리적 합집합).

📝 예시:  
한 역할이 *주문 제출*에 `A, S`를 부여하고 다른 역할이 `U`를 부여하면, 최종 결과는 `A, S, U`가 됩니다.

---

## 4. 🚫 제한적 역할 (수정자) {#restrictive-roles-modifiers}

일부 역할은 권한 수준을 추가하는 대신 **제거**하는 기능을 합니다.

- 예: `No Pricing` 역할은 모든 `U` 및 `L` 권한을 제거합니다.
- 이러한 역할은 **역할 병합 이후**에 적용됩니다.

🔒 이는 `[SH-N]`와 같은 레거시 그룹 로직을 강제하는 데 사용됩니다.

---

## 5. 🛠️ 직접 권한 재정의 (예외 케이스) {#direct-privilege-overrides-edge-cases}

드물지만 예외적인 경우:

- **사용자 수준**에서 권한 수준을 직접 추가하거나 제거할 수 있습니다.
- 이러한 재정의는 **모든 역할 및 제한 적용 이후**에 적용됩니다.

⚠️ 역할로 완전히 표현할 수 없는 접근 패턴이 필요한 경우에만 **드물게** 사용해야 합니다.

---

## 🔁 요약 표 {#summary-table}

| 단계                 | 설명                                     | 예시                                                      |
|----------------------|------------------------------------------|-----------------------------------------------------------|
| **기본 역할**        | 권한/권한 수준의 주요 출처               | `Order – WH Order Submission (A, S, U)`                   |
| **범위 지정 역할**   | 법인/세그먼트/채널로 제한된 역할          | `Warranty – Create Warranty (CA only)`                    |
| **역할 병합**        | 모든 역할을 결합하여 누적 접근 권한 제공  | `Order + Status + Warranty`                               |
| **제한적 역할**      | 기본 역할이 부여한 권한을 축소            | `No Pricing`이 `U`, `L` 제거                              |
| **직접 재정의**      | 사용자 수준에서의 최종 예외 조정          | 특정 사용자만 *재고 보고서*에 `U` 추가                     |
