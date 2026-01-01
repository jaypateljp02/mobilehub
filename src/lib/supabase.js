import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yacewvulqufaqhgichry.supabase.co';
const supabaseKey = 'sb_publishable_i_2MtUBTFuDFm0ls73CKsA_loGQYX0o';

export const supabase = createClient(supabaseUrl, supabaseKey);
