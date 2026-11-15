## Build & Accessibility Audit

### Build Results

| Check | Before | After |
|---|---|---|
| `pnpm build` | ✅ Passed | ✅ Passed |

### Lighthouse Accessibility

| Route | Before | After |
|---|---:|---:|
| `/` | **[93]** | **[95]** |
| `/products/1` | **[93]** | **[100]** |
| `/cart` | **[93]** | **[100]** |

> Replace `[score]` with your actual Lighthouse results.

### Before / After Screenshots

Add your Lighthouse screenshots here:

**before**

<img width="1920" height="1080" alt="Screenshot 2026-11-14 220945" src="https://github.com/user-attachments/assets/310c76af-6b7d-4bff-ad4f-2a21e0ad081e" />

**after**

![Before Home](./scr<img width="1920" height="1080" alt="Screenshot 2026-11-15 102514" src="https://github.com/user-attachments/assets/af2f2fdd-86e1-4093-a96d-c5eefaef4a8a" />
eenshots/before-home.png)

### detail page after
<img width="1920" height="1080" alt="Screenshot 2026-11-15 113020" src="https://github.com/user-attachments/assets/6929b941-4634-4ea1-aaf4-13cf32a1c2fa" />
### Cart after
<img width="1920" height="1080" alt="Screenshot 2026-11-15 114352" src="https://github.com/user-attachments/assets/9cbb21ec-3fb7-4857-9e22-5675716eab07" />

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
