import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../../../components/Input';
import Dropdown from '../../../components/Dropdown';

const Canvas = styled.div`
  max-width: 1080px;
  margin: 64px auto 0;
  padding: 0 16px;

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

const Matching = () => {
  const [role, setRole] = useState('venue');
  const [name, setName] = useState('Bar-a-wino');
  const [city, setCity] = useState('');
  const [genre, setGenre] = useState('');

  return (
    <Canvas>
      {console.log(role, name, city, genre)}
      I
      <Dropdown
        type="natural"
        value={city}
        onChange={(e) => setRole(e.target.value)}
        options={[
          { id: 1, value: 'venue', label: 'own a venue' },
          { id: 2, value: 'band', label: 'have a band' },
        ]}
      />
      called <Input type="natural" value={name} onChange={(e) => setName(e.target.value)} />
      in
      <Dropdown
        type="natural"
        value={city}
        onChange={(e) => setCity(e.target.value)}
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
      {role === 'venue' ? "and I'm looking for musicians that play" : 'and I play'}
      <Dropdown
        type="natural"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
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
      music.
    </Canvas>
  );
};

export default Matching;
