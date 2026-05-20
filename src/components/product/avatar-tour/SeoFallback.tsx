import { getTranslations } from "next-intl/server";
import { FEATURE_META } from "./featureMeta";

export default async function SeoFallback() {
  const t = await getTranslations();
  const tTour = await getTranslations("product.tour");

  return (
    <section className="avt-sr-only" aria-label={tTour("seoLabel")}>
      <h2>{tTour("seoHeading")}</h2>
      <ul>
        {FEATURE_META.map((f) => {
          const ns = `product.${f.id}`;
          const title = `${t(`${ns}.title1` as never)} ${t(`${ns}.title2` as never)}`;
          const lede = t(`${ns}.lede` as never);
          const problem = t(f.problemKey as never);
          const solution = t(f.solutionKey as never);
          return (
            <li key={f.id}>
              <h3>{title}</h3>
              <p>{lede}</p>
              <p>
                <strong>{tTour("seoProblemLabel")}</strong> {problem}
              </p>
              <p>
                <strong>{tTour("seoSolutionLabel")}</strong> {solution}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
