import React, { useState, useEffect, useRef } from 'react';

// ============================================================
// 50 STARTUPS - CRISP-DM RETRO Y2K ML LAB (REACT + TAILWIND)
// ============================================================

const MODELS_DATA = [
  {
    id: "LassoCV",
    name: "LassoCV (L1 Penalty)",
    features: ["R&D Spend", "Administration", "Marketing Spend"],
    nFeat: 3,
    cvRmse: 9104.68,
    mae: 6979.15,
    rmse: 8995.91,
    r2: 0.9001,
    adjR2: 0.8501,
    intercept: 54071.88,
    coefs: { "R&D Spend": 0.80378, "Administration": -0.06793, "Marketing Spend": 0.03124, "State_Florida": 0, "State_New York": 0 },
    tag: "TOP PERFORMER",
    isBest: true
  },
  {
    id: "RFECV",
    name: "RFECV (Recursive Elimination)",
    features: ["R&D Spend", "Administration", "Marketing Spend"],
    nFeat: 3,
    cvRmse: 9104.68,
    mae: 6979.15,
    rmse: 8995.91,
    r2: 0.9001,
    adjR2: 0.8501,
    intercept: 54071.88,
    coefs: { "R&D Spend": 0.80378, "Administration": -0.06793, "Marketing Spend": 0.03124, "State_Florida": 0, "State_New York": 0 },
    tag: "GREEDY STEP",
    isBest: true
  },
  {
    id: "Forward_SFS",
    name: "Forward SFS (Sequential)",
    features: ["R&D Spend", "Administration", "Marketing Spend"],
    nFeat: 3,
    cvRmse: 9104.68,
    mae: 6979.15,
    rmse: 8995.91,
    r2: 0.9001,
    adjR2: 0.8501,
    intercept: 54071.88,
    coefs: { "R&D Spend": 0.80378, "Administration": -0.06793, "Marketing Spend": 0.03124, "State_Florida": 0, "State_New York": 0 },
    tag: "STEPWISE",
    isBest: true
  },
  {
    id: "ElasticNetCV",
    name: "ElasticNetCV (L1 + L2)",
    features: ["R&D Spend", "Administration", "Marketing Spend"],
    nFeat: 3,
    cvRmse: 9104.68,
    mae: 6979.15,
    rmse: 8995.91,
    r2: 0.9001,
    adjR2: 0.8501,
    intercept: 54071.88,
    coefs: { "R&D Spend": 0.80378, "Administration": -0.06793, "Marketing Spend": 0.03124, "State_Florida": 0, "State_New York": 0 },
    tag: "REGULARIZED",
    isBest: true
  },
  {
    id: "Exhaustive",
    name: "Exhaustive (31 Combinations)",
    features: ["R&D Spend", "Administration", "Marketing Spend"],
    nFeat: 3,
    cvRmse: 9104.68,
    mae: 6979.15,
    rmse: 8995.91,
    r2: 0.9001,
    adjR2: 0.8501,
    intercept: 54071.88,
    coefs: { "R&D Spend": 0.80378, "Administration": -0.06793, "Marketing Spend": 0.03124, "State_Florida": 0, "State_New York": 0 },
    tag: "EXACT OPTIMAL",
    isBest: true
  },
  {
    id: "Baseline_OLS",
    name: "Baseline OLS (All 5 Features)",
    features: ["R&D Spend", "Administration", "Marketing Spend", "State_Florida", "State_New York"],
    nFeat: 5,
    cvRmse: 9550.68,
    mae: 6961.48,
    rmse: 9055.96,
    r2: 0.8987,
    adjR2: 0.7721,
    intercept: 54028.04,
    coefs: { "R&D Spend": 0.80563, "Administration": -0.06879, "Marketing Spend": 0.02986, "State_Florida": 938.79, "State_New York": 6.99 },
    tag: "BENCHMARK",
    isBest: false
  }
];

const OUTLIERS = [
  { rank: 1, id: 49, state: "California", rd: 0.0, admin: 116983.8, mkt: 45173.06, actual: 14681.4, pred: 48215.13, res: -33533.73 },
  { rank: 2, id: 45, state: "New York", rd: 1000.23, admin: 124153.04, mkt: 1903.93, actual: 64926.08, pred: 47650.65, res: 17275.43 },
  { rank: 3, id: 14, state: "Florida", rd: 119943.24, admin: 156547.42, mkt: 256512.92, actual: 132602.65, pred: 149548.65, res: -16945.99 },
  { rank: 4, id: 15, state: "New York", rd: 114523.61, admin: 122616.84, mkt: 261776.23, actual: 129917.04, pred: 146235.16, res: -16318.12 },
  { rank: 5, id: 36, state: "Florida", rd: 28663.76, admin: 127056.21, mkt: 201126.82, actual: 90708.19, pred: 75286.17, res: 15422.02 },
  { rank: 6, id: 48, state: "New York", rd: 542.05, admin: 51743.15, mkt: 0.0, actual: 35673.41, pred: 49171.39, res: -13497.98 },
  { rank: 7, id: 12, state: "Florida", rd: 93863.75, admin: 127320.38, mkt: 249839.44, actual: 141585.52, pred: 129138.05, res: 12447.47 },
  { rank: 8, id: 38, state: "New York", rd: 20229.59, admin: 65947.93, mkt: 185265.1, actual: 81229.06, pred: 69697.43, res: 11531.63 },
  { rank: 9, id: 10, state: "Florida", rd: 101913.08, admin: 110594.11, mkt: 229160.95, actual: 146121.95, pred: 135509.02, res: 10612.93 },
  { rank: 10, id: 16, state: "California", rd: 78013.11, admin: 121597.55, mkt: 264346.06, actual: 126992.93, pred: 116915.41, res: 10077.52 }
];

const TEST_SET = [
  { id: 13, state: "California", rd: 91992.39, admin: 135495.07, mkt: 252664.93, actual: 134307.35 },
  { id: 39, state: "California", rd: 38558.51, admin: 82982.09, mkt: 174999.30, actual: 81005.76 },
  { id: 30, state: "Florida", rd: 61994.48, admin: 115641.28, mkt: 91131.24, actual: 99937.59 },
  { id: 45, state: "New York", rd: 1000.23, admin: 124153.04, mkt: 1903.93, actual: 64926.08 },
  { id: 17, state: "New York", rd: 94657.16, admin: 145077.58, mkt: 282574.31, actual: 125370.37 },
  { id: 48, state: "New York", rd: 542.05, admin: 51743.15, mkt: 0.0, actual: 35673.41 },
  { id: 26, state: "Florida", rd: 75328.87, admin: 144135.98, mkt: 134050.07, actual: 105733.54 },
  { id: 25, state: "California", rd: 64664.71, admin: 139553.16, mkt: 137962.62, actual: 107404.34 },
  { id: 32, state: "California", rd: 63408.86, admin: 129219.61, mkt: 46085.25, actual: 97427.84 },
  { id: 19, state: "New York", rd: 86419.70, admin: 153514.11, mkt: 0.0, actual: 122776.86 }
];

const K_PROGRESSION_DATA = [
  {
    k: 1,
    title: "k=1 : R&D Spend",
    features: ["R&D Spend"],
    rmse: 8274.87,
    r2: 0.9465,
    intercept: 48416.30,
    coefs: { "R&D Spend": 0.8516 },
    isSweetSpot: false,
    isOverfitCliff: false,
    label: "⏴ k=1 (R&D Only)",
    formula: "Profit = $48,416.30 + 0.8516 × (R&D Spend)",
    insight: "Single-variable baseline: R&D Spend alone captures 94.65% variance, showing exceptional primary correlation."
  },
  {
    k: 2,
    title: "k=2 : Optimal Sweet Spot",
    features: ["R&D Spend", "Marketing Spend"],
    rmse: 8198.80,
    r2: 0.9474,
    intercept: 46346.34,
    coefs: { "R&D Spend": 0.7886, "Marketing Spend": 0.0326 },
    isSweetSpot: true,
    isOverfitCliff: false,
    label: "★ k=2 Optimal Sweet Spot (Min RMSE)",
    formula: "Profit = $46,346.34 + 0.7886 × (R&D Spend) + 0.0326 × (Marketing Spend)",
    insight: "★ OPTIMAL SWEET SPOT: Minimum test RMSE ($8,198.80) & peak R² (0.9474). Maximum explanatory power without noise."
  },
  {
    k: 3,
    title: "k=3 : Standard 3-Feat",
    features: ["R&D Spend", "Administration", "Marketing Spend"],
    rmse: 8803.78,
    r2: 0.9394,
    intercept: 42989.01,
    coefs: { "R&D Spend": 0.7788, "Administration": 0.0294, "Marketing Spend": 0.0347 },
    isSweetSpot: false,
    isOverfitCliff: false,
    label: "▶ k=3 (Standard 3-Feat)",
    formula: "Profit = $42,989.01 + 0.7788 × (R&D) + 0.0294 × (Admin) + 0.0347 × (Mkt)",
    insight: "Parsimony degrades: Adding Admin overhead increases test RMSE by +$604.98 (to $8,803.78) with negligible predictive value."
  },
  {
    k: 4,
    title: "k=4 : + State_NY",
    features: ["R&D Spend", "Administration", "Marketing Spend", "State_New York"],
    rmse: 8997.20,
    r2: 0.9367,
    intercept: 42410.31,
    coefs: { "R&D Spend": 0.7747, "Administration": 0.0318, "Marketing Spend": 0.0357, "State_New York": 1052.22 },
    isSweetSpot: false,
    isOverfitCliff: false,
    label: "▶▶ k=4 (+ State_NY)",
    formula: "Profit = $42,410.31 + 0.7747 × (R&D) + 0.0318 × (Admin) + 0.0357 × (Mkt) + 1,052.22 × (State_NY)",
    insight: "Over-parameterization: State dummy has p > 0.05. Test RMSE worsens to $8,997.20 as model fits sample noise."
  },
  {
    k: 5,
    title: "k=5 : Full Model",
    features: ["R&D Spend", "Administration", "Marketing Spend", "State_Florida", "State_New York"],
    rmse: 9137.99,
    r2: 0.9347,
    intercept: 42554.17,
    coefs: { "R&D Spend": 0.7735, "Administration": 0.0329, "Marketing Spend": 0.0366, "State_Florida": -959.28, "State_New York": 699.37 },
    isSweetSpot: false,
    isOverfitCliff: true,
    label: "⚠ k=5 Full Model (Overfitting Cliff)",
    formula: "Profit = $42,554.17 + 0.7735 × (R&D) + 0.0329 × (Admin) + 0.0366 × (Mkt) - 959.28 × (State_FL) + 699.37 × (State_NY)",
    insight: "⚠ OVERFITTING CLIFF: Full model produces highest RMSE ($9,137.99) and lowest R² (0.9347). Redundant dummy variables."
  }
];

export default function RetroStartupLab() {
  const [selectedModel, setSelectedModel] = useState(MODELS_DATA[0]);
  const [crtOn, setCrtOn] = useState(true);
  const [sfxOn, setSfxOn] = useState(true);
  
  // Predictor inputs
  const [rd, setRd] = useState(91992);
  const [admin, setAdmin] = useState(135495);
  const [mkt, setMkt] = useState(252665);
  const [state, setState] = useState("California");
  const [predictedProfit, setPredictedProfit] = useState(126703.03);

  // Hyperparameters
  const [split, setSplit] = useState(80);
  const [cvFolds, setCvFolds] = useState(5);

  // K-progression state
  const [selectedK, setSelectedK] = useState(2);

  const canvasRef = useRef(null);
  const rmseCanvasRef = useRef(null);
  const r2CanvasRef = useRef(null);

  // Sound Synth Effect
  const playSfx = (freq = 440, type = 'square', duration = 0.08) => {
    if (!sfxOn || typeof window === 'undefined') return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Ignored
    }
  };

  // Compute prediction
  const computePrediction = (model = selectedModel) => {
    const c = model.coefs || {};
    const f = model.features || [];
    let pred = model.intercept || 0;
    if (f.includes("R&D Spend")) pred += (c["R&D Spend"] || 0) * rd;
    if (f.includes("Administration")) pred += (c["Administration"] || 0) * admin;
    if (f.includes("Marketing Spend")) pred += (c["Marketing Spend"] || 0) * mkt;
    if (f.includes("State_Florida") && state === "Florida") {
      pred += c["State_Florida"] || 0;
    } else if (f.includes("State_New York") && state === "New York") {
      pred += c["State_New York"] || 0;
    }
    setPredictedProfit(pred);
  };

  const handleSelectK = (k) => {
    setSelectedK(k);
    const kData = K_PROGRESSION_DATA.find(d => d.k === k);
    if (!kData) return;
    playSfx(kData.isSweetSpot ? 880 : (kData.isOverfitCliff ? 220 : 500));
    const newModel = {
      id: `Forward_SFS_k${kData.k}`,
      name: `Forward SFS (k=${kData.k})`,
      features: kData.features,
      nFeat: kData.k,
      cvRmse: kData.rmse,
      mae: 6979.15,
      rmse: kData.rmse,
      r2: kData.r2,
      adjR2: kData.r2 - 0.05,
      intercept: kData.intercept,
      coefs: {
        "R&D Spend": kData.coefs["R&D Spend"] || 0,
        "Administration": kData.coefs["Administration"] || 0,
        "Marketing Spend": kData.coefs["Marketing Spend"] || 0,
        "State_Florida": kData.coefs["State_Florida"] || 0,
        "State_New York": kData.coefs["State_New York"] || 0
      },
      tag: kData.isSweetSpot ? "SWEET SPOT" : (kData.isOverfitCliff ? "CLIFF" : `k=${kData.k}`),
      isBest: kData.isSweetSpot
    };
    setSelectedModel(newModel);
  };

  useEffect(() => {
    computePrediction(selectedModel);
  }, [selectedModel, rd, admin, mkt, state]);

  // Draw Actual vs Predicted Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const pad = 35;

    ctx.clearRect(0, 0, w, h);

    const minV = 30, maxV = 150;
    const toX = (val) => pad + ((val - minV) / (maxV - minV)) * (w - 2 * pad);
    const toY = (val) => (h - pad) - ((val - minV) / (maxV - minV)) * (h - 2 * pad);

    // 45 Degree Line
    ctx.strokeStyle = '#ff007f';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(toX(minV), toY(minV));
    ctx.lineTo(toX(maxV), toY(maxV));
    ctx.stroke();
    ctx.setLineDash([]);

    // Data points
    TEST_SET.forEach(pt => {
      const c = selectedModel.coefs;
      let pred = selectedModel.intercept + (c["R&D Spend"] * pt.rd) + (c["Administration"] * pt.admin) + (c["Marketing Spend"] * pt.mkt);
      if (selectedModel.features.includes("State_Florida") && pt.state === "Florida") pred += c["State_Florida"];
      if (selectedModel.features.includes("State_New York") && pt.state === "New York") pred += c["State_New York"];

      const cx = toX(pt.actual / 1000);
      const cy = toY(pred / 1000);

      ctx.fillStyle = '#00f0ff';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  }, [selectedModel]);

  // Draw Dual Line Charts for Forward SFS Progression
  useEffect(() => {
    // 1. RMSE Chart
    const rmseCanvas = rmseCanvasRef.current;
    if (rmseCanvas) {
      const ctx = rmseCanvas.getContext('2d');
      const w = rmseCanvas.width;
      const h = rmseCanvas.height;
      const padL = 48, padR = 25, padT = 25, padB = 25;
      ctx.clearRect(0, 0, w, h);

      const minY = 8000, maxY = 9300;
      const toX = (k) => padL + ((k - 1) / 4) * (w - padL - padR);
      const toY = (val) => (h - padB) - ((val - minY) / (maxY - minY)) * (h - padT - padB);

      // Grid
      ctx.strokeStyle = '#182438';
      ctx.lineWidth = 1;
      ctx.fillStyle = '#64748b';
      ctx.font = '9px monospace';
      for (let v = 8200; v <= 9200; v += 200) {
        const y = toY(v);
        ctx.beginPath();
        ctx.moveTo(padL, y);
        ctx.lineTo(w - padR, y);
        ctx.stroke();
        ctx.fillText(`$${v}`, 6, y + 3);
      }
      for (let k = 1; k <= 5; k++) {
        const x = toX(k);
        ctx.fillText(`k=${k}`, x - 8, h - 8);
      }

      // Line
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.moveTo(toX(1), toY(K_PROGRESSION_DATA[0].rmse));
      K_PROGRESSION_DATA.forEach(d => ctx.lineTo(toX(d.k), toY(d.rmse)));
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Nodes
      K_PROGRESSION_DATA.forEach(d => {
        const cx = toX(d.k);
        const cy = toY(d.rmse);
        if (d.isSweetSpot) {
          ctx.fillStyle = '#00ff88';
          ctx.shadowColor = '#00ff88';
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(cx, cy, 6, 0, Math.PI * 2);
          ctx.fill();
        } else if (d.isOverfitCliff) {
          ctx.fillStyle = '#fbbf24';
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(cx, cy, 5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = '#00f0ff';
          ctx.beginPath();
          ctx.arc(cx, cy, 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;
        if (d.k === selectedK) {
          ctx.strokeStyle = '#ffff00';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(cx, cy, 9, 0, Math.PI * 2);
          ctx.stroke();
        }
      });
    }

    // 2. R2 Chart
    const r2Canvas = r2CanvasRef.current;
    if (r2Canvas) {
      const ctx = r2Canvas.getContext('2d');
      const w = r2Canvas.width;
      const h = r2Canvas.height;
      const padL = 48, padR = 25, padT = 25, padB = 25;
      ctx.clearRect(0, 0, w, h);

      const minY = 0.930, maxY = 0.950;
      const toX = (k) => padL + ((k - 1) / 4) * (w - padL - padR);
      const toY = (val) => (h - padB) - ((val - minY) / (maxY - minY)) * (h - padT - padB);

      // Grid
      ctx.strokeStyle = '#182438';
      ctx.lineWidth = 1;
      ctx.fillStyle = '#64748b';
      ctx.font = '9px monospace';
      for (let v = 0.932; v <= 0.948; v += 0.004) {
        const y = toY(v);
        ctx.beginPath();
        ctx.moveTo(padL, y);
        ctx.lineTo(w - padR, y);
        ctx.stroke();
        ctx.fillText(v.toFixed(3), 6, y + 3);
      }
      for (let k = 1; k <= 5; k++) {
        const x = toX(k);
        ctx.fillText(`k=${k}`, x - 8, h - 8);
      }

      // Line
      ctx.strokeStyle = '#ff007f';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#ff007f';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.moveTo(toX(1), toY(K_PROGRESSION_DATA[0].r2));
      K_PROGRESSION_DATA.forEach(d => ctx.lineTo(toX(d.k), toY(d.r2)));
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Nodes
      K_PROGRESSION_DATA.forEach(d => {
        const cx = toX(d.k);
        const cy = toY(d.r2);
        if (d.isSweetSpot) {
          ctx.fillStyle = '#00ff88';
          ctx.shadowColor = '#00ff88';
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(cx, cy, 6, 0, Math.PI * 2);
          ctx.fill();
        } else if (d.isOverfitCliff) {
          ctx.fillStyle = '#fbbf24';
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(cx, cy, 5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = '#ff007f';
          ctx.beginPath();
          ctx.arc(cx, cy, 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;
        if (d.k === selectedK) {
          ctx.strokeStyle = '#ffff00';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(cx, cy, 9, 0, Math.PI * 2);
          ctx.stroke();
        }
      });
    }
  }, [selectedK]);

  return (
    <div className="min-h-screen bg-[#07090f] text-slate-100 font-mono relative p-4 sm:p-6 overflow-x-hidden">
      
      {/* CRT Scanline Overlay */}
      {crtOn && (
        <div 
          className="pointer-events-none fixed inset-0 z-50 opacity-40 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)]" 
          style={{ backgroundSize: '100% 3px' }}
        />
      )}

      {/* Retro Title & Control Header */}
      <header className="flex flex-wrap items-center justify-between border-b-2 border-cyan-400/40 pb-3 mb-4 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-[#ff007f] text-white text-[10px] px-2 py-0.5 font-bold shadow-[2px_2px_0px_#00f0ff]">
              CRISP-DM V1.0
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-[#00f0ff] tracking-tight drop-shadow-[2px_2px_0px_#ff007f]">
              50_STARTUPS.EXE // ML Feature Selection Lab
            </h1>
          </div>
          <p className="text-xs text-slate-400">Multiple Linear Regression &bull; Model Evaluation &amp; Residual Diagnostics</p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => { setCrtOn(!crtOn); playSfx(600); }}
            className={`px-3 py-1 text-xs border-2 uppercase font-bold transition-all ${
              crtOn ? 'bg-cyan-400 text-black border-white shadow-[0_0_10px_#00f0ff]' : 'bg-slate-800 text-slate-300 border-slate-600'
            }`}
          >
            📺 CRT: {crtOn ? 'ON' : 'OFF'}
          </button>
          <button 
            onClick={() => { setSfxOn(!sfxOn); playSfx(750); }}
            className={`px-3 py-1 text-xs border-2 uppercase font-bold transition-all ${
              sfxOn ? 'bg-[#ff007f] text-white border-white shadow-[0_0_10px_#ff007f]' : 'bg-slate-800 text-slate-300 border-slate-600'
            }`}
          >
            🔊 SFX: {sfxOn ? 'ON' : 'OFF'}
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Model Console */}
        <div className="space-y-4">
          <div className="bg-[#c0c4ce] text-black border-t-2 border-l-2 border-white border-r-2 border-b-2 border-[#404040] shadow-[4px_4px_0px_#000]">
            <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] text-white px-2 py-1 text-xs font-bold flex justify-between items-center">
              <span>METHOD_SELECTOR.SYS</span>
              <div className="flex gap-1">
                <span className="w-3 h-3 bg-slate-300 text-black text-[9px] text-center leading-3 border border-white">_</span>
                <span className="w-3 h-3 bg-slate-300 text-black text-[9px] text-center leading-3 border border-white">&times;</span>
              </div>
            </div>

            <div className="p-3 bg-[#111522] text-white space-y-2">
              <p className="text-xs text-slate-400">SELECT FEATURE SELECTION STRATEGY:</p>
              {MODELS_DATA.map(m => (
                <div 
                  key={m.id}
                  onClick={() => { setSelectedModel(m); playSfx(520); }}
                  className={`p-2 border cursor-pointer flex justify-between items-center transition-all ${
                    selectedModel.id === m.id 
                      ? 'bg-[#152a45] border-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.4)] text-cyan-300' 
                      : 'bg-[#151a2a] border-slate-700 hover:border-slate-500 text-slate-300'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs">{m.name}</div>
                    <div className="text-[10px] text-slate-400">{m.nFeat} features | RMSE: ${m.cvRmse.toFixed(2)}</div>
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded ${m.isBest ? 'bg-[#ccff00] text-black font-bold' : 'bg-slate-700 text-slate-300'}`}>
                    {m.tag}
                  </span>
                </div>
              ))}

              {/* Sliders */}
              <div className="pt-2 border-t border-slate-700 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>TRAIN/TEST SPLIT:</span>
                  <span className="text-cyan-400 font-bold">{split}% / {100 - split}%</span>
                </div>
                <input 
                  type="range" min="60" max="90" step="5" value={split} 
                  onChange={e => setSplit(Number(e.target.value))}
                  className="w-full accent-[#ff007f]"
                />

                <div className="flex justify-between pt-1">
                  <span>CV FOLDS:</span>
                  <span className="text-[#ccff00] font-bold">k = {cvFolds}</span>
                </div>
                <input 
                  type="range" min="3" max="10" step="1" value={cvFolds} 
                  onChange={e => setCvFolds(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>

              {/* Active Feature Flags */}
              <div className="pt-2 border-t border-slate-700">
                <div className="text-[10px] text-cyan-400 font-bold mb-1.5 flex justify-between">
                  <span>ACTIVE FEATURE FLAGS:</span>
                  <span className="text-slate-400">{selectedModel.features.length} of 5</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                  {[
                    { id: "R&D Spend", name: "R&D Spend" },
                    { id: "Administration", name: "Admin Spend" },
                    { id: "Marketing Spend", name: "Marketing" },
                    { id: "State_Florida", name: "State: FL" },
                    { id: "State_New York", name: "State: NY" }
                  ].map(feat => {
                    const isActive = selectedModel.features.includes(feat.id);
                    return (
                      <div key={feat.id} className="flex items-center gap-1.5 bg-[#090c14] border border-slate-800 px-1.5 py-1">
                        <div className={`w-2 h-2 rounded-[2px] transition-all ${isActive ? 'bg-[#00ff66] shadow-[0_0_6px_#00ff66]' : 'bg-[#3b1219]'}`} />
                        <span className={isActive ? 'text-white' : 'text-slate-500'}>{feat.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Center / Right: Predictor & Charts */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* MODEL PERFORMANCE WINDOW (Dual Line Charts & OLS Equation Card) */}
          <div className="bg-[#c0c4ce] text-black border-t-2 border-l-2 border-white border-r-2 border-b-2 border-[#404040] shadow-[4px_4px_0px_#000]">
            <div className="bg-gradient-to-r from-[#0f2c42] via-[#086972] to-[#00a896] text-white px-2 py-1 text-xs font-bold flex justify-between items-center">
              <span>📊 MODEL_PERFORMANCE_MONITOR.EXE // Forward SFS Progression (k = 1...5)</span>
              <div className="flex gap-1">
                <span className="w-3 h-3 bg-slate-300 text-black text-[9px] text-center leading-3 border border-white">_</span>
                <span className="w-3 h-3 bg-slate-300 text-black text-[9px] text-center leading-3 border border-white">&times;</span>
              </div>
            </div>

            <div className="p-3 bg-[#111522] text-white space-y-3">
              
              {/* k-Value Selector Tabs (Vintage Media Player / Windows 95 controls) */}
              <div className="bg-[#141926] border border-slate-700 p-2 flex flex-wrap items-center gap-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mr-1">⏵ K-SELECTOR:</span>
                <div className="flex flex-wrap gap-2 flex-1">
                  {K_PROGRESSION_DATA.map(d => {
                    const isSelected = d.k === selectedK;
                    let btnStyle = "border-t-2 border-l-2 border-r-2 border-b-2 px-2.5 py-1.5 text-[10px] font-bold cursor-pointer transition-all flex items-center gap-1.5 shadow-[1px_1px_0px_#000] ";
                    if (d.isSweetSpot) {
                      btnStyle += isSelected 
                        ? "bg-[#032010] text-white border-[#00ff88] shadow-[inset_0_0_10px_#00ff88,0_0_15px_#00ff88]" 
                        : "bg-gradient-to-b from-[#093b1d] to-[#041c0e] text-[#00ff88] border-[#00ff88] shadow-[0_0_10px_rgba(0,255,102,0.4)] hover:brightness-125";
                    } else if (d.isOverfitCliff) {
                      btnStyle += isSelected
                        ? "bg-[#200d02] text-white border-[#f59e0b] shadow-[inset_0_0_10px_#f59e0b,0_0_15px_#f59e0b]"
                        : "bg-gradient-to-b from-[#442207] to-[#291202] text-[#fbbf24] border-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.35)] hover:brightness-125";
                    } else {
                      btnStyle += isSelected
                        ? "bg-[#a2a6b2] text-black border-slate-700 translate-x-[1px] translate-y-[1px] shadow-none"
                        : "bg-[#c0c4ce] text-black border-white border-r-[#404040] border-b-[#404040] hover:bg-[#d5d9e4]";
                    }
                    return (
                      <button
                        key={d.k}
                        onClick={() => handleSelectK(d.k)}
                        className={btnStyle}
                      >
                        {d.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dual Line Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* RMSE Chart */}
                <div className="bg-[#080b13] border border-slate-800 p-2.5 flex flex-col">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-cyan-400 font-bold">RMSE TREND (k=1..5)</span>
                    <span className="text-[9px] bg-cyan-950 text-cyan-300 border border-cyan-500/50 px-1 rounded">LOWER IS BETTER</span>
                  </div>
                  <canvas ref={rmseCanvasRef} width={340} height={180} className="w-full h-auto bg-[#05070e] border border-slate-900" />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span className="text-emerald-400">★ k=2: Min RMSE ($8,199)</span>
                    <span className="text-amber-400">⚠ k=5: Cliff ($9,138)</span>
                  </div>
                </div>

                {/* R-squared Chart */}
                <div className="bg-[#080b13] border border-slate-800 p-2.5 flex flex-col">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-[#ccff00] font-bold">R-SQUARED TREND (k=1..5)</span>
                    <span className="text-[9px] bg-yellow-950 text-yellow-300 border border-yellow-500/50 px-1 rounded">HIGHER IS BETTER</span>
                  </div>
                  <canvas ref={r2CanvasRef} width={340} height={180} className="w-full h-auto bg-[#05070e] border border-slate-900" />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span className="text-emerald-400">★ k=2: Peak R² (0.9474)</span>
                    <span className="text-amber-400">⚠ k=5: Drop (0.9347)</span>
                  </div>
                </div>
              </div>

              {/* OLS Equation Card (CRT Terminal Font) */}
              {(() => {
                const currentKData = K_PROGRESSION_DATA.find(d => d.k === selectedK) || K_PROGRESSION_DATA[1];
                return (
                  <div className="bg-[#020704] border-2 border-[#005522] p-3 text-emerald-400 font-mono shadow-[inset_0_0_20px_rgba(0,255,102,0.15)] relative">
                    <div className="flex justify-between text-xs border-b border-[#004d1f] pb-1 mb-2">
                      <span>TERMINAL: OLS_REGRESSION_EQUATION // k = {currentKData.k}</span>
                      <span className={currentKData.isSweetSpot ? "text-emerald-300 font-bold" : (currentKData.isOverfitCliff ? "text-amber-400 font-bold" : "text-cyan-300")}>
                        {currentKData.isSweetSpot ? "[★ OPTIMAL SWEET SPOT]" : (currentKData.isOverfitCliff ? "[⚠ OVERFITTING CLIFF]" : `[k=${currentKData.k}]`)}
                      </span>
                    </div>

                    <div className="text-sm sm:text-base font-bold text-white drop-shadow-[0_0_8px_#00ff66] bg-[#00140a] p-2 border border-[#00441a] mb-2 leading-relaxed">
                      {currentKData.formula}
                    </div>

                    <div className="flex flex-wrap items-center justify-between text-xs pt-1 border-t border-[#00441a] text-slate-400 gap-2">
                      <div>
                        <span>RMSE: <b className="text-emerald-400">${currentKData.rmse.toFixed(2)}</b></span>
                        <span className="ml-3">R²: <b className="text-[#ccff00]">{currentKData.r2.toFixed(4)}</b></span>
                      </div>
                      <p className="text-[11px] text-emerald-300/80 italic">{currentKData.insight}</p>
                    </div>
                  </div>
                );
              })()}

            </div>
          </div>

          {/* Arcade Machine Calculator */}
          <div className="bg-[#111422] border-2 border-[#ff007f] p-4 shadow-[0_0_15px_rgba(255,0,127,0.3)]">
            <div className="bg-[#02140c] border border-[#006629] p-3 text-[#00ff66] mb-4 shadow-inner">
              <div className="flex justify-between text-xs border-b border-[#004d1f] pb-1 mb-2">
                <span>STARTUP_PROFIT_CALCULATOR // {selectedModel.name}</span>
                <span>CONFIDENCE: 95%</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-sm">PREDICTED PROFIT:</span>
                <span className="text-3xl font-black text-white drop-shadow-[0_0_10px_#00ff66]">
                  ${predictedProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div className="bg-[#0d101d] border border-cyan-500/40 p-2">
                <label className="text-[10px] text-slate-400 block mb-1">R&amp;D SPEND ($)</label>
                <input 
                  type="number" value={rd} onChange={e => setRd(Number(e.target.value))}
                  className="w-full bg-[#182035] text-white p-1 text-sm border border-slate-700 focus:border-cyan-400 outline-none"
                />
              </div>
              <div className="bg-[#0d101d] border border-pink-500/40 p-2">
                <label className="text-[10px] text-slate-400 block mb-1">ADMINISTRATION ($)</label>
                <input 
                  type="number" value={admin} onChange={e => setAdmin(Number(e.target.value))}
                  className="w-full bg-[#182035] text-white p-1 text-sm border border-slate-700 focus:border-pink-400 outline-none"
                />
              </div>
              <div className="bg-[#0d101d] border border-yellow-500/40 p-2">
                <label className="text-[10px] text-slate-400 block mb-1">MARKETING ($)</label>
                <input 
                  type="number" value={mkt} onChange={e => setMkt(Number(e.target.value))}
                  className="w-full bg-[#182035] text-white p-1 text-sm border border-slate-700 focus:border-yellow-400 outline-none"
                />
              </div>
            </div>

            <button 
              onClick={computePrediction}
              className="w-full bg-gradient-to-r from-[#ff007f] to-[#b30059] border-2 border-pink-300 text-white font-bold py-2.5 shadow-[0_4px_0_#59002c] active:translate-y-1 active:shadow-none transition-all"
            >
              &#9654; RUN_PREDICTION.BAT [COMPUTE PROFIT]
            </button>
          </div>

          {/* Scatter Chart & Outliers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Scatter Canvas */}
            <div className="bg-[#0b0e19] border border-slate-800 p-3">
              <div className="text-xs text-cyan-400 font-bold mb-2 flex justify-between">
                <span>ACTUAL vs PREDICTED ($k)</span>
                <span className="text-[10px] text-slate-500">45° Line</span>
              </div>
              <canvas ref={canvasRef} width={340} height={200} className="w-full h-auto bg-[#07090f] border border-slate-900" />
            </div>

            {/* Outliers Preview */}
            <div className="bg-[#07090f] border border-yellow-500/40 p-3 overflow-y-auto max-h-[240px]">
              <div className="text-xs text-[#ccff00] font-bold mb-2">TOP OUTLIERS (RESIDUALS)</div>
              <table className="w-full text-[10px] text-left text-slate-300">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500">
                    <th>#ID</th>
                    <th>STATE</th>
                    <th>ACTUAL</th>
                    <th>RESIDUAL</th>
                  </tr>
                </thead>
                <tbody>
                  {OUTLIERS.slice(0, 5).map(o => (
                    <tr key={o.id} className="border-b border-slate-900/60">
                      <td className="py-1">#{o.id}</td>
                      <td>{o.state}</td>
                      <td>${o.actual.toLocaleString()}</td>
                      <td className={o.res < 0 ? 'text-[#ff007f]' : 'text-emerald-400'}>
                        {o.res > 0 ? '+' : ''}${o.res.toFixed(0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
