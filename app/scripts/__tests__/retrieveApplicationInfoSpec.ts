import createStore from '../__mocks__/mockStore';

const mock = jest.fn();
jest.mock('../api', () => {
    return {
        retrieveApplicationInfo: mock
    }
});

import {
    FAILED_APPLICATION_INFO,
    RETRIEVE_APPLICATION_INFO,
    RETRIEVED_APPLICATION_INFO,
    retrieveApplicationInfo
} from '../actions';

describe('retrieveApplicationInfo action', () => {
    it('should notify that retrieval has started', (done) => {
        // Arrange
        const store = createStore();

        // Act
        store.dispatch(retrieveApplicationInfo());

        setTimeout(() => {
            // Assert
            const actions = store.getActions().filter(a => a.type === RETRIEVE_APPLICATION_INFO);
            expect(actions.length).toBe(1);
            done();
        }, 500);
    });

    it('should notify that retrieval has ended', (done) => {
        // Arrange
        const info = {};
        const store = createStore();
        mock.mockImplementationOnce(() => Promise.resolve(info));

        // Act
        store.dispatch(retrieveApplicationInfo());

        setTimeout(() => {
            // Assert
            const actions = store.getActions().filter(a => a.type === RETRIEVED_APPLICATION_INFO);
            expect(actions.length).toBe(1);
            expect(actions[0].payload).toBe(info);
            done();
        }, 500);
    });

    it('should notify that an error has occurred', (done) => {
        // Arrange
        const error = new Error('Bark!');
        mock.mockImplementationOnce(() => {
            throw error;
        });
        const store = createStore();

        // Act
        store.dispatch(retrieveApplicationInfo());

        setTimeout(() => {
            // Assert
            const actions = store.getActions().filter(a => a.type === FAILED_APPLICATION_INFO);
            expect(actions.length).toBe(1);
            expect(actions[0].error).toBe(error);
            done();
        }, 500);
    });
});