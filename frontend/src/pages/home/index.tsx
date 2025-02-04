import Header from "./header";
import Categories from "./categories";
import Recommendations from "./recommendations";

export default function Homepage() {
  return (
    <div className="bg-brand_gray">
      <Header />
      <Categories />
      <Recommendations />
    </div>
  );
}
