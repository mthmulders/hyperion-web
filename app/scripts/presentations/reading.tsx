import * as React from 'react'

import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

import { Reading } from '../model';

export interface ReadingProps {
    data: Reading
}

export const ReadingView = (props: ReadingProps) => (
    <Table>
        <TableBody displayRowCheckbox={ false }>
            <TableRow>
                <TableRowColumn>Electricity (low)</TableRowColumn>
                <TableRowColumn>{ props.data.electricityLow } kWh</TableRowColumn>
            </TableRow>
            <TableRow>
                <TableRowColumn>Electricity (normal)</TableRowColumn>
                <TableRowColumn>{ props.data.electricityNormal } kWh</TableRowColumn>
            </TableRow>
            <TableRow>
                <TableRowColumn>Gas</TableRowColumn>
                <TableRowColumn>{ props.data.gas } m<sup>3</sup></TableRowColumn>
            </TableRow>
        </TableBody>
    </Table>
);