import React, { useRef, useState } from 'react'
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

const Stopwatch = () => {

    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [laps, setLaps] = useState([]);
    const timerRef = useRef(null);

    const startStopWatch = () => {
        if (!running) {
            setRunning(true);
            timerRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(timerRef.current);
            setRunning(false);
        }
    };

    const resetStopWatch = () => {
        clearInterval(timerRef.current);
        setRunning(false);
        setTime(0);
        setLaps([]);
    };

    const lapStopWatch = () => {
        setLaps([...laps, time]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.timer}>{formatTime(time)}</Text>
            <View style={styles.buttonContainer}>
                <Button title={running ? 'Stop' : 'Start'} onPress={startStopWatch} />
                <Button title="Lap" onPress={lapStopWatch} disabled={!running} />
                <Button title='Reset' onPress={resetStopWatch} />
            </View>
            <FlatList
                data={laps}
                renderItem={({ item, index }) => (
                    <Text style={styles.lap}>{`Lap ${index + 1}: ${formatTime(item)}`}</Text>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const formatTime = (time) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#2c3e50', // Darker background color
    },
    timer: {
        fontSize: 64, // Large font size for better visibility
        fontWeight: 'bold',
        color: '#ecf0f1', // Light text color for contrast
        marginBottom: 20, // Space below the timer
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        marginVertical: 20,
    },
    button: {
        backgroundColor: '#1abc9c', // Vibrant turquoise button background
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#ecf0f1', // Light text color
        fontSize: 18,
        fontWeight: 'bold',
    },
    lapContainer: {
        width: '80%',
        marginTop: 30,
    },
    lap: {
        fontSize: 18,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#34495e', // Darker background for laps
        borderRadius: 5,
        marginBottom: 10,
        textAlign: 'center',
        color: '#ecf0f1', // Light text color
    },
});

export default Stopwatch;