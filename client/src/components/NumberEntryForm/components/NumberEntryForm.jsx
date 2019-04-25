import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

export class NumberEntryForm extends Component {

  constructor(props) {
    super(props);
    this.state = {numberEntry: props.numberEntry};
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: parseInt(event.target.value) ? parseInt(event.target.value) : this.state.numberEntry });
  }

  handleSubmit = () => {
    // don't change if the same as the previously submitted entry.
    if (this.props.numberEntry !== this.state.numberEntry && Number.isInteger(this.state.numberEntry)) {
      this.props.onChange(this.state.numberEntry);
    }
  }

  render() {
    const {numberEntry} = this.state;
    return (
      <ValidatorForm
        ref="form"
        onSubmit={this.handleSubmit}
        onError={errors => console.log("ERROR:todo" + errors)}
      >
        <TextValidator
          label="Prime number entry"
          onChange={this.handleChange}
          name="numberEntry"
          value={numberEntry}
          validators={['minNumber:0', 'maxNumber:1000000', 'matchRegexp:[0-9]|[1-9][1-9]{1,5}|1000000$']}
          errorMessages={['please input a positive number']}
        />
        <Button style={{margin:10}} variant="contained" color="secondary" type="submit">Submit</Button>
      </ValidatorForm>
    );
  }
}
