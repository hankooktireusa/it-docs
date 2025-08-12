---
layout: default
title: 🧠 역할 및 권한 문서
permalink: /ko/web/proposals/ePortal-roles/
---

<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
{% include lang-toggle.html %}

# 🧠 역할 및 권한 문서

이 프로젝트는 복잡한 레거시 그룹을 깔끔하고 유지보수 가능한 역할과 권한으로 대체하는 확장 가능한 RBAC(역할 기반 접근 제어) 구조를 정의합니다. 엣지 케이스, 가격 비표시 제한, 직접 오버라이드를 지원하며, 레거시 시스템과 동등한 접근 수준을 보존합니다.

---

## 📑 목차

- 🧠 [역할 및 권한 개요](./structure-overview.md)  
  *역할 범주, 기능, 액션, 비즈니스 채널, 접근 수준에 대한 시각적 분해도.*

- 📊 [RBAC 데이터 모델](./data-model.md)  
  *새 역할/권한 구조의 핵심 테이블과 관계를 설명합니다.*

- 🧱 [테이블 정의](./table-definitions.md)  
  *각 테이블의 컬럼, 관계, 비고에 대한 상세 스키마.*

- 🧩 [역할 정의](./role-definitions.md)  
  *모든 기본 역할과 부여된 권한의 상세 목록.*

- 🔄 [마이그레이션 계획](./migration-plan.md)  
  *레거시 그룹을 RBAC 역할로 변환하고 새 시스템을 배포하는 단계별 절차.*

- 🧮 [권한 매트릭스](./privilege-matrix.md)  
  *레거시 권한을 정의된 역할 전반의 신규 권한으로 매핑합니다.*

- 🧭 [적용 순서](./evaluation-order.md)  
  *중첩 권한이 우선순위로 어떻게 해소되는지 설명합니다.*

- 🚫 [가격 비표시 규칙](./no-pricing-rules.md)  
  *특정 엣지 케이스에서 가격 관련 권한을 제거하는 제한 규칙을 정의합니다.*

- 🧾 [레거시 매핑](./legacy-mapping.md)  
  *레거시 그룹이 현대적 역할로 해석되는 방식을 문서화합니다.*

- 🧷 [직접 권한](./direct-privileges.md)  
  *역할 상속 외에 사용자별 예외 권한을 부여하는 가이드.*
