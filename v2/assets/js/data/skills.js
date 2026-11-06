/**
 * COMPLETE MULTI-CLOUD SKILLS & TECHNOLOGIES DATA
 * Comprehensive hands-on proficiency across cloud service providers, automation tooling, OS, and networking.
 */

export const skillsCategories = [
  { id: "all", label: "All Stack" },
  { id: "aws", label: "AWS Services" },
  { id: "azure", label: "Microsoft Azure" },
  { id: "devops", label: "DevOps & IaC" },
  { id: "finops", label: "FinOps & Cost" },
  { id: "security", label: "Security & Network" },
  { id: "lifesciences", label: "Life Sciences & LIMS" },
  { id: "systems", label: "Systems & Web" }
];

export const skillsData = [
  // AWS Services
  { name: "Amazon EC2", group: "aws", icon: "assets/images/cloud-icons/EC2.svg", type: "img" },
  { name: "Amazon S3", group: "aws", icon: "assets/images/cloud-icons/Simple-Storage-Service.svg", type: "img" },
  { name: "AWS RDS / Aurora", group: "aws", icon: "assets/images/cloud-icons/RDS.svg", type: "img" },
  { name: "AWS Lambda", group: "aws", icon: "assets/images/cloud-icons/Lambda.svg", type: "img" },
  { name: "Amazon VPC", group: "aws", icon: "assets/images/cloud-icons/Virtual-Private-Cloud.svg", type: "img" },
  { name: "ALB / NLB / ELB", group: "aws", icon: "assets/images/cloud-icons/Elastic-Load-Balancing.svg", type: "img" },
  { name: "Route 53", group: "aws", icon: "assets/images/cloud-icons/Route-53.svg", type: "img" },
  { name: "CloudFront CDN", group: "aws", icon: "assets/images/cloud-icons/CloudFront.svg", type: "img" },
  { name: "CloudWatch", group: "aws", icon: "assets/images/cloud-icons/CloudWatch.svg", type: "img" },

  // Azure Services
  { name: "Azure VMs", group: "azure", icon: "assets/images/cloud-icons/VM.svg", type: "img" },
  { name: "Blob Storage", group: "azure", icon: "assets/images/cloud-icons/Storage-Account.svg", type: "img" },
  { name: "Azure Migrate", group: "azure", icon: "assets/images/cloud-icons/Azure-Migrate.svg", type: "img" },
  { name: "Azure Monitor", group: "azure", icon: "assets/images/cloud-icons/Monitor.svg", type: "img" },
  { name: "Azure Cost Mgmt", group: "azure", icon: "assets/images/cloud-icons/Cost-Management.svg", type: "img" },

  // DevOps & IaC
  { name: "Terraform IaC", group: "devops", icon: "assets/images/cloud-icons/terraform.png", type: "img" },
  { name: "Kubernetes (EKS)", group: "devops", icon: "assets/images/cloud-icons/kubernetes.svg", type: "img" },
  { name: "Docker", group: "devops", icon: "assets/images/cloud-icons/docker.svg", type: "img" },
  { name: "Jenkins CI/CD", group: "devops", icon: "assets/images/cloud-icons/jenkins.jpeg", type: "img" },
  { name: "GitHub Actions", group: "devops", icon: "assets/images/cloud-icons/github.png", type: "img" },

  // FinOps
  { name: "Cost Explorer", group: "finops", icon: "assets/images/cloud-icons/Cost-Explorer.svg", type: "img" },
  { name: "Savings Plans & RI", group: "finops", icon: "assets/images/cloud-icons/Cost-Management.svg", type: "img" },

  // Security & Network
  { name: "AWS WAF & Shield", group: "security", icon: "assets/images/cloud-icons/WAF.svg", type: "img" },
  { name: "AWS GuardDuty", group: "security", icon: "assets/images/cloud-icons/GuardDuty.svg", type: "img" },
  { name: "Entra ID / IAM", group: "security", icon: "assets/images/cloud-icons/active-directory.svg", type: "img" },

  // Systems & Web
  { name: "RedHat / Ubuntu", group: "systems", icon: "assets/images/cloud-icons/linux.png", type: "img" },
  { name: "Windows Server", group: "systems", icon: "assets/images/cloud-icons/windows-server.png", type: "img" },

  // Life Sciences & LIMS
  { name: "LabWare LIMS & ELN", group: "lifesciences", icon: "🔬", type: "emoji" },
  { name: "Labvantage LIMS", group: "lifesciences", icon: "🧪", type: "emoji" },
  { name: "GxP / 21 CFR Part 11", group: "lifesciences", icon: "📋", type: "emoji" },
  { name: "Oracle WebLogic", group: "lifesciences", icon: "⚙️", type: "emoji" }
];
