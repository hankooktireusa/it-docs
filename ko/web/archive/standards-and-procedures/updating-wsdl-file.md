---
layout: default
title: WSDL 파일 업데이트 (레거시)
permalink: /ko/web/archive/standards-and-procedures/updating-wsdl-file/
---

<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
{% include lang-toggle.html %}

# 🔄 WSDL 파일 업데이트

> ⚠️ *이것은 아카이브된 문서입니다. 레거시 Web Order System 및 Customer Portal에 한정된 절차를 설명합니다. 최신 문서는 [현재 표준 및 절차](../../standards-and-procedures/)를 참조하세요.*

이 문서는 프로젝트의 WSDL (Web Services Description Language) 파일을 업데이트하는 절차를 설명합니다.

<details markdown="1">
  <summary><strong>📑 목차 (클릭하여 펼치기)</strong></summary>

- [절차](#절차)

</details>

---

## 절차

1. **새로운 WSDL 파일 다운로드** — **GHQ**에서 최신 버전 다운로드

2. **기존 WSDL 파일 교체**
   ```
   \src\main\resources\wsdl\<EAI ID>_IWOSHA_SOService.wsdl
   ```

3. **`pom.xml` 업데이트** — `<!-- mvn generate sources -->` 섹션 주석 해제

4. **Maven generate-sources 실행**
   ```
   Run As > 6 Maven generate-sources
   ```

5. **생성된 Java 파일 처리**
   - `\src\main\java\com\hankooktire\ws\wsdl` 경로에서
   - 기존 파일 → `Replace With > HEAD Revision`
   - 새 파일 (`SHA`, `SHAResponse`)에 `@XmlRootElement` 추가:
     ```java
     @XmlRootElement(namespace = "http://www.hankooktire.com/SD/IWOSHA", name = "MT_<EAI ID>_IWOSHA")
     public class ...
     ```

6. **데이터베이스 설정 업데이트** — `HT_INTERFACE` 테이블의 `EAIYN` 필드:
   - `N`: RFC 테스트 / `Y`: EAI 테스트

7. **QA 서버 테스트** — RFC 및 EAI 테스트

8. **운영 배포** — GHQ 업데이트 후 운영 환경 확인

9. **SAP와 최종 확인** — SAP 팀과 정상 동작 확인

---
