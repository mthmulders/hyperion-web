import * as React from 'react';

import { Moment } from 'moment';

import {
    Col,
    Row,
} from 'reactstrap';

import { SingleDatePicker } from 'react-dates';

import { retrieveHistoricalReadingForDate } from '../../api';
import { isFutureDate } from '../../dates';
import { Reading } from '../../model';
import Promised from '../../promised';
import View, { ViewProps } from './view';

const PromisedRecentReadingsView = Promised<Reading, ViewProps>(View);

interface State {
    focused: boolean;
    promise?: Promise<Reading>;
    selectedDate: Moment | null;
}

class DailyHistoryContainer extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            focused: false,
            selectedDate: null,
        };
    }

    render() {
        const { promise } = this.state;

        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <h1>Retrieve history by date</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SingleDatePicker
                            id='historyDate'
                            placeholder='Select date...'
                            date={ this.state.selectedDate }
                            firstDayOfWeek={ 0 }
                            hideKeyboardShortcutsPanel={ true }
                            isOutsideRange={ isFutureDate }
                            enableOutsideDays={true}
                            focused={ this.state.focused }
                            onFocusChange={ this.onFocusChange }
                            onDateChange={ this.selectDate }
                            showDefaultInputIcon={ true }
                            inputIconPosition='after'
                            displayFormat='DD MMM YYYY'
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        { promise && <PromisedRecentReadingsView promise={ promise } /> }
                    </Col>
                </Row>
            </React.Fragment>
        );
    }

    private onFocusChange = (arg: { focused: boolean }) => {
        this.setState({ focused: arg.focused });
    }

    private selectDate = (selectedDate: Moment) => {
        const input = selectedDate.toDate();
        // First remove the old promise (forcing React to re-render container)...
        this.setState({ promise: undefined }, () => {
            // ... only then to create the new promise (forcing another re-render).
            this.setState({
                promise: retrieveHistoricalReadingForDate(input),
                selectedDate,
            });
        });
    }
}

export default DailyHistoryContainer;
