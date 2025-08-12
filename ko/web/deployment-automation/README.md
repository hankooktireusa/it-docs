<link rel="stylesheet" href="/it-docs/assets/css/custom.css">

{% include lang-toggle.html %}

# ⚙️ 고객 포털(CP) 및 웹 오더(WO) 배포 자동화

이 프로젝트는 PowerShell, WinSCP, PuTTY를 사용하여 **CustomerPortal (CP)** 및 **WebOrder (WO)** 애플리케이션을 DEV 및 PROD 환경에 배포하는 작업을 자동화합니다.

---

## 📥 스크립트 다운로드

이 배포 자동화를 로컬에서 실행하려면:

1. [⬇️ deployment-automation-scripts.zip 다운로드](./deployment-automation-scripts.zip)  
2. 다음 경로에 압축 해제:
   ```
   C:\scripts\deployment-automation
   ```
3. PowerShell 열고 실행:
   ```powershell
   .\main.ps1
   ```

전체 설치 및 구성 지침은 ZIP 번들 안의 [`README.md`](/it-docs/ko/web/deployment-automation/README.md) 파일을 참고하세요.

---

## ✨ 기능

- 🔄 환경별 설정 전환(datsource, SAP, WSDL)
- ⚙️ 선택적 Maven 빌드 단계
- 📦 WinSCP를 통한 안전한 WAR/ROOT 백업 및 전송
- 🔐 PuTTY 및 WinSCP를 위한 동적 SSH 호스트 키 신뢰 처리
- 🖥️ PuTTY 자동화를 통한 Tomcat 재시작 및 로그 모니터링
- 🔁 동일한 WAR 파일을 사용한 PROD1 → PROD2 무중단 연속 배포
- ⏪ 배포 후 프롬프트, 롤백 및 정리 지원

---

## 📁 스크립트 구조 (ZIP 포함)

```yaml
deployment-automation/
├── config.ps1                           # 공유 경로, 세션 이름, SSH 호스트 키
├── main.ps1                             # 전체 배포 자동화 메인 스크립트
├── README.md                            # 전체 사용 가이드 및 설정 안내
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
      │      Git Pull          │  ← PROD2 연속 시 건너뜀
      └───────────┬────────────┘
                  ▼
         ┌────────▼────────┐
         │  설정 전환      │
         └────────┬────────┘
                  ▼
        ┌─────────▼─────────┐
        │ Maven 빌드 실행   │
        └─────────┬─────────┘
                  ▼
        ┌─────────▼──────────┐
        │ WAR 파일 검증      │
        └─────────┬──────────┘
                  ▼
     ┌────────────▼─────────────┐
     │  PuTTY 세션 시작         │
     └────────────┬─────────────┘
                  ▼
   ┌──────────────▼──────────────┐
   │ WinSCP로 WAR 전송           │
   └──────────────┬──────────────┘
                  ▼
  ┌───────────────▼────────────────┐
  │ 기존 WAR 백업 후 새 WAR 배포   │
  └───────────────┬────────────────┘
                  ▼
     ┌────────────▼─────────────┐
     │ PuTTY로 Tomcat 재시작    │
     └────────────┬─────────────┘
                  ▼
     ┌────────────▼────────────┐
     │ 로그 확인 및 롤백 여부  │
     └────────────┬────────────┘
                  ▼
         ┌────────▼────────┐
         │ PROD2 배포 여부 │
         └────────┬────────┘
                  ▼ 예
      (PuTTY 세션 → WAR 업로드 → 재시작 재개)
                  ▼
     ┌────────────▼──────────────┐
     │ 설정 LOCAL로 복원         │
     │ PuTTY 세션 닫기           │
     └───────────────────────────┘
```

---

## 👥 신규 개발자 안내

이 도구는 CP와 WO 프로젝트의 전체 배포 흐름을 안내합니다.  
프롬프트, 검증, 안전한 롤백 지원이 포함되어 있으며 단계별 지침에 따라 진행하면 됩니다.

첫 실행 시 팀원과 함께 진행하는 것을 권장합니다.

---
