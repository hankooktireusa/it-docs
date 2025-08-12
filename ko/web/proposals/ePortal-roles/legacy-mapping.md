---
layout: default
title: 🗺️ 레거시 그룹 매핑
permalink: /ko/web/proposals/ePortal-roles/legacy-mapping/
---

<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
{% include lang-toggle.html %}

# 🗺️ 레거시 그룹 매핑

레거시 사용자 그룹 이름을 새로운 RBAC 역할 및 특권 모델에 매핑한 내용입니다. 각 섹션에는 다음이 포함됩니다:

- 원래 레거시 그룹 이름 및 코드
- 동일한 접근을 재현하기 위해 필요한 새로운 역할
- 적용된 제한 사항(`No Pricing` 등)
- 특수 처리나 오버라이드에 대한 참고 사항

<details>
  <summary><strong>📑 목차 (클릭하여 펼치기)</strong></summary>
  <div markdown="1">

- [`(US) TCI`](#us-tci)
- [`All Permissions & No Price`](#all-permissions-no-price)
- [`Car Dealer & Secondary Supply & National Account & Warranty`](#car-dealer-secondary-supply-national-account-warranty)
- [`Order Submission & National Account & Sales Report`](#order-submission-national-account-sales-report)
- [`(US) Carroll Tire`](#us-carroll-tire)

  </div>
</details>

---

## `(US) TCI - [O-WNG] [S-NG] [A] [W]` {: #us-tci }

**매핑된 역할:**
- `Order – WH Order Submission`
- `Status – Gov't & Bus`
- `Status – National Account`
- `Status – Invoice`
- `Warranty – Create Warranty`

**가격 제한:**
- ❌ 명시적 제한 없음; 역할이 부여하는 경우 가격 표시 가능

**참고:**
- `U`와 같은 가격 관련 특권은 특정 역할(예: WH Order Submission)에서 제공  
- `[SH-N]` 또는 `[P]` 코드가 없으므로 기본 동작 적용

---

## `All Permissions & No Price - [O] [S] [A] [R] [W]` {: #all-permissions-no-price }

**매핑된 역할:**
- `All Permissions`  
- `No Pricing`

**가격 제한:**
- ✅ `No Pricing` 역할을 통해 가격(`U`, `L`) 완전 제거

**참고:**
- 가격 없는 전체 접근 — 조회 전용 또는 비상업용 사용자에 적합  
- `No Pricing`은 `All Permissions`가 부여하는 모든 `U`, `L` 특권을 제거

---

## `Car Dealer & Secondary Supply & National Account & Warranty` {: #car-dealer-secondary-supply-national-account-warranty }

**매핑된 역할:**
- `Order – Car Dealer Order`
- `Order – Secondary Supply Submission`
- `National Account – Fleet Create a New Delivery Receipt`
- `Warranty – Create Warranty`

**가격 제한:**
- ❌ 없음; 역할에 포함된 경우 가격 유지

**참고:**
- 광범위한 딜러 기능 포함, 전체 특권 세트 제공  
- 가격 제한이 필요하다는 표시 없음

---

## `Order Submission & National Account & Sales Report` {: #order-submission-national-account-sales-report }

**매핑된 역할:**
- `Order – WH Order Submission`
- `National Account – Fleet Create a New Delivery Receipt`
- `Report – Sales Report`

**가격 제한:**
- ❌ 없음; 역할에 포함된 경우 가격 유지

**참고:**
- Sales Report는 `A`, `S`만 포함 — `U`, `L`은 제공하지 않음  
- `Order – WH Order Submission`은 `U`를 포함하므로 제한이 없으면 가격 가능

---

## `(US) Carroll Tire - [P-U] [O-SCDNG] [S-SCDNG] [W]` {: #us-carroll-tire }

**매핑된 역할:**
- `Order – Secondary Supply Submission`
- `Order – Car Dealer Order`
- `Order – DFC Order`
- `Status – Secondary Supply`
- `Status – Car Dealer`
- `Status – DFC`
- `Warranty – Create Warranty`

**가격 제한:**
- ✅ 단가만 허용 (`[P-U]`)  
- ❌ 리스트 가격은 제공되지 않음

**참고:**
- 단가만 제공하는 부분 가격 접근을 위해 설계된 레거시 그룹  
- 재사용이 잦으면 `Order – WH + Unit Price Only`와 같은 맞춤 역할 고려
