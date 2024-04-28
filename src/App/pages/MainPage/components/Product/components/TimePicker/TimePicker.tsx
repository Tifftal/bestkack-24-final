import { DatesProvider, DateTimePicker, DateValue } from '@mantine/dates';
import 'dayjs/locale/ru';


interface TimePickerProps {
    label: string;
    date: Date;
    onChange: (value: DateValue) => void;
}

const TimePicker = ({ label, date, onChange }: TimePickerProps) => {
    return (
        <DatesProvider settings={{ locale: 'ru' }}>
            <DateTimePicker
                label={label}
                placeholder="Pick a Date"
                defaultValue={date}
                valueFormat="DD/MM/YYYY HH:mm"
                onChange={onChange}
            />
        </DatesProvider >
    );
}

export default TimePicker;