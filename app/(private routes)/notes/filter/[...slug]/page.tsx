import type { Metadata } from 'next';
import { fetchNotesSSR } from '@/lib/api/serverApi';
import NotesClient from './Notes.client';

type NotesFilterPageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
  params,
}: NotesFilterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tagParam = slug[0]?.toLowerCase();

  const tag = tagParam === 'all' ? 'All notes' : `Notes with tag "${slug[0]}"`;
  const description =
    tagParam === 'all'
      ? 'Browse all notes in NoteHub.'
      : `Browse notes filtered by the "${slug[0]}" tag in NoteHub.`;

  const altText =
    tagParam === 'all'
      ? 'Open Graph image for all notes in NoteHub'
      : `Open Graph image for notes with tag "${slug[0]}"`;

  return {
    title: tag,
    description,
    openGraph: {
      title: tag,
      description,
      url: `https://09-auth-ruddy.vercel.app/filter/${slug.join('/')}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: altText,
        },
      ],
    },
  };
}

export default async function NotesFilterPage({
  params,
}: NotesFilterPageProps) {
  const { slug } = await params;
  const tagParam = slug[0]?.toLowerCase();
  const tag = tagParam === 'all' ? undefined : slug[0];

  const notesResponse = await fetchNotesSSR(1, '', tag);

  return <NotesClient initialData={notesResponse} filterTag={tag} />;
}
