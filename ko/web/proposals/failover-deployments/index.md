---
layout: default
title: 📑 장애 조치(페일오버) 배포
permalink: /ko/web/proposals/failover-deployments/
---

<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
{% include lang-toggle.html %}

# 📑 장애 조치(페일오버) 배포
가중치 기반 ALB 대상 그룹 라우팅으로 prod1↔prod2 무중단 전환을 구현합니다.

---

## 🎯 목표

- 배포 중에는 트래픽 **100%**를 **prod1**로 보내고 **prod2**에 배포합니다.
- 배포 후 **prod2**로 트래픽을 점진적으로 전환합니다(예: 10% → 25% → 50% → 100%).
- 다음 사이클에서는 역할을 반대로 전환합니다(prod2 실서비스, prod1에 배포).
- 검증 완료 후 균등 분배로 복귀합니다.
- ALB **Listener**의 전달 동작을 **가중치 대상 그룹(Weighted Target Groups)** 으로 전환하여 구현합니다.

---

<details>
<summary><strong>🛠 단계별 가이드 (AWS 콘솔)</strong></summary>

<div markdown="1">

### 1) 현재 Listener 규칙 확인
- AWS 콘솔 → **EC2 → Load Balancers**
- 대상 **ALB** 선택 → **Listeners** 탭 → **:443** 클릭
- 호스트/경로 매칭 규칙에서 `-web-tg` 또는 `-portal-tg`로 전달되는지 확인

---

### 2) 고정 전달 → 가중치 대상 그룹으로 전환
**목표:** prod1 및 prod2 대상 그룹에 가중치를 적용해 트래픽을 분산합니다.

**예시 대상 그룹:**
- `hankooktire-us-prd-<web|portal>-01-tg` (prod1)
- `hankooktire-us-prd-<web|portal>-02-tg` (prod2)

**방법:**
1. 규칙 편집.
2. **Forward to → Weighted target groups** 선택.
3. 두 TG를 추가하고 초기 가중치 설정:
   - `...-01-tg` → **100**
   - `...-02-tg` → **0**
4. 저장.

---

### 3) prod1 100% 전환 검증
- HTTPS 트래픽이 모두 **prod1**로 가는지 확인합니다.
- **prod2**는 대기 상태이므로 안전하게 배포합니다.
- prod2(`...-02-tg` 인스턴스)에 배포합니다.

---

### 4) prod2로 점진적 전환
1. Listener 규칙으로 돌아갑니다.
2. 각 단계별로 가중치를 조정하며 테스트합니다:
   - 90/10 → 75/25 → 50/50 → 25/75 → 0/100 (또는 원하는 단계)
3. 각 단계에서 애플리케이션 동작을 검증합니다.
4. **CloudWatch** 지표(대상 그룹 상태, 지연, 4xx/5xx)를 모니터링합니다.

---

### 5) 다음 배포 사이클에서 역할 전환
1. **prod1 TG** 가중치를 **0**으로 설정.
2. 배포.
3. 다시 **100**까지 단계적으로 증가.
4. 모니터링/테스트 후 마무리.

</div>
</details>

---

<details>
<summary><strong>📌 참고 사항</strong></summary>

<div markdown="1">

- 추가적인 AWS 서비스나 비용 변화는 없습니다.
- 무중단 접근 방식: 가중치 `0`은 **새 연결**만 차단하고 기존 연결은 완료되도록 둡니다.
- 대상 그룹 고정(Stickiness)은 **비활성화**되어 있어, 전환 중 세션이 기존 TG에 붙잡히지 않습니다.
- 전체 배포 프로세스는 변하지 않습니다.
- 페일오버 배포 시 팀과 반드시 일정/단계를 사전 공유하세요.
- **Dev ALB**는 현재 동일 구성을 사용하지 않습니다:
  - 모범 사례: **dev**에서도 가중치 규칙을 구성하여 먼저 시험 운용해 보세요.

</div>
</details>
