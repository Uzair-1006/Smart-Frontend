'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import React from 'react'; // Import React to use React.ReactNode

// Define the props type for the Providers component
interface ProvidersProps {
  children: React.ReactNode;
}

// Update the component to use the defined props type
export function Providers({ children }: ProvidersProps) {
  return <Provider store={store}>{children}</Provider>;
}
