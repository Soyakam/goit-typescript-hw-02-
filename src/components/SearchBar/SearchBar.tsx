import React from "react";  // Add this line
import toast from "react-hot-toast";
import { useState, ChangeEvent, FormEvent } from "react";
import css from "./SearchBar.module.css";

interface SearchFormProps {
  onSearch: (topic: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [topic, setTopic] = useState<string>("");

  const handleSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();

    if (topic.trim() === "") {
      toast.error("Please enter a search term!");
      return;
    }

    onSearch(topic);
    setTopic("");
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setTopic(evt.target.value);
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css["form-container"]}>
        <input
          name="topic"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={topic}
          onChange={handleChange}
          className={css["search-input"]}
        />
        <button type="submit" className={css["search-btn"]}>
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchForm;
