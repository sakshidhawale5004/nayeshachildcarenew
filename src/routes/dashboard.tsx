import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
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
  const [requests, setRequests] = useState<AppointmentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/requests.json');
      if (!response.ok) {
        throw new Error('Failed to load data');
      }
      const data = await response.json();
      setRequests(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
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
    </div>
  );
}
