import React from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button';
import { ReactComponent as DrumsSVG } from '../../../media/drums.svg';
import { ReactComponent as BeerSVG } from '../../../media/beer.svg';
import ConcertJPG from '../../../media/concert.jpg';

const Canvas = styled.div`
  width: 100%;
  max-width: 1080px;
  padding: 0 16px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
`;

const Image = styled.div`
  position: absolute;
  top: 320px;
  left: 0;
  width: 100%;
  height: calc(100% - 320px);
  z-index: -2;
  background-image: url(${ConcertJPG});
  background-size: cover;
  background-position: top;
`;

const FeaturesWrap = styled.div`
  display: flex;
  margin-top: 40px;
  color: ${(props) => props.theme.white};
`;

const Feature = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 64px 48px 40px;

  @media screen and (max-width: 1024px) {
    padding-right: 40px;
    padding-left: 40px;
  }

  @media screen and (max-width: 768px) {
    padding: 96px 0 0 0;
    width: 100%;
  }

  @media screen and (max-width: 480px) {
    padding-top: 72px;
  }
`;

const FeatureCategory = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 400;
  line-height: 32px;
  color: ${(props) => props.theme.white};
  text-transform: uppercase;
  margin-bottom: 24px;
`;

const CategoryIcon = styled.div`
  margin-right: 12px;
  flex-shrink: 0;

  svg {
    width: 32px;
    height: 32px;

    path {
      fill: ${(props) => props.theme.roseDark};
    }
  }
`;

const FeatureTitle = styled.h1`
  margin-bottom: 24px;
  flex-shrink: 0;
  width: 100%;
  font-size: 48px;
  line-height: 56px;
  font-weight: 300;
  margin-top: 0;
`;

const FeatureText = styled.div`
  margin-bottom: 40px;
  height: 100%;
  line-height: 28px;
  font-size: 20px;
  margin-top: 0;
  margin-bottom: 48px;
`;

const LandingPage = () => {
  return (
    <Canvas>
      <FeaturesWrap>
        <Feature>
          <FeatureCategory>
            <CategoryIcon>
              <BeerSVG />
            </CategoryIcon>
            Venue
          </FeatureCategory>
          <FeatureTitle>Find musicians tailored to your venue</FeatureTitle>
          <FeatureText>From tiny bars to epic festivals, the right musicians make every place better.</FeatureText>
          <Button size="big" background="highlight" content="Sign up as a venue" href="/register/venue" />
        </Feature>
        <Feature>
          <FeatureCategory>
            <CategoryIcon>
              <DrumsSVG />
            </CategoryIcon>
            Band
          </FeatureCategory>
          <FeatureTitle>Play music you love at local bars</FeatureTitle>
          <FeatureText>Gather a team of awesome musicians, record a demo and gig on!</FeatureText>
          <Button size="big" background="highlight" content="Sign up as a band" href="/register/band" />
        </Feature>
      </FeaturesWrap>
      <Image />
    </Canvas>
  );
};

export default LandingPage;
