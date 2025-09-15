---
layout: default
title: Updating WSDL File
permalink: /en/web/onboarding/standards-and-procedures/updating-wsdl-file/
---

<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
{% include lang-toggle.html %}

# 🔄 Updating WSDL File

This document explains the process for updating WSDL (Web Services Description Language) files for our projects. Follow these steps carefully to ensure consistency and successful integration.  

<details markdown="1">
  <summary><strong>📑 Table of Contents (click to expand)</strong></summary>

- [Procedure](#procedure)

</details>

---

## Procedure

1. **Download the new WSDL file**  
   - Obtain the latest version of the WSDL file from **GHQ**.  

2. **Replace the old WSDL file**  
   - Navigate to:  
     ```
     \src\main\resources\wsdl\<EAI ID of the new WSDL>_IWOSHA_SOService.wsdl
     ```
   - Overwrite the file contents with the new WSDL.  
   - Save the file.  

3. **Update `pom.xml`**  
   - Open `pom.xml`.  
   - Scroll to the bottom and **uncomment the section under `<!-- mvn generate sources -->`**.  
   - Save the file.  

4. **Run Maven generate-sources**  
   - Right-click the project.  
   - Select:  
     ```
     Run As > 6 Maven generate-sources
     ```

5. **Handle generated Java files**  
   - Navigate to:  
     ```
     \src\main\java\com\hankooktire\ws\wsdl
     ```
   - Select all files **except the new ones**.  
   - Right-click and choose:  
     ```
     Replace With > HEAD Revision
     ```
   - For each **new file** in the same directory ending with `SHA` and `SHAResponse`:  
     - Open the file and scroll past the commented section.  
     - Add an `@XmlRootElement` annotation just above the `public class` line.  

       **SHA file example:**  
       ```java
       @XmlRootElement(namespace = "http://www.hankooktire.com/SD/IWOSHA", name = "MT_<EAI ID>_IWOSHA")
       public class ...
       ```

       **SHAResponse file example:**  
       ```java
       @XmlRootElement(namespace = "http://www.hankooktire.com/SD/IWOSHA", name = "MT_<EAI ID>_IWOSHA_response")
       public class ...
       ```

6. **Update database configuration**  
   - In the `HT_INTERFACE` table, update the `EAIYN` field for the appropriate EAI:  
     - Set to **`N`** for testing the **RFC**.  
     - Set to **`Y`** for testing the **EAI**.  

7. **Perform QA testing**  
   - Test the RFC and EAI on the QA server.  

8. **Promote changes to production**  
   - Update **GHQ** to deploy the changes to production.  
   - Verify both **RFC** and **EAI** in production.  

9. **Confirm with SAP**  
   - Consult with the SAP team to validate everything is functioning correctly.  

---
