import app from './app';

const { PORT = 8080, MODE = 'PROD' } = process.env;
app.listen(PORT, () => 
    console.log(`Listening on port ${PORT} (${MODE} mode)`)); // eslint-disable-line no-console
