# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Habitly — a habit tracker built with Expo SDK 53 / React Native 0.79 / React 19 / TypeScript (strict). The new architecture is enabled (`newArchEnabled` in `app.json`). It is an early-stage prototype: UI only, no persistence or backend.

## Commands

- `npm start` — Expo dev server (`npm run android` / `ios` / `web` start it for a specific platform)
- Run `npm install` first; `node_modules` is not checked in.

There is no test runner, linter, or formatter configured, so there is no single-test command. `npx tsc --noEmit` does not currently work as a type-check (see Gotchas).

## Architecture

- Entry: `index.ts` → `registerRootComponent(App)`. `App.tsx` nests `SafeAreaProvider` → `ThemeProvider` → `AppNavigator`. `AppNavigator` maps the theme's `isDark` onto React Navigation's `DefaultTheme`/`DarkTheme` and the `StatusBar` style.
- Navigation: a single `@react-navigation/stack` navigator with two screens, `Home` and `AddEditHabit`, headers hidden (screens render their own). Passing `{ habit }` as a route param to `AddEditHabit` puts it in edit mode; no param means add mode.
- Theming: `app/context/ThemeContext.tsx` exposes `useTheme()` returning `{ isDark, colors }`. It follows the system color scheme and has no manual toggle. Screens apply `colors.*` inline on top of `StyleSheet.create` styles, so new UI should take its colors from `useTheme()` rather than hardcoding them.
- Data: `app/constants/mockHabits.ts` is the only data source, and `HomeScreen` renders it directly. `AddEditHabitScreen.handleSave` builds a habit object but only shows an `Alert` and calls `goBack()`. Nothing is stored, so adding or editing does not change the list. Real state or persistence would need to be introduced (for example lifting state into a context) before saves take effect.
- Emoji in names: the habit emoji is part of the `name` string (`"Read 10 pages 📖"`). `AddEditHabitScreen` extracts it with a regex when editing and appends it on save.

## Gotchas

- `Habit` is declared locally in `AddEditHabitScreen.tsx` (`type: 'daily' | 'weekly' | 'monthly'`); `mockHabits` is untyped, so its `type` infers as `string`. There is no shared model type.
- Screen `navigation` props are typed `any` and optional (`navigation?.navigate`); there is no typed param list.
- `app.d.ts` references `nativewind/types`, but `nativewind` is not in `package.json`, and `tsconfig.json` only includes `app.d.ts`, so the sources are not type-checked, and `npx tsc --noEmit` fails on the missing `nativewind/types`. To type-check the code, fix `include` (for example `["**/*.ts", "**/*.tsx"]`) and drop or resolve the `nativewind` reference. Styling actually uses `StyleSheet`. Don't assume NativeWind or Tailwind is available.
- The npm package is named `habitly`, while the repo is `Hebitly`.
