import { Grid, Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const GallerySection = styled('div')(({ theme }) => ({
//   backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4, 0),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  textAlign: 'center',
}));

const GalleryImageWrapper = styled('div')({
  position: 'relative',
  '&:hover $galleryImageOverlay': {
    opacity: 1,
  },
});

const GalleryImage = styled('img')({
  width: '100%',
  height: 'auto',
  borderRadius: '4px',
});

const GalleryImageOverlay = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  opacity: 0,
  transition: 'opacity 0.3s ease',
}));

const GalleryImageCaption = styled(Typography)(() => ({
//   color: theme.palette.common.white,
  fontWeight: 'bold',
}));

const Gallery = () => {
  const images = [
    {
        id: 1,
        src: 'https://source.unsplash.com/random/800x600/?survive-camp',
      },
      {
        id: 2,
        src: 'https://source.unsplash.com/random/800x601/?survive-camp',
      },
      {
        id: 3,
        src: 'https://source.unsplash.com/random/800x602/?survive-camp',
      },
      {
        id: 4,
        src: 'https://source.unsplash.com/random/800x603/?survive-camp',
      },
      {
        id: 5,
        src: 'https://source.unsplash.com/random/800x604/?survive-camp',
      },
      {
        id: 6,
        src: 'https://source.unsplash.com/random/800x605/?survive-camp',
      },
      {
        id: 7,
        src: 'https://source.unsplash.com/random/800x606/?survive-camp',
      },
      {
        id: 8,
        src: 'https://source.unsplash.com/random/800x607/?survive-camp',
      },
      {
        id: 9,
        src: 'https://source.unsplash.com/random/800x608/?survive-camp',
      },
      {
        id: 10,
        src: 'https://source.unsplash.com/random/800x610/?survive-camp',
      },
      {
        id: 11,
        src: 'https://source.unsplash.com/random/800x611/?survive-camp',
      },
      {
        id: 12,
        src: 'https://source.unsplash.com/random/800x612/?survive-camp',
      },
  ];

  return (
    <Box mt={7}>
      <GallerySection>
      <Container>
        <SectionTitle variant="h4" component="h4">
          Our Gallery
        </SectionTitle>
        <Grid container spacing={2}>
          {images.map((image) => (
            <Grid item xs={6} sm={3} key={image.id}>
              <GalleryImageWrapper>
                <GalleryImage src={image.src} alt={image.alt} />
                <GalleryImageOverlay>
                  <GalleryImageCaption variant="subtitle1">
                    {image.alt}
                  </GalleryImageCaption>
                </GalleryImageOverlay>
              </GalleryImageWrapper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </GallerySection>
    </Box>
  );
};

export default Gallery;
