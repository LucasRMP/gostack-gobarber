import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const Filters = styled.View`
  margin-top: 10px;
  padding: 10px 40px;
  flex-direction: row;
  justify-content: space-between;
`;

export const FilterText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: { paddingHorizontal: 30, paddingVertical: 15 },
  showsVerticalScrollIndicator: false,
})``;
