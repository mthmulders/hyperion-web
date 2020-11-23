import { Form } from 'reactstrap';

import MonthSelector from './monthSelector';
import YearSelector from './yearSelector';

interface MonthYearSelectorProps {
    selectedMonth?: number;
    selectedYear?: number;
    updateSelectedMonth: (selectedMonth: number) => void;
    updateSelectedYear: (selectedYear?: number) => void;
}

const MonthYearSelector = (props: MonthYearSelectorProps) => (
    <Form>
        <MonthSelector selectedMonth={ props.selectedMonth } updateSelectedMonth={ props.updateSelectedMonth } />
        <YearSelector selectedYear={ props.selectedYear } updateSelectedYear={ props.updateSelectedYear } />
    </Form>
);

export default MonthYearSelector;
