import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { fetchImages } from '../components/Api/Api';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { SearchBar } from './SearchBar/SearchBar';

export const App = () => {
  const [images, setImages] = useState([]);
  const [pageNr, setPageNr] = useState(1);
  const [currentSearch, setCurrentSearch] = useState('');
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [imgAlt, setImgAlt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    const inputForSearch = e.currentTarget.elements.inputForSearch;
    if (inputForSearch.value.trim() === '') {
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetchImages(inputForSearch.value, 1);
      setImages(response);
      setPageNr(1);
      setCurrentSearch(inputForSearch.value);
    } catch {
      setError(alert('Error, reload your page please;'));
    } finally {
      setIsLoading(false);
      inputForSearch.value = '';
    }
  };

  const loadMoreClick = async () => {
    try {
      const response = await fetchImages(currentSearch, pageNr + 1);
      setImages([...images, ...response]);
      setPageNr(pageNr + 1);
    } catch {
      setError(alert('Error, reload your page please;'));
    }
  };

  const handleClickModal = e => {
    setIsModalOpen(true);
    setImgSrc(e.target.name);
    setImgAlt(e.target.alt);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setImgSrc('');
    setImgAlt('');
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
  });

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <SearchBar onSubmit={handleSubmit} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ImageGallery images={images} onImageClick={handleClickModal} />
        </>
      )}
      {images.length % 12 === 0 && images.length !== 0 && !isLoading && (
        <Button onClick={loadMoreClick} />
      )}

      {isModalOpen ? (
        <Modal src={imgSrc} alt={imgAlt} onClose={handleCloseModal} />
      ) : null}
    </div>
  );
};
