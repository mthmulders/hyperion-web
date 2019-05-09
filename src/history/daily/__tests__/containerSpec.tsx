import { shallow } from 'enzyme';
import * as moment from 'moment';
import * as React from 'react';

import { SingleDatePicker } from 'react-dates';
import { Progress } from 'reactstrap';

const mockApi = jest.fn(() => Promise.resolve({}));
jest.mock('../../../api', () => ({ retrieveHistoricalReadingForDate: mockApi }));

import DailyHistoryContainer from '../container';

describe('<DailyHistoryContainer />', () => {
    afterEach(() => {
        mockApi.mockReset();
    });

    it('should show a date selector', () => {
        // Arrange

        // Act
        const container = shallow(<DailyHistoryContainer />);

        // Assert
        expect(container.find(SingleDatePicker).exists()).toBe(true);
        expect(mockApi).not.toHaveBeenCalled();
        expect(container.find(Progress).exists()).toBe(false);
    });

    it('should retrieve reading for selected date', (done) => {
        // Arrange
        const selectedDate = moment().subtract(1, 'days');
        const result = {};
        mockApi.mockImplementation(() => Promise.resolve(result));

        // Act
        const container = shallow(<DailyHistoryContainer />);
        container.find(SingleDatePicker).props().onDateChange(selectedDate);

        // Assert
        setTimeout(() => {
            expect(mockApi).toHaveBeenCalledWith(selectedDate.toDate());
            done();
        }, 100);
    });
});
