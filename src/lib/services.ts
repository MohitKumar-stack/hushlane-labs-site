export type ServiceFaq = { question: string; answer: string }

export type Service = {
  slug: string
  navLabel: string
  eyebrow: string
  h1: string
  metaTitle: string
  metaDescription: string
  lede: string
  card: string
  overview: string
  intro: string[]
  deliverables: { title: string; detail: string }[]
  process: { title: string; detail: string }[]
  tech: { name: string; note: string }[]
  faqs: ServiceFaq[]
  related: string[]
  caseStudy?: string
}

export const services: Service[] = [
  {
    slug: "white-label-web-development",
    navLabel: "Web development",
    eyebrow: "White-label web development",
    h1: "White-label web development for agencies",
    metaTitle: "White Label Web Development for Agencies",
    metaDescription:
      "White label web development for agencies in the US, UK, Australia, and Canada. Marketing sites, product sites, and headless CMS builds under your brand.",
    lede: "You sold the website. We build it in your design system, on your client's domain, and we never appear in the footer.",
    card: "Marketing and product sites your client launches on their domain, with a CMS their team will actually edit.",
    overview:
      "Page builds, headless CMS setups, and technical SEO foundations. The hosting account, the analytics property, and the public credit stay with your agency or your client.",
    intro: [
      "White-label web development here is implementation with judgment. Send a brief, a Figma file, or a rough sitemap. We turn it into a fast site your agency can launch without introducing a second brand.",
      "Most of the work is marketing and product sites: service pages, landing pages, resource hubs, and a content model an editor can understand. If the job turns into a product — a configurator, a client library, a portal skin — we say so before the estimate, and we price that separately.",
      "Search is part of the build. Each template gets one H1, a unique title, a meta description, internal links, and images with alt text. We do not promise rankings. We leave the site in a state a serious SEO program can use.",
    ],
    deliverables: [
      {
        title: "Page map",
        detail: "The list of templates and one-off pages required to launch, including what can wait.",
      },
      {
        title: "Responsive build",
        detail: "Production pages from your Figma, or a restrained interface if you need us to design.",
      },
      {
        title: "CMS and editor guide",
        detail: "A content model plus a short note so the client's team can publish without a developer.",
      },
      {
        title: "Technical SEO",
        detail: "Metadata, canonicals, sitemap, redirects, and alt text. No plugin dumped in at the end.",
      },
      {
        title: "Launch pack",
        detail: "Analytics in the client's property, DNS notes, and a repository your agency owns.",
      },
    ],
    process: [
      {
        title: "Read the sale",
        detail: "We start from the proposal you already closed, the brand rules, and the pages that have to exist.",
      },
      {
        title: "Lock the templates",
        detail: "Sitemap, content model, and a clickable pass on the pages that repeat.",
      },
      {
        title: "Build in the open",
        detail: "A preview URL your team can review. Feedback stays in one thread.",
      },
      {
        title: "Hand over the launch",
        detail: "Redirects, DNS, and a warranty window written into the statement of work.",
      },
    ],
    tech: [
      { name: "Next.js", note: "For sites that need to stay fast and editable for years." },
      { name: "TypeScript", note: "So the next developer is not guessing at the data." },
      { name: "Tailwind CSS", note: "Matched to the tokens in the file you send." },
      { name: "Headless CMS", note: "The editor tool your client will tolerate, not the one we prefer." },
      { name: "Client hosting", note: "Vercel or Cloudflare in their account, not a Hushlane subdomain." },
    ],
    faqs: [
      {
        question: "Will our client see Hushlane in the footer or the repository?",
        answer:
          "No. Hosting, analytics, the repository, and the footer stay in your agency's or your client's name. We add a credit only if you ask for one in writing.",
      },
      {
        question: "Can you build inside an existing design system?",
        answer:
          "Yes. Send the Figma library or the live site. We use those tokens instead of inventing a new look for the engagement.",
      },
      {
        question: "Who writes the page copy?",
        answer:
          "Your agency or your client. We structure pages and write interface text. Long-form brand copy stays with the people who own the voice.",
      },
      {
        question: "Do you only develop, or can you design as well?",
        answer:
          "If the design exists, we implement it. If it does not, we design a quiet site and show it before build time starts.",
      },
    ],
    related: ["white-label-mvp-development", "white-label-software-development"],
  },
  {
    slug: "white-label-app-development",
    navLabel: "App development",
    eyebrow: "White-label app development",
    h1: "White-label app development your clients never trace",
    metaTitle: "White Label App Development for Agencies",
    metaDescription:
      "White label app development for agencies. iOS and Android products, device QA, and store handoff, with your client's name on the listing.",
    lede: "iOS and Android products built from a repository your agency owns, with store listings that name your client.",
    card: "Phone apps with store listings, bundle IDs, and support emails that belong to your client from the first build.",
    overview:
      "We build the flows you sold, test them on current devices, and prepare the store submission. Publishing happens from an account your agency or your client controls.",
    intro: [
      "White-label app development is where a partner usually gets exposed. A splash screen, a bundle ID, or a support address can give the studio away. We put those in your client's accounts before the first installable build, not during the week of submission.",
      "The scope is the product you described: onboarding, the core loop, accounts if the job needs them, and the screens the proposal named. We push back on screens that exist only because a template had them. A smaller app the client's team can explain is easier to launch.",
      "Store review is slow. We prepare the listing, the privacy answers, and the review notes. Your agency submits from the account it controls. If the store rejects the build, we fix the build. We do not take the client call to explain it.",
    ],
    deliverables: [
      {
        title: "Scope tied to the proposal",
        detail: "What the first release includes, and a written list of what it does not.",
      },
      {
        title: "Installable builds",
        detail: "iOS and Android from one codebase when that is the right trade for the team who will own it later.",
      },
      {
        title: "Client-owned services",
        detail: "Push, crash reporting, and analytics wired to accounts the client already controls.",
      },
      {
        title: "Device pass",
        detail: "Current OS versions, small phones, and large type. Not a simulator screenshot as proof.",
      },
      {
        title: "Store checklist",
        detail: "Listing slots, screenshots, and the privacy questionnaire, ready for your submission.",
      },
    ],
    process: [
      {
        title: "Day-one path",
        detail: "The journey a person takes on the first open, including the empty states around it.",
      },
      {
        title: "Weekly installs",
        detail: "Your team gets a build they can put on a phone, not a narrated video.",
      },
      {
        title: "Real devices",
        detail: "We test the release on hardware before anyone talks about the store.",
      },
      {
        title: "Submission pack",
        detail: "Everything the store asks for, handed to the person who owns the developer account.",
      },
      {
        title: "Review fixes",
        detail: "A defined window for store feedback, then a retainer only if you want us to stay.",
      },
    ],
    tech: [
      { name: "React Native or Flutter", note: "Chosen for the team that inherits the app, not for our habit." },
      { name: "Client backend", note: "Their API, Firebase, or Supabase. Data does not live in an account we own." },
      { name: "TestFlight and Play testing", note: "Internal tracks on their developer memberships." },
      { name: "Crash reporting", note: "The tool they already pay for, so alerts do not arrive in our inbox." },
    ],
    faqs: [
      {
        question: "Do you join calls with our client?",
        answer:
          "Not by default. Reviews happen with your team. If you want us in the room, you send the invite and you stay on the call.",
      },
      {
        question: "Whose store account publishes the app?",
        answer:
          "Your client's, or yours if you resell the product. We do not ship consumer apps from a Hushlane developer account.",
      },
      {
        question: "Can you continue an app another team started?",
        answer:
          "Yes, after we read the repository. You get a note on what we would keep and what we would rewrite before we quote the rest.",
      },
      {
        question: "Are tablets included?",
        answer:
          "Phone first, unless the brief says otherwise. Tablet layouts are a separate line so they cannot hide inside the words “mobile app.”",
      },
    ],
    related: ["white-label-ai-automation", "white-label-mvp-development"],
    caseStudy: "zappio",
  },
  {
    slug: "white-label-ai-automation",
    navLabel: "AI automation",
    eyebrow: "White-label AI automation",
    h1: "White-label AI automation for client operations",
    metaTitle: "White Label AI Automation for Agencies",
    metaDescription:
      "White label AI automation agencies can resell: inbox triage, document flows, CRM updates, and voice agents, with a human still approving the risky steps.",
    lede: "We automate the repetitive work inside a client's business and leave your agency as the vendor of record.",
    card: "Inbox, document, CRM, and phone workflows, with a person still approving anything that could embarrass the client.",
    overview:
      "Operational automation your agency can productize. We map the manual steps, connect the tools the client already pays for, and leave prompts, logs, and runbooks in their workspace.",
    intro: [
      "Agencies are being asked for AI in proposals that are really about operations. Someone wants the inbox sorted, the CRM updated, the PDFs read, or the missed calls returned. White-label AI automation is how you sell that outcome without staffing a research group.",
      "We start from the steps a person already takes. Which fields get copied, which decisions are reversible, and which ones would be costly if a model guessed. Anything that spends money, writes to a customer, or files a record keeps a human check until you have measured the error rate.",
      "The system is branded as yours. Prompts, evaluation sets, and the runbook live in the client's workspace. If they leave, they take it with them. We do not rent a black box that stops when our invoice stops, unless a retainer is what you actually sold.",
    ],
    deliverables: [
      {
        title: "Process map",
        detail: "The current steps, plus an explicit list of actions the system is not allowed to take.",
      },
      {
        title: "Integrations",
        detail: "Connections to the inbox, CRM, drive, phone system, or database already in use.",
      },
      {
        title: "Review queue",
        detail: "A place for a person to approve customer-facing or financial actions.",
      },
      {
        title: "Evaluation set",
        detail: "Real examples with names removed, so changes are judged on their work, not a demo.",
      },
      {
        title: "Operator runbook",
        detail: "What to do on a Monday when a run fails, written for the client's staff.",
      },
    ],
    process: [
      {
        title: "Collect samples",
        detail: "About twenty real items and the rule a senior person uses when the case is awkward.",
      },
      {
        title: "Draw the boundary",
        detail: "What may run alone, and what may only draft for approval.",
      },
      {
        title: "Connect with least privilege",
        detail: "Keys live in the client's account. We ask for the smallest scope that does the job.",
      },
      {
        title: "Trial on live work",
        detail: "A short period where a person still approves every consequential action.",
      },
      {
        title: "Leave a log",
        detail: "You can see what ran, what failed, and what a person changed.",
      },
    ],
    tech: [
      { name: "Model APIs", note: "Chosen per job. The proposal does not lock the client to one lab." },
      { name: "Ordinary code", note: "Rules and formatting stay deterministic where a model would be theater." },
      { name: "Existing SaaS APIs", note: "We write into the CRM they have, instead of selling them another one." },
      { name: "Queue and log", note: "A failed run can be replayed. Silent failure is a defect." },
      { name: "Voice only when needed", note: "A phone agent is a product. We scope it like one." },
    ],
    faqs: [
      {
        question: "Will you add a chatbot to their marketing site?",
        answer:
          "Only if that is the engagement. Most of the useful work is internal: sorting, drafting, filing, and routing. A public chatbot is a support product with its own scope.",
      },
      {
        question: "Whose data is sent to a model?",
        answer:
          "The client's, under their API key, with a written note of what leaves their network. We do not paste their material into a personal chat account.",
      },
      {
        question: "What happens when the model is wrong?",
        answer:
          "A person still has the last click on anything that matters. We keep the failures so the next change is based on those cases.",
      },
      {
        question: "Can you repeat this for every client of a packaged offer?",
        answer:
          "Yes. If you sell a named service — a receptionist, a proposal desk, an intake lane — we build it once and stand it up per client with their keys and their brand.",
      },
    ],
    related: ["white-label-software-development", "white-label-app-development"],
    caseStudy: "zappio",
  },
  {
    slug: "white-label-software-development",
    navLabel: "Software development",
    eyebrow: "White-label software development",
    h1: "A white-label software development partner",
    metaTitle: "White Label Software Development Partner",
    metaDescription:
      "Outsource development to India through a white-label software development partner. Portals, integrations, and internal tools under your agency's brand.",
    lede: "Portals, integrations, and internal tools for agencies that want senior delivery without adding a vendor to the org chart.",
    card: "The system between the slides and the spreadsheet: portals, sync jobs, and the admin tool staff will use daily.",
    overview:
      "Custom software for client operations. You stay client of record. We work in your GitHub, on a named team, with the intellectual property assigned as the statement of work says.",
    intro: [
      "Some agency work is neither a website nor an app store product. It is the system in the middle: a client portal, a back office, a sync between two products they already pay for, an admin tool their staff will open every morning.",
      "Agencies outsource development to India when they want that work done carefully and they do not want a second logo in the kickoff. Hushlane is built for that arrangement. Your team stays the face of the project. Ours stays in the repository, the pull requests, and the weekly note.",
      "The team stays small. A named lead, the people writing the code, and no deck of unnamed profiles. If a project needs a specialty we do not have, we say so before the statement of work, not halfway through their production data.",
    ],
    deliverables: [
      {
        title: "Domain model",
        detail: "The objects, roles, and permissions, written down before the interface multiplies them.",
      },
      {
        title: "Staged releases",
        detail: "Something your team can show a client without narrating a slide.",
      },
      {
        title: "Environments",
        detail: "A place to review that is not production, plus a list of who can reach production.",
      },
      {
        title: "Handoff notes",
        detail: "Enough for a developer who was not on the project to run the system.",
      },
      {
        title: "Assigned IP",
        detail: "Ownership transfers to the party named in the statement of work once the related invoices are paid.",
      },
    ],
    process: [
      {
        title: "Watch the operation",
        detail: "Roles, exceptions, and the spreadsheet the software is supposed to replace.",
      },
      {
        title: "Contract the edges",
        detail: "Which other systems we may touch, and which we will leave alone.",
      },
      {
        title: "Ship a slice",
        detail: "A usable piece before the whole picture is finished.",
      },
      {
        title: "Review access",
        detail: "Production credentials are listed, temporary, and removed at handoff.",
      },
      {
        title: "Choose the ending",
        detail: "A clean handoff or a retainer. Both are decided before kickoff.",
      },
    ],
    tech: [
      { name: "TypeScript", note: "Across the product and the jobs around it." },
      { name: "PostgreSQL", note: "When the data needs a schema more than a document pile." },
      { name: "SaaS APIs", note: "The tools already in the account, with the smallest scopes that work." },
      { name: "Preview environments", note: "Review happens on a URL, not in a screen recording." },
      { name: "Their cloud", note: "Infrastructure in the client or agency account when they have one." },
    ],
    faqs: [
      {
        question: "Is this staff augmentation or a fixed project?",
        answer:
          "Either. A dedicated developer sits in your queue. A fixed project has a boundary and milestones. The pricing page separates them. We do not rotate people through either one.",
      },
      {
        question: "What hours overlap with the US, UK, and Australia?",
        answer:
          "A shared window for review, plus written updates that do not depend on someone being awake. Australian reviews are booked on purpose. The rest of that collaboration is async and written.",
      },
      {
        question: "Why outsource development to India if the client hired our agency?",
        answer:
          "Because the client hired you, and the build still has to happen. We stay off the masthead so your agency remains the company they call.",
      },
      {
        question: "Can you work inside our GitHub organization?",
        answer:
          "Yes. We prefer it. Your agency owns the org, the billing, and the ability to remove our access in an afternoon.",
      },
    ],
    related: ["white-label-web-development", "white-label-ai-automation"],
    caseStudy: "lumic",
  },
  {
    slug: "white-label-mvp-development",
    navLabel: "MVP development",
    eyebrow: "White-label MVP development",
    h1: "White-label MVP development for pitches you already sold",
    metaTitle: "White Label MVP Development for Agencies",
    metaDescription:
      "White-label MVP development for agencies. A fixed boundary, working software, and a handoff your team can extend after the first client demo.",
    lede: "A small product with a hard edge, so your agency can demo it under your name and keep building after the first yes.",
    card: "A first release cut to one job, built so the demo stores real data and the next milestone is optional.",
    overview:
      "For agencies that have already sold a first version. We cut the pitch to a boundary, build that path, and stop. Continuing is a new statement of work.",
    intro: [
      "An MVP is not a cheaper copy of the full product. It is the smallest thing that lets a specific person finish a specific job. Agencies get hurt when the first release quietly grows accounts, billing, admin, notifications, and three roles because nobody cut the list.",
      "White-label MVP development starts by cutting. We mark what this release will do, what it will fake honestly, and what it will refuse. Your client sees a working path. They do not see a clickable prototype that forgets everything on refresh.",
      "The handoff is the point. The repository is ordinary, the setup is written down, and the next milestone can be your team, our team, or another studio. That is what makes it reasonable to put your brand on a first version.",
    ],
    deliverables: [
      {
        title: "One-page boundary",
        detail: "In, out, and anything that is faked on purpose so nobody confuses it for a missing feature.",
      },
      {
        title: "The core path",
        detail: "Built, with data stored where the statement of work says it is stored.",
      },
      {
        title: "One outcome metric",
        detail: "Instrumentation for the action you sold, not a dashboard of vanity charts.",
      },
      {
        title: "A finish that matches the client",
        detail: "Visuals from the agency's system, or a simple one we propose before building.",
      },
      {
        title: "A stop",
        detail: "Handoff notes and a candidate list for a second release. The list is not a promise.",
      },
    ],
    process: [
      {
        title: "Cut the pitch",
        detail: "Agree what “done” means for this release before anyone opens a design file.",
      },
      {
        title: "Design only that path",
        detail: "The screens the path needs. No gallery of future modules.",
      },
      {
        title: "Build narrowly",
        detail: "Production-quality code on a small surface, so the shortcut is the scope, not the craft.",
      },
      {
        title: "Instrument the outcome",
        detail: "One event that tells you whether anyone finished the job you sold.",
      },
      {
        title: "Demo and decide",
        detail: "A repository, a working build, and a choice about what happens next.",
      },
    ],
    tech: [
      { name: "A stack that can live", note: "The same choices we would make if the product had to last a year." },
      { name: "Auth only if needed", note: "Accounts are a product. We add them when the path requires them." },
      { name: "A real database", note: "Once more than one person is entering data, a spreadsheet is not the backend." },
      { name: "Flags for the demo", note: "Anything the pitch shows and the public should not touch stays behind a flag." },
      { name: "Their deployment", note: "The build runs in an account the agency or the client can revoke." },
    ],
    faqs: [
      {
        question: "How many weeks should we tell the client?",
        answer:
          "Often four to eight weeks after the boundary is agreed. We do not quote weeks until that cut is written down.",
      },
      {
        question: "What if they add a feature during the build?",
        answer:
          "It goes on a list. It enters the release only if something else leaves. That trade is a conversation with you.",
      },
      {
        question: "Do you need a finished brand?",
        answer:
          "We need a name, a customer, and the job the product does. Visual polish can follow the system you already have.",
      },
      {
        question: "Is a clickable prototype enough?",
        answer:
          "If you sold a prototype, we can build one. If you sold software, the first version stores data and survives a refresh. We ask which promise is in the proposal.",
      },
    ],
    related: ["white-label-app-development", "white-label-web-development"],
  },
]

export function getService(slug: string) {
  return services.find((service) => service.slug === slug)
}
