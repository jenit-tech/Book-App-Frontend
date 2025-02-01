import React, { useEffect, useState } from 'react';
import BookCard from '../books/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

// Book categories
const categories = [
  { label: "Choose a genre", value: "" },
  { label: "Business", value: "business" },
  { label: "Fiction", value: "fiction" },
  { label: "Horror", value: "horror" },
  { label: "Adventure", value: "adventure" }
];

const TopSellers = () => {

  const [selectedCategory, setSelectedCategory] = useState("");
  const {data: books = []} = useFetchAllBooksQuery();

  // Filter books based on selected category
  const filteredBooks = selectedCategory
    ? books.filter((book) => book.category.toLowerCase() === selectedCategory.toLowerCase())
    : books;

  // Fetch books data
  

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">Top Sellers</h2>

      {/* Category Filter Dropdown */}
      <div className="mb-8 flex items-center">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="category"
          id="category"
          className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
        >
          {categories.map((category, index) => (
            <option key={index} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Swiper Carousel */}
      {filteredBooks.length > 0 ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 40 },
            1024: { slidesPerView: 2, spaceBetween: 50 },
            1180: { slidesPerView: 2, spaceBetween: 50 }
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {filteredBooks.map((book, index) => (
            <SwiperSlide key={index}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-gray-500">No books found for the selected genre.</p>
      )}
    </div>
  );
};

export default TopSellers;
