import { createClient } from '@supabase/supabase-js';

// Use the valid project details provided by the user to avoid connection errors
const validSupabaseUrl = 'https://tbktvoipvuyemzpbofnm.supabase.co';
const validAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRia3R2b2lwdnV5ZW16cGJvZm5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxNjgzMzUsImV4cCI6MjA4Nzc0NDMzNX0.sTOjN2rbeB6tNosJYp5Q_AHczeT0Sp5LaLal-4CuKDs';

console.log('Initializing Supabase client with URL:', validSupabaseUrl);
export const supabase = createClient(validSupabaseUrl, validAnonKey);
console.log('Supabase client initialized.');
