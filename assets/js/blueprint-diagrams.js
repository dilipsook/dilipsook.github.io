/* ==========================================================================
   INTERACTIVE ARCHITECTURAL TOPOLOGY BLUEPRINTS (ALL 9 MISSION PROJECTS)
   Dynamic 2D Schematic & 3D Isometric views, real-time node telemetry & data conduits
   ========================================================================== */

(function() {
  'use strict';

  // Comprehensive Architecture Topologies for all 9 Mission Projects
  const projectArchitectures = {
    'jnj': {
      topologyName: 'Enterprise Multi-AZ Healthcare LIMS Infrastructure',
      provider: 'AWS Cloud · Multi-AZ HA',
      sla: '100% SLA Compliance · Zero Data Loss',
      color: '#38bdf8',
      layers: [
        {
          tierNumber: '01',
          tierName: 'Global Edge Ingress',
          tierRole: 'DNS & Traffic Routing',
          nodes: [
            { id: 'jnj-n1', icon: '🌐', name: 'Route 53 DNS', type: 'Anycast Edge DNS', desc: 'Latency-based routing with active health-check failover', spec: 'Port 53 / Anycast', tag: 'Ingress' }
          ]
        },
        {
          tierNumber: '02',
          tierName: 'Perimeter Security & Balance',
          tierRole: 'Layer 4 / 7 Traffic Inspection',
          nodes: [
            { id: 'jnj-n2', icon: '🛡️', name: 'AWS WAF', type: 'Web App Firewall', desc: 'Managed OWASP Top 10 rules & strict rate-limiting', spec: 'TLS 1.3 / L7 Inspection', tag: 'Security' },
            { id: 'jnj-n3', icon: '⚖️', name: 'Network Load Balancer', type: 'Cross-AZ NLB', desc: 'Ultra-low latency Layer 4 SSL termination', spec: 'Sub-millisecond Latency', tag: 'NLB' }
          ]
        },
        {
          tierNumber: '03',
          tierName: 'Compute Application Fleet',
          tierRole: 'Private Multi-AZ VPC Subnets',
          nodes: [
            { id: 'jnj-n4', icon: '⚙️', name: 'Oracle WebLogic 14c', type: 'EC2 Cluster (10+ VMs)', desc: 'Enterprise EAR application cluster across Availability Zones', spec: 'Private Subnets (10.0.1.0/24)', tag: 'Compute' },
            { id: 'jnj-n5', icon: '🔄', name: 'AWS Systems Manager', type: 'Operations Runbooks', desc: 'Automated patch baselines, zero-SSH access and drift detection', spec: 'SSM Agent Zero-Trust', tag: 'Ops' }
          ]
        },
        {
          tierNumber: '04',
          tierName: 'Mission-Critical Database',
          tierRole: 'Synchronous Standby Replicas',
          nodes: [
            { id: 'jnj-n6', icon: '🗄️', name: 'AWS RDS Multi-AZ', type: 'Managed Relational DB', desc: 'Synchronous standby failover with RPO: 0, RTO < 60s', spec: 'AWS KMS AES-256 Encrypted', tag: 'Database' },
            { id: 'jnj-n7', icon: '🚀', name: 'AWS DMS & MGN', type: 'CDC Migration Engine', desc: 'Continuous Data Capture for zero-downtime cutover', spec: 'Continuous CDC Replication', tag: 'Migration' }
          ]
        },
        {
          tierNumber: '05',
          tierName: 'Audit, Storage & Telemetry',
          tierRole: 'Regulatory Compliance & Telemetry',
          nodes: [
            { id: 'jnj-n8', icon: '📦', name: 'Amazon S3 Vault', type: 'Immutable Object Store', desc: 'S3 Object Lock & lifecycle cold archiving for audit logs', spec: 'WORM Compliant', tag: 'Storage' },
            { id: 'jnj-n9', icon: '📊', name: 'Amazon CloudWatch', type: 'Real-Time Telemetry', desc: 'Multi-AZ alarm matrix, synthetic monitoring & SLA metrics', spec: '24/7 SLA Telemetry', tag: 'Observability' }
          ]
        }
      ]
    },

    'dhani': {
      topologyName: 'High-Throughput FinOps Architecture & Microservices Engine',
      provider: 'AWS Cloud · Serverless & Spot Lifecycle',
      sla: '$28,000 / mo Saved · Sub-10ms Query Latency',
      color: '#10b981',
      layers: [
        {
          tierNumber: '01',
          tierName: 'Global Edge Acceleration',
          tierRole: 'CDN Caching & Dynamic API Delivery',
          nodes: [
            { id: 'dhani-n1', icon: '⚡', name: 'Amazon CloudFront', type: 'Global Edge CDN', desc: 'Edge caching static assets & SSL termination across 200+ PoPs', spec: 'Edge Caching / HTTP/3', tag: 'CDN' }
          ]
        },
        {
          tierNumber: '02',
          tierName: 'API Ingress & Microservices',
          tierRole: 'Stateless API Orchestration',
          nodes: [
            { id: 'dhani-n2', icon: '🚪', name: 'AWS API Gateway', type: 'HTTP API Gateway', desc: 'JWT auth validation, token-bucket throttling and route dispatch', spec: 'JWT Auth / Rate-Limit', tag: 'Gateway' },
            { id: 'dhani-n3', icon: '🐳', name: 'ECS Fargate Fleet', type: 'Serverless Containers', desc: 'Microservices rightsized with Compute Savings Plans & Spot', spec: '45% Non-Prod Cost Cut', tag: 'Microservices' }
          ]
        },
        {
          tierNumber: '03',
          tierName: 'In-Memory State & Fast Data',
          tierRole: 'Sub-millisecond Transaction Cache',
          nodes: [
            { id: 'dhani-n4', icon: '⚡', name: 'ElastiCache Redis', type: 'In-Memory Cluster', desc: 'Sub-millisecond session state and hot loan query caching', spec: 'Sub-ms Response Time', tag: 'Cache' },
            { id: 'dhani-n5', icon: '⚡', name: 'Amazon DynamoDB', type: 'Serverless NoSQL', desc: 'On-demand provisioned capacity for loan transaction streams', spec: 'Global Tables Replication', tag: 'NoSQL' }
          ]
        },
        {
          tierNumber: '04',
          tierName: 'FinOps Governance Engine',
          tierRole: 'Continuous Rightsizing & Cost Control',
          nodes: [
            { id: 'dhani-n6', icon: '💰', name: 'Cost Explorer & Budgets', type: 'FinOps Governance', desc: 'Automated spend anomaly alerts & 3-year RI commit tracking', spec: '$28K/month Recurring Save', tag: 'FinOps' },
            { id: 'dhani-n7', icon: '📉', name: 'Compute Optimizer', type: 'ML Rightsizing', desc: 'AI-driven instance rightsizing & EBS gp2 to gp3 conversions', spec: '100+ Instances Rightsized', tag: 'Optimizer' }
          ]
        },
        {
          tierNumber: '05',
          tierName: 'Cold Archive Storage',
          tierRole: 'Automated Lifecycle Transition',
          nodes: [
            { id: 'dhani-n8', icon: '🧊', name: 'S3 Glacier Flexible', type: 'Deep Archive Tier', desc: 'Automated 90-day lifecycle transition saving 70% storage cost', spec: '70% Storage Cost Reduction', tag: 'Glacier' }
          ]
        }
      ]
    },

    'loantap': {
      topologyName: 'LoanTap Consumer Lending Infrastructure & CI/CD Security',
      provider: 'AWS Cloud · High Security Fintech',
      sla: 'Employee of Quarter Award · $2K/mo Saved',
      color: '#f59e0b',
      layers: [
        {
          tierNumber: '01',
          tierName: 'Edge DNS & DDoS Shield',
          tierRole: 'Edge Security & DNS Resolution',
          nodes: [
            { id: 'lt-n1', icon: '☁️', name: 'Cloudflare Edge', type: 'Enterprise CDN / DNS', desc: 'Layer 3/4 DDoS mitigation, SSL offload and edge caching', spec: 'Zero DDoS Downtime', tag: 'Edge' }
          ]
        },
        {
          tierNumber: '02',
          tierName: 'Load Balancing & WAF',
          tierRole: 'Traffic Distribution & Filtering',
          nodes: [
            { id: 'lt-n2', icon: '⚖️', name: 'AWS ALB + WAF', type: 'App Load Balancer', desc: 'Path-based routing with custom OWASP SQLi/XSS filtering rules', spec: 'HTTPS Port 443 / SSL', tag: 'WAF' }
          ]
        },
        {
          tierNumber: '03',
          tierName: 'Application Web Fleet',
          tierRole: 'Nginx + Scalable PHP-FPM',
          nodes: [
            { id: 'lt-n3', icon: '🌐', name: 'Nginx Reverse Proxy', type: 'Web Server Tier', desc: 'High-concurrency reverse proxy & gzip asset compression', spec: 'Sub-50ms TTFB', tag: 'Proxy' },
            { id: 'lt-n4', icon: '⚙️', name: 'PHP-FPM EC2 Fleet', type: 'Application Tier', desc: 'Loan underwriting, credit check and consumer onboarding API', spec: 'Auto-Scaling Compute', tag: 'App Fleet' }
          ]
        },
        {
          tierNumber: '04',
          tierName: 'Database & In-Memory Cache',
          tierRole: 'Relational DB & Session State',
          nodes: [
            { id: 'lt-n5', icon: '🗄️', name: 'AWS RDS MySQL', type: 'Relational DB', desc: 'Automated snapshot lifecycle, storage auto-scaling & rightsizing', spec: '$2,000/mo Cloud Savings', tag: 'RDS' },
            { id: 'lt-n6', icon: '⚡', name: 'Redis In-Memory Cache', type: 'Session Cache', desc: 'Fast token storage, rate-limiting counters and caching', spec: 'Sub-millisecond Latency', tag: 'Redis' }
          ]
        },
        {
          tierNumber: '05',
          tierName: 'DevSecOps & CI/CD Pipeline',
          tierRole: 'Continuous Delivery Automation',
          nodes: [
            { id: 'lt-n7', icon: '🚀', name: 'Jenkins CI/CD Pipeline', type: 'Automation Server', desc: 'Automated testing, Docker image building and rolling zero-downtime deploy', spec: '100% Automated Releases', tag: 'CI/CD' },
            { id: 'lt-n8', icon: '🐙', name: 'GitHub Enterprise', type: 'Git Repository', desc: 'Branch protection rules, pull-request hooks and secret scanning', spec: 'GitOps Pipeline', tag: 'Git' }
          ]
        }
      ]
    },

    'isro': {
      topologyName: 'ISRO (SDSC SHAR) Air-Gapped Space Research VDI Enclave',
      provider: 'On-Premises Secure Enclave · Air-Gapped',
      sla: '100% Air-Gapped Isolation · 100 Dell Wyse Stations',
      color: '#ef4444',
      layers: [
        {
          tierNumber: '01',
          tierName: 'User Hardware Endpoints',
          tierRole: 'Physical Research Laboratory Endpoints',
          nodes: [
            { id: 'isro-n1', icon: '🖥️', name: '100x Dell Wyse Clients', type: 'Hardware Endpoints', desc: 'Locked-down thin client hardware for 100 space research engineers', spec: 'Dell Wyse ThinOS', tag: 'Endpoints' }
          ]
        },
        {
          tierNumber: '02',
          tierName: 'Air-Gapped Defense Network',
          tierRole: 'Zero-Internet Physical Network Boundary',
          nodes: [
            { id: 'isro-n2', icon: '🔒', name: 'Isolated LAN Switch Fabric', type: 'Physical Boundary', desc: 'Physically separated Layer 2/3 network with no gateway to the internet', spec: 'Air-Gapped Defense LAN', tag: 'Isolated' },
            { id: 'isro-n3', icon: '🛡️', name: 'Horizon Connection Broker', type: 'Access Gateway', desc: 'Dual-factor air-gapped authentication and user session broker', spec: 'Zero-Trust Protocol', tag: 'Broker' }
          ]
        },
        {
          tierNumber: '03',
          tierName: 'Virtualization Compute Core',
          tierRole: 'VMware ESXi Enterprise Cluster',
          nodes: [
            { id: 'isro-n4', icon: '⚡', name: 'VMware ESXi Cluster', type: 'Hypervisor Hosts', desc: 'Clustered compute servers with vSphere DRS dynamic resource scheduling', spec: 'VMware ESXi 6.7', tag: 'Compute' },
            { id: 'isro-n5', icon: '🎛️', name: 'VMware vCenter Server', type: 'Central Management', desc: 'Cluster resource monitoring, instant-clone desktop provisioning', spec: 'vCenter Management', tag: 'Management' }
          ]
        },
        {
          tierNumber: '04',
          tierName: 'Storage SAN & Identity',
          tierRole: 'Enterprise SAN & Domain Services',
          nodes: [
            { id: 'isro-n6', icon: '💾', name: 'Isolated Virtual SAN', type: 'High-IOPS SAN', desc: 'Dedicated flash datastores for desktop OS images & mission data', spec: 'High-IOPS Virtual SAN', tag: 'SAN' },
            { id: 'isro-n7', icon: '👤', name: 'Active Directory Domain', type: 'Identity & Access', desc: 'Centralized group policies, roaming user profiles and role delegation', spec: 'Hardened AD DS', tag: 'Identity' }
          ]
        },
        {
          tierNumber: '05',
          tierName: 'High-Availability Redundancy',
          tierRole: 'Hardware Redundancy & Failover',
          nodes: [
            { id: 'isro-n8', icon: '🔄', name: 'vSphere High Availability', type: 'Automated Failover', desc: 'Sub-minute compute host failover restart guarantee across hardware', spec: 'Zero Single Point Failure', tag: 'HA Cluster' }
          ]
        }
      ]
    },

    'iaf': {
      topologyName: 'Indian Air Force: High-Security Mini Data Center',
      provider: 'Defense Physical Infrastructure · Bengaluru',
      sla: 'Tier-Standard Redundancy · RAID-5 Fault Tolerant',
      color: '#0284c7',
      layers: [
        {
          tierNumber: '01',
          tierName: 'Defense Network Backbone',
          tierRole: 'Redundant Core Switching',
          nodes: [
            { id: 'iaf-n1', icon: '🔌', name: 'Cisco Catalyst L3 Core', type: 'Dual Core Switches', desc: 'Redundant fiber uplinks and segmented defense VLAN routing', spec: 'Cisco Catalyst Core', tag: 'Network' }
          ]
        },
        {
          tierNumber: '02',
          tierName: 'Physical Enclosure Architecture',
          tierRole: '45U Server Enclosures',
          nodes: [
            { id: 'iaf-n2', icon: '🏢', name: '45U Defense Server Racks', type: 'Hardware Racks', desc: 'Structured cabling, dual PDU power rails and climate telemetry', spec: '45U Server Rack', tag: 'Hardware' }
          ]
        },
        {
          tierNumber: '03',
          tierName: 'Enterprise Server Hardware',
          tierRole: 'Fujitsu Primergy Dual-Socket Hosts',
          nodes: [
            { id: 'iaf-n3', icon: '🖥️', name: 'Fujitsu Primergy Servers', type: 'Dual Intel Xeon', desc: 'High-density compute nodes with ECC RAM and redundant PSUs', spec: 'Intel Xeon Dual Socket', tag: 'Server' }
          ]
        },
        {
          tierNumber: '04',
          tierName: 'Virtualization & Storage',
          tierRole: 'Hyper-V Enterprise Cluster',
          nodes: [
            { id: 'iaf-n4', icon: '🪟', name: 'Windows Server 2012 R2', type: 'Hyper-V Failover', desc: 'Hardware virtualization hosting critical defense service VMs', spec: 'Hyper-V Cluster', tag: 'Hyper-V' },
            { id: 'iaf-n5', icon: '💾', name: 'Hardware RAID-5 Array', type: 'Redundant SAS Storage', desc: 'Fault-tolerant SAS storage arrays with hot-spare disk failover', spec: 'RAID-5 Battery Cache', tag: 'RAID-5' }
          ]
        },
        {
          tierNumber: '05',
          tierName: 'Security & Domain Vault',
          tierRole: 'Hardened Group Policy Vault',
          nodes: [
            { id: 'iaf-n6', icon: '🔐', name: 'Active Directory DS', type: 'Domain Controller', desc: 'Air-gapped user authentication, audit logging & security baselines', spec: 'Strict Security Baselines', tag: 'Security' }
          ]
        }
      ]
    },

    'bbk': {
      topologyName: 'Biryani By Kilo (BBK) Multi-Account Flash-Sale Architecture',
      provider: 'AWS Cloud · Multi-Account Scalability',
      sla: '100% Uptime During 50K+ User Surges · Sub-60s Scaling',
      color: '#f97316',
      layers: [
        {
          tierNumber: '01',
          tierName: 'Global Traffic Routing',
          tierRole: 'Route 53 Geolocation & Latency Routing',
          nodes: [
            { id: 'bbk-n1', icon: '🌐', name: 'Amazon Route 53', type: 'Anycast GeoDNS', desc: 'Latency and geo-proximity routing delivering orders to closest region', spec: 'Latency-Based Routing', tag: 'GeoDNS' }
          ]
        },
        {
          tierNumber: '02',
          tierName: 'Multi-Account Landing Zone',
          tierRole: 'AWS Organizations Security Boundary',
          nodes: [
            { id: 'bbk-n2', icon: '🏢', name: 'AWS Organizations', type: 'Multi-Account SCPs', desc: 'Isolated production, staging and dev environments with Service Control Policies', spec: 'Multi-Account Segregation', tag: 'Landing Zone' },
            { id: 'bbk-n3', icon: '🛡️', name: 'AWS WAF + ALB Tier', type: 'App Load Balancers', desc: 'DDoS mitigation and path-based routing for ordering APIs', spec: 'Layer 7 WAF Protection', tag: 'WAF / ALB' }
          ]
        },
        {
          tierNumber: '03',
          tierName: 'Flash-Sale Auto-Scaling Fleet',
          tierRole: 'Elastic Compute Capacity',
          nodes: [
            { id: 'bbk-n4', icon: '⚙️', name: 'EC2 Auto Scaling Groups', type: 'Multi-AZ Fleet', desc: 'Scales 10x compute capacity in under 60s during lunch/dinner order surges', spec: '50,000+ Concurrent Users', tag: 'Auto-Scaling' }
          ]
        },
        {
          tierNumber: '04',
          tierName: 'High-Throughput Database',
          tierRole: 'Amazon Aurora MySQL Multi-Master',
          nodes: [
            { id: 'bbk-n5', icon: '⚡', name: 'Amazon Aurora MySQL', type: 'Clustered Relational DB', desc: 'Multi-AZ read replicas with sub-10ms query execution for instant cart checkout', spec: 'Sub-10ms Checkout Query', tag: 'Aurora' }
          ]
        },
        {
          tierNumber: '05',
          tierName: 'Media Delivery & Storage',
          tierRole: 'Asset Delivery',
          nodes: [
            { id: 'bbk-n6', icon: '📦', name: 'Amazon S3 + CloudFront', type: 'Media CDN', desc: 'Menu media, banners and static frontend assets cached at edge', spec: 'Edge Cached Assets', tag: 'Storage' }
          ]
        }
      ]
    },

    'ksrsac': {
      topologyName: 'KSRSAC: 45U Enterprise Data Center & 10G SAN Storage Fabric',
      provider: 'Govt of Karnataka · Tier-2 Ready Data Center',
      sla: '10 Gbps Fiber SAN Fabric · Zero Single Points of Failure',
      color: '#8b5cf6',
      layers: [
        {
          tierNumber: '01',
          tierName: 'Satellite Data Ingestion',
          tierRole: 'Satellite GIS Data Uplinks',
          nodes: [
            { id: 'ks-n1', icon: '🛰️', name: 'Satellite Raster Ingest', type: 'Data Ingest Pipeline', desc: 'Massive geospatial raster ingestion and remote sensing feeds', spec: 'Multi-Terabyte Feeds', tag: 'Ingest' }
          ]
        },
        {
          tierNumber: '02',
          tierName: 'Dual Rack Architecture',
          tierRole: '42U & 30U Server Enclosures',
          nodes: [
            { id: 'ks-n2', icon: '🏢', name: '42U & 30U Server Racks', type: 'Equipment Racks', desc: 'Dedicated racks with dual redundant UPS rails and thermal sensors', spec: '42U + 30U Racks', tag: 'Enclosure' }
          ]
        },
        {
          tierNumber: '03',
          tierName: 'High-Density Compute Hosts',
          tierRole: 'Fujitsu Primergy Compute Fleet',
          nodes: [
            { id: 'ks-n3', icon: '🖥️', name: 'Fujitsu Primergy Fleet', type: 'High-Memory Compute', desc: 'High-memory compute servers for GIS raster analysis and image processing', spec: 'High-Throughput Compute', tag: 'Primergy' }
          ]
        },
        {
          tierNumber: '04',
          tierName: '10G Optical SAN Fabric',
          tierRole: 'Redundant 10G SFP Storage Network',
          nodes: [
            { id: 'ks-n4', icon: '⚡', name: '10G SFP Fiber Fabric', type: 'Optical SAN Switch', desc: 'Dual optical controllers with sub-millisecond IOPS for GIS raster processing', spec: '10G SFP Optical Transceivers', tag: '10G Fiber' },
            { id: 'ks-n5', icon: '🗄️', name: 'Fujitsu Eternus DX-500', type: 'Enterprise SAN Storage', desc: '9 connected storage drive shelves for multi-terabyte satellite data', spec: '9 Drive Enclosures', tag: 'SAN Storage' }
          ]
        },
        {
          tierNumber: '05',
          tierName: 'High Availability Clustering',
          tierRole: 'Failover Clustering',
          nodes: [
            { id: 'ks-n6', icon: '🔄', name: 'Windows Server Clustering', type: 'Failover Cluster', desc: 'Automated disk and service failover with zero downtime for GIS processing', spec: 'Zero Single Point of Failure', tag: 'Clustering' }
          ]
        }
      ]
    },

    'serviceplus': {
      topologyName: 'ServicePlus: Rackspace to AWS RDS Live Database Migration',
      provider: 'Cloud Migration · Zero Data Loss',
      sla: '< 15-Minute Cutover Window · $1,500/mo Saved',
      color: '#ec4899',
      layers: [
        {
          tierNumber: '01',
          tierName: 'Source Legacy Infrastructure',
          tierRole: 'Rackspace Dedicated Hosting',
          nodes: [
            { id: 'sp-n1', icon: '🏢', name: 'Rackspace Dedicated Host', type: 'Source MySQL 5.7', desc: 'Production database hosting citizen service applications', spec: 'Source Database Tier', tag: 'Rackspace' }
          ]
        },
        {
          tierNumber: '02',
          tierName: 'Secure Migration Tunnel',
          tierRole: 'Direct Encrypted Conduit',
          nodes: [
            { id: 'sp-n2', icon: '🔒', name: 'IPSec VPN Interconnect', type: 'Encrypted Pipe', desc: 'Dedicated site-to-site VPN connecting Rackspace data center to AWS VPC', spec: 'IPSec AES-256 Tunnel', tag: 'Tunnel' }
          ]
        },
        {
          tierNumber: '03',
          tierName: 'Continuous Data Replication',
          tierRole: 'AWS Database Migration Service (DMS)',
          nodes: [
            { id: 'sp-n3', icon: '🔄', name: 'AWS DMS Replication', type: 'CDC Migration Engine', desc: 'Initial full-load schema transfer followed by Continuous Data Capture (CDC)', spec: 'Replication Lag < 50ms', tag: 'AWS DMS' }
          ]
        },
        {
          tierNumber: '04',
          tierName: 'Target Multi-AZ Database',
          tierRole: 'AWS RDS MySQL Multi-AZ',
          nodes: [
            { id: 'sp-n4', icon: '🗄️', name: 'AWS RDS MySQL Multi-AZ', type: 'Target Cloud DB', desc: 'Synchronous standby replica with automated daily snapshots & 35-day PITR', spec: 'Multi-AZ Automated Failover', tag: 'AWS RDS' }
          ]
        },
        {
          tierNumber: '05',
          tierName: 'Zero-Downtime DNS Cutover',
          tierRole: 'Route 53 Live Switchover',
          nodes: [
            { id: 'sp-n5', icon: '🌐', name: 'Route 53 Weighted Cutover', type: 'DNS Endpoint Switch', desc: 'Seamless switch of database endpoints with zero transaction loss in <15 mins', spec: 'Scheduled Window < 15 Min', tag: 'Route 53' }
          ]
        }
      ]
    },

    'navi': {
      topologyName: 'Navi Technologies: On-Premises to AWS Cloud Migration',
      provider: 'AWS Cloud · Discovery & Landing Zone',
      sla: '40+ Dependencies Mapped · Automated Cutover',
      color: '#06b6d4',
      layers: [
        {
          tierNumber: '01',
          tierName: 'On-Premises Discovery',
          tierRole: '40+ Legacy Virtual Machines',
          nodes: [
            { id: 'nv-n1', icon: '🖥️', name: 'Discovery Agent Fleet', type: 'App Discovery Service', desc: 'Tracked network communication, CPU/RAM baselines and process dependencies', spec: '40+ Application Servers', tag: 'Discovery' }
          ]
        },
        {
          tierNumber: '02',
          tierName: 'Migration Orchestration',
          tierRole: 'AWS Migration Hub Dashboard',
          nodes: [
            { id: 'nv-n2', icon: '📊', name: 'AWS Migration Hub', type: 'Centralized Dashboard', desc: 'Centralized orchestration tracking server replication waves & cutover groups', spec: 'Migration Wave Tracking', tag: 'Hub' }
          ]
        },
        {
          tierNumber: '03',
          tierName: 'Target Landing Zone VPC',
          tierRole: 'Multi-AZ Cloud Foundation',
          nodes: [
            { id: 'nv-n3', icon: '☁️', name: 'Multi-AZ AWS VPC', type: 'Compliant Landing Zone', desc: 'Public/Private subnets, NAT Gateways and Transit Gateway routing', spec: 'AWS Well-Architected VPC', tag: 'Landing Zone' }
          ]
        },
        {
          tierNumber: '04',
          tierName: 'Elastic Compute & Load Balancers',
          tierRole: 'Auto-Scaled Ingress Fleet',
          nodes: [
            { id: 'nv-n4', icon: '⚖️', name: 'Application Load Balancer', type: 'Ingress ALB Tier', desc: 'Layer 7 traffic routing to auto-scaled EC2 compute target groups', spec: 'Multi-AZ Ingress', tag: 'ALB' },
            { id: 'nv-n5', icon: '⚙️', name: 'Auto Scaling EC2 Fleet', type: 'Compute Fleet', desc: 'Rightsized EC2 instances based on Discovery Agent performance metrics', spec: 'Dynamic Auto-Scaling', tag: 'EC2 Fleet' }
          ]
        },
        {
          tierNumber: '05',
          tierName: 'Governance & Threat Detection',
          tierRole: 'AWS GuardDuty & CloudTrail',
          nodes: [
            { id: 'nv-n6', icon: '🛡️', name: 'AWS GuardDuty & Trail', type: 'Security Governance', desc: 'Continuous intelligent threat detection and automated IAM compliance logging', spec: 'Zero-Trust Cloud Governance', tag: 'Security' }
          ]
        }
      ]
    }
  };

  let currentTopology = null;
  let is3DMode = false;

  // Render Architecture Blueprint into the modal
  function renderBlueprintDiagram(projectId) {
    const data = projectArchitectures[projectId];
    if (!data) return;

    currentTopology = data;

    const subtitleEl = document.getElementById('blueprintDiagramSubtitle');
    const containerEl = document.getElementById('blueprintTiersContainer');
    const detailBar = document.getElementById('blueprintNodeDetailBar');
    const tagEl = document.getElementById('blueprintTopologyTag');

    if (subtitleEl) subtitleEl.textContent = data.topologyName + ' (' + data.provider + ')';
    if (tagEl) tagEl.textContent = data.sla;

    if (!containerEl) return;

    // Render Tiers
    let html = '';
    data.layers.forEach((layer, tierIdx) => {
      html += '<div class="blueprint-tier-column" data-tier="' + tierIdx + '">';
      html += '  <div class="tier-header">';
      html += '    <span class="tier-number">' + layer.tierNumber + '</span>';
      html += '    <div>';
      html += '      <div class="tier-name">' + layer.tierName + '</div>';
      html += '      <div class="tier-role">' + layer.tierRole + '</div>';
      html += '    </div>';
      html += '  </div>';

      html += '  <div class="tier-nodes-stack">';
      layer.nodes.forEach((node, nodeIdx) => {
        const isFirst = (tierIdx === 0 && nodeIdx === 0);
        html += '    <div class="blueprint-node-card' + (isFirst ? ' selected' : '') + '" data-node-id="' + node.id + '">';
        html += '      <div class="node-icon-wrap">' + node.icon + '</div>';
        html += '      <div class="node-info">';
        html += '        <div class="node-title">' + node.name + '</div>';
        html += '        <div class="node-type">' + node.type + '</div>';
        html += '      </div>';
        html += '      <span class="node-chip">' + node.tag + '</span>';
        html += '    </div>';
      });
      html += '  </div>';

      // Connector Arrow if not last tier
      if (tierIdx < data.layers.length - 1) {
        html += '  <div class="tier-connector-arrow" aria-hidden="true">';
        html += '    <span class="flow-pulse-dot"></span>';
        html += '    <svg viewBox="0 0 24 24" width="20" height="20"><path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
        html += '  </div>';
      }

      html += '</div>';
    });

    containerEl.innerHTML = html;

    // Default select first node
    const firstNode = data.layers[0].nodes[0];
    updateNodeDetail(firstNode);

    // Attach click and hover listeners to nodes
    const nodeCards = containerEl.querySelectorAll('.blueprint-node-card');
    nodeCards.forEach(card => {
      card.addEventListener('click', () => {
        nodeCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        const nId = card.getAttribute('data-node-id');
        const nodeData = findNodeById(data, nId);
        if (nodeData) updateNodeDetail(nodeData);
      });

      card.addEventListener('mouseenter', () => {
        const nId = card.getAttribute('data-node-id');
        const nodeData = findNodeById(data, nId);
        if (nodeData) updateNodeDetail(nodeData);
      });
    });
  }

  function findNodeById(topology, id) {
    for (let layer of topology.layers) {
      for (let node of layer.nodes) {
        if (node.id === id) return node;
      }
    }
    return null;
  }

  function updateNodeDetail(node) {
    const typeEl = document.getElementById('nodeDetailType');
    const titleEl = document.getElementById('nodeDetailTitle');
    const descEl = document.getElementById('nodeDetailDesc');
    const specEl = document.getElementById('nodeDetailSpec');

    if (typeEl) typeEl.textContent = node.type;
    if (titleEl) titleEl.textContent = node.name;
    if (descEl) descEl.textContent = node.desc;
    if (specEl) specEl.textContent = node.spec;
  }

  // 2D / 3D Isometric View Mode Toggle
  function initViewControls() {
    const btn2D = document.getElementById('blueprint2DBtn');
    const btn3D = document.getElementById('blueprint3DBtn');
    const stage = document.getElementById('blueprintStage');

    if (!btn2D || !btn3D || !stage) return;

    btn2D.addEventListener('click', () => {
      btn2D.classList.add('active');
      btn3D.classList.remove('active');
      stage.classList.remove('view-mode-3d');
      is3DMode = false;
      stage.style.transform = '';
    });

    btn3D.addEventListener('click', () => {
      btn3D.classList.add('active');
      btn2D.classList.remove('active');
      stage.classList.add('view-mode-3d');
      is3DMode = true;
    });

    // Dynamic 3D Isometric Mouse Tilt
    stage.addEventListener('mousemove', (e) => {
      if (!is3DMode) return;
      const rect = stage.getBoundingClientRect();
      const sX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const sY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      const rotX = 45 + (-sY * 12);
      const rotZ = -20 + (sX * 12);

      stage.style.transform = 'perspective(1100px) rotateX(' + rotX.toFixed(2) + 'deg) rotateZ(' + rotZ.toFixed(2) + 'deg) scale(0.92)';
    });

    stage.addEventListener('mouseleave', () => {
      if (!is3DMode) return;
      stage.style.transform = 'perspective(1100px) rotateX(45deg) rotateZ(-20deg) scale(0.92)';
    });
  }

  // Export globally for main.js to call on blueprint button click
  window.DilipBlueprint = {
    render: renderBlueprintDiagram,
    topologies: projectArchitectures
  };

  document.addEventListener('DOMContentLoaded', initViewControls);
})();
