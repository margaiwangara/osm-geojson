import { Card } from './StyledComponents';
import styled from 'styled-components';
import { GeoProps } from '@src/types';

type Props = {
  geo: GeoProps;
};

function CardData({ geo }: Props) {
  return (
    <CardDataWrapper>
      <section className="card-inner">
        <section className="content">
          <section className="summary">
            <h5 className="title">{geo.name}</h5>
            <p className="description">{geo.long_name || geo.description}</p>
            {geo.from && geo.to && (
              <p className="direction">
                {geo.from} <>&rarr;</> {geo.to}
              </p>
            )}
          </section>
        </section>
      </section>
    </CardDataWrapper>
  );
}

const CardDataWrapper = styled(Card)`
  border-left: solid 5px ${({ theme }) => theme.colors.primary};

  .content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.5rem;

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
      flex-direction: column;
    }
  }

  .summary {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;
  }

  .title {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1rem;
    font-weight: 700;
  }

  .description {
    color: ${({ theme }) => theme.colors.black};
    font-size: 0.8rem;
    font-weight: 400;
  }

  .direction {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.8rem;
    font-weight: 500;
    text-align: left;
    margin-top: 0.25rem;
  }
`;

export default CardData;
