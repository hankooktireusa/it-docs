---
layout: default
title: 수동 배포 절차
permalink: /ko/web/onboarding/standards-and-procedures/manual-deployment-process/
---

<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
{% include lang-toggle.html %}

# 🚀 수동 배포 절차

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
   - Eclipse 경로:  
     `Window > Show View > Other > Git > Git Staging`  
   - 커밋 후 원격 저장소로 푸시합니다.

2. **배포 대상 환경 확인**  
   - 이번 배포가 **DEV**, **PRD1**, 또는 **PRD2** 중 어느 환경인지 확인합니다.  
   - 해당 서버에 대한 **PuTTY** 및 **WinSCP** 접근 권한을 확보해야 합니다.

---

## Customer Portal (CP) 배포

### 1. 환경 설정 파일 수정
배포 환경에 맞게 주석을 전환합니다:

```
/hankooktire/src/main/resources/config/sap.properties
/hankooktire/src/main/resources/config/wsdl-info.properties
/hankooktire/src/main/resources/config/spring/datasource-context.xml
```

### 2. 프로젝트 빌드
- 프로젝트 우클릭 → **Run As > Maven Build...**  
- *Goals* 항목에 입력: `clean install`  
- **OK** 클릭 후 빌드를 시작합니다.  
- 완료되면 **ROOT.war** 파일이 생성됩니다.

### 3. 서버로 파일 전송
- **PuTTY** 로 대상 서버 접속  
  - Bastion 포트: `199`  
  - Local 포트: `79`  
- **WinSCP** 실행 후 다음 설정으로 연결  
  - **Amazon Server – local**
- 경로 설정:  
  - **왼쪽:** `C:\Users\Steven.Dunning\git\CustomerPortal\target`  
  - **오른쪽:** `/opt/tomcat/webapps`

단계:
1. “BUILD SUCCESS”가 확인되면 새로운 WAR 파일을 `/WAR` 폴더로 이동  
2. 기존 `ROOT.war` 파일을 `/WAR` 폴더로 백업 이동  
3. 기존 ROOT 파일 이름에 배포 날짜 추가  
4. 새 스냅샷 파일을 `ROOT.war` 로 이름 변경  
5. 변경된 ROOT 파일을 `/WAR` 폴더에서 `/webapps` 로 이동

### 4. Tomcat 재시작 및 로그 모니터링
PuTTY 터미널에서 다음 명령 실행:
```
sudo service tomcat restart
tail -f /opt/tomcat/logs/catalina.out
```
로그가 완료될 때까지 대기합니다.

---

## 검증 단계

### 1. 웹 확인
브라우저에서 서버 포트를 지정하여 접속:
- **PRD1:** `8080`
- **PRD2:** `8090`

### 2. SAP 연결 확인
**CP의 경우:**  
- `OE PSI > Inbound` 메뉴 이동  
- **검색 박스** 클릭 후 로그에 `DEST: HKQ` 가 표시되는지 확인

**WOS의 경우:**  
- **National Accounts Directory** 메뉴 이동  
- `Bill-To No.` 필드에 `212751` 입력  
- PuTTY 로그에서 `DEST: HKQ` 확인

---

## 배포 후 단계

### 1. 환경 설정 주석 복원
검증 완료 후 로컬 설정으로 되돌립니다.

**CP의 경우**
```
sap.properties
wsdl-info.properties
datasource-context.xml
```

**WOS의 경우**
```
/hankooktire/src/main/resources/config/<DEV 또는 PRD>/spring/datasource-context.xml
```

### 2. 프로덕션 배포
**최초 프로덕션 배포 시:**  
- 다시 실행: `Run As > Maven Build > clean install`  
- 프로덕션 설정을 사용하여 빌드됩니다.  
- 동일한 WAR 파일을 `PRD2` 환경에도 재사용할 수 있습니다.

### 3. 추가 프로덕션 서버 배포
앞서 설명한 파일 전송, 이름 변경, Tomcat 재시작 절차를 **PRD2** 환경에도 동일하게 수행합니다.

---

## Web Order System (WOS) 배포

WOS 배포 절차는 CP와 거의 동일하지만, 환경마다 변경해야 하는 **하나의 설정 파일**만 존재합니다:

```
/hankooktire/src/main/resources/config/<DEV 또는 PRD>/spring/datasource-context.xml
```

이 파일을 수정한 후 Maven 빌드, 파일 전송, Tomcat 재시작 및 검증 절차를 동일하게 진행합니다.

---

✅ **배포 완료**  
두 환경 모두 업데이트 및 검증이 끝나면, 시스템 동작을 최종 확인하고 Jira 작업을 종료합니다.
