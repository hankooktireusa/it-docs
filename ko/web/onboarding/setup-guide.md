---
layout: default
title: 설정 가이드
permalink: /ko/web/onboarding/setup-guide/
---

<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
{% include lang-toggle.html %}

# ⚙️ 설정 가이드

이 가이드는 신입 직원들을 위한 기본 설정 단계를 설명합니다.  
(현재는 자리 표시자 — 추후 내용 추가 예정)

<details markdown="1">
  <summary><strong>📑 목차 (클릭하여 확장)</strong></summary>

- [환경 설정](#환경-설정)
- [계정](#계정)
- [첫 단계](#첫-단계)

</details>

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

> 💡 **팁:** 도구는 기억하기 쉬운 위치에 설치하는 것이 좋습니다.  
> 예: `C:\Tomcat\apache-tomcat-9.0.100`

---

</details>

<details markdown="1">
  <summary><strong>2. 저장소 클론</strong></summary>

GitHub에서 주요 애플리케이션 저장소를 클론합니다:

https://github.com/hankooktireusa/WebOrder  
https://github.com/hankooktireusa/CustomerPortal

권장 경로 예시:

C:\Users\<username>\git\

또는 원하는 다른 경로를 사용할 수 있습니다.

---

</details>

<details markdown="1">
  <summary><strong>3. Eclipse 설정</strong></summary>

1. **워크스페이스 생성 또는 선택**
   - 권장 경로:  
     C:\Users\<username>\eclipse-workspace\<workspace_name>
   - 전환 또는 생성 방법:  
     File > Switch Workspace > Other...

2. **SSH 키 추가**
   - Window > Preferences > General > Network Connections > SSH2  
   - **Add Private Key** 클릭 후 `.pem` 또는 `.ppk` 파일 선택  
     권장 경로: C:\Utility\Keys\  
   - 비밀번호: `hankooktireusa`

3. **EGit 설치 (미설치 시)**
   - Help > Eclipse Marketplace  
   - **EGit** 검색 후 **Git Integration for Eclipse** 설치

4. **Eclipse에서 저장소 클론**
   - Window > Perspective > Open Perspective > Other... > Git  
   - **Clone a Git Repository** 선택 후 SSH URL 입력  
   - **Next → Finish** 클릭  
   - 클론 완료 후, 저장소 우클릭 → **Import Projects... → Finish**

5. **Maven 프로젝트 업데이트**
   - 프로젝트 우클릭 → Maven > Update Project → **OK**  
   - 이후 Project > Clean... 실행 후 재빌드

6. **JRE 설정**
   - Window > Preferences > Java > Installed JREs  
   - OpenJDK 8 (Temurin) 추가 또는 선택  
   - 프로젝트 및 Tomcat 서버 모두에 해당 JRE가 지정되어 있는지 확인

---

</details>

<details markdown="1">
  <summary><strong>4. Tomcat 설치 및 설정</strong></summary>

1. **Apache Tomcat 9.0.100 설치**
   - 권장 경로:  
     C:\Tomcat\apache-tomcat-9.0.100  
   - 접근하기 쉬운 위치면 다른 경로도 무방합니다.

2. **Tomcat을 Eclipse에 추가**
   - Window > Show View > Servers  
   - **Create a new server** 클릭  
   - **Apache → Tomcat v9.0 Server** 선택  
   - 이름 지정 (예: WebOrder Tomcat v9.0 at localhost)  
   - 설치 경로를 Tomcat 폴더로 설정  
   - **Next → Finish**

3. **서버 설정 수정**
   - Servers 탭에서 Tomcat 서버 더블 클릭  
   - **HTTP/1.1 port**를 `80`으로 변경  
   - `server.xml`을 열어 `path=`를 검색 후 다음과 같이 수정:  
     <Context docBase="WebOrder" path="/" reloadable="true" source="org.eclipse.jst.jee.server:WebOrder"/>

4. **패키지 표시 방식 설정**
   - Project Explorer → 드롭다운 메뉴 클릭 →  
     Package Presentation > Hierarchical 선택

---

</details>

<details markdown="1">
  <summary><strong>5. SAP 라이브러리 (SAP JCo) 설치</strong></summary>

1. 온보딩 리소스에서 다음 파일 다운로드:
   - sapjco3-NTAMD64-3.0.16.zip  
   - sapjco3.zip

2. 압축 해제 후 다음 작업 수행:
   - `sapjco3.dll` 복사 →  
     C:\Windows\System32  
   - `sapjco3.jar` 복사 후 프로젝트에 추가:  
     프로젝트 우클릭 → Properties → Java Build Path → Add External JARs

> 💡 압축 해제한 폴더 위치는 임의로 지정 가능하지만,  
> 추후 설정 시 쉽게 찾을 수 있도록 기억해 두세요.

---

</details>

<details markdown="1">
  <summary><strong>6. (선택 사항) Hosts 파일 설정</strong></summary>

로컬 환경에서 EAI 엔드포인트에 연결되지 않을 경우,  
호스트 매핑을 추가해야 할 수 있습니다.

다음 내용을 (필요 시) 아래 경로에 추가하세요:  
C:\Windows\System32\drivers\etc\hosts

# EAI PRD  
202.31.7.221   HKPPID1 HKPPID1.hankooktire.com hkppid1  
202.31.7.222   HKPPID2 HKPPID2.hankooktire.com hkppid2  
202.31.7.220   HKPPID0 HKPPID0.hankooktire.com hkppid0     # HA Virtual Host  
202.31.7.236   HKPPID  HKPPID.hankooktire.com  hkppid      # L4 Loadbalancer  

# EAI QA  
202.31.7.225   hkqpid0 HKQPID0.hankooktire.com hkqpid0.hankooktire.com HKQPID0  

# EAI DEV  
202.31.7.224   hkdpid0 HKDPID0.hankooktire.com hkdpid0.hankooktire.com HKDPID0  

관리자 권한이 없거나 이미 정상 연결이 가능한 경우,  
이 단계는 생략해도 됩니다.

---

</details>

<details markdown="1">
  <summary><strong>7. 서버 모드 확인</strong></summary>

Eclipse에서 Tomcat **Run Configuration**을 열고  
런타임 인수(Runtime Arguments)를 확인하세요.  
다음 항목이 **VM arguments**에 포함되어 있어야 합니다:

-Dserver.mode=DEV

해당 항목이 없을 경우 직접 추가합니다.  
이 설정은 애플리케이션이 **개발 모드(DEV)** 로 실행되도록 보장합니다.

---

</details>

---

## 🧾 계정

이 섹션에서는 개발 및 배포 접근을 위해 필요한 모든 계정과 연결 설정을 다룹니다.  
아래 단계를 따라 각 시스템에서 정상적으로 인증할 수 있는지 확인하세요.

---

<details markdown="1">
  <summary><strong>📑 GitHub</strong></summary>

**목적:** 주요 애플리케이션의 소스 저장소에 접근하기 위함입니다.

**세부 정보:**
- **조직:** `hankooktireusa`
- **저장소:**
  - `WebOrder`
  - `CustomerPortal`
- **접속 방식:** SSH (PEM 키 사용)

**단계:**
1. [https://github.com](https://github.com)에 로그인합니다.  
2. 프로젝트 리드에게 두 저장소에 대한 접근 권한을 요청합니다.  
3. SSH 인증 설정:
   git clone git@github.com:hankooktireusa/WebOrder.git  
   git clone git@github.com:hankooktireusa/CustomerPortal.git  

4. 제공받은 PEM 파일을 안전한 로컬 디렉토리에 저장합니다.  
   (예: C:\Keys\hankooktireusa.pem)

5. SSH 에이전트에 키를 추가합니다:  
   eval "$(ssh-agent -s)"  
   ssh-add C:\Keys\hankooktireusa.pem  

6. SSH 연결 테스트:  
   ssh -T git@github.com  

> 🗒️ *참고:* 원본 온보딩 슬라이드에서 자격 증명 형식 및 예시 키 이름을 확인하세요.

---

</details>

<details markdown="1">
  <summary><strong>📑 Jira</strong></summary>

**목적:** 개발 작업, 스프린트 보드 및 티켓을 관리하기 위함입니다.

**프로젝트 URL:**  
https://hankooktireusa.atlassian.net/jira/software/c/projects/NIWT/boards/11

**단계:**
1. Hankook 사내 이메일로 로그인합니다.  
2. **NIWT** 프로젝트가 표시되지 않으면 접근 권한을 요청합니다.  
3. **Profile → Personal Settings**에서 알림 및 대시보드 환경설정을 조정합니다.

---

</details>

<details markdown="1">
  <summary><strong>📑 AWS 콘솔</strong></summary>

**목적:** 모든 환경에서 EC2, RDS, ALB 구성을 관리하기 위함입니다.

**콘솔 URL:**  
https://hankook-us.signin.aws.amazon.com/console

**계정 번호:** 620483805473 (`hankook-us`)

**로그인 유형:** IAM 사용자 (로그인 화면에서 **IAM user** 선택)

**단계:**
1. 위 콘솔 URL로 이동합니다.  
2. 계정 별칭으로 `hankook-us`를 입력합니다.  
3. IAM 사용자 이름과 비밀번호로 로그인합니다.  
4. 로그인 후 다음 서비스에 접근 가능한지 확인합니다:  
   - EC2 (인스턴스 관리용)  
   - RDS (데이터베이스 연결용)  
   - CloudWatch (로그 확인용)

**참고:** AWS 로그인 화면 예시는 온보딩 슬라이드에서 확인할 수 있습니다.

---

</details>

## 🖥️ PuTTY 연결 (EC2 Bastion 및 터널)

**PuTTY**를 사용하여 **Bastion 호스트**를 통해 EC2 서버에 접속합니다.  
이 방식을 사용하면 안전한 SSH 터널링을 통해 `localhost`를 경유하여  
다른 PuTTY, WinSCP 또는 DB 세션을 열 수 있습니다.

---

<details markdown="1">
  <summary><strong>🔧 1. PuTTY 설치</strong></summary>

1. 공식 사이트에서 PuTTY를 다운로드 및 설치합니다:  
   👉 https://www.putty.org  
2. 설치 후 아래 도구들이 포함되어 있는지 확인합니다:  
   - putty.exe  
   - pageant.exe  
   - pscp.exe  

---

</details>

<details markdown="1">
  <summary><strong>🗂️ 2. Bastion 서버 세션 생성</strong></summary>

먼저 **Bastion**을 통해 연결할 세션을 생성합니다.

1. **PuTTY**를 실행합니다.  
2. **Session** 탭에서 다음을 입력합니다:  
   - **Host Name (or IP address):** `<bastion-hostname>`  
   - **Port:** `22`  
   - **Connection Type:** `SSH`  
3. 세션 이름을 다음과 같이 저장합니다:  
   **Amazon Server - local**  
4. 왼쪽 패널에서 **Connection → Data**로 이동하여 아래 설정을 적용합니다:  
   - *Auto-login username:* `ec2-user`  
5. **Connection → SSH → Auth**로 이동하여 *Private key file for authentication* 항목에서  
   `.ppk` 키 파일을 선택합니다.  
   예시: `C:\Keys\hankook-key.ppk`  
6. **Connection → SSH → Tunnels**로 이동하여 다음을 설정합니다:  
   - **Source port:** `22`  
   - **Destination:** `127.0.0.1:22`  
   - **Add** 클릭  
7. **Session**으로 돌아가 **Save**를 클릭하여 설정을 저장합니다.

---

</details>

<details markdown="1">
  <summary><strong>🌐 3. Bastion 터널을 통한 연결</strong></summary>

1. 저장한 세션 `Amazon Server - local`을 실행합니다.  
2. 처음 연결 시 표시되는 호스트 키를 승인합니다.  
3. 이 창은 닫지 않고 유지합니다 — 이 세션이 터널을 유지합니다.

이제 다음 설정으로 다른 **PuTTY**, **WinSCP**, 또는 **DB 도구**를 통해 연결할 수 있습니다:

**Host:** `localhost`  
**Port:** `22`  
**Username:** `ec2-user`

이 구성은 Bastion 터널을 통해 트래픽을 대상 EC2 인스턴스로 전달합니다.

---

</details>

<details markdown="1">
  <summary><strong>🗝️ 4. 추가 세션 생성</strong></summary>

각 환경별로 **localhost**를 호스트 이름으로 사용하는 추가 세션을 생성합니다:

| 세션 이름 | 호스트 이름 | 포트 | 비고 |
|------------|-------------|------|------|
| **Customer Portal - DEV** | `localhost` | `22` | 개발 환경 (DEV) EC2 |
| **Customer Portal - PRD1** | `localhost` | `22` | 운영 슬롯 1 |
| **Customer Portal - PRD2** | `localhost` | `22` | 운영 슬롯 2 |
| **Web Order - DEV** | `localhost` | `22` | 개발 환경 (DEV) EC2 |
| **Web Order - PRD1** | `localhost` | `22` | 운영 슬롯 1 |
| **Web Order - PRD2** | `localhost` | `22` | 운영 슬롯 2 |

모든 세션에서 Bastion 세션과 동일한 키 파일, 사용자 이름, 기타 설정을 사용합니다.  
단, 호스트 이름은 항상 `localhost`로 지정해야 합니다.

---

</details>

<details markdown="1">
  <summary><strong>✅ 5. PuTTY 세션 창 제목 = 세션 이름 설정</strong></summary>

자동화 스크립트가 PuTTY 세션에 올바르게 포커스를 맞추고 명령을 전송하려면,  
PuTTY **창 제목(Window Title)** 이 `config.ps1` 파일에 정의된 세션 이름과 **정확히 일치해야 합니다.**  
(예: `"Customer Portal - DEV"`, `"Amazon Server - local"`)

**PuTTY 창 제목 설정 방법**  
<details>
<summary>단계별 설정 방법 (클릭하여 확장)</summary>

<br>

1. **PuTTY 구성 열기**  
   - PuTTY를 실행합니다.  
   - 세션 목록에서 저장된 세션(예: `Customer Portal - DEV`)을 선택합니다.  
   - **Load** 클릭.

2. **고정 창 제목 설정**  
   - 왼쪽 패널에서:  
     `Window → Behaviour` 로 이동합니다.  
   - *Window title* 섹션에서 다음을 체크합니다:  
     ✅ **Window title string**  
   - **Window title string** 입력란에 세션 이름을 정확히 입력합니다.  
     예: `Customer Portal - DEV`  
   ⚠️ *대소문자를 포함해 완전히 동일해야 합니다.*  
   (필요 시 **Saved Sessions** 상자에서 복사/붙여넣기 가능)

3. **원격 호스트의 제목 변경 방지**  
   - 왼쪽 패널에서 `Terminal → Features` 로 이동합니다.  
   - 다음 옵션을 체크합니다:  
     ✅ **Disable remote-controlled window title changing**  
   - 이렇게 하면 서버가 제목을 변경하려 해도 고정된 상태로 유지됩니다.

4. **세션 저장**  
   - **Session** 카테고리로 돌아갑니다.  
   - **Save** 클릭으로 세션 설정을 저장합니다.

5. **모든 세션에 대해 반복**  
   다음 PuTTY 세션 각각에 대해 위 설정을 적용합니다:  
   - `Customer Portal - DEV`  
   - `Customer Portal - PRD1`  
   - `Customer Portal - PRD2`  
   - `Web Order - DEV`  
   - `Web Order - PRD1`  
   - `Web Order - PRD2`  
   - `Amazon Server - local`

6. **제목 테스트**  
   - 각 PuTTY 세션을 실행하여 다음을 확인합니다:  
     - 창 상단 제목 및 작업 표시줄 이름이 `config.ps1`의 세션 이름과 정확히 일치하는지  
     - 연결 후에도 제목이 **변경되지 않는지**

</details>

---

</details>

<details markdown="1">
  <summary><strong>📸 참조: Bastion 터널 설정 스크린샷</strong></summary>

*(온보딩 슬라이드의 “3.2 EC2 Server (PuTTY / WinSCP)” 섹션에 해당합니다.)*

다음은 내부 온보딩 자료에서 보여주는 설정 예시입니다:

1. **Session Settings** – 호스트 이름, 포트, 세션 이름  
2. **SSH → Auth** – 개인 키 파일 선택  
3. **SSH → Tunnels** – 포워딩 규칙 추가 (`Source port 22 → 127.0.0.1:22`)  
4. **Data 탭** – 자동 로그인 사용자 이름  
5. **Saved Session 확인** – 저장 후 테스트 완료  

---

구성이 완료되면 다음을 수행할 수 있습니다:
- **PuTTY**로 Bastion에 연결  
- 터널을 유지하기 위해 세션을 열린 상태로 두기  
- **WinSCP** 또는 두 번째 **PuTTY 세션**을 사용해 `localhost`를 통해 대상 서버에 접속

---

</details>

<details markdown="1">
  <summary><strong>📑 WinSCP</strong></summary>

**목적:** 로컬 PC와 원격 Tomcat 서버 간에 WAR 파일 및 구성 업데이트를 전송하기 위한 도구입니다.

**설정:**
- **프로토콜:** SFTP  
- **로그인 유형:** Key file authentication  
- **사용자 이름:** `ec2-user`  
- **개인 키 파일:** `<IT 부서에서 제공>` (예: `hankooktire-us-key.ppk`)

> ⚠️ 연결 전에 **PuTTY Bastion 세션 (`Amazon Server - local`)** 이 열려 있어야 합니다.  
> 이 세션은 SSH 터널을 유지하며, WinSCP가 `localhost`를 통해 내부 EC2 호스트에 접근할 수 있도록 합니다.

---

**Bastion을 통한 연결 방식:**
- **Host name:** `localhost`  
- **Port number:** `22`  
- **Username:** `ec2-user`  
- **Authentication:** PuTTY에서 설정한 동일한 `.ppk` 키 파일 사용  

---

**참고용 내부 서버 정보:**

| 애플리케이션 | 환경 | 내부 호스트 | 설명 |
|---------------|--------|---------------|------|
| Customer Portal | PRD1 | 10.0.10.44 | 운영 서버 1 |
| Customer Portal | PRD2 | 10.0.10.67 | 운영 서버 2 |
| Customer Portal | DEV  | 10.0.10.79 | 개발 서버 |
| Web Order | PRD1 | 10.0.10.113 | 운영 서버 1 |
| Web Order | PRD2 | 10.0.11.76 | 운영 서버 2 |
| Web Order | DEV  | 10.0.10.84 | 개발 서버 |
| Bastion Host | - | 3.131.154.187 | 외부 SSH 접근용 점프 호스트 |

> 💡 *이 IP들은 Bastion 터널을 통해 접근됩니다.  
> 직접 IP로 연결하지 않고 항상 `localhost`를 사용하세요.*

---

**권장 경로:**
- `/opt/tomcat/webapps`  
- `/opt/tomcat/backup`  

---

</details>

<details markdown="1">
  <summary><strong>📑 Oracle SQL Developer</strong></summary>

**목적:** Customer Portal 및 Web Order 애플리케이션의 Oracle 데이터베이스를 조회하고 관리하기 위한 도구입니다.

**설정 참고:**
- **Database Type:** Oracle  
- **Connection Type:** Basic  
- **Port:** `1521`  
- **SID:** `ORCL`

| 애플리케이션 | 환경 | RDS 호스트 | 사용자 이름 | 비밀번호 |
|---------------|--------|-------------|--------------|-----------|
| Customer Portal | DEV | `hankooktire-portal-dev-db.cchxlw7s8qgg.us-east-2.rds.amazonaws.com` | `HKTTPPWD` | `<IT 부서 제공>` |
| Customer Portal | PROD | `hankooktire-portal-prd-db.cchxlw7s8qgg.us-east-2.rds.amazonaws.com` | `HKTTPPWD` | `<IT 부서 제공>` |
| Web Order | DEV | `hankooktire-us-dev-db.cchxlw7s8qgg.us-east-2.rds.amazonaws.com` | `HKTPPWD` | `<IT 부서 제공>` |
| Web Order | PROD | `hankooktire-us-prd-db.cchxlw7s8qgg.us-east-2.rds.amazonaws.com` | `HKTPPWD` | `<IT 부서 제공>` |

---

**연결 단계:**

1. **PuTTY Bastion 터널 열기**  
   - `Amazon Server - local` 세션을 실행하고 유지합니다.  
   - 이렇게 하면 `localhost`를 통해 DB 접근이 가능해집니다.

2. **SQL Developer 연결 구성**  
   Web Order 예시:
   ```
   Connection Name: Web Order - DB
   Username: HKTPPWD
   Password: <provided by IT>
   Hostname: localhost
   Port: 1521
   SID: ORCL
   ```

3. **테스트 및 연결**  
- **Test** 버튼을 눌러 연결이 성공하는지 확인합니다.  
- 연결 성공 시 **Connect** 클릭.

> 💡 *팁:* WinSCP 또는 SQL Developer를 사용할 때는 항상 **PuTTY Bastion 세션**을 먼저 열어야 합니다.  
> SSH 터널이 활성 상태여야 연결이 유지됩니다.

---

</details>



---

## 🧭 첫 단계

모든 설정과 계정 구성이 완료되면, 아래 단계를 따라 환경이 올바르게 작동하는지 확인하세요.  
이 섹션에서는 Eclipse, Tomcat, 그리고 데이터베이스 연결이 정상적으로 동작하는지를 점검합니다.

---

<details markdown="1">
  <summary><strong>1. 설치 확인</strong></summary>

프로젝트를 열기 전에 필요한 도구들이 올바르게 설치되고 연결되어 있는지 확인합니다.

1. **Java 버전 확인**  
   - 터미널 또는 명령 프롬프트에서 다음을 실행합니다:  
     java -version  
     버전 11 이상이 표시되어야 합니다.

2. **Maven 설치 확인**  
   - 동일한 터미널에서 다음을 실행합니다:  
     mvn -version  
     Maven이 인식되고, 위에서 확인한 Java 버전을 사용하는지 확인합니다.

3. **Tomcat 설정 확인**  
   - Eclipse에서 Tomcat이 서버로 추가되어 있는지 확인합니다.  
     (경로: **Window → Preferences → Server → Runtime Environments**)  
   - 경로는 로컬 Tomcat 설치 폴더를 가리켜야 합니다.  
     예: C:\Tomcat\apache-tomcat-9.0.x  

> 💡 **팁:** 위 도구 중 하나라도 오류를 반환한다면, 이전 섹션의 해당 설정 단계를 다시 확인하세요.

---

</details>

<details markdown="1">
  <summary><strong>2. 프로젝트 실행</strong></summary>

환경이 검증되었다면 이제 Eclipse에서 애플리케이션을 빌드하고 실행할 수 있습니다.

1. **프로젝트 열기**  
   - Eclipse에서 해당 워크스페이스를 열고, **Project Explorer**에 `WebOrder` 또는 `CustomerPortal` 프로젝트가 표시되는지 확인합니다.

2. **Maven 프로젝트 업데이트**  
   - 프로젝트를 우클릭 → **Maven → Update Project…**  
   - 다이얼로그에서 프로젝트를 선택하고 **OK** 클릭하여 의존성을 새로고침합니다.

3. **프로젝트 정리 (Clean)**  
   - 상단 메뉴에서 **Project → Clean…** 선택  
   - **Clean all projects**를 선택하고 **Clean** 클릭  
   - 이렇게 하면 최신 Maven 구성으로 워크스페이스가 다시 빌드됩니다.

4. **Tomcat 시작**  
   - **Servers** 뷰에서 구성된 Tomcat 서버를 우클릭 → **Start** 선택  
   - 콘솔 로그에 애플리케이션이 성공적으로 배포되었다는 메시지가 표시될 때까지 기다립니다.

5. **브라우저에서 확인**  
   - 브라우저를 열고 다음 주소로 이동합니다:  
     http://localhost:8080/  
   - 애플리케이션 홈페이지가 오류 없이 로드되는지 확인합니다.

> ⚙️ **참고:** 서버 모드(`-Dserver.mode=DEV`)는 이미 설정 단계에서 구성되어 있으므로 여기서 변경할 필요가 없습니다.

---

</details>

<details markdown="1">
  <summary><strong>3. 데이터베이스 연결 확인</strong></summary>

백엔드 기능 작업 전, 데이터베이스 연결이 정상적으로 작동하는지 확인합니다.

1. **SQL Developer 열기**  
   - Oracle SQL Developer를 실행하고 저장된 연결 프로필(예: `DEV`)을 선택합니다.

2. **연결 테스트**  
   - 연결 대화 상자에서 **Test** 버튼 클릭  
   - 성공 시 녹색 **“Status: Success”** 메시지가 표시됩니다.

3. **샘플 데이터 확인**  
   - 연결 후, 스키마를 확장하고 `HT_USER_DETAIL` 또는 `HT_INTERFACE` 같은 테이블을 엽니다.  
   - 액세스 오류 없이 행이 표시되는지 확인합니다.

> 💡 **팁:** 인증 또는 연결 오류가 발생하면 Oracle 네트워크 구성을 확인하고, IT 팀에 문의하여 데이터베이스 접근 권한을 점검하세요.

---

✅ **이 시점에서**, 로컬 개발 환경이 완전히 준비되었습니다.  
이제 프로젝트 코드베이스를 탐색하고 컨트롤러를 검토하거나 첫 번째 테스트 변경 작업을 시작할 수 있습니다.

</details>
