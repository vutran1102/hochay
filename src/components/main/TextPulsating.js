import React, { Component } from 'react';
import { Text } from 'react-native';

export default class TextPulsating extends Component {

    constructor(props) {
        super(props);
        this.state = {
            textAnim: this.props.title,
        }
    }

    componentDidMount() {
        const mounted = this.props.mounted || true;
        if (mounted) this.startAnimated();
    }

    startAnimated() {
        this.setState({
            textAnim: ''
        }, () => {
            let index = 0;
            const text = this.props.title || '';
            const duration = this.props.duration || 100;
            const length = text.length;
            this.myTime = setInterval(() => {
                if (index > length - 1) {
                    clearInterval(this.myTime);
                } else {
                    let textCode = text.charAt(index);
                    index = index + 1;
                    this.setState({
                        textAnim: this.state.textAnim + textCode
                    });
                }
            }, duration);
        });
    }

    render() {
        
        return (
            <Text style={this.props.style}>{this.props.title}</Text>
        )
    }

}
