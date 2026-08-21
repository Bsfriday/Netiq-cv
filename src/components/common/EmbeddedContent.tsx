import React from 'react';

// Single configuration constant for the embedded content URL
const EMBED_URL = "https://omg10.com/4/5700091";

export const EmbeddedContent: React.FC = () => {
  return (
    <section 
      id="embedded-content-section"
      aria-label="Embedded Content" 
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6"
    >
      <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <iframe
          id="embedded-content-frame"
          src={EMBED_URL}
          title="Embedded Content"
          width="100%"
          className="w-full min-h-[380px] border-0 block"
          style={{
            width: "100%",
            minHeight: "380px",
            border: "0"
          }}
        />
      </div>
    </section>
  );
};

