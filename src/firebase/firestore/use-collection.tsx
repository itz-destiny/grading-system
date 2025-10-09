'use client';
import {useState, useEffect} from 'react';
import {
  collection,
  onSnapshot,
  Query,
  DocumentData,
  query,
  where,
  limit,
  orderBy,
  startAfter,
  endBefore,
  limitToLast,
  startAt,
  endAt,
  getCountFromServer,
  QuerySnapshot,
  FirestoreError,
} from 'firebase/firestore';
import {useFirestore} from '../provider';
import {FirestorePermissionError} from '../errors';
import {errorEmitter} from '../error-emitter';

export interface UseCollectionOptions {
  sort?: {
    field: string;
    direction?: 'asc' | 'desc';
  };
  filter?: {
    field: string;
    operator:
      | '<'
      | '<='
      | '=='
      | '!='
      | '>='
      | '>';
    value: any;
  };
  pageSize?: number;
}

export function useCollection<T>(
  collectionPath: string,
  options?: UseCollectionOptions
) {
  const firestore = useFirestore();
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    if (!firestore) return;

    let q = query(collection(firestore, collectionPath));

    if (options?.filter) {
      q = query(
        q,
        where(
          options.filter.field,
          options.filter.operator,
          options.filter.value
        )
      );
    }

    if (options?.sort) {
      q = query(q, orderBy(options.sort.field, options.sort.direction));
    }

    if (options?.pageSize) {
      q = query(q, limit(options.pageSize));
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as T[];
        setData(docs);
        setLoading(false);
      },
      (err) => {
        const permissionError = new FirestorePermissionError({
          path: collectionPath,
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [firestore, collectionPath, options]);

  return {data, loading, error};
}
