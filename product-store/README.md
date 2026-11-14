## Build & Accessibility Audit

### Build Results

| Check | Before | After |
|---|---|---|
| `pnpm build` | ✅ Passed | ✅ Passed |

### Lighthouse Accessibility

| Route | Before | After |
|---|---:|---:|
| `/` | **[score]** | **[score]** |
| `/products/1` | **[score]** | **[score]** |
| `/cart` | **[score]** | **[score]** |

> Replace `[score]` with your actual Lighthouse results.

### Before / After Screenshots

Add your Lighthouse screenshots here:

**Before**

![Before Home](./screenshots/before-home.png)

**After**

![After Home](./screenshots/after-home.png)

Add screenshots for `/`, `/products/1`, and `/cart`.

### Accessibility Fixes

- Added lazy loading and loading skeletons.
- Added error boundaries and retry functionality.
- Added skip link and automatic route focus.
- Added live announcements for route and cart changes.
- Added visible `focus-visible` keyboard indicators.
- Improved accessible labels and button states.
- Added accessible category tabs with `aria-busy`.
- Added `aria-live` support for cart updates.
- Added `eslint-plugin-jsx-a11y`.

### Running the Audits

```bash
pnpm install
pnpm build
pnpm lint
pnpm dev
```

Then:

1. Open `/`, `/products/1`, and `/cart`.
2. Run **Lighthouse → Accessibility** in Chrome DevTools.
3. Run **axe DevTools** on each route and important UI state.
4. Fix all **Critical** and **Serious** issues.

### Delivery

- **Repository:** [Paste GitHub URL]
- **Live Demo:** [Paste deployment URL]
- **Pull Request:** [Paste PR URL]

After merging the PR, confirm the deployment and paste the **repo URL, live URL, and after-audit screenshots** in Telegram.