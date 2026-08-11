# Steven Tran Real Estate Blog

Long-form real estate content site for Steven Tran Real Estate.

The blog covers Portland Metro and Southwest Washington real estate, relocation, home buying, neighborhoods, new construction, market trends, homebuyer programs, and real estate investing.

The blog is designed to complement the primary website at steventranrealestate.com while remaining a separate Astro project and deployment.

---

# Overview

This repository powers the article and educational content side of Steven Tran Real Estate.

The blog includes:

* Real estate articles
* Portland relocation content
* Local market reports
* Homebuyer education
* Neighborhood and community information
* New construction content
* Down payment assistance resources
* Real estate investing content
* Topic/tag archives
* Search
* Featured articles
* About page
* Links back to the primary real estate website

The site began with AstroPaper and has been customized substantially to better match the design and branding of steventranrealestate.com.

Because of that history, some older AstroPaper components or styles may still exist in the repository even when the visible site uses newer custom components.

---

# Technology

The blog uses:

* Astro
* TypeScript / JavaScript
* Astro Content Collections
* Markdown
* React where required by interactive components
* CSS
* Fuse.js for search
* Jampack
* Netlify
* Git / GitHub

---

# Project Structure

The exact structure may evolve, but the important directories are:

```text
steventranrealestate-blog/
│
├── public/
│   └── assets/
│       ├── oregon-hero.png
│       └── ...
│
├── src/
│   ├── components/
│   │   ├── Breadcrumbs.astro
│   │   ├── Card.astro
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── Pagination.astro
│   │   ├── Search.tsx
│   │   └── ...
│   │
│   ├── content/
│   │   └── blog/
│   │       └── *.md
│   │
│   ├── layouts/
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── posts/
│   │   ├── tags/
│   │   └── search.astro
│   │
│   └── styles/
│       └── base.css
│
├── astro.config.ts
├── package.json
├── package-lock.json
└── README.md
```

---

# Local Development

## Requirements

Install Node.js.

A current Node LTS release is recommended.

Check your versions:

```bash
node --version
npm --version
```

---

# Clone the Repository

```bash
git clone <BLOG_REPOSITORY_URL>
cd steventranrealestate-blog
```

Replace `<BLOG_REPOSITORY_URL>` with the actual GitHub repository URL if necessary.

---

# Install Dependencies

```bash
npm install
```

---

# Start the Development Server

```bash
npm run dev
```

Astro normally starts the local site at:

```text
http://localhost:4321
```

Astro will display the actual local URL in the terminal.

---

# Production Build

Before committing or deploying significant changes, run:

```bash
npm run build
```

The current production build runs Astro and then Jampack.

Conceptually:

```text
Markdown/content
       ↓
Astro build
       ↓
dist/
       ↓
Jampack optimization
       ↓
Netlify
```

The generated production site is stored in:

```text
dist/
```

---

# Previewing the Production Build

If supported by the current package scripts, run:

```bash
npm run preview
```

This is useful for checking the production-generated version rather than only relying on Astro's development server.

---

# Blog Content

Blog articles are stored in:

```text
src/content/blog/
```

Each article is a Markdown file with frontmatter used by Astro's content collection.

A typical article may look conceptually like:

```markdown
---
title: "Example Article"
description: "Short description of the article."
pubDatetime: 2026-08-08T08:00:00Z
featured: false
draft: false
tags:
  - portland
  - home-buying
---

Article content goes here.
```

Use the existing articles as the authoritative reference for the exact frontmatter schema expected by the project.

---

# Slugs

Every Astro content entry must have a unique slug.

This is especially important when automated processes create multiple versions of a report.

For example, these two files can still conflict:

```text
2026-08-07-portland-metro-buyer-opportunity-report-july-2026.md
2026-08-08-portland-metro-buyer-opportunity-report-july-2026.md
```

if both resolve to:

```text
portland-metro-buyer-opportunity-report-july-2026
```

Astro will stop the build with:

```text
DuplicateContentEntrySlugError
```

If that happens:

1. Determine whether one article is an outdated duplicate.
2. Delete the duplicate if appropriate.
3. Otherwise assign the articles different slugs.

Do not publish duplicate versions of the same article simply to make the build succeed.

---

# Draft Articles

When the content schema supports a `draft` property, use it to prevent unfinished articles from being treated as normal published content.

Always verify the project's current filtering logic before assuming draft posts are excluded everywhere.

---

# Featured Articles

The homepage retrieves published blog entries and identifies articles whose frontmatter contains:

```yaml
featured: true
```

Featured articles are displayed in the:

```text
Featured
Start Here
```

section of the homepage.

Keep the number of featured articles intentional. The homepage currently works best with approximately three primary featured resources.

---

# Recent Articles

The homepage also displays the newest articles based on the site's sorting logic.

The relevant logic is located in:

```text
src/pages/index.astro
```

and supporting utilities such as:

```text
src/utils/
```

The homepage should not require manually adding every new article.

New published posts should automatically flow into the recent article section when the build runs.

---

# Topics and Tags

Articles can be organized using tags.

Topic pages provide visitors with a way to browse content by subject, including areas such as:

* relocation
* Portland
* home buying
* new construction
* real estate investing
* Southwest Washington

When adding tags, use consistent naming.

Avoid creating nearly identical tags such as:

```text
homebuyer
home-buyers
home-buying
buying-a-home
```

unless there is a deliberate content strategy requiring separate archives.

---

# Search

The blog search experience uses Fuse.js.

The primary interactive search component is:

```text
src/components/Search.tsx
```

Search runs against the site's available article data rather than requiring an external hosted search provider.

When modifying search styling, be careful with global SVG rules. The search icon has previously been affected by generic site-wide SVG styling.

Prefer component-specific selectors such as:

```css
.site-search .site-search-icon svg
```

instead of changing every SVG globally.

---

# Homepage Hero

The homepage hero uses:

```text
public/assets/oregon-hero.png
```

Public Astro assets can be referenced from the root:

```html
<img src="/assets/oregon-hero.png" alt="Portland Oregon">
```

The image should therefore be available locally at:

```text
http://localhost:4321/assets/oregon-hero.png
```

If the image does not appear, test that URL directly.

A 404 normally means:

* the file is not in `public/assets/`
* the filename is incorrect
* capitalization does not match

Remember that production environments can be case-sensitive even when a local filesystem appears forgiving.

---

# Homepage Structure

The homepage currently contains several major sections:

```text
Hero
↓
Featured / Start Here
↓
Recent Articles
↓
Explore By Topic
↓
Moving to Portland CTA
↓
Footer
```

The hero should remain visually independent from the article-card grids.

Avoid changing generic card or grid styles merely to adjust the hero.

---

# Article Cards

The homepage uses reusable article cards.

Desktop layouts are intended to display multiple cards per row.

The typical responsive pattern is:

```text
Desktop: 3 columns
Tablet:  2 columns
Mobile:  1 column
```

The Featured and Recent sections should not become full-width single-card rows on desktop unless intentionally redesigned.

Be careful with global rules such as:

```css
display: block;
width: 100%;
```

when they target elements used inside card grids.

---

# Topic Cards

The:

```text
Find What You're Looking For
```

section uses dedicated topic cards.

These are separate from article cards and should retain:

* card backgrounds
* borders
* spacing
* descriptions
* topic links
* hover states

The layout should generally use:

```text
Desktop: 3 columns
Tablet:  2 columns
Mobile:  1 column
```

---

# Moving to Portland CTA

The bottom homepage CTA promotes the Portland relocation guide.

It is intentionally presented as a larger visual block rather than ordinary article content.

Desktop:

```text
Copy                           Actions
Moving to Portland?            Get the Free Guide
Description                    Schedule a Call
```

Tablet and mobile layouts stack as space becomes limited.

---

# Header

The blog header is designed to visually connect the blog with the primary Steven Tran Real Estate website.

The brand area uses the Steven Tran Real Estate logo with:

```text
REAL ESTATE BLOG
```

beneath it.

Primary navigation may include links such as:

```text
Real Estate
Communities
Articles
Topics
About
Search
Schedule a Call
```

The `Real Estate` navigation item links back to:

```text
steventranrealestate.com
```

This wording is preferred over `Main Site` because it describes the destination from the visitor's perspective.

---

# About Page

The About page contains the more personal introduction to Steven Tran.

The homepage intentionally focuses on Portland real estate content rather than using a large personal portrait.

The About page can contain:

* professional background
* Portland connection
* real estate experience
* investment experience
* analytical approach to home buying
* YouTube content
* social links
* brokerage information
* contact options

This keeps the homepage focused on information while still making personal background easy to find.

---

# YouTube

The About page may link to Steven Tran's real estate YouTube channel.

The channel includes:

* property tours
* Portland-area real estate information
* homebuyer education
* neighborhood/community information
* relocation resources

YouTube content supports the same goal as the blog: helping buyers make more informed and analytical real estate decisions.

---

# Breadcrumbs

Breadcrumbs are handled by:

```text
src/components/Breadcrumbs.astro
```

The customized component uses plain scoped CSS instead of depending on old AstroPaper/Tailwind utility behavior.

Expected output is similar to:

```text
Home / Search
```

rather than browser-default list formatting.

---

# Pagination

Pagination is handled by:

```text
src/components/Pagination.astro
```

The customized version keeps navigation centered rather than placing Previous and Next at the extreme edges of the page.

Conceptually:

```text
← Previous     Page 2 of 5     Next →
```

Pagination SVG sizing is intentionally scoped because global SVG styles previously caused icon alignment problems.

---

# CSS Architecture

The primary global stylesheet is:

```text
src/styles/base.css
```

Because the project originated from AstroPaper and has since been redesigned, `base.css` contains both foundational styles and compatibility/customization rules.

When making future changes:

1. Check whether a component already has scoped styles.
2. Avoid adding another global override unless necessary.
3. Prefer component-specific class names.
4. Avoid generic SVG/image rules.
5. Test desktop and mobile.
6. Remove obsolete overrides when replacing a component completely.

Repeatedly appending `!important` fixes can eventually make the stylesheet difficult to maintain.

When a component has been fully redesigned, prefer consolidating its styling rather than layering additional overrides indefinitely.

---

# SVG and Icon Styling

Avoid broad rules such as:

```css
svg {
  width: 100%;
}
```

or:

```css
img,
svg {
  max-width: 100%;
}
```

without considering icons.

The blog contains SVGs used for:

* search
* pagination
* social links
* footer elements
* sidebar links
* navigation

Prefer scoped selectors.

Example:

```css
.site-search-icon svg {
  width: 20px;
  height: 20px;
}
```

---

# Public Assets

Static files that should be served directly belong in:

```text
public/
```

For example:

```text
public/assets/oregon-hero.png
```

becomes:

```text
/assets/oregon-hero.png
```

in the browser.

Do not include `public` in the browser URL.

Correct:

```text
/assets/oregon-hero.png
```

Incorrect:

```text
/public/assets/oregon-hero.png
```

---

# Netlify Deployment

The blog is deployed through Netlify.

## Build Command

```bash
npm run build
```

## Publish Directory

```text
dist
```

Netlify clones the repository, installs dependencies, runs the Astro/Jampack build, and publishes the resulting `dist` directory.

---

# Netlify Build Failures

When a Netlify build fails, find the first meaningful Astro or Node error rather than focusing only on:

```text
Build script returned non-zero exit code
```

That final message usually reports the consequence, not the cause.

For example:

```text
DuplicateContentEntrySlugError
```

means the problem is with content entries, not Netlify itself.

Whenever possible, reproduce the build locally:

```bash
npm run build
```

Fix local build errors before pushing another deployment.

---

# Recommended Development Workflow

Start by updating your local branch:

```bash
git pull
```

Install dependencies when needed:

```bash
npm install
```

Start Astro:

```bash
npm run dev
```

Make and test changes locally.

Before committing:

```bash
npm run build
```

Then:

```bash
git status
git add .
git commit -m "Describe the change"
git push
```

Netlify should automatically deploy the pushed commit.

---

# Git Ignore

The repository should normally ignore items such as:

```gitignore
node_modules/
dist/
.astro/
.env
.env.*
.DS_Store
npm-debug.log*
```

Do not ignore source Markdown posts or public site assets.

---

# Adding a New Article

A typical publishing workflow is:

1. Create a Markdown file in:

```text
src/content/blog/
```

2. Add valid frontmatter.

3. Write the article.

4. Choose relevant existing tags.

5. Decide whether it should be featured.

6. Run:

```bash
npm run dev
```

7. Verify the article page.

8. Verify the homepage and tag pages.

9. Run:

```bash
npm run build
```

10. Resolve any content/schema/slug errors.

11. Commit and push.

---

# Before Publishing Content

Check:

* title
* description
* publication date
* slug
* duplicate slugs
* tags
* featured status
* headings
* links
* images
* alt text
* mobile formatting
* internal links
* CTA relevance

---

# Relationship to the Main Website

The blog and main website are separate repositories but should feel like one ecosystem.

## Main Website

```text
steventranrealestate
```

Focuses on:

* services
* cities
* communities
* relocation
* YouTube
* reviews
* lead generation
* contact

## Blog

```text
steventranrealestate-blog
```

Focuses on:

* long-form education
* market analysis
* guides
* SEO content
* searchable articles
* topic archives

The sites should link naturally to each other.

For example:

```text
Blog article
    ↓
Relevant city/community page
    ↓
Relocation guide or consultation
```

and:

```text
Main site community page
    ↓
Relevant educational article
```

This creates a stronger user experience and internal SEO structure than treating the two sites as unrelated properties.

---

# Content Philosophy

Content should prioritize usefulness over keyword stuffing.

The blog should help people understand:

* what it is actually like to buy in the Portland Metro area
* differences between Oregon and Southwest Washington
* local communities
* financing and assistance programs
* new construction
* housing market conditions
* relocation considerations
* real estate investing
* the practical tradeoffs involved in buying a home

The writing should support informed decisions rather than simply generating search traffic.

---

# Maintenance Notes

When maintaining this project:

* Run the production build before deploying.
* Keep content slugs unique.
* Avoid unnecessary global CSS overrides.
* Scope SVG and icon styles.
* Test desktop and mobile.
* Keep tags consistent.
* Keep the blog visually aligned with the primary website.
* Put static assets in `public`.
* Avoid manually editing generated output.
* Preserve semantic HTML and accessibility.
* Use descriptive image alt text.
* Link relevant articles to main-site resources.
* Link main-site pages back to useful blog content where appropriate.

---

# Owner

Steven Tran
Real Estate Broker
Portland Metro & Southwest Washington

Main website: steventranrealestate.com

## Brand builds

This blog can be built as either the Steven Tran Real Estate Blog or the Portland Home Guide Blog from the same Astro source.

```bash
# Existing/default Steven Tran build
npm run build

# Explicit Steven Tran build
npm run build:steven-tran

# Portland Home Guide build
npm run build:portland-home-guide
```

For local development:

```bash
npm run dev:steven-tran
npm run dev:portland-home-guide
```

Brand settings live in `src/brands.ts`. The Portland Home Guide build changes the site identity, navigation, homepage copy, About page, footer, article eyebrow, author treatment, CTA language, canonical site and analytics behavior without changing the blog post content itself.

### Deployment URL

The Portland Home Guide configuration defaults to `https://blog.portlandhomeguide.com`. If the final blog URL is different, override it at build time so Astro's canonical URLs and sitemap use the correct host:

```bash
SITE_URL=https://your-final-blog-domain.com npm run build:portland-home-guide
```

### Google Analytics

The Steven Tran build keeps the existing Google Analytics ID. The Portland Home Guide build does not inherit that ID. Add a Portland Home Guide-specific ID when you are ready:

```bash
SITE_GA_ID=G-XXXXXXXXXX npm run build:portland-home-guide
```
