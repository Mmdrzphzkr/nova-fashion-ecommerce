import { BestSellers } from "@/components/best-sellers";
import { Campaign } from "@/components/campaign";
import { CategoryIndex } from "@/components/category-index";
import { EditorialCurated } from "@/components/editorial-curated";
import { Hero } from "@/components/hero";
import { InfoStrip } from "@/components/info-strip";
import { LimitedStock } from "@/components/limited-stock";
import { NewArrivals } from "@/components/new-arrivals";
import { CommerceOverlays } from "@/components/overlays";
import { Seasonal } from "@/components/seasonal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SpecialOffers } from "@/components/special-offers";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <CategoryIndex />
        <NewArrivals />
        <Campaign />
        <SpecialOffers />
        <LimitedStock />
        <BestSellers />
        <EditorialCurated />
        <Seasonal />
        <InfoStrip />
      </main>
      <SiteFooter />
      <CommerceOverlays />
    </>
  );
}
