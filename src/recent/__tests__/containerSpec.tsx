import { shallow } from 'enzyme';
import * as React from 'react';

const mockRetrieveRecentReadings = jest.fn(() => Promise.resolve({}));
jest.mock('../../api', () => ({ retrieveRecentReadings: mockRetrieveRecentReadings }));

import RecentContainer from '../container';

describe('<RecentContainer />', () => {
    afterEach(() => {
        mockRetrieveRecentReadings.mockReset();
    });

    it('should retrieve recent readings', () => {
        // Arrange
        mockRetrieveRecentReadings.mockImplementation(() => Promise.resolve([]));

        // Act
        shallow(<RecentContainer />);

        // Assert
        expect(mockRetrieveRecentReadings).toHaveBeenCalled();
    });
});
