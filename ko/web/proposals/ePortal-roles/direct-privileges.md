---
layout: default
title: 🧩 직접 권한 부여
permalink: /ko/web/proposals/ePortal-roles/direct-privileges/
---

<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
{% include lang-toggle.html %}

# 🧩 직접 권한 부여

이 문서는 사용자의 지정된 역할 외에, 개별 권한과 특권을 직접 부여(또는 재정의)하는 방법을 설명합니다.

`No Pricing`과 같은 필터나 역할만으로는 충분하지 않을 때, **드물게** 직접 권한 부여를 사용해야 합니다.

---

<details>
  <summary><strong>📑 목차 (클릭하여 펼치기)</strong></summary>
  <div markdown="1">

- [직접 권한 부여를 사용하는 경우](#when-to-use-direct-grants)
- [직접 권한 부여 동작 방식](#how-direct-grants-work)
- [예시](#examples)
- [모범 사례](#best-practices)

  </div>
</details>

---

## 직접 권한 부여를 사용하는 경우 {: #when-to-use-direct-grants }

다음과 같은 경우에 직접 권한 부여를 사용합니다:

- 사용자가 **추가 권한 또는 특권 한 가지**만 필요한 경우
- 특정 상황에서 **`No Pricing` 역할을 무효화**해야 하는 경우
- 재사용 가능한 역할로 만들 가치가 없는 드문 레거시 그룹 조합이 있는 경우

---

## 직접 권한 부여 동작 방식 {: #how-direct-grants-work }

직접 권한 부여는 각 사용자의 역할과 **별도로** 저장됩니다. 이를 통해:

- 특정 퍼미션에 대해 특권(`A`, `S`, `U`, `L`)을 추가하거나 재정의 가능
- 상속된 역할 기반 권한을 보완하거나 덮어쓸 수 있음

이 평가는 `No Pricing`과 같은 역할 및 필터 적용 **후에** 이루어집니다.

---

## 예시 {: #examples }

### ✅ 예시 1: Sales Report에 Unit Price만 추가

사용자 역할:
- `Report – Sales Report` (부여: `A`, `S`)
- `No Pricing` (제거: `U`, `L`)

→ 직접 권한 부여 추가:

```text
User: jdoe  
Permission: Report → Sales Report  
Privileges: U
```

결과:
- 역할로부터 `A`, `S` 보유
- 직접 부여로 `U` 획득
- `L`은 여전히 `No Pricing`으로 제거됨

---

### ✅ 예시 2: 맞춤 인보이스 접근

사용자는 `Invoice` 역할이 필요 없고, 재고 수준 인보이스 데이터만 조회하고자 함.

→ 직접 권한 부여 추가:

```text
User: jsmith  
Permission: Status → Invoice  
Privileges: A, S
```

---

## 모범 사례 {: #best-practices }

- ✅ **드문 예외**에만 직접 권한 부여 사용
- ❌ 역할을 직접 권한 부여로 대체하지 말 것
- 🔐 항상 기록하고 정기적으로 검토
- 🔄 여러 사용자가 동일한 예외를 필요로 하면 역할 수정 또는 작은 맞춤 역할 생성 권장

---

표준 권한 및 특권 노출은 다음을 참조하세요:
- [role-definitions](./role-definitions.md)
- [privilege-matrix](./privilege-matrix.md)
