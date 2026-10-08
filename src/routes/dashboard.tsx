import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SiteLayout } from '@/components/SiteLayout';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
});

type AppointmentRequest = {
  id: string;
  created_at: string;
  parent_name: string;
  phone: string;
  email: string;
  therapy: string;
  message: string;
};

function DashboardPage() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<AppointmentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate({ to: '/login' });
      } else {
        fetchRequests();
      }
    };
    checkSession();
  }, [navigate]);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('appointment_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
      } else if (data) {
        setRequests(data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: '/login' });
  };

  return (
    <SiteLayout>
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded mb-6">
            Error: {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading requests...</div>
          ) : requests.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No appointment requests found.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Parent Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Therapy</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="whitespace-nowrap">
                      {new Date(request.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium">{request.parent_name}</TableCell>
                    <TableCell>
                      <div>{request.email}</div>
                      <div className="text-sm text-gray-500">{request.phone}</div>
                    </TableCell>
                    <TableCell className="capitalize">
                      {request.therapy.replace('-', ' ')}
                    </TableCell>
                    <TableCell className="max-w-xs truncate" title={request.message}>
                      {request.message || '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}
