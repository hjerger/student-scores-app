import * as React from 'react';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {Student} from "../container/StudentListContainer";
import StudentItem from "./StudentItem";

import './StudentList.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    //@ts-ignore
    return <Slide direction="up" ref={ref} {...props} />;
});

export interface StudentListProps {
    students: Student[];
    onAddStudent: any;
    onUpdateStudent: any;
    onDeleteStudent: any;
}

export interface StudentListState {
    showDeleteDialog: boolean;
    deleteStudent: Student;
    studentCount: string;
}

export default class StudentList extends React.Component<StudentListProps, StudentListState> {
    constructor(props: StudentListProps) {
        super(props);
        this.state = {
            showDeleteDialog: false,
            deleteStudent: {id: -1, name: '', score: 0},
            studentCount: '',
        }
        this.deleteStudent = this.deleteStudent.bind(this);
        this.addStudent = this.addStudent.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    deleteStudent = (student: Student) => {
        this.setState({showDeleteDialog: true, deleteStudent: student});
    }

    handleClose = () => {
        this.setState({showDeleteDialog: false, deleteStudent: {id: -1, name: '', score: 0}});
    }

    handleDelete = () => {
        this.props.onDeleteStudent(this.state.deleteStudent)
        this.handleClose();
    }

    addStudent = () => {
        let maxId = Math.max(...this.props.students.map(s => s.id), 0);
        let student = {
            id: maxId + 1,
            name: '',
            score: 0,
        }
        this.props.onAddStudent(student);
    }

    render() {
        let studentRows = [];
        for (let i: number = 0; i < this.props.students.length; i++) {
            studentRows.push(
                <div key={i}>
                    <StudentItem
                        student={this.props.students[i]}
                        onChange={this.props.onUpdateStudent}
                        onDelete={this.deleteStudent}
                    />
                </div>);
        }

        return (
            <div className='listPanel'>
                <div className='addButton'>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<AddBoxIcon/>}
                        onClick={() => this.addStudent()}>
                        Add
                    </Button>
                </div>

                <div className='studentList'>
                    {studentRows}
                </div>

                <Dialog
                    open={this.state.showDeleteDialog}
                    //@ts-ignore
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Delete Student"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Are you sure you want to delete student '{this.state.deleteStudent.name}' ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleDelete} color="primary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

