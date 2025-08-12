<link rel="stylesheet" href="/it-docs/assets/css/custom.css">

{% include lang-toggle.html %}

# 🗺️ 레거시 그룹 매핑

레거시 사용자 그룹 이름을 새로운 RBAC 역할 및 권한 모델에 매핑한 내용입니다. 각 섹션에는 다음이 포함됩니다:

- 기존 레거시 그룹 이름 및 코드
- 동일한 접근 권한을 재현하는 데 필요한 새 역할
- 적용된 제한 사항(`No Pricing` 등)
- 특별 처리나 예외에 대한 메모

<details>
<summary><strong>📑 목차 (클릭하여 펼치기)</strong></summary>

- [`(US) TCI`](#us-tci---o-wng-s-ng-a-w)
- [`All Permissions & No Price`](#all-permissions--no-price---o-s-a-r-w)
- [`Car Dealer & Secondary Supply & National Account & Warranty`](#car-dealer--secondary-supply--national-account--warranty)
- [`Order Submission & National Account & Sales Report`](#order-submission--national-account--sales-report)
- [`(US) Carroll Tire`](#us-carroll-tire---p-u-o-scdng-s-scdng-w)

</details>

---

## `(US) TCI - [O-WNG] [S-NG] [A] [W]`

**매핑된 역할:**
- `Order – WH Order Submission`
- `Status – Gov't & Bus`
- `Status – National Account`
- `Status – Invoice`
- `Warranty – Create Warranty`

**가격 제한:**
- ❌ 명시된 제한 없음; 역할이 부여하는 범위에서 가격 표시 가능

**메모:**
- `U`와 같은 가격 관련 권한은 특정 역할에서 부여됨 (예: WH Order Submission)  
- `[SH-N]` 또는 `[P]` 코드 없음, 기본 동작 적용

---

## `All Permissions & No Price - [O] [S] [A] [R] [W]`

**매핑된 역할:**
- `All Permissions`  
- `No Pricing`

**가격 제한:**
- ✅ `No Pricing` 역할로 가격 표시 권한 완전 제거

**메모:**
- 가격 없이 전체 접근 권한 — 보기 전용 또는 비상업 사용자용  
- `No Pricing`은 `All Permissions`에서 부여된 모든 `U` 및 `L` 권한 제거

---

## `Car Dealer & Secondary Supply & National Account & Warranty`

**매핑된 역할:**
- `Order – Car Dealer Order`
- `Order – Secondary Supply Submission`
- `National Account – Fleet Create a New Delivery Receipt`
- `Warranty – Create Warranty`

**가격 제한:**
- ❌ 제한 없음; 역할이 부여하는 범위에서 가격 표시 가능

**메모:**
- 전체 권한 세트를 포함하는 딜러 기능 제공  
- 가격 제한이 필요하다는 표시 없음

---

## `Order Submission & National Account & Sales Report`

**매핑된 역할:**
- `Order – WH Order Submission`
- `National Account – Fleet Create a New Delivery Receipt`
- `Report – Sales Report`

**가격 제한:**
- ❌ 제한 없음; 역할이 부여하는 범위에서 가격 표시 가능

**메모:**
- Sales Report는 `A`와 `S`만 포함 — `U`와 `L`은 부여하지 않음  
- `Order – WH Order Submission`에는 `U`가 포함되어 있어 별도의 제한이 없으면 가격 표시 가능

---

## `(US) Carroll Tire - [P-U] [O-SCDNG] [S-SCDNG] [W]`

**매핑된 역할:**
- `Order – Secondary Supply Submission`
- `Order – Car Dealer Order`
- `Order – DFC Order`
- `Status – Secondary Supply`
- `Status – Car Dealer`
- `Status – DFC`
- `Warranty – Create Warranty`

**가격 제한:**
- ✅ 단가(Unit Price)만 허용 (`[P-U]`)  
- ❌ 정가(List Price)는 부여되지 않음

**메모:**
- 레거시 그룹은 부분 가격 접근(단가만) 제공을 위해 설계됨  
- 재사용 빈도가 높으면 `Order – WH + Unit Price Only`와 같은 맞춤 역할 생성 고려
