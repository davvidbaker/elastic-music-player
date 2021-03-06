import styled from 'styled-components';

const Artist = styled.div`
  font-size: 0.75em;
  display: inline-block;

  ${props =>
    props.beforeAlbum
      ? `
  &::after {
    padding: 0 10px;
    content: '•';
  }`
      : ''};
`;

export default Artist;
