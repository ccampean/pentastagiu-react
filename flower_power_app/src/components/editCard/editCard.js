import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./editCard.css";

class EditCard extends PureComponent {
  render() {
    const {match} = this.props;
    console.log(match.params.productId);
    

    return (
      <div className="content-card modal">
        <label>Name</label>
        <input
          value={this.props.product.name}
          name="name"
          type="text"
          onChange={this.props.onNameChange}
        />
        <label>Description</label>
        <input
          value={this.props.product.description}
          name="description"
          type="text"
          onChange={this.props.onNameChange}
        />
        <button onClick={this.props.onSave}>Save</button>
      </div>
    );
  }
}
EditCard.propTypes = {
  name: PropTypes.string,
  onNameChange: PropTypes.func
};
export default EditCard;
