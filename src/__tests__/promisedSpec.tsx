import * as React from 'react';

import { shallow } from 'enzyme';

import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';

import Promised from '../promised';

interface DummyProps {
    data: string;
}
const Dummy: React.StatelessComponent<DummyProps> = (props: DummyProps) => <div>dummy content</div>;

const delayed = (callback: (...args: any[]) => void) => {
    setTimeout(callback, 50);
};

describe('Promised(...)', () => {
    it('should return a React component', () => {
        // Arrange
        const promise = Promise.resolve('yay');

        // Act
        const PromisedDummy = Promised<string>('data', Dummy);

        // Assert
        shallow(<PromisedDummy promise={ promise } />);
    });

    describe('when the promise is unresolved', () => {
        it('should show a loading indicator', () => {
            // Arrange
            const promise = Promise.resolve('yay');

            // Act
            const PromisedDummy = Promised<string>('data', Dummy);
            const result = shallow(<PromisedDummy promise={ promise } />);

            // Assert (immediately!)
            expect(result.find(Dummy).exists()).toBe(false);
            expect(result.find(LinearProgress).exists()).toBe(true);
            expect(result.find(Snackbar).exists()).toBe(false);
        });
    });

    describe('when the promise is resolved', () => {
        it('should show the wrapped component', (done) => {
            // Arrange
            const promise = Promise.resolve('yay');

            // Act
            const PromisedDummy = Promised<string>('data', Dummy);
            const result = shallow(<PromisedDummy promise={ promise } />);

            // Assert
            delayed(() => {
                result.update();
                expect(result.find(Dummy).exists()).toBe(true);
                expect(result.find(LinearProgress).exists()).toBe(false);
                expect(result.find(Snackbar).exists()).toBe(false);
                done();
            });
        });

        it('should pass the promised data to the wrapped component', (done) => {
            // Arrange
            const data = 'yay';
            const promise = Promise.resolve('yay');

            // Act
            const PromisedDummy = Promised<string>('data', Dummy);
            const result = shallow(<PromisedDummy promise={ promise } />);

            // Assert
            delayed(() => {
                result.update();
                expect(result.find(Dummy).exists()).toBe(true);
                // tslint:disable-next-line:no-string-literal
                expect(result.find(Dummy).props()['data']).toEqual(data);
                done();
            });
        });
    });

    describe('when the promise is rejected', () => {
        it('should show an error message', (done) => {
            // Arrange
            const message = 'boo';
            const promise = Promise.reject(new Error(message));

            // Act
            const PromisedDummy = Promised<string>('data', Dummy);
            const result = shallow(<PromisedDummy promise={ promise } />);

            // Assert
            delayed(() => {
                result.update();
                expect(result.find(Dummy).exists()).toBe(false);
                expect(result.find(LinearProgress).exists()).toBe(false);
                expect(result.find(Snackbar).exists()).toBe(true);
                expect(result.find(Snackbar).props().message).toBe(message);
                done();
            });
        });
    });
});
