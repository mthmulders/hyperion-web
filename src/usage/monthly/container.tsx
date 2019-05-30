import * as React from 'react';

import {
    Col,
    Row,
} from 'reactstrap';

import { retrieveUsageRecordsForMonth } from '../../api';

import MonthYearSelector from '../../components/monthYearSelector';
import { UsageRecord } from '../../model';
import Promised from '../../promised';
import View, { ViewProps } from './view';

const PromisedMonthlyReadingView = Promised<UsageRecord[], ViewProps>(View);

interface State {
    promise?: Promise<UsageRecord[]>;
    selectedMonth?: number;
    selectedYear?: number;
}

class MonthlyUsageContainer extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {};
    }

    render() {
        const { promise, selectedMonth, selectedYear } = this.state;

        return (
            <React.Fragment>
                <Row>
                    <Col><h1>Retrieve usage by month</h1></Col>
                </Row>
                <Row>
                    <Col xs={ 3 } sm={ 3 } md={ 3 } lg={ 3 }>
                        <MonthYearSelector
                            selectedMonth={ selectedMonth }
                            selectedYear={ selectedYear }
                            updateSelectedMonth={ this.updateSelectedMonth }
                            updateSelectedYear={ this.updateSelectedYear }
                        />
                    </Col>
                    <Col xs={ 9 } sm={ 9 } md={ 9 } lg={ 9 }>
                        { promise && <PromisedMonthlyReadingView promise={ promise } /> }
                    </Col>
                </Row>
            </React.Fragment>
        );
    }

    private retrieveDataIfNecessary = () => {
        const month = this.state.selectedMonth;
        const year = this.state.selectedYear;

        if (!month || !year) {
            return;
        }

        // First remove the old promise (forcing React to re-render container)...
        this.setState({ promise: undefined }, () => {
            // ... only then to create the new promise (forcing another re-render).
            this.setState({ promise: retrieveUsageRecordsForMonth(month, year) });
        });
    }

    private updateSelectedYear = (selectedYear: number) => {
        this.setState({ selectedYear }, this.retrieveDataIfNecessary);
    }

    private updateSelectedMonth = (selectedMonth: number) => {
        this.setState({ selectedMonth }, this.retrieveDataIfNecessary);
    }
}

export default MonthlyUsageContainer;
