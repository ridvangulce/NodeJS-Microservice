"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withNoAuth = (WrappedComponent) => {
  const NoAuthComponent = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        router.push('/profile'); // Eğer token varsa kullanıcıyı profile yönlendir
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  NoAuthComponent.displayName = `withNoAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return NoAuthComponent;
};

export default withNoAuth;
