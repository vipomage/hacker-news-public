import React, { Context } from 'react';
import { ApiService } from '../service/api-service';

const ApiContext: Context<ApiService> = React.createContext(new ApiService());

export default ApiContext;
