"use client";
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div className="shell state-page" role="alert"><span className="eyebrow">AN UNEXPECTED ERROR</span><h1>Something went<br /><em>off course.</em></h1><p>The page couldn't load. You can try again.</p><button className="button-line" type="button" onClick={() => reset()}>TRY AGAIN ↗</button></div>;
}
