// src/components/NasaPhotos.js

import React, { useState, useEffect } from 'react';

import SelectFilter from './SelectFilter';
import NasaPhotoGalery from './NasaPhotoGallery'

import { fetchNasaPhotos } from '../API/nasaApi'
import { Container } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';



const NasaPhotos = () => {
    const [currentDate, setCurrentDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [photos, setPhotos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1; // Ajusta el número de imágenes por página según tus preferencias


    useEffect(() => {
        fetchPhotos();
    }, []);

    /**
     * Consultar y ordenar la lista de fotos.
     */
    const fetchPhotos = async () => {
        const photosResp = await fetchNasaPhotos({})
        let photosList = photosResp[0].sort((a, b) => new Date(b.date) - new Date(a.date));
        photosList = photosList.map( p => { return {...p, label : `${p.title} - ${p.date}`} })
        setPhotos(photosList)
    };

    /**
     * Mostrar la imagen de la lista seleccionada.
     * @param {*} event 
     */
    const handleListChange = (event) => {
        setCurrentDate(event.target.value);
        const indice = photos.findIndex(p => p.date === event.target.value);
        setCurrentPage(indice + 1); // Reinicia la página a 1 cuando se aplica un nuevo filtro
    };

    /**
     * Delimitar el periodo de fechas por la fecha de inicio
     * @param {*} event 
     */
    const handleFilterStartChange = (event) => {
        const fechaInicio = new Date(event.target.value)
        setStartDate(event.target.value)
        const photosList = photos.filter(p => new Date(p.date) >= fechaInicio);
        setPhotos(photosList)
        setCurrentPage(1);
    };

    /**
     * Delimitar el periodo de fechas por la fecha fin
     * @param {*} event 
     */
    const handleFilterEndChange = (event) => {
        const fechaFin = new Date(event.target.value)
        setEndDate(event.target.value)
        const photosList = photos.filter(p => new Date(p.date) <= fechaFin);
        setPhotos(photosList)
        setCurrentPage(1);
    };

    const indexOfLastPhoto = currentPage * itemsPerPage;
    const indexOfFirstPhoto = indexOfLastPhoto - itemsPerPage;
    let currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

    /**
     * Manejar el cambio de paginas.
     * @param {*} event 
     * @param {*} value 
     */
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };


    return (
        <div>
            <Container>
                <h1>NASA Photos</h1>
                {/** Aqui van los componentes de filtro */}
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="div" align="left">Filtros</Typography>
                        <Grid container spacing={2} style={{marginTop:"10px"}}>
                            <Grid item xs={3}>
                                <SelectFilter label="Fecha inicial" value={startDate} print="date" list={photos} onChange={handleFilterStartChange} />
                            </Grid>
                            <Grid item xs={3}>
                                <SelectFilter label="Fecha final" value={endDate} print="date" list={photos} onChange={handleFilterEndChange} />
                            </Grid>
                            <Grid item xs={6}></Grid>
                            <Grid item xs={3}>
                                <SelectFilter label="Lista de imagenes" value={currentDate} print="label" list={photos} onChange={handleListChange} />
                            </Grid>
                            <Grid item xs={9}></Grid>
                        </Grid>
                    </CardContent>
                </Card>

                {/** Aqui va el componente que muestra la fotos */}
                <NasaPhotoGalery photos={currentPhotos} />
                <Stack spacing={2}>
                    <Pagination
                        count={Math.ceil(photos.length / itemsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </Stack>
            </Container>
        </div>
    );
};

export default NasaPhotos;
