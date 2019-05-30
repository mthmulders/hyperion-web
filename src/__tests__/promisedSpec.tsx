import * as React from 'react';

import { shallow } from 'enzyme';

import { Alert, Progress } from 'reactstrap';

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
        const PromisedDummy = Promised(Dummy);

        // Assert
        shallow(<PromisedDummy promise={ promise } />);
    });

    describe('when the promise is unresolved', () => {
        it('should show a loading indicator', () => {
            // Arrange
            const promise = Promise.resolve('yay');

            // Act
            const PromisedDummy = Promised(Dummy);
            const result = shallow(<PromisedDummy promise={ promise } />);

            // Assert (immediately!)
            expect(result.find(Dummy).exists()).toBe(false);
            expect(result.find(Progress).exists()).toBe(true);
            expect(result.find(Alert).exists()).toBe(false);
        });
    });

    describe('when the promise is resolved', () => {
        it('should show the wrapped component', (done) => {
            // Arrange
            const value = 'yay';
            const promise = Promise.resolve(value);

            // Act
            const PromisedDummy = Promised(Dummy);
            const result = shallow(<PromisedDummy promise={ promise } />);

            // Assert
            delayed(() => {
                result.update();
                expect(result.find(Dummy).exists()).toBe(true);
                expect(result.find(Dummy).props().data).toBe(value);
                expect(result.find(Progress).exists()).toBe(false);
                expect(result.find(Alert).exists()).toBe(false);
                done();
            });
        });

        it('should pass the promised data to the wrapped component', (done) => {
            // Arrange
            const data = 'yay';
            const promise = Promise.resolve('yay');

            // Act
            const PromisedDummy = Promised(Dummy);
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
            const PromisedDummy = Promised(Dummy);
            const result = shallow(<PromisedDummy promise={ promise } />);

            // Assert
            delayed(() => {
                result.update();
                expect(result.find(Dummy).exists()).toBe(false);
                expect(result.find(Progress).exists()).toBe(false);
                expect(result.find(Alert).exists()).toBe(true);
                expect(result.find(Alert).html()).toContain(message);
                done();
            });
        });
    });
});
