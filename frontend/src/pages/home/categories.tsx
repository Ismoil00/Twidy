import { useState } from "react";
import Category from "./category";
import { CategoryType } from "./types";

const categories = [
  {
    id: 1,
    name: "Musicians",
    img: "assets/category-musician.png",
  },
  {
    id: 2,
    name: "Actors",
    img: "assets/category-actor.png",
  },
  {
    id: 3,
    name: "YouTubers",
    img: "assets/category-youtuber.png",
  },
  {
    id: 4,
    name: "Blogers",
    img: "assets/category-bloger.png",
  },
  {
    id: 5,
    name: "Comics",
    img: "assets/category-comic.png",
  },
  {
    id: 6,
    name: "Models",
    img: "assets/category-model.png",
  },
];

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelection = (category: CategoryType) => {
    setSelectedCategory(category.name);
  };

  return (
    <>
      <h1 className="text-brand_text_primary text-center sm:text-left font-700 text-3xl sm:text-4xl mt-10 mb-5 ml-5">
        Categories {selectedCategory}
      </h1>
      {!selectedCategory ? (
        <article className="flex justify-center sm:justify-start flex-wrap gap-8">
          {categories.map((category: CategoryType) => (
            <Category
              key={category.id}
              category={category}
              onClick={handleCategorySelection}
            />
          ))}
        </article>
      ) : (
        <>No categories</>
      )}
    </>
  );
}
