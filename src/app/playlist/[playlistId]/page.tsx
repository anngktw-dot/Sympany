import { PlaylistPage } from "@/widgets/playlist-page/playlist-page";

type PlaylistRouteProps = {
  params: Promise<{
    playlistId: string;
  }>;
};

export default async function Playlist({ params }: PlaylistRouteProps) {
  const { playlistId } = await params;

  return <PlaylistPage playlistId={playlistId} />;
}
