import type { Metadata } from 'next';
import { fetchNoteByIdSSR } from '@/lib/api/serverApi';
import NoteDetailsClient from './NoteDetails.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteByIdSSR(id);

  const title = note?.title ?? 'Note not found';
  const description =
    note?.content?.slice(0, 160) ?? 'No description available for this note.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.app/notes/${id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: note?.title
            ? `Open Graph image for note "${note.title}"`
            : 'Open Graph image for missing note',
        },
      ],
    },
  };
}

export default async function NoteDetails({ params }: PageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteByIdSSR(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
