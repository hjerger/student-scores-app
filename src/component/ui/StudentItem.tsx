import * as React from 'react';
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import {Student} from "../container/StudentListContainer";

import './StudentItem.css';

const NUMBER_REGEX = '^\\d+$';
const NUMBER_ERROR = 'please enter a positive number';

export interface StudentProps {
    student: Student;
    onChange: any;
    onDelete: any;
}

export interface StudentState {
    student: Student;
    valid: boolean;
    highlight: boolean;
    scoreErrorText: string;
    error: boolean;
}

export default class StudentItem extends React.Component<StudentProps, StudentState> {
    constructor(props: StudentProps) {
        super(props);
        this.state = {
            student: this.props.student,
            valid: this.props.student.name !== null && this.props.student.name.length > 0,
            highlight: this.props.student.name !== null && this.props.student.name.length > 0 && this.props.student.score < 65,
            scoreErrorText: '',
            error: false,
        }
        this.handleName = this.handleName.bind(this);
        this.handleScore = this.handleScore.bind(this);
    }

    isValid() {
        return this.state.student.name !== null && this.state.student.name.length > 0 &&
               !this.state.error;
    }

    highlight() {
        return this.isValid() && this.state.student.score < 65;
    }

    handleName(event: any): void {
        event.persist();
        let student = {
            id: this.state.student.id,
            name: event.target.value,
            score: this.state.student.score,
        }
        this.setState({student: student}, () => {
            this.updateValidState();
        });
    }

    handleScore(event: any): void {
        event.persist();
        let scoreErrorText = '';
        let error = false;
        if (!event.target.value.match(NUMBER_REGEX)) {
            scoreErrorText = NUMBER_ERROR;
            error = true;
        }

        let student = {
            id: this.state.student.id,
            name: this.state.student.name,
            score: parseInt(event.target.value),
        }
        this.setState({student: student, scoreErrorText: scoreErrorText, error: error},
            () => {
                this.updateValidState();
            });
    }

    updateValidState() {
        this.setState({valid: this.isValid(), highlight: this.highlight()},
            () => {
                if (!this.state.error) {
                    this.props.onChange(this.state.student)
                }
            });
    }

    render() {
        return (
            <div className='studentItem'>
                <div className='inputPanel' style={{backgroundColor: this.state.highlight ? 'orange' : 'white'}}>
                    <div className='textField'>
                        <TextField
                            autoFocus
                            margin="dense"
                            variant="outlined"
                            id="name"
                            label="Student name"
                            type="name"
                            fullWidth
                            value={this.state.student.name}
                            //@ts-ignore
                            onChange={this.handleName}
                        />
                    </div>
                    <div className='textField'>
                        <TextField
                            autoFocus
                            margin="dense"
                            variant="outlined"
                            id="score"
                            label="Score"
                            type="number"
                            fullWidth
                            value={this.state.student.score}
                            //@ts-ignore
                            onChange={this.handleScore}
                            helperText={this.state.scoreErrorText}
                            error={this.state.error}
                        />
                    </div>
                </div>
                <div className='deleteButton'>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<DeleteIcon/>}
                        value={this.state.student.id}
                        onClick={() => this.props.onDelete(this.state.student)}>
                        Delete
                    </Button>
                </div>
            </div>
        );
    }
}

