import './findChar.scss'

const FindChar = () => {
    const name = 'Thor';
    return (
        <form className='find-char'>
            <div className='find-char__name'>Or find a character by name:</div>
            <div className='find-char__wrapper'>
            <input type="text" name="name" placeholder="Enter name" className='find-char__input'/>
            <button className='find-char__button'>FIND</button>
            </div>
            <dir className='find-char__answer'>{`There is! Visit ${name} page?`}</dir>
        </form>
    )
}

export default FindChar;