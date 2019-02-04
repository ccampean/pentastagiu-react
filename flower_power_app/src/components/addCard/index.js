import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./addCard.css";

class AddCard extends PureComponent {
  render() {
    return (
      <div className="content-card modal">
        <label>Name</label>
        <input
          name="name"
          type="text"
          onChange={this.props.nameChange}
        />
        <label>Description</label>
        <input
          name="description"
          type="text"
          onChange={this.props.descriptionChange}
        />
        <button onClick={this.props.saveCard}>Save</button>
      </div>
    );
  }
}
AddCard.propTypes = {
  name: PropTypes.string,
  nameChange: PropTypes.func,
  descriptionChange: PropTypes.func,
  saveCard: PropTypes.func,
};
export default AddCard;
