import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Dot = styled.View`
  width: 6px;
  height: 6px;
  margin: 0 2px;
  background-color: white;
  transform: ${props => (props.activeIndex ? 'scale(2)' : 'scale(1)')};
`;
