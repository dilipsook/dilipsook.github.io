/* ==========================================================================
   DILIP KUMAR PORTFOLIO — INTERACTIVE FINOPS ROI SIMULATOR
   ========================================================================== */

(function initFinOpsCalculator() {
  const slider = document.getElementById('spendSlider');
  const spendDisplay = document.getElementById('spendDisplay');
  const savingsDisplay = document.getElementById('savingsDisplay');
  const annualSavingsDisplay = document.getElementById('annualSavingsDisplay');

  const computeVal = document.getElementById('valCompute');
  const riVal = document.getElementById('valRI');
  const idleVal = document.getElementById('valIdle');
  const storageVal = document.getElementById('valStorage');

  const barCompute = document.getElementById('barCompute');
  const barRI = document.getElementById('barRI');
  const barIdle = document.getElementById('barIdle');
  const barStorage = document.getElementById('barStorage');

  if (!slider || !spendDisplay || !savingsDisplay) return;

  function formatCurrency(val) {
    return '$' + Math.round(val).toLocaleString();
  }

  function updateCalculator() {
    const monthlySpend = parseFloat(slider.value) || 35000;
    spendDisplay.textContent = formatCurrency(monthlySpend);

    // Realistic FinOps optimization ratios achieved by Dilip in production:
    // Compute Rightsizing & Graviton: ~8.5% of total bill
    // Reserved Instances & Savings Plans: ~14.0% of total bill
    // Idle cleanup, dev scheduling, unused EBS: ~5.0% of total bill
    // S3 lifecycle & Glacier tiering: ~4.5% of total bill
    // Total monthly savings rate: ~32%
    const computeSavings = monthlySpend * 0.085;
    const riSavings = monthlySpend * 0.14;
    const idleSavings = monthlySpend * 0.05;
    const storageSavings = monthlySpend * 0.045;
    const totalMonthlySavings = computeSavings + riSavings + idleSavings + storageSavings;
    const annualSavings = totalMonthlySavings * 12;

    savingsDisplay.textContent = formatCurrency(totalMonthlySavings);
    annualSavingsDisplay.textContent = formatCurrency(annualSavings);

    if (computeVal) computeVal.textContent = formatCurrency(computeSavings) + '/mo';
    if (riVal) riVal.textContent = formatCurrency(riSavings) + '/mo';
    if (idleVal) idleVal.textContent = formatCurrency(idleSavings) + '/mo';
    if (storageVal) storageVal.textContent = formatCurrency(storageSavings) + '/mo';

    // Width percentages
    const maxPart = totalMonthlySavings || 1;
    if (barCompute) barCompute.style.width = Math.min((computeSavings / maxPart) * 100, 100) + '%';
    if (barRI) barRI.style.width = Math.min((riSavings / maxPart) * 100, 100) + '%';
    if (barIdle) barIdle.style.width = Math.min((idleSavings / maxPart) * 100, 100) + '%';
    if (barStorage) barStorage.style.width = Math.min((storageSavings / maxPart) * 100, 100) + '%';
  }

  slider.addEventListener('input', updateCalculator);
  updateCalculator();
})();
