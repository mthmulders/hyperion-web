import * as ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { BrowserRouter } from 'react-router-dom';

import { App } from './app';

const routes = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('root') as HTMLElement);
