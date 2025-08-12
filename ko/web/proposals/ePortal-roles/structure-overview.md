---
layout: default
title: 🧠 RBAC 구조 개요
permalink: /ko/web/proposals/ePortal-roles/structure-overview/
---

<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
{% include lang-toggle.html %}

# 🧠 RBAC 구조 개요

## 객체 구조 개요

```yaml
법인: [국가코드]
└── 산업 세그먼트: [세그먼트]
    └── 기능: [기능]
        └── 작업 유형: [Create | Status]
            ├── 비즈니스 채널: [채널 1]
            │   └── 접근 수준: [A/S/U/L]
            └── 비즈니스 채널: [채널 2]
                └── 접근 수준: [A/S/U/L]
```

## 카테고리

<details>
  <summary><strong>🏢 법인</strong></summary>

  - US
  - CA
  - MX
  - PA
  - CO
  - CL
</details>

<details>
  <summary><strong>🏭 산업 세그먼트</strong></summary>
  <div style="margin-left: 1.5em;">

  <details>
    <summary>도매</summary>
    <ul><li>기능: 주문, 클레임, 반품, 보증 반품, 재무, 보고서</li></ul>
  </details>
  <details>
    <summary>소매</summary>
    <ul><li>기능: 주문, 클레임, 반품, 보증 반품, 재무, 보고서</li></ul>
  </details>
  <details>
    <summary>플릿</summary>
    <ul><li>기능: 주문, 클레임, 반품, 보증 반품, 재무, 보고서</li></ul>
  </details>
  <details>
    <summary>보험</summary>
    <ul><li>기능: 주문, 클레임, 반품, 보증 반품, 재무, 보고서</li></ul>
  </details>
  <details>
    <summary>상업</summary>
    <ul><li>기능: 주문, 클레임, 반품, 보증 반품, 재무, 보고서</li></ul>
  </details>
  <details>
    <summary>도매 + 소매</summary>
    <ul><li>기능: 주문, 클레임, 반품, 보증 반품, 재무, 보고서</li></ul>
  </details>
  </div>
</details>

<details>
  <summary><strong>📁 기능</strong></summary>
  <div style="margin-left: 1.5em;">

  <details>
    <summary>주문</summary>
    <ul><li>작업: Create, Status</li></ul>
  </details>
  <details>
    <summary>클레임</summary>
    <ul><li>작업: Create, Status</li></ul>
  </details>
  <details>
    <summary>반품</summary>
    <ul><li>작업: Create, Status</li></ul>
  </details>
  <details>
    <summary>보증 반품</summary>
    <ul><li>작업: Create, Status</li></ul>
  </details>
  <details>
    <summary>재무</summary>
    <ul><li>작업: Create, Status</li></ul>
  </details>
  <details>
    <summary>보고서</summary>
    <ul><li>작업: Create, Status</li></ul>
  </details>
  </div>
</details>

<details>
  <summary><strong>🎯 작업 유형</strong></summary>

  - Create
  - Status
</details>

<details>
  <summary><strong>🧭 비즈니스 채널</strong></summary>

  - WH (창고)
  - SSP (2차 공급)
  - CDTP (카딜러)
  - DFC
  - NAP (내셔널 어카운트 프로그램)
  - 정부 & 버스
</details>

<details>
  <summary><strong>🔐 접근 수준</strong></summary>

  - 접근 (A)
  - 재고 (S)
  - 단가 (U)
  - 목록가 (L)
</details>

## 🧪 예시

```yaml
법인: US  
└── 산업 세그먼트: 플릿  
    └── 기능: 주문  
        └── 작업 유형: Create  
            ├── 비즈니스 채널: WH  
            │   └── 접근 수준: A, S, U  
            └── 비즈니스 채널: DFC  
                └── 접근 수준: A
```

```yaml
법인: US
    ├── 산업 세그먼트: 플릿
    │   ├── 기능: 주문
    │   │   ├── 작업 유형: Create
    │   │   │   ├── 비즈니스 채널: WH
    │   │   │   │   └── 접근 수준: A, S, U
    │   │   │   └── 비즈니스 채널: DFC
    │   │   │       └── 접근 수준: A
    │   │   └── 작업 유형: Status
    │   │       └── 비즈니스 채널: WH
    │   │           └── 접근 수준: A, S
    │   ├── 기능: 보증 반품
    │   │   ├── 작업 유형: Create
    │   │   │   └── 비즈니스 채널: WH
    │   │   │       └── 접근 수준: A, S
    │   │   └── 작업 유형: Status
    │   │       └── 비즈니스 채널: WH
    │   │           └── 접근 수준: A, S
    │   └── 기능: 보고서
    │       └── 작업 유형: Status
    │           ├── 비즈니스 채널: 판매 보고서
    │           │   └── 접근 수준: A, S
    │           └── 비즈니스 채널: 재고 보고서
    │               └── 접근 수준: A, S
    └── 산업 세그먼트: 소매
        ├── 기능: 주문
        │   ├── 작업 유형: Create
        │   │   ├── 비즈니스 채널: SSP
        │   │   │   └── 접근 수준: A
        │   │   └── 비즈니스 채널: CDTP
        │   │       └── 접근 수준: A, S, U
        │   └── 작업 유형: Status
        │       └── 비즈니스 채널: CDTP
        │           └── 접근 수준: A
        └── 기능: 보고서
            └── 작업 유형: Status
                └── 비즈니스 채널: 명세서
                    └── 접근 수준: A
```
