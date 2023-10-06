import morgan from 'morgan';

const logger = morgan('combined');  // 'combined' is one of the predefined formats, giving detailed logs

export default logger;
