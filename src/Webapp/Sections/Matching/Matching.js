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
import { gql, useMutation, useQuery } from '@apollo/client';

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
  transform: ${({ index, count }) => `translateX(${-1 * index * (275.5 / count)}%)`};
  transition: transform 0.4s cubic-bezier(0.455, 0.03, 0.515, 0.955);
`;

const Slide = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;
  width: 60%;
  height: 100%;
  margin: 0 64px;
  background: ${(props) => `url(${props.image}) no-repeat center center`};
  background-size: cover;
  padding: 16px;
  transition: opacity 0.4s cubic-bezier(0.455, 0.03, 0.515, 0.955);

  ${({ active }) =>
    !active &&
    css`
      opacity: 0.3;
    `};

  svg {
    height: 40px;
    width: 40px;
    opacity: 0;
    transition: opacity 0.2s;
    cursor: pointer;
  }

  &:hover {
    svg {
      opacity: 1;
    }
  }
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
  width: 200px;
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
      fill: ${(props) => props.theme.white};
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
  width: 200px;
  font-size: 16px;
  text-align: right;
  font-family: monospace;
`;


const Matching = ({ user = {} }) => {
  const [formOpen, setFormOpen] = useState(false);
  const [city, setCity] = useState('CRACOV');
  const [genre, setGenre] = useState('ROCK');
  const [bands, setBands] = useState([]);
  console.log(bands);
  const role = user.role || 'VENUE';

  const [activeBand, setActiveBand] = useState((bands || [])[0]);
  const [activeBandIndex, setActiveBandIndex] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const audioRef = useRef();
  const BAND_QUERY = gql`
  query Band($genres: [String] !, $cities: [String] !) {
    findBandsByGenreAndCity (
      genres:$genres,
      cities:$cities
    )
    {
      id,
      name,
      description,
      songUrl,
      songName,
      imageUrl,
      cities,
      musicGenres}
  }
`;
const { load, error, data } = useQuery(BAND_QUERY, { variables: { genres: [genre], cities: [city] } });
useEffect(() => {
  if(data){
    console.log(data.findBandsByGenreAndCity);
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
    return () => {
      document.removeEventListener('keydown', keydownEventListener);
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
                  value={city}
                  onChange={(value) => setCity(value)}
                  options={[
                    { id: 1, value: 'Bydgoszcz', label: 'Bydgoszcz' },
                    { id: 2, value: 'GDANSK', label: 'Gdańsk' },
                    { id: 3, value: 'CRACOV', label: 'Kraków' },
                    { id: 4, value: 'Lodz', label: 'Łódź' },
                    { id: 5, value: 'Poznan', label: 'Poznań' },
                    { id: 6, value: 'Szczecin', label: 'Szczecin' },
                    { id: 7, value: 'Warszawa', label: 'Warszawa' },
                    { id: 8, value: 'WROCLAW', label: 'Wrocław' },
                  ]}
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
                    { id: 6, value: 'classical', label: 'classical' },
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
                    { id: 1, value: 'rock', label: 'rock' },
                    { id: 2, value: 'hip-hop', label: 'hip-hop' },
                    { id: 3, value: 'pop', label: 'pop' },
                    { id: 4, value: 'country', label: 'country' },
                    { id: 5, value: 'jazz', label: 'jazz' },
                    { id: 6, value: 'classical', label: 'classical' },
                    { id: 7, value: 'folk', label: 'folk' },
                    { id: 8, value: 'metal', label: 'metal' },
                  ]}
                />
                music and we're looking for a gig in
                <Dropdown
                  skin="natural"
                  value={city}
                  onChange={(value) => setCity(value)}
                  options={[
                    { id: 1, value: 'Bydgoszcz', label: 'Bydgoszcz' },
                    { id: 2, value: 'Gdansk', label: 'Gdańsk' },
                    { id: 3, value: 'Krakow', label: 'Kraków' },
                    { id: 4, value: 'Lodz', label: 'Łódź' },
                    { id: 5, value: 'Poznan', label: 'Poznań' },
                    { id: 6, value: 'Szczecin', label: 'Szczecin' },
                    { id: 7, value: 'Warszawa', label: 'Warszawa' },
                    { id: 8, value: 'Wroclaw', label: 'Wrocław' },
                  ]}
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
      {!formOpen && bands.length && (
        <>
          <Slideshow>
            <SlidesWrap index={activeBandIndex} count={bands.length}>
              {bands.map((band, i) => (
                <Slide key={band.id} image={band.imageUrl} active={i === activeBandIndex}>
                  {band.liked ? (
                    <HeartFilledSVG onClick={() => (bands[i].liked = false)} />
                  ) : (
                    <HeartEmptySVG onClick={() => (bands[i].liked = true)} />
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
            <Timestamps>00:45 - 3:48</Timestamps>
          </Player>
          <audio src={activeBand.songUrl} ref={audioRef} />
        </>
      )}
    </Canvas>
  );
};

export default Matching;
