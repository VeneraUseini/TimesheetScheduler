import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  Alert,
  Button,
  TextInput,
} from "react-native";
import { firebase } from "../config/Firebase";

class ScheduleDetail extends Component {
  constructor() {
    super();
    this.state = {
      Campus: "",
      CourseCode: "",
      CourseTitle: "",
      Credit: "",
      Day: "",
      Start: "",
      End: "",
      Language: "",
      Location: "",
      Teacher: "",
      isLoading: true,
    };
  }
  componentDidMount() {
    const dbref = firebase
      .firestore()
      .collection("schedule")
      .doc(this.props.route.params.schedulekey);
    dbref.get().then((res) => {
      if (res.exists) {
        const schedule = res.data();
        this.setState({
          key: res.id,
          Campus: schedule.Campus,
          CourseCode: schedule.CourseCode,
          CourseTitle: schedule.CourseTitle,
          Credit: schedule.Credit,
          Day: schedule.Day,
          Start: schedule.Start,
          End: schedule.End,
          Language: schedule.Language,
          Location: schedule.Location,
          Teacher: schedule.Teacher,
          isLoading: false,
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  updateUser() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase
      .firestore()
      .collection("schedule")
      .doc(this.state.key);
    updateDBRef
      .set({
        Campus: this.state.Campus,
        CourseCode: this.state.CourseCode,
        CourseTitle: this.state.CourseTitle,
        Credit: this.state.Credit,
        Day: this.state.Day,
        Start: this.state.Start,
        End: this.state.End,
        Language: this.state.Language,
        Location: this.state.Location,
        Teacher: this.state.Teacher,
      })
      .then((docRef) => {
        this.setState({
          key: "",
          Campus: "",
          CourseCode: "",
          CourseTitle: "",
          Credit: "",
          Day: "",
          Start: "",
          End: "",
          Language: "",
          Location: "",
          Teacher: "",
          isLoading: false,
        });
        this.props.navigation.navigate("Schedule");
      })
      .catch((error) => {
        console.error("Error: ", error);
        this.setState({
          isLoading: false,
        });
      });
  }

  deleteSchedule() {
    const dbRef = firebase
      .firestore()
      .collection("schedule")
      .doc(this.props.route.params.schedulekey);
    dbRef.delete().then((res) => {
      console.log("Schedule removed from database");
      this.props.navigation.navigate("Schedule");
    });
  }

  openTwoButtonAlert = () => {
    Alert.alert(
      "Delete Schedule",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => this.deleteSchedule() },
        {
          text: "No",
          onPress: () => console.log("No item was removed"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={"Campus"}
            value={this.state.Campus}
            onChangeText={(val) => this.inputValueUpdate(val, "Campus")}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={"CourseCode"}
            value={this.state.CourseCode}
            onChangeText={(val) => this.inputValueUpdate(val, "CourseCode")}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={"CourseTitle"}
            value={this.state.CourseTitle}
            onChangeText={(val) => this.inputValueUpdate(val, "CourseTitle")}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={"Credit"}
            value={this.state.Credit}
            onChangeText={(val) => this.inputValueUpdate(val, "Credit")}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={"Day"}
            value={this.state.Day}
            onChangeText={(val) => this.inputValueUpdate(val, "Day")}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={"Start"}
            value={this.state.Start}
            onChangeText={(val) => this.inputValueUpdate(val, "Start")}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={"End"}
            value={this.state.End}
            onChangeText={(val) => this.inputValueUpdate(val, "End")}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={"Language"}
            value={this.state.Language}
            onChangeText={(val) => this.inputValueUpdate(val, "Language")}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={"Location"}
            value={this.state.Location}
            onChangeText={(val) => this.inputValueUpdate(val, "Location")}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={"Teacher"}
            value={this.state.Teacher}
            onChangeText={(val) => this.inputValueUpdate(val, "Teacher")}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Update"
            onPress={() => this.updateUser()}
            color="#19AC52"
          />
        </View>
        <View>
          <Button
            title="Delete"
            onPress={this.openTwoButtonAlert}
            color="#E37399"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginBottom: 7,
  },
});

export default ScheduleDetail;
