---
layout: default
title: Access & Accounts
permalink: /en/web/onboarding/access-and-accounts/
---

<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
{% include lang-toggle.html %}

# 🔑 Access & Accounts

This page covers all systems you will need access to as a Web Team member. Work through each section and confirm you can log in before moving on to environment setup.

<details markdown="1">
  <summary><strong>📑 Table of Contents (click to expand)</strong></summary>

- [Development Systems](#development-systems)
- [Project Management](#project-management)
- [Employee Systems](#employee-systems)

</details>

---

## Development Systems

<details markdown="1">
  <summary><strong>📑 GitLab</strong></summary>

**Purpose:** Source control for all Web Team projects.

| Repo | URL |
|------|-----|
| Admin (GSP) | [https://hq-git.hankooktech.com/digital-si-team/GSP/](https://hq-git.hankooktech.com/digital-si-team/GSP/) |
| Customer (GCP) | [https://hq-git.hankooktech.com/digital-si-team/GCP/](https://hq-git.hankooktech.com/digital-si-team/GCP/) |

**Authentication:** HTTPS with a Personal Access Token (PAT)

**Steps:**
1. Request an account from your project lead or IT admin.
2. Once created, confirm you have access to the relevant project group(s).
3. Generate a Personal Access Token:
   - In GitLab, go to **User Menu (top right) → Preferences → Access Tokens**
   - Create a token with at least `read_repository` and `write_repository` scopes
   - Copy and save it — you will not be able to see it again
4. When cloning or pushing, use your GitLab username and the token as the password:
   ```bash
   git clone https://hq-git.hankooktech.com/digital-si-team/GSP.git
   ```
   Git will prompt for your username and password on first use. Enter your PAT as the password.

> 💡 *To avoid re-entering credentials, configure Git to cache them:*
> ```bash
> git config --global credential.helper manager
> ```

---

</details>

<details markdown="1">
  <summary><strong>📑 Jenkins</strong></summary>

**Purpose:** CI/CD pipeline for building and deploying applications.

| Environment | URL | Job |
|-------------|-----|-----|
| DEV | [https://hqdev-jenkins.hankooktech.com](https://hqdev-jenkins.hankooktech.com) | `ePortal DEV` |
| PRD | [https://hq-jenkins.hankooktech.com](https://hq-jenkins.hankooktech.com) | `ePortal PRD 1`, `ePortal PRD 2` |

**Steps:**
1. Request access from your project lead.
2. Log in using your corporate SSO credentials.
3. Confirm you can view the ePortal pipeline jobs for both environments.

> 💡 *See [Deployment Process](../standards-and-procedures/deployment-process/) for how Jenkins is used in the team's workflow.*

---

</details>

<details markdown="1">
  <summary><strong>📑 ePortal Admin</strong></summary>

**Purpose:** Administrative interface for the ePortal application.

| Environment | URL |
|-------------|-----|
| Production | [https://admportal-hta.hankookn.com/](https://admportal-hta.hankookn.com/) |
| Development | [https://devadmportal-hta.hankookn.com/](https://devadmportal-hta.hankookn.com/) |

**Steps:**
1. Request admin credentials from your project lead.
2. Verify you can log in to both environments.

---

</details>

---

## Project Management

<details markdown="1">
  <summary><strong>📑 Jira</strong></summary>

**Purpose:** Task tracking, sprint boards, and issue management.

**URL:** [https://hankooktireusa.atlassian.net/jira/software/c/projects/NIWT/boards/11](https://hankooktireusa.atlassian.net/jira/software/c/projects/NIWT/boards/11)

**Steps:**
1. Log in with your Hankook corporate email at [https://hankooktireusa.atlassian.net](https://hankooktireusa.atlassian.net).
2. Request access to the **NIWT** project from your project lead if it is not visible.
3. Familiarize yourself with the board — active sprints, backlog, and ticket workflow.

---

</details>

---

## Employee Systems

The following systems are used across the company. Request access or activate your account as directed during HR onboarding.

| System | Purpose |
|--------|---------|
| **[Arena](https://arena.hankooktech.com/)** | Employee portal |
| **[ADP](https://workforcenow.adp.com/)** | Payroll and time management |
| **[360 Learning](https://hankooktire.360learning.com/)** | Employee training platform |
| **[e-HR](https://g-ehr.hankooktech.com/)** | HR self-service |
| **[Assembly](https://app.joinassembly.com/a)** | Employee recognition |

---

> ⬅️ Back to [Onboarding](../) &nbsp;|&nbsp; Next: [Environment Setup](../environment-setup/) ➡️
