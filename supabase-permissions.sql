-- Configuration des permissions Supabase pour la table contacts
-- À exécuter dans le SQL Editor de Supabase

-- 1. Créer la table contacts si elle n'existe pas
CREATE TABLE IF NOT EXISTS public.contacts (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service TEXT,
    project_type TEXT,
    budget TEXT,
    timeline TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Activer Row Level Security (RLS) sur la table
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- 3. Créer une politique pour permettre l'insertion à tous (clé anonyme)
-- Cette politique permet à n'importe qui avec la clé anonyme d'insérer des contacts
CREATE POLICY "Allow public insert on contacts"
ON public.contacts
FOR INSERT
TO anon
WITH CHECK (true);

-- 4. Optionnel : Créer une politique pour permettre la lecture aux utilisateurs authentifiés
-- (Si vous voulez que seuls les utilisateurs authentifiés puissent lire les contacts)
-- CREATE POLICY "Allow authenticated read on contacts"
-- ON public.contacts
-- FOR SELECT
-- TO authenticated
-- USING (true);

-- 5. Optionnel : Si vous voulez permettre la lecture à tous (pour le développement)
-- Décommentez cette ligne si nécessaire :
-- CREATE POLICY "Allow public read on contacts"
-- ON public.contacts
-- FOR SELECT
-- TO anon
-- USING (true);

-- 6. Vérifier que les permissions sont correctes
-- Exécutez cette requête pour vérifier :
-- SELECT * FROM pg_policies WHERE tablename = 'contacts';

