import React from 'react';
import { ApiService } from '../service/api-service';

const ApiContext = React.createContext(new ApiService());

export default ApiContext;
