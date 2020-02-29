import React, { useState, useMemo } from 'react';
import { DatePickerIOS } from 'react-native';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PT from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, DateButton, DateText, Picker } from './styles';

function DateInput({ value, onChange }) {
  const [opened, setOpened] = useState(false);

  const formattedDate = useMemo(
    () => format(value, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
    [value]
  );

  return (
    <Container>
      <DateButton onPress={() => setOpened(!opened)}>
        <Icon name="event" color="#fff" size={20} />
        <DateText>{formattedDate}</DateText>
      </DateButton>

      {opened && (
        <Picker>
          <DatePickerIOS
            date={value}
            onDateChange={onChange}
            minimumDate={new Date()}
            minuteInterval={60}
            locale="pt"
            mode="date"
          />
        </Picker>
      )}
    </Container>
  );
}

DateInput.propTypes = {
  value: PT.instanceOf(Date).isRequired,
  onChange: PT.func.isRequired,
};

export default DateInput;
