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
  slug: string;
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
  description: string;
  skills: Skill[];
}

export interface Certification {
  slug: string;
  name: string;
  issuer: string;
  year: string;
  type: 'aws' | 'azure' | 'jlpt';
  description: string;
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
    slug: 'bitflyer',
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
        text: 'Migrated three production AKS clusters from community ingress-nginx to F5 NGINX Ingress Controller OSS (v2.5.1) with zero downtime across all services; implemented idempotent pipeline guards for the IngressClass immutability constraint, rewrote rate limiting from ingress annotations to NGINX http-snippets with geo+map IP-bypass patterns, resolved WebSocket keepalive regressions, and reconfigured Datadog OpenMetrics scraping for the new metrics endpoint.',
        metrics: ['3 clusters'],
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
    slug: 'accenture-sre',
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
    slug: 'accenture-fullstack',
    company: 'Accenture Japan',
    role: 'Full Stack Engineer',
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
    title: 'Food Order App',
    description: 'A web-based food ordering application with user interface for browsing menus, adding items to cart, and placing orders. Built with modern JavaScript practices.',
    technologies: ['JavaScript', 'HTML', 'CSS', 'Web Development'],
    github: 'https://github.com/clouddevang/food-order-app',
  },
  {
    title: 'Socket Programming',
    description: 'Implementation of network socket programming concepts in Python, demonstrating client-server communication, TCP/UDP protocols, and concurrent connection handling.',
    technologies: ['Python', 'Networking', 'TCP/IP', 'Sockets'],
    github: 'https://github.com/clouddevang/socket-programming',
  },
  {
    title: 'Ball-Catching RRRR Manipulator',
    description: 'Developed a robotic manipulator system that catches balls thrown in a straight trajectory within its workspace. Implemented trajectory prediction and inverse kinematics algorithms for real-time motion planning.',
    technologies: ['MATLAB', 'Robotics', 'Control Systems', 'Kinematics'],
    github: 'https://github.com/clouddevang/Ball-Catching-Problem-of-RRRR-manipulator',
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
    description: 'Amazon Web Services infrastructure used across multiple production environments. Architected VPCs with NAT Gateways, IAM least-privilege policies, and KMS encryption for data at rest. Deployed containerised microservices on ECS/ECR with CodePipeline for zero-downtime releases. Enforced security best practices — blocked public S3 access, centralised secrets via Secrets Manager, and set up CloudWatch alarms with auto-scaling for high availability.',
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
    description: 'Primary cloud platform at BitFlyer — responsible for full AKS cluster lifecycle, Azure Container Apps rollout, and a zero-trust VNet security redesign. Integrated Key Vault with RBAC-enforced service identities, migrated all database connectivity to private Service Endpoints, and introduced Privileged Identity Management (PIM) to eliminate standing admin privileges. Also built Azure Functions–driven data archival pipelines saving $4,800/yr in sustained costs.',
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
    description: 'Terraform is the primary IaC tool used to codify entire cloud environments — VPCs, IAM roles, AKS clusters, Azure AD identities, and Service Principal governance. Implemented multi-environment Terraform Cloud workflows integrated with Azure DevOps VCS pipelines, reducing configuration drift and increasing deployment frequency by 27%. Full AWS environment stacks provisioned in under 10 minutes. CloudFormation used for legacy AWS setups.',
    skills: [
      { name: 'Terraform' },
      { name: 'CloudFormation' },
      { name: 'Azure DevOps' },
    ],
  },
  {
    category: 'DevOps & CI/CD',
    icon: 'devops',
    description: 'Day-to-day container orchestration and release automation — managing AKS cluster upgrades, node pool consolidations, and workload identity. Helm for application packaging and KEDA for event-driven autoscaling on Azure Container Apps. Migrated 3 production AKS clusters from community ingress-nginx to F5 NGINX Ingress Controller with zero downtime. Linkerd for service mesh, GitHub Actions for CI/CD pipelines across all personal and client projects.',
    skills: [
      { name: 'Kubernetes' },
      { name: 'Helm' },
      { name: 'Docker' },
      { name: 'GitHub Actions' },
      { name: 'KEDA' },
      { name: 'Linkerd' },
      { name: 'Akamai' },
      { name: 'Cloudflare' },
    ],
  },
  {
    category: 'Observability',
    icon: 'observability',
    description: 'End-to-end observability across distributed systems — deployed OpenTelemetry SDK instrumentation for distributed traces, metrics, and structured logs routing to Datadog. Integrated Sentry for error tracking and PagerDuty for on-call alerting. At BitFlyer, this unified observability stack cut incident detection time by 50% and drove sustained MTTR improvements. Azure Monitor and CloudWatch used for cloud-native alerting and auto-scaling triggers.',
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
    description: 'Python for infrastructure automation scripts, CLI tooling, and socket-level networking. C# for .NET microservices and Azure Functions on the BitFlyer platform. TypeScript and JavaScript for full-stack web development. Bash for shell automation and CI/CD pipeline scripting. Java and Spring Boot for backend microservices and COBOL-to-Java migration tooling. SQL for database query optimisation and schema migrations. C/C++ from IIT Kanpur engineering coursework.',
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
    description: 'Full-stack development experience spanning large-scale Vue.js SPAs to .NET and Spring Boot microservices. Led frontend development of an e-commerce platform handling 300M+ monthly visits using Vue.js with Pinia state management. Built reusable Single File Components and deployed containerised services on AWS ECS. Also developed COBOL-to-Java migration tooling in .NET and built this portfolio with React, Next.js, and Tailwind CSS.',
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
    slug: 'aws-devops-professional',
    name: 'AWS Certified DevOps Engineer – Professional',
    issuer: 'Amazon Web Services',
    year: 'Oct 2024',
    type: 'aws',
    description: 'Professional-level certification validating expertise in provisioning, operating, and managing distributed application systems on AWS. Covers CI/CD pipeline design, infrastructure as code with CloudFormation and Terraform, monitoring and logging strategies, security controls, and high-availability architecture. Directly applied in automating deployments with CodePipeline/CodeBuild and enforcing AWS security best practices across production environments.',
  },
  {
    slug: 'aws-solutions-architect',
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    year: '2024',
    type: 'aws',
    description: 'Validates ability to design resilient, cost-optimised, and high-performing cloud architectures on AWS. Covers VPC design, compute (EC2/ECS/Lambda), storage (S3/EBS/EFS), managed databases, and security best practices including IAM and KMS. Applied directly when architecting multi-tier VPC environments, setting up ELB and auto-scaling groups, and establishing site-to-site VPN between AWS and Azure for cross-cloud AI workloads.',
  },
  {
    slug: 'aws-developer',
    name: 'AWS Certified Developer – Associate',
    issuer: 'Amazon Web Services',
    year: '2024',
    type: 'aws',
    description: 'Validates proficiency in developing, deploying, and debugging cloud-based applications on AWS. Covers core services like Lambda, DynamoDB, API Gateway, SQS/SNS, and Elastic Beanstalk, as well as deployment automation with CodeDeploy and CodePipeline. Informed the design of containerised microservice deployments on ECS and secure credential management via Secrets Manager across all production environments.',
  },
  {
    slug: 'aws-sysops',
    name: 'AWS Certified SysOps Administrator – Associate',
    issuer: 'Amazon Web Services',
    year: '2024',
    type: 'aws',
    description: 'Validates operational skills for deploying, managing, and operating workloads on AWS. Focuses on monitoring (CloudWatch), networking (VPC, Route 53), storage management, security patching, and cost optimisation. Directly relevant to setting up centralised CloudWatch alarms with automated auto-scaling, maintaining high availability during traffic spikes, and enforcing IAM least-privilege policies across production AWS accounts.',
  },
  {
    slug: 'aws-cloud-practitioner',
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    year: '2023',
    type: 'aws',
    description: 'Foundational AWS certification establishing cloud literacy across core services, billing and pricing models, security concepts, and the AWS shared responsibility model. Served as the entry point into the AWS certification path, building the conceptual foundation for all subsequent associate and professional-level credentials.',
  },
  {
    slug: 'azure-fundamentals',
    name: 'Microsoft Azure Fundamentals',
    issuer: 'Microsoft',
    year: '2024',
    type: 'azure',
    description: 'Microsoft Azure foundational certification covering core cloud concepts, Azure compute, networking, storage, and database services, plus security, compliance, and pricing models. Validated the theoretical grounding behind hands-on Azure work — AKS management, VNet integration, Private Endpoints, Key Vault RBAC, and Azure Monitor — carried out daily at BitFlyer.',
  },
  {
    slug: 'jlpt-n3',
    name: 'Japanese Language Proficiency Test – JLPT N3',
    issuer: 'Japan Foundation',
    year: '2024',
    type: 'jlpt',
    description: 'Intermediate Japanese language proficiency certification administered by the Japan Foundation. N3 level demonstrates ability to understand Japanese used in everyday situations to a certain degree — reading documents, participating in team meetings, and collaborating with Japanese colleagues without a language barrier. Essential for working effectively in a Japanese engineering environment at both BitFlyer and Accenture Japan.',
  },
];

export const stats: Stat[] = [
  {
    value: '5',
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
