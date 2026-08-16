/* ─── CSS Variables ─── */
:root {
  --primary: #0d3b1e;
  --primary-light: #1a5c32;
  --accent: #d4a843;
  --bg: #f8f9fa;
  --card-bg: #ffffff;
  --text: #1a1a2e;
  --text-light: #666;
  --border: #e0e0e0;
  --radius-sm: 8px;
  --radius-md: 12px;
  --shadow: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.12);
  --transition: all 0.3s ease;
}

/* ─── Reset ─── */
* { margin:0; padding:0; box-sizing:border-box; }
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  min-height: 100vh;
}
a { text-decoration:none; color:inherit; }

/* ─── App Container ─── */
.app-container { max-width:480px; margin:0 auto; background:#fff; min-height:100vh; position:relative; }

/* ─── Header ─── */
.app-header {
  display:flex; justify-content:space-between; align-items:center;
  padding:16px 20px; background:var(--primary); color:#fff;
  position:sticky; top:0; z-index:100;
}
.logo { display:flex; align-items:center; gap:8px; font-size:20px; font-weight:700; }
.logo-icon { font-size:24px; }
.nav-links { display:flex; gap:16px; }
.nav-btn {
  background:none; border:none; color:rgba(255,255,255,0.8);
  font-size:14px; cursor:pointer; padding:4px 8px;
  border-radius:var(--radius-sm); transition:var(--transition);
  font-family:inherit;
}
.nav-btn.active, .nav-btn:hover { color:#fff; background:rgba(255,255,255,0.15); }

/* ─── Pages ─── */
.page { display:none; padding-bottom:80px; }
.page.active { display:block; }

/* ─── Hero ─── */
.hero {
  position:relative; background:linear-gradient(135deg, var(--primary), var(--primary-light));
  color:#fff; padding:60px 24px 40px; text-align:center; overflow:hidden;
}
.hero-pattern {
  position:absolute; inset:0; opacity:0.08;
  background-image: radial-gradient(circle, #fff 1px, transparent 1px);
  background-size: 20px 20px;
}
.hero-content { position:relative; z-index:1; }
.hero-badge {
  display:inline-block; background:rgba(255,255,255,0.15);
  padding:6px 14px; border-radius:20px; font-size:13px; margin-bottom:16px;
}
.hero h1 { font-size:32px; margin-bottom:12px; }
.hero p { font-size:15px; opacity:0.9; margin-bottom:20px; }
.price-tag { margin-bottom:24px; }
.price-new { font-size:36px; font-weight:800; }
.price-label { font-size:16px; opacity:0.8; }
.cta-btn {
  background:var(--accent); color:var(--primary); border:none;
  padding:14px 32px; font-size:16px; font-weight:700;
  border-radius:var(--radius-md); cursor:pointer;
  transition:var(--transition); font-family:inherit;
}
.cta-btn:hover { transform:translateY(-2px); box-shadow:var(--shadow-lg); }

/* ─── Features ─── */
.features { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; padding:20px; }
.feature-card {
  background:var(--card-bg); border-radius:var(--radius-md);
  padding:20px 12px; text-align:center; box-shadow:var(--shadow);
}
.feature-icon { font-size:28px; margin-bottom:8px; }
.feature-card h3 { font-size:14px; margin-bottom:4px; }
.feature-card p { font-size:12px; color:var(--text-light); }

/* ─── About ─── */
.about-section { padding:20px; }
.about-section h3 { color:var(--primary); margin-bottom:10px; font-size:18px; }
.about-section p { color:var(--text-light); font-size:14px; }

/* ─── Courts Page ─── */
.page-title { padding:20px; font-size:22px; color:var(--primary); }
.date-selector { display:flex; gap:10px; padding:0 20px 16px; overflow-x:auto; }
.date-btn {
  flex:1; min-width:80px; background:#fff; border:2px solid var(--border);
  border-radius:var(--radius-md); padding:10px; text-align:center;
  cursor:pointer; transition:var(--transition); font-family:inherit; font-size:14px;
}
.date-btn.active { border-color:var(--primary); background:var(--primary); color:#fff; }
.date-btn small { font-size:12px; opacity:0.7; }

/* ─── Single Court ─── */
.single-court { margin:0 20px 20px; border-radius:var(--radius-md); overflow:hidden; box-shadow:var(--shadow); }
.court-hero { position:relative; height:200px; background:var(--primary); overflow:hidden; }
.court-visual { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; }
.court-surface {
  width:140px; height:220px; background:#2d7a3e; border:3px solid #fff;
  border-radius:4px; position:relative; transform:rotate(15deg);
}
.court-line { position:absolute; background:rgba(255,255,255,0.6); }
.court-line-h { width:100%; height:2px; top:50%; left:0; transform:translateY(-50%); }
.court-line-v { width:2px; height:40%; top:30%; left:50%; transform:translateX(-50%); }
.court-net {
  position:absolute; width:110%; height:4px; background:#fff;
  top:50%; left:-5%; transform:translateY(-50%);
  background: repeating-linear-gradient(90deg, #fff 0px, #fff 4px, transparent 4px, transparent 8px);
}
.court-ball { position:absolute; width:10px; height:10px; background:#d4a843; border-radius:50%; top:20%; right:20%; }
.court-overlay {
  position:absolute; bottom:0; left:0; right:0;
  background:linear-gradient(transparent, rgba(0,0,0,0.7));
  padding:20px; color:#fff;
}
.court-rating { font-size:14px; margin-top:4px; }

.court-details { padding:20px; background:#fff; }
.detail-row {
  display:flex; justify-content:space-between; padding:10px 0;
  border-bottom:1px solid var(--border); font-size:14px;
}
.detail-row:last-child { border-bottom:none; }
.detail-label { color:var(--text-light); }
.detail-value { font-weight:600; }
.detail-value.highlight { color:var(--primary); font-size:16px; }
.price-row { background:#f0f7f0; margin:0 -20px; padding:10px 20px; }

.book-btn-large {
  width:100%; margin-top:16px; background:var(--primary); color:#fff;
  border:none; padding:14px; border-radius:var(--radius-md);
  font-size:16px; font-weight:700; cursor:pointer;
  display:flex; align-items:center; justify-content:center; gap:8px;
  transition:var(--transition); font-family:inherit;
}
.book-btn-large:hover { background:var(--primary-light); }
.arrow { font-size:18px; }

/* ─── Modals ─── */
.modal {
  display:none; position:fixed; inset:0; z-index:200;
  background:rgba(0,0,0,0.5); align-items:center; justify-content:center;
  padding:20px;
}
.modal.active { display:flex; }
.modal-content {
  background:#fff; border-radius:var(--radius-md); width:100%; max-width:420px;
  max-height:90vh; overflow-y:auto; padding:24px; position:relative;
}
.close-btn {
  position:absolute; top:12px; left:12px; background:none; border:none;
  font-size:24px; cursor:pointer; color:var(--text-light);
}
.modal-header { text-align:center; margin-bottom:20px; }
.modal-header h2 { color:var(--primary); font-size:22px; }
.modal-subtitle { color:var(--text-light); font-size:14px; margin-top:4px; }

/* ─── Booking Form ─── */
.booking-form { display:flex; flex-direction:column; gap:14px; }
.form-group { display:flex; flex-direction:column; gap:6px; }
.form-group label { font-size:14px; font-weight:600; color:var(--text); }
.form-group input, .form-group select {
  padding:12px; border:2px solid var(--border); border-radius:var(--radius-sm);
  font-size:15px; font-family:inherit; transition:var(--transition);
}
.form-group input:focus, .form-group select:focus {
  outline:none; border-color:var(--primary);
}
.time-slots { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }
.time-slot {
  padding:10px; border:2px solid var(--border); border-radius:var(--radius-sm);
  background:#fff; cursor:pointer; font-size:13px; font-family:inherit;
  transition:var(--transition);
}
.time-slot:hover { border-color:var(--primary-light); }
.time-slot.selected { background:var(--primary); color:#fff; border-color:var(--primary); }
.time-slot.booked { background:#ffebee; color:#c62828; border-color:#ffcdd2; cursor:not-allowed; opacity:0.7; }

.price-summary {
  background:#f8f9fa; border-radius:var(--radius-md); padding:16px;
  margin-top:8px;
}
.price-summary .price-row {
  display:flex; justify-content:space-between; padding:6px 0;
  font-size:14px;
}
.price-summary .price-row.total {
  border-top:2px solid var(--border); margin-top:8px; padding-top:10px;
  font-size:18px; font-weight:700; color:var(--primary);
}

.pay-btn {
  width:100%; background:var(--primary); color:#fff; border:none;
  padding:14px; border-radius:var(--radius-md); font-size:16px;
  font-weight:700; cursor:pointer; transition:var(--transition);
  font-family:inherit;
}
.pay-btn:hover { background:var(--primary-light); transform:translateY(-1px); }

/* ─── Success Modal ─── */
.success-content { text-align:center; }
.success-icon { font-size:60px; margin-bottom:12px; }
.success-content h2 { color:var(--primary); margin-bottom:8px; }
.booking-details {
  background:#f8f9fa; border-radius:var(--radius-md); padding:16px;
  margin:16px 0; text-align:right; font-size:14px;
}
.booking-details div { padding:4px 0; }

/* ─── Bookings Page ─── */
.bookings-list { padding:0 20px; }
.booking-card {
  background:#fff; border-radius:var(--radius-md); padding:16px;
  margin-bottom:12px; box-shadow:var(--shadow);
  display:flex; justify-content:space-between; align-items:center;
}
.booking-info h4 { color:var(--primary); margin-bottom:6px; }
.booking-info p { font-size:13px; color:var(--text-light); margin-bottom:2px; }
.booking-status {
  background:#e8f5e9; color:#2e7d32; padding:6px 12px;
  border-radius:20px; font-size:12px; font-weight:600;
}

.empty-state { text-align:center; padding:60px 20px; }
.empty-icon { font-size:60px; margin-bottom:12px; }
.empty-state p { color:var(--text-light); margin-bottom:20px; }

/* ─── Footer ─── */
.app-footer {
  text-align:center; padding:30px 20px; background:var(--primary); color:#fff;
}
.footer-logo { font-size:18px; font-weight:700; margin-bottom:8px; }
.app-footer p { font-size:13px; opacity:0.8; margin-bottom:8px; }
.app-footer a { color:var(--accent); }
.whatsapp-btn {
  display:inline-block; background:#25d366; color:#fff;
  padding:10px 20px; border-radius:var(--radius-md);
  margin-top:10px; font-weight:600;
}
.copyright { font-size:11px; opacity:0.6; margin-top:16px; }

/* ─── Stripe Payment Styles ─── */
.payment-summary-box {
  background: linear-gradient(135deg, #f8fff8, #e8f5e9);
  padding: 20px;
  border-radius: var(--radius-md);
  margin-bottom: 20px;
  border: 1px solid #c8e6c9;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
  color: #555;
  border-bottom: 1px dashed #e0e0e0;
}

.summary-row:last-child {
  border-bottom: none;
}

.summary-row.total {
  border-top: 2px solid var(--primary-light);
  margin-top: 8px;
  padding-top: 12px;
  font-size: 18px;
  font-weight: bold;
  color: var(--primary);
}

#payment-element-container {
  margin: 20px 0;
}

#payment-element {
  margin-bottom: 16px;
}

.payment-message {
  text-align: center;
  font-size: 14px;
  margin: 10px 0;
  min-height: 20px;
}

.payment-message.error {
  color: #d32f2f;
  background: #ffebee;
  padding: 10px;
  border-radius: 8px;
}

.payment-message.success {
  color: #2e7d32;
  background: #e8f5e9;
  padding: 10px;
  border-radius: 8px;
}

.stripe-pay-btn {
  background: linear-gradient(135deg, #635bff, #0a2540) !important;
  margin-top: 10px;
}

.stripe-pay-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 91, 255, 0.3);
}

.stripe-pay-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.hidden {
  display: none !important;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0;
  color: #888;
  font-size: 14px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e0e0e0;
}

.divider span {
  padding: 0 10px;
}

.whatsapp-alt-btn {
  width: 100%;
  background: white;
  border: 2px solid #25d366;
  color: #25d366;
  padding: 12px;
  font-size: 15px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition);
  font-weight: bold;
  font-family: inherit;
}

.whatsapp-alt-btn:hover {
  background: #25d366;
  color: white;
}

/* ─── Responsive ─── */
@media (max-width: 600px) {
  .features { grid-template-columns:1fr; }
  .time-slots { grid-template-columns:repeat(3,1fr); }
}
