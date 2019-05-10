import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';

const mockApi = jest.fn(() => Promise.resolve({}));
jest.mock('../../../api', () => ({ retrieveUsageRecordsForMonth: mockApi }));
import MonthYearSelector from '../../../components/monthYearSelector';

import MonthlyUsageContainer from '../container';

describe('<MonthlyUsageContainer />', () => {
    afterEach(() => {
        mockApi.mockReset();
    });

    function selectMonth<P, S>(container: ShallowWrapper<P, S>, month: number) {
        const props = container.find(MonthYearSelector).props();
        if (props.updateSelectedMonth) {
            props.updateSelectedMonth(month);
        }
    }

    function selectYear<P, S>(container: ShallowWrapper<P, S>, year: number) {
        const props = container.find(MonthYearSelector).props();
        if (props.updateSelectedYear) {
            props.updateSelectedYear(year);
        }
    }

    it('should show a month selector', () => {
        // Arrange

        // Act
        const container = shallow(<MonthlyUsageContainer />);

        // Assert
        expect(container.find(MonthYearSelector).exists()).toBe(true);
        expect(mockApi).not.toHaveBeenCalled();
    });

    it('should show a year selector', () => {
        // Arrange

        // Act
        const container = shallow(<MonthlyUsageContainer />);

        // Assert
        expect(container.find(MonthYearSelector).exists()).toBe(true);
        expect(mockApi).not.toHaveBeenCalled();
    });

    it('should retrieve reading for selected month', (done) => {
        // Arrange
        const result = [{}, {}];
        mockApi.mockImplementation(() => Promise.resolve(result));

        // Act
        const container = shallow(<MonthlyUsageContainer />);
        selectMonth(container, 11);
        selectYear(container, 2014);

        // Assert
        setTimeout(() => {
            expect(mockApi).toHaveBeenCalledWith(11, 2014);
            done();
        }, 100);
    });
});
