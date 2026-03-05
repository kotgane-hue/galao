const SUPABASE_URL = 'https://kgblltdkutkvyojpqgzx.supabase.co';
const SUPABASE_KEY = 'sb_publishable_2lHXE5oljC8PqIlnQPB_bQ_unIedzwU';

async function run() {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/tours?select=*`, {
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
        }
    });
    if (!res.ok) {
        console.error('Error:', await res.text());
        return;
    }
    const data = await res.json();
    console.log('Tours count:', data.length);
    if (data.length > 0) {
        console.log('Columns:', Object.keys(data[0]).join(', '));
        const firstTour = data[0];
        console.log('First tour image:', firstTour.image);
        console.log('First tour sort_order:', firstTour.sort_order);
        console.log('First tour details:', firstTour.details);
    }
}
run();
