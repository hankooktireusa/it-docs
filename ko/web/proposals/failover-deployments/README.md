<link rel="stylesheet" href="/it-docs/assets/css/custom.css">

{% include lang-toggle.html %}

# 📑 장애 조치 배포 (Fail Over Deployments)
무중단 prod1↔prod2 전환을 위해 ALB 대상 그룹 가중치 라우팅을 활용하는 방법.

---

## 🎯 목표

- **prod1**에 100% 트래픽을 전송하면서 **prod2**에 배포.
- 점진적으로 **prod2**로 트래픽 전환 (예: 10% → 25% → 50% → 100%).
- 다음 배포 주기에서 역할 반전 (prod2 운영, prod1 배포).
- 검증 후 균등 분배로 복귀.
- ALB의 리스너 전달 동작을 **가중치 대상 그룹**으로 변환하여 수행.

---

<details>
<summary><strong>🛠 단계별 계획 (AWS 콘솔)</strong></summary>

<div markdown="1">

### 1) 현재 리스너 규칙 확인
- AWS 콘솔 → **EC2 → 로드 밸런서**
- **ALB** 선택 → **리스너** 탭 → **:443** 클릭
- 호스트/경로에 매칭되는 규칙 검토 → `-web-tg` 또는 `-portal-tg`로 전달.

---

### 2) 고정 규칙 → 가중치 대상 그룹으로 변환
**목표:** prod1과 prod2 대상 그룹 모두로 트래픽 전달, 가중치 조정 가능.

**예시 대상 그룹:**
- `hankooktire-us-prd-<web|portal>-01-tg` (prod1)
- `hankooktire-us-prd-<web|portal>-02-tg` (prod2)

**방법:**
1. 규칙 수정.
2. **Forward to → Weighted target groups** 선택.
3. 두 대상 그룹 추가, 초기 가중치 설정:
   - `...-01-tg` → **100**
   - `...-02-tg` → **0**
4. 저장.

---

### 3) prod1 100% 상태 검증
- 모든 HTTPS 트래픽이 **prod1**으로 전송.
- **prod2**는 유휴 상태로 배포 가능.
- prod2(`...-02-tg` 인스턴스)에 배포.

---

### 4) prod2로 점진적 트래픽 전환
1. 리스너 규칙으로 돌아감.
2. 각 단계에서 테스트하며 가중치 조정:
   - 90/10 → 75/25 → 50/50 → 25/75 → 0/100 (또는 원하는 간격).
3. 각 단계에서 애플리케이션 동작 검증.
4. **CloudWatch** 지표 모니터링 (TG 상태, 지연 시간, 4xx/5xx).

---

### 5) 다음 배포 시 역할 반전
1. **prod1 TG** 가중치를 **0**으로 설정.
2. 배포.
3. **100**으로 복귀.
4. 모니터링, 테스트, 마무리.

</div>
</details>

---

<details>
<summary><strong>📌 참고 사항</strong></summary>

<div markdown="1">

- 추가 AWS 서비스나 비용 변화 없음.
- 무중단 방식: 가중치 `0`은 **새로운** 연결을 차단하지만 기존 연결은 완료될 때까지 유지.
- TG 세션 고정은 **해제**되어 있어 전환 시 이전 TG에 붙잡히지 않음.
- 기존 배포 프로세스는 변경되지 않음.
- 장애 조치 배포 시 팀과 반드시 협의.
- **Dev ALB**는 현재 이 설정을 반영하지 않음:
  - 권장: **dev** 환경에서 가중치 규칙 복제 후 먼저 테스트.

</div>
</details>
