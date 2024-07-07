import React, { useState, useEffect } from "react";
import "./App.css";
import { fetchArticlesWithTopic } from "./articles-api";
import SearchForm from "./SearchBar/SearchBar";
import Loader from "./Loader/Loader";
import Error from "./ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./ImageModal/ImageModal";
import ImageGallery from "./ImageGallery/ImageGallery";
import { Toaster } from "react-hot-toast";

interface Article {
  id: string;
  title: string;
  imageUrl: string;
  // Add other properties of an article here if needed
}

interface ImageItem {
  id: string;
  urls: { regular: string; small: string };
  slug: string;
  // Add other properties if needed
}

const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>("");

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);
        const data: Article[] = await fetchArticlesWithTopic(query, page);
        if (page === 1) {
          setArticles(data);
        } else {
          setArticles((prevArticles) => [...prevArticles, ...data]);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (query !== "") {
      fetchData();
    }
  }, [query, page]);

  const handleSearch = async (topic: string): Promise<void> => {
    setArticles([]);
    setError(false);
    setQuery(topic);
    setPage(1);
  };

  const loadMore = async (): Promise<void> => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (imageUrl: string): void => {
    setSelectedImageUrl(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = (): void => {
    setModalIsOpen(false);
  };

  // Transform articles to ImageItem objects
  const transformArticlesToImageItems = (articles: Article[]): ImageItem[] => {
    return articles.map((article) => ({
      id: article.id,
      urls: { regular: article.imageUrl, small: article.imageUrl }, // Ensure 'small' property is present
      slug: article.title,
    }));
  };

  return (
    <>
      <SearchForm onSearch={handleSearch} />
      {loading && <Loader />}
      {error && <Error />}
      {articles.length > 0 && (
        <ImageGallery items={transformArticlesToImageItems(articles)} onImageClick={openModal} />
      )}
      {articles.length > 0 && (
        <LoadMoreBtn onClick={loadMore} loading={loading} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        imageUrl={selectedImageUrl}
      />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;
