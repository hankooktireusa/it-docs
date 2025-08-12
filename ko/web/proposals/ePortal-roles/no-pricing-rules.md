---
layout: default
title: 🚫 가격 표시 금지 규칙
permalink: /ko/web/proposals/ePortal-roles/no-pricing-rules/
---

<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
{% include lang-toggle.html %}

# 🚫 가격 표시 금지 규칙

이 페이지는 신규 RBAC 모델에서 `No Pricing` 역할을 사용자에게 언제, 어떻게 적용해야 하는지를 설명합니다.  
`No Pricing` 역할은 가격 표시와 관련된 모든 특권을 제거합니다:

- `U` = 단가(Unit Price)
- `L` = 정가(List Price)

---

<details>
  <summary><strong>📑 목차 (클릭하여 확장)</strong></summary>
  <div markdown="1">

- [`No Pricing` 적용 시점](#when-to-apply-no-pricing)
- [동작 방식](#how-it-works)
- [`No Pricing`을 적용하지 말아야 할 때](#when-not-to-apply-no-pricing)
- [예외 케이스 및 오버라이드](#edge-cases--overrides)

  </div>
</details>

---

## `No Pricing` 적용 시점

`No Pricing` 역할은 **레거시 그룹에 `[SH-N]` 태그가 포함된 경우에만** 부여합니다.

다음은 `No Pricing`을 적용해야 하는 레거시 그룹 예시입니다:
- `[SH-N] Order + SSP`
- `[SH-N] Gov + Warranty`
- `[SH-N] Order All + NA All + Warranty`

이 그룹들은 레거시 시스템에서 가격 데이터를 볼 수 없도록 명시적으로 제한되었습니다.

---

## 동작 방식

`No Pricing` 역할은:
- 자체적으로 새로운 권한을 부여하지 않으며
- 다른 역할이 부여한 `U` 또는 `L` 특권을 제거하는 필터 역할을 합니다.

이는 **최소 권한 원칙(Principle of Least Privilege)**을 준수하여, 명시적으로 허용되지 않는 한 사용자가 가격 데이터를 볼 수 없게 합니다.

### 예시:
사용자가 다음과 같은 역할을 가짐:
- `Order – WH Order Submission` (단가 포함 `U`)
- `Report – Sales Report` (재고 포함 `S`)
- `No Pricing`

→ 결과:
- `A`, `S`는 유지됨
- 주문 역할에서 부여된 `U`(단가)는 제거됨

---

## `No Pricing`을 적용하지 말아야 할 때

다음과 같은 경우에는 `No Pricing` 역할을 적용하지 않습니다:
- `[P]` → 전반적인 가격 접근 가능
- `[P-U]` → 단가 접근 가능
- `[P-L]` → 정가 접근 가능

`[SH-N]` 또는 `[P-*]`가 없으면, 기본적으로 할당된 역할에서 부여한 특권을 그대로 적용합니다.

---

## 예외 케이스 및 오버라이드

사용자가:
- `No Pricing`이 부여되어 있으나
- 특정 권한에 대해서만 가격 접근이 필요한 경우 (예: `Sales Report`의 단가),

다음 중 하나를 수행할 수 있습니다:
1. **특정 오버라이드 역할 추가** (예: `Sales Report – Unit Price Only`)
2. 시스템이 지원하는 경우 직접 사용자 단위 오버라이드 적용 (예: `user_permissions`를 통한 설정)

---

시각적 예시나 특권 매핑은 다음 문서를 참고하세요:
- [`privilege-matrix.md`](/it-docs/ko/web/proposals/ePortal-roles/privilege-matrix.md)
