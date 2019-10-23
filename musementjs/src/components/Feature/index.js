import './style.scss';
import React from 'react';

const Feature = ({info, icon, number}) => {
    return (
        <div className="feature-wrapper">
            {info && <div className="feature-info">{info}</div>}
            <div className="feature-icon">
                <img alt='feature icon' className="feature-img" src={icon} />
                <div className="feature-number">{number}</div>
            </div>
        </div>
    )
}

export default Feature;
