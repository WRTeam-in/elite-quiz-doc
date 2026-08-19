---
title: Firebase Setup
sidebar_position: 4
---

# Firebase Setup

Follow the complete Firebase setup guide to configure Firebase and Authentication for the Elite Quiz App.

<div style={{
  border: '2px solid var(--ifm-color-primary)',
  borderRadius: '12px',
  padding: '20px 24px',
  textAlign: 'center',
  background: 'rgba(240, 24, 118, 0.05)',
  margin: '24px 0'
}}>
  <div style={{fontSize: '1.8rem', marginBottom: '8px'}}>🔥</div>
  <h3 style={{color: 'var(--ifm-color-primary)', marginBottom: '0px', fontSize: '1.2rem'}}>Firebase Setup Guide</h3>
  <p style={{marginBottom: '14px', color: 'var(--ifm-font-color-secondary)', fontSize: '0.9rem'}}>
    Click the link below to view the complete Firebase & Authentication Setup Guide
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

## Authentication Providers

:::note Important
Make sure you have enabled the required Authentication Providers (e.g., **Email/Password**, **Phone**, **Google**, **Apple**) in your Firebase console under **Authentication > Sign-in method**.
:::

:::warning Billing Plan Requirement
Make sure your Firebase project plan is upgraded to **Blaze (Pay as you go)**. The Blaze plan is required for **Phone Authentication** to send SMS OTP verification messages without interruption.
:::

![Firebase Authentication Providers](/img/app/firebase_auth.png)

## Realtime Database Setup

:::info Required Feature
Firebase Realtime Database is required for **1v1 Battle** and **Group Battle** features to work properly in the app.
:::

### 1. Create Realtime Database

1. In your Firebase console, navigate to **Build > Realtime Database** (or under **Databases & Storage**).
2. Click on **Create Database**, select your database location, and click **Next** to initialize.

![Create Realtime Database](/img/app/create_realtime_database.png)

### 2. Update Database Rules

Once the Realtime Database is created:

1. Navigate to the **Rules** tab in the Realtime Database section.
2. Replace the existing rules with the following JSON configuration and click **Publish**:

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

![Firebase Realtime Database Rules](/img/app/firebase_rtdb_rules.png)


