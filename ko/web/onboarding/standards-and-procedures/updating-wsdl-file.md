---
layout: default
title: WSDL 파일 업데이트
permalink: /ko/web/onboarding/standards-and-procedures/updating-wsdl-file/
---

<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
{% include lang-toggle.html %}

# 🔄 WSDL 파일 업데이트

이 문서는 프로젝트의 WSDL (Web Services Description Language) 파일을 업데이트하는 절차를 설명합니다. 아래 단계를 순서대로 따라 하여 일관성과 성공적인 통합을 보장하십시오.  

<details markdown="1">
  <summary><strong>📑 목차 (클릭하여 펼치기)</strong></summary>

- [절차](#절차)

</details>

---

## 절차

1. **새로운 WSDL 파일 다운로드**  
   - **GHQ**에서 최신 버전의 WSDL 파일을 다운로드합니다.  

2. **기존 WSDL 파일 교체**  
   - 다음 경로로 이동합니다:  
     ```
     \src\main\resources\wsdl\<EAI ID of the new WSDL>_IWOSHA_SOService.wsdl
     ```
   - 파일 내용을 새로운 WSDL로 덮어씁니다.  
   - 저장합니다.  

3. **`pom.xml` 업데이트**  
   - `pom.xml` 파일을 엽니다.  
   - 맨 아래로 스크롤하여 `<!-- mvn generate sources -->` 주석 아래 부분을 **주석 해제**합니다.  
   - 저장합니다.  

4. **Maven generate-sources 실행**  
   - 프로젝트를 마우스 오른쪽 버튼으로 클릭합니다.  
   - 다음을 선택합니다:  
     ```
     Run As > 6 Maven generate-sources
     ```

5. **생성된 Java 파일 처리**  
   - 다음 경로로 이동합니다:  
     ```
     \src\main\java\com\hankooktire\ws\wsdl
     ```
   - **새로운 파일을 제외한 모든 파일**을 선택합니다.  
   - 마우스 오른쪽 버튼 클릭 후:  
     ```
     Replace With > HEAD Revision
     ```
   - `SHA`, `SHAResponse`로 끝나는 **새로운 파일**에 대해:  
     - 파일을 열고 주석 처리된 부분을 지나 아래로 스크롤합니다.  
     - `public class` 줄 바로 위에 `@XmlRootElement` 어노테이션을 추가합니다.  

       **SHA 파일 예시:**  
       ```java
       @XmlRootElement(namespace = "http://www.hankooktire.com/SD/IWOSHA", name = "MT_<EAI ID>_IWOSHA")
       public class ...
       ```

       **SHAResponse 파일 예시:**  
       ```java
       @XmlRootElement(namespace = "http://www.hankooktire.com/SD/IWOSHA", name = "MT_<EAI ID>_IWOSHA_response")
       public class ...
       ```

6. **데이터베이스 설정 업데이트**  
   - `HT_INTERFACE` 테이블에서 해당 EAI의 `EAIYN` 필드를 업데이트합니다:  
     - **`N`**: **RFC** 테스트용  
     - **`Y`**: **EAI** 테스트용  

7. **QA 서버 테스트 수행**  
   - QA 서버에서 RFC 및 EAI를 테스트합니다.  

8. **운영 배포 진행**  
   - **GHQ**를 업데이트하여 변경 사항을 운영 환경에 반영합니다.  
   - 운영 서버에서 **RFC** 및 **EAI**를 확인합니다.  

9. **SAP와 최종 확인**  
   - SAP 팀과 협의하여 모든 기능이 정상 동작하는지 확인합니다.  

---
