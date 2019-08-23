import React, { Component } from 'react';
import { Text } from 'react-native';

export default class NumberLoadingAnimation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dozens: 0,
            units: 0,
        }
    }

    componentWillMount() {
        this.myTimeDozens = setInterval(() => {
            const { dozens } = this.state;
            this.setState({
                dozens: dozens >= 9 ? 0 : dozens + 1
            });
        }, 50);
        this.myTimeUnits = setInterval(() => {
            const { units } = this.state;
            this.setState({
                units: units >= 9 ? 0 : units + 1
            });
        }, 80);
    }

    myClearInterval(){
        if (this.myTimeDozens != null) {
            clearInterval(this.myTimeDozens);
            this.myTimeDozens = null;
        }
        if (this.myTimeUnits != null) {
            clearInterval(this.myTimeUnits);
            this.myTimeUnits = null;
        }
    }

    componentWillUnmount() {
        this.myClearInterval();
    }

    render() {
        const { dozens, units } = this.state;
        const { desc } = this.props;
        return (
            <Text style={this.props.style}>{`${dozens}${units} ${desc || ''}`}</Text>
        )
    }
}
