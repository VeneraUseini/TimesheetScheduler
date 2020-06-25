import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  View,
} from "react-native";
import { firebase } from "../config/Firebase";

class AddSchedule extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection("schedule");
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
      isLoading: false,
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  storeSchedule() {
    if (this.state.name === "") {
      alert("Fill at least your schedule");
    } else {
      this.setState({
        isLoading: true,
      });
      this.dbRef
        .add({
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
        .then((res) => {
          this.setState({
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
        .catch((err) => {
          console.error("Error found: ", err);
          this.setState({
            isLoading: false,
          });
        });
    }
  }

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
            title="Add Schedule"
            onPress={() => this.storeUser()}
            color="#19AC52"
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
});

export default AddSchedule;
