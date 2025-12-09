-- Migration: Seed Data
-- Description: Insert initial categories and sample products

-- =============================================
-- Insert Categories
-- =============================================
INSERT INTO categories (name, slug, description, icon) VALUES
    ('Formations', 'formations', 'Cours et formations en ligne pour développer vos compétences', 'graduation-cap'),
    ('E-books', 'ebooks', 'Guides et livres numériques sur divers sujets', 'book-open'),
    ('Templates', 'templates', 'Modèles et ressources prêts à l''emploi', 'layout'),
    ('Outils', 'outils', 'Applications et outils pour booster votre productivité', 'wrench'),
    ('Objets', 'objets', 'Produits physiques exclusifs', 'package');

-- =============================================
-- Insert Sample Products
-- =============================================

-- Formations
INSERT INTO products (name, slug, description, long_description, price, category_id, product_type, image_url, tags) VALUES
(
    'Formation Marketing Digital Complet',
    'formation-marketing-digital-complet',
    'Maîtrisez toutes les facettes du marketing digital moderne en 8 semaines.',
    'Cette formation complète vous guidera à travers tous les aspects du marketing digital : SEO, publicité payante, réseaux sociaux, email marketing, et analytics. Avec plus de 40 heures de contenu vidéo, des exercices pratiques et un certificat de fin de formation, vous aurez toutes les clés pour lancer des campagnes marketing efficaces.',
    297.00,
    (SELECT id FROM categories WHERE slug = 'formations'),
    'formation',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    ARRAY['marketing', 'digital', 'seo', 'réseaux sociaux']
),
(
    'Développement Web avec React',
    'developpement-web-react',
    'Apprenez à créer des applications web modernes avec React et Next.js.',
    'De zéro à expert : cette formation vous enseignera React, les hooks, le state management, et Next.js. Vous créerez plusieurs projets concrets et serez prêt à intégrer une équipe de développement ou à lancer vos propres projets.',
    197.00,
    (SELECT id FROM categories WHERE slug = 'formations'),
    'formation',
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    ARRAY['développement', 'react', 'javascript', 'web']
),
(
    'Photographie Professionnelle',
    'photographie-professionnelle',
    'Devenez un photographe accompli avec cette formation complète.',
    'Apprenez la composition, l''éclairage, la retouche avec Lightroom et Photoshop. Cette formation couvre la photographie de portrait, paysage, produit et événementielle.',
    147.00,
    (SELECT id FROM categories WHERE slug = 'formations'),
    'formation',
    'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800',
    ARRAY['photographie', 'créatif', 'retouche']
);

-- E-books
INSERT INTO products (name, slug, description, long_description, price, category_id, product_type, image_url, tags) VALUES
(
    'Guide Complet du Freelance',
    'guide-complet-freelance',
    'Tout ce que vous devez savoir pour réussir en tant que freelance.',
    'Ce guide de 250 pages couvre tous les aspects du freelancing : trouver des clients, fixer ses tarifs, gérer son temps, aspects juridiques et fiscaux, et bien plus. Inclut des modèles de contrats et de devis.',
    29.00,
    (SELECT id FROM categories WHERE slug = 'ebooks'),
    'digital',
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800',
    ARRAY['freelance', 'business', 'guide']
),
(
    'Productivité Maximale',
    'productivite-maximale',
    'Doublez votre productivité avec ces méthodes éprouvées.',
    'Découvrez les techniques utilisées par les entrepreneurs à succès pour maximiser leur temps et leur efficacité. Ce livre aborde le time blocking, la méthode Pomodoro, GTD, et bien d''autres stratégies.',
    19.00,
    (SELECT id FROM categories WHERE slug = 'ebooks'),
    'digital',
    'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800',
    ARRAY['productivité', 'organisation', 'efficacité']
);

-- Templates
INSERT INTO products (name, slug, description, long_description, price, category_id, product_type, image_url, tags) VALUES
(
    'Pack Templates Notion Pro',
    'pack-templates-notion-pro',
    '15 templates Notion pour organiser votre vie personnelle et professionnelle.',
    'Ce pack comprend des templates pour : gestion de projet, CRM, suivi d''habitudes, journaling, planification de contenu, budget personnel, et plus encore. Tous les templates sont personnalisables et accompagnés de tutoriels vidéo.',
    39.00,
    (SELECT id FROM categories WHERE slug = 'templates'),
    'digital',
    'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800',
    ARRAY['notion', 'templates', 'productivité', 'organisation']
),
(
    'Kit Social Media Manager',
    'kit-social-media-manager',
    'Tout ce dont vous avez besoin pour gérer les réseaux sociaux de vos clients.',
    'Inclut : calendrier éditorial, templates de posts pour Canva, checklist de publication, rapports mensuels, contrats clients. Plus de 100 ressources prêtes à l''emploi.',
    59.00,
    (SELECT id FROM categories WHERE slug = 'templates'),
    'digital',
    'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800',
    ARRAY['social media', 'templates', 'marketing', 'canva']
);

-- Objets physiques
INSERT INTO products (name, slug, description, long_description, price, category_id, product_type, image_url, stock, tags) VALUES
(
    'Carnet de Notes Premium',
    'carnet-notes-premium',
    'Carnet en cuir véritable avec papier de qualité supérieure.',
    'Ce carnet artisanal est fabriqué avec du cuir italien véritable et contient 200 pages de papier ivoire 120g/m². Parfait pour le journaling, la prise de notes, ou comme agenda. Dimensions : 15x21 cm.',
    45.00,
    (SELECT id FROM categories WHERE slug = 'objets'),
    'physical',
    'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800',
    50,
    ARRAY['carnet', 'papeterie', 'premium']
),
(
    'Mug Motivation Quotidienne',
    'mug-motivation-quotidienne',
    'Commencez chaque journée avec une dose d''inspiration.',
    'Mug en céramique de haute qualité avec un design unique et des citations motivantes. Capacité : 350ml. Passe au lave-vaisselle et au micro-ondes.',
    18.00,
    (SELECT id FROM categories WHERE slug = 'objets'),
    'physical',
    'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800',
    100,
    ARRAY['mug', 'motivation', 'cadeau']
),
(
    'Poster Minimaliste Bureau',
    'poster-minimaliste-bureau',
    'Poster design pour décorer votre espace de travail.',
    'Impression sur papier mat premium 200g/m². Design minimaliste et élégant pour créer une atmosphère inspirante. Disponible en format A3 (30x42 cm).',
    25.00,
    (SELECT id FROM categories WHERE slug = 'objets'),
    'physical',
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800',
    75,
    ARRAY['poster', 'décoration', 'bureau', 'design']
);

