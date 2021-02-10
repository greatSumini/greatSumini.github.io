import React from 'react';
import styled from 'styled-components';

import { Img } from 'components/atoms';

function Bio() {
  return (
    <Row>
      <Img
        src="/images/emoji.png"
        width={32}
        height={32}
        alt="profile-image"
        border
        circle
        style={{
          marginRight: '8px',
        }}
      />
      <StyledP>Choi su min</StyledP>
    </Row>
  );
}

export default Bio;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledP = styled.p`
  margin: 0;
  font-size: 1.2rem;
`;
