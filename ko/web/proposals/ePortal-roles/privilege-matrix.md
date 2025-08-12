<link rel="stylesheet" href="/it-docs/assets/css/custom.css">

{% include lang-toggle.html %}

# 📊 권한 수준 매트릭스

역할 전반에 사용되는 모든 권한과, 각 권한이 노출하는 권한 수준(Privileges)을 전체적으로 보여주는 매트릭스입니다.  
> **ℹ️ 이 매트릭스는 새로운 RBAC 역할 모델에서 정의한 권한 수준을 반영합니다.**  
> 아래에 나열된 각 권한은 [`role-definitions.md`](/it-docs/ko/web/proposals/ePortal-roles/role-definitions.md)에 설명된 역할에서 사용되는 방식에 따라 `A`, `S`, `U`, `L` 권한 수준과 매핑됩니다.  
>
> 이 문서는 향후 감사, 재정의 로직, 역할 설계 결정을 지원하기 위한 것이며, 과거 그룹 사용 내역을 반영하지 않습니다.

---

<details>
<summary><strong>📑 목차 (클릭하여 펼치기)</strong></summary>

- [`Order`](#order)
- [`National Account`](#national-account)
- [`Status`](#status)
- [`Report`](#report)
- [`Warranty`](#warranty)
- [`All Permissions`](#all-permissions)

</details>

---

- **A** = Access (접근)
- **S** = Stock (재고)
- **U** = Unit Price (단가)
- **L** = List Price (정가)

---

## `Order`

| 권한                                  | A   | S   | U   | L   |
|---------------------------------------|-----|-----|-----|-----|
| WH Order → Order Submission           | ✅  | ✅  | ✅  |     |
| WH Order → Quick Order                | ✅  | ✅  | ✅  |     |
| Secondary Supply → Delivery Check     | ✅  |     |     |     |
| Secondary Supply → Order Submission   | ✅  | ✅  | ✅  |     |
| Car Dealer → Order                    | ✅  | ✅  | ✅  |     |
| DFC Order                             | ✅  |     |     |     |

---

## `National Account`

| 권한                                                   | A   | S   | U   | L   |
|--------------------------------------------------------|-----|-----|-----|-----|
| Hankook National Fleets → Create A New Delivery Receipt | ✅  |     |     |     |
| Gov't & Bus                                            | ✅  |     |     |     |

---

## `Status`

| 권한               | A   | S   | U   | L   |
|--------------------|-----|-----|-----|-----|
| Order Submission   | ✅  | ✅  | ✅  |     |
| Secondary Supply   | ✅  | ✅  | ✅  |     |
| Gov't & Bus        | ✅  |     |     |     |
| Car Dealer         | ✅  |     |     |     |
| DFC                | ✅  |     |     |     |
| Open Items         | ✅  |     |     |     |
| Invoice            | ✅  | ✅  |     |     |

---

## `Report`

| 권한           | A   | S   | U   | L   |
|----------------|-----|-----|-----|-----|
| Statement      | ✅  |     |     |     |
| Sales Report   | ✅  | ✅  |     |     |
| Stock Report   | ✅  | ✅  |     |     |

---

## `Warranty`

| 권한             | A   | S   | U   | L   |
|------------------|-----|-----|-----|-----|
| Create Warranty  | ✅  | ✅  |     |     |
| Warranty Status  | ✅  | ✅  |     |     |

---

## `All Permissions`

| 권한             | A   | S   | U   | L   |
|------------------|-----|-----|-----|-----|
| 위 모든 항목     | ✅  | ✅  | ✅  | ✅  |
