import reducer from '../index';

import {
    FAILED_APPLICATION_INFO,
    RETRIEVED_APPLICATION_INFO
} from '../../actions';

describe('Application Info reducers', () => {
    const initialState = { applicationInfo: {} };

    it('should register succes', () => {
        // Arrange
        const payload = {};
        const action = { type: RETRIEVED_APPLICATION_INFO, payload };

        // Act
        const state = reducer(initialState, action);

        // Assert
        expect(state.applicationInfo.loading).toBe(false);
        expect(state.applicationInfo.data).toEqual(payload);
        expect(state.applicationInfo.error).toBeUndefined();
    });

    it('should register failures', () => {
        // Arrange
        const error = new Error();
        const action = { type: FAILED_APPLICATION_INFO, error };

        // Act
        const state = reducer(initialState, action);

        // Assert
        expect(state.applicationInfo.loading).toBe(false);
        expect(state.applicationInfo.data).toBeUndefined();
        expect(state.applicationInfo.error).toEqual(error);
    });
});