import * as React from 'react';
import TextField from '@material-ui/core/TextField';

import './Statistics.css';

export interface StatisticsProps {
    scores: number[];
}

export interface StatisticsState {
    min: number;
    avg: number;
    max: number;
}

export default class Statistics extends React.Component<StatisticsProps, StatisticsState> {
    constructor(props: StatisticsProps) {
        super(props);
        this.state = {
            min: this.props.scores.length < 1 ? 0 : Math.min(...this.props.scores),
            avg: this.props.scores.length < 1 ? 0 : this.props.scores.reduce((a: number, b: number) => a + b, 0) / this.props.scores.length,
            max: this.props.scores.length < 1 ? 0 : Math.max(...this.props.scores),
        }
    }

    componentDidUpdate(prevProps: Readonly<StatisticsProps>, prevState: Readonly<StatisticsState>, snapshot?: any): void {
        if (!this.compareScores(prevProps.scores, this.props.scores)) {
            this.setState({
                min: this.props.scores.length < 1 ? 0 : Math.min(...this.props.scores),
                avg: this.props.scores.length < 1 ? 0 : this.props.scores.reduce((a: number, b: number) => a + b, 0) / this.props.scores.length,
                max: this.props.scores.length < 1 ? 0 : Math.max(...this.props.scores),
            });
        }
    }

    compareScores = (scores1: number[], scores2: number[]): boolean => {
        if (scores1.length !== scores2.length) {
            return false;
        } else {
            for (let i = 0; i < scores1.length; i++) {
                if (scores1[i] !== scores2[i]) {
                    return false;
                }
            }
            return true;
        }
    }

    render() {
        return (
            <div className='statistics'>
                <div className='textField'>
                    <TextField
                        inputProps={{
                            readOnly: true,
                            disabled: true,
                        }}
                        variant="filled"
                        margin="dense"
                        label="Min"
                        fullWidth
                        value={this.state.min}
                    />
                </div>
                <div className='textField'>
                    <TextField
                        inputProps={{
                            readOnly: true,
                            disabled: true,
                        }}
                        variant="filled"
                        margin="dense"
                        label="Avg"
                        fullWidth
                        value={this.state.avg}
                    />
                </div>
                <div className='textField'>
                    <TextField
                        inputProps={{
                            readOnly: true,
                            disabled: true,
                        }}
                        variant="filled"
                        margin="dense"
                        label="Max"
                        fullWidth
                        value={this.state.max}
                    />
                </div>
            </div>
        );
    }
}

