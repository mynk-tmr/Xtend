import videoUrl from "../assets/yt-link-video.mp4";

export const YoutubeEmbed = () => {
  return (
    <section>
      <h1 className="text-3xl font-bold pt-8 text-center border-t-2 border-neutral">
        Find us on{" "}
        <a href="https://www.youtube.com/watch?v=nEoAFBwbYzw" target="_blank">
          <u className="text-blood">
            {" "}
            Youtube <i className="pi pi-external-link"></i>
          </u>
          <i className="pi pi-youtube text-3xl text-blood align-middle animate-bounce ml-3"></i>
        </a>
      </h1>
      <section className="flex justify-center md:p-8">
        <video
          src={videoUrl}
          muted
          playsInline
          autoPlay
          loop
          className="h-96 rounded-lg"
        />
      </section>
    </section>
  );
};
