import React from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button';
import { ReactComponent as SaxSVG } from '../../../media/saxophone.svg';
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
  top: 300px;
  left: 0;
  width: 100%;
  height: calc(100% - 300px);
  z-index: -2;
  background-image: url(${ConcertJPG});
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
`;

const FeaturesWrap = styled.div`
  display: flex;
  margin-top: 80px;
  color: ${(props) => props.theme.white};
`;

const Feature = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 64px 80px 40px;

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
  font-weight: 500;
  line-height: 24px;
  color: ${(props) => props.theme.white};
  text-transform: uppercase;
  margin-bottom: 24px;
`;

const CategoryIcon = styled.div`
  margin-right: 12px;
  flex-shrink: 0;

  svg {
    width: 24px;
    height: 24px;

    path {
      fill: ${(props) => props.theme.amaranth};
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
          <FeatureTitle>Find musicians tailored to your needs</FeatureTitle>
          <FeatureText>From tiny bars to epic festivals, the right musicians make every venue better.</FeatureText>
          <Button size="big" background="highlight-outline" content="Sign up" link="/login" />
        </Feature>
        <Feature>
          <FeatureCategory>
            <CategoryIcon>
              <SaxSVG />
            </CategoryIcon>
            Band
          </FeatureCategory>
          <FeatureTitle>Play music you love at local venues</FeatureTitle>
          <FeatureText>Gather a team of awesome musicians and gig on!</FeatureText>
          <Button size="big" background="highlight-outline" content="Sign up" link="/login" />
        </Feature>
      </FeaturesWrap>
      <Image />
    </Canvas>
  );
};

export default LandingPage;
