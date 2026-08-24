---
sidebar_position: 9
---

# In-App Purchase Configuration

Elite Quiz verifies coin and Remove Ads purchases directly with Apple and Google before crediting them to a user, so the Admin Panel needs valid store credentials configured. This guide covers setting up store credentials in your Admin Panel for both **Android (Google Play)** and **App Store (iOS)**.

:::note Prerequisites

- An active [Google Play Developer Account](https://play.google.com/console) (for Android)
- An active [Apple Developer Program](https://developer.apple.com/programs/enroll/) membership ($99/year) and Admin access to [App Store Connect](https://appstoreconnect.apple.com) (for iOS)
:::

## Android (Google Play) Configuration

Configure the following settings so the Admin Panel can verify Android purchases:

### 1. App Package Name

1. Go to **Admin Panel > Settings > In-App Settings**.
2. Enter your Android app's package name in the **App Package Name** field (e.g., `com.yourcompany.elitequiz`).
3. Ensure this package name matches your Flutter app's `applicationId` in `android/app/build.gradle`.

![In-App Purchase Settings](/img/panel/in_app_purchase.png)

### 2. Connect Firebase / Service Account to Play Console

This allows the Admin Panel to verify purchases with Google Play.

1. Go to **Admin Panel > Settings > In-App Settings**.
2. Copy the **Firebase Client Email** (shown in the settings).

3. Open [Google Play Console](https://play.google.com/console).
4. Go to **Users and permissions** and click **Invite new users**.
5. Paste the Firebase Client Email you copied.
6. In the **Permissions** section, click **Add App** under the **App permissions** tab.
7. Select your app and click **Apply**.
8. Select **Admin (all permissions)** and click **Apply**.
9. Click **Invite user**.

**Watch the video guide:**

<iframe
  width="100%"
  height="500"
  style={{ borderRadius: '10px', border: 'none' }}
  src="https://www.youtube.com/embed/vfIiAUhwXrY"
  title="Add Firebase Client Email to Play Console"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen>
</iframe>

#### ⏱️ Important: Wait Time Required

Google Play needs time to process these permission changes. This is normal.
- **Minimum wait**: 2-4 hours before testing Android purchases.

---

## App Store (iOS) Configuration

Configure the following items so the Admin Panel can verify iOS purchases and receive real-time purchase notifications from Apple.

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

![iOS In-App Settings](/img/panel/ios_ads_preivew.png)

### 2. Bundle ID

**Where:** App Store Connect → Apps → [Your App] → General → App Information  
**Links:** [App Store Connect Apps](https://appstoreconnect.apple.com/apps) · [Apple Developer Portal – Identifiers](https://developer.apple.com/account/resources/identifiers/list)

Enter your iOS app's bundle identifier, e.g., `com.yourcompany.elitequiz`.

### 3. Environment Selection

Choose which Apple environment the Admin Panel should verify purchases against:

- **Sandbox (Testing):** Use this during development and testing.
- **Production:** Switch to this once your app is live on the App Store.

![In-App Purchase Configuration](/img/panel/in_app_purchase.png)

## Important Security Notes

- The API key must be of type **In-App Purchase** — App Store Connect team keys of other types will not work for purchase verification.
- For production, your server URL must be **HTTPS on a public domain** — `127.0.0.1` and local IP addresses cannot receive store callbacks.
