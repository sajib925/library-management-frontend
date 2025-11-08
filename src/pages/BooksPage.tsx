import Authors from "../sections/Authors";
import BooksSection from "../sections/Books";
import FeaturedCategories from "../sections/FeaturedCategories";
import Hero from "../sections/Hero";
import NewReleases from "../sections/NewReleases";
import Testimonials from "../sections/Testimonials";

export default function BooksPage() {
  
  return (
    <main>
      <Hero />
      <BooksSection />
      <Authors />
      <FeaturedCategories />
      <NewReleases />
      <Testimonials />
    </main>
  );
}
