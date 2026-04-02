---
layout: default
title: Environment Setup
permalink: /en/web/onboarding/environment-setup/
---

<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
{% include lang-toggle.html %}

# ⚙️ Environment Setup

This guide walks through setting up your local development environment for Web Team projects. Complete [Access & Accounts](../access-and-accounts/) before starting here.

<details markdown="1">
  <summary><strong>📑 Table of Contents (click to expand)</strong></summary>

- [Prerequisites](#prerequisites)
- [Clone Repositories](#clone-repositories)
- [IDE Configuration](#ide-configuration)
- [Verify Your Setup](#verify-your-setup)

</details>

---

## Prerequisites

Before starting, ensure you have installed all required tools. See [Tools & Services](../tools-and-services/) for download links.

Required:
- Eclipse IDE for Enterprise Java and Web Developers
- Git (with HTTPS access to GitLab)
- OpenJDK (confirm required version with your project lead)
- SAP JCo library — extracted to a known path (see [Tools & Services](../tools-and-services/))

---

## Clone Repositories

<details markdown="1">
  <summary><strong>1. Clone Project Repositories</strong></summary>

Clone the repositories you need. Suggested local path: `C:\Users\<username>\git\`

```bash
git clone https://hq-git.hankooktech.com/digital-si-team/GSP.git
git clone https://hq-git.hankooktech.com/digital-si-team/GCP.git
```

Git will prompt for your GitLab username and Personal Access Token on first use. See [Access & Accounts → GitLab](../access-and-accounts/#gitlab) if you haven't set up a token yet.

> 💡 *To avoid re-entering credentials on every operation:*
> ```bash
> git config --global credential.helper manager
> ```

---

</details>

---

## IDE Configuration

<details markdown="1">
  <summary><strong>1. Create or Select a Workspace</strong></summary>

1. Open Eclipse.
2. Create or select a workspace:
   - Recommended path: `C:\Users\<username>\eclipse-workspace\<workspace_name>`
   - To switch: `File > Switch Workspace > Other...`

---

</details>

<details markdown="1">
  <summary><strong>2. Install EGit (if not already installed)</strong></summary>

1. `Help > Eclipse Marketplace`
2. Search for **EGit** and install **Git Integration for Eclipse**.

---

</details>

<details markdown="1">
  <summary><strong>3. Import Project into Eclipse</strong></summary>

1. `Window > Perspective > Open Perspective > Other... > Git`
2. Select **Clone a Git Repository** and paste the HTTPS URL.
3. Click through **Next** → **Finish**.
4. After cloning, right-click the repository → **Import Projects...** → **Finish**.
5. Right-click the project → `Maven > Update Project` → **OK**.
6. `Project > Clean...` → rebuild.

---

</details>

<details markdown="1">
  <summary><strong>4. Assign JRE</strong></summary>

1. `Window > Preferences > Java > Installed JREs`
2. Add or select the required JDK version (see [Tools & Services](../tools-and-services/)).
3. Confirm it is assigned to the project build path.

---

</details>


<details markdown="1">
  <summary><strong>5. Set VM Arguments</strong></summary>

In Eclipse, open your **Run Configuration** and add the following under **VM arguments**:

```
-Dspring.profiles.active=dev2-us -Djava.library.path="C:\ePortal\sapjco3-ntamd64-3.1.12"
```

Replace the `java.library.path` value with wherever you extracted the SAP JCo library. The recommended path is `C:\ePortal\sapjco3-ntamd64-3.1.12` — see [Tools & Services](../tools-and-services/) for the download and suggested extraction location.

---

</details>

---

## Verify Your Setup

Once everything is configured, confirm your environment is working:

<details markdown="1">
  <summary><strong>Run a Local Build</strong></summary>

1. Right-click the project → **Maven → Update Project…** → **OK**
2. `Project > Clean...` → **Clean all projects**
3. Run the project and confirm it starts without errors in the console

If there are no errors on startup, your environment is ready.

---

</details>

<details markdown="1">
  <summary><strong>Confirm GitLab Access</strong></summary>

Make a test branch and push it to confirm your GitLab access is working end to end:

```bash
git checkout -b test/env-verify
git push origin test/env-verify
```

Delete the branch after confirming:
```bash
git push origin --delete test/env-verify
git checkout main
git branch -d test/env-verify
```

---

</details>

---

> ⬅️ Back to [Access & Accounts](../access-and-accounts/) &nbsp;|&nbsp; Next: [Tools & Services](../tools-and-services/) ➡️
