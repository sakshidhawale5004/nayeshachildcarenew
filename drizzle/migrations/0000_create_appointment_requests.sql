CREATE TABLE public.appointment_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_name text NOT NULL CHECK (char_length(parent_name) BETWEEN 2 AND 100),
  email text NOT NULL CHECK (char_length(email) <= 255),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 25),
  therapy text NOT NULL CHECK (therapy IN ('occupational-therapy','speech-therapy','special-education','behavioral-therapy','counselling')),
  message text NOT NULL DEFAULT '' CHECK (char_length(message) <= 1000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.appointment_requests TO service_role;
ALTER TABLE public.appointment_requests ENABLE ROW LEVEL SECURITY;