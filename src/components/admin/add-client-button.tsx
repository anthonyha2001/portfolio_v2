'use client';

import { Button } from '@/components/ui/button';

export function AddClientButton() {
  const handleClick = () => {
    console.log('Add client clicked');
  };

  return (
    <Button variant="primary" size="md" onClick={handleClick}>
      Add Client
    </Button>
  );
}

