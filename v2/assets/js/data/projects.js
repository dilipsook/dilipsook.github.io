/**
 * FLAGSHIP DEPLOYMENTS (REAL AUTHENTIC CASE STUDIES)
 * Structured matching the video: 1 Primary Featured Ecosystem + 3-Column Grid below
 */

export const primaryFlagship = {
  id: "flagship-primary",
  tag: "CORE ECOSYSTEM",
  hardwareTag: "INFRASTRUCTURE: AWS HYBRID DIRECTCONNECT • AZURE EXPRESSROUTE",
  title: "Cognizant ISG LSMG — LabWare Cloud Transformation",
  client: "Cognizant / Global Pharmaceutical Client (Johnson & Johnson)",
  year: "2023 — Present",
  status: "SOVEREIGN SILICON ACTIVE",
  summary: "A persistent, validated hybrid cloud modernization program migrating mission-critical LabWare Laboratory Information Management Systems (LIMS) across AWS and Microsoft Azure without business interruption.",
  metrics: [
    { num: "1,000+", label: "Servers Migrated" },
    { num: "99.999%", label: "System Availability" },
    { num: "0", label: "Business Downtime" },
    { num: "21 CFR", label: "Part 11 Compliant" }
  ],
  stackTitle: "7-LAYER ARCHITECTURAL STACK",
  stackSubtitle: "Click layer to inspect implementation",
  stack: [
    { layer: "01. Hybrid Edge Tier", tech: "AWS Direct Connect 10Gbps + Azure ExpressRoute + Transit Gateway with BGP Route Filtering" },
    { layer: "02. Core Compute Tier", tech: "Amazon EC2 C6i/M6i Dedicated Hosts with validated qualification (IQ/OQ/PQ protocols)" },
    { layer: "03. Data Persistence", tech: "Oracle RAC Multi-Node on EC2 with sub-millisecond Flash Storage + AWS RDS Multi-AZ failover" },
    { layer: "04. Compliance Guardrails", tech: "AWS Organizations Service Control Policies (SCPs) + Azure Policy with automated drift detection" },
    { layer: "05. Cryptographic Audit", tech: "Immutable WORM audit storage via Amazon S3 Object Lock and CloudTrail multi-region logs" },
    { layer: "06. Microservices & API", tech: "Amazon EKS clusters with Karpenter automated node provisioning and Istio Service Mesh" },
    { layer: "07. Zero-Trust Access", tech: "Identity federation via Entra ID and AWS IAM Identity Center with mandatory MFA and PAM" }
  ]
};

export const secondaryFlagships = [
  {
    id: "flagship-sec-01",
    kicker: "FINOPS // HIGH-CAPITAL ENGINE",
    title: "Dhani Services — Enterprise FinOps Capital Engine",
    summary: "Institutional cloud cost governance architecture delivering verified recurring waste reduction across multi-account enterprise AWS footprint.",
    bullets: [
      "Algorithmic 3-Year Compute Savings Plans & Convertible Reserved Instances",
      "Automated CUR ingestion & Athena SQL telemetry pipeline",
      "$60,000+/month verified recurring cloud capital savings",
      "450+ EC2 instances rightsized and automated GP2 to GP3 storage migration"
    ],
    tags: ["AWS CUR", "Amazon Athena", "Lambda", "FinOps Foundation", "Cost Explorer"]
  },
  {
    id: "flagship-sec-02",
    kicker: "FINTECH // COMMERCIAL RESILIENCE",
    title: "LoanTap — Multi-AZ Resilient Lending Platform",
    summary: "Production containerized microservices ecosystem with automated scaling, sub-50ms API response times, and strict RBI/PCI-DSS regulatory compliance.",
    bullets: [
      "Production container microservices running on Amazon EKS with Karpenter",
      "Sub-50ms loan origination and real-time underwriting decision loops",
      "Multi-AZ Aurora PostgreSQL with zero-data-loss RPO/RTO disaster recovery",
      "Edge security hardening with AWS WAF, Shield Advanced, and CloudFront"
    ],
    tags: ["Amazon EKS", "Aurora PostgreSQL", "AWS WAF", "Terraform", "Docker"]
  },
  {
    id: "flagship-sec-03",
    kicker: "DEFENSE // SOVEREIGN CLOUD",
    title: "ISRO & IAF — High-Security Sovereign Deployments",
    summary: "Air-gapped and hardened cloud landing zones engineered for mission-critical aerospace and national defense operational endpoints.",
    bullets: [
      "Air-gapped Virtual Private Clouds with dedicated AWS CloudHSM modules",
      "100% adherence to CIS AWS Foundations and Military Information Security Standards",
      "WORM-compliant immutable audit vault via Amazon S3 Object Lock",
      "Active Directory Federation Services (ADFS) with strict role-based access"
    ],
    tags: ["AWS CloudHSM", "CIS Hardened", "Zero-Trust", "FIPS 140-2", "WORM Storage"]
  }
];
