'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full border p-8 rounded-xl shadow-md bg-white text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">TaskFlow</h1>
        <p className="text-gray-600">Ku soo dhawaw! Fadlan soo gal si aad u maamusho task-yadaada.</p>
        
        <button
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition shadow-sm"
        >
          Sign in with Google
        </button>
      </div>
    </main>
  );
}