import React, { Component } from "react";

import { StyleSheet, Text, View, TouchableOpacity, Switch } from "react-native";

import AccountKit, {
    LoginButton,
    Color,
    StatusBarStyle
} from "react-native-facebook-account-kit";

class AccountKitSample extends Component {
    state = {
        authToken: null,
        loggedAccount: null
    };

    componentWillMount() {
        this.configureAccountKit();
    
        AccountKit.getCurrentAccount()
        .then((account) => {
          console.log(`Current account: ${account}`)
        })
      }

    configureAccountKit() {
        AccountKit.configure({
            //countryWhitelist: [ "AR", "BR", "US" ],
            //countryBlacklist: [ "BR" ],
            receiveSMS: true,
            defaultCountry: "VN",
            initialEmail: "example.com",
            initialPhoneCountryPrefix: "+355"
            // initialPhoneNumber: "123-456-7890"
        });
    }

    onLogin() {
        if (!token) {
            console.warn("User canceled login");
            this.setState({});
        } else {
            AccountKit.getCurrentAccount().then(account => {
                console.log(account);
                this.setState({
                    authToken: token,
                    loggedAccount: account
                });
            });
        }
    }


    onLogoutPressed() {
        AccountKit.logout()
            .then(() => {
                this.setState({
                    authToken: null,
                    loggedAccount: null
                });
            })
            .catch(e => console.log("Failed to logout"));
    }

    renderUserLogged() {
        const { id, email, phoneNumber } = this.state.loggedAccount;

        return (
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.onLogoutPressed()}
                >
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderLogin() {
        return (
            <View>
                <LoginButton
                    style={styles.button}
                    type="phone"
                    onLogin={token => this.onLogin(token)}
                    onError={e => this.onLogin(e)}
                >
                    <Text style={styles.buttonText}>SMS</Text>
                </LoginButton>

            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.loggedAccount
                    ? this.renderUserLogged()
                    : this.renderLogin()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    button: {
        height: 50,
        width: 300,
        backgroundColor: "aqua",
        marginBottom: 10
    },
    buttonText: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    },
    label: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 20
    },
    text: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    }
});

export default AccountKitSample;