import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button';
import Dropdown from '../../../components/Dropdown';
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

const Matching = ({ user = {} }) => {
  const [formOpen, setFormOpen] = useState(true);
  const [city, setCity] = useState('CRACOV');
  const [genre, setGenre] = useState('ROCK');
  const role = user.role || 'VENUE';

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
        musicGenres,}
    }
  `;
  const { load, error, data } = useQuery(BAND_QUERY, { variables: { genres: [genre], cities: [city] } });
  useEffect(() => {
    console.log(data)

  }, [data]);
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
      {!formOpen && 'kafelki, że mucha nie siada'}
    </Canvas>
  );
};

export default Matching;
