import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import playSpaceImg from '@/assets/play-space.jpg';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          localStorage.setItem('isAuthenticated', 'true');
          navigate({ to: '/dashboard' });
        } else {
          setError('Invalid credentials');
        }
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred while logging in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-brand-primary">
        <div className="absolute inset-0 bg-brand-primary/20 z-10" />
        <img
          src={playSpaceImg}
          alt="Child development play space"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 flex flex-col justify-end p-12 text-white">
          <h2 className="text-4xl font-bold mb-4 font-display">Playful Pathways</h2>
          <p className="text-lg opacity-90 max-w-md">
            Empowering children through purpose-driven play and compassionate care.
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="bg-white p-10 rounded-2xl shadow-xl border w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold font-display text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-500">Sign in to the center dashboard</p>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter username"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                className="h-12"
              />
            </div>
            <Button type="submit" className="w-full h-12 text-lg mt-2" variant="brand" disabled={loading}>
              {loading ? 'Logging in...' : 'Login to Dashboard'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
