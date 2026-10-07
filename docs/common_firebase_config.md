---
pagination_prev: null
pagination_next: null
---

# Common Firebase Configuration

This guide covers the complete Firebase setup for Elite Quiz, for both the **Mobile App** and the **Web App**. No prior experience with Firebase is required. Just follow the steps in order.

:::tip One Firebase project for both platforms
If you use both the Mobile App and the Web App, use **one Firebase project** for both. Do Step 1, Step 3, and Step 4 once, then follow the part of Step 2 for each platform you use.
:::

---

## Why Do I Need Firebase?

Elite Quiz uses Firebase for two main things:

- **Authentication:** Let users sign in with Email, Google, Apple, or Phone, or play as a guest.
- **Realtime Database:** Store live data for **1v1 Battle** and **Group Battle**, such as battle rooms and player progress.

**Setup order:**

```
Step 1: Create Firebase Project
        │
        ▼
Step 2: Connect Your Apps ──► 2A. Mobile App (Flutter)
        │                └──► 2B. Web App (Next.js)
        ▼
Step 3: Enable Authentication
        │
        ▼
Step 4: Set Up Realtime Database
```

---

## Step 1: Create Your Firebase Project

:::note Already have a project?
If you already created a Firebase project for the other platform (e.g., you bought the App first and are now setting up the Web), skip this step and use the same project.
:::

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project**.
3. Enter a project name (e.g., `EliteQuiz`) and accept the terms.
4. Choose whether to enable Google Analytics (recommended for most users, and required if you want analytics on the Web App).
5. Click **Create project** and wait for setup to finish.

You’ll see your new project dashboard when it’s ready.

![Screenshot: Creating a Firebase Project](/img/app/createFirebase1.webp)
![Screenshot: Firebase Project Setup Steps](/img/app/createFirebase2.webp)

---

## Step 2: Connect Your Apps to Firebase

Connect each platform you use to the Firebase project you created in Step 1.

### 2A. Mobile App (Flutter)

Add your Android and iOS apps to the Firebase project and add the Firebase configuration files to the Flutter code. Follow our Flutter Firebase setup guide:

<div style={{
  border: '2px solid var(--ifm-color-primary)',
  borderRadius: '12px',
  padding: '20px 24px',
  textAlign: 'center',
  background: 'rgba(240, 24, 118, 0.05)',
  margin: '24px 0'
}}>
  <div style={{fontSize: '1.8rem', marginBottom: '8px'}}>🔥</div>
  <div style={{color: 'var(--ifm-color-primary)', marginBottom: '0px', fontSize: '1.2rem', fontWeight: 'bold'}}>Flutter Firebase Setup Guide</div>
  <p style={{marginBottom: '14px', color: 'var(--ifm-font-color-secondary)', fontSize: '0.9rem'}}>
    Click the link below to connect your Android and iOS apps to Firebase
  </p>
  <a
    href="https://www.marketplace.wrteam.in/docs/flutter-common-doc/GeneralSettings/firebase"
    target="_blank"
    rel="noopener noreferrer"
    style={{color: 'var(--ifm-color-primary)', fontWeight: '600', fontSize: '0.95rem'}}
  >
    Click here →
  </a>
</div>

When you're done, check that:

- The Android config file (`google-services.json`) and the iOS config file (`GoogleService-Info.plist`) from **your** Firebase project are in the app code.
- You've added your app's **SHA-1** fingerprint to the Android app in Firebase. Google Sign-In will not work on Android without it.

### 2B. Web App (Next.js)

#### Video Tutorial

<iframe
  width="100%"
  height="500"
  style={{ borderRadius: '10px' }}
  src="https://www.youtube.com/embed/adrnST-IrgU"
  title="Firebase Configuration Video Tutorial"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen>
</iframe>

#### Steps

1. Add a web application to your Firebase project:

   ![Add Web App](/img/web/addWeb.png)

2. Enter the App Name and click **Register App**:

   ![Register App](/img/web/addWeb2.png)

3. Open **Project settings**, select your web app, and choose **Config** to view its credentials:

   ![Firebase Integration](/img/web/firebase-integration.png)

4. Copy the highlighted code and paste each value into the matching field in **Admin Panel > Web Settings > Settings**:

   ![Firebase Config Code](/img/web/addWeb3.png)

5. These credentials must match the ones you set in the admin panel. Otherwise, the Web App will not work properly:

   ![Admin Panel Config](/img/web/addWeb4.png)
   ![Admin Panel Config](/img/web/firebase_setting.png)

6. Add your website domain to **Authentication > Settings > Authorized domains**. Enter only the domain name, without `http://`, `https://`, or `www.` (e.g., `elitequiz.wrteam.in`). Login will not work on your live site without this step.

   ![Domain Configuration](/img/web/firebase-configuration.png)

7. **(Optional) Google Analytics:** Copy the `measurementId` and paste it in the `.env` file in the website code:

   ![admin panel measurementId](/img/web/firebaseMeasuremetid.png)
   ![measurementId paste in .env file in code](/img/web/envFirebase.png)

8. Log in to [Google Analytics](https://marketingplatform.google.com/about/analytics/) using the same account you used to create the Firebase project.

   ![Google Analytics for the Web App](/img/web/analycs_web.png)

---

## Step 3: Enable Authentication

Elite Quiz supports several ways for users to sign in. Enable them all now. You can hide any you don’t want later from the admin panel.

:::warning Blaze plan required for Phone login
To use Phone/OTP Login, your Firebase project must be on the **Blaze** (pay-as-you-go) plan. Without a billing account, Firebase limits new projects to **10 SMS per day**, so most users won't receive their OTP.
:::

1. In your Firebase project, click [**Authentication**](https://console.firebase.google.com/project/_/authentication/providers) in the left menu.
2. Go to the **Sign-in method** tab.
3. Click **Add new provider** and enable each of these providers:
   - **Email/Password**
   - **Phone**
   - **Google**
   - **Apple**
   - **Anonymous**: required for **Guest mode**, which lets users play without creating an account

   When you're done, all five providers should show **Enabled**:

   ![Screenshot: All five sign-in providers enabled in Firebase](/img/common/firebase_auth_providers.png)

   :::note Guest mode needs Anonymous sign-in
   Since v3.0.2, Elite Quiz supports **Guest mode** on the Mobile App and the Web App. If **Anonymous** is not enabled, guest login will fail.
   :::

4. **Update Public Settings:** Go to [Project Settings](https://console.firebase.google.com/u/0/project/_/settings/general) and configure your Public Settings. The Public-facing name appears in verification emails sent to users, so they'll see your Quiz App name instead of your Firebase project name.

   ![Screenshot: Update Public Settings](/img/common/firebase_update_public_settings.webp)

:::tip Choose which login options users see
In the Elite Quiz admin panel, go to **General Management > Settings > System Configurations**. In the **Auth Configuration** section, turn off any login methods you don’t want users to see. Changes apply to both the Mobile App and the Web App.

![Screenshot: Auth Configuration in Admin Panel System Configurations](/img/common/panel_auth_configuration.png)
:::

---

## Step 4: Set Up Realtime Database

Elite Quiz uses the Firebase Realtime Database for **1v1 Battle** and **Group Battle**. Without it, battles will not work on the Mobile App or the Web App.

:::info Upgrading from v2.x?
Since v3.0.0, battles use the **Realtime Database** instead of Firestore. You don't need to create a Firestore database or Firestore indexes for v3.
:::

1. In Firebase, click **Build** in the left menu, then select [**Realtime Database**](https://console.firebase.google.com/project/_/database) (it may also be listed under **Databases & Storage**).
2. Click **Create Database**, choose the location closest to your users, and click **Next** to finish.

   ![Screenshot: Create Realtime Database](/img/app/create_realtime_database.png)

3. **Set Realtime Database Rules:**

   - Go to the **Rules** tab.
   - Delete any existing rules, paste in the following, and click **Publish**:

   ```json
   {
     "rules": {
       ".read": "auth != null",
       ".write": "auth != null",
       "battleRooms": {
         ".indexOn": ["roomCode", "categoryId", "type"]
       }
     }
   }
   ```

   ![Screenshot: Realtime Database Rules](/img/app/firebase_rtdb_rules.png)

---

## Checklist

Before moving on, make sure that:

- [ ] Your Firebase project is created.
- [ ] **Mobile:** Android and iOS apps are added, and their config files and SHA-1 fingerprint are set.
- [ ] **Web:** The web app is registered, its config is in **Admin Panel > Web Settings > Settings**, and your domain is authorized.
- [ ] Email/Password, Phone, Google, Apple, and Anonymous sign-in are enabled (Blaze plan for Phone).
- [ ] The Realtime Database is created and its rules are published.

You’re done with the Firebase setup! 🎉
