<link rel="stylesheet" href="/it-docs/assets/css/custom.css">

{% include lang-toggle.html %}

# 🧠 역할 및 권한 문서

이 프로젝트는 복잡한 기존 그룹 구성을 깔끔하고 유지 보수 가능한 역할과 권한으로 대체하는 확장 가능한 역할 기반 접근 제어(RBAC) 구조를 정의합니다. 기존 시스템의 접근 수준을 유지하면서 예외 상황, 가격 제한, 직접 재정의도 지원합니다.

---

## 📑 목차

- 🧠 [역할 및 권한 개요](./structure-overview.md)  
  *역할 카테고리, 기능, 작업, 비즈니스 채널, 접근 수준의 시각적 분류.*

- 📊 [RBAC 데이터 모델](./data-model.md)  
  *새 역할 및 권한 구조의 핵심 테이블과 관계 설명.*

- 🧱 [테이블 정의](./table-definitions.md)  
  *각 테이블의 컬럼, 관계, 참고 사항 포함 상세 스키마.*

- 🧩 [역할 정의](./role-definitions.md)  
  *모든 기본 역할과 할당된 권한의 세부 내역.*

- 🔄 [마이그레이션 계획](./migration-plan.md)  
  *기존 그룹을 RBAC 역할로 변환하고 새 시스템을 배포하는 단계별 절차.*

- 🧮 [권한 매트릭스](./privilege-matrix.md)  
  *기존 권한을 모든 정의된 역할의 새 권한으로 매핑.*

- 🧭 [평가 순서](./evaluation-order.md)  
  *중복되는 권한이 우선순위에 따라 어떻게 해석되는지 설명.*

- 🚫 [가격 제한 규칙](./no-pricing-rules.md)  
  *특정 예외 상황에서 가격 권한을 제거하는 제한 규칙 정의.*

- 🧾 [레거시 매핑](./legacy-mapping.md)  
  *기존 그룹을 최신 역할로 해석하는 방법 문서화.*

- 🧷 [직접 권한](./direct-privileges.md)  
  *역할 기반 상속 외에 사용자별 재정의를 부여하는 방법 안내.*
