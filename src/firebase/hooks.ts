'use client';

import { useMemo } from 'react';
import { Query, DocumentReference } from 'firebase/firestore';

/**
 * Stable memoization for Firebase Queries and DocumentReferences.
 * Use this to wrap your collection() or doc() calls when they depend on props or state.
 */
export function useMemoFirebase<T extends Query | DocumentReference | null>(
  factory: () => T,
  deps: React.DependencyList
): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, deps);
}
