/**
 * COMPLETE PROJECTS & FLAGSHIP DEPLOYMENTS DATA
 * Contains 1 Primary Flagship (with 7-Layer Stack), 3 Secondary Flagships, and All 9 Real Missions
 */

export const primaryFlagship = {
  id: "flagship-labware",
  tag: "CORE ECOSYSTEM",
  hardwareTag: "INFRASTRUCTURE: AWS HYBRID DIRECTCONNECT • AZURE EXPRESSROUTE",
  title: "Cognizant ISG LSMG — LabWare Cloud Transformation",
  client: "Cognizant / Global Pharmaceutical Client (Johnson & Johnson)",
  year: "2023 — Present",
  summary: "A persistent, validated hybrid cloud modernization program migrating mission-critical LabWare Laboratory Information Management Systems (LIMS) across AWS and Microsoft Azure without business interruption.",
  metrics: [
    { num: "1,000+", label: "SERVERS MIGRATED" },
    { num: "99.999%", label: "SYSTEM AVAILABILITY" },
    { num: "0", label: "BUSINESS DOWNTIME" },
    { num: "21 CFR", label: "PART 11 COMPLIANT" }
  ],
  stackTitle: "7-LAYER ARCHITECTURAL STACK",
  stackSubtitle: "Click layer to inspect implementation",
  layers: [
    {
      id: "l1",
      layer: "L1: Sovereign Cloud Core",
      category: "LAYER 01 // ENTERPRISE SOVEREIGN FOUNDATION",
      title: "Multi-Account Enterprise Landing Zones",
      description: "AWS Control Tower and Azure Management Groups with strict IAM SCP guardrails, transit gateway mesh, and centralized cryptographic key isolation.",
      chips: ["AWS Control Tower", "Azure Landing Zones", "Terraform Cloud", "Transit Gateway"]
    },
    {
      id: "l2",
      layer: "L2: Hybrid Connectivity",
      category: "LAYER 02 // DEDICATED HYBRID BACKBONE",
      title: "High-Bandwidth Redundant DirectConnect & ExpressRoute",
      description: "Dual 10Gbps AWS DirectConnect and Azure ExpressRoute links connected to on-premises pharmaceutical data centers with automated BGP failover.",
      chips: ["DirectConnect 10G", "ExpressRoute", "BGP Failover", "IPsec VPN Backup"]
    },
    {
      id: "l3",
      layer: "L3: GxP Data Vault",
      category: "LAYER 03 // LIFE SCIENCES COMPLIANCE VAULT",
      title: "Immutable 21 CFR Part 11 Audit Repository",
      description: "S3 Object Lock Compliance Mode, AWS CloudTrail immutable ledger, and KMS customer-managed keys (CMK) ensuring strict non-repudiation.",
      chips: ["S3 Object Lock", "CloudTrail Vault", "KMS CMK", "21 CFR Part 11"]
    },
    {
      id: "l4",
      layer: "L4: Container Orchestration",
      category: "LAYER 04 // MICROSERVICES RUNTIME",
      title: "Production Kubernetes (EKS & AKS)",
      description: "Zero-downtime rolling deployments, Karpenter autoscaling, Cilium eBPF network security policies, and Prometheus/Grafana real-time observability.",
      chips: ["Amazon EKS", "Azure AKS", "Karpenter", "Cilium eBPF"]
    },
    {
      id: "l5",
      layer: "L5: Multi-AZ Relational Core",
      category: "LAYER 05 // HIGH-INTEGRITY PERSISTENCE",
      title: "Mission-Critical Aurora PostgreSQL & Oracle RAC",
      description: "Multi-AZ active-passive database clustering with synchronous cross-zone replication, sub-minute failover, and automated point-in-time recovery (PITR).",
      chips: ["Aurora Multi-AZ", "Oracle RAC", "AWS DMS", "Automated PITR"]
    },
    {
      id: "l6",
      layer: "L6: FinOps Engine",
      category: "LAYER 06 // CAPITAL OPTIMIZATION",
      title: "Autonomous Cloud Cost Governance",
      description: "Algorithmic compute rightsizing, 3-year Compute Savings Plans, GP2 to GP3 automated storage migration, and CUR data lake queries via Athena.",
      chips: ["AWS CUR", "Amazon Athena", "Savings Plans", "FinOps Foundation"]
    },
    {
      id: "l7",
      layer: "L7: Zero-Trust CSPM",
      category: "LAYER 07 // CONTINUOUS POSTURE DEFENSE",
      title: "Continuous Cloud Security & Threat Remediation",
      description: "AWS GuardDuty, Security Hub CIS Benchmark v1.4 compliance automation, AWS WAF rate-limiting, and automated incident response lambdas.",
      chips: ["AWS GuardDuty", "Security Hub", "AWS WAF", "CIS Level 2"]
    }
  ]
};

export const secondaryFlagships = [
  {
    id: "flagship-dhani",
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
    id: "flagship-loantap",
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
    id: "flagship-defense",
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

export const allProjects = [
  {
    id: "jnj",
    title: "Enterprise Labvantage LIMS Infrastructure",
    client: "Johnson & Johnson (via Insight Enterprises)",
    logo: "assets/images/logos/johnson.svg",
    category: "migration enterprise ha",
    categoryLabel: "Cloud Migration & Enterprise",
    impactBadge: "Zero-Downtime Cutover",
    summary: "Designed scalable multi-AZ AWS and Azure infrastructure for J&J's regulated Labvantage LIMS platform. Deployed Oracle WebLogic and Network Load Balancers fronting 10+ servers.",
    achievements: [
      "Single-handedly delivered AWS architecture with zero-downtime cutover",
      "Migrated databases with AWS MGN & AWS DMS replication",
      "Enforced strict compliance using IAM, AWS WAF, and Shield"
    ],
    tags: ["AWS EC2", "Oracle WebLogic", "RDS Multi-AZ", "AWS DMS", "WAF"],
    blueprintDetails: {
      architecture: "Multi-AZ AWS & Azure Regulated Life Sciences Platform",
      sla: "99.99% Availability across dual zones",
      security: "GxP / 21 CFR Part 11 compliant with automated audit logs",
      finops: "Right-sized compute instances saving 18% on monthly infrastructure spend"
    }
  },
  {
    id: "dhani",
    title: "Enterprise Cloud FinOps Transformation",
    client: "Dhani Financial Services",
    logo: "assets/images/logos/dhani.svg",
    category: "finops enterprise",
    categoryLabel: "FinOps & Cost Governance",
    impactBadge: "$28,000 / Month Saved",
    summary: "Spearheaded an exhaustive FinOps optimization initiative across 100+ EC2 instances, eliminating idle resources, purchasing Savings Plans, and re-architecting storage tiers.",
    achievements: [
      "Delivered $28,000/mo in recurring cloud cost reduction",
      "Right-sized 100+ overprovisioned EC2 compute instances",
      "Implemented automated dev/test stop-start schedules"
    ],
    tags: ["Cost Explorer", "Savings Plans", "S3 Glacier", "Athena SQL", "Lambda"],
    blueprintDetails: {
      architecture: "Automated AWS Cost Governance & CUR Analytics Lake",
      sla: "Zero performance impact on production fintech APIs",
      security: "Read-only FinOps billing role with KMS-encrypted reporting",
      finops: "$336,000 annualized net savings across compute, EBS, and network egress"
    }
  },
  {
    id: "loantap",
    title: "Fintech AWS Cloud Footprint & CI/CD",
    client: "LoanTap Financial Technology",
    logo: "assets/images/logos/loantap.svg",
    category: "finops ha migration",
    categoryLabel: "FinTech & CI/CD",
    impactBadge: "Employee of Quarter Award",
    summary: "Built AWS infrastructure from scratch for a high-growth financial technology platform. Configured Nginx, Redis, MySQL, Cloudflare CDN, and automated CI/CD deployment pipelines.",
    achievements: [
      "🏆 Awarded Employee of the Quarter (April 2022)",
      "Saved $2,000/month through rightsizing and billing governance",
      "Hardened security with AWS WAF, ALB rules, and Route 53"
    ],
    tags: ["AWS RDS", "Redis", "Jenkins CI/CD", "Cloudflare", "GitHub"],
    blueprintDetails: {
      architecture: "High-Availability LAMP/LEMP Stack on AWS with Jenkins CI/CD",
      sla: "Sub-50ms API latency and 99.95% uptime",
      security: "WAF rate-limiting, SSL termination, and strict security groups",
      finops: "Consistently reduced monthly AWS burn while transaction volumes grew 3x"
    }
  },
  {
    id: "isro",
    title: "Air-Gapped VMware VDI Infrastructure",
    client: "ISRO — Satish Dhawan Space Centre (SHAR)",
    logo: "assets/images/logos/isro.png",
    category: "enterprise ha",
    categoryLabel: "Defense & Space Enclave",
    impactBadge: "100-Seat Air-Gapped VDI",
    summary: "Built an isolated, non-internet connected Virtual Desktop Infrastructure (VDI) using VMware ESXi, vCenter, and VMware Horizon View for 100 space research engineers.",
    achievements: [
      "Constructed 100-seat isolated, secure workspace environment",
      "Connected Dell Wyse thin clients with centralized profile management",
      "Configured failover clustering with zero single points of failure"
    ],
    tags: ["VMware Horizon", "vCenter", "Dell Wyse", "ESXi Cluster", "SAN Storage"],
    blueprintDetails: {
      architecture: "Completely Air-Gapped High-Density VDI Fabric",
      sla: "Zero downtime for rocket telemetry and ground control workstations",
      security: "Physical air-gap, USB lock-down, and immutable local logging",
      finops: "Extended client endpoint lifespan by 5 years using Dell Wyse thin clients"
    }
  },
  {
    id: "iaf",
    title: "Mission-Critical Mini Data Center",
    client: "Indian Air Force (IAF, Bengaluru)",
    logo: "assets/images/logos/IAF.png",
    category: "enterprise ha",
    categoryLabel: "Defense Infrastructure",
    impactBadge: "Defense Data Center",
    summary: "Installed and configured an on-premises mini data center with Fujitsu Primergy servers, hardware RAID-5 arrays, Windows Server 2012 R2, and Hyper-V failover clustering.",
    achievements: [
      "Assembled 45U defense rack servers with redundant power",
      "Configured Active Directory DS and group policy security",
      "Implemented hardware RAID-5 fault tolerance"
    ],
    tags: ["Windows Server", "Hyper-V", "RAID-5", "Fujitsu Primergy", "Cisco Nexus"],
    blueprintDetails: {
      architecture: "Hardened Military Mini Data Center with Redundant Infrastructure",
      sla: "100% operational uptime for mission planning networks",
      security: "Active Directory DS hardening and physical intrusion detection",
      finops: "Standardized server hardware reducing ongoing maintenance contract costs"
    }
  },
  {
    id: "bbk",
    title: "High-Concurrency FoodTech Cloud Architecture",
    client: "Biryani By Kilo (BBK)",
    logo: "assets/images/logos/bbk.webp",
    category: "ha enterprise",
    categoryLabel: "High Availability & FoodTech",
    impactBadge: "50K+ Concurrent Orders",
    summary: "Multi-account AWS architecture orchestrated via AWS Organizations. Auto Scaling Groups fronted by ALB, Amazon Aurora MySQL, S3 storage, and Route 53 low-latency routing.",
    achievements: [
      "100% uptime during peak holiday meal rushes & flash sales",
      "Multi-account separation across dev, staging, and prod",
      "Automated auto-scaling responding in under 60 seconds"
    ],
    tags: ["AWS Aurora", "Auto Scaling", "Route 53", "ALB", "CloudFront"],
    blueprintDetails: {
      architecture: "Cloud-Native Multi-Account Microservices Architecture",
      sla: "99.99% availability during peak national holiday spikes",
      security: "Isolated VPC per environment with transit peering",
      finops: "Dynamically scaled down off-peak instances reducing off-hours compute by 65%"
    }
  },
  {
    id: "ksrsac",
    title: "45U Geospatial Enterprise Data Center",
    client: "KSRSAC, Govt of Karnataka",
    logo: "assets/images/logos/ksrsac.jpg",
    category: "enterprise",
    categoryLabel: "Geospatial Data Center",
    impactBadge: "45U SAN Fabric",
    summary: "Built state remote sensing agency data center with 9 drive enclosures connected to Fujitsu Eternus DX-500 SAN storage via SAS and 10G SFP fiber optical transceivers.",
    achievements: [
      "Delivered multi-terabyte storage fabric for satellite imagery",
      "Configured failover clustering with zero single points of failure",
      "Structured 10G fiber optic inter-rack cabling"
    ],
    tags: ["Fujitsu Eternus", "10G Fiber", "SAN Fabric", "SAS Enclosures", "Hyper-V"],
    blueprintDetails: {
      architecture: "Petabyte-Scale Geospatial Satellite Image Processing Fabric",
      sla: "Continuous satellite data ingest without buffer drops",
      security: "Isolated government intranet network with fiber hardware firewalls",
      finops: "High-density SAN architecture minimizing physical floor space and power draw"
    }
  },
  {
    id: "serviceplus",
    title: "Rackspace to AWS RDS Database Migration",
    client: "ServicePlus",
    logo: "assets/images/logos/serviceplus.svg",
    category: "migration finops",
    categoryLabel: "Database Migration & FinOps",
    impactBadge: "Zero Data Loss DMS",
    summary: "Migrated production MySQL database from Rackspace to AWS RDS with continuous CDC replication via AWS DMS, achieving zero data loss and reducing hosting spend by $1,500/mo.",
    achievements: [
      "Full cutover completed in a 15-minute maintenance window",
      "$1,500/month recurring hosting cost reduction",
      "Automated snapshot backups & point-in-time recovery"
    ],
    tags: ["AWS DMS", "RDS MySQL", "Multi-AZ", "CloudWatch", "Route 53"],
    blueprintDetails: {
      architecture: "Heterogeneous Cloud-to-Cloud Database Replication Engine",
      sla: "Zero data loss cutover verified via cryptographic row hash checks",
      security: "TLS-encrypted replication tunnel over private VPC endpoints",
      finops: "$18,000 annual reduction by decommissioning legacy Rackspace dedicated nodes"
    }
  },
  {
    id: "navi",
    title: "AWS Migration Hub Lift-and-Shift",
    client: "Navi Technologies",
    logo: "assets/images/logos/navi.svg",
    category: "migration enterprise",
    categoryLabel: "Cloud Migration & Assessment",
    impactBadge: "Landing Zone Assessment",
    summary: "Inventory discovery and dependency mapping across 40+ servers using AWS Migration Hub and Application Discovery Service. Provisioned secure AWS Landing Zone with GuardDuty.",
    achievements: [
      "Accurately discovered 40+ workload dependencies",
      "Configured landing zones adhering to Well-Architected Framework",
      "Automated server replication and rollback validation"
    ],
    tags: ["Migration Hub", "VPC Landing Zone", "GuardDuty", "Terraform", "CloudEndure"],
    blueprintDetails: {
      architecture: "Automated Enterprise Server Discovery & Migration Factory",
      sla: "Zero disruption during real-time network dependency discovery phase",
      security: "GuardDuty threat detection and IAM role least-privilege scoping",
      finops: "Prevented over-allocation by right-sizing instances based on actual discovery metrics"
    }
  }
];
