import { Table } from 'reactstrap';

import { formatDateTimeFull } from '../dates';
import { LiveReading } from '../model';

export interface ViewProps {
    data: LiveReading;
}

const lowTariff = '0001';

const makeRow = (label: string, value: string) => (
    <tr>
        <th scope='row'>{ label }</th>
        <td>{ value }</td>
    </tr>
);

const View = (props: ViewProps) => {
    const tariff = props.data.tariff === lowTariff ? 'Low' : 'Normal';
    return (
        <Table borderless={ true } responsive={ true }>
            <tbody>
                { makeRow('Timestamp', formatDateTimeFull(props.data.ts)) }
                { makeRow('Current electricity tariff', tariff) }
                { makeRow('Current electricity consumption', `${props.data.elecCon} kWh`) }
                { makeRow('Current electricity production', `${props.data.elecProd} kWh`) }
                { props.data.gas && makeRow('Total gas consumption', `${props.data.gas} m3` ) }
            </tbody>
        </Table>
    );
};

export default View;
