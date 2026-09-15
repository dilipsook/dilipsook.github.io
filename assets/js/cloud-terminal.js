/* ==========================================================================
   INTERACTIVE CLOUD CLI SIMULATOR (dilip-cli v2.4.0)
   Simulated developer terminal with interactive commands and preset chips
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('openTerminalBtn');
  const closeBtn = document.getElementById('closeTerminalBtn');
  const terminalModal = document.getElementById('terminalModal');
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalInput = document.getElementById('terminalInput');
  const quickChips = document.querySelectorAll('.term-chip');

  if (!terminalModal || !terminalOutput || !terminalInput) return;

  function openTerminal() {
    terminalModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => terminalInput.focus(), 150);
  }

  function closeTerminal() {
    terminalModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  openBtn?.addEventListener('click', openTerminal);
  closeBtn?.addEventListener('click', closeTerminal);
  terminalModal.addEventListener('click', (e) => {
    if (e.target === terminalModal) closeTerminal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && terminalModal.classList.contains('open')) closeTerminal();
  });

  const commands = {
    'help': () => `
<div class="term-info">AVAILABLE COMMANDS IN DILIP-CLI v2.4.0:</div>
  <span class="term-cmd">finops</span>     - Run enterprise FinOps cost audit simulation ($60K/mo)
  <span class="term-cmd">migrate</span>    - Run zero-downtime AWS server cutover health check
  <span class="term-cmd">certs</span>      - Verify AWS and Microsoft Azure certifications
  <span class="term-cmd">whoami</span>     - Output multi-cloud architect profile JSON
  <span class="term-cmd">skills</span>     - List core multi-cloud engineering stack
  <span class="term-cmd">contact</span>    - Show direct contact channels
  <span class="term-cmd">clear</span>      - Clear terminal window
`,
    'finops': () => `
<div class="term-highlight">INITIATING FINOPS AUDIT ACROSS AWS & AZURE ACCOUNTS...</div>
[✓] Querying AWS Cost Explorer API (30-day trailing metric)...
[✓] Evaluating 150+ EC2 & Azure VM utilization baselines...
[!] Found 42 instances eligible for Graviton/AMD rightsizing.
[!] Identified 14 unattached EBS volumes (gp2) -> Deleted.
[✓] Simulating 3-Year Compute Savings Plans commitment...
------------------------------------------------------------
<span class="term-success">MONTHLY AUDIT SUMMARY:</span>
  • Compute Rightsizing:        +$12,000 / month
  • Savings Plans & RIs:        +$10,500 / month
  • S3 Intelligent-Tiering:     +$5,500 / month
  ----------------------------------------------------------
  <span class="term-highlight">TOTAL DOCUMENTED SAVINGS:   $28,000 / month ($336,000 / yr)</span>
  [STATUS: 100% RECURRENT ROI VERIFIED]
`,
    'migrate': () => `
<div class="term-highlight">RUNNING CLOUD MIGRATION ORCHESTRATION CHECK (AWS MGN / DMS)...</div>
[✓] Target Landing Zone: Multi-AZ AWS VPC (us-east-1a, 1b)
[✓] Continuous Data Replication (CDC): Active (Lag < 100ms)
[✓] Rollback Snapshot: Created & Validated (KMS Encrypted)
[✓] Traffic Routing: Route 53 Weighted DNS Cutover Ready
------------------------------------------------------------
<span class="term-success">MIGRATION STATUS: READY FOR ZERO-DOWNTIME CUTOVER</span>
  • Total Servers Migrated Career: 1,000+
  • Client Outages Incurred:        0
`,
    'certs': () => `
<div class="term-highlight">VERIFYING ACTIVE CLOUD CERTIFICATIONS:</div>
  [✓] AWS Certified Solutions Architect – Associate (SAA-C03)
  [✓] AWS Certified SysOps Administrator – Associate (SOA-C02)
  [✓] Microsoft Certified: Azure Administrator Associate (AZ-104)
  [✓] Microsoft Certified: Azure Network Engineer Associate (AZ-700)
  [✓] Microsoft Certified Solutions Associate (MCSA): Windows Server 2016
  <span class="term-success">ALL 5 CREDENTIALS ACTIVE & VERIFIED</span>
`,
    'whoami': () => `
<pre class="term-json">{
  "name": "Dilip Kumar",
  "role": "Cloud Solution Specialist",
  "experience": "9+ Years",
  "certifications": ["AWS SAA", "AWS SysOps", "AZ-104", "AZ-700", "MCSA 2016"],
  "specialties": ["Multi-Cloud AWS & Azure", "FinOps ($60K/mo Saved)", "Zero-Downtime Migrations"],
  "keyClients": ["Johnson & Johnson", "LoanTap", "ISRO (SDSC SHAR)", "Indian Air Force", "Dhani"],
  "status": "Available for High-Impact Enterprise Roles"
}</pre>
`,
    'skills': () => `
<div class="term-info">PRIMARY CLOUD TECHNOLOGY DOMAINS:</div>
  • AWS:        EC2, S3, RDS, Aurora, Lambda, VPC, NLB/ALB, ASG, Route 53, CloudFront, DMS, MGN, EKS, IAM
  • Azure:      VMs, VNets, NSGs, Azure SQL, Blob, Azure Migrate, Cost Management, Entra ID
  • FinOps:     Cost Explorer, Compute Optimizer, Savings Plans, Reserved Instances, S3 Lifecycle
  • DevOps/IaC: Terraform, CloudFormation, Jenkins, GitHub Actions, Docker, Kubernetes, Bash
  • Systems:    Linux (RHEL/Ubuntu), Windows Server 2016, AD DS, VMware ESXi/Horizon, SAN Storage
`,
    'contact': () => `
<div class="term-highlight">DIRECT CHANNELS:</div>
  • Email:     dilipsook@gmail.com
  • Phone:     +91-8050898731 / +91-7760220801
  • LinkedIn:  linkedin.com/in/dilipsookk
  • Portfolio: dilipsook.github.io
`,
    'clear': () => {
      terminalOutput.innerHTML = '';
      return '';
    }
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    const entry = document.createElement('div');
    entry.className = 'term-entry';
    entry.innerHTML = `<span class="term-prompt">dilip@cloud-arch:~$</span> <span class="term-user-cmd">${rawCmd}</span>`;
    terminalOutput.appendChild(entry);

    if (commands[cmd]) {
      const responseHtml = commands[cmd]();
      if (responseHtml) {
        const respEl = document.createElement('div');
        respEl.className = 'term-response';
        respEl.innerHTML = responseHtml;
        terminalOutput.appendChild(respEl);
      }
    } else if (cmd !== '') {
      const errEl = document.createElement('div');
      errEl.className = 'term-error';
      errEl.textContent = `Command not found: "${rawCmd}". Type "help" to view available commands.`;
      terminalOutput.appendChild(errEl);
    }

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    terminalInput.value = '';
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(terminalInput.value);
    }
  });

  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) executeCommand(cmd);
    });
  });
});
