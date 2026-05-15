import { useState } from 'react';
import { UserLogin, UserRegister } from '../types';
import { CampoDeEntradaDeTexto } from './ui/CampoDeEntradaDeTexto';
import { BotonCTAPrimario } from './ui/BotonCTAPrimario';

interface AuthFormProps {
  onSubmit: (data: UserLogin | UserRegister) => void;
  loading: boolean;
  error: string | null;
  mode: 'login' | 'register';
}

export function AuthForm({ onSubmit, loading, error, mode }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'register') {
      onSubmit({ email, password, name });
    } else {
      onSubmit({ email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>{mode === 'login' ? 'Iniciar Sesión' : 'Registrarse'}</h2>

      {mode === 'register' && (
        <CampoDeEntradaDeTexto
          label="Nombre"
          type="text"
          value={name}
          onChange={setName}
          placeholder="Tu nombre"
        />
      )}

      <CampoDeEntradaDeTexto
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="tu@email.com"
      />

      <CampoDeEntradaDeTexto
        label="Contraseña"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="••••••••"
      />

      {error && (
        <p style={{ color: '#D32F2F', marginTop: '1rem' }}>{error}</p>
      )}

      <BotonCTAPrimario type="submit" disabled={loading} fullWidth>
        {loading ? 'Cargando...' : mode === 'login' ? 'Entrar' : 'Registrarse'}
      </BotonCTAPrimario>
    </form>
  );
}