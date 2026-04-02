---
layout: default
title: Deployment Process
permalink: /en/web/standards-and-procedures/deployment-process/
---

<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
{% include lang-toggle.html %}

# 🚀 Deployment Process

This document describes the standard process for deploying Web Team applications using **GitLab** and **Jenkins**.

<details markdown="1">
  <summary><strong>📑 Table of Contents (click to expand)</strong></summary>

- [Overview](#overview)
- [Before You Deploy](#before-you-deploy)
- [Deployment Steps](#deployment-steps)
- [Verification](#verification)
- [Rollback](#rollback)

</details>

---

## Overview

Deployments follow a pipeline-driven workflow. Code merged to the appropriate branch in GitLab triggers a Jenkins job that builds and deploys to the target environment.

| Environment | Branch | Notes |
|-------------|--------|-------|
| Development | `<dev branch>` | Deployed automatically on merge |
| Production | `<prod branch>` | Requires manual trigger or approval |

> 💡 *Confirm branch names and trigger behavior with your project lead — pipeline configurations vary per project.*

---

## Before You Deploy

Before initiating a deployment, confirm the following:

- [ ] Your changes are committed and pushed to GitLab
- [ ] Your merge request (MR) has been reviewed and approved
- [ ] The MR has been merged to the target branch
- [ ] You have access to Jenkins and can view the relevant pipeline job
- [ ] The target environment is not currently in use by another deployment

---

## Deployment Steps

<details markdown="1">
  <summary><strong>1. Merge Your Changes</strong></summary>

1. Open your merge request in GitLab.
2. Confirm all required approvals are in place.
3. Click **Merge** to merge the branch into the target branch.

---

</details>

<details markdown="1">
  <summary><strong>2. Trigger the Jenkins Pipeline</strong></summary>

Depending on the project configuration, the Jenkins job may start automatically or require a manual trigger.

**If manual trigger is required:**
1. Open Jenkins and navigate to the relevant job.
2. Click **Build Now** (or **Build with Parameters** if applicable).
3. Select the correct environment and branch if prompted.
4. Click **Build**.

---

</details>

<details markdown="1">
  <summary><strong>3. Monitor the Build</strong></summary>

1. In Jenkins, open the running build to view the **Console Output**.
2. Wait for the build to complete.
3. Confirm the output shows a successful build and deployment:
   ```
   BUILD SUCCESS
   Finished: SUCCESS
   ```

If the build fails, review the console output for errors before retrying.

---

</details>

---

## Verification

After a successful deployment, verify the application is functioning correctly:

<details markdown="1">
  <summary><strong>Application Check</strong></summary>

1. Open the application URL for the deployed environment.
2. Confirm the application loads and key functionality works as expected.
3. Check for any console errors in the browser developer tools.

| Environment | URL |
|-------------|-----|
| Development | `<dev URL>` |
| Production | `<prod URL>` |

---

</details>

<details markdown="1">
  <summary><strong>Log Review</strong></summary>

If issues are observed after deployment, review the application logs:

```bash
# Example — adjust path to match your server configuration
tail -f /opt/tomcat/logs/catalina.out
```

> 💡 *Access to server logs requires an active SSH session. See [Environment Setup](../../onboarding/environment-setup/) for server access instructions.*

---

</details>

---

## Rollback

If a deployment introduces a critical issue:

1. Notify your project lead immediately.
2. In Jenkins, identify the last known-good build.
3. Re-deploy the previous build using the same pipeline, or revert the merge in GitLab and redeploy.

> ⚠️ *Do not attempt a rollback in a shared environment without first coordinating with the team.*

---

> ⬅️ Back to [Standards & Procedures](../)
