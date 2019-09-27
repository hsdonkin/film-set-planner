import React from 'react';
import { v4 } from 'uuid';
import { connect } from 'react-redux';
import { addObjectToDiagram } from './../actions';

const Sidebar = props => {
  let objectsList = [];
  let keys = Object.keys(props.objects);
  keys.forEach(key => {
    objectsList.push(props.objects[key]);
  });
  let buttonList = objectsList.map(object => {
    return (
      <button onClick={() => props.addObjectToDiagram(object)} key={v4()}>
        Add {object.name}
      </button>
    );
  });
  return <div className="sidebar">{buttonList}</div>;
};

const mapStateToProps = state => {
  return {
    objects: state.objects
  };
};

export default connect(
  mapStateToProps,
  { addObjectToDiagram }
)(Sidebar);
