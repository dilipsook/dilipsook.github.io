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

  window.openTerminal = openTerminal;
  window.closeTerminal = closeTerminal;

  document.querySelectorAll('#openTerminalBtn, .open-terminal-trigger, [data-action="open-terminal"]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openTerminal();
    });
  });
  closeBtn?.addEventListener('click', closeTerminal);
  terminalModal.addEventListener('click', (e) => {
    if (e.target === terminalModal) closeTerminal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && terminalModal.classList.contains('open')) closeTerminal();
  });

  const commands = {
    'help': () => `
<div class="term-info">DILIP-CLI v3.0.0 — MULTI-CLOUD ARCHITECTURE &amp; FINOPS CONSOLE:</div>
  <span class="term-cmd">finops</span>         - Run enterprise FinOps governance &amp; optimization model
  <span class="term-cmd">finops-calc &lt;$&gt;</span>  - Calculate instant ROI for any monthly cloud spend (e.g. finops-calc 60000)
  <span class="term-cmd">aws-assess</span>     - Execute AWS Well-Architected Framework 5-pillar health audit
  <span class="term-cmd">migrate</span>        - Run zero-downtime AWS server cutover health check
  <span class="term-cmd">migrate-plan</span>   - Display step-by-step 0-outage migration runbook
  <span class="term-cmd">gxp-audit</span>      - Run Life Sciences 21 CFR Part 11 &amp; GxP regulatory compliance check
  <span class="term-cmd">terraform-spec</span> - Display production IaC Terraform blueprint for Multi-AZ VPC &amp; LIMS
  <span class="term-cmd">certs</span>          - Verify AWS and Microsoft Azure certifications
  <span class="term-cmd">whoami</span>         - Output multi-cloud architect profile JSON
  <span class="term-cmd">skills</span>         - List core multi-cloud engineering stack
  <span class="term-cmd">resume</span>         - Download official PDF resume
  <span class="term-cmd">contact</span>        - Show professional contact channels
  <span class="term-cmd">clear</span>          - Clear terminal window
`,
    'finops': () => `
<div class="term-highlight">RUNNING FINOPS OPTIMIZATION TELEMETRY (AWS &amp; AZURE)...</div>
[✓] Querying AWS Cost Explorer API (30-day trailing metric)...
[✓] Evaluating 150+ EC2 &amp; Azure VM utilization baselines...
[!] Found 42 instances eligible for Graviton/AMD rightsizing.
[!] Identified 14 unattached EBS volumes (gp2) -> Deleted.
[✓] Simulating 3-Year Compute Savings Plans commitment...
------------------------------------------------------------
<span class="term-success">MONTHLY OPTIMIZATION SUMMARY:</span>
  • Compute Rightsizing:        +$12,000 / month
  • Savings Plans &amp; RIs:        +$10,500 / month
  • S3 Intelligent-Tiering:     +$5,500 / month
  ----------------------------------------------------------
  <span class="term-highlight">TOTAL DOCUMENTED IMPACT:     $28,000 / month ($336,000 / yr)</span>
  [STATUS: 100% RECURRENT EFFICIENCY VERIFIED AT DHANI FINANCIAL]
`,
    'aws-assess': () => `
<div class="term-highlight">EXECUTING AWS WELL-ARCHITECTED FRAMEWORK DIAGNOSTIC (5 PILLARS):</div>
  1. OPERATIONAL EXCELLENCE:  [✓ PASS] Infrastructure as Code (Terraform) + CloudWatch Log Alarms
  2. SECURITY:                [✓ PASS] IAM Least-Privilege + KMS Customer-Managed Keys + AWS WAFv2
  3. RELIABILITY:             [✓ PASS] Multi-AZ RDS Aurora Failover (&lt; 30s) + NLB Target Health Checks
  4. PERFORMANCE EFFICIENCY:  [✓ PASS] CloudFront Global Anycast CDN + Auto Scaling Group Scale-Out
  5. COST OPTIMIZATION:       [✓ PASS] 3-Yr Compute Savings Plans + S3 Glacier Instant Retrieval
------------------------------------------------------------
<span class="term-success">READINESS SCORE: 98.4% (ENTERPRISE PRODUCTION HARDENED)</span>
`,
    'migrate': () => `
<div class="term-highlight">RUNNING CLOUD MIGRATION ORCHESTRATION CHECK (AWS MGN / DMS)...</div>
[✓] Target Landing Zone: Multi-AZ AWS VPC (us-east-1a, 1b)
[✓] Continuous Data Replication (CDC): Active (Lag &lt; 100ms)
[✓] Rollback Snapshot: Created &amp; Validated (KMS Encrypted)
[✓] Traffic Routing: Route 53 Weighted DNS Cutover Ready
------------------------------------------------------------
<span class="term-success">MIGRATION STATUS: READY FOR ZERO-DOWNTIME CUTOVER</span>
  • Total Servers Migrated Career: 1,000+
  • Production Outages Incurred:    0
`,
    'migrate-plan': () => `
<div class="term-highlight">ENTERPRISE ZERO-DOWNTIME MIGRATION RUNBOOK (AWS MGN &amp; DMS):</div>
  Phase 1: Agent deployment &amp; continuous block-level sync via AWS MGN.
  Phase 2: Database CDC continuous synchronization using AWS Database Migration Service.
  Phase 3: Launch staging test instances in isolated subnets for UAT signoff.
  Phase 4: Reduce Route 53 DNS TTL from 3600s to 60s 24 hours prior to cutover.
  Phase 5: Maintenance window cutover: Stop writes, verify CDC lag = 0ms, update DNS routing.
  Phase 6: Post-cutover validation &amp; decommission legacy on-premises assets.
<span class="term-success">RESULT: ZERO DATA LOSS &bull; ZERO SERVICE INTERRUPTION</span>
`,
    'gxp-audit': () => `
<div class="term-highlight">LIFE SCIENCES GxP &amp; 21 CFR PART 11 COMPLIANCE SCORECARD:</div>
  [✓] Audit Trail Immutability:     Enforced via AWS CloudTrail with Log File Validation enabled
  [✓] Electronic Signatures:        Compliant with FDA 21 CFR Part 11 requirements
  [✓] Data Integrity (ALCOA+):      Attributable, Legible, Contemporaneous, Original, Accurate
  [✓] Disaster Recovery:            Tested Multi-AZ failover with RTO &lt; 15 min, RPO &lt; 5 min
  [✓] Computer System Validation:   IQ/OQ/PQ executed for Labvantage LIMS cloud environments
<span class="term-success">COMPLIANCE STATUS: FULLY VALIDATED FOR GxP ENTERPRISE OPERATIONS</span>
`,
    'terraform-spec': () => `
<pre class="term-json" style="color: #38bdf8;"># Sample Enterprise Terraform Architecture Blueprint
module "vpc_multi_az" {
  source             = "terraform-aws-modules/vpc/aws"
  name               = "cognizant-lims-prod-vpc"
  cidr               = "10.0.0.0/16"
  azs                = ["us-east-1a", "us-east-1b", "us-east-1c"]
  private_subnets    = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets     = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
  enable_nat_gateway = true
  single_nat_gateway = false # High Availability Multi-AZ NAT
}

resource "aws_lb" "nlb_ingress" {
  name               = "lims-prod-nlb"
  load_balancer_type = "network"
  subnets            = module.vpc_multi_az.public_subnets
  enable_cross_zone_load_balancing = true
}</pre>
`,
    'certs': () => `
<div class="term-highlight">VERIFYING ACTIVE CLOUD CERTIFICATIONS:</div>
  [✓] AWS Certified Solutions Architect – Associate (SAA-C03)
  [✓] AWS Certified SysOps Administrator – Associate (SOA-C02)
  [✓] Microsoft Certified: Azure Administrator Associate (AZ-104)
  [✓] Microsoft Certified: Azure Network Engineer Associate (AZ-700)
  [✓] Microsoft Certified Solutions Associate (MCSA): Windows Server 2016
  <span class="term-success">ALL 5 CREDENTIALS ACTIVE &amp; VERIFIED</span>
`,
    'whoami': () => `
<pre class="term-json">{
  "name": "Dilip Kumar",
  "role": "Manager Project &amp; Multi-Cloud Architect",
  "company": "Cognizant (ISG LSMG LIMS Practice)",
  "experience": "10+ Years",
  "certifications": ["AWS SAA", "AWS SysOps", "AZ-104", "AZ-700", "MCSA 2016"],
  "specialties": ["Multi-Cloud AWS &amp; Azure", "FinOps ($60K/mo Saved)", "Zero-Downtime Migrations", "Life Sciences LIMS Cloud"],
  "enterpriseEnvironments": ["Cognizant", "Johnson &amp; Johnson", "LoanTap", "ISRO (SDSC SHAR)", "Indian Air Force", "Dhani"],
  "focus": "Enterprise Multi-Cloud Architecture, FinOps Governance &amp; Life Sciences LIMS Practice"
}</pre>
`,
    'skills': () => `
<div class="term-info">PRIMARY CLOUD TECHNOLOGY DOMAINS:</div>
  • AWS:           EC2, S3, RDS, Aurora, Lambda, VPC, NLB/ALB, ASG, Route 53, CloudFront, DMS, MGN, EKS, IAM
  • Azure:         VMs, VNets, NSGs, Azure SQL, Blob, Azure Migrate, Cost Management, Entra ID
  • Life Sciences: LIMS &amp; ELN, Labvantage LIMS, GxP &amp; CSV Compliance, 21 CFR Part 11
  • FinOps:        Cost Explorer, Compute Optimizer, Savings Plans, Reserved Instances, S3 Lifecycle
  • DevOps/IaC:    Terraform, CloudFormation, Jenkins, GitHub Actions, Docker, Kubernetes, Bash
  • Systems:       Linux (RHEL/Ubuntu), Windows Server 2016, AD DS, VMware ESXi/Horizon, SAN Storage
`,
    'resume': () => {
      window.open('Dilip_Kumar_Resume.pdf', '_blank');
      return `<span class="term-success">Downloading official executive resume (Dilip_Kumar_Resume.pdf)...</span>`;
    },
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
    const trimmed = rawCmd.trim();
    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    const entry = document.createElement('div');
    entry.className = 'term-entry';
    entry.innerHTML = `<span class="term-prompt">dilip@cloud-arch:~$</span> <span class="term-user-cmd">${rawCmd}</span>`;
    terminalOutput.appendChild(entry);

    if (cmd === 'finops-calc') {
      const spend = parseFloat(arg) || 35000;
      const rightsizing = Math.round(spend * 0.085);
      const savingsPlans = Math.round(spend * 0.14);
      const idleCleanup = Math.round(spend * 0.05);
      const storageTiering = Math.round(spend * 0.045);
      const totalSavings = rightsizing + savingsPlans + idleCleanup + storageTiering;
      const annualSavings = totalSavings * 12;

      const respEl = document.createElement('div');
      respEl.className = 'term-response';
      respEl.innerHTML = `
<div class="term-highlight">DYNAMIC FINOPS PROJECTION FOR $${spend.toLocaleString()}/MONTH BASELINE SPEND:</div>
  • Compute Rightsizing &amp; Graviton:       +$${rightsizing.toLocaleString()}/mo
  • 3-Year Compute Savings Plans:          +$${savingsPlans.toLocaleString()}/mo
  • Idle Resource &amp; Snapshot Cleanup:      +$${idleCleanup.toLocaleString()}/mo
  • S3 Glacier Instant Retrieval Tiering:  +$${storageTiering.toLocaleString()}/mo
----------------------------------------------------------------------
  <span class="term-success">TOTAL ESTIMATED MONTHLY EFFICIENCY:  +$${totalSavings.toLocaleString()}/mo</span>
  <span class="term-highlight">PROJECTED ANNUAL CAPITAL SAVED:      +$${annualSavings.toLocaleString()}/year</span>
`;
      terminalOutput.appendChild(respEl);
    } else if (commands[cmd]) {
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
