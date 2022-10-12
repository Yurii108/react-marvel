import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import './singleCharacterLayout.scss';

const SingleCharacterLayout = ({ data }) => {
    const { title, description, thumbnail } = data;

    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`${title} character`}
                />
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )

}

export default SingleCharacterLayout;