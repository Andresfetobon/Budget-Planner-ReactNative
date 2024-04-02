import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  'https://iekizkkusjfsusgezwyq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlla2l6a2t1c2pmc3VzZ2V6d3lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIwNzAwOTMsImV4cCI6MjAyNzY0NjA5M30.bVcmcKdE3OK9HzVA6rHsOmCO3LwDtoaYORRLdhspcy4 '
);
