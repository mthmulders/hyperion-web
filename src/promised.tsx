import * as React from 'react';

import {
    Alert,
    Progress,
} from 'reactstrap';

interface InjectedProps<T> {
    data: T;
}

interface PromisedState<T> {
    error?: Error;
    loading: boolean;
    value?: T;
}

interface PromisedProps<T> {
    promise: Promise<T>;
}

// Distilled from https://github.com/piotrwitek/utility-types
type SetDifference<A, B> = A extends B ? never : A;
type SetComplement<A, A1 extends A> = SetDifference<A, A1>;
type Subtract<T extends T1, T1 extends object> = Pick<
  T,
  SetComplement<keyof T, keyof T1>
>;

// tslint:disable-next-line:only-arrow-functions
const Promised = function<T, P extends InjectedProps<T>>(
    WrappedComponent: React.ComponentType<P>,
) {
    // Inspired by http://natpryce.com/articles/000814.html
    return class PromisedWrapper extends React.Component<Subtract<P, InjectedProps<T>> & PromisedProps<T>, PromisedState<T>> {
        constructor(props: Subtract<P, InjectedProps<T>> & PromisedProps<T>) {
            super(props);
            this.state = { loading: true };
        }

        componentWillMount() {
            this.props.promise
                .then(this.handleSuccess)
                .catch(this.handleRejection);
        }

        render() {
            const { error, loading, value } = this.state;
            if (error) {
                return <Alert color='danger'>{ error.message }</Alert>;
            } else if (loading) {
                return (
                    <React.Fragment>
                        <div />
                        <div className='text-center'>Loading, please wait...</div>
                        <Progress animated={ true } max={ 100 } striped={ true } value={ 100 } />
                    </React.Fragment>
                );
            } else {
                const { ...childProps } = this.props;
                return <WrappedComponent { ...childProps as unknown as P } data={ value } />;
            }
        }

        private handleRejection = (error: Error) => {
            this.setState({ error, loading: false });
        }

        private handleSuccess = (value: any) => {
            this.setState({ loading: false, value });
        }
    };
};

export default Promised;
