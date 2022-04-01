# Prerender - HTML SEO Scoring

**Work In Progress - Don't use it in production just yet!**

---

Scoring HTML content for SEO best practices.

### Getting Started

Install

```sh
yarn add prerender-seo-scorer # or npm i prerender-seo-scorer
```

Use:

```javascript
import { scorer } from 'prerender-seo-scorer';

const result = scorer(`<html>MyPage...</html>`);

console.log(result.score);
console.log(result.recommendations);
```

#### Code Generator

This repository uses the Hygen code generator templates, you can easily create new checkers by running the following command

```sh
yarn gen:checker --name="my checker"
```
