import VideoFacade from "@/components/ui/VideoFacade";
import type { SiteContent } from "@/types/content";

interface Props {
  video: SiteContent["video"];
}

export default function VideoSection({ video }: Props) {
  return (
    <section id="video" className="py-20 lg:py-28 bg-brand-soft">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-white mb-4">
            {video.headline}
          </h2>
          <p className="text-brand-gray text-base lg:text-lg max-w-2xl mx-auto">
            {video.description}
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-brand-turquoise/20 shadow-2xl shadow-black/50">
          <VideoFacade youtubeId={video.youtubeId} title={video.headline} />
        </div>
      </div>
    </section>
  );
}
