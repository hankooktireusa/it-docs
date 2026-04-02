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
- [Local Server Setup](#local-server-setup)
- [Verify Your Setup](#verify-your-setup)

</details>

---

## Prerequisites

Before starting, ensure you have installed all required tools. See [Tools & Services](../tools-and-services/) for download links.

Required:
- Eclipse IDE for Enterprise Java and Web Developers
- Git (with SSH key configured for GitLab)
- Apache Tomcat
- OpenJDK (see Tools & Services for the required version)
- PuTTY and WinSCP (for server access)

---

## Clone Repositories

<details markdown="1">
  <summary><strong>1. Configure Git SSH for GitLab</strong></summary>

If you haven't already added your SSH key to GitLab, do so now. See [Access & Accounts → GitLab](../access-and-accounts/#gitlab) for steps.

Verify your SSH key is working:
```bash
ssh -T git@<gitlab-host>
```

---

</details>

<details markdown="1">
  <summary><strong>2. Clone Project Repositories</strong></summary>

Clone the repositories you need to the suggested local path:

```bash
C:\Users\<username>\git\
```

Example:
```bash
git clone git@<gitlab-host>:<group>/<repository>.git
```

> 💡 *Ask your project lead for the correct repository paths.*

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
  <summary><strong>2. Add SSH Key to Eclipse</strong></summary>

1. Go to `Window > Preferences > General > Network Connections > SSH2`
2. Click **Add Private Key** and select your `.pem` or `.ppk` file.
   - Suggested key location: `C:\Utility\Keys\`

---

</details>

<details markdown="1">
  <summary><strong>3. Install EGit (if not already installed)</strong></summary>

1. `Help > Eclipse Marketplace`
2. Search for **EGit** and install **Git Integration for Eclipse**.

---

</details>

<details markdown="1">
  <summary><strong>4. Import Project into Eclipse</strong></summary>

1. `Window > Perspective > Open Perspective > Other... > Git`
2. Select **Clone a Git Repository** and paste the SSH URL.
3. Click through **Next** → **Finish**.
4. After cloning, right-click the repository → **Import Projects...** → **Finish**.
5. Right-click the project → `Maven > Update Project` → **OK**.
6. `Project > Clean...` → rebuild.

---

</details>

<details markdown="1">
  <summary><strong>5. Assign JRE</strong></summary>

1. `Window > Preferences > Java > Installed JREs`
2. Add or select the required JDK version (see [Tools & Services](../tools-and-services/)).
3. Confirm it is assigned to both the project build path and the Tomcat server runtime.

---

</details>

---

## Local Server Setup

<details markdown="1">
  <summary><strong>1. Add Tomcat to Eclipse</strong></summary>

1. `Window > Show View > Servers`
2. Click **Create a new server**.
3. Choose **Apache → Tomcat v9.0 Server** (or the version specified in Tools & Services).
4. Set the installation directory to your Tomcat folder.
5. Click **Next**, add the project(s), and click **Finish**.

---

</details>

<details markdown="1">
  <summary><strong>2. Configure Server Settings</strong></summary>

1. In the **Servers** view, double-click your Tomcat server.
2. Change the **HTTP/1.1 port** if required (confirm with your project lead).
3. Open `server.xml` and verify the `<Context>` element points to the correct project.

---

</details>

<details markdown="1">
  <summary><strong>3. Set VM Arguments</strong></summary>

In Eclipse, open the Tomcat **Run Configuration** and check **VM arguments**.  
Ensure the following is set:

```
-Dserver.mode=DEV
```

This ensures your local build runs in development mode and does not connect to production services.

---

</details>

---

## Verify Your Setup

Once everything is configured, confirm your environment is working:

<details markdown="1">
  <summary><strong>Run a Local Build</strong></summary>

1. Right-click the project → **Maven → Update Project…** → **OK**
2. `Project > Clean...` → **Clean all projects**
3. In the **Servers** view, right-click Tomcat → **Start**
4. Wait for the console to show a successful deployment
5. Open a browser and navigate to `http://localhost:<port>/`

If the application loads without errors, your environment is ready.

---

</details>

<details markdown="1">
  <summary><strong>Confirm GitLab Access</strong></summary>

Make a test branch and push it to confirm your GitLab SSH access is working end to end:

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
