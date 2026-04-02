---
layout: default
title: 수동 배포 절차 (레거시)
permalink: /ko/web/archive/standards-and-procedures/manual-deployment-process/
---

<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
{% include lang-toggle.html %}

# 🚀 수동 배포 절차

> ⚠️ *이것은 아카이브된 문서입니다. 더 이상 사용되지 않는 레거시 Customer Portal 및 Web Order System 프로젝트의 수동 배포 절차를 설명합니다. 최신 문서는 [현재 표준 및 절차](../../standards-and-procedures/)를 참조하세요.*

이 문서는 **Customer Portal (CP)** 과 **Web Order System (WOS)** 의 수동 배포 절차를 설명합니다.  
자동화 도구를 사용하지 못할 경우, 아래 단계를 따라 수동으로 배포를 진행합니다.

<details markdown="1">
  <summary><strong>📑 목차 (클릭하여 펼치기)</strong></summary>

- [시작 전 준비](#시작-전-준비)
- [Customer Portal (CP) 배포](#customer-portal-cp-배포)
- [Web Order System (WOS) 배포](#web-order-system-wos-배포)
- [검증 단계](#검증-단계)
- [배포 후 단계](#배포-후-단계)

</details>

---

## 시작 전 준비

1. **코드 커밋 및 푸시**  
   - 관련된 **Jira 작업 코드**를 복사하여 커밋 메시지에 간단한 설명과 함께 추가합니다.  
   - Eclipse 경로: `Window > Show View > Other > Git > Git Staging`  
   - 커밋 후 원격 저장소로 푸시합니다.

2. **배포 대상 환경 확인**  
   - **DEV**, **PRD1**, 또는 **PRD2** 중 어느 환경인지 확인합니다.

---

## Customer Portal (CP) 배포

### 1. 환경 설정 파일 수정

```
/hankooktire/src/main/resources/config/sap.properties
/hankooktire/src/main/resources/config/wsdl-info.properties
/hankooktire/src/main/resources/config/spring/datasource-context.xml
```

### 2. 프로젝트 빌드
- 프로젝트 우클릭 → **Run As > Maven Build...**  
- Goals: `clean install` → **OK**

### 3. 서버로 파일 전송
- PuTTY로 대상 서버 접속 (Bastion 포트: `199`, Local 포트: `79`)
- WinSCP 연결 후 파일 이동:
  1. 새 WAR 파일 → `/WAR` 폴더
  2. 기존 `ROOT.war` → `/WAR` (백업)
  3. 기존 ROOT 파일에 날짜 추가
  4. 새 파일을 `ROOT.war`로 이름 변경
  5. `/WAR` → `/webapps`로 이동

### 4. Tomcat 재시작
```
sudo service tomcat restart
tail -f /opt/tomcat/logs/catalina.out
```

---

## 검증 단계

### 1. 웹 확인
- **PRD1:** `8080` / **PRD2:** `8090`

### 2. SAP 연결 확인
- **CP:** `OE PSI > Inbound` → 로그에서 `DEST: HKQ` 확인
- **WOS:** National Accounts Directory → `Bill-To No.: 212751` → `DEST: HKQ` 확인

---

## 배포 후 단계

### 1. 환경 설정 주석 복원

**CP:** `sap.properties`, `wsdl-info.properties`, `datasource-context.xml`  
**WOS:** `/hankooktire/src/main/resources/config/<DEV 또는 PRD>/spring/datasource-context.xml`

### 2. 프로덕션 배포
- `Run As > Maven Build > clean install` 재실행
- 동일한 WAR 파일을 PRD2에도 재사용 가능

---

## Web Order System (WOS) 배포

CP와 동일한 절차이나, 변경해야 하는 설정 파일은 하나입니다:

```
/hankooktire/src/main/resources/config/<DEV 또는 PRD>/spring/datasource-context.xml
```

---

✅ **배포 완료** — 두 환경 모두 검증 후 Jira 작업을 종료합니다.
