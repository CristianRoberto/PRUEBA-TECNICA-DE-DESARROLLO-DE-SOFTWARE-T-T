import React from 'react';
import './Autor.scss'; // Importa los estilos CSS específicos para este componente

const Autor = () => {
  return (
    <div className="container">
      <img 
        src={`${process.env.PUBLIC_URL}/autor.png`} 
        alt="Imagen del autor" 
        className="author-image" 
      />
    </div>
  );
};

export default Autor;
