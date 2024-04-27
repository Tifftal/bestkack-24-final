import { DatesProvider, DateTimePicker } from '@mantine/dates';
import 'dayjs/locale/ru';


interface TimePickerProps {
    label: string;
    date: Date;
}

const TimePicker = ({ label, date }: TimePickerProps) => {
    return (
        <DatesProvider settings={{ locale: 'ru' }}>
            <DateTimePicker
                label={label}
                placeholder="Pick a Date"
                defaultValue={date}
                valueFormat="DD/MM/YYYY HH:mm"
            />
        </DatesProvider >
    );
}

export default TimePicker;