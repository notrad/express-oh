import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

if(!PORT){
    console.error(`PORT is not defined in the environment variables:${PORT}`);
    process.exit();
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});