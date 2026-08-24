---
sidebar_position: 5
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# App Customization

Customize the Elite Quiz App to match your brand identity and preferences.

## Branding Structure

We've organized all branding-related configurations and assets into separate folders, making it easy to modify them without missing anything. This structure also simplifies updating to newer app versions, as you only need to check for changes in the config files and update the folders.

There are two primary folders for branding customization:

1. **App Configuration** (`lib/core/config`): Contains settings for panel URL, default theme, messages, payment methods, and other app configurations.

2. **Assets Configuration** (`assets/config`): Contains all images and assets related to branding, including sounds and profile avatar images you might want to customize.

Beyond these folders, you're free to modify other assets and app code for additional flexibility. This separation makes rebranding the app straightforward for most users.

## Update App Launcher Icons

We use the `flutter_launcher_icons` package to generate launcher icons for Android and iOS. This approach makes the process quick, easy, and reproducible—especially helpful for setup and app updates.

### Setup Steps

> Tip: For optimal results, separate your logo foreground from the background.

1. Navigate to `assets/config/launcher_icons` and update these files:

   - `app_logo_icon.png`: 1024x1024 recommended
   - `background.png`: 432x432 recommended
   - `foreground.png`: 432x432 recommended

> **Image Format Note:** You can use JPG format, but you'll need to modify the `flutter_launcher_icons.yaml` file to specify the correct image format, otherwise it won't work.

2. Run the following command in your project directory to generate the icons:

```shell
dart run flutter_launcher_icons
```

3. Verify Generated Icons

   - **Android icons:** Generated in `android/app/src/main/res/`
   - **iOS icons:** Generated in `ios/Runner/Assets.xcassets/AppIcon.appiconset/`

4. Additional Options

   - For platform-specific icons, use `image_path_android` and `image_path_ios`
   - To remove alpha channel from iOS icons, add `remove_alpha_ios: true`

### Apply Changes

After generating the icons, rebuild your app to see the changes:

```shell
flutter clean
flutter pub get
flutter run
```

## Update App Logos in the App

You can customize the app logo that appears in the Splash screen, Sign in/ Sign up etc screens:

1. Navigate to `assets/images/svg/` directory in your project.

2. Update the following images.
   - `splash_logo.svg`: shown in the splash screen.

3. Then rebuild the app to see the changes.

## Customize App Colors

Customize your app's color scheme to match your brand identity. We recommend using your own brand colors instead of the default Elite Quiz colors.

Navigate to `lib/commons/utils/color_tokens.dart` and update the color constants with your brand colors:

```dart title='lib/commons/utils/color_tokens.dart'
  static final primary = ColorShades(const Color(0xFFEF5388)); // Primary branding color (#EF5388)
  static final neutral = ColorShades(const Color(0xFF808080)); // Neutral gray color (#808080)
  static final error = ColorShades(const Color(0xFFFB2C36));   // Error / alert color (#FB2C36)
  static final success = ColorShades(const Color(0xFF34C759)); // Success color (#34C759)
  static final orange = ColorShades(const Color(0xFFFA5A4A));  // Accent orange color (#FA5A4A)
  static final purple = ColorShades(const Color(0xFF8A56F2));  // Accent purple color (#8A56F2)
  static final blue = ColorShades(const Color(0xFF2093FC));    // Accent blue color (#2093FC)
  static final yellow = ColorShades(const Color(0xFFD5A400));  // Accent yellow color (#D5A400)
Navigate to `lib/core/config/colors.dart` and update the color constants with your brand colors:

```dart title='lib/core/config/colors.dart'
/// Light Theme Colors
const klBackgroundColor = Color(0xffffffff); // White color for containers, cards, lists
const klCanvasColor = Color(0xcc000000); // Black color for overlays
const klPageBackgroundColor = Color(0xfff3f7fa); // Main scaffold background color
const klPrimaryColor = Color(0xffef5388); // Primary branding color
const klPrimaryTextColor = Color(0xff45536d); // Main text color

/// Additional theme colors available in the file
```

Save the file and restart your app to see the changes

## Customize App Fonts

Customize typography by adding custom fonts to your Elite Quiz App. Follow the steps below to add and configure a new font family:

### Setup Steps

1. **Add Font Files to Assets**:
   Copy your font files (e.g., `.ttf` or `.otf`) into the `assets/fonts/` directory in your project:
   * `assets/fonts/Poppins-Regular.ttf`
   * `assets/fonts/Poppins-Bold.ttf`

2. **Declare Font Family in `pubspec.yaml`**:
   Open `pubspec.yaml` and map the font family and weights under the `flutter:` section:

   ```yaml title='pubspec.yaml'
   flutter:
     fonts:
       - family: Poppins
         fonts:
           - asset: assets/fonts/Poppins-Regular.ttf
             weight: 400
           - asset: assets/fonts/Poppins-Bold.ttf
             weight: 700
   ```

   Run `flutter pub get` after saving `pubspec.yaml`.

3. **Define Font Constant**:
   Open `lib/core/theme/app_text_theme.dart` and add a constant for your font family name:

   ```dart title='lib/core/theme/app_text_theme.dart'
   static const String poppins = 'Poppins';
   ```

4. **Apply Font Constant**:
   Reference the font constant (e.g., `TextStyle(fontFamily: poppins, ...)`) in your shared text styles file.

:::tip Best Practice
Never hardcode font family string literals (such as `'Poppins'` or `'Nunito'`) directly inside screen or widget files. Always reference the constant declared in `app_text_theme.dart` to maintain consistency across the app.
:::

## Managing System Languages (Translations)

System languages control the interface translations for the mobile app, admin panel, and web application.

### Default App Language File

The mobile application stores its default translation strings in:
* **`assets/languages/template.json`**

This file contains all the default key-value pairs for the application's UI strings.

:::warning Do Not Modify Keys
Do **not** modify or change the JSON key names. Only translate or update the string **values**. Changing the key names will prevent the app from resolving the correct translations.
:::

### Managing Translations via Admin Panel

You can update, add, and edit app language translations dynamically directly from the admin panel without needing to rebuild or redeploy the app:

1. Go to your admin panel.
2. Navigate to **General Management** > **Languages**.

![System Languages](/img/app/languages.png)

3. Click on **Create Language** and upload or fill in the JSON translation data following the key-value format from `assets/languages/template.json`.

![Create Language](/img/app/create_language.png)


## Managing Quiz Languages (Content Type)

Quiz languages (noted as **Content Type** in the admin panel) control the content structure of your app, including categories, subcategories, and questions. This system allows you to have completely different content structures for different languages across all quizzes.

### Key Features

- **Content Separation**: Each language can have its own category structure and questions
- **Flexible Organization**: Different content for Hindi vs English, or any other language combination
- **Content Mode Control**: Enable or disable Content Type mode depending on whether you want single or multiple content languages

### Configuration

**To enable or disable Content Type mode**:

1. Go to **General Management** -> **Settings** -> **System Configurations** -> **Quiz Mode**.
2. Toggle the **Content Type Mode** (Enable/Disable) option.

![Enable Content Type Mode](/img/app/enable_content_type.png)

**To manage Content Types (Quiz Languages)**:

1. Navigate to **General Management** -> **Content Types** in your admin panel.
2. Add or configure your desired content languages/types.

![Content Types](/img/app/content_types.png)

### Advanced Usage

:::tip Flexible Categorization
While we refer to this as "language-wise" categorization, you can actually use it for various organizational structures:

- **Classes**: Different content for Class 7 vs Class 10 students
- **Subjects**: Separate content by academic subjects
- **Regions**: Location-specific content
- **Professions**: Career-specific quiz content
- **Interests**: Interest-based content organization

The possibilities are endless for organizing your quiz content!
:::

### Admin Panel Settings

Explore the admin panel for additional customization options:

- **System Utilities**: Configure quiz behavior and rules
- **System Configurations**: Advanced system settings

Take time to review all available options to fully customize your Elite Quiz experience.

## Manage Profile Avatars

Elite Quiz allows users to select preset avatar images for their profiles. You can easily add or update preset profile avatars by following the steps below.

### Setup Steps

1. **Add the SVG Avatar File**:
   Drop your SVG avatar file into the `assets/avatars/` folder in your project (e.g., `avatar_15.svg`).

2. **Register the Avatar Path**:
   Open `lib/core/constants/assets_constants.dart` and add the string path to the `Assets.presetAvatars` list:

   ```dart title='lib/core/constants/assets_constants.dart'
   static const List<String> presetAvatars = [
     '$_avatarBase/avatar_1.svg',
     '$_avatarBase/avatar_2.svg',
     // ...
     '$_avatarBase/avatar_15.svg', // Append new avatars at the end
   ];
   ```

The avatar selector automatically calculates grid items and rows based on `Assets.presetAvatars.length`.

:::caution Best Practices & Considerations
* **Always Append to the End**: User profiles store preset avatars by their index position in the list. Always append new avatars at the end of `presetAvatars`. Removing or reordering items will shift list indices and cause existing users to display incorrect avatars.
* **Keep Paths in Sync**: Ensure the filename in `assets/avatars/` matches the constant string in `assets_constants.dart` exactly to prevent runtime asset loading errors.
:::

## Manage Battle Chat Emojis

Elite Quiz features real-time battle chat where players can send quick emojis during matches. You can add new battle chat emojis or customize existing ones following the steps below.

### Setup Steps

1. **Add the SVG Emoji File**:
   Drop your new SVG emoji file into the `assets/images/svg/chat_emojis/` folder in your project (e.g., `9.svg`).

2. **Register the Emoji Path**:
   Open `lib/core/constants/assets_constants.dart` and add the string path to the `Assets.chatEmojis` list:

   ```dart title='lib/core/constants/assets_constants.dart'
   static const List<String> chatEmojis = [
     '$_chatEmojiBase/1.svg',
     '$_chatEmojiBase/2.svg',
     '$_chatEmojiBase/3.svg',
     '$_chatEmojiBase/4.svg',
     '$_chatEmojiBase/5.svg',
     '$_chatEmojiBase/6.svg',
     '$_chatEmojiBase/7.svg',
     '$_chatEmojiBase/8.svg',
     '$_chatEmojiBase/9.svg', // Append new emojis at the end
   ];
   ```

The battle chat emoji picker automatically renders items based on `Assets.chatEmojis.length`.

:::caution Best Practices & Considerations
* **Always Append to the End**: Battle messages reference chat emojis by their list index position. Always append new chat emojis at the end of the `chatEmojis` list. Deleting or reordering existing entries will shift indices and cause battle messages to display the wrong emoji.
* **Keep Paths in Sync**: Ensure the filename in `assets/images/svg/chat_emojis/` matches the constant string in `assets_constants.dart` exactly to prevent runtime asset loading errors.
:::
