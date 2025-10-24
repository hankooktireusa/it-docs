---
layout: default
title: Manual Deployment Process
permalink: /en/web/standards-and-procedures/manual-deployment-process/
---

<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
{% include lang-toggle.html %}

# 🚀 Manual Deployment Process

This guide describes the **manual deployment process** for both the **Customer Portal (CP)** and **Web Order System (WOS)**.  
Follow these steps when performing manual deployments in the absence of automated tools.

<details markdown="1">
  <summary><strong>📑 Table of Contents (click to expand)</strong></summary>

- [Before You Begin](#before-you-begin)
- [Deployment for Customer Portal (CP)](#deployment-for-customer-portal-cp)
- [Deployment for Web Order System (WOS)](#deployment-for-web-order-system-wos)
- [Verification Steps](#verification-steps)
- [Post-Deployment Steps](#post-deployment-steps)

</details>

---

## Before You Begin

1. **Commit and Push Code**  
   - Copy the related **Jira task code** and include it in your commit message along with a brief description.  
   - In Eclipse:  
     `Window > Show View > Other > Git > Git Staging`  
   - Commit, then push your changes to the repository.

2. **Identify Target Environment**  
   - Determine whether this deployment is for **DEV**, **PRD1**, or **PRD2**.  
   - Ensure you have access to corresponding **PuTTY** and **WinSCP** sessions.

---

## Deployment for Customer Portal (CP)

### 1. Update Configuration Files
Switch environment comments as appropriate:

```
/hankooktire/src/main/resources/config/sap.properties
/hankooktire/src/main/resources/config/wsdl-info.properties
/hankooktire/src/main/resources/config/spring/datasource-context.xml
```

### 2. Build the Project
- Right-click the project → **Run As > Maven Build...**  
- In *Goals*, type `clean install`.  
- Click **OK** to build.  
- When finished, the **ROOT.war** file will be created.

### 3. Transfer Files to Server
- Open **PuTTY** into the correct server.  
  - Bastion port: `199`  
  - Local port: `79`  
- Open **WinSCP** and connect to **Amazon Server – local**.  
- File paths:  
  - **Left pane:** `C:\Users\Steven.Dunning\git\CustomerPortal\target`  
  - **Right pane:** `/opt/tomcat/webapps`

Steps:
1. After “BUILD SUCCESS,” move the new WAR file from left to right into the `/WAR` folder.  
2. On the right, move the existing `ROOT.war` into `/WAR` as a backup.  
3. Rename the old ROOT file to include the deployment date.  
4. Rename the new snapshot file to `ROOT.war`.  
5. Move the renamed ROOT file out of `/WAR` into `/webapps`.

### 4. Restart Tomcat and Monitor Logs
In the local PuTTY terminal:
```
sudo service tomcat restart
tail -f /opt/tomcat/logs/catalina.out
```

Wait for startup logs to finish.

---

## Verification Steps

### 1. Web Check
Open a browser and test using the server port:  
- **PRD1:** `8080`  
- **PRD2:** `8090`

### 2. SAP Connection Test
**For CP:**  
- Go to `OE PSI > Inbound`  
- Click the **search** box and confirm the SAP destination log shows `DEST: HKQ`.

**For WOS:**  
- Go to **National Accounts Directory**  
- Search for `Bill-To No.: 212751`.  
- Verify `DEST: HKQ` in the PuTTY log.

---

## Post-Deployment Steps

### 1. Switch Configuration Comments
After verification, revert local configuration:

**For CP**
```
sap.properties
wsdl-info.properties
datasource-context.xml
```

**For WOS**
```
/hankooktire/src/main/resources/config/<DEV or PRD>/spring/datasource-context.xml
```

### 2. Promote to Production
For the **first production deployment**:  
- Run again: `Run As > Maven Build > clean install`  
- This ensures the build uses production settings.  
- The same WAR file may be reused for `PRD2`.

### 3. Deploy to Additional Production Servers
Repeat file transfer, renaming, and restart steps for **PRD2** as described above.

---

## Deployment for Web Order System (WOS)

The WOS process is nearly identical to CP, but requires changing only **one configuration file** per environment:

```
/hankooktire/src/main/resources/config/<DEV or PRD>/spring/datasource-context.xml
```

Follow the same Maven build, file transfer, Tomcat restart, and verification procedure as above.

---

✅ **Deployment Complete**  
After both environments are updated and verified, confirm final system functionality and close out the Jira task.
