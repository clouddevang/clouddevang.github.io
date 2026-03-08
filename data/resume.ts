// filepath: data/resume.ts

export interface Personal {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  location: string;
  summary: string;
  tagline: string;
}

export interface ExperienceBullet {
  text: string;
  metrics?: string[];
}

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  bullets: ExperienceBullet[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  link?: string;
  metrics?: string;
}

export interface Education {
  degree: string;
  field: string;
  institution: string;
  location: string;
  gpa: string;
  startYear: string;
  endYear: string;
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillGroup {
  category: string;
  icon: string;
  skills: Skill[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  type: 'aws' | 'azure' | 'jlpt';
}

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

export const personal: Personal = {
  name: 'Devang Goyal',
  title: 'Site Reliability Engineer',
  email: 'devangg37@gmail.com',
  phone: '+81 80-6842-5236',
  linkedin: 'devang20',
  github: 'clouddevang',
  location: 'Japan',
  summary: `Results-driven SRE & Cloud Engineer with extensive experience architecting, automating, and operating mission-critical infrastructure at scale across Azure and AWS. Proven ability to deliver measurable cost reductions, security hardening via zero-trust network design, and reliability improvements across financial-grade production platforms. Deep expertise in container orchestration, infrastructure as code, CI/CD pipelines, and distributed observability—consistently driving zero-downtime deployments, incident reduction, and platform modernization at enterprise scale.`,
  tagline: 'Architecting mission-critical infrastructure at scale with zero-trust security and distributed observability.',
};

export const experience: Experience[] = [
  {
    company: 'BitFlyer',
    role: 'Site Reliability Engineer',
    startDate: 'Nov 2024',
    endDate: 'Present',
    location: 'Japan',
    bullets: [
      {
        text: 'Built an Azure Functions–driven data archival pipeline to migrate ~600 GB of high-growth tables from Azure SQL Business Critical to Hyperscale tier, relieving primary database capacity pressure, preventing the 4 TiB storage ceiling breach, and delivering $4,800/yr in sustained cost savings.',
        metrics: ['~600 GB', '4 TiB', '$4,800/yr'],
      },
      {
        text: 'Deployed a unified observability stack—Datadog dashboards, Sentry error tracking, and Azure Monitor alerts—cutting incident detection time by 50% and driving sustained MTTR improvements in production.',
        metrics: ['50%'],
      },
      {
        text: 'Improved EFCore.BulkExtensions batch processing performance for 20M+ record workloads by introducing checkpointing, configurable batch sizing, and retry mechanisms—cutting end-to-end pipeline processing time by 35%.',
        metrics: ['20M+', '35%'],
      },
      {
        text: 'Led .NET 8 runtime upgrades for all production Azure Functions, improving cold-start latency and execution efficiency by 25% while maintaining backward compatibility across dependent services.',
        metrics: ['25%'],
      },
      {
        text: 'Architected backend infrastructure for a full customer-facing platform redesign, designing Azure App Services topology with RBAC-enforced Key Vault and Storage Account access via Service Endpoints to enforce zero-trust service-to-service authentication across all APIs.',
        metrics: [],
      },
      {
        text: 'Drove a VNet integration initiative to unify microservices running across Azure App Services, Container Apps (ACA), and Azure Functions—migrating all database connectivity to private Service Endpoints on Azure SQL Server, introducing firewall-based ACLs eliminating public database exposure.',
        metrics: [],
      },
      {
        text: 'Introduced Azure Container Apps (ACA) as the standard architecture for new microservices, leveraging KEDA-based autoscaling for more granular, event-driven scaling compared to Azure Functions; improved cold-start performance and reduced infrastructure cost for bursty workloads.',
        metrics: [],
      },
      {
        text: 'Designed and implemented OpenTelemetry-based observability for the redesigned customer platform: instrumented distributed traces, metrics, and structured logs using the OTel SDK, routing all telemetry to Datadog to establish a vendor-agnostic, industry-standard observability foundation.',
        metrics: [],
      },
      {
        text: 'Automated tenant-wide Service Principal auditing with CI/CD pipelines for centralized governance and proactive Slack alerts on secret and certificate expiry, eliminating all manual overhead.',
        metrics: [],
      },
      {
        text: 'Delivered a Terraform-based identity governance framework for Azure AD users, groups, and Service Principals; standardized RBAC role assignments through code, eliminating manual permission grants and ensuring auditable, consistent access control across the tenant.',
        metrics: [],
      },
      {
        text: 'Introduced Privileged Identity Management (PIM) for Just-in-Time (JIT) role elevation, eliminating all standing admin privileges and remediating over-provisioned permissions across the organization.',
        metrics: [],
      },
      {
        text: 'Hardened the Azure network perimeter for critical services by enforcing private endpoints, VNet integration, VPN-based developer access, and SAS-token scoped permissions on storage—achieving strong security boundaries without impeding developer workflows.',
        metrics: [],
      },
    ],
  },
  {
    company: 'Accenture Japan',
    role: 'SRE & Cloud Engineer',
    startDate: 'Mar 2022',
    endDate: 'Oct 2024',
    location: 'Japan',
    bullets: [
      {
        text: 'Managed the full AKS cluster lifecycle—upgrades, capacity planning, workload identity, RBAC hygiene, and priority classes; migrated to newer VM SKUs and consolidated node pools, saving ~$12,960/yr in infrastructure costs across production and staging.',
        metrics: ['~$12,960/yr'],
      },
      {
        text: 'Developed Slack Bolt slash commands integrated with Jira to enable engineers to query tickets, create subtasks, and trigger release approvals without leaving Slack; reduced context-switching overhead and saved teams 5–7 hours per sprint, cutting approval cycle time by 40%.',
        metrics: ['5–7 hours', '40%'],
      },
      {
        text: 'Implemented multi-environment Terraform Cloud workflows integrated with Azure DevOps VCS pipelines; enforced standardized module structures and dynamic environment tagging, reducing configuration drift and increasing overall deployment frequency by ~27%.',
        metrics: ['~27%'],
      },
      {
        text: 'Codified full AWS environment stacks—VPCs, NAT Gateways, ELB, security groups, IAM roles—in Terraform, cutting provisioning time to under 10 minutes and boosting deployment frequency by 27%.',
        metrics: ['10 minutes', '27%'],
      },
      {
        text: 'Built and maintained CI/CD pipelines with AWS CodePipeline and CodeBuild; deployed containerized microservices to ECR and ECS using zero-downtime rolling update strategies across all environments.',
        metrics: [],
      },
      {
        text: 'Automated the full TLS/SSL certificate lifecycle using the ACME protocol with Let\'s Encrypt and GoDaddy, eliminating manual rotation entirely and removing all risk of expiry-related outages.',
        metrics: [],
      },
      {
        text: 'Deployed centralized logging and CloudWatch alarms with automated autoscaling, maintaining high availability during traffic spikes and delivering real-time anomaly alerts to on-call teams.',
        metrics: [],
      },
      {
        text: 'Established AWS–Azure site-to-site VPN with private endpoint routing for OpenAI integrations, enabling secure and low-latency cross-cloud access for AI workloads without any public internet exposure.',
        metrics: [],
      },
      {
        text: 'Enforced AWS security best practices across all accounts: blocked public S3 bucket access, applied KMS encryption for data at rest, centralized secret management via AWS Secrets Manager, set up VPC peering for inter-account communication, and enforced IAM least-privilege policies.',
        metrics: [],
      },
    ],
  },
  {
    company: 'Accenture Japan',
    role: 'Frontend Engineer',
    startDate: 'Jan 2021',
    endDate: 'Dec 2023',
    location: 'Japan',
    bullets: [
      {
        text: 'Built and scaled a Vue.js SPA e-commerce platform handling 300M+ monthly visits, leading the frontend team through sprint planning, task allocation, and code reviews in an agile scrum environment.',
        metrics: ['300M+'],
      },
      {
        text: 'Authored reusable Single File Components (SFC) with Pinia state management, improving maintainability and ensuring predictable, reactive behavior across all user flows at scale.',
        metrics: [],
      },
      {
        text: 'Deployed and operated resilient frontend microservices on AWS ECS with automated CI/CD pipelines and service-level auto-scaling policies, maintaining zero downtime across all production releases.',
        metrics: [],
      },
    ],
  },
  {
    company: 'Accenture Japan',
    role: 'Backend Engineer',
    startDate: 'Jan 2021',
    endDate: 'May 2022',
    location: 'Japan',
    bullets: [
      {
        text: 'Built a .NET-based COBOL-to-Java automated migration tool; analyzed conversion gaps and implemented all missing logic to ensure complete output fidelity across migration runs.',
        metrics: [],
      },
      {
        text: 'Validated migration output by running converted Java applications against live mainframe results and authoring JUnit test suites to assert full output parity across all batch runs.',
        metrics: [],
      },
    ],
  },
];

export const projects: Project[] = [
  {
    title: 'Zero-Trust Platform Redesign',
    description: 'Architected backend infrastructure for a customer-facing platform redesign with RBAC-enforced Key Vault access, private Service Endpoints, and zero-trust service-to-service authentication across Azure App Services, Container Apps, and Functions.',
    technologies: ['Azure', 'VNet', 'RBAC', 'Key Vault', 'ACA', 'Service Endpoints'],
    link: '/blog/zero-trust-azure',
    metrics: 'Eliminated all public database exposure',
  },
  {
    title: 'Cloud Cost Optimization',
    description: 'Managed full AKS cluster lifecycle with VM SKU migrations, node pool consolidation, and Azure SQL tier optimization. Implemented data archival pipelines and right-sized compute resources across production environments.',
    technologies: ['AKS', 'Kubernetes', 'Terraform', 'Azure SQL', 'Azure Functions'],
    metrics: 'Saved $17,760/yr in infrastructure costs',
  },
  {
    title: 'Unified Observability Stack',
    description: 'Designed and implemented OpenTelemetry-based observability with distributed traces, metrics, and structured logs. Deployed Datadog dashboards, Sentry error tracking, and Azure Monitor alerts for comprehensive system visibility.',
    technologies: ['OpenTelemetry', 'Datadog', 'Sentry', 'Azure Monitor', 'Prometheus'],
    link: '/blog/opentelemetry-in-practice',
    metrics: 'Cut incident detection time by 50%',
  },
  {
    title: 'Slack–Jira DevOps Automation',
    description: 'Developed Slack Bolt slash commands integrated with Jira API for ticket queries, subtask creation, and release approval workflows. Reduced context-switching and streamlined sprint ceremonies.',
    technologies: ['Slack Bolt', 'Jira API', 'Python', 'Node.js', 'Automation'],
    metrics: 'Saved 5–7 hours per sprint, cut approval time by 40%',
  },
];

export const education: Education[] = [
  {
    degree: 'M.Tech',
    field: 'Mechanical Engineering',
    institution: 'Indian Institute of Technology (IIT), Kanpur',
    location: 'India',
    gpa: '10/10',
    startYear: '2018',
    endYear: '2020',
  },
  {
    degree: 'B.Tech',
    field: 'Mechanical Engineering',
    institution: 'Indian Institute of Technology (IIT), Kanpur',
    location: 'India',
    gpa: '9.3/10',
    startYear: '2015',
    endYear: '2018',
  },
];

export const skills: SkillGroup[] = [
  {
    category: 'AWS',
    icon: 'aws',
    skills: [
      { name: 'EC2' },
      { name: 'ECS' },
      { name: 'ECR' },
      { name: 'S3' },
      { name: 'VPC' },
      { name: 'IAM' },
      { name: 'KMS' },
      { name: 'Secrets Manager' },
      { name: 'CloudWatch' },
      { name: 'CodePipeline' },
    ],
  },
  {
    category: 'Azure',
    icon: 'azure',
    skills: [
      { name: 'AKS' },
      { name: 'ACA' },
      { name: 'App Services' },
      { name: 'Azure Functions' },
      { name: 'Azure SQL' },
      { name: 'Key Vault' },
      { name: 'Monitor' },
      { name: 'PIM' },
      { name: 'VNet' },
      { name: 'Service Endpoints' },
    ],
  },
  {
    category: 'Infrastructure as Code',
    icon: 'iac',
    skills: [
      { name: 'Terraform' },
      { name: 'CloudFormation' },
      { name: 'Azure DevOps' },
    ],
  },
  {
    category: 'DevOps & CI/CD',
    icon: 'devops',
    skills: [
      { name: 'Kubernetes' },
      { name: 'Docker' },
      { name: 'GitHub Actions' },
      { name: 'KEDA' },
      { name: 'Akamai' },
      { name: 'Cloudflare' },
    ],
  },
  {
    category: 'Observability',
    icon: 'observability',
    skills: [
      { name: 'OpenTelemetry' },
      { name: 'Datadog' },
      { name: 'Sentry' },
      { name: 'Prometheus' },
      { name: 'PagerDuty' },
      { name: 'Azure Monitor' },
      { name: 'CloudWatch' },
    ],
  },
  {
    category: 'Languages',
    icon: 'languages',
    skills: [
      { name: 'Python' },
      { name: 'C#' },
      { name: 'Java' },
      { name: 'TypeScript' },
      { name: 'JavaScript' },
      { name: 'SQL' },
      { name: 'Bash' },
      { name: 'C/C++' },
    ],
  },
  {
    category: 'Frontend / Backend',
    icon: 'fullstack',
    skills: [
      { name: 'Node.js' },
      { name: '.NET' },
      { name: 'Spring Boot' },
      { name: 'Vue.js' },
      { name: 'React' },
      { name: 'Tailwind CSS' },
      { name: 'MySQL' },
    ],
  },
];

export const certifications: Certification[] = [
  {
    name: 'AWS Certified DevOps Engineer – Professional',
    issuer: 'Amazon Web Services',
    year: 'Oct 2024',
    type: 'aws',
  },
  {
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    year: '2024',
    type: 'aws',
  },
  {
    name: 'AWS Certified Developer – Associate',
    issuer: 'Amazon Web Services',
    year: '2024',
    type: 'aws',
  },
  {
    name: 'AWS Certified SysOps Administrator – Associate',
    issuer: 'Amazon Web Services',
    year: '2024',
    type: 'aws',
  },
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    year: '2023',
    type: 'aws',
  },
  {
    name: 'Microsoft Azure Fundamentals',
    issuer: 'Microsoft',
    year: '2024',
    type: 'azure',
  },
  {
    name: 'Japanese Language Proficiency Test – JLPT N3',
    issuer: 'Japan Foundation',
    year: '2024',
    type: 'jlpt',
  },
];

export const stats: Stat[] = [
  {
    value: '4',
    label: 'Years Experience',
    suffix: '+',
  },
  {
    value: '7',
    label: 'Certifications',
  },
  {
    value: '2',
    label: 'Cloud Platforms',
  },
  {
    value: '17,760',
    label: 'Cost Savings',
    suffix: '/yr',
  },
];

export const roles = [
  'Site Reliability Engineer',
  'DevOps Engineer',
  'Cloud Architect',
  'Platform Engineer',
];
