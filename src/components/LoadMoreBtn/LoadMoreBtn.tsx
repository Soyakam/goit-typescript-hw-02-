import React from "react";
import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
  loading: boolean;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick, loading }) => {
  return (
    <div className={css.center}>
      <button
        onClick={onClick}
        disabled={loading}
        className={css["load-more-btn"]}
      >
        {loading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
};

export default LoadMoreBtn;
