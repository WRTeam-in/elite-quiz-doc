---
sidebar_position: 4
---

# Cron Job Setup

This guide explains how to set up cron jobs on your server to automate scheduled tasks for your Elite Quiz Admin Panel.

## Steps to Add Cron Job

### 1. Access Your Server

Access your server via SSH or through your Server Panel's Cron Jobs section.

### 2. Add Cron Job Command

Choose one of the following methods based on your server configuration:

> Schedule frequency: set the cron to run every minute using `* * * * *`.

#### Method 1: Using CURL (If CURL is installed)

```bash
curl -s "https://your-domain.com/run-scheduler" > /dev/null 2>&1
```

#### Method 2: Using WGET (If CURL is not installed)

```bash
wget -q "https://your-domain.com/run-scheduler" > /dev/null 2>&1
```

#### Method 3: Using PHP Command (If URL scheduler is not working)

```bash
cd /home/username/domains/yourdomain.com/public_html/admin-panel && php artisan schedule:run
```

## Important Notes

:::warning Important Configuration Notes

- **Check URL**: Make sure "https://your-domain.com" is correct and replace it with your actual domain
- **Project Path**: Replace "/home/username/domains/yourdomain.com/public_html/admin-panel" with your actual project path
- **Server Configuration**: You may need to adjust the cron job command based on your server configuration
  :::

## Understanding the Cron Job

### Cron Schedule Format

- `* * * * *` is a wildcard pattern representing:
  - **Minute** (0-59)
  - **Hour** (0-23)
  - **Day of Month** (1-31)
  - **Month** (1-12)
  - **Day of Week** (0-7, where 0 and 7 = Sunday)

### Command Explanations

- **curl/wget**: Command-line tools for transferring data with URLs
- **`> /dev/null 2>&1`**: Redirects output to /dev/null (discards it) and shows errors in the terminal

### What This Cron Job Handles

This cron job runs every minute to trigger the Laravel scheduler, which handles the following scheduled tasks:

- [Legacy data migration](./legacy-data-migration.md) and assets merge operations
- Contest prize distribution
- [Bulk question import](./bulk-imports.md) queue processing
- Purging concluded battles
- Purging failed import records
- Managing large leaderboard data storage and rank calculations

### Method Selection Guide

1. **URL-based methods** (curl/wget): Use these if your server supports external HTTP requests
2. **PHP command method**: Use this as a fallback if URL-based scheduler fails, as it directly runs the Laravel scheduler

## Troubleshooting

If you encounter issues:

1. Verify your domain URL is correct and accessible
2. Check if curl or wget is installed on your server
3. Ensure the project path is correct for the PHP command method
4. Verify that your server allows cron jobs
5. Check server logs for any error messages

## Verification

After setting up the cron job, monitor your application to ensure:

- The bulk import queue is being processed
- Scheduled tasks are running as expected
- No error logs are generated

The cron job will automatically handle background processes and keep your application running smoothly.
