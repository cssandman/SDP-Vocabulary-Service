import React, { Component, PropTypes } from 'react';
import { Draggable, Droppable } from './Draggable';
import ResponseSetWidget from './ResponseSetWidget';
import { responseSetsProps } from '../prop-types/response_set_props';
import _ from 'lodash';

let setData = function(){
  return {"json/responseSet": JSON.stringify(this.props.responseSet)};
};

let DraggableResponseSet = Draggable(ResponseSetWidget, setData);

let onDrop = (evt, self) => {
  let rs = JSON.parse(evt.dataTransfer.getData("json/responseSet"));
  let { selectedResponseSets } = self.state;
  if(!selectedResponseSets.find((r) => {
    return r.id == rs.id;
  })) {
    selectedResponseSets.push(rs);
    self.props.handleResponseSetsChange(selectedResponseSets);
    self.setState({selectedResponseSets});
  }
};

class DropTarget extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedResponseSets: this.props.selectedResponseSets || []};
  }

  render() {
    let isValidDrop = this.props.isValidDrop;

    let removeResponseSet = (id) => {
      let selectedResponseSets = this.state.selectedResponseSets.filter((rs) => rs.id != id);
      this.props.handleResponseSetsChange(selectedResponseSets);
      this.setState({selectedResponseSets});
    };

    return <div style={{minHeight: '40px', backgroundColor:isValidDrop?'green':'grey'}}>
      {this.state.selectedResponseSets.map((rs, i) => {
        return (
        <div key={i}>
        <i className='pull-right fa fa-close' onClick={() => removeResponseSet(rs.id)}/>
        <DraggableResponseSet responseSet={rs}/>
        </div>);
      })}
      <select readOnly={true} value={this.state.selectedResponseSets.map((rs) => rs.id )} name="linked_response_sets[]" id="linked_response_sets" size="5" multiple="multiple" className="form-control"  style={{display: 'none'}}>
        {this.state.selectedResponseSets.map((rs) => {
          return <option key={rs.id} value={rs.id}>a</option>;
        })}
      </select>
    </div>;
  }
}

DropTarget.propTypes = {
  handleResponseSetsChange: PropTypes.func.isRequired,
  selectedResponseSets: PropTypes.array,
  isValidDrop: PropTypes.bool
};

let DroppableTarget = Droppable(DropTarget, onDrop);

class ResponseSetDragWidget extends Component{
  render(){
    if(!this.props.responseSets){
      return (<div>Loading....</div>);
    }
    return (
      <div className="row response-set-row">
          <div className="col-md-6 question-form-group">
            <label htmlFor="linked_response_sets">Response Sets</label>
              <div className="fixed-height-list" name="linked_response_sets">
                {this.props.responseSets && _.values(this.props.responseSets).map((rs, i) => {
                  return <DraggableResponseSet key={i} responseSet={rs}/>;
                })}
              </div>
          </div>
          <div className="col-md-6 drop-target selected_response_sets">
            <label htmlFor="selected_response_sets">Selected Response Sets</label>
            <DroppableTarget handleResponseSetsChange={this.props.handleResponseSetsChange} selectedResponseSets={this.props.selectedResponseSets} />
          </div>
      </div>
    );
  }
}

ResponseSetDragWidget.propTypes = {
  responseSets: responseSetsProps.isRequired,
  selectedResponseSets: PropTypes.array,
  handleResponseSetsChange: PropTypes.func.isRequired
};

export default ResponseSetDragWidget;
