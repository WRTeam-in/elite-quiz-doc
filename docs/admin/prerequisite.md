---
sidebar_position: 2
---

# Prerequisite

Before installing the Admin Panel, make sure your server meets the following requirements.

## System Requirements

- **PHP Version:** PHP version **8.3 or higher** (PHP **8.3+** required for version `3.0.0` and above).
- **MySQL Version:** MySQL **8.0 or higher**.
- **Required PHP Extensions:**

  - `Ctype`
  - `DOM`
  - `Filter`
  - `Hash`
  - `Mbstring`
  - `Fileinfo`
  - `OpenSSL`
  - `Tokenizer`
  - `JSON`
  - `cURL`
  - `PCRE`
  - `PDO`
  - `pdo_sqlite`
  - `pdo_mysql` / `nd_pdo_mysql`
  - `Session`
  - `XML`
  - `Intl`
  - `zip`

<!-- function list those needed for this project, symlink,  proc_open, proc_close, proc_get_status, proc_terminate, exec -->

## Required PHP Functions

The following PHP functions must be enabled on the server:

- `symlink`
- `proc_open`
- `proc_close`
- `proc_get_status`
- `proc_terminate`
- `exec`
- `pcntl_signal`
