# FutureScore

FutureScore is a gamified prediction reputation platform where users lock predictions, prove they were right, earn Future Credits, climb rankings, unlock badges, and redeem credits for coupons, sponsor rewards, creator drops, and marketplace deals.

Tagline: **Predict. Prove. Earn.**

## What is included

- React + Vite + TypeScript
- Tailwind CSS dark/gold dashboard UI
- Firebase Auth and Firestore-ready service layer
- Mock/demo fallback when Firebase keys are missing
- Prediction creation and mock OpenAI validation flow
- Dashboard, predictions, rankings, marketplace, events, wallet, learn, auth, and admin routes
- Future Credits, XP, badges, tier plans, proof cards, coupon unlock flow, and reward modal components
- Firestore security rules
- Firebase Hosting config
- GitHub Pages workflow

## Local setup

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

The app works in demo mode without Firebase or OpenAI keys.

## Environment variables

Copy `.env.example` to `.env.local` and fill values when ready:

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_OPENAI_API_KEY=
VITE_ADMIN_EMAIL=admin@futurescore.app
```

If these are blank, the app falls back to mock users, predictions, rewards, coupons, and events.

## Firebase

Firestore collections used by the app:

- `users`
- `predictions`
- `creditTransactions`
- `marketplaceItems`
- `couponOffers`
- `unlockedCoupons`
- `couponClicks`
- `sponsorCampaigns`
- `predictionEvents`
- `categories`
- `userBadges`

Deploy rules:

```bash
firebase deploy --only firestore:rules
```

Deploy hosting:

```bash
npm run build
firebase deploy --only hosting
```

## GitHub Pages

The workflow at `.github/workflows/deploy-pages.yml` builds with:

```bash
GITHUB_PAGES=true npm run build
```

That sets Vite's base path to `/Future-Score/` for the repository:

```text
https://github.com/BeatViral/Future-Score
```

In GitHub, enable Pages with source set to **GitHub Actions**.

## Product loop

```text
make prediction
-> lock prediction
-> outcome resolves
-> earn credits + XP + badges + rank boost
-> redeem credits for coupons and rewards
-> enter bigger challenges
-> climb toward Master Predictor / Nostradamus status
```

## Compliance wording

Future Credits are in-app reward points used inside the FutureScore platform. They are not cash, not gambling winnings, and not guaranteed to have monetary value.

If FutureScore launches a token in the future, eligible credits may become convertible into FutureCoin, but no future value is promised.

Users pay for access, prediction locks, analytics, events, and platform features. Rewards are based on prediction outcomes and platform rules.
