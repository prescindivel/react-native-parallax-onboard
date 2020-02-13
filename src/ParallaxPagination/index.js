import React from 'react';

import PropTypes from 'prop-types';

import { Container, Dot } from './styles';

const ParallaxPagination = ({ activeIndex, dotsLength }) => {
  // eslint-disable-next-line consistent-return
  const renderDots = () => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < dotsLength; i++) {
      return <Dot activeIndex={activeIndex} />;
    }
  };

  return <Container>{renderDots()}</Container>;
};

ParallaxPagination.propTypes = {
  activeIndex: PropTypes.number,
  dotsLength: PropTypes.number,
};

ParallaxPagination.defaultProps = {
  activeIndex: 0,
  dotsLength: 0,
};

export default ParallaxPagination;
