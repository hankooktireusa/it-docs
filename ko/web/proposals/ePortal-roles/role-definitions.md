<link rel="stylesheet" href="/it-docs/assets/css/custom.css">

{% include lang-toggle.html %}

# 📘 역할 정의

> **ℹ️ 이 역할 카탈로그는 새로운 RBAC 모델을 반영합니다.**  
> 이 문서의 각 역할은 레거시 그룹 사용 패턴을 기반으로 하지만, 깔끔하고 일관적이며 재사용 가능한 접근 권한 묶음을 만들기 위해 재구성되었습니다.  
>
> 기본적으로 최소 권한 원칙(Least Privilege)을 지원하며, 필요한 경우 특수 재정의를 적용할 수 있습니다.

<details>
<summary><strong>📑 목차 (클릭하여 펼치기)</strong></summary>

- [`Order – WH Order Submission`](#order--wh-order-submission)
- [`Order – WH Quick Order`](#order--wh-quick-order)
- [`Order – Secondary Supply Delivery Check`](#order--secondary-supply-delivery-check)
- [`Order – Secondary Supply Submission`](#order--secondary-supply-submission)
- [`Order – Car Dealer Order`](#order--car-dealer-order)
- [`Order – DFC Order`](#order--dfc-order)
- [`National Account – Fleet Create a New Delivery Receipt`](#national-account--fleet-create-a-new-delivery-receipt)
- [`National Account – Gov't & Bus`](#national-account--govt--bus)
- [`Status – Order Submission`](#status--order-submission)
- [`Status – Secondary Supply`](#status--secondary-supply)
- [`Status – Gov't & Bus`](#status--govt--bus)
- [`Status – Car Dealer`](#status--car-dealer)
- [`Status – DFC`](#status--dfc)
- [`Status – Open Items`](#status--open-items)
- [`Status – Invoice`](#status--invoice)
- [`Report – Statement`](#report--statement)
- [`Report – Sales Report`](#report--sales-report)
- [`Report – Stock Report`](#report--stock-report)
- [`Warranty – Create Warranty`](#warranty--create-warranty)
- [`Warranty – Warranty Status`](#warranty--warranty-status)
- [`All Permissions`](#all-permissions)

</details>

---

## `Order – WH Order Submission`

창고 기반 주문을 제출할 수 있는 권한을 부여합니다. 주로 창고 딜러와 국가 파트너가 사용합니다.

### 권한
- Order → WH Order Submission: A, S, U

### 관련 레거시 그룹
- `(US) TCI - [O-WNG] [S-NG] [A] [W]`
- `Order Submission & National Account & Sales Report`

### 비고
- Status 또는 Report 역할과 함께 자주 사용됨  
- 가격 접근을 제한해야 하는 경우 `No Pricing`과 함께 사용하는 것을 고려

---

## `Order – WH Quick Order`

창고 시스템을 통한 빠른 주문 입력 기능을 제공합니다.

### 권한
- Order → WH Quick Order: A, S, U

### 비고
- 반복 주문을 하는 기존 고객을 위해 설계됨

---

## `Order – Secondary Supply Delivery Check`

보조 공급망의 재고 및 배송 가능 여부를 확인할 수 있습니다.

### 권한
- Order → Secondary Supply → Delivery Check: A

### 비고
- 읽기 전용 역할 — 주문 기능 없음

---

## `Order – Secondary Supply Submission`

보조 공급망을 통해 주문할 수 있는 권한을 부여합니다.

### 권한
- Order → Secondary Supply → Order Submission: A, S, U

### 비고
- 혼합 공급 접근을 위해 WH Order 역할과 함께 사용되는 경우가 많음

---

## `Order – Car Dealer Order`

자동차 딜러가 직접 주문을 제출할 수 있도록 합니다.

### 권한
- Order → Car Dealer → Order: A, S, U

---

## `Order – DFC Order`

직접 물류 센터(DFC) 주문을 제출할 수 있습니다.

### 권한
- Order → DFC Order: A

---

## `National Account – Fleet Create a New Delivery Receipt`

전국 계정(Fleet) 사용자가 배송 영수증을 생성하는 권한을 가집니다.

### 권한
- Hankook National Fleets → Create A New Delivery Receipt: A

---

## `National Account – Gov't & Bus`

정부 및 비즈니스 파트너가 National Account 채널을 통해 상호작용할 수 있도록 합니다.

### 권한
- Gov’t & Bus: A

---

## `Status – Order Submission`

제출된 주문의 상태를 볼 수 있습니다.

### 권한
- Status → Order Submission: A, S, U

---

## `Status – Secondary Supply`

보조 공급망 주문 및 배송 상태를 추적합니다.

### 권한
- Status → Secondary Supply: A, S, U

---

## `Status – Gov't & Bus`

정부 및 비즈니스 주문의 상태를 확인할 수 있습니다.

### 권한
- Status → Gov’t & Bus: A

---

## `Status – Car Dealer`

자동차 딜러 주문 이행 상황을 추적할 수 있습니다.

### 권한
- Status → Car Dealer: A

---

## `Status – DFC`

직접 물류 센터 주문을 추적할 수 있습니다.

### 권한
- Status → DFC: A

---

## `Status – Open Items`

미지불 또는 미처리 항목에 접근할 수 있습니다.

### 권한
- Status → Open Items: A

---

## `Status – Invoice`

송장을 볼 수 있으며, 재고/수량 추적 권한을 선택적으로 포함합니다.

### 권한
- Status → Invoice: A, S

---

## `Report – Statement`

계정 재무 명세서에 접근할 수 있습니다.

### 권한
- Report → Statement: A

---

## `Report – Sales Report`

판매 실적 데이터를 볼 수 있습니다.

### 권한
- Report → Sales Report: A, S

---

## `Report – Stock Report`

현재 재고 수준과 재고 상태를 확인할 수 있습니다.

### 권한
- Report → Stock Report: A, S

---

## `Warranty – Create Warranty`

새로운 보증 클레임을 생성하고 제출할 수 있습니다.

### 권한
- Warranty Return → Create: A, S

---

## `Warranty – Warranty Status`

보증 클레임 처리 상태를 확인할 수 있습니다.

### 권한
- Warranty Return → Status: A, S

---

## `All Permissions`

시스템의 모든 기능에 접근할 수 있는 권한을 부여하며, 가격, 보고서, 주문, 보증 기능을 포함합니다. 주의해서 사용해야 합니다.

### 권한
- 정의된 모든 권한에 대한 전체 접근: A, S, U, L

### 비고
- 시스템 관리자 또는 신뢰 수준이 높은 사용자만 사용  
- 다른 역할이 필요 없을 정도로 모든 권한을 포함  
- 기본값으로 할당하지 말 것
