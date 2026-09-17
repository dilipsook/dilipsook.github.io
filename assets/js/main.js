/* ==========================================================================
   DILIP KUMAR PORTFOLIO — MAIN INTERACTION CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Sticky Navbar & Active Section Observer
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 2. Mobile Burger Menu
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuBackdrop = document.getElementById('menuBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMenu() {
    const isOpen = mobileMenu?.classList.toggle('open');
    menuBackdrop?.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    mobileMenu?.classList.remove('open');
    menuBackdrop?.classList.remove('open');
    document.body.style.overflow = '';
  }

  burgerBtn?.addEventListener('click', toggleMenu);
  menuBackdrop?.addEventListener('click', closeMenu);
  mobileLinks.forEach(l => l.addEventListener('click', closeMenu));

  // 3. Hero Dynamic Typewriter
  const typewriterElement = document.getElementById('typewriterText');
  if (typewriterElement) {
    const phrases = [
      'Multi-Cloud Architect & FinOps Leader',
      'Dual Certified: AWS & Microsoft Azure',
      '$60K+/Mo Saved in Documented FinOps',
      '1,000+ Zero-Downtime Server Migrations',
      'Trusted by Johnson & Johnson, ISRO & IAF'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 70;

    function typeLoop() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 35;
      } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 75;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2200; // Pause at completion
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400; // Pause before typing next
      }

      setTimeout(typeLoop, typeSpeed);
    }

    typeLoop();
  }

  // 4. Project Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => { card.style.display = 'none'; }, 250);
        }
      });
    });
  });

  // 5. Skills Matrix Tab Switcher
  const skillTabs = document.querySelectorAll('.skill-tab-btn');
  const skillItems = document.querySelectorAll('.skill-item');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const group = tab.getAttribute('data-skill-group') || 'all';

      skillItems.forEach(item => {
        const itemGroup = item.getAttribute('data-group') || '';
        if (group === 'all' || itemGroup === group) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 6. Project Architecture Deep-Dive Modal
  const modalBackdrop = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const inspectBtns = document.querySelectorAll('.btn-inspect-modal');

  const modalTitle = document.getElementById('modalTitle');
  const modalClient = document.getElementById('modalClient');
  const modalImpact = document.getElementById('modalImpact');
  const modalProblem = document.getElementById('modalProblem');
  const modalSolution = document.getElementById('modalSolution');
  const modalOutcomes = document.getElementById('modalOutcomes');
  const modalStack = document.getElementById('modalStack');

  // Detailed Project Blueprint Data
  const projectBlueprints = {
    'jnj': {
      title: 'Johnson & Johnson: Enterprise Labvantage LIMS Infrastructure',
      client: 'Johnson & Johnson (via Insight Enterprises)',
      impact: 'Zero-Downtime Deployment & Enterprise Compliance',
      problem: 'J&J needed to modernize and host their mission-critical Labvantage Laboratory Information Management System (LIMS) on a strictly regulated, high-availability multi-region AWS and Azure foundation with zero downtime during cutover.',
      solution: 'Architected scalable multi-AZ AWS infrastructure utilizing EC2, RDS (Multi-AZ with read replicas), S3, and Network Load Balancers fronting 10+ application servers. Deployed Oracle WebLogic for enterprise EAR packages, configured AWS MGN & AWS DMS for zero-loss database cutover, and automated routine operations via Bash scripts and AWS Systems Manager.',
      outcomes: [
        'Single-handedly architected and delivered the AWS environment with 100% SLA compliance.',
        'Executed zero-downtime go-live cutover for mission-critical laboratory operations.',
        'Enforced strict security controls via IAM least privilege, AWS WAF, and Shield.'
      ],
      stack: ['AWS EC2', 'AWS RDS Multi-AZ', 'Oracle WebLogic', 'AWS MGN', 'AWS DMS', 'RedHat Linux', 'AWS WAF', 'CloudWatch', 'Systems Manager']
    },
    'dhani': {
      title: 'Dhani Financial Services: Cloud FinOps Transformation',
      client: 'Dhani (via Rapyder Cloud Solutions)',
      impact: '$28,000 / Month Recurring AWS Savings',
      problem: 'Rapid scaling of financial services led to massive cloud sprawl, overprovisioned EC2 instances, redundant unattached EBS volumes, and untamed multi-tier data costs exceeding budget boundaries.',
      solution: 'Conducted exhaustive FinOps assessment using AWS Cost Explorer, CloudWatch metrics, and AWS Compute Optimizer. Implemented rightsizing for 100+ EC2 instances, purchased targeted 1-year and 3-year Savings Plans and Reserved Instances, instituted aggressive S3 Glacier lifecycle policies, and established automated off-hours stop/start schedules.',
      outcomes: [
        'Achieved documented $28,000/month recurring cost reduction without impacting application throughput.',
        'Instituted real-time AWS Budget alerts and cost anomaly detection to prevent future sprawl.',
        'Engineered automated dev/test instance scheduling slashing non-production compute spend by 45%.'
      ],
      stack: ['AWS Cost Explorer', 'Compute Optimizer', 'Savings Plans', 'Reserved Instances', 'S3 Glacier', 'AWS Budgets', 'CloudWatch']
    },
    'loantap': {
      title: 'LoanTap Fintech: Cloud Architecture & FinOps Governance',
      client: 'LoanTap Financial Technology',
      impact: '$2,000/mo Saved & Employee of Quarter Award',
      problem: 'Fast-growing fintech required robust, compliant AWS infrastructure for consumer lending applications with airtight security, continuous delivery, and optimized monthly spend.',
      solution: 'Engineered AWS environment from scratch; configured Nginx, Apache, PHP, Redis cache, and MySQL databases. Configured Cloudflare DNS and CDN, implemented AWS WAF and ALB rules for API protection, and automated delivery via GitHub/Jenkins CI/CD pipelines.',
      outcomes: [
        'Awarded Employee of the Quarter (April 2022) for exceptional architecture & impact.',
        'Saved $2,000/month through continuous rightsizing and database storage optimization.',
        'Eliminated manual deployments with end-to-end automated CI/CD pipeline.'
      ],
      stack: ['AWS EC2', 'AWS RDS', 'Redis', 'Nginx', 'Cloudflare CDN', 'AWS WAF', 'Jenkins CI/CD', 'GitHub']
    },
    'isro': {
      title: 'ISRO (SDSC SHAR): Secure Air-Gapped VDI Infrastructure',
      client: 'ISRO — Satish Dhawan Space Centre',
      impact: '100-Seat Isolated VDI for Space Research Center',
      problem: 'ISRO required a completely isolated, air-gapped Virtual Desktop Infrastructure (VDI) capable of supporting 100 engineers working on sensitive space mission applications without external internet connectivity.',
      solution: 'Deployed high-performance on-premises virtualization stack utilizing VMware ESXi cluster, vCenter Server, and VMware Horizon View VDI. Configured centralized user management, profile redirection, and secure thin client connectivity for 100 Dell Wyse endpoints.',
      outcomes: [
        'Built 100% air-gapped, isolated VDI infrastructure adhering to national defense standards.',
        'Provided high-availability failover across virtualization compute hosts.',
        'Seamless user workspace delivery across 100 Dell Wyse thin client hardware stations.'
      ],
      stack: ['VMware ESXi', 'VMware vCenter', 'VMware Horizon VDI', 'Dell Wyse', 'Active Directory', 'Air-Gapped LAN']
    },
    'iaf': {
      title: 'Indian Air Force: High-Security Mini Data Center',
      client: 'Indian Air Force, Bengaluru',
      impact: 'Mission-Critical Virtualization & Hardware Redundancy',
      problem: 'Required installation and configuration of a resilient on-premises mini data center with enterprise Windows virtualization, hardware RAID redundancy, and robust Active Directory domain services for defense operations.',
      solution: 'Assembled and rack-mounted Fujitsu Primergy servers inside 45U defense-grade server racks. Configured hardware RAID-5 arrays, installed Windows Server 2012 R2, configured Hyper-V failover clusters, and established secure Active Directory Domain Services (AD DS).',
      outcomes: [
        'Delivered complete physical server rack buildout, cabling, and power distribution.',
        'Configured fault-tolerant RAID-5 storage arrays and Hyper-V virtualization.',
        'Enforced strict group policy security baselines and role-based access delegation.'
      ],
      stack: ['Windows Server', 'Hyper-V', 'RAID-5 Hardware', 'Fujitsu Primergy', 'AD DS', 'Cisco Networking']
    },
    'bbk': {
      title: 'Biryani By Kilo: High-Traffic FoodTech Multi-Account AWS',
      client: 'Biryani By Kilo (BBK)',
      impact: 'Multi-Account Scalable Architecture for Flash-Sale Traffic',
      problem: 'Food delivery platform experienced massive traffic spikes during festival seasons and meal rush hours, necessitating a scalable, fault-tolerant multi-account AWS architecture.',
      solution: 'Designed multi-account AWS architecture orchestrated via AWS Organizations. Configured Auto Scaling Groups (ASG) fronted by Application Load Balancers, Amazon Aurora MySQL for low-latency queries, Amazon S3 for assets, and Route 53 for latency-based routing.',
      outcomes: [
        'Achieved 100% uptime during peak holiday order surges of 50,000+ simultaneous users.',
        'Segregated development, staging, and production environments across dedicated AWS accounts.',
        'Implemented auto-scaling policies responding to traffic spikes in under 60 seconds.'
      ],
      stack: ['AWS Organizations', 'AWS Aurora MySQL', 'Auto Scaling Groups', 'ALB', 'Route 53', 'Amazon S3']
    },
    'ksrsac': {
      title: 'KSRSAC (Govt of Karnataka): 45U Enterprise Data Center',
      client: 'Karnataka State Remote Sensing Application Center',
      impact: 'Tier-Ready Data Center with 10G Fiber SAN Storage Fabric',
      problem: 'Karnataka State Remote Sensing agency required massive high-density storage and compute infrastructure to store satellite imagery, GIS geospatial data, and remote sensing feeds.',
      solution: 'Built data center spanning 42U and 30U server racks. Installed Fujitsu Primergy servers, connected 9 drive enclosures to Fujitsu Eternus DX-500 SAN storage via SAS cables and 10G SFP fiber links, and configured Windows Server failover clustering.',
      outcomes: [
        'Engineered enterprise SAN fabric delivering gigabit throughput for geospatial raster analysis.',
        'Implemented failover clustering with zero single points of failure.',
        'Organized structured cable management, SFP optical transceivers, and redundant power rails.'
      ],
      stack: ['Fujitsu Eternus DX-500', '10G SFP Fiber', 'Windows Server', 'Failover Clustering', 'SAS Fabric']
    },
    'serviceplus': {
      title: 'ServicePlus: Rackspace to AWS RDS DMS Migration',
      client: 'ServicePlus',
      impact: 'Zero Data Loss Database Migration & $1,500/mo Saved',
      problem: 'Legacy application hosted on Rackspace suffered from high hosting costs, manual backup procedures, and lack of automated disaster recovery.',
      solution: 'Migrated production MySQL databases from Rackspace to AWS RDS using AWS Database Migration Service (AWS DMS) with ongoing replication (CDC) to eliminate downtime. Configured automated snapshots, multi-AZ failover, and rightsized DB instance tiers.',
      outcomes: [
        'Completed full database cutover with zero data loss and less than 15 minutes scheduled window.',
        'Saved client $1,500/month on managed hosting bills.',
        'Implemented automated backup retention and point-in-time recovery (PITR).'
      ],
      stack: ['AWS DMS', 'AWS RDS MySQL', 'Rackspace', 'CloudWatch', 'Route 53']
    },
    'navi': {
      title: 'Navi: On-Premises to AWS Migration Hub Lift-and-Shift',
      client: 'Navi Technologies',
      impact: 'Enterprise Discovery, Landing Zone & Cutover Assessment',
      problem: 'Navi needed to migrate on-premises workloads into AWS with a secure, standardized landing zone and comprehensive dependency discovery.',
      solution: 'Employed AWS Migration Hub and Application Discovery Service to inventory server dependencies. Designed multi-AZ VPC architecture with public/private subnets, configured ALB and ASG, and enabled AWS GuardDuty and CloudTrail governance.',
      outcomes: [
        'Accurately mapped 40+ application dependencies prior to cutover.',
        'Provisioned compliant landing zone adhering to AWS Well-Architected Framework.',
        'Automated server replication and rollback validation.'
      ],
      stack: ['AWS Migration Hub', 'Discovery Service', 'VPC Multi-AZ', 'ALB/ASG', 'GuardDuty', 'CloudTrail']
    }
  };

  inspectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project-id');
      const data = projectBlueprints[projId];
      if (!data || !modalBackdrop) return;

      modalTitle.textContent = data.title;
      modalClient.textContent = data.client;
      modalImpact.textContent = data.impact;
      modalProblem.textContent = data.problem;
      modalSolution.textContent = data.solution;

      // Render Outcomes
      modalOutcomes.innerHTML = '';
      data.outcomes.forEach(out => {
        const li = document.createElement('li');
        li.textContent = out;
        modalOutcomes.appendChild(li);
      });

      // Render Stack
      modalStack.innerHTML = '';
      data.stack.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'tech-chip';
        span.textContent = tech;
        modalStack.appendChild(span);
      });

      // Render Dedicated Architecture Topology Blueprint Diagram
      if (window.DilipBlueprint && window.DilipBlueprint.render) {
        window.DilipBlueprint.render(projId);
      }

      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modalBackdrop?.classList.remove('open');
    document.body.style.overflow = '';
  }

  modalCloseBtn?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop?.classList.contains('open')) closeModal();
  });

  // 7. Copy Email with Toast Feedback
  const copyBtn = document.getElementById('copyEmailBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('dilipsook@gmail.com').then(() => {
        const origText = copyBtn.textContent;
        copyBtn.textContent = 'Copied! ✓';
        copyBtn.style.background = '#10b981';
        copyBtn.style.borderColor = '#10b981';
        setTimeout(() => {
          copyBtn.textContent = origText;
          copyBtn.style.background = '';
          copyBtn.style.borderColor = '';
        }, 2200);
      });
    });
  }

  // 8. Real Direct Message Transmission (FormSubmit.co + mailto fallback)
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    const name = document.getElementById('contactName')?.value.trim();
    const email = document.getElementById('contactEmail')?.value.trim();
    const subjectSelect = document.getElementById('contactSubject');
    const subjectText = subjectSelect?.options[subjectSelect.selectedIndex]?.text || 'Enterprise Inquiry';
    const message = document.getElementById('contactMessage')?.value.trim();

    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Transmitting to Dilip...</span> <span>⏳</span>';
    }

    try {
      const response = await fetch('https://formsubmit.co/ajax/dilipsook@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          subject: `Portfolio Inquiry: ${subjectText}`,
          message: message,
          _subject: `[Portfolio] ${subjectText} — from ${name}`,
          _template: 'table'
        })
      });

      const data = await response.json();
      console.log('FormSubmit response:', data);

      if (data.message && data.message.toLowerCase().includes('activation')) {
        if (formFeedback) {
          formFeedback.style.display = 'block';
          formFeedback.style.background = 'rgba(245, 158, 11, 0.15)';
          formFeedback.style.border = '1px solid #f59e0b';
          formFeedback.style.color = '#fde68a';
          formFeedback.innerHTML = '<strong>⚠️ Activation Required:</strong> FormSubmit has sent a 1-time activation link to <code>dilipsook@gmail.com</code>.<br>Please check your inbox (or Spam folder) and click <strong>Activate Form</strong>. After clicking it once, all future submissions will arrive directly in your inbox.';
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Check Email to Activate</span> <span>📬</span>';
        }
      } else if (response.ok || data.success === 'true' || data.success === true) {
        if (formFeedback) {
          formFeedback.style.display = 'block';
          formFeedback.style.background = 'rgba(16, 185, 129, 0.15)';
          formFeedback.style.border = '1px solid #10b981';
          formFeedback.style.color = '#a7f3d0';
          formFeedback.innerHTML = '<strong>Message Sent Successfully!</strong> Your inquiry has been dispatched directly to Dilip at <code>dilipsook@gmail.com</code>. I will review and reply within 24 hours.';
        }
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Message Dispatched ✓</span>';
          setTimeout(() => {
            submitBtn.innerHTML = '<span>Send Message</span> <span>🚀</span>';
            if (formFeedback) formFeedback.style.display = 'none';
          }, 8000);
        }
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      console.warn('FormSubmit AJAX fallback to mailto:', err);
      // Seamless mailto fallback
      const mailtoUrl = `mailto:dilipsook@gmail.com?subject=${encodeURIComponent('Inquiry from Portfolio: ' + subjectText)}&body=${encodeURIComponent('Name / Org: ' + name + '\nEmail: ' + email + '\nFocus Area: ' + subjectText + '\n\nMessage:\n' + message)}`;
      
      if (formFeedback) {
        formFeedback.style.display = 'block';
        formFeedback.style.background = 'rgba(56, 189, 248, 0.15)';
        formFeedback.style.border = '1px solid #38bdf8';
        formFeedback.style.color = '#bae6fd';
        formFeedback.innerHTML = `<strong>Direct Email:</strong> Click below to send directly from your email client:<br><a href="${mailtoUrl}" class="btn-secondary" style="display:inline-block; margin-top:8px; padding:6px 14px; font-size:0.85rem;">Open Email Client (${email}) ✉️</a>`;
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Send Message</span> <span>🚀</span>';
      }
    }
  });

  // 9. Scroll Reveal with Intersection Observer
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));

});
