import { StatusBar } from "expo-status-bar"
import { useEffect, useState } from "react"
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  FlatList,
} from "react-native"
import { Task } from "./Components/Task"

export default function App() {
  const [task, setTask] = useState("")
  const [list, setList] = useState([])

  const handleaddTask = () => {
    Keyboard.dismiss()
    setList([...list, task])
    setTask(null)
    // let data = { status: false, title: task, body: "body" }
    // fetch("https://still-fortress-28637.herokuapp.com/tasks", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }).then(renderItem())
  }

  const handleremoveTask = (index) => {
    let itemList = [...list]

    itemList.splice(index, 1)
    setList(itemList)
  }

  // useEffect(() => {
  //   renderItem()
  // }, [list])

  // function renderItem() {
  //   fetch("https://still-fortress-28637.herokuapp.com/tasks")
  //     .then((response) => {
  //       return response.json()
  //     })
  //     .then((response) => {
  //       setList(response)
  //     })
  // }

  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.items}>
          {list.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  handleremoveTask(index)
                }}
              >
                <Task text={item} />
              </TouchableOpacity>
            )
          })}
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Write Task"}
          value={task}
          onChangeText={(text) => setTask(text)}
        ></TextInput>
        <TouchableOpacity
          onPress={() => {
            handleaddTask()
          }}
        >
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E7EB",
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: "78%",
    backgroundColor: "#FFF",
    borderColor: "#C0C0C0",
    borderRadius: 60,
    borderWidth: 1,
    fontSize: 16,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {
    fontSize: 55,
  },
})
