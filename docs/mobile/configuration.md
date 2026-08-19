---
title: App Configuration
sidebar_position: 3
---

This guide outlines the *essential steps* for configuring your Elite Quiz App after its initial setup, allowing you to tailor it to your *specific requirements*.

Upon successfully setting up Flutter and running your project, you can **customize** the Elite Quiz App to meet your specific needs.

## Change the Package Name

To update your application's package name, refer to our official guide provided here: [How to Change Package Name](https://www.marketplace.wrteam.in/docs/flutter-common-doc/GeneralSettings/packagename).

## Change the Application Name

The application name is displayed *beneath the app icon* on user devices.

  * **For Android:**

    1.  Navigate to `android/app/src/main/AndroidManifest.xml`.
    2.  Locate the `android:label` attribute within the `<application>` tag.
    3.  Set its value to your *preferred application name*, as shown below:

    <!-- end list -->

    ```xml
    <application
        android:label="Your App Name"
        ...>
    ```

  * **For iOS:**

    1.  Open `ios/Runner/Info.plist`.
    2.  Find the `CFBundleName` key and **update its corresponding string value**:

    <!-- end list -->

    ```xml
    <key>CFBundleName</key>
    <string>Your App Name</string>
    ```

## Update the App Version

Maintaining an up-to-date app version is *crucial* for releases and subsequent updates.

1.  Open the `pubspec.yaml` file located in your project's root directory.
2.  Find the `version` property.
3.  Update it using the following format:
    ```yaml
    version: 1.0.0+1 # version_name+version_code
    ```
      * `1.0.0` represents the **version name visible to users**.
      * `1` is the internal version code, which should be **incremented with each new release**.

## Connect to the Admin Panel

To establish a connection between your app and your Admin Panel:

1.  Open `lib/core/api/api_endpoints_constants.dart` within your project.
2.  Locate the `baseUrl` constant and **update it with the URL of your Admin Panel**:
    ```dart
    /// Add your panel url here
    // NOTE: Do not add '/' at the end of the URL
    // NOTE: Check if your admin panel uses http or https
    static const String baseUrl = 'https://your-admin-panel-url.com';
    ```

## Other Configurations

The `lib/core/constants/constants.dart` file also contains **additional configurable settings**. These include:

  * Phone Login Settings: Configure the default country code phone numbers during login.


Examples of these configurations are provided below:

```dart
// Default country dial code preselected in the phone login.
const String kDefaultCountryCode = '+91';

```

## What’s Next?

Following these fundamental configurations, proceed with the subsequent steps:

1.  Integrate Firebase services.
2.  Customize the application's appearance.
3.  Set up advertisements and in-app purchases.
4.  Conduct *comprehensive testing* of your application.
5.  Generate a release build.

Detailed instructions for each of these steps are available in the *subsequent sections* of this documentation.