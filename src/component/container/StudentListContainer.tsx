import * as React from 'react';
import StudentList from "../ui/StudentList";
import Statistics from "../ui/Statistics";
import HeaderPanel from "../ui/HeaderPanel";

const STUDENT_KEY = 'students'

export interface Student {
    id: number;
    name: string;
    score: number;
}

export interface StudentListContainerProps {
}

export interface StudentListContainerState {
    students: Student[];
    showDeleteDialog: boolean;
    deleteId: string;
    deleteName: string;
    studentCount: string;
}

export default class StudentListContainer extends React.Component<StudentListContainerProps, StudentListContainerState> {
    constructor(props: StudentListContainerProps) {
        super(props);
        this.state = {
            students: this.retrieveStudents(),
            showDeleteDialog: false,
            deleteId: '',
            deleteName: '',
            studentCount: '',
        }
        this.addStudent = this.addStudent.bind(this);
        this.updateStudent = this.updateStudent.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
    }

    addStudent = (student: Student) => {
        this.setState({students: [...this.state.students, student]}, () => {
            this.storeStudents(this.state.students);
        });
    }

    updateStudent = (student: Student) => {
        const studentIndex = this.state.students.findIndex(s => s.id === student.id);
        let newArray = [...this.state.students];
        newArray[studentIndex] = {...newArray[studentIndex], name: student.name, score: student.score};
        this.setState({students: newArray}, () => {
            this.storeStudents(this.state.students);
        });
    }

    deleteStudent = (deleteStudent: Student) => {
        this.setState(prevState => ({
            students: prevState.students.filter(student => student.id !== deleteStudent.id)
        }), () => {
            this.storeStudents(this.state.students);
        });
    }

    retrieveStudents = ():Student[] => {
       let students = window.localStorage.getItem(STUDENT_KEY);
       return students !== null ? JSON.parse(students) : [];
    }

    storeStudents = (students: Student[]) => {
       window.localStorage.setItem(STUDENT_KEY, JSON.stringify(students));
    }

    render() {
        return (
            <div>
                <HeaderPanel/>
                <StudentList
                    students={this.state.students}
                    onAddStudent={this.addStudent}
                    onUpdateStudent={this.updateStudent}
                    onDeleteStudent={this.deleteStudent}
                />
                <Statistics
                    scores={this.state.students.filter(s => s.name !== '').map(s => s.score)}
                />
            </div>
        );
    }
}

