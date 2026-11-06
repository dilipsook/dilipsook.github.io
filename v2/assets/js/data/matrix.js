/**
 * THE SYSTEMS MATRIX
 * Categorized grid of specialized architectures, systems, and engineering frameworks
 */

export const systemsCategories = [
  { id: "all", label: "All Systems (6)" },
  { id: "multi-cloud", label: "Multi-Cloud & Migration" },
  { id: "finops", label: "FinOps & Optimization" },
  { id: "compliance", label: "Compliance & Security" },
  { id: "automation", label: "DevOps & Automation" }
];

export const systemsMatrix = [
  {
    id: "sys-01",
    sysNumber: "#SYS-01",
    kicker: "Multi-Cloud Architecture",
    category: "multi-cloud",
    title: "Enterprise Multi-Account Landing Zone",
    summary: "Standardized multi-cloud landing zone foundation built with AWS Control Tower, Organizations, and Azure Management Groups.",
    details: "Establishes institutional governance across hundreds of cloud accounts. Implements central log archiving, identity federation via AWS IAM Identity Center and Entra ID, mandatory Service Control Policies (SCPs), and hub-and-spoke transit networking.",
    tags: ["AWS Organizations", "Azure Management Groups", "Terraform", "Transit Gateway", "IAM Identity Center"],
    status: "PRODUCTION_ACTIVE",
    impact: "100% Centralized Governance across 50+ Accounts"
  },
  {
    id: "sys-02",
    sysNumber: "#SYS-02",
    kicker: "FinOps & Optimization",
    category: "finops",
    title: "Autonomous Cloud FinOps Pipeline",
    summary: "Algorithmic cloud financial management engine delivering verified $60K+/month capital reduction through continuous optimization.",
    details: "Combines Athena SQL telemetry over Cost and Usage Reports (CUR), automated Graviton migration scripts, EBS volume type modernization (gp2 -> gp3), scheduled dev/stage resource stop/starts, and dynamic commitment coverage modeling.",
    tags: ["AWS CUR", "Amazon Athena", "Lambda EventBridge", "Cost Explorer", "Savings Plans"],
    status: "OPTIMIZATION_ACTIVE",
    impact: "$60,000+/Month Documented Savings"
  },
  {
    id: "sys-03",
    sysNumber: "#SYS-03",
    kicker: "Compliance & Life Sciences",
    category: "compliance",
    title: "GxP & 21 CFR Part 11 Validated Framework",
    summary: "Regulated cloud architecture engineered specifically for global pharmaceutical and Life Sciences LabWare LIMS environments.",
    details: "Features qualification documentation (IQ/OQ/PQ support), immutable cryptographic audit logging, automated disaster recovery testing, and segregated validation staging to meet FDA 21 CFR Part 11 and EU Annex 11 standards without compromise.",
    tags: ["LabWare LIMS", "21 CFR Part 11", "GxP Validation", "AWS S3 Object Lock", "CloudTrail Vault"],
    status: "GxP_VALIDATED",
    impact: "Zero Regulatory Findings across 1,000+ Servers"
  },
  {
    id: "sys-04",
    sysNumber: "#SYS-04",
    kicker: "DevOps & Automation",
    category: "automation",
    title: "GitOps Infrastructure as Code (IaC) Pipeline",
    summary: "Modular multi-cloud Terraform and CI/CD automation engine eliminating configuration drift and accelerating release cycles.",
    details: "Enforces declarative state management with remote backend state locking, automated pull-request plan validation, security scanning with tfsec/Checkov, and blue/green deployment orchestration across AWS and Azure environments.",
    tags: ["Terraform", "GitOps", "GitHub Actions", "Docker", "Ansible"],
    status: "DRIFT_PROTECTION_ON",
    impact: "Deployment cycle reduced from weeks to minutes"
  },
  {
    id: "sys-05",
    sysNumber: "#SYS-05",
    kicker: "Multi-Cloud & Migration",
    category: "multi-cloud",
    title: "Active-Passive Cross-Cloud Disaster Recovery",
    summary: "Mission-critical disaster recovery architecture ensuring near-zero RPO and sub-15 minute RTO across AWS and Azure regions.",
    details: "Continuous block-level replication, automated Route 53 health checking with automatic DNS failover, pre-warmed database read replicas, and scheduled chaos engineering drills to guarantee business continuity during outages.",
    tags: ["AWS Route 53", "Azure Site Recovery", "Aurora Global DB", "EBS Replication"],
    status: "RTO_<15MIN",
    impact: "99.999% Service Continuity Guarantee"
  },
  {
    id: "sys-06",
    sysNumber: "#SYS-06",
    kicker: "Compliance & Security",
    category: "compliance",
    title: "Zero-Trust Cloud Security & CSPM Posture",
    summary: "Hardened security posture with real-time anomaly detection, centralized key management, and automated remediation.",
    details: "Deploys AWS Security Hub, Amazon GuardDuty, AWS WAF, and Azure Defender. Enforces zero-trust network microsegmentation, automated TLS 1.3 certificate rotation, and KMS envelope encryption across all data at rest and in transit.",
    tags: ["AWS Security Hub", "GuardDuty", "AWS KMS", "WAF", "Zero-Trust"],
    status: "ZERO_TRUST_ENFORCED",
    impact: "100% CIS AWS Foundations Benchmark compliance"
  }
];
