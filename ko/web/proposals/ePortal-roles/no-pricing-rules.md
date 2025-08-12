<link rel="stylesheet" href="/it-docs/assets/css/custom.css">

{% include lang-toggle.html %}

# 🚫 No Pricing 규칙

이 페이지는 새로운 RBAC 모델에서 `No Pricing` 역할을 사용자에게 적용하는 시기와 방법을 설명합니다. `No Pricing` 역할은 가격 표시와 관련된 모든 권한 수준을 제거합니다:

- `U` = 단가(Unit Price)
- `L` = 정가(List Price)

---

<details>
<summary><strong>📑 목차 (클릭하여 펼치기)</strong></summary>

- [`No Pricing` 적용 시점](#no-pricing-적용-시점)
- [작동 방식](#작동-방식)
- [`No Pricing`을 적용하지 않아야 하는 경우](#no-pricing을-적용하지-않아야-하는-경우)
- [예외 케이스 및 재정의](#예외-케이스-및-재정의)
</details>

---

## `No Pricing` 적용 시점

`No Pricing` 역할은 **레거시 그룹에** `[SH-N]` 태그가 포함된 경우에만 부여합니다.

`No Pricing`을 받아야 하는 레거시 그룹 예:
- `[SH-N] Order + SSP`
- `[SH-N] Gov + Warranty`
- `[SH-N] Order All + NA All + Warranty`

이러한 그룹은 레거시 시스템에서 가격 데이터를 볼 수 없도록 명시적으로 제한되었습니다.

---

## 작동 방식

`No Pricing` 역할은:
- 자체적으로 새로운 권한을 부여하지 않음
- 다른 역할에서 부여한 `U` 또는 `L` 권한 수준을 제거하는 필터 역할 수행

이는 **최소 권한 원칙(Principle of Least Privilege)**을 지원하여, 명시적으로 허용되지 않는 한 사용자가 가격 데이터를 볼 수 없게 합니다.

### 예시:
사용자가 다음 역할을 가진 경우:
- `Order – WH Order Submission` (`U` 포함)
- `Report – Sales Report` (`S` 포함)
- `No Pricing`

→ 결과:
- `A`, `S`는 유지
- `U`(단가)는 Order 역할에서 제거됨

---

## `No Pricing`을 적용하지 않아야 하는 경우

다음과 같은 경우에는 `No Pricing` 역할을 적용하지 않습니다:
- `[P]` → 일반 가격 접근 허용
- `[P-U]` → 단가(Unit Price)
- `[P-L]` → 정가(List Price)

`[SH-N]`이나 `[P-*]`가 없는 경우, 기본적으로 할당된 역할에서 부여한 권한 수준을 그대로 적용합니다.

---

## 예외 케이스 및 재정의

사용자가:
- `No Pricing` 역할을 부여받았지만,
- **특정 권한**(예: `Sales Report`에 대한 `Unit Price`)에 대해서는 가격 접근이 필요한 경우,

다음 중 하나를 수행할 수 있습니다:
1. **특정 재정의 역할 추가** (예: `Sales Report – Unit Price Only`)
2. 시스템에서 지원하는 경우, 사용자 단위 재정의 사용 (예: `user_permissions` 테이블)

---

시각적 예시를 추가하거나 [`privilege-matrix.md`](/it-docs/ko/web/proposals/ePortal-roles/privilege-matrix.md) 문서의 관련 섹션과 연결할지 여부를 알려주세요.
