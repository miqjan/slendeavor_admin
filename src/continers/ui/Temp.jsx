import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';
import config from '../../../config/index.json';
import {BootstrapTable, TableHeaderColumn, InsertButton } from 'react-bootstrap-table';

import {teamFetchData,teamAddData,teamEditData,teamDelateDatas} from '../../actions/team';
import jQuery from 'jquery';

function carrntFormatter(cell, row, enumObject, index)
{
    return `<img height='30px' width="30px" src="${config.api_url}/images/${cell}"/>`;
}




class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teams:[],
            images:[],
        };
    }
    handleInsertButtonClick = (onClick) => {
    
        onClick();
    }
    createCustomInsertButton = (onClick) => {
        return (
            <InsertButton
            btnText='Add'
            btnContextual='btn'
            className='my-custom-class'
            btnGlyphicon='glyphicon-edit'
            onClick={ () => this.handleInsertButtonClick(onClick) }/>
        );
    }
    componentWillMount() {
        this.props.teamFetchAll('team');
    }
    componentWillReceiveProps(nextprop) {
        this.setState({teams:nextprop.teams,images:nextprop.images.images});
    }
    onAfterDeleteRow(rowes){
        this.props.teamDelateDatas('team/delate',rowes);
    }
    onAfterInsertRow(row){
        this.props.teamAddData('team',row);
    }
    onAfterSaveCell(row, cellName, cellValue) {}
    onBeforeSaveCell(row, cellName, cellValue) {
        this.props.teamEditData("team/edit",row);
        return true;
    }
    render() {

        const selectRow = {
            mode: 'checkbox',
            bgColor: 'rgb(238, 193, 213)'
        };
        const options = {
            afterDeleteRow: this.onAfterDeleteRow.bind(this),  // A hook for after droping rows.
            afterInsertRow: this.onAfterInsertRow.bind(this),   // A hook for after insert rows
            insertBtn: this.createCustomInsertButton.bind(this)
        };
        const cellEditProp = {
            mode: 'dbclick',
            blurToSave: true,
            beforeSaveCell: this.onBeforeSaveCell.bind(this), // a hook for before saving cell
            afterSaveCell: this.onAfterSaveCell.bind(this)  // a hook for after saving cell
        };
        const jobTypes = this.state.images.map((image,index)=>{
            return {
                value: image,
                text: image,
            };
        });
        
        
        
        return ( 
            <div > 
                <BootstrapTable data={this.state.teams}
                striped hover
                selectRow={ selectRow }
                cellEdit={ cellEditProp }
                insertRow={ true }
                deleteRow={ true }
                options={ options }
                
                >
                    <TableHeaderColumn isKey={true} autoValue={ true } hiddenOnInsert hidden  dataField='_id'>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='img' dataFormat={ carrntFormatter } editable={ { type: 'select', options: { values: jobTypes }  } }>Img</TableHeaderColumn>
                    <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='info'>Info</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        teams: state.team.teams,
        error: state.team.error,
        images: state.images,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        teamFetchAll: (url) =>  dispatch ( teamFetchData( url)),
        teamAddData: (url,data) => dispatch ( teamAddData( url,data)),
        teamEditData: (url,data) => dispatch ( teamEditData( url,data)),
        teamDelateDatas: (url,data_arr) => dispatch( teamDelateDatas( url,data_arr)),
    };
};

Table.propTypes = {
    error: PropTypes.object,
    teams: PropTypes.array,
    teamFetchAll: PropTypes.func.isRequired,
    teamAddData: PropTypes.func.isRequired,
    teamEditData: PropTypes.func.isRequired,
    teamDelateDatas: PropTypes.func.isRequired,
    images: PropTypes.object,
}
export default connect(mapStateToProps, mapDispatchToProps)(Table);