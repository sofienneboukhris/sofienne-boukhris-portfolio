import express from "express";
import http from "http";
import path from "path";
import rateLimit from "express-rate-limit";
import { createServer as createViteServer } from "vite";
import { requireAuth, AuthRequest } from './src/middleware/auth.ts';
import { getUsers } from './src/db/users.ts';
import { createAdmin, getAdminByEmail } from './src/db/admins.ts';
import { getConfig, setConfig } from './src/db/config.ts';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createCalculatorLead, getCalculatorLeads, updateCalculatorLeadStatus, deleteCalculatorLead, createFormSubmission, getFormSubmissions, updateFormSubmissionStatus, deleteFormSubmission } from './src/db/leads.ts';

if (!process.env.JWT_SECRET) {
  console.warn("⚠️ [SECURITY WARNING] JWT_SECRET is not set in environment! Using fallback for development. Define JWT_SECRET in production.");
}
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_sofiene_secure_fallback_2026';
const ADMIN_INVITE_SECRET = process.env.ADMIN_INVITE_SECRET;

// Rate Limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Trop de tentatives de connexion. Veuillez réessayer dans 15 minutes." }
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Trop de tentatives de création de compte. Veuillez réessayer plus tard." }
});

const submissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Trop de soumissions envoyées. Veuillez réessayer plus tard." }
});

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const PORT = 3000;

  // Performance and Security Headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  // Add JSON parsing middleware limited to 1mb to prevent DoS attacks
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ limit: '1mb', extended: true }));

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Dynamic Sitemap XML Generation
  app.get("/sitemap.xml", async (req, res) => {
    try {
      const baseUrl = "https://sofienneboukhris.com";
      const today = new Date().toISOString().split('T')[0];

      // Static routes with priorities and frequencies
      const staticRoutes = [
        { path: "", priority: "1.0", changefreq: "daily" },
        { path: "/en", priority: "1.0", changefreq: "daily" },
        { path: "/services", priority: "0.9", changefreq: "weekly" },
        { path: "/en/services", priority: "0.9", changefreq: "weekly" },
        { path: "/realisations", priority: "0.8", changefreq: "weekly" },
        { path: "/en/projects", priority: "0.8", changefreq: "weekly" },
        { path: "/calculateur", priority: "0.9", changefreq: "weekly" },
        { path: "/en/calculator", priority: "0.9", changefreq: "weekly" },
        { path: "/tarifs", priority: "0.8", changefreq: "monthly" },
        { path: "/en/pricing", priority: "0.8", changefreq: "monthly" },
        { path: "/a-propos", priority: "0.7", changefreq: "monthly" },
        { path: "/en/about", priority: "0.7", changefreq: "monthly" },
        { path: "/faq", priority: "0.7", changefreq: "monthly" },
        { path: "/en/faq", priority: "0.7", changefreq: "monthly" },
        { path: "/contact", priority: "0.8", changefreq: "monthly" },
        { path: "/en/contact", priority: "0.8", changefreq: "monthly" },
        { path: "/blog", priority: "0.8", changefreq: "daily" },
        { path: "/en/blog", priority: "0.8", changefreq: "daily" },
        { path: "/developpeur-web-tunisie", priority: "0.9", changefreq: "monthly" },
        { path: "/developpeur-web-sousse", priority: "0.9", changefreq: "monthly" }
      ];

      // Fetch dynamic content from database
      let dbData: any = null;
      try {
        dbData = await getConfig('app_data');
      } catch (e) {
        console.warn("Sitemap: failed to load dynamic app_data, using default fallback slugs", e);
      }

      // Default fallbacks if database table is not yet seeded
      const defaultServiceSlugs = [
        'site-vitrine-professionnel',
        'site-e-commerce',
        'site-e-commerce/shopify',
        'developpement-sur-mesure-laravel',
        'maintenance-optimisation-web',
        'referencement-naturel-seo'
      ];
      const defaultProjectSlugs = [
        'ecommerce-mode-luxe',
        'plateforme-saas-b2b',
        'refonte-vitrine-cabinet'
      ];
      const defaultBlogSlugs = [
        'combien-coute-site-internet-tunisie-2025',
        'wordpress-vs-developpement-sur-mesure-guide',
        'optimiser-seo-local-visibilite-tunisie'
      ];

      const servicesList: string[] = (dbData?.services && Array.isArray(dbData.services) && dbData.services.length > 0)
        ? dbData.services.map((s: any) => s.slug).filter(Boolean)
        : defaultServiceSlugs;

      const projectsList: string[] = (dbData?.projects && Array.isArray(dbData.projects) && dbData.projects.length > 0)
        ? dbData.projects.map((p: any) => p.slug).filter(Boolean)
        : defaultProjectSlugs;

      const blogList: string[] = (dbData?.blogPosts && Array.isArray(dbData.blogPosts) && dbData.blogPosts.length > 0)
        ? dbData.blogPosts.map((b: any) => b.slug).filter(Boolean)
        : defaultBlogSlugs;

      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

      // 1. Static routes
      for (const route of staticRoutes) {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}${route.path}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
        xml += `    <priority>${route.priority}</priority>\n`;
        xml += `  </url>\n`;
      }

      // 2. Dynamic Services routes
      for (const slug of servicesList) {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/services/${slug}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += `  </url>\n`;
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/en/services/${slug}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += `  </url>\n`;
      }

      // 3. Dynamic Projects routes
      for (const slug of projectsList) {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/realisations/${slug}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/en/projects/${slug}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      }

      // 4. Dynamic Blog routes
      for (const slug of blogList) {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/blog/${slug}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/en/blog/${slug}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      }

      xml += `</urlset>`;

      res.header('Content-Type', 'application/xml; charset=utf-8');
      res.header('Cache-Control', 'public, max-age=3600');
      res.send(xml);
    } catch (err) {
      console.error("Sitemap generation error:", err);
      res.status(500).send("Error generating sitemap");
    }
  });

  // Config routes
  app.get("/api/config", async (req, res) => {
    try {
      const data = await getConfig('app_data');
      res.json(data || {});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch config" });
    }
  });

  app.post("/api/config", requireAuth, async (req, res) => {
    try {
      await setConfig('app_data', req.body);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update config" });
    }
  });

  // Leads & Form Submissions with rate limiting
  app.post("/api/calculator-leads", submissionLimiter, async (req, res) => {
    try {
      const result = await createCalculatorLead(req.body);
      res.json({ success: true, id: result[0].id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create lead" });
    }
  });

  app.get("/api/calculator-leads", requireAuth, async (req, res) => {
    try {
      const leads = await getCalculatorLeads();
      res.json(leads);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  app.patch("/api/calculator-leads/:id/status", requireAuth, async (req, res) => {
    try {
      await updateCalculatorLeadStatus(parseInt(req.params.id), req.body.status);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update lead status" });
    }
  });

  app.delete("/api/calculator-leads/:id", requireAuth, async (req, res) => {
    try {
      await deleteCalculatorLead(parseInt(req.params.id));
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete lead" });
    }
  });

  app.post("/api/form-submissions", submissionLimiter, async (req, res) => {
    try {
      const result = await createFormSubmission(req.body);
      res.json({ success: true, id: result[0].id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create form submission" });
    }
  });

  app.get("/api/form-submissions", requireAuth, async (req, res) => {
    try {
      const subs = await getFormSubmissions();
      res.json(subs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch form submissions" });
    }
  });

  app.patch("/api/form-submissions/:id/status", requireAuth, async (req, res) => {
    try {
      await updateFormSubmissionStatus(parseInt(req.params.id), req.body.status);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update form submission status" });
    }
  });

  app.delete("/api/form-submissions/:id", requireAuth, async (req, res) => {
    try {
      await deleteFormSubmission(parseInt(req.params.id));
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete form submission" });
    }
  });

  // Auth routes with security & rate limiting
  app.post("/api/auth/register", registerLimiter, async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ error: "Champs obligatoires manquants." });
      }

      // Security: enforce invite secret
      const inviteSecret = req.headers['x-admin-invite-secret'] || req.body?.inviteSecret;
      if (!ADMIN_INVITE_SECRET || ADMIN_INVITE_SECRET.trim() === '') {
        return res.status(403).json({
          error: "L'enregistrement d'administrateurs est désactivé. Veuillez configurer ADMIN_INVITE_SECRET sur le serveur pour autoriser de nouveaux comptes."
        });
      }

      if (!inviteSecret || inviteSecret !== ADMIN_INVITE_SECRET) {
        return res.status(403).json({
          error: "Clé secrète d'invitation administrateur invalide ou non fournie."
        });
      }

      const existingAdmin = await getAdminByEmail(email);
      if (existingAdmin) {
        return res.status(400).json({ error: "Cette adresse email est déjà enregistrée." });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const admin = await createAdmin(name, email, passwordHash);

      const token = jwt.sign({ id: admin.id, email: admin.email, role: admin.role }, JWT_SECRET, { expiresIn: '24h' });
      res.json({ token, user: { id: admin.id, name: admin.name, email: admin.email, role: admin.role } });
    } catch (err: any) {
      console.error("Register error:", err);
      res.status(500).json({ error: "Erreur interne du serveur lors de l'enregistrement." });
    }
  });

  app.post("/api/auth/login", authLimiter, async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "Email et mot de passe requis." });
      }

      const admin = await getAdminByEmail(email);
      if (!admin) {
        return res.status(401).json({ error: "Identifiants invalides." });
      }

      const isMatch = await bcrypt.compare(password, admin.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ error: "Identifiants invalides." });
      }

      const token = jwt.sign({ id: admin.id, email: admin.email, role: admin.role }, JWT_SECRET, { expiresIn: '24h' });
      res.json({ token, user: { id: admin.id, name: admin.name, email: admin.email, role: admin.role } });
    } catch (err: any) {
      console.error("Login error:", err);
      res.status(500).json({ error: "Erreur interne du serveur lors de la connexion." });
    }
  });

  // Example protected route
  app.get("/api/users", requireAuth, async (req: AuthRequest, res) => {
    try {
      const users = await getUsers();
      res.json(users);
    } catch (error: any) {
      console.error("Failed to fetch users:", error);
      res.status(500).json({ error: error.message || "Failed to fetch users" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const isHmrDisabled = process.env.DISABLE_HMR === 'true';
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: isHmrDisabled
          ? false
          : {
              server: httpServer,
            },
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, {
      maxAge: '1d',
      etag: true,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache');
        } else if (filePath.includes('/assets/')) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
      }
    }));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
