import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('c:/Users/Алана/Desktop/galagon-travel/.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTours() {
    const { data, error } = await supabase.from('tours').select('*');
    if (error) {
        console.error('Error fetching tours:', error);
        return;
    }
    console.log(`Found ${data.length} tours.`);
    if (data.length > 0) {
        console.log('Sample tour keys:', Object.keys(data[0]));
        console.log('Sample tour data:', data[0]);
    }
}

checkTours();
