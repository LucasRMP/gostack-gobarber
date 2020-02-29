import React, { useMemo } from 'react';
import { DatePickerAndroid } from 'react-native';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PT from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, DateButton, DateText } from './styles';

function DateInput({ value, onChange }) {
  const formattedDate = useMemo(
    () => format(value, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
    [value]
  );

  const handleOpenPicker = async () => {
    const { action, year, month, day } = await DatePickerAndroid.open({
      mode: 'calendar',
      date: value,
    });

    if (action === DatePickerAndroid.dateSetAction) {
      const selectedDate = new Date(year, month, day);
      onChange(selectedDate);
    }
  };

  return (
    <Container>
      <DateButton onPress={handleOpenPicker}>
        <Icon name="event" color="#fff" size={20} />
        <DateText>{formattedDate}</DateText>
      </DateButton>
    </Container>
  );
}

DateInput.propTypes = {
  value: PT.instanceOf(Date).isRequired,
  onChange: PT.func.isRequired,
};

export default DateInput;
