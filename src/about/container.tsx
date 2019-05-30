import * as React from 'react';

import { retrieveApplicationInfo } from '../api';
import { ApplicationInfo } from '../model';
import Promised from '../promised';
import View, { ViewProps } from './view';

const PromisedAboutView = Promised<ApplicationInfo, ViewProps>(View);

interface State {
    promise: Promise<ApplicationInfo>;
}

export class AboutContainer extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
    }

    componentWillMount() {
        this.setState({ promise: retrieveApplicationInfo() });
    }

    render() {
        const { promise } = this.state;
        return (
            <React.Fragment>
                <h1>About Υπερίων</h1>
                <PromisedAboutView promise={ promise } />
            </React.Fragment>
        );
    }
}

export default AboutContainer;
