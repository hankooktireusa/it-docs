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

> 🔗 **Quick access:** See the team’s [Useful URLs]({{ '/en/web/onboarding/#useful-urls' | relative_url }}) list on the Onboarding page.

---

## Environment Setup

Follow the steps below to configure your local development environment for working on the **Customer Portal (CP)** and **Web Order System (WOS)** projects.

---

<details markdown="1">
  <summary><strong>1. Install Required Tools</strong></summary>


Ensure all necessary software and services are installed.  
See the [Tools & Services](tools.md) page for download links and setup instructions.

You’ll need:
- Eclipse IDE for Enterprise Java and Web Developers  
- Git and SSH keys for repository access  
- Apache Tomcat 9.0.100  
- OpenJDK 8 (Temurin)  
- PuTTY and WinSCP  
- Oracle SQL Developer  

> 💡 **Tip:** Install tools in locations you’ll easily remember (e.g., `C:\Tomcat\apache-tomcat-9.0.100`).

---

</details>

<details markdown="1">
  <summary><strong>2. Clone Repositories</strong></summary>


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

</details>

<details markdown="1">
  <summary><strong>3. Configure Eclipse</strong></summary>


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

</details>

<details markdown="1">
  <summary><strong>4. Install and Configure Tomcat</strong></summary>


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

</details>

<details markdown="1">
  <summary><strong>5. Install SAP Library (SAP JCo)</strong></summary>


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

</details>

<details markdown="1">
  <summary><strong>6. Optional: Host File Configuration</strong></summary>


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

</details>

<details markdown="1">
  <summary><strong>7. Verify Server Mode</strong></summary>


In Eclipse, open your Tomcat **Run Configuration** and check the runtime arguments.  
Ensure the following is set under **VM arguments**:

```
-Dserver.mode=DEV
```

If it’s missing, add it manually.  
This ensures your local application runs in **development mode**.


---

</details>

## 🧾 Accounts

This section covers all required accounts and connections for development and deployment access.  
Follow each step below to confirm you can authenticate successfully in all listed systems.

---

<details markdown="1">
  <summary><strong>📑 GitHub</strong></summary>


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

</details>

<details markdown="1">
  <summary><strong>📑 Jira</strong></summary>


**Purpose:** Manage development tasks, sprint boards, and tickets.

**Project URL:**  
[https://hankooktireusa.atlassian.net/jira/software/c/projects/NIWT/boards/11](https://hankooktireusa.atlassian.net/jira/software/c/projects/NIWT/boards/11)

**Steps:**
1. Log in using your Hankook corporate email.
2. Request access to the **NIWT** project if it’s not visible.
3. Set your preferred notification and dashboard options under **Profile → Personal Settings**.

---

</details>

<details markdown="1">
  <summary><strong>📑 AWS Console</strong></summary>


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

</details>

## 🖥️ PuTTY Connections (EC2 Bastion & Tunnels)

You’ll use **PuTTY** to connect to our EC2 servers through a **Bastion host**.  
This allows secure SSH tunneling so you can open another PuTTY, WinSCP, or DB session through `localhost`.

---

<details markdown="1">
  <summary><strong>🔧 1. Install PuTTY</strong></summary>


1. Download and install PuTTY from the official site:  
   👉 [https://www.putty.org](https://www.putty.org)
2. Once installed, verify the following tools are available:  
   - `putty.exe`  
   - `pageant.exe`  
   - `pscp.exe`

---

</details>

<details markdown="1">
  <summary><strong>🗂️ 2. Create the Bastion Server Session</strong></summary>


You’ll first create a session to connect through the **Bastion**.

1. Open **PuTTY**.
2. Under **Session**, enter:
   - **Host Name (or IP address):** `<bastion-hostname>`  
   - **Port:** `22`
   - **Connection Type:** `SSH`
3. Save the session name as:  
   **`Amazon Server - local`**
4. In the left panel, go to **Connection → Data**, and set:
   - *Auto-login username:* `ec2-user`
5. In **Connection → SSH → Auth**, under *Private key file for authentication*, select your `.ppk` key file.  
   Example: `C:\Keys\hankook-key.ppk`
6. Go to **Connection → SSH → Tunnels**, and set up your forwarding rule:
   - **Source port:** `22`
   - **Destination:** `127.0.0.1:22`
   - Click **Add**
7. Go back to **Session**, then click **Save** to store your configuration.

---

</details>

<details markdown="1">
  <summary><strong>🌐 3. Connect Through the Bastion Tunnel</strong></summary>


1. Launch the saved session `Amazon Server - local`.
2. Accept the host key on first connection.
3. Keep this window open — it maintains the tunnel.

You can now open another **PuTTY**, **WinSCP**, or **DB tool** using the following connection parameters:

**Host:** `localhost`  
**Port:** `22`  
**Username:** `ec2-user`

This routes traffic through your Bastion tunnel to the target EC2 instance.

---

</details>

<details markdown="1">
  <summary><strong>🗝️ 4. Create Additional Saved Sessions</strong></summary>


Create additional sessions for each target environment using **localhost** as the hostname:

| Session Name | Hostname | Port | Notes |
|---------------|-----------|------|-------|
| **Customer Portal - DEV** | `localhost` | `22` | For DEV EC2 via tunnel |
| **Customer Portal - PRD1** | `localhost` | `22` | For Production Slot 1 |
| **Customer Portal - PRD2** | `localhost` | `22` | For Production Slot 2 |
| **Web Order - DEV** | `localhost` | `22` | For DEV EC2 via tunnel |
| **Web Order - PRD1** | `localhost` | `22` | For Production Slot 1 |
| **Web Order - PRD2** | `localhost` | `22` | For Production Slot 2 |

Use the same key file, username, and other settings as the Bastion session, except the hostname will always be `localhost`.

---

</details>

<details markdown="1">
  <summary><strong>✅ 5. Set PuTTY Session Window Titles = Session Names</strong></summary>


For the automation scripts to correctly focus and send commands to PuTTY sessions, the PuTTY **window titles must exactly match** the session names listed in your `config.ps1` file (e.g., `"Customer Portal - DEV"`, `"Amazon Server - local"`).

**Steps to Configure PuTTY Window Titles**  
<details>
<summary>Expand for full step-by-step instructions</summary>

<br>

1. **Open PuTTY Configuration**  
   - Launch PuTTY.  
   - Select a saved session (e.g., `Customer Portal - DEV`) from the session list.  
   - Click **Load**.

2. **Set a Fixed Window Title**  
   - In the left panel, navigate to:  
     `Window → Behaviour`  
   - Under *Window title*, check:  
     ✅ **Window title string**  
   - In the **Window title string** box, enter the exact session name as defined in your config, for example:  
     `Customer Portal - DEV`  
   ⚠️ *This is case-sensitive and must match EXACTLY.* (You can copy/paste from the **Saved Sessions** textbox.)

3. **Prevent Title Changes by the Remote Host**  
   - In the left panel, navigate to:  
     `Terminal → Features`  
   - Check the option:  
     ✅ **Disable remote-controlled window title changing**  
   - This ensures the window title stays fixed even if the server tries to change it.

4. **Save the Updated Session**  
   - Go back to the **Session** category.  
   - Click **Save** to update the session with these settings.

5. **Repeat for All Sessions**  
   Update all PuTTY saved sessions used in the automation:  
   - `Customer Portal - DEV`  
   - `Customer Portal - PRD1`  
   - `Customer Portal - PRD2`  
   - `Web Order - DEV`  
   - `Web Order - PRD1`  
   - `Web Order - PRD2`  
   - `Amazon Server - local`

6. **Test the Titles**  
   - Open each PuTTY session and verify:  
     - The window title in the header and taskbar exactly matches the session name in `config.ps1`.  
     - The title does **not change** after connecting.
</details>

---

</details>

<details markdown="1">
  <summary><strong>📸 Reference: Bastion Tunnel Setup Screenshots</strong></summary>


*(Corresponds to “3.2 EC2 Server (PuTTY / WinSCP)” in the onboarding slides)*

Below are example configurations shown in the internal onboarding deck:

1. **Session Settings** – Hostname, Port, Session Name  
2. **SSH → Auth** – Private key selection  
3. **SSH → Tunnels** – Add forwarding rule (`Source port 22 → 127.0.0.1:22`)  
4. **Data Tab** – Auto-login username  
5. **Saved Session Confirmation** – Final save and test  

---

Once configured, you can:
- Connect to the **Bastion** with PuTTY  
- Keep it open to maintain the tunnel  
- Use **WinSCP** or a second PuTTY session to connect to target servers via `localhost`

---

</details>

<details markdown="1">
  <summary><strong>📑 WinSCP</strong></summary>


**Purpose:** Transfer WAR files and configuration updates between your local machine and remote Tomcat servers.

**Setup:**
- **Protocol:** SFTP  
- **Login type:** Key file authentication  
- **Username:** `ec2-user`  
- **Private key:** `<provided by IT>` (example: `hankooktire-us-key.ppk`)

> ⚠️ Before connecting, ensure your **PuTTY Bastion session (`Amazon Server - local`)** is open — this maintains the SSH tunnel required for WinSCP to reach internal EC2 hosts through `localhost`.

---

**Connection Method (through Bastion):**
- **Host name:** `localhost`
- **Port number:** `22`
- **Username:** `ec2-user`
- **Authentication:** Use the same `.ppk` key file configured in PuTTY

---

**Common Server References (for awareness):**

| Application | Environment | Internal Host | Description |
|--------------|-------------|----------------|--------------|
| Customer Portal | PRD1 | 10.0.10.44 | Production Server 1 |
| Customer Portal | PRD2 | 10.0.10.67 | Production Server 2 |
| Customer Portal | DEV  | 10.0.10.79 | Development Server |
| Web Order | PRD1 | 10.0.10.113 | Production Server 1 |
| Web Order | PRD2 | 10.0.11.76 | Production Server 2 |
| Web Order | DEV  | 10.0.10.84 | Development Server |
| Bastion Host | - | 3.131.154.187 | Jump host for external SSH access |

> 💡 *These IPs are accessed through the Bastion tunnel — you’ll connect via `localhost`, not directly by IP.*

---

**Recommended Paths:**
- `/opt/tomcat/webapps`
- `/opt/tomcat/backup`

---

</details>

<details markdown="1">
  <summary><strong>📑 Oracle SQL Developer</strong></summary>


**Purpose:** Query and manage data in the Customer Portal and Web Order Oracle databases.

**Setup Reference:**
- **Database Type:** Oracle  
- **Connection Type:** Basic  
- **Port:** `1521`  
- **SID:** `ORCL`

| Application | Environment | RDS Host | Username | Password |
|--------------|-------------|-----------|-----------|-----------|
| Customer Portal | DEV | `hankooktire-portal-dev-db.cchxlw7s8qgg.us-east-2.rds.amazonaws.com` | `HKTTPPWD` | `<provided by IT>` |
| Customer Portal | PROD | `hankooktire-portal-prd-db.cchxlw7s8qgg.us-east-2.rds.amazonaws.com` | `HKTTPPWD` | `<provided by IT>` |
| Web Order | DEV | `hankooktire-us-dev-db.cchxlw7s8qgg.us-east-2.rds.amazonaws.com` | `HKTPPWD` | `<provided by IT>` |
| Web Order | PROD | `hankooktire-us-prd-db.cchxlw7s8qgg.us-east-2.rds.amazonaws.com` | `HKTPPWD` | `<provided by IT>` |

---

**Steps to Connect:**

1. **Open PuTTY Bastion Tunnel**  
   - Launch `Amazon Server - local` and keep it open.  
   - This enables localhost routing for database access.

2. **Configure SQL Developer Connection**  
   Example for Web Order:
   ```
   Connection Name: Web Order - DB
   Username: HKTPPWD
   Password: <provided by IT>
   Hostname: localhost
   Port: 1521
   SID: ORCL
   ```

3. **Test and Connect**  
   - Click **Test** to confirm connection success.  
   - Once verified, click **Connect**.

> 💡 *Tip:* Always open the PuTTY Bastion session before using WinSCP or SQL Developer — the SSH tunnel must remain active during use.

---

</details>

## 🧭 First Steps

Once all setup and accounts are configured, follow these steps to verify that your environment is working correctly.  
This section ensures that Eclipse, Tomcat, and your database connection are all functioning before you begin development.

---

<details markdown="1">
  <summary><strong>1. Verify Installation</strong></summary>


Before opening any project, confirm that the required tools are installed and linked correctly.

1. **Check Java version**
   - In a terminal or Command Prompt, run:
     ```
     java -version
     ```
     You should see version 11 or later displayed.

2. **Check Maven installation**
   - In the same terminal, run:
     ```
     mvn -version
     ```
     Confirm that Maven is detected and uses the same Java version as above.

3. **Confirm Tomcat setup**
   - Ensure Tomcat has been added as a server in Eclipse (via **Window → Preferences → Server → Runtime Environments**).  
   - The path should point to your local Tomcat installation folder, for example:
     ```
     C:\Tomcat\apache-tomcat-9.0.x
     ```

> 💡 **Tip:** If any of these tools return an error, review the corresponding setup steps in the previous section before continuing.

---

</details>

<details markdown="1">
  <summary><strong>2. Run the Project</strong></summary>


With the environment verified, you can now build and run your application from Eclipse.

1. **Open the project**  
   - In Eclipse, open the appropriate workspace and confirm the project (e.g., `WebOrder`, `CustomerPortal`) appears in the **Project Explorer**.

2. **Update Maven project**
   - Right-click the project → **Maven → Update Project…**
   - In the dialog box, select your project(s) and click **OK** to refresh dependencies.

3. **Clean the project**
   - From the top menu, go to **Project → Clean…**
   - Choose **Clean all projects** and click **Clean**.
   - This rebuilds your workspace using the latest Maven configuration.

4. **Start Tomcat**
   - In the **Servers** view, right-click your configured Tomcat server and select **Start**.
   - Wait for the console log to show that the application has deployed successfully.

5. **Verify in browser**
   - Open a browser and navigate to:
     ```
     http://localhost:8080/
     ```
   - Confirm the application homepage loads without errors.

> ⚙️ **Note:** The server mode (e.g., `-Dserver.mode=DEV`) is already configured during setup and does not need to be modified here.

---

</details>

<details markdown="1">
  <summary><strong>3. Database Connection Check</strong></summary>


Ensure your database connection is functioning correctly before working with any backend features.

1. **Open SQL Developer**
   - Launch Oracle SQL Developer and select your saved connection profile (e.g., `DEV`).

2. **Test the connection**
   - Click **Test** in the connection dialog.  
   - A successful test will display a green **“Status: Success”** message.

3. **View sample data**
   - After connecting, expand the schema and open a table such as `HT_USER_DETAIL` or `HT_INTERFACE`.
   - Confirm you can view rows without any access errors.

> 💡 **Tip:** If you encounter authentication or connection errors, verify your Oracle network configuration and contact the IT team for database access verification.

---

✅ **At this point**, your local development environment should be fully operational.  
You can now begin exploring the project codebase, reviewing controllers, and making your first test changes.

</details>
