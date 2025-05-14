import { useRef, useState } from "react";

function App() {

  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const thumbnails = [
    {
      url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      label: 'Max Res'
    },
    {
      url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
      label: 'SD Res'
    },
    {
      url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      label: 'HQ Res'
    },
    {
      url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      label: 'MQ Res'
    },
    {
      url: `https://img.youtube.com/vi/${videoId}/default.jpg`,
      label: 'Default Res'
    }
  ];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  }

  const onButtonClick = () => {
    setLoading(true)
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setVideoId(extractVideoId(url) ?? '');
    if (videoId) {
      setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
    } else {
      setThumbnailUrl('');
    }
  }

  const extractVideoId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <>

      <div className="navbar bg-base-100 shadow-sm">
        <a className="btn btn-ghost text-xl">YT thumbnail picker</a>
      </div>

      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <input
              type="url"
              onChange={handleInputChange}
              className="input validator"
              required
              placeholder="https://"
              pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9-].*[a-zA-Z0-9])?.)+[a-zA-Z].*$"
              title="Must be valid URL"
              />
            <p className="validator-hint">Must be valid URL</p>
            <button
              className="btn btn-primary"
              onClick={onButtonClick}
              disabled={!url}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      <div ref={resultRef}>
        {loading && (
              <div>
                <div className="divider">HD</div>
                <div>
                  {
                    thumbnails.map((thumbnail, index) => (
                      <div key={index}>
                        <div className="divider">{thumbnail.label}</div>
                        <img src={thumbnail.url} alt="YT thumbnail" className="rounded shadow-md" />
                      </div>
                    ))
                  }
                  <img src={thumbnailUrl} alt="YT thumbnail" className="rounded shadow-md" />
                </div>
                <div className="divider">HD</div>
                <div>
                  <img src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} alt="YT thumbnail" className="rounded shadow-md" />
                  <img src={`https://img.youtube.com/vi/${videoId}/sddefault.jpg`} alt="YT thumbnail" className="rounded shadow-md" />
                  <img src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt="YT thumbnail" className="rounded shadow-md" />
                  <img src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`} alt="YT thumbnail" className="rounded shadow-md" />
                  <img src={`https://img.youtube.com/vi/${videoId}/default.jpg`} alt="YT thumbnail" className="rounded shadow-md" />
                </div>
                <div className="skeleton h-32 w-32"></div>
              </div>
        )}
      </div>

      <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
        <aside className="grid-flow-col items-center">
          <p>Made with 💙 by HM22-code</p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a href="https://github.com/HM22-code" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-[2em]"><path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" /></svg>
          </a>
        </nav>
      </footer>

    </>
  )
}

export default App
