# 50_STARTUPS.EXE — ML Feature Selection Lab (CRISP-DM)
### Y2K Vintage / 90s Cyber-Studio Data Science Web UI/UX

---

## 🕹️ Project Overview

This Web UI/UX is built specifically for the **50 Startups Profit Prediction & Feature Selection (CRISP-DM)** project. It combines high-precision machine learning telemetry with authentic **Y2K / 90s Classic OS** aesthetic sensibilities:

- **Theme**: Cyber-Retro Studio / Windows 95 + Mac OS 9 desktop metaphor.
- **Color Palette**: Neon Cyan (`#00F0FF`), Hot Pink (`#FF007F`), Acid Yellow (`#CCFF00`), Midnight Dark (`#0A0C13`), and Matrix Green (`#00FF66`).
- **Typography**: Google Fonts [`Press Start 2P`](https://fonts.google.com/specimen/Press+Start+2P), [`VT323`](https://fonts.google.com/specimen/VT323), and [`Share Tech Mono`](https://fonts.google.com/specimen/Share+Tech+Mono).

---

## 🚀 Key Modules & Implemented Features

### 1. Retro Header & Live Marquee Ticker
- **Title**: `50_STARTUPS.EXE - ML Feature Selection Lab`
- **Telemetry Ticker**: Marquee scrolling displaying real-time metrics (`LassoCV R²: 0.9001`, `Test RMSE: $8,995.91`, `Train CV RMSE: $9,104.68`, `Excluded Noise: State_FL, State_NY`).
- **Controls**: Live digital clock, toggleable **CRT Scanline / Glow filter**, and synthesized **8-bit audio sound effects**.

### 2. Interactive Feature Selection Console (`METHOD_SELECTOR.SYS`)
- Compare all 6 methods directly against your experiment outcomes:
  1. **LassoCV (L1 Penalty)** — Selected 3 features: R&D, Admin, Marketing.
  2. **RFECV (Recursive Elimination)** — Selected 3 features.
  3. **Forward SFS (Sequential Forward Selection)** — Selected 3 features.
  4. **ElasticNetCV (L1 + L2)** — Selected 3 features.
  5. **Exhaustive (All 31 Combinations)** — Exact optimal 3 features.
  6. **Baseline OLS (Full 5 Features)** — Benchmark with state dummies.
- **Dynamic LED Flags**: Real-time pixel LEDs switch green/red as you toggle methods to indicate which feature inputs are active.
- **Hyperparameter Sliders**: Interactive Train/Test Split (60%–90%) and Cross-Validation folds ($k=3$ to $k=10$).

### 3. k-Value Selector Tabs & Model Performance Window (`MODEL_PERFORMANCE_MONITOR.EXE`)
- **k-Value Selector Tabs ($k=1 \dots 5$)**:
  - Designed as vintage Windows 95 / media player control buttons with 3D bevels and sound effects.
  - **$k=2$ (★ Optimal Sweet Spot)** highlighted in glowing emerald green with pulsing matrix glow.
  - **$k=5$ (⚠ Full Model / Overfitting Cliff)** tagged with an amber warning style and hazard border.
- **Dual Line Charts**:
  - Side-by-side high-DPI HTML5 canvas charts tracking metric trajectories from $k=1$ to $k=5$:
    - **RMSE Trend (Lower is Better)**: Pinpoints the global minimum error ($8,198.80) at $k=2$ with glowing emerald star marker, and highlights the overfitting cliff at $k=5$ ($9,137.99).
    - **R-squared Trend (Higher is Better)**: Displays explanatory power peaking at $R^2 = 0.9474$ at $k=2$.
  - Interactive crosshairs and rich tooltips upon hover or click.
- **OLS Equation Card**:
  - Renders the exact fitted regression formula in green-phosphor CRT Terminal font (`VT323` / `Share Tech Mono`) with syntax-highlighted intercept, slopes, and variable tokens:
    $$\text{k=2: Profit} = \$46,346.34 + 0.7886 \times (\text{R\&D}) + 0.0326 \times (\text{Mkt})$$
  - Dynamic diagnostic telemetry explains why $k=2$ achieves maximum parsimony (Occam's Razor) while $k=5$ captures noise from geographical dummies.
  - **⚡ SYNC TO PREDICTOR**: One-click sync button loading any evaluated $k$-subset into the profit predictor.

### 4. Actual vs. Predicted Profit Scatter & Arcade High Scores
- **Actual vs. Predicted Plot**: HTML5 Canvas radar grid displaying the 10 test startups against the ideal $45^\circ$ line. Hovering over any point displays its startup ID, state, actual profit, predicted profit, and residual offset.
- **High Score Leaderboard**: Arcade leaderboard comparing CV RMSE ranking across methods.

### 4. Profit Calculator / Predictor (`STARTUP_PROFIT_CALCULATOR`)
- **Arcade Ledger Display**: High-glow matrix readout with animated roll-up numbers.
- **Audio Synthesizer**: Web Audio API generates coin collect, button beeps, and CRT frequency noises upon user actions.
- **Quick Presets**:
  - `🦄 Silicon Valley Tech` (High R&D spend)
  - `📢 Heavy Marketing Co` (High marketing spend)
  - `⚡ Bootstrapped Lean` (Low cost footprint)
  - `📄 Test Set Row #13` (Validates against test set record)
  - `⚠️ Outlier Row #49` (Inspect extreme outlier behavior)
- **RUN_PREDICTION.BAT**: Interactive button calculating live OLS formulas using exact trained coefficients:
  $$\text{Profit} = \$54,071.88 + 0.8038 \times \text{R\&D} - 0.0679 \times \text{Admin} + 0.0312 \times \text{Mkt}$$

### 5. Outliers & Residual Inspector (`OUTLIERS_RESIDUAL_TERMINAL.EXE`)
- Terminal console table containing the **Top 10 Outliers** (Row #49, #45, #14, #15, etc.) with color-coded positive/negative residuals and state tags.

---

## 📂 Source Code Files

1. **[`index.html`](file:///d:/HW2/index.html)**: Complete, standalone, zero-dependency web app ready to run locally or host on GitHub Pages.
2. **[`RetroStartupLab.jsx`](file:///d:/HW2/RetroStartupLab.jsx)**: Ready-to-import modern React + Tailwind CSS component.

---

## 🌐 Running Locally

The local server is already running on port **8080**:
```bash
http://localhost:8080/index.html
```

Or run directly with python:
```bash
python -m http.server 8080 --directory "d:\HW2"
```
