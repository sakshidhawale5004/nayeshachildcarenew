import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const requestSchema = z.object({
  parent_name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().regex(/^[+()\d\s-]{7,25}$/),
  therapy: z.enum(['occupational-therapy', 'speech-therapy', 'special-education', 'behavioral-therapy', 'counselling']),
  message: z.string().trim().max(1000),
  website: z.string().max(0),
});

export const requestAppointment = createServerFn({ method: 'POST' })
  .inputValidator((data) => requestSchema.parse(data))
  .handler(async ({ data }) => {
    const { website: _website, ...request } = data;
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { error } = await supabaseAdmin.from('appointment_requests').insert(request);
    if (error) throw new Error('We could not send your request. Please try again.');
    return { success: true };
  });