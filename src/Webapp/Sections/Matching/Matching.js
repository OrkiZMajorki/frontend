import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import Button from '../../../components/Button';
import Dropdown from '../../../components/Dropdown';
import { ReactComponent as PrevSVG } from '../../../media/previous.svg';
import { ReactComponent as NextSVG } from '../../../media/next.svg';
import { ReactComponent as PlaySVG } from '../../../media/play.svg';
import { ReactComponent as PauseSVG } from '../../../media/pause.svg';
import { ReactComponent as HeartEmptySVG } from '../../../media/heartEmpty.svg';
import { ReactComponent as HeartFilledSVG } from '../../../media/heartFilled.svg';
import { gql, useQuery } from '@apollo/client';
import axios from 'axios';

const Canvas = styled.div`
  max-width: 1080px;
  margin: 180px auto 0;
  padding: 0 80px;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    background-image: linear-gradient(
      to left,
      #7231b5,
      #4c5dd4,
      #007ee7,
      #009bef,
      #00b5f1,
      #32bdf2,
      #4bc4f2,
      #60ccf3,
      #60c6f5,
      #63bff6,
      #6ab8f6,
      #73b1f4
    );
  }
`;

const Form = styled.div`
  font-size: 64px;
  line-height: 96px;
  color: ${(props) => props.theme.white};
  margin-bottom: 48px;
  font-weight: 300;
`;

const Slideshow = styled.div`
  position: absolute;
  display: flex;
  top: 140px;
  left: 0;
  width: 100%;
  height: 500px;
  overflow-x: hidden;
`;

const SlidesWrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 15%;
  transform: ${({ index, count }) => `translateX(${-1 * index * (207 / count)}%)`};
  transition: transform 0.4s cubic-bezier(0.455, 0.03, 0.515, 0.955);
`;

const Slide = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;
  width: 60%;
  height: 100%;
  margin: 0 64px;
  background: ${(props) => `url(${props.image}) no-repeat center center`};
  background-size: cover;
  padding: 32px;
  transition: opacity 0.4s cubic-bezier(0.455, 0.03, 0.515, 0.955);

  ${({ active }) =>
    !active &&
    css`
      opacity: 0.3;
    `};

  svg {
    height: 40px;
    width: 40px;
    transition: opacity 0.2s;
    cursor: pointer;
    fill: ${(props) => props.theme.roseDark};
    z-index: 3;
  }
`;

const Description = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 32px;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.8) 15%,
    rgba(0, 0, 0, 0) 30%,
    rgba(0, 0, 0, 0) 100%
  );
  color: ${(props) => props.theme.silverLight};
  display: flex;
  align-items: flex-end;
  font-size: 16px;
  line-height: 24px;
`;

const Player = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.white};
`;

const Info = styled.div`
  width: 280px;
`;

const BandName = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const SongName = styled.div`
  font-size: 16px;
  font-weight: 400;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  width: 140px;
  justify-content: space-between;

  svg {
    width: 24px;
    height: 24px;
    cursor: pointer;

    path {
      transition: fill 0.2s;
      fill: ${(props) => props.theme.white};
    }

    &:hover {
      path {
        fill: ${(props) => props.theme.silver};
      }
    }
  }
`;

const PlayButton = styled.div`
  svg {
    width: 48px;
    height: 48px;
  }
`;

const Timestamps = styled.div`
  width: 280px;
  font-size: 16px;
  text-align: right;
  font-family: monospace;
`;

const StyledButton = styled(Button)`
  margin-top: 24px;
`;

const NoResults = styled.div`
  font-size: 18px;
  color: ${(props) => props.theme.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 240px;
`;

const Matching = ({ user = {} }) => {
  const [formOpen, setFormOpen] = useState(true);
  const [selectedCity, setSelectedCity] = useState();
  const [cities, setCities] = useState([]);
  const [genre, setGenre] = useState('ROCK');
  const [bands, setBands] = useState([]);
  const role = user.role || 'VENUE';

  const [activeBand, setActiveBand] = useState((bands || [])[0]);
  const [activeBandIndex, setActiveBandIndex] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioTime, setAudioTime] = useState(0);

  const audioRef = useRef();
  const BAND_QUERY = gql`
    query Band($genres: [String]!, $cities: [ID]!) {
      findBandsByGenreAndCity(genres: $genres, cities: $cities) {
        id
        name
        description
        songUrl
        songName
        imageUrl
        cities
        musicGenres
      }
    }
  `;

  const { data } = useQuery(BAND_QUERY, { variables: { genres: [genre], cities: [selectedCity] } });

  useEffect(() => {
    const fetchCities = async () => {
      const result = await axios(
        `https://hacknarok-backend.herokuapp.com/city`,
      );

      setCities(result.data);
    };

    fetchCities();
  }, []);

  useEffect(() => {
    if (data) {
      setBands(data.findBandsByGenreAndCity);
      setActiveBand(data.findBandsByGenreAndCity[0]);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setBands(data.findBandsByGenreAndCity);
      setActiveBand(data.findBandsByGenreAndCity[0]);
    }
  }, [data]);

  function keydownEventListener(event) {
    if (event.keyCode === 37) {
      goPrev();
    } else if (event.keyCode === 39) {
      goNext();
    } else if (event.keyCode === 32) {
      toggleAudio();
    }
  }

  useEffect(() => {
    setActiveBand(bands[activeBandIndex]);
  }, [activeBandIndex]);

  useEffect(() => {
    document.addEventListener('keydown', keydownEventListener);
    const currentAudioRef = audioRef.current;
    currentAudioRef &&
      currentAudioRef.addEventListener('timeupdate', () => {
        setAudioTime(currentAudioRef.currentTime);
      });

    return () => {
      document.removeEventListener('keydown', keydownEventListener);
      currentAudioRef &&
        currentAudioRef.removeEventListener('timeupdate', () => {
          setAudioTime(currentAudioRef.currentTime);
        });
    };
  });

  function goPrev() {
    if (audioPlaying) toggleAudio();
    setActiveBandIndex(activeBandIndex - 1 < 0 ? bands.length - 1 : activeBandIndex - 1);
  }

  function goNext() {
    if (audioPlaying) toggleAudio();
    setActiveBandIndex(activeBandIndex + 1 > bands.length - 1 ? 0 : activeBandIndex + 1);
  }

  function toggleAudio() {
    if (audioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setAudioPlaying(!audioPlaying);
  }

  return (
    <Canvas>
      {formOpen && (
        <>
          <Form>
            {role === 'VENUE' && (
              <>
                We are looking for musicians in
                <Dropdown
                  skin="natural"
                  value={selectedCity}
                  onChange={(value) => setSelectedCity(value)}
                  options={
                    cities.map(city => ({
                      id: city.id,
                      value: city.id,
                      label: city.name
                    }))
                  }
                />
                that play
                <Dropdown
                  skin="natural"
                  value={genre}
                  onChange={(value) => setGenre(value)}
                  options={[
                    { id: 1, value: 'ROCK', label: 'rock' },
                    { id: 2, value: 'RAP', label: 'hip-hop' },
                    { id: 3, value: 'pop', label: 'pop' },
                    { id: 4, value: 'country', label: 'country' },
                    { id: 5, value: 'jazz', label: 'jazz' },
                    { id: 6, value: 'CLASSIC', label: 'classical' },
                    { id: 7, value: 'folk', label: 'folk' },
                    { id: 8, value: 'metal', label: 'metal' },
                  ]}
                />
                music.
              </>
            )}
            {role === 'BAND' && (
              <>
                We play
                <Dropdown
                  skin="natural"
                  value={genre}
                  onChange={(value) => setGenre(value)}
                  options={[
                    { id: 1, value: 'ROCK', label: 'rock' },
                    { id: 2, value: 'RAP', label: 'hip-hop' },
                    { id: 3, value: 'pop', label: 'pop' },
                    { id: 4, value: 'country', label: 'country' },
                    { id: 5, value: 'JAZZ', label: 'jazz' },
                    { id: 6, value: 'CLASSIC', label: 'classical' },
                    { id: 7, value: 'folk', label: 'folk' },
                    { id: 8, value: 'metal', label: 'metal' },
                  ]}
                />
                music and we're looking for a gig in
                <Dropdown
                  skin="natural"
                  value={selectedCity}
                  onChange={(value) => setSelectedCity(value)}
                  options={
                    cities.map(city => ({
                      id: city.id,
                      value: city.id,
                      label: city.name
                    }))
                  }
                />
              </>
            )}
          </Form>
          <Button
            size="big"
            content={role === 'VENUE' ? 'Find a band' : 'Find a venue'}
            onClick={() => setFormOpen(false)}
          />
        </>
      )}
      {!formOpen && !!bands.length && (
        <>
          <Slideshow>
            <SlidesWrap index={activeBandIndex} count={bands.length}>
              {bands.map((band, i) => (
                <Slide key={band.id} image={band.imageUrl} active={i === activeBandIndex}>
                  <Description>{band.description}</Description>
                  {band.liked ? (
                    <HeartFilledSVG onClick={() => (band.liked = false)} />
                  ) : (
                    <HeartEmptySVG onClick={() => (band.liked = true)} />
                  )}
                </Slide>
              ))}
            </SlidesWrap>
          </Slideshow>
          <Player>
            <Info>
              <BandName>{activeBand.name}</BandName>
              <SongName>{activeBand.songName}</SongName>
            </Info>
            <Controls>
              <PrevSVG onClick={goPrev} />
              <PlayButton onClick={toggleAudio}>{audioPlaying ? <PauseSVG /> : <PlaySVG />}</PlayButton>
              <NextSVG onClick={goNext} />
            </Controls>
            <Timestamps>
              {String(parseInt(audioTime / 60, 10)).padStart(2, '0')}:
              {String(parseInt(audioTime % 60)).padStart(2, '0')}
              {' - '}
              {parseInt((audioRef.current || {}).duration / 60, 10) || '00'}:
              {parseInt((audioRef.current || {}).duration % 60) || '00'}
            </Timestamps>
          </Player>
          <audio src={activeBand.songUrl} ref={audioRef} />
        </>
      )}
      {!formOpen && !bands.length && (
        <NoResults>
          Unfortunately your search yielded no results
          <StyledButton content={'try something different'} onClick={() => setFormOpen(true)} />
        </NoResults>
      )}
    </Canvas>
  );
};

export default Matching;
