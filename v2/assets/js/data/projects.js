/**
 * FLAGSHIP DEPLOYMENTS (REAL AUTHENTIC CASE STUDIES)
 */

export const flagshipProjects = [
  {
    id: "flagship-01",
    tag: "LIFE SCIENCES PRACTICE // GLOBAL MIGRATION",
    title: "Cognizant ISG LSMG — LabWare Cloud Transformation",
    client: "Cognizant / Global Pharmaceutical Client (Johnson & Johnson)",
    category: "Multi-Cloud & Compliance",
    year: "2023 - Present",
    badge: "CORE ECOSYSTEM",
    status: "SOVEREIGN SILICON ACTIVE",
    summary: "Large-scale hybrid cloud modernization and migration of GxP-validated LabWare LIMS environments across AWS and Microsoft Azure.",
    description: "Architected and executed an enterprise-grade cloud modernization program migrating mission-critical LabWare Laboratory Information Management Systems (LIMS). Engineered zero-downtime cutover workflows ensuring strict adherence to FDA 21 CFR Part 11, GxP guidelines, and EU Annex 11 validation protocols.",
    metrics: [
      { num: "1,000+", label: "Servers Migrated" },
      { num: "99.999%", label: "System Availability" },
      { num: "0", label: "Business Interruption" },
      { num: "21 CFR", label: "Part 11 Compliant" }
    ],
    stack: [
      { layer: "01. Hybrid Edge", tech: "AWS Direct Connect + Azure ExpressRoute + Transit Gateway" },
      { layer: "02. Core Compute", tech: "Amazon EC2 C6i/M6i Instances + Azure Dedicated Hosts (Validated)" },
      { layer: "03. Data Tier", tech: "Oracle RAC on EC2 with Flash Storage + AWS RDS Multi-AZ" },
      { layer: "04. Governance", tech: "AWS Organizations SCPs + Azure Policy + CloudTrail Immutable Vault" }
    ],
    tools: ["AWS Direct Connect", "Azure ExpressRoute", "Oracle RAC", "Terraform", "GxP Compliance", "AWS Transit Gateway"],
    featured: true
  },
  {
    id: "flagship-02",
    tag: "FINOPS & CAPITAL OPTIMIZATION // RECURRING ROI",
    title: "Dhani Services — Enterprise FinOps Capital Engine",
    client: "Dhani Services Ltd (FinTech & Healthcare)",
    category: "FinOps & Cost Governance",
    year: "2021 - 2023",
    badge: "INSTITUTIONAL SAVINGS",
    status: "OPTIMIZATION PIPELINE RUNNING",
    summary: "Institutional FinOps architecture delivering $60,000+/month in verified recurring cloud waste reduction.",
    description: "Designed and implemented an automated cloud economic governance framework across multi-account AWS organizations. Introduced algorithmic commitment planning (Savings Plans, 3-Yr Convertible RIs), automated idle resource reap, Graviton processor migration, and GP2-to-GP3 storage volume conversion.",
    metrics: [
      { num: "$60K+/mo", label: "Verified Savings" },
      { num: "38%", label: "Infrastructure Cost Cut" },
      { num: "450+", label: "EC2 Rightsized" },
      { num: "100%", label: "Budget Attribution" }
    ],
    stack: [
      { layer: "01. Telemetry", tech: "AWS Cost & Usage Reports (CUR) + Athena SQL Analytics" },
      { layer: "02. Governance", tech: "Custom AWS Budgets with SNS Automated Webhook Triggers" },
      { layer: "03. Modernization", tech: "AWS Graviton 2/3 Migration + GP3 Volume Automation via Lambda" },
      { layer: "04. Coverage", tech: "Algorithmic 3-Year Compute Savings Plans & Reserved Instances" }
    ],
    tools: ["AWS Cost Explorer", "AWS CUR", "Amazon Athena", "AWS Lambda", "FinOps Foundation", "Terraform"],
    featured: true
  },
  {
    id: "flagship-03",
    tag: "FINTECH CLOUD INFRASTRUCTURE // HIGH AVAILABILITY",
    title: "LoanTap — Multi-AZ Resilient Lending Platform",
    client: "LoanTap Financial Technologies",
    category: "Cloud Native & Microservices",
    year: "2019 - 2021",
    badge: "HIGH AVAILABILITY",
    status: "SUB-50MS EVENT LOOPS",
    summary: "Production containerized microservices ecosystem with automated scaling, sub-50ms API response, and PCI-DSS compliance.",
    description: "Architected end-to-end cloud infrastructure for rapid loan origination and scoring. Deployed highly resilient multi-Availability Zone AWS Elastic Kubernetes Service (EKS) clusters with API Gateway, Aurora PostgreSQL Multi-Master, and AWS WAF edge protection.",
    metrics: [
      { num: "< 50ms", label: "API Latency" },
      { num: "99.99%", label: "Platform Uptime" },
      { num: "0-Loss", label: "Disaster Recovery" },
      { num: "PCI-DSS", label: "Security Compliant" }
    ],
    stack: [
      { layer: "01. Ingress & Edge", tech: "AWS CloudFront CDN + AWS WAF + Route 53 Latency Routing" },
      { layer: "02. Orchestration", tech: "Amazon EKS Microservices + Karpenter Autoscaling" },
      { layer: "03. Persistence", tech: "Amazon Aurora PostgreSQL Multi-AZ + DynamoDB Cache" },
      { layer: "04. CI/CD Pipeline", tech: "GitOps with ArgoCD + HashiCorp Terraform + Vault" }
    ],
    tools: ["Amazon EKS", "AWS WAF", "Aurora PostgreSQL", "Docker", "Terraform", "CloudWatch"],
    featured: true
  },
  {
    id: "flagship-04",
    tag: "SOVEREIGN DEFENSE & RESEARCH // HARDENED PERIMETER",
    title: "ISRO & IAF — High-Security Cloud Deployments",
    client: "ISRO & Indian Air Force",
    category: "Sovereign Cloud & Security",
    year: "2018 - 2020",
    badge: "ZERO-TRUST PERIMETER",
    status: "AIR-GAPPED PROTOCOLS",
    summary: "Air-gapped and hardened cloud landing zones engineered for mission-critical aerospace and defense workloads.",
    description: "Designed ultra-secure isolated cloud environments adhering strictly to government sovereignty directives and military-grade information security standards. Implemented hardware security modules (HSM), automated cryptographic access barriers, and air-gapped monitoring telemetry.",
    metrics: [
      { num: "Air-Gapped", label: "Network Isolation" },
      { num: "100%", label: "CIS Benchmark" },
      { num: "Zero", label: "Security Incidents" },
      { num: "FIPS 140-2", label: "Cryptographic Tier" }
    ],
    stack: [
      { layer: "01. Perimeter", tech: "Air-gapped Virtual Private Clouds + Next-Gen Firewall (NGFW)" },
      { layer: "02. Cryptography", tech: "AWS CloudHSM + Dedicated Hardware Key Management" },
      { layer: "03. Identity", tech: "Active Directory Federation Services (ADFS) + Strict RBAC" },
      { layer: "04. Auditability", tech: "WORM-compliant S3 Object Lock + Real-time SIEM Integration" }
    ],
    tools: ["AWS CloudHSM", "CIS Benchmarks", "Hardened Linux", "Active Directory", "WORM Storage"],
    featured: true
  }
];
