import firebase from "firebase/app";
import "firebase/firestore";

const WriteToCloudFirestore = () => {
  const sendData = async () => {
    try {
      console.log("trying...");
      const request = await firebase
        .firestore()
        .collection("testjul14")
        .doc("iBlqr7hZ5h1FFDPZPVj7")
        //to read, onSnapshot(doc => doc.data)
        .set({
          id: 234,
        });
      console.log("successfully sent to cfs");
      alert("data was successfully sent to cloud firestore");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  return <button onClick={sendData}>Send Data To Cloud Firestore</button>;
};

export default WriteToCloudFirestore;
