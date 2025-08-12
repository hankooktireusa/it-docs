---
layout: default
title: 📘 역할 정의
permalink: /ko/web/proposals/ePortal-roles/role-definitions/
---

<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
{% include lang-toggle.html %}

# 📘 역할 정의

> **ℹ️ 이 역할 카탈로그는 새로운 RBAC 모델을 반영합니다.**  
> 각 역할은 기존 레거시 그룹 사용 패턴을 참고하되, 깔끔하고 일관되며 재사용 가능한 접근 권한 묶음으로 재구성되었습니다.  
> 기본적으로 최소 권한 원칙(Least Privilege)에 맞게 설계되며, 필요한 경우에만 오버라이드를 적용합니다.

<details>
  <summary><strong>📑 목차 (클릭하여 확장)</strong></summary>
  <div markdown="1">

- [`주문 – WH 주문 제출`](#order--wh-order-submission)
- [`주문 – WH 퀵 오더`](#order--wh-quick-order)
- [`주문 – 2차 공급 배송 확인`](#order--secondary-supply-delivery-check)
- [`주문 – 2차 공급 주문 제출`](#order--secondary-supply-submission)
- [`주문 – 카딜러 주문`](#order--car-dealer-order)
- [`주문 – DFC 주문`](#order--dfc-order)
- [`내셔널 어카운트 – 플릿 신규 납품서 생성`](#national-account--fleet-create-a-new-delivery-receipt)
- [`내셔널 어카운트 – 정부 & 버스`](#national-account--govt--bus)
- [`상태 – 주문 제출`](#status--order-submission)
- [`상태 – 2차 공급`](#status--secondary-supply)
- [`상태 – 정부 & 버스`](#status--govt--bus)
- [`상태 – 카딜러`](#status--car-dealer)
- [`상태 – DFC`](#status--dfc)
- [`상태 – 미결 항목`](#status--open-items)
- [`상태 – 송장`](#status--invoice)
- [`보고서 – 명세서`](#report--statement)
- [`보고서 – 판매 보고서`](#report--sales-report)
- [`보고서 – 재고 보고서`](#report--stock-report)
- [`보증 – 보증 생성`](#warranty--create-warranty)
- [`보증 – 보증 상태`](#warranty--warranty-status)
- [`모든 권한`](#all-permissions)

  </div>
</details>

---

## `주문 – WH 주문 제출`
창고 기반 주문 제출 권한.  

**권한:** 주문 → WH 주문 제출: A, S, U  

**레거시 매핑:** `(US) TCI - [O-WNG] [S-NG] [A] [W]`, `Order Submission & National Account & Sales Report`  

**비고:** 상태/보고서 역할과 함께 자주 사용됨. 가격 제한 시 `No Pricing` 추가.

---

## `주문 – WH 퀵 오더`
창고 시스템에서 빠른 주문 입력.  

**권한:** 주문 → WH 퀵 오더: A, S, U  

---

## `주문 – 2차 공급 배송 확인`
2차 공급 재고 및 배송 가능 여부 확인.  

**권한:** 주문 → 2차 공급 → 배송 확인: A  

---

## `주문 – 2차 공급 주문 제출`
2차 공급 네트워크를 통한 주문 제출.  

**권한:** 주문 → 2차 공급 → 주문 제출: A, S, U  

---

## `주문 – 카딜러 주문`
카딜러 주문 제출.  

**권한:** 주문 → 카딜러 → 주문: A, S, U  

---

## `주문 – DFC 주문`
직접 배송 센터(DFC) 주문 제출.  

**권한:** 주문 → DFC 주문: A  

---

## `내셔널 어카운트 – 플릿 신규 납품서 생성`
플릿 계정의 신규 납품서 작성.  

**권한:** 한국 내셔널 플릿 → 신규 납품서 생성: A  

---

## `내셔널 어카운트 – 정부 & 버스`
정부 및 비즈니스 파트너와의 내셔널 어카운트 채널 접근.  

**권한:** 정부 & 버스: A  

---

## `상태 – 주문 제출`
제출된 주문 상태 보기.  

**권한:** 상태 → 주문 제출: A, S, U  

---

## `상태 – 2차 공급`
2차 공급 주문 추적.  

**권한:** 상태 → 2차 공급: A, S, U  

---

## `상태 – 정부 & 버스`
정부 및 비즈니스 주문 상태 보기.  

**권한:** 상태 → 정부 & 버스: A  

---

## `상태 – 카딜러`
카딜러 주문 이행 상태 추적.  

**권한:** 상태 → 카딜러: A  

---

## `상태 – DFC`
직접 배송 센터 주문 추적.  

**권한:** 상태 → DFC: A  

---

## `상태 – 미결 항목`
미결제/미처리 청구 항목 보기.  

**권한:** 상태 → 미결 항목: A  

---

## `상태 – 송장`
송장 및 재고 세부 정보 보기.  

**권한:** 상태 → 송장: A, S  

---

## `보고서 – 명세서`
계정 재무 명세서 보기.  

**권한:** 보고서 → 명세서: A  

---

## `보고서 – 판매 보고서`
판매 실적 보기.  

**권한:** 보고서 → 판매 보고서: A, S  

---

## `보고서 – 재고 보고서`
현재 재고 보기.  

**권한:** 보고서 → 재고 보고서: A, S  

---

## `보증 – 보증 생성`
신규 보증 클레임 작성.  

**권한:** 보증 반품 → 생성: A, S  

---

## `보증 – 보증 상태`
보증 클레임 처리 상태 보기.  

**권한:** 보증 반품 → 상태: A, S  

---

## `모든 권한`
가격, 보고서, 주문, 보증을 포함한 전체 시스템 접근.  

**권한:** 모든 정의된 권한: A, S, U, L  

**비고:** 관리자 전용, 기본 할당 금지.
