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
- [Infrastructure](#infrastructure)
- [Employee Systems](#employee-systems)

</details>

---

## Development Systems

<details markdown="1">
  <summary><strong>📑 GitLab</strong></summary>

**Purpose:** Source control for all Web Team projects.

**URL:** `<GitLab instance URL>`

**Steps:**
1. Request an account from your project lead or IT admin.
2. Once created, confirm you have access to the relevant project group(s).
3. Set up SSH key authentication:
   ```bash
   ssh-keygen -t ed25519 -C "your.email@hankooktech.com"
   ```
4. Add the public key to your GitLab profile under **Preferences → SSH Keys**.
5. Test your connection:
   ```bash
   ssh -T git@<gitlab-host>
   ```

> 💡 *Ask your project lead for the correct group path and repository names.*

---

</details>

<details markdown="1">
  <summary><strong>📑 Jenkins</strong></summary>

**Purpose:** CI/CD pipeline for building and deploying applications.

**URL:** `<Jenkins instance URL>`

**Steps:**
1. Request access from your project lead.
2. Log in using your corporate SSO credentials (or the credentials provided by IT).
3. Confirm you can view the relevant pipeline jobs for the Web Team projects.

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

## Infrastructure

<details markdown="1">
  <summary><strong>📑 AWS Console</strong></summary>

**Purpose:** Cloud infrastructure management (EC2, RDS, CloudWatch, etc.).

**URL:** [https://hankook-us.signin.aws.amazon.com/console](https://hankook-us.signin.aws.amazon.com/console)

**Account:** `hankook-us` (Account #: 620483805473)

**Login type:** IAM User

**Steps:**
1. Navigate to the console URL above.
2. Select **IAM user** and enter the account alias `hankook-us`.
3. Sign in with your IAM username and password (provided by IT).
4. Verify you have read access to EC2, RDS, and CloudWatch for the relevant environments.

---

</details>

---

## Employee Systems

The following systems are used across the company. Request access or activate your account as directed during HR onboarding.

| System | Purpose | URL |
|--------|---------|-----|
| **Arena** | Employee portal | [https://arena.hankooktech.com/](https://arena.hankooktech.com/) |
| **ADP** | Payroll and time management | [https://workforcenow.adp.com/](https://workforcenow.adp.com/) |
| **360 Learning** | Employee training platform | [https://hankooktire.360learning.com/](https://hankooktire.360learning.com/) |
| **e-HR** | HR self-service | [https://g-ehr.hankooktech.com/](https://g-ehr.hankooktech.com/) |
| **Assembly** | Employee recognition | [https://app.joinassembly.com/a](https://app.joinassembly.com/a) |

---

> ⬅️ Back to [Onboarding](../) &nbsp;|&nbsp; Next: [Environment Setup](../environment-setup/) ➡️
