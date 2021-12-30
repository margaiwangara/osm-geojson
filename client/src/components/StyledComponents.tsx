import styled from 'styled-components';

export const Card = styled.section`
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;

  .card-inner {
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }
`;

export const InputBox = styled.input`
  padding: 0.75rem 0.5rem;
  border: solid 1px transparent;
  outline: none;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.black};
  font-size: 0.9rem;
  width: 100%;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: 0.6rem;
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: solid 1px transparent;
  outline: none;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.9rem;
  width: 100%;
  cursor: pointer;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.secondary};

    cursor: not-allowed;
  }
`;
