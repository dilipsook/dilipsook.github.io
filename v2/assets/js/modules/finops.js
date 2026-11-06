/**
 * FINOPS CAPITAL ROI CALCULATOR MODULE
 * Interactive cloud economic model with real-time savings projection
 */

export function initFinOpsCalculator(sliderId, spendDisplayId, annualOutputId, monthlyOutputId, rightsizingId, spId, wasteId) {
  const slider = document.getElementById(sliderId);
  const spendDisplay = document.getElementById(spendDisplayId);
  const annualOutput = document.getElementById(annualOutputId);
  const monthlyOutput = document.getElementById(monthlyOutputId);
  const rightsizingOut = document.getElementById(rightsizingId);
  const spOut = document.getElementById(spId);
  const wasteOut = document.getElementById(wasteId);

  if (!slider) return;

  function calculate(spend) {
    // Proven enterprise optimization factor ~ 32%
    const totalRate = 0.32;
    const rightsizingRate = 0.12;
    const commitmentsRate = 0.14;
    const wasteReapRate = 0.06;

    const monthlySaved = Math.round(spend * totalRate);
    const annualSaved = monthlySaved * 12;

    const rightsizingSaved = Math.round(spend * rightsizingRate);
    const spSaved = Math.round(spend * commitmentsRate);
    const wasteSaved = Math.round(spend * wasteReapRate);

    // Update displays
    if (spendDisplay) spendDisplay.textContent = `$${spend.toLocaleString()}/mo`;
    if (annualOutput) annualOutput.textContent = `$${annualSaved.toLocaleString()}`;
    if (monthlyOutput) monthlyOutput.textContent = `$${monthlySaved.toLocaleString()}/mo`;
    if (rightsizingOut) rightsizingOut.textContent = `$${rightsizingSaved.toLocaleString()}/mo`;
    if (spOut) spOut.textContent = `$${spSaved.toLocaleString()}/mo`;
    if (wasteOut) wasteOut.textContent = `$${wasteSaved.toLocaleString()}/mo`;
  }

  slider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10) || 150000;
    calculate(val);
  });

  // Initial calculation with default slider value
  calculate(parseInt(slider.value, 10) || 150000);
}
