import * as React from 'react';

import { retrieveRecentReadings } from '../api';
import asyncComponent from '../components/AsyncComponent';
import { RecentReading } from '../model';
import Promised from '../promised';

const View = asyncComponent(() => import('./view'));
const PromisedRecentReadingsView = Promised<RecentReading[], any>(View);

interface State {
    promise: Promise<RecentReading[]>;
}

class RecentContainer extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
    }

    componentWillMount() {
        this.setState({ promise: retrieveRecentReadings() });
    }

    render() {
        const { promise } = this.state;

        return (
            <React.Fragment>
                <h1>Recent data</h1>
                <PromisedRecentReadingsView promise={ promise } />
            </React.Fragment>
        );
    }
}

export default RecentContainer;
