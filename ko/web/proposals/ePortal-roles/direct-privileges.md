<link rel="stylesheet" href="/it-docs/assets/css/custom.css">

{% include lang-toggle.html %}

# 🧩 직접 권한 부여

이 문서는 사용자에게 할당된 역할 외에, 개별 권한과 권한 수준(Privileges)을 직접 적용하는 방법을 설명합니다.

직접 권한 부여는 **역할**과 필터(`No Pricing` 등)만으로는 충분하지 않을 때에만 제한적으로 사용해야 합니다.

---

<details>
<summary><strong>📑 목차 (클릭하여 펼치기)</strong></summary>

- [직접 권한 부여를 사용하는 경우](#직접-권한-부여를-사용하는-경우)
- [직접 권한 부여 작동 방식](#직접-권한-부여-작동-방식)
- [예시](#예시)
- [모범 사례](#모범-사례)
</details>

---

## 직접 권한 부여를 사용하는 경우

다음과 같은 경우 직접 권한 부여를 사용합니다:

- 사용자가 **특정 권한 또는 권한 수준 하나만** 더 필요할 때
- 특정 상황에서 **`No Pricing` 역할을 무시**해야 할 때
- 기존 그룹에 드물게 사용되는 조합이 있어 재사용 가능한 역할로 만들 가치가 없을 때

---

## 직접 권한 부여 작동 방식

직접 권한 부여는 역할과 별도로 사용자 단위로 저장됩니다. 이를 통해:

- 특정 권한에 대해 지정된 권한 수준(`A`, `S`, `U`, `L`)을 추가하거나 덮어쓸 수 있음
- 기존 역할 기반 권한을 보완하거나 대체할 수 있음

이들은 `No Pricing`과 같은 필터 및 역할 적용 **이후**에 평가됩니다.

---

## 예시

### ✅ 예시 1: Sales Report에만 단가(Unit Price) 추가

사용자 역할:
- `Report – Sales Report` ( `A`, `S` 부여)
- `No Pricing` (`U`, `L` 제거)

→ 직접 권한 부여 추가:

```text
사용자: jdoe  
권한: Report → Sales Report  
권한 수준: U
```

이제 사용자는:
- 역할에서 `A`, `S`를 가짐
- 직접 권한 부여로 `U` 추가
- `L`은 여전히 `No Pricing`에 의해 제거됨

---

### ✅ 예시 2: 맞춤 송장 접근 권한

사용자는 `Invoice` 역할이 필요 없고, 재고 수준 송장 데이터만 보고 싶음.

→ 직접 권한 부여 추가:

```text
사용자: jsmith  
권한: Status → Invoice  
권한 수준: A, S
```

---

## 모범 사례

- ✅ **드문 예외**에만 직접 권한 부여 사용
- ❌ 역할을 직접 권한 부여로 대체하지 말 것
- 🔐 항상 직접 권한 부여 내역을 기록하고 정기적으로 검토
- 🔄 여러 사용자가 동일한 예외가 필요한 경우, 역할 업데이트 또는 소규모 맞춤 역할 생성 권장

---

표준 권한과 권한 수준 노출에 대한 내용은 다음을 참고하세요:
- [`role-definitions.md`](/it-docs/ko/web/proposals/ePortal-roles/role-definitions.md)
- [`privilege-matrix.md`](/it-docs/ko/web/proposals/ePortal-roles/privilege-matrix.md)
