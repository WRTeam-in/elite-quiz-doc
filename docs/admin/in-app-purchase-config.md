---
sidebar_position: 9
---

# In-App Purchase Configuration

Elite Quiz verifies coin and Remove Ads purchases directly with Apple and Google before crediting them to a user, so the Admin Panel needs valid store credentials configured. This guide covers the App Store (iOS) side — gathering the required credentials from App Store Connect and entering them in your Admin Panel's In-App Purchase Configuration settings.

:::note Prerequisites

- An active [Apple Developer Program](https://developer.apple.com/programs/enroll/) membership ($99/year)
- Admin or Account Holder access to [App Store Connect](https://appstoreconnect.apple.com)
  :::

## App Store (iOS) In-App Purchase

Configure the following four items so the Admin Panel can verify iOS purchases and receive real-time purchase notifications from Apple.

### 1. Issuer ID, Key ID, and Private Key (.p8)

**Where:** App Store Connect → Users and Access → Integrations → App Store Connect API
**Link:** [App Store Connect API](https://appstoreconnect.apple.com/access/integrations/api)

**Steps:**

1. Log in to App Store Connect with an **Admin** or **Account Holder** role.
2. Go to **Users and Access → Integrations → App Store Connect API**.
3. Click the **Keys** tab — make sure you're on **In-App Purchase keys**, not **Team Keys**.
4. Click **+** to generate a new key.
5. Give it a name (e.g., `IAP Server Key`) and select the **In-App Purchase** key type.
6. Click **Generate**.
7. Copy the **Key ID** shown in the table.
8. Download the `.p8` file — you can only download it once, so save it securely.
9. Copy the **Issuer ID** shown at the top of the page.
10. Open the `.p8` file in a text editor and paste the full contents — including the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines — into the **Private Key** field in the Admin Panel.

:::warning Save the .p8 file securely
Apple only lets you download the private key file once. If you lose it, you'll need to revoke the key and generate a new one.
:::

![In-App Purchase Configuration](/img/panel/ios_ads_preivew.png)

### 2. Bundle ID

**Where:** App Store Connect → Apps → [Your App] → General → App Information
**Links:** [App Store Connect Apps](https://appstoreconnect.apple.com/apps) · [Apple Developer Portal – Identifiers](https://developer.apple.com/account/resources/identifiers/list)

Enter your iOS app's bundle identifier, e.g., `com.demo.customer`.

### 3. Environment

Choose which Apple environment the Admin Panel should verify purchases against:

- **Sandbox (Testing):** Use this during development and testing.
- **Production:** Switch to this once your app is live on the App Store.

## Important Notes

- You need an active [Apple Developer Program](https://developer.apple.com/programs/enroll/) membership ($99/year) to access App Store Connect API keys.
- The API key must be of type **In-App Purchase** — App Store Connect team keys of other types will not work for purchase verification.
- For production, your webhook URL must be **HTTPS on a public domain** — `127.0.0.1` and other local addresses will not work.

![In-App Purchase Configuration](/img/panel/in_app_purchase.png)
