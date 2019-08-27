import { Keyboard } from 'react-native';
import { InputPlatform } from '../common/FormInput';
import InputKeyBoard from '../common/InputKeyboard';

visibleKeyboard: false,

    this.keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        this._keyboardDidShow,
    );
this.keyboardDidHideListener = Keyboard.addListener(
    'keyboardDidHide',
    this._keyboardDidHide.bind(this),
);





_keyboardDidShow() {

}

/** 
 * Not required
*/
_keyboardDidHide() {
    this.setState({
        visibleKeyboard: false
    });
}




/** 
 * override
     * Not required
     * @param {*} text 
     */
    onChangeText(text) {
        const { indexInput } = this.state;
        switch (indexInput) {
            case 'displayname':
                this.setState({
                    displayName: text
                });
                break;
            case 'phonenumber':
                this.setState({
                    phoneNumber: text
                });
                break;
            case 'password':
                this.setState({
                    password: text
                });
                break;
            case 'repassword':
                this.setState({
                    repassword: text
                });
                break;
            case 'email':
                this.setState({
                    email: text
                });
                break;

            default:
                break;
        }

    }

/**
 * Not required
 * @param {*} value 
 * @param {*} placeholder 
 * @param {*} indexInput 
 * @param {*} secureTextEntry 
 */
showInputKeyboard(value, placeholder, indexInput, secureTextEntry, keyboardType) {
        this.setState({
            visibleKeyboard: true,
            textInput: value,
            secureTextEntry: secureTextEntry,
            indexInput: indexInput,
            placeholder: placeholder,
            keyboardType: keyboardType
        });
    }



componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
}


<Field
    required
    component={InputPlatform}
    validations={[required, validPhone]}
    onPress={this.showInputKeyboard.bind(this)}
    indexInput={'username'}
    name="Tên đăng nhập"
    keyboardType={}
    placeholder={'Tên đăng nhập'}
    value={this.state.phoneNumber}
    onChangeText={(val) => this.setState({ phoneNumber: val })}
/>

{
    this.state.visibleKeyboard &&
    <InputKeyBoard
        secureTextEntry={this.state.secureTextEntry}
        placeholder={this.state.placeholder}
        textInput={this.state.textInput}
        onChangeText={this.onChangeText.bind(this)}
        ref='inputkeyboard'
         keyboardType={this.state.keyboardType}
        onPress={this._keyboardDidHide.bind(this)}
    />
}