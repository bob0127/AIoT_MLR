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
- Compare all methods directly against your experiment outcomes:
  1. **★ Compare 5 Methods (5-Curve Overlay)** — Overlays all 5 algorithmic trajectories simultaneously on the dual charts with custom markers and an evaluation matrix table.
  2. **LassoCV (L1 Penalty)** — Dynamic progression curve across $k=1 \dots 5$.
  3. **Forward SFS (Sequential Forward Selection)** — Stepwise greedy forward trajectory.
  4. **RFECV (Recursive Feature Elimination)** — Backward recursive elimination trajectory.
  5. **ElasticNetCV (L1 + L2 Penalty)** — Balanced regularization trajectory.
  6. **Exhaustive Search (All 31 Subsets)** — Global optimal combinatorial subset path.
- **Dynamic LED Flags**: Real-time pixel LEDs switch green/red as you toggle methods and $k$-values to indicate which feature inputs are active.
- **Hyperparameter Sliders**: Interactive Train/Test Split (60%–90%) and Cross-Validation folds ($k=3$ to $k=10$).

### 3. k-Value Selector Tabs & Model Performance Window (`MODEL_PERFORMANCE_MONITOR.EXE`)
- **k-Value Selector Tabs ($k=1 \dots 5$)**:
  - Designed as vintage Windows 95 / media player control buttons with 3D bevels and sound effects.
  - **$k=2$ (★ Optimal Sweet Spot)** highlighted in glowing emerald green with pulsing matrix glow.
  - **$k=5$ (⚠ Full Model / Overfitting Cliff)** tagged with an amber warning style and hazard border.
  - Clicking any $k$-tab updates active LED flags, recalculates profit in the calculator, and updates the OLS equation.
- **Dynamic Progression Curves & 5-Method Comparison Overlay**:
  - **Single Method Mode**: Selecting any method (LassoCV, Forward SFS, RFECV, ElasticNetCV, Exhaustive) renders its specific RMSE & $R^2$ curve with tailored neon color gradients.
  - **★ Compare 5 Methods Overlay Mode**: Renders all 5 algorithms simultaneously with distinct cyber colors and markers:
    - `LassoCV`: Neon Cyan (`#00F0FF`, `●`)
    - `Forward SFS`: Neon Orange (`#FF8C00`, `■`)
    - `RFECV`: Neon Emerald (`#00FF66`, `▲`)
    - `ElasticNetCV`: Hot Pink (`#FF007F`, `◆`)
    - `Exhaustive`: Electric Purple (`#B388FF`, `▼`)
  - **Performance Comparison Legend Bar**: Displays interactive symbols, method names, and optimal $k$ indicators.
- **Dual Line Charts**:
  - Side-by-side high-DPI HTML5 canvas charts tracking metric trajectories from $k=1$ to $k=5$:
    - **RMSE Trend (Lower is Better)**: Highlights sweet spots (e.g. $k=2$ or Exhaustive $k=3$ at $\$8,171.65$) and the overfitting cliff ($k=5$ at $\$9,137.99$).
    - **R-squared Trend (Higher is Better)**: Displays explanatory power trajectories peaking at $R^2 \approx 0.9474 - 0.9478$.
  - Interactive crosshairs and rich tooltips upon hover or click.
- **OLS Equation & Comparison Matrix Card**:
  - **In Single Method Mode**: Renders the exact fitted regression formula in green-phosphor CRT Terminal font (`VT323` / `Share Tech Mono`) with syntax-highlighted intercept, slopes, and variable tokens:
    $$\text{k=2: Profit} = \$46,346.34 + 0.7886 \times (\text{R\&D}) + 0.0326 \times (\text{Mkt})$$
  - **In Compare 5 Methods Mode**: Renders a multi-algorithm CRT evaluation matrix table comparing all 5 algorithms at the selected $k$, displaying RMSE, $R^2$, features, and status with the winning subset highlighted in emerald green.
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
