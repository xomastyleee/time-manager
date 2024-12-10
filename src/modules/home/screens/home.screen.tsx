import React, { useState } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { User } from '@db/entities';
import { UserStatus } from "@db/types/enams";
import { UserService } from "../../../app/services/user/user.service"
import { IUserCreateUpdateParams } from "@db/types/interfaces";
import { stringToEnumSingle } from "@db/util/transformer";



export const HomeScreen = () => {
    const userService = new UserService();

    const [username, setUsername] = useState('');
    const [status, setStatus] = useState('')
    const [preferences, setPreferences] = useState('');
    const [id, setId] = useState('');

    const handleCreateUser = async () => {
        console.log('data', username, status);
        if (!username || !status) {
            Alert.alert('Error', 'Username and status are required');
            return;
        }
        try {
            const userCreateParams: IUserCreateUpdateParams = {
                username,
                preferences,
                status: stringToEnumSingle(UserStatus, status) || UserStatus.Deactivated
            }
            const newUser = await userService.createUser(userCreateParams);
            if (newUser)
            Alert.alert('Success', `User created: ${newUser.username}`);
        } catch (error) {
            Alert.alert('Error', `Failed to create user: ${error}`);
        }
    };

    const handlePressRandom = async () => {
        try {
            await userService.createUserRandom();
            Alert.alert('Success', 'Random user created');
        } catch (error) {
            Alert.alert('Error', `Failed to create random user: ${error}`);
        }
    };

    const handlePressGet = async () => {
        try {
            const users = await userService.getAllUsers();
            if (users?.length === 0) {
                Alert.alert('No Users', 'No users found.');
            } else {
                Alert.alert(
                    'All Users',
                    users?.map(
                            (user: User) =>
                                `Id: ${user.id} Name: ${user.username}, Status: ${user.status}, Preferences: ${user.preferences} \n ============`
                        )
                        .join('\n')
                );
            }
        } catch (error) {
            Alert.alert('Error', `Failed to fetch users: ${error}`);
        }
    };
 const handlePressGetId = async () => {
        try {
            const user = await userService.getUserById(id);
            if (!user) {
                Alert.alert('No user found.');
            } else {
                Alert.alert(`Id: ${user.id} Name: ${user.username}, Status: ${user.status}, Preferences: ${user.preferences} \n ============`)
            }
        } catch (error) {
            Alert.alert('Error', `Failed to fetch users: ${error}`);
        }
    };

    // @ts-ignore
    return (
        <View style={styles.container}>
            <Text>Selected Status: {status}</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter preferences (optional)"
                value={preferences}
                onChangeText={setPreferences}
            />
            <Picker
                selectedValue={status}
                onValueChange={(itemValue) => setStatus(itemValue)}
                style={{ height: 50, width: 200 }}
            >
                <Picker.Item label="Active" value="Active" />
                <Picker.Item label="Inactive" value="Inactive" />
                <Picker.Item label="Pending" value="Pending" />
            </Picker>
            <Button title="Create User" onPress={handleCreateUser} />
            <Button title="Create Random User" onPress={handlePressRandom} />
            <Button title="Get All Users" onPress={handlePressGet} />
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter id search"
                value={id}
                onChangeText={setId}
            />
            <Button title="Get id Users" onPress={handlePressGetId} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    picker: {
        height: 50,
        width: 200,
    },
});
