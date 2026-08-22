type PageHeroProps = { eyebrow: string; title: string; accent?: string; intro: string; image?: string; index: string };

export function PageHero({ eyebrow, title, accent, intro, image, index }: PageHeroProps) {
  return (
    <section className={`page-hero ${image ? 'with-image' : ''}`}>
      {image && <img src={image} alt="" className="page-hero-image" />}
      <div className="page-hero-overlay" />
      <div className="page-hero-content">
        <div className="page-index"><span>{index}</span><i /></div>
        <div>
          <p className="eyebrow"><span /> {eyebrow}</p>
          <h1>{title}{accent && <><br /><em>{accent}</em></>}</h1>
          <p className="page-intro">{intro}</p>
        </div>
      </div>
    </section>
  );
}
