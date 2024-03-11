import React from "react";
import {MoviesList} from '../components/MoviesList'
import {Preloader} from "../components/Preloader";
import { Search } from "../components/Search";
// вытаскиваем переменную с ключом
const API_KEY = process.env.REACT_APP_API_KEY;
class Main extends React.Component{
    // Деструктуризация позволяет разбивать объект или массив на переменные при присвоении. Свойство prop объекта object здесь должно быть присвоено переменной varName. Если в объекте отсутствует такое свойство, переменной varName пприсваивается значение по умолчанию. 
    state ={
        movies: [],
        loading: true, // при старте страницы
    } 
    // Каждый компонент React проходит несколько стадий в процессе своей жизни: он создаётся, затем добавляется в DOM, получает пропсы, и удаляется из дерева. Этот процесс- жизненный цикл компонента(Comment Lifecycle). React предоставляет набор методов, которые позволяют встроиться в этот процесс. 
    componentDidMount(){
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=marvel`)
        .then(response => response.json())  // преобразовать
        .then(data => this.setState({movies: data.Search, loading: false}))
        // получение данных из запроса
        // ------------------------добавка к git---------------------
        // отлавливает ошибки
        .catch(err =>{
            console.log(err);
            this.setState({loading: false});
        })
    }
    //  обновление фильмов при поиске
    searchMovies = (str, type = 'all') =>{
        // приначале загрузки
        this.setState({loading: true});
        // принимаем поисковую строку
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${str}${type !== 'all' ? `&type=${type}` : ''}`)
        // передаём строку, которая была передана
        .then(response => response.json())
        .then(data => this.setState({movies: data.Search, loading: false}))
          // ------------------------добавка к git---------------------
        // прекращает загрузку
        .catch(err =>{
            console.log(err);
            this.setState({loading: false});
        })
    }
    render(){
        const {movies, loading}=this.state;
        return <main className="content">
            <Search searchMovies={this.searchMovies}/>
            {/* проверка */}
            {
                loading ? (
                    <Preloader/>
                ) : (
                    <MoviesList movies={movies}/>
                )
            }
        </main>
    }
}
export {Main}