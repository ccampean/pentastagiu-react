import React from 'react';
import PropTypes from 'prop-types';
import './editCard.css';


function EditCard(props) {
    return(
        <div className="editForm">
            <input value={props.name} type="text" onChange={props.onNameChange}/>
            <button>Save</button>
        </div>
    )
}
EditCard.propTypes={
    name: PropTypes.string,
    onNameChange: PropTypes.func,
}
export default EditCard;