import { useState } from 'react';
import { useRouter } from 'next/router';
import { NavegacionPrincipal } from '../components/ui/NavegacionPrincipal';
import { AuthForm } from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';
import { useAuthContext } from '../context/AuthContext';
import { tokens } from '../styles/tokens';

export default function Login() {
  const router = useRouter();
  const { login, loading, error } = useAuth();
  const { user } = useAuthContext();

  if (user) {
    router.push('/');
    return null;
  }

  const handleSubmit = async (data: { email: string; password: string }) => {
    try {
      await login(data);
      router.push('/');
    } catch {
      // Error is handled by the hook
    }
  };

  return (
    <div>
      <NavegacionPrincipal />

      <div style={{ padding: tokens.spacing[8], maxWidth: '400px', margin: '0 auto' }}>
        <AuthForm
          mode="login"
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}