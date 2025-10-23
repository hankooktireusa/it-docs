---
layout: default
title: Setup Guide
permalink: /en/web/onboarding/setup-guide/
---

<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
{% include lang-toggle.html %}

# ⚙️ Setup Guide

This guide explains the basic setup steps for new employees.  
(Currently a placeholder — content to be added.)

<details markdown="1">
  <summary><strong>📑 Table of Contents (click to expand)</strong></summary>

- [Environment Setup](#environment-setup)
- [Accounts](#accounts)
- [First Steps](#first-steps)

</details>

---

## Environment Setup

Follow the steps below to configure your local development environment for working on the **Customer Portal (CP)** and **Web Order System (WOS)** projects.

---

### 1. Install Required Tools

Ensure all necessary software and services are installed.  
See the [Tools & Accounts](../tools.md) page for download links and setup instructions.

You’ll need:
- Eclipse IDE for Enterprise Java and Web Developers  
- Git and SSH keys for repository access  
- Apache Tomcat 9.0.100  
- OpenJDK 8 (Temurin)  
- PuTTY and WinSCP  
- Oracle SQL Developer  

> 💡 **Tip:** Install tools in locations you’ll easily remember (e.g., `C:\Tomcat\apache-tomcat-9.0.100`).

---

### 2. Clone Repositories

Clone the main application repositories from GitHub:

```
https://github.com/hankooktireusa/WebOrder
https://github.com/hankooktireusa/CustomerPortal
```

You can use the suggested path:

```
C:\Users\<username>\git\
```

or any other preferred location.

---

### 3. Configure Eclipse

1. **Create or select a workspace**
   - Recommended path:  
     `C:\Users\<username>\eclipse-workspace\<workspace_name>`
   - To switch or create:  
     `File > Switch Workspace > Other...`

2. **Add SSH keys**
   - `Window > Preferences > General > Network Connections > SSH2`
   - Click **Add Private Key** and select your `.pem` or `.ppk` file.  
     Suggested path: `C:\Utility\Keys\`
   - Password: `hankooktireusa`

3. **Install EGit (if not already installed)**
   - `Help > Eclipse Marketplace`
   - Search for **EGit** and install **Git Integration for Eclipse**.

4. **Clone repositories in Eclipse**
   - `Window > Perspective > Open Perspective > Other... > Git`
   - Select **Clone a Git Repository** and paste the SSH URL.
   - Click through **Next** → **Finish**.
   - After cloning, right-click the repository → **Import Projects...** → **Finish**.

5. **Update Maven Projects**
   - Right-click the project → `Maven > Update Project` → **OK**.
   - Then go to `Project > Clean...` and rebuild.

6. **Assign JRE**
   - `Window > Preferences > Java > Installed JREs`
   - Add or select **OpenJDK 8 (Temurin)**.
   - Confirm it’s assigned for both the project and Tomcat server.

---

### 4. Install and Configure Tomcat

1. **Install Apache Tomcat 9.0.100**
   - Suggested path:  
     `C:\Tomcat\apache-tomcat-9.0.100`
   - Any location is acceptable as long as it’s easily accessible.

2. **Add Tomcat to Eclipse**
   - `Window > Show View > Servers`
   - Click **Create a new server**.
   - Choose **Apache → Tomcat v9.0 Server**.
   - Assign a name (e.g., `WebOrder Tomcat v9.0 at localhost`).
   - Set installation directory to your Tomcat folder.
   - Click **Next**, add the project(s), and click **Finish**.

3. **Modify server configuration**
   - Under **Servers** tab, double-click the Tomcat server.
   - Change the **HTTP/1.1 port** to `80`.
   - Open `server.xml`, search for `path=`, and set:
     ```xml
     <Context docBase="WebOrder" path="/" reloadable="true" source="org.eclipse.jst.jee.server:WebOrder"/>
     ```

4. **Set Package Presentation**
   - In Project Explorer → Click the drop-down menu →  
     `Package Presentation > Hierarchical`.

---

### 5. Install SAP Library (SAP JCo)

1. Download from the onboarding resources:
   - `sapjco3-NTAMD64-3.0.16.zip`
   - `sapjco3.zip`

2. Extract the files and:
   - Copy `sapjco3.dll` to:
     ```
     C:\Windows\System32
     ```
   - Copy `sapjco3.jar` and add it to your project via:
     ```
     Right-click project → Properties → Java Build Path → Add External JARs
     ```

> 💡 The folder you extract these files to can be anywhere — just ensure you remember where they are for future setup.

---

### 6. Optional: Host File Configuration

If your local environment cannot connect to EAI endpoints, you may need to add host mappings.

Add the following (if necessary) to:
```
C:\Windows\System32\drivers\etc\hosts
```

```
# EAI PRD
202.31.7.221   HKPPID1 HKPPID1.hankooktire.com hkppid1
202.31.7.222   HKPPID2 HKPPID2.hankooktire.com hkppid2
202.31.7.220   HKPPID0 HKPPID0.hankooktire.com hkppid0     # HA Virtual Host
202.31.7.236   HKPPID  HKPPID.hankooktire.com  hkppid      # L4 Loadbalancer

# EAI QA
202.31.7.225   hkqpid0 HKQPID0.hankooktire.com hkqpid0.hankooktire.com HKQPID0

# EAI DEV
202.31.7.224   hkdpid0 HKDPID0.hankooktire.com hkdpid0.hankooktire.com HKDPID0
```

If you do not have admin privileges or your connection already works, you can skip this step.

---

### 7. Verify Server Mode

In Eclipse, open your Tomcat **Run Configuration** and check the runtime arguments.  
Ensure the following is set under **VM arguments**:

```
-Dserver.mode=DEV
```

If it’s missing, add it manually.  
This ensures your local application runs in **development mode**.


---

## 🧾 Accounts

This section covers all required accounts and connections for development and deployment access.  
Follow each step below to confirm you can authenticate successfully in all listed systems.

---

### 📑 GitHub

**Purpose:** Access to source repositories for the core applications.

**Details:**
- **Organization:** `hankooktireusa`
- **Repositories:**
  - `WebOrder`
  - `CustomerPortal`
- **Access Method:** SSH (with PEM key)

**Steps:**
1. Log in to [https://github.com](https://github.com)
2. Request access to both repositories from your project lead.
3. Configure SSH authentication:
   ```bash
   git clone git@github.com:hankooktireusa/WebOrder.git
   git clone git@github.com:hankooktireusa/CustomerPortal.git
   ```
4. Place your provided PEM file in a secure local directory (e.g., `C:\Keys\hankooktireusa.pem`).
5. Add the key to your SSH agent:
   ```bash
   eval "$(ssh-agent -s)"
   ssh-add C:\Keys\hankooktireusa.pem
   ```
6. Test your SSH access:
   ```bash
   ssh -T git@github.com
   ```

> 🗒️ *Reference:* See the original onboarding slide for credential formatting and example key names.

---

### 📑 Jira

**Purpose:** Manage development tasks, sprint boards, and tickets.

**Project URL:**  
[https://hankooktireusa.atlassian.net/jira/software/c/projects/NIWT/boards/11](https://hankooktireusa.atlassian.net/jira/software/c/projects/NIWT/boards/11)

**Steps:**
1. Log in using your Hankook corporate email.
2. Request access to the **NIWT** project if it’s not visible.
3. Set your preferred notification and dashboard options under **Profile → Personal Settings**.

---

### 📑 AWS Console

**Purpose:** Manage EC2, RDS, and ALB configurations for all environments.

**Console URL:**  
[https://hankook-us.signin.aws.amazon.com/console](https://hankook-us.signin.aws.amazon.com/console)

**Account #:** 620483805473 (`hankook-us`)

**Login Type:** IAM User (select **IAM user** on the login screen)

**Steps:**
1. Go to the console URL above.
2. Enter the account alias `hankook-us`.
3. Sign in with your IAM username and password.
4. Once logged in, verify access to:
   - EC2 (for instance management)
   - RDS (database connections)
   - CloudWatch (log review)

**Reference:** See onboarding screenshot for the AWS login screen example.

---

### 📑 WinSCP

**Purpose:** Transfer WAR files and configuration updates between your local machine and remote Tomcat servers.

**Setup:**
- Use **SFTP** protocol
- Login type: **Key file authentication**
- Username: `ec2-user`
- Private key: `<provided by IT>` (example: `hankooktire-us-key.ppk`)

**Common Server Addresses (for reference):**

| Application | Environment | Host / Port | Description |
|--------------|-------------|--------------|--------------|
| Customer Portal | PRD1 | 10.0.10.44:22 | Production Server 1 |
| Customer Portal | PRD2 | 10.0.10.67:22 | Production Server 2 |
| Customer Portal | DEV  | 10.0.10.79:22 | Development Server |
| Web Order | PRD1 | 10.0.10.113:22 | Production Server 1 |
| Web Order | PRD2 | 10.0.11.76:22 | Production Server 2 |
| Web Order | DEV  | 10.0.10.84:22 | Development Server |
| Bastion Host | - | 3.131.154.187:22 | Jump host for external SSH access |

> ⚠️ *Passwords and key files are provided separately by IT. Do not store credentials inside WinSCP session files.*

**Recommended Paths:**
- `/opt/tomcat/webapps`
- `/opt/tomcat/backup`

---

### 📑 Oracle SQL Developer

**Purpose:** Query and manage data in the Customer Portal and Web Order Oracle databases.

**Setup Reference:**
- **Database Type:** Oracle  
- **Connection Type:** Basic  
- **Port:** `1521`  
- **SID:** `ORCL`

| Application | Environment | Host | Username | Password |
|--------------|-------------|------|-----------|-----------|
| Customer Portal | DEV | `hankooktire-portal-dev-db.cchxlw7s8qgg.us-east-2.rds.amazonaws.com` | `HKTTPPWD` | `<provided by IT>` |
| Customer Portal | PROD | `hankooktire-portal-prd-db.cchxlw7s8qgg.us-east-2.rds.amazonaws.com` | `HKTTPPWD` | `<provided by IT>` |
| Web Order | DEV | `hankooktire-us-dev-db.cchxlw7s8qgg.us-east-2.rds.amazonaws.com` | `HKTPPWD` | `<provided by IT>` |
| Web Order | PROD | `hankooktire-us-prd-db.cchxlw7s8qgg.us-east-2.rds.amazonaws.com` | `HKTPPWD` | `<provided by IT>` |

**Steps:**
1. Open **PuTTY** and connect to the matching environment (e.g., `Web Order - DEV` or `Customer Portal - PRD1`).
2. Keep the session open — this establishes the SSH tunnel.
3. In SQL Developer, create or select the matching connection profile:
   ```
   Connection Name: Web Order - DB
   Username: HKTPPWD
   Password: <provided by IT>
   Hostname: localhost
   Port: 1521
   SID: ORCL
   ```
4. Click **Test** to confirm successful connection.
5. Once verified, click **Connect**.

> 💡 *Tip:* Always open the PuTTY session before connecting through SQL Developer, or the database will not be reachable.

---

## First Steps

_TODO: add details._
