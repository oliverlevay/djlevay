const SoundCloudPlaylist = ({ props: { url } }) => {
  return (
    <>
      <iframe
        width="100%"
        height={300}
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        style={{ maxWidth: "600px" }}
        src={`https://w.soundcloud.com/player/?url=${url}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}
      />
      <div
        style={{
          fontSize: "10px",
          color: "#cccccc",
          lineBreak: "anywhere",
          wordBreak: "normal",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          fontFamily:
            "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif",
          fontWeight: 100,
        }}
      >
        <a
          href="https://soundcloud.com/user-544931176"
          title="Laidback Lurtz"
          target="_blank"
          style={{ color: "#cccccc", textDecoration: "none" }}
        >
          Laidback Lurtz
        </a>
        ·
        <a
          href="https://soundcloud.com/user-544931176/sets/pontas-julfest"
          title="Pontas julfest"
          target="_blank"
          style={{ color: "#cccccc", textDecoration: "none" }}
        >
          Pontas julfest
        </a>
      </div>
    </>
  );
};

export default SoundCloudPlaylist;
