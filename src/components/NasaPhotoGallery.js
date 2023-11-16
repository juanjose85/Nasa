// src/components/NasaPhotoGallery.js

import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const NasaPhotoGallery = ({ photos }) => {
  return (
    <div>
      <h1>Gallery</h1>
      {photos.map((photo) => (
        <Card key={photo.date} style={{ marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {photo.title}
            </Typography>
            <Typography color="text.secondary">{photo.date}</Typography>
            <img src={photo.url} alt={photo.title} style={{ maxWidth: '100%' }} />
            {/* Agregar otros detalles de la foto si es necesario */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NasaPhotoGallery;
