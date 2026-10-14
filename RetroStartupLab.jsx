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

  const canvasRef = useRef(null);

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
  const computePrediction = () => {
    const c = selectedModel.coefs;
    let pred = selectedModel.intercept + (c["R&D Spend"] * rd) + (c["Administration"] * admin) + (c["Marketing Spend"] * mkt);
    if (selectedModel.features.includes("State_Florida") && state === "Florida") {
      pred += c["State_Florida"];
    } else if (selectedModel.features.includes("State_New York") && state === "New York") {
      pred += c["State_New York"];
    }
    setPredictedProfit(pred);
    playSfx(880, 'sine', 0.2);
  };

  useEffect(() => {
    computePrediction();
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
            </div>
          </div>
        </div>

        {/* Center / Right: Predictor & Charts */}
        <div className="lg:col-span-2 space-y-6">
          
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
