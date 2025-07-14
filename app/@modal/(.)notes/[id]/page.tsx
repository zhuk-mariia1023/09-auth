import { fetchNoteByIdSSR } from '@/lib/api/serverApi';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotePreviewClient from './NotePreview.client';

type PreviewProps = {
  params: Promise<{ id: string }>;
};

export default async function Preview({ params }: PreviewProps) {
  const { id } = await params;

  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteByIdSSR(Number(id)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />
    </HydrationBoundary>
  );
}
