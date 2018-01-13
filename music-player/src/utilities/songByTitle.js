function songByTitle(title, songList) {
  return songList.find(song => song.title === title);
}
export default songByTitle;
