/* eslint-disable no-unused-vars */
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://vgbfbajsepobgszdnpic.supabase.co';
// const supabaseServiceRole =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnYmZiYWpzZXBvYmdzemRucGljIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMzQ1MDAyOSwiZXhwIjoyMDM5MDI2MDI5fQ.SBdJa3CedO-Wf5ivgRO9KwGJ8_8hDTDnO72RulcPaMo';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnYmZiYWpzZXBvYmdzemRucGljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM0NTAwMjksImV4cCI6MjAzOTAyNjAyOX0.Rxojy5MScJJI3fWS7GKsiGyBeW6BlagojTQU6Dw7lHI';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
