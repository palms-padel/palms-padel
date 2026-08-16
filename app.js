/**
 * Palms Padel - Application Logic with Stripe Checkout
 * بادل النخيل - منطق التطبيق مع Stripe Checkout
 * @version 2.1.0 - Stripe Checkout
 */

// ============================================
// CONFIGURATION - عدل هذه القيم
// ============================================
const CONFIG = {
  // Stripe Publishable Key (Test أو Live)
  STRIPE_PUBLIC_KEY: 'pk_test_51U4UKJJ7VFFum3S3wjF8PMVdfVGZdp2J1iQ5VYmvRZFHFwK8R5kI0y0BChW5VRVhk00dwSuuL',

  // EmailJS Configuration
  EMAILJS: {
    serviceID: 'service_palms_padel',
    templateID: 'template_booking_confirm',
    publicKey: 'YOUR_EMAILJS_PUBLIC_KEY'
  },

  // Owner email for notifications
  OWNER_EMAIL: 'sanad.s.alhajri@gmail.com',

  // WhatsApp number
  WHATSAPP_NUMBER: '96877600544'
};

// ============================================
// STATE
// ============================================
const AppState = {
  currentCourt: { id: null, name: '', price: 10 },
  selectedTime: null,
  selectedHours: 1,
  selectedDate: 'اليوم',
  selectedDateObj: new Date(),
  bookings: [],
  bookedSlots: ['10:00', '14:00', '18:00'],
  customer: { name: '', phone: '', email: '' },
  isProcessing: false
};

// ============================================
// UTILS
// ============================================
function formatDate(date) {
  return date.toLocaleDateString('ar-OM', { weekday: 'long', day: 'numeric', month: 'long' });
}

function getDiscountedPrice(hours) {
  const discounts = { 1: 10, 2: 9, 3: 8, 4: 7, 5: 6 };
  return discounts[hours] || Math.max(5, 10 - (hours - 1));
}

function formatPhone(phone) {
  let num = phone.replace(/[^0-9]/g, '');
  if (num.startsWith('0')) num = num.substring(1);
  if (!num.startsWith('968')) num = '968' + num;
  return '+' + num;
}

function getUrlParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// ============================================
// DOM
// ============================================
const DOM = {
  pages: () => document.querySelectorAll('.page'),
  navButtons: () => document.querySelectorAll('.nav-btn'),
  bookingModal: () => document.getElementById('booking-modal'),
  paymentModal: () => document.getElementById('payment-modal'),
  successModal: () => document.getElementById('success-modal'),
  modalTitle: () => document.getElementById('modal-title'),
  courtNameInput: () => document.getElementById('court-name'),
  hoursSelect: () => document.getElementById('hours-select'),
  customerName: () => document.getElementById('customer-name'),
  customerPhone: () => document.getElementById('customer-phone'),
  customerEmail: () => document.getElementById('customer-email'),
  pricePerHour: () => document.getElementById('price-per-hour'),
  hoursCount: () => document.getElementById('hours-count'),
  totalPrice: () => document.getElementById('total-price'),
  bookingDetails: () => document.getElementById('booking-details'),
  bookingsList: () => document.getElementById('bookings-list'),
  timeSlots: () => document.querySelectorAll('.time-slot'),
  dateButtons: () => document.querySelectorAll('.date-btn'),
  payCourt: () => document.getElementById('pay-court'),
  payDate: () => document.getElementById('pay-date'),
  payTime: () => document.getElementById('pay-time'),
  payHours: () => document.getElementById('pay-hours'),
  payAmount: () => document.getElementById('pay-amount'),
  paymentMessage: () => document.getElementById('payment-message'),
  submitBtn: () => document.getElementById('submit-payment-btn'),
  btnText: () => document.getElementById('btn-text'),
  btnSpinner: () => document.getElementById('btn-spinner'),
};

// ============================================
// NAVIGATION
// ============================================
function goToPage(pageId) {
  DOM.pages().forEach(p => p.classList.remove('active'));
  DOM.navButtons().forEach(b => b.classList.remove('active'));
  document.getElementById(`page-${pageId}`)?.classList.add('active');
  document.querySelector(`[data-page="${pageId}"]`)?.classList.add('active');
  if (pageId === 'bookings') renderBookings();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// DATES
// ============================================
function initDates() {
  const today = new Date();
  const dates = [
    { label: 'اليوم', offset: 0 },
    { label: 'غداً', offset: 1 },
    { label: 'بعد غد', offset: 2 }
  ];
  dates.forEach((d, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + d.offset);
    const el = document.getElementById(`date-${i}`);
    if (el) el.textContent = `${date.getDate()} ${date.toLocaleDateString('ar-OM', { month: 'short' })}`;
  });
}

// ============================================
// BOOKING MODAL
// ============================================
function openBooking(courtId, courtName, price) {
  AppState.currentCourt = { id: courtId, name: courtName, price };
  AppState.selectedTime = null;
  AppState.selectedHours = 1;
  DOM.modalTitle().textContent = `حجز ${courtName}`;
  DOM.courtNameInput().value = courtName;
  DOM.hoursSelect().value = '1';
  DOM.timeSlots().forEach(btn => {
    btn.classList.remove('selected');
    if (AppState.bookedSlots.includes(btn.dataset.time)) {
      btn.classList.add('booked');
      btn.disabled = true;
    } else {
      btn.classList.remove('booked');
      btn.disabled = false;
    }
  });
  updatePriceDisplay();
  DOM.bookingModal().classList.add('active');
}

function closeBookingModal() {
  DOM.bookingModal().classList.remove('active');
}

function closePaymentModal() {
  DOM.paymentModal().classList.remove('active');
}

function closeAllModals() {
  [DOM.bookingModal(), DOM.paymentModal(), DOM.successModal()].forEach(m => m?.classList.remove('active'));
}

// ============================================
// PRICE
// ============================================
function updatePriceDisplay() {
  const hours = AppState.selectedHours;
  const pricePerHour = getDiscountedPrice(hours);
  const total = pricePerHour * hours;
  DOM.hoursCount().textContent = hours;
  DOM.totalPrice().textContent = `${total} ر.ع`;
  DOM.pricePerHour().textContent = `${pricePerHour} ر.ع`;
}

// ============================================
// PAYMENT FLOW - STRIPE CHECKOUT
// ============================================
async function goToPayment() {
  const name = DOM.customerName().value.trim();
  const phone = DOM.customerPhone().value.trim();
  const email = DOM.customerEmail().value.trim();

  if (!AppState.selectedTime) {
    alert('الرجاء اختيار وقت الحجز');
    return;
  }
  if (!name || !phone || !email) {
    alert('الرجاء تعبئة جميع البيانات');
    return;
  }
  if (!/^[^@]+@[^@]+$/.test(email)) {
    alert('الرجاء إدخال بريد إلكتروني صحيح');
    return;
  }
  if (phone.replace(/[^0-9]/g, '').length < 8) {
    alert('الرجاء إدخال رقم جوال صحيح');
    return;
  }

  AppState.customer = { name, phone, email };
  const activeDateBtn = document.querySelector('.date-btn.active');
  AppState.selectedDate = activeDateBtn ? activeDateBtn.dataset.date : 'اليوم';

  const today = new Date();
  const offset = activeDateBtn ? [0, 1, 2][Array.from(DOM.dateButtons()).indexOf(activeDateBtn)] : 0;
  AppState.selectedDateObj = new Date(today);
  AppState.selectedDateObj.setDate(today.getDate() + offset);

  closeBookingModal();
  const hours = AppState.selectedHours;
  const pricePerHour = getDiscountedPrice(hours);
  const total = pricePerHour * hours;

  DOM.payCourt().textContent = AppState.currentCourt.name;
  DOM.payDate().textContent = AppState.selectedDate;
  DOM.payTime().textContent = AppState.selectedTime;
  DOM.payHours().textContent = `${hours} ساعة`;
  DOM.payAmount().textContent = `${total} ر.ع`;
  DOM.paymentModal().classList.add('active');
}

async function processStripeCheckout() {
  if (AppState.isProcessing) return;
  AppState.isProcessing = true;
  showLoading(true);
  DOM.paymentMessage().textContent = '';

  try {
    const hours = AppState.selectedHours;
    const pricePerHour = getDiscountedPrice(hours);
    const total = pricePerHour * hours;

    const response = await fetch('/.netlify/functions/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: total,
        court: AppState.currentCourt.name,
        date: AppState.selectedDate,
        time: AppState.selectedTime,
        hours: hours,
        customerName: AppState.customer.name,
        customerEmail: AppState.customer.email,
        customerPhone: formatPhone(AppState.customer.phone)
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error);
    if (data.url) {
      const pendingBooking = {
        court: AppState.currentCourt.name,
        date: AppState.selectedDate,
        time: AppState.selectedTime,
        hours: hours,
        price: total,
        customer: AppState.customer.name,
        phone: formatPhone(AppState.customer.phone),
        email: AppState.customer.email,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('palms_pending_booking', JSON.stringify(pendingBooking));
      window.location.href = data.url;
    } else {
      throw new Error('No checkout URL returned');
    }
  } catch (err) {
    DOM.paymentMessage().textContent = '⚠️ ' + err.message;
    DOM.paymentMessage().className = 'payment-message error';
    showLoading(false);
    AppState.isProcessing = false;
  }
}

// ============================================
// HANDLE PAYMENT RETURN
// ============================================
async function handlePaymentReturn() {
  const success = getUrlParam('success');
  const sessionId = getUrlParam('session_id');
  if (success === '1' && sessionId) {
    const pending = localStorage.getItem('palms_pending_booking');
    if (!pending) return;
    const bookingData = JSON.parse(pending);
    const booking = {
      id: Date.now(),
      ...bookingData,
      paymentId: sessionId,
      paymentStatus: 'succeeded'
    };
    AppState.bookings.push(booking);
    AppState.bookedSlots.push(bookingData.time);
    saveBookings();
    await sendConfirmationEmails(booking);
    showSuccessModal(booking);
    window.history.replaceState({}, document.title, window.location.pathname);
    localStorage.removeItem('palms_pending_booking');
  } else if (getUrlParam('canceled') === '1') {
    alert('تم إلغاء الدفع. يمكنك المحاولة مرة أخرى.');
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

// ============================================
// EMAILJS
// ============================================
async function sendConfirmationEmails(booking) {
  if (!CONFIG.EMAILJS.publicKey || CONFIG.EMAILJS.publicKey.includes('YOUR_')) {
    console.log('EmailJS not configured');
    return;
  }
  try {
    await emailjs.send(CONFIG.EMAILJS.serviceID, CONFIG.EMAILJS.templateID, {
      to_name: booking.customer,
      to_email: booking.email,
      court_name: booking.court,
      booking_date: booking.date,
      booking_time: booking.time,
      booking_hours: booking.hours,
      booking_price: booking.price,
      booking_id: booking.id,
      payment_status: '✅ تم الدفع إلكترونياً - Stripe',
      reply_to: CONFIG.OWNER_EMAIL
    }, CONFIG.EMAILJS.publicKey);

    await emailjs.send(CONFIG.EMAILJS.serviceID, CONFIG.EMAILJS.templateID, {
      to_name: 'Palms Padel Admin',
      to_email: CONFIG.OWNER_EMAIL,
      court_name: booking.court,
      booking_date: booking.date,
      booking_time: booking.time,
      booking_hours: booking.hours,
      booking_price: booking.price,
      customer_name: booking.customer,
      customer_phone: booking.phone,
      customer_email: booking.email,
      booking_id: booking.id,
      payment_status: '✅ دفع إلكتروني - Stripe',
      reply_to: booking.email
    }, CONFIG.EMAILJS.publicKey);
  } catch (e) {
    console.error('EmailJS error:', e);
  }
}

// ============================================
// WHATSAPP FALLBACK
// ============================================
function switchToWhatsApp() {
  closePaymentModal();
  const hours = AppState.selectedHours;
  const pricePerHour = getDiscountedPrice(hours);
  const total = pricePerHour * hours;
  const text = `مرحباً، أريد حجز ملعب Palms Padel:
التاريخ: ${AppState.selectedDate}
الوقت: ${AppState.selectedTime}
المدة: ${hours} ساعة
المبلغ: ${total} ر.ع
الاسم: ${AppState.customer.name}
الجوال: ${formatPhone(AppState.customer.phone)}`;
  window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
}

// ============================================
// STORAGE
// ============================================
function saveBookings() {
  try {
    localStorage.setItem('palms_padel_bookings', JSON.stringify(AppState.bookings));
    localStorage.setItem('palms_padel_booked_slots', JSON.stringify(AppState.bookedSlots));
  } catch (e) { console.error(e); }
}

function loadBookings() {
  try {
    const saved = localStorage.getItem('palms_padel_bookings');
    const savedSlots = localStorage.getItem('palms_padel_booked_slots');
    if (saved) AppState.bookings = JSON.parse(saved);
    if (savedSlots) AppState.bookedSlots = JSON.parse(savedSlots);
  } catch (e) { console.error(e); }
}

// ============================================
// BOOKINGS LIST
// ============================================
function renderBookings() {
  const container = DOM.bookingsList();
  if (AppState.bookings.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🌴</div>
        <p>لا توجد حجوزات حالياً في Palms Padel</p>
        <button class="cta-btn" onclick="goToPage('courts')">احجز ملعبك الآن</button>
      </div>`;
    return;
  }
  container.innerHTML = AppState.bookings.map(b => `
    <div class="booking-card">
      <div class="booking-info">
        <h4>🌴 ${b.court}</h4>
        <p>📅 ${b.date} | 🕐 ${b.time}</p>
        <p>⏱️ ${b.hours} ساعة | 💰 ${b.price} ر.ع</p>
        <p>🎫 رقم الحجز: #${b.id}</p>
        ${b.paymentStatus === 'succeeded' ? '<p style="color:#0d3b1e;">✅ مدفوع إلكترونياً</p>' : ''}
      </div>
      <span class="booking-status">✅ مؤكد</span>
    </div>
  `).join('');
}

function showSuccessModal(booking) {
  DOM.bookingDetails().innerHTML = `
    <div><strong>🌴 الملعب:</strong> ${booking.court}</div>
    <div><strong>📅 التاريخ:</strong> ${booking.date}</div>
    <div><strong>🕐 الوقت:</strong> ${booking.time}</div>
    <div><strong>⏱️ المدة:</strong> ${booking.hours} ساعة</div>
    <div><strong>💰 المبلغ:</strong> ${booking.price} ر.ع</div>
    <div><strong>🎫 رقم الحجز:</strong> #${booking.id}</div>
    <div style="color:#0d3b1e; margin-top:8px;"><strong>✅ تم الدفع إلكترونياً</strong></div>
  `;
  DOM.successModal().classList.add('active');
}

// ============================================
// UI HELPERS
// ============================================
function showLoading(isLoading) {
  if (isLoading) {
    DOM.submitBtn().disabled = true;
    DOM.btnText().classList.add('hidden');
    DOM.btnSpinner().classList.remove('hidden');
  } else {
    DOM.submitBtn().disabled = false;
    DOM.btnText().classList.remove('hidden');
    DOM.btnSpinner().classList.add('hidden');
  }
}

// ============================================
// EVENTS
// ============================================
function initEventListeners() {
  DOM.navButtons().forEach(btn => {
    btn.addEventListener('click', () => goToPage(btn.dataset.page));
  });
  DOM.dateButtons().forEach(btn => {
    btn.addEventListener('click', function() {
      DOM.dateButtons().forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
  DOM.timeSlots().forEach(btn => {
    btn.addEventListener('click', function() {
      if (this.classList.contains('booked')) return;
      DOM.timeSlots().forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');
      AppState.selectedTime = this.dataset.time;
    });
  });
  DOM.hoursSelect().addEventListener('change', function() {
    AppState.selectedHours = parseInt(this.value, 10) || 1;
    updatePriceDisplay();
  });
  DOM.customerPhone().addEventListener('input', function() {
    let val = this.value.replace(/[^0-9]/g, '');
    if (val.length > 8) val = val.substring(0, 8);
    this.value = val;
  });
  DOM.submitBtn().addEventListener('click', processStripeCheckout);
}

// ============================================
// INIT
// ============================================
function initApp() {
  initDates();
  loadBookings();
  initEventListeners();
  handlePaymentReturn();
  if (CONFIG.EMAILJS.publicKey && !CONFIG.EMAILJS.publicKey.includes('YOUR_')) {
    emailjs.init(CONFIG.EMAILJS.publicKey);
  }
  console.log('🌴 Palms Padel App v2.1 - Stripe Checkout initialized');
}

document.addEventListener('DOMContentLoaded', initApp);
