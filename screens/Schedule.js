import React, { Component } from "react";
import { StyleSheet, ScrollView, ActivityIndicator, View } from "react-native";
import { ListItem } from "react-native-elements";
import { firebase } from "../config/Firebase";

class Schedule extends Component {
  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection("schedule");
    this.state = {
      isLoading: true,
      scheduleArr: [],
    };
  }
  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const scheduleArr = [];
    querySnapshot.forEach((res) => {
      const {
        Campus,
        CourseCode,
        CourseTitle,
        Credit,
        Day,
        Start,
        End,
        Language,
        Location,
        Teacher,
      } = res.data();
      scheduleArr.push({
        key: res.id,
        res,
        Campus,
        CourseCode,
        CourseTitle,
        Credit,
        Day,
        Start,
        End,
        Language,
        Location,
        Teacher,
      });
    });
    this.setState({
      scheduleArr,
      isLoading: false,
    });
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <ScrollView style={styles.container}>
        {this.state.scheduleArr.map((item, i) => {
          return (
            <ListItem
              key={i}
              chevron
              bottomDivider
              title={item.CourseTitle}
              onPress={() => {
                this.props.navigation.navigate("ScheduleDetail", {
                  schedulekey: item.key,
                });
              }}
            />
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  activity: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Schedule;
