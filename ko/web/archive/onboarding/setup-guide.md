---
layout: default
title: 설정 가이드 (레거시)
permalink: /ko/web/archive/onboarding/setup-guide/
---

<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
{% include lang-toggle.html %}

# ⚙️ 설정 가이드

> ⚠️ *이것은 아카이브된 문서입니다. 더 이상 사용되지 않는 레거시 Customer Portal 및 Web Order System 프로젝트의 설정 과정을 설명합니다. 최신 가이드는 [현재 온보딩](../../onboarding/)을 참조하세요.*

이 가이드는 신입 직원들을 위한 기본 설정 단계를 설명합니다.

<details markdown="1">
  <summary><strong>📑 목차 (클릭하여 확장)</strong></summary>

- [환경 설정](#환경-설정)
- [계정](#계정)
- [첫 단계](#첫-단계)

</details>

---

> 🔗 **빠른 이동:** 온보딩 페이지의 [유용한 URL]({{ '/ko/web/archive/onboarding/#useful-urls' | relative_url }}) 목록을 확인하세요.

---

## 환경 설정

**Customer Portal (CP)** 및 **Web Order System (WOS)** 프로젝트를 로컬 개발 환경에서 실행할 수 있도록 다음 단계를 순서대로 진행하세요.

---

<details markdown="1">
  <summary><strong>1. 필수 도구 설치</strong></summary>

필요한 모든 소프트웨어와 서비스를 설치합니다.  
다운로드 링크와 설정 방법은 [도구 및 서비스](tools.md) 페이지를 참고하세요.

필요한 도구 목록:
- Eclipse IDE for Enterprise Java and Web Developers  
- Git 및 SSH 키 (저장소 접근용)  
- Apache Tomcat 9.0.100  
- OpenJDK 8 (Temurin)  
- PuTTY 및 WinSCP  
- Oracle SQL Developer  

> 💡 **팁:** 도구는 기억하기 쉬운 위치에 설치하는 것이 좋습니다. 예: `C:\Tomcat\apache-tomcat-9.0.100`

---

</details>

<details markdown="1">
  <summary><strong>2. 저장소 클론</strong></summary>

GitHub에서 주요 애플리케이션 저장소를 클론합니다:

```
https://github.com/hankooktireusa/WebOrder
https://github.com/hankooktireusa/CustomerPortal
```

권장 경로:
```
C:\Users\<username>\git\
```

---

</details>

<details markdown="1">
  <summary><strong>3. Eclipse 설정</strong></summary>

1. **워크스페이스 생성 또는 선택**
   - 권장 경로: `C:\Users\<username>\eclipse-workspace\<workspace_name>`
   - 전환/생성: `File > Switch Workspace > Other...`

2. **SSH 키 추가**
   - `Window > Preferences > General > Network Connections > SSH2`
   - **Add Private Key** 클릭 후 `.pem` 또는 `.ppk` 파일 선택
   - 권장 경로: `C:\Utility\Keys\`

3. **EGit 설치 (미설치 시)**
   - `Help > Eclipse Marketplace`
   - **EGit** 검색 후 **Git Integration for Eclipse** 설치

4. **Eclipse에서 저장소 클론**
   - `Window > Perspective > Open Perspective > Other... > Git`
   - **Clone a Git Repository** 선택 후 SSH URL 입력
   - **Next → Finish** 클릭
   - 클론 완료 후 저장소 우클릭 → **Import Projects... → Finish**

5. **Maven 프로젝트 업데이트**
   - 프로젝트 우클릭 → `Maven > Update Project` → **OK**
   - `Project > Clean...` 실행 후 재빌드

6. **JRE 설정**
   - `Window > Preferences > Java > Installed JREs`
   - OpenJDK 8 (Temurin) 추가 또는 선택

---

</details>

<details markdown="1">
  <summary><strong>4. Tomcat 설치 및 설정</strong></summary>

1. **Apache Tomcat 9.0.100 설치**
   - 권장 경로: `C:\Tomcat\apache-tomcat-9.0.100`

2. **Tomcat을 Eclipse에 추가**
   - `Window > Show View > Servers`
   - **Create a new server** → **Apache → Tomcat v9.0 Server**
   - **Next** → 프로젝트 추가 → **Finish**

3. **서버 설정 수정**
   - Servers 탭에서 Tomcat 서버 더블 클릭
   - **HTTP/1.1 port**를 `80`으로 변경
   - `server.xml`에서 `path=` 검색 후 수정:
     ```xml
     <Context docBase="WebOrder" path="/" reloadable="true" source="org.eclipse.jst.jee.server:WebOrder"/>
     ```

---

</details>

<details markdown="1">
  <summary><strong>5. SAP 라이브러리 (SAP JCo) 설치</strong></summary>

1. 온보딩 리소스에서 다운로드:
   - `sapjco3-NTAMD64-3.0.16.zip`
   - `sapjco3.zip`

2. 압축 해제 후:
   - `sapjco3.dll` → `C:\Windows\System32`
   - `sapjco3.jar` → 프로젝트 우클릭 → Properties → Java Build Path → Add External JARs

---

</details>

<details markdown="1">
  <summary><strong>6. (선택) Hosts 파일 설정</strong></summary>

EAI 엔드포인트 연결 문제 시 `C:\Windows\System32\drivers\etc\hosts`에 추가:

```
# EAI PRD
202.31.7.221   HKPPID1 HKPPID1.hankooktire.com hkppid1
202.31.7.222   HKPPID2 HKPPID2.hankooktire.com hkppid2
202.31.7.220   HKPPID0 HKPPID0.hankooktire.com hkppid0
202.31.7.236   HKPPID  HKPPID.hankooktire.com  hkppid

# EAI QA
202.31.7.225   hkqpid0 HKQPID0.hankooktire.com hkqpid0.hankooktire.com HKQPID0

# EAI DEV
202.31.7.224   hkdpid0 HKDPID0.hankooktire.com hkdpid0.hankooktire.com HKDPID0
```

---

</details>

<details markdown="1">
  <summary><strong>7. 서버 모드 확인</strong></summary>

Tomcat **Run Configuration** → **VM arguments**에 다음이 포함되어 있는지 확인:

```
-Dserver.mode=DEV
```

---

</details>

## 🧾 계정

<details markdown="1">
  <summary><strong>📑 GitHub</strong></summary>

- **조직:** `hankooktireusa`
- **저장소:** `WebOrder`, `CustomerPortal`
- **접속 방식:** SSH (PEM 키 사용)

```bash
git clone git@github.com:hankooktireusa/WebOrder.git
git clone git@github.com:hankooktireusa/CustomerPortal.git
```

---

</details>

<details markdown="1">
  <summary><strong>📑 Jira</strong></summary>

**URL:** [https://hankooktireusa.atlassian.net/jira/software/c/projects/NIWT/boards/11](https://hankooktireusa.atlassian.net/jira/software/c/projects/NIWT/boards/11)

---

</details>

<details markdown="1">
  <summary><strong>📑 AWS 콘솔</strong></summary>

**URL:** [https://hankook-us.signin.aws.amazon.com/console](https://hankook-us.signin.aws.amazon.com/console)  
**계정:** `hankook-us` (620483805473)  
**로그인:** IAM 사용자

---

</details>

## 🧭 첫 단계

<details markdown="1">
  <summary><strong>1. 설치 확인</strong></summary>

```
java -version
mvn -version
```

---

</details>

<details markdown="1">
  <summary><strong>2. 프로젝트 실행</strong></summary>

1. Maven 업데이트 → Clean → Tomcat 시작
2. `http://localhost:8080/` 에서 확인

---

</details>

<details markdown="1">
  <summary><strong>3. 데이터베이스 연결 확인</strong></summary>

SQL Developer에서 저장된 연결로 접속 후 **Test** → **Status: Success** 확인.

✅ **이 시점에서** 로컬 개발 환경이 준비되었습니다.

</details>
