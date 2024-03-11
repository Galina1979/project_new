// для получения пропсов
// формируем карточку фильмов
function Movie(props){
    // перечислим ключи из запроса
    const {
        Title: title,
        Year: year,
        imdbID: id,
        Type: type,
        Poster: poster,
        } = props;
        
        return <div id={id} className="card movie">
        <div className="card-image waves-effect waves-block waves-light">
        {
        poster === 'N/A' ?
        <img src={`https://placehold.co/300x450?text=${title}`} />
        : <img className="activator" src={poster}/>
        }
        </div>
  <div className="card-content">
  <span className="card-title activator grey-text text-darken-4">{title}</span>
  {/* заголовок получем динамически */}
  <p>{year}</p>
  <span className="right">{type}</span>
  {/* динамическое получение года  */}
</div>
</div>
}
export {Movie}