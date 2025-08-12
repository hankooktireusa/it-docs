---
layout: default
title: ⚙️ CustomerPortal (CP) / WebOrder (WO) 배포 자동화
permalink: /ko/web/deployment-automation/
---

<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
{% include lang-toggle.html %}

# ⚙️ CustomerPortal (CP) / WebOrder (WO) 배포 자동화

이 프로젝트는 PowerShell, WinSCP, PuTTY를 사용하여 **CustomerPortal (CP)** 과 **WebOrder (WO)** 애플리케이션을 DEV/PROD 환경에 배포하는 작업을 자동화합니다.

---

## 📥 스크립트 다운로드

로컬에서 배포 자동화를 실행하려면:

1. [⬇️ deployment-automation-scripts.zip 다운로드]({{ '/ko/web/deployment-automation/deployment-automation-scripts.zip' | relative_url }})  
2. 아래 경로에 압축을 해제합니다:
   ```
   C:\scripts\deployment-automation
   ```
3. PowerShell에서 실행:
   ```powershell
   .\main.ps1
   ```

자세한 설정/구성 방법은 **ZIP 번들 내부의 README.md** 를 참고하세요.

---

## ✨ 주요 기능

- 🔄 환경 인지형 설정 전환(데이터소스, SAP, WSDL)
- ⚙️ 선택적 Maven 빌드 단계
- 📦 WinSCP를 통한 안전한 WAR/ROOT 백업 및 전송
- 🔐 PuTTY/WinSCP용 SSH 호스트 키 신뢰 자동 설정
- 🖥️ PuTTY 자동화로 Tomcat 재시작 및 실시간 로그 모니터링
- 🔁 동일 WAR로 PROD1 → PROD2 연속 배포
- ⏪ 배포 후 점검, 롤백 및 정리 지원

---

## 📁 스크립트 구성(ZIP 포함)

```yaml
deployment-automation/
├── config.ps1
├── main.ps1
├── README.md
│
├── lib/
│   ├── git.ps1
│   ├── maven.ps1
│   ├── post-check-prompts.ps1
│   ├── post-check-and-rollback.ps1
│   ├── putty-automation.ps1
│   ├── putty.ps1
│   ├── rollback-deployment.ps1
│   ├── verify-war-file.ps1
│   ├── winscp-deploy.ps1
│   └── deploy-to-second-prod.ps1
│
└── switch-env-servers/
    ├── switch-datasource-server.ps1
    ├── switch-sap-properties.ps1
    └── switch-wsdl-info.ps1
```

---

## 🧭 배포 흐름 개요

```text
          ┌───────────────┐
          │  앱 선택      │
          └───────┬───────┘
                  ▼
           ┌──────▼──────┐
           │ 환경 선택   │
           └──────┬──────┘
                  ▼
      ┌───────────▼────────────┐
      │      Git Pull          │  ← PROD2 연속 배포 시 생략
      └───────────┬────────────┘
                  ▼
         ┌────────▼────────┐
         │  설정 전환      │
         └────────┬────────┘
                  ▼
        ┌─────────▼─────────┐
        │ Maven 빌드        │
        └─────────┬─────────┘
                  ▼
        ┌─────────▼──────────┐
        │ WAR 검증           │
        └─────────┬──────────┘
                  ▼
     ┌────────────▼─────────────┐
     │ PuTTY 세션 시작          │
     └────────────┬─────────────┘
                  ▼
   ┌──────────────▼──────────────┐
   │ WinSCP로 WAR 전송           │
   └──────────────┬──────────────┘
                  ▼
  ┌───────────────▼────────────────┐
  │ 기존 WAR 백업으로 이동        │
  │ 새 WAR를 ROOT.war로 배포      │
  └───────────────┬────────────────┘
                  ▼
     ┌────────────▼─────────────┐
     │ PuTTY로 Tomcat 재시작     │
     └────────────┬─────────────┘
                  ▼
     ┌────────────▼────────────┐
     │ 로그 확인 + 롤백 여부   │
     └────────────┬────────────┘
                  ▼
         ┌────────▼────────┐
         │ PROD2에도 배포? │
         └────────┬────────┘
                  ▼ 예
      (PuTTY 세션 → WAR 업로드 → 재시작)
                  ▼
     ┌────────────▼──────────────┐
     │ LOCAL 설정으로 복원       │
     │ 열린 PuTTY 세션 종료      │
     └───────────────────────────┘
```

---

## 👥 새 참여자 안내

이 도구는 CP/WO 배포 전 과정을 단계별로 안내합니다. 각 단계에서 확인 프롬프트와 안전한 롤백 기능을 제공합니다. 화면의 지시에 따라 진행하세요.

첫 실행 시 팀 동료와 함께 검증하는 것을 권장합니다.
